from fastapi import FastAPI, Form
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

from imgservice.routes.images import router as ImageRouter
from imgservice.settings import STATIC_FOLDER

app = FastAPI()

allow_all = ['*']
app.add_middleware(
   CORSMiddleware,
   allow_origins=allow_all,
   allow_credentials=True,
   allow_methods=allow_all,
   allow_headers=allow_all
)


app.mount("/static", StaticFiles(directory=STATIC_FOLDER), name="static")


app.include_router(ImageRouter, tags=["Images"], prefix="/image")


@app.get("/healthcheck/")
async def healthcheck():
    return {"message": "Healthcheck OK"}

