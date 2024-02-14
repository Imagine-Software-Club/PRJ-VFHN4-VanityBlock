from fastapi import FastAPI
# from firestorm import get_firestore_db

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = FastAPI()
cred = credentials.Certificate('api/credentials.json')

firebase_admin.initialize_app(cred)

db = firestore.client()

@app.get("/listings")
def hello_world():
    result = []

    user = db.collection('User')
    docs = user.stream()
    
    for doc in docs:
        if doc.exists:
            result.append(doc)
        

    
    return {"Result": result}