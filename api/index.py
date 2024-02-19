from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.cloud.firestore import ArrayUnion

# from firestorm import get_firestore_db

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pydantic import BaseModel

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

app = FastAPI()
cred = credentials.Certificate("./api/credentials.json")

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

