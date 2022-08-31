import uuid

from typing import Optional
from pydantic import BaseModel, Field


class ImageSchema(BaseModel):
    """Schema or image models."""
    uid: uuid.UUID = Field(...)
    user_id: int = Field(...)
    image_name: str = Field(...)
    image_url: str = Field(...)

    class Config:
        "Extra configs for image models."
        schema_extra = {
            "example": {
                "uid": "429b8032-212f-4f53-bac3-7a140b5841e6",
                "user_id": 4,
                "image_name": "minha_imagem.jpg",
                "image_url": "/images/429b8032-212f-4f53-bac3-7a140b5841e6.jpg"
            }
        }


class UpdateImageModel(BaseModel):
    """Schema or image models."""
    uid: Optional[uuid.UUID]
    user_id: Optional[int]
    image_name: Optional[str]
    image_url: Optional[str]

    class Config:
        "Extra configs for image models."
        schema_extra = {
            "example": {
                "uid": "3dfcf9f2-5c63-43ba-9add-4a58e218d8de",
                "user_id": 4,
                "image_name": "minha_imagem.jpg",
                "image_url": "/images/3dfcf9f2-5c63-43ba-9add-4a58e218d8de.jpg"
            }
        }

def ResponseModel(data, message):
    """Funtion for succed callbacks."""
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    """Function for error callback."""
    return {"error": error, "code": code, "message": message}
