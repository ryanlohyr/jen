from fastapi import APIRouter
from .search_agent import SearchAgent
from pydantic import BaseModel
router = APIRouter(prefix="/search")
import logging
import json
from fastapi import Request
logger = logging.getLogger(__name__)

search_router = APIRouter(prefix="/search")

# class SearchRequest(BaseModel):
#     user_query: str
#     user_context: str

class SearchRequest(BaseModel):
    response: str
    user_context: str

@search_router.post("/search")
async def search(request: Request):
    logger.info(f"Search request: {request}")
    print(f"Search request: {request}")
    try:
        print(f"Request body: {await request.body()}")
        user_request = json.loads(await request.body())
        print(f"User request: {user_request}")
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON: {e}")
        print(f"Error decoding JSON: {e}")
        return {"error": f"Invalid JSON: {e}"}
    
    search_agent = SearchAgent()
    results = search_agent.search(user_request["user_query"], user_request["user_context"])
    return {"results": results}
