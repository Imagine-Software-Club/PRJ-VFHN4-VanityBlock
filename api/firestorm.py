import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.


def get_firestore_db():
    cred = credentials.Certificate('./serviceAccount.json')

    app = firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db




