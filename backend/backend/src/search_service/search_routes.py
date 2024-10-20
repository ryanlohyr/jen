from fastapi import APIRouter
from .search_agent import SearchAgent
from pydantic import BaseModel
router = APIRouter(prefix="/search")
import logging
import json
logger = logging.getLogger(__name__)

search_router = APIRouter(prefix="/search")

# class SearchRequest(BaseModel):
#     user_query: str
#     user_context: str

class SearchRequest(BaseModel):
    user_query: str
    user_context: str

@search_router.post("/search")
async def search(request: str):
    logger.info(f"Search request: {request}")
    try:
        user_request = json.loads(request)
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON: {e}")
        raise Exception(f"Invalid JSON: {e}")
    
    search_agent = SearchAgent()
    results = search_agent.search(user_request["user_query"], user_request["user_context"])
    return {"results": results}
