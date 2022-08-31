from typing import Any, Dict, List
from bson.objectid import ObjectId

from imgservice.settings import images_collection


def images_helper(images) -> dict:
    """Database helper for images Models."""
    return {
        "id": str(images["_id"]),
        "uid": str(images["uid"]),
        "user_id": images["user_id"],
        "image_name": images["image_name"],
        "image_url": images["image_url"]
    }

async def retrieve_images() -> List[Dict[Any, Any]]:
    """Async function to retrieve all images as dict.

    Returns:
        List[Dict[Any, Any]]: images
    """
    images = []
    async for image in images_collection.find():
        images.append(images_helper(image))
    return images

async def add_image(image_data) -> dict:
    """Async funtion to add a new image and return the add image.

    Args:
        image_data (dict): image data json

    Returns:
        dict: image
    """
    image = await images_collection.insert_one(image_data) 
    new_image = await images_collection.find_one({"_id": image.inserted_id})
    return images_helper(new_image)

async def retrieve_image(id: str) -> dict:
    """Async function to retrieve one image data as dict by the image id if it exists.

    Args:
        id (str): image _id field

    Returns:
        dict: image
    """
    image = await images_collection.find_one({"_id": ObjectId(id)})
    if image:
        return images_helper(image)
    return {"error": "no image for the passed _id"}

async def update_image(id: str, data: dict) -> bool:
    """Update a image by matching _id.

    Args:
        id (str): image _id field
        data (dict): json data to be updated

    Returns:
        bool: if updated true
    """
    if len(data) < 1:
        return False
    
    image = await images_collection.find_one({"_id": ObjectId(id)})
    if image:
        update_image = await images_collection.update_one(
            {"id": ObjectId(id)}, {"$set": data}
        )
        if update_image:
            return True
        return False
    return False

async def delete_image(id: str) -> bool:
    """Delete an image by matching id.

    Args:
        id (str): image _id field

    Returns:
        bool: true if deleted
    """
    image = await images_collection.find_one({"_id": ObjectId(id)})
    if image:
        await images_collection.delete_one({"_id": ObjectId(id)})
        return True
    return False

