from fastapi import FastAPI, HTTPException
# from firestorm import get_firestore_db

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pydantic import BaseModel

app = FastAPI()
cred = credentials.Certificate('./api/credentials.json')

firebase_admin.initialize_app(cred)

db = firestore.client()

#Get all listings in database
@app.get("/listings")
def hello_world():
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

# Define Pydantic model for your data
class Item(BaseModel):
    amount : float
    listing: str
    timeDate: str
    user:str
    verified:bool

# Define a route to post data to Firestore
@app.post("/post-bid")
def create_data(data: Item):
    try:
        # Add data to Firestore
        doc_ref = db.collection('Bid').document()
        
        doc_ref.set({
            'Amount': data.amount,
            'Listing': data.listing,
            'TimeDate': data.timeDate,
            'User':data.user,
            'Verified':data.verified

        })
        return {"message": "Data added successfully"}
    
    except Exception as e:
        return{"message":e}
