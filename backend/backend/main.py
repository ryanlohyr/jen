"""
Main entry point of the application
"""

from os import environ
import sys

import uvicorn
from src.commons.utils.env_config import EnvConfig
from src.app import server

# Base env
env = "local"

# We check if we have an argument to set the env
if len(sys.argv) > 1:
    env = sys.argv[1]

# We load the config
EnvConfig(env=env)

app = server.create_server()

if __name__ == "__main__":

    uvicorn.run(
        "main:app", host="0.0.0.0", port=int(environ.get("PORT", 8080)), reload=True
    )
