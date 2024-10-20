"""
Main entry point of the application
"""

from os import environ
import sys

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.commons.utils.env_config import EnvConfig
from src.app import server

# Base env
env = "local"
origins = ["*"]

# We check if we have an argument to set the env
if len(sys.argv) > 1:
    env = sys.argv[1]

# We load the config
EnvConfig(env=env)

app = server.create_server()

# Create an instance of the FastAPI class
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True,  # Allows cookies and credentials (optional)
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers (e.g., Authorization, Content-Type)
)

@app.get("/testing")
def read_root():
    return {"message": "Welcome to FastAPI!"}

if __name__ == "__main__":

    uvicorn.run(
        "main:app", host="0.0.0.0", port=int(environ.get("PORT", 8080)), reload=True
    )
