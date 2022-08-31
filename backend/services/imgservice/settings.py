import motor.motor_asyncio
import os

MONGO_DETAILS = os.getenv("ME_CONFIG_MONGODB_URL", "mongodb://root:rootpassword@localhost:27017/")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.images

images_collection = database["images_collection"]

script_dir = os.path.dirname(__file__)
STATIC_FOLDER = os.path.join(script_dir, "static/")
