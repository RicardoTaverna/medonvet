import io
from fastapi import APIRouter, Body, UploadFile, File, Form
from fastapi.encoders import jsonable_encoder

from PIL import Image

from imgservice.database.dao import (
    retrieve_images,
    retrieve_image,
    add_image,
    update_image,
    delete_image,
)
from imgservice.models.images import (
    ErrorResponseModel,
    ResponseModel,
    ImageSchema,
    UpdateImageModel,
)
from imgservice.settings import STATIC_FOLDER

router = APIRouter()

@router.post("/", response_description="Image data added into the database")
async def add_image_data(userid: int = Form(...), uid: str = Form(...), in_file: UploadFile = File(...)):

    content = await in_file.read()
    out_file = Image.open(io.BytesIO(content))
    out_file = out_file.save(f"imgservice/static/{uid}.jpg")    

    image = {
        "uid": uid,
        "user_id": userid,
        "image_name": in_file.filename,
        "image_url": f"/static/{uid}.jpg"
    }
    image = jsonable_encoder(image)
    new_image = await add_image(image)
    return ResponseModel(new_image, "Image add successfully")

@router.get("/", response_description="Images retrieved")
async def get_images():
    images = await retrieve_images()
    if images:
        return ResponseModel(images, "Images data retrieved successfully")
    return ResponseModel(images, "Empty list returned")

@router.get("/{id}/", response_description="Image data retrieved")
async def get_image_data(id):
    image = await retrieve_image(id)
    if image:
        return ResponseModel(image, "Image data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Student doesn't exist.")

@router.put("/{id}/")
async def update_image_data(id: str, request: UpdateImageModel = Body(...)):
    request = {key: value for key, value in request.dict().items() if value is not None}
    updated_image = await update_image(id, request)
    if updated_image:
        return ResponseModel(f"Image with ID: {id} is updated successfully.", "Image was update successfully.")
    
    return ErrorResponseModel(
        "An error occured",
        404,
        "There was an error updating the image data."
    )

@router.delete("/{id}/", response_description="Image data deleted from the database")
async def delete_image_data(id: str):
    deleted_image = await delete_image(id)
    if deleted_image:
        return ResponseModel(f"Image with ID: {id} removed", "Image deleted successfully")
    return ErrorResponseModel(
        "An error occured",
        404,
        f"Image with ID: {id} does not exist."
    )
