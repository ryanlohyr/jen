from fastapi import APIRouter

from .memory import MemoryService

router = APIRouter()

memory_router = APIRouter(prefix="/memory")

@memory_router.get("/all_memories")
async def get_all_memories(user_id: str):

    memory_service = MemoryService(user_id=user_id)
    
    memories = memory_service.get_all_memories()
    
    return {"memories": memories}

@memory_router.get("/test-run")
async def test_run():
    categories = {
        "insurance": "For any content related to the users insurance and insurance claims",
    }
    
    memory_service = MemoryService(user_id="brandon", categories=categories)
    messages = [
        {
            "role": "user",
            "content": "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts and I'm 25 years old.",
        }
    ]

    memory_service.add_messages(messages)
    
    memories = memory_service.get_all_memories()
    
    return {"memories": memories}


@memory_router.get("/search_memories")
async def search_memories(id):
    return {"message": "Memory search successful"}

@memory_router.post("/add")
async def add_memory():
    return {"message": "Memory added successfully"}