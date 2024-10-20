from fastapi import APIRouter
from .search_agent import SearchAgent
from pydantic import BaseModel
router = APIRouter(prefix="/search")

search_router = APIRouter(prefix="/search")

class SearchRequest(BaseModel):
    user_query: str
    user_context: str

@search_router.post("/search")
async def search(request: SearchRequest):
    search_agent = SearchAgent()
    results = search_agent.search(request.user_query, request.user_context)
    return {"results": results}
