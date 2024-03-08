from fastapi import FastAPI, HTTPException
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware
from google.cloud.firestore import ArrayUnion

import firebase_admin
from firebase_admin import credentials, firestore, auth
from pydantic import BaseModel

from fastapi.responses import JSONResponse

app = FastAPI()
cred = credentials.Certificate('./api/credentials.json')

firebase_admin.initialize_app(cred)

db = firestore.client()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows only specified origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#Get all listings in database
@app.get("/listings")
def get_all_listing():
    result = []

    user = db.collection('Listings')
    docs = user.stream()
    
    for doc in docs:
        if doc.exists:
            this_event = doc.to_dict()
            result.append(this_event)
        else:
            print("Document does not exist!")

    
    return {"Listings": result}

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
    accentColor: str
    title: str
    description: str
    flaws: str
    startingPrice: str
    postInfo: str

@app.post("/listings")
def create_listing(listing: Listing):
    try:
        doc_ref = db.collection('Listings').document()
        doc_ref.set(listing.dict())

        doc_ref_user = db.collection('User').document('S7mgDyrVTj39tjpZYbn8')

        doc_ref_user.update({
            "listings": ArrayUnion([doc_ref.id])
        })
        
        return {"message": "Listing created successfully", "id": doc_ref.id}

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
        
        doc_ref.set(bid.dict())

        doc_ref_user = db.collection('User').document(bid.user)

        doc_ref_user.update({
            "bids": ArrayUnion([doc_ref])
        })

        doc_ref_listing = db.collection('Listings').document(bid.listing)

        doc_ref_listing.update({
            "bids": ArrayUnion([doc_ref])
        })

        return {"message": "Listing created successfully", "id": doc_ref.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

@app.post("/sign-up")
def create_an_account(user_data: SignUpSchema):
    email = user_data.email
    password = user_data.password
    id = user_data.id

    try:
        user = auth.create_user(
            email = email,
            password = password
        )
        return JSONResponse(content = {"message" : f"User account created sucessfully for user {id} "},
                            status_code = 201
               )
    except auth.EmailAlreadyExistsError:
        raise HTTPException(
            status_code=400,
            detail=f"Account already created for the email {email}"
        )

