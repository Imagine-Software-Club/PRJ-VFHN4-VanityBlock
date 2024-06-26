from fastapi import FastAPI, Response, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from datetime import tzinfo, datetime, timedelta
from zoneinfo import ZoneInfo
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware
from google.cloud.firestore import ArrayUnion

import firebase_admin
from firebase_admin import credentials, firestore, auth

from fastapi import status, Response, Request
from fastapi.responses import JSONResponse
import requests

from pydantic import BaseModel
from typing import List
import logging

from socketio import AsyncServer, ASGIApp

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows only specified origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
cred = credentials.Certificate('./api/credentials.json')

sio = AsyncServer(async_mode='asgi', cors_allowed_origins=["http://localhost:3000"])
socket_app = ASGIApp(sio, app)

firebase_admin.initialize_app(cred)
db = firestore.client()

user_id = 0
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ZERO = timedelta(0)
ONE = timedelta(hours = 1)
FIVE = timedelta(hours = -5)

class EST(tzinfo):
  def utcoffset(self, dt):
    return FIVE
  def tzname(self, dt):
    return "EST"
  def dst(self, dt):
    return ONE

est = EST()


@app.get("/listings/filtered")
def filtered_search(query: Optional[str] = None, time: Optional[str] = "Live Auctions", state: Optional[str] = "All", sort: Optional[str] = "Ending Soon"):
    logging.info(f"Query parameter received: {query}, {time}, {state}, {sort}")
    filtered_listings = fetch_listings_by_query(query, time, state, sort)
    return {"Listings": filtered_listings}

def sort_by_ending_soon(element):
    return element["endTime"].replace(tzinfo = est)

def sort_by_lowest_bid(element):
    return element["price"]

def fetch_listings_by_query(query: str, time: str, state: str, sort: str):
    result = []

    user = db.collection('Listings')
    docs = user.stream()
    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            print(this_event["stateIssued"])

            if (query is None or query in this_event["title"]) and (state.lower() == (this_event["stateIssued"]).lower() or state == "All"):
                print("First level reached")
                print(time)
                if time == "Past Auctions":
                    print("Second level reached")
                    this_event["id"] = doc.id
                    result.append(this_event)
                elif time == "Live Auctions" and this_event["endTime"].replace(tzinfo = est) > datetime.now(est):
                    print("Second level reached")
                    this_event["id"] = doc.id
                    result.append(this_event)
                
        else:
            print("Document does not exist!")

    if sort == "Ending Soon":
        result.sort(key = sort_by_ending_soon)
    elif sort == "Ending Last":
        result.sort(reverse = True, key = sort_by_ending_soon)
    elif sort == "Lowest Bid":
        result.sort(key = sort_by_lowest_bid)
    elif sort == "Highest Bid":
        result.sort(reverse = True, key = sort_by_lowest_bid)

    return result

#Get all listings in database
@app.get("/listings")
def get_all_listing():
    result = []

    user = db.collection('Listings')
    docs = user.stream()
    
    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            this_event["id"] = doc.id
            result.append(this_event)
        else:
            print("Document does not exist!")
    return {"Listings": result}

@app.get("/profile/{userId}")
def get_user(userId):

    user = db.collection('User').document(userId)
    doc = user.get()
    return doc.to_dict()
@app.get("/profile/settings/{userId}")
def get_user(userId):

    user = db.collection('User').document(userId)
    doc = user.get()
    return doc.to_dict()

@app.get("/listings/{listingId}")
def get_listing(listingId):
    
    doc_ref = db.collection('Listings').document(listingId)
    doc = doc_ref.get()
    
    return doc.to_dict()

class Listing(BaseModel):
    firstName: str
    lastName: str
    email: str
    zip: str
    plateNumber: str
    yearIssued: str
    stateIssued: str
    mainColor: str
    accentColor: str = ""
    title: str
    description: str
    flaws: str
    postInfo: str
    picture: list[str] = []
    bids: list[str] = []
    price: str = "1"
    uid: str = ""
    comments: list[str] = []

@app.post("/listings")
async def create_listing(listing: Listing, request: Request, token: str = Depends(oauth2_scheme)):
    cookies = request.cookies
    uid = cookies.get("uid", "No UID Cookie")

    
    doc_ref = db.collection('Listings').document()
    listing_data = listing.model_dump()

    # Explicitly set price and endTime
    listing_data["endTime"] = datetime.now(est) + timedelta(days = 7)
    listing_data["price"] = int(listing_data["price"])
    
    if listing_data["picture"] == []:
        listing_data["picture"].append("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAbFBMVEX////+/v7t7e3f399ra2v29vZwcHCKioqAgIDT09N1dXXq6upYWFh5eXlPT0/i4uLMzMyenp5jY2OSkpK4uLheXl6+vr6wsLDV1dVERETy8vLHx8c7OzuamppJSUlAQEAkJCSNjY2lpaUeHh5dF9R2AAAET0lEQVR4nO3dbXeaMBjG8TtCEEGU4hPWqtN9/++4BNfuVBOvnKPDbFy/07MXCG34Nzx0byJCRERERERERDR0apBeXZ2IPn1ekno0UNpG6L68heyXXlfpYFVr/TuDJ5HNt5m+JfpvTNF/gU7eVpvfIZzsFMoWpk/ZTgapLU2lfab9V5q5Ec12IrumyMeDlBfN2pz/7N5LUroT3ZzKR+frv6s8NdrMEf80Wi5EHSbddOpzXLHoTntyUHJaevf5UJLWw30bv5x4nYr68Hwsu4VMijsvBV/7Oo72Pydf5GpI6vIPHKQ5ppjIYufa02zKE2lKfK6OHFFOu9tBBfwizQ5lI0nlfH9UstXyQwKuMucO0TVyDxKfmzIR9NZZSMlMvachE8K8Ps2vJBE+BcvkepR3Xng+2dPP3tXMeTsRWalREfCjlewP1bX0UMZzudnJUh7Sm0HO9kGTvSjV1HUqZtM0MNFm4dg6+ojrWjuOHBsXm5BDH08k6ejmePMdF3U8jcyje+G4ZapRGnL0X0mkYkukJifXdf9YIglPtHRdaOUxoqeaGcjR9QB57EKT8ESyv70TFquAN6remPt1uSpuBtnsg4b4eCJln6c34nq/tu/Wt2MM/C0+IZHz6Jj+BlG+9+iwET7jQvvPMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQc9YQs69Ols0y8aKdwnlvpaQM0cn9bWJDlnauSfdr+t9cjPIJGCdb3lOonH2duV8mrbxLERoR9JOT+frUWZ5T2s1yvns2Kg/oplE3TQ6asf281vI0U9ZWtd1+N65Bv1rKNntXZO6t9WHm7I7Xn0j4zaatXXtdTa+rEH6Z3xW2YQc/oRE69yxMdnGsxK6PZtj4ticr0MOvp+oCvrxm+3s2jZ9j6qQ0qljkJugeV75E82UbgKmwvcJ/G0iR8U1yJCTk0arqftD2Wr5GfJ2E2GOULiQOfsfop13DbPB3HCLeZwzojfm7OeZvdm7aiqpx5KsYrrp9s+e/CqRce3LYF638uXlw2Fmsqe+zO115lNnIqulOO90wyCyXIlktb+inUN5kbje3QdBt0XezSPfRWQiphuRtkqrfJCqtDB/ImxS5b0d2w/GlfkDTM2TQZqbAKMqv/P/St3FWDd5Xb74jvAyZZ039d1Xw8t+7akosiFKs+rUdn38z/Ovj/Uwqa9p4k30lQru8Z8a7IkTERERERERERFRn34BH89n2Pmv2XoAAAAASUVORK5CYII=")

    doc_ref.set(listing_data)

    doc_ref_user = db.collection('User').document(listing_data["uid"])
    doc_ref_user.update({
        "listings": ArrayUnion([doc_ref.id]),
    })

    
    return {"message": "Listing created successfully", "id": doc_ref.id}

class Bio(BaseModel):
    bio: str

@app.post("/profile/{userId}")
def update_bio(userId, bio: Bio):
    try:
        doc_ref_user = db.collection('User').document(userId)

        doc_ref_user.update({
            "Bio": bio.bio
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class Bid(BaseModel):
    amount : float
    listing: str
    timeDate: datetime
    user:str
    verified:bool


@app.post("/post-bid")
def create_data(bid: Bid):
    try:
        doc_ref = db.collection('Bid').document()
        doc_ref.set(bid.model_dump())

        doc_ref_user = db.collection('User').document(bid.user)
        doc_ref_user.update({
            "bids": ArrayUnion([doc_ref.id])
        })

        doc_ref_listing = db.collection('Listings').document(bid.listing)
        doc_ref_listing.update({
            "bids": ArrayUnion([doc_ref.id]),
            "price": bid.amount
        })

        return {"message": "Listing created successfully", "id": doc_ref.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@sio.event
async def join_room(sid, data):
    
    room = data["listingID"]
    await sio.enter_room(sid, room)

@sio.event
async def leave_room(sid, data):
    
    room = data["listingID"]
    await sio.leave_room(sid, room)
    
@sio.event
async def bid_placed(sid, data):
    
    room = data["listingID"]
    await sio.emit('update_bid', {'price': data["amount"]}, room=room)

class Comment(BaseModel):
    user: str
    timeDate: datetime
    like: bool
    dislike: bool
    listing: str
    replies: List[str] = []
    text: str


@app.get("/comments")
async def get_all_comments():
    try:
        comments_ref = db.collection('Comments')
        comments_query = comments_ref.stream()
        comments = []
        for comment in comments_query:
            comment_dict = comment.to_dict()
            comment_dict['id'] = comment.id 
            comments.append(comment_dict)
        return comments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/listings/{listing_id}/comments")
async def get_comments_by_listing(listing_id: str):
    try:
        comments_ref = db.collection('Comments').where('listing', '==', listing_id)
        comments_query = comments_ref.stream()
        comments = []
        for comment in comments_query:
            comment_dict = comment.to_dict()
            comment_dict['id'] = comment.id  
            comments.append(comment_dict)
        return comments
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/comments/add")  
async def post_comment(comment: Comment, token: str = Depends(oauth2_scheme)):
    try:
        new_comment_ref = db.collection('Comments').document()
        comment_data = comment.model_dump()

        comment_data['timeDate'].now()
        new_comment_ref.set(comment_data)

        listing_ref = db.collection('Listings').document(comment.listing)
        listing_ref.update({"comments": firestore.ArrayUnion([new_comment_ref.id])})

        print('3')

        return {"message": "Comment posted successfully", "id": new_comment_ref.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




##-------------
#Authentication
##-------------   

class SignUpSchema(BaseModel):
    email : str
    password : str

    class Config:
        json_schema_extra = {
            "example": {
                "email":"sample@gmail.com",
                "password":"samplepassword",
            }
        }

class User(BaseModel):
    BidHistory : list[str] = []
    Bio : str = ""
    Comments: list[str] = []
    Email : str = ""
    FirstName : str = ""
    JoinDate : datetime = ""
    LastName : str = ""
    Listings : list[str] = []
    Picture : str = ""
    Zip : str = ""
    bids: list[str] = []
    listings: list[str] = []
    username: str = ""
    Email: str
    Password: str
    
@app.post("/sign-up")
async def create_an_account(user_data: User):
    email = user_data.Email
    password = user_data.Password

    try:
        user = auth.create_user(
            email = email,
            password = password
        )

        doc_ref = db.collection('User').document(user.uid)
        doc_ref.set(user_data.model_dump())
        
        return JSONResponse(content = {"message" : f"User account created sucessfully for user {123}"},
                            status_code = 201
               )
    
    except auth.EmailAlreadyExistsError:
        raise HTTPException(
            status_code=400,
            detail=f"Account already created for the email {email}"
        )

    
class LoginSchema(BaseModel):
    email: str
    password: str

    
@app.post("/login")
async def login(response: Response, user_credentials: LoginSchema):
    try:
        user = auth.get_user_by_email(user_credentials.email)
        # Attempt to sign in the user with the given email and password
        token = auth.create_custom_token(user.uid)
        
        response.set_cookie(key="uid", value= user.uid)
        
        return {"token": token}
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )