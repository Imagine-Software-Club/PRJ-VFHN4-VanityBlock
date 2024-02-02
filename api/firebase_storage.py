import firebase_admin
from firebase_admin import db, credentials

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://vanity-block-e5345-default-rtdb.firebaseio.com'})

ref = db.reference("/")
data = ref.get()
print(data)