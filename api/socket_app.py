from socketio import AsyncServer, ASGIApp

sio = AsyncServer(async_mode='asgi')

socket_app = ASGIApp(
    socketio_server=sio
)

@sio.event
async def connect(sid, environ):
    print(f'Client {sid} connected')

@sio.event
async def join_room(sid, data):
    room = data["listingID"]
    await sio.enter_room(sid, room)
    print(f"Client {sid} joined room: {room}")

@sio.event
async def disconnect(sid):
    print(f'Client {sid} disconnected')