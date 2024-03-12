from fastapi import FastAPI, HTTPException
from datetime import datetime, timedelta

from fastapi.middleware.cors import CORSMiddleware
from google.cloud.firestore import ArrayUnion

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from pydantic import BaseModel
from typing import List

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
            this_event["id"] = doc.id
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
    accentColor: str = ""
    title: str
    description: str
    flaws: str
    postInfo: str
    picture: list[str] = []
    bids: list[str] = []

@app.post("/listings")
def create_listing(listing: Listing):
    
    try:
        doc_ref = db.collection('Listings').document()
        listing_data = listing.dict()  # Convert the Pydantic model to a dictionary

        # Explicitly set price and endTime
        listing_data["price"] = 1
        listing_data["endTime"] = datetime.now() + timedelta(days=7)

        if listing_data["picture"] == []:
            listing_data["picture"].append("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAbFBMVEX////+/v7t7e3f399ra2v29vZwcHCKioqAgIDT09N1dXXq6upYWFh5eXlPT0/i4uLMzMyenp5jY2OSkpK4uLheXl6+vr6wsLDV1dVERETy8vLHx8c7OzuamppJSUlAQEAkJCSNjY2lpaUeHh5dF9R2AAAET0lEQVR4nO3dbXeaMBjG8TtCEEGU4hPWqtN9/++4BNfuVBOvnKPDbFy/07MXCG34Nzx0byJCRERERERERDR0apBeXZ2IPn1ekno0UNpG6L68heyXXlfpYFVr/TuDJ5HNt5m+JfpvTNF/gU7eVpvfIZzsFMoWpk/ZTgapLU2lfab9V5q5Ec12IrumyMeDlBfN2pz/7N5LUroT3ZzKR+frv6s8NdrMEf80Wi5EHSbddOpzXLHoTntyUHJaevf5UJLWw30bv5x4nYr68Hwsu4VMijsvBV/7Oo72Pydf5GpI6vIPHKQ5ppjIYufa02zKE2lKfK6OHFFOu9tBBfwizQ5lI0nlfH9UstXyQwKuMucO0TVyDxKfmzIR9NZZSMlMvachE8K8Ps2vJBE+BcvkepR3Xng+2dPP3tXMeTsRWalREfCjlewP1bX0UMZzudnJUh7Sm0HO9kGTvSjV1HUqZtM0MNFm4dg6+ojrWjuOHBsXm5BDH08k6ejmePMdF3U8jcyje+G4ZapRGnL0X0mkYkukJifXdf9YIglPtHRdaOUxoqeaGcjR9QB57EKT8ESyv70TFquAN6remPt1uSpuBtnsg4b4eCJln6c34nq/tu/Wt2MM/C0+IZHz6Jj+BlG+9+iwET7jQvvPMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQUwEMRHERBATQc9YQs69Ols0y8aKdwnlvpaQM0cn9bWJDlnauSfdr+t9cjPIJGCdb3lOonH2duV8mrbxLERoR9JOT+frUWZ5T2s1yvns2Kg/oplE3TQ6asf281vI0U9ZWtd1+N65Bv1rKNntXZO6t9WHm7I7Xn0j4zaatXXtdTa+rEH6Z3xW2YQc/oRE69yxMdnGsxK6PZtj4ticr0MOvp+oCvrxm+3s2jZ9j6qQ0qljkJugeV75E82UbgKmwvcJ/G0iR8U1yJCTk0arqftD2Wr5GfJ2E2GOULiQOfsfop13DbPB3HCLeZwzojfm7OeZvdm7aiqpx5KsYrrp9s+e/CqRce3LYF638uXlw2Fmsqe+zO115lNnIqulOO90wyCyXIlktb+inUN5kbje3QdBt0XezSPfRWQiphuRtkqrfJCqtDB/ImxS5b0d2w/GlfkDTM2TQZqbAKMqv/P/St3FWDd5Xb74jvAyZZ039d1Xw8t+7akosiFKs+rUdn38z/Ovj/Uwqa9p4k30lQru8Z8a7IkTERERERERERFRn34BH89n2Pmv2XoAAAAASUVORK5CYII=")

        doc_ref.set(listing_data)

        doc_ref_user = db.collection('User').document('S7mgDyrVTj39tjpZYbn8')
        doc_ref_user.update({
            "listings": ArrayUnion([doc_ref.id]),
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

