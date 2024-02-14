from fastapi import FastAPI
# from firestorm import get_firestore_db

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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