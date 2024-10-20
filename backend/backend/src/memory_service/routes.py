from fastapi import APIRouter

from .memory import MemoryService

router = APIRouter()

memory_router = APIRouter(prefix="/memory")

@memory_router.get("/all_memories")
async def get_all_memories(user_id: str):

    memory_service = MemoryService(user_id=user_id)
    
    memories = memory_service.get_all_memories()
    
    return {"memories": memories}

@memory_router.put("/{memory_id}")
async def update_memory(memory_id: str, updated_content: dict):
    memory_service = MemoryService()
    success = memory_service.update_memory(memory_id, updated_content)
    if success:
        return {"message": "Memory updated successfully"}
    else:
        return {"message": "Memory update failed"}, 400

@memory_router.delete("/{memory_id}")
async def delete_memory(memory_id: str):
    memory_service = MemoryService()
    success = memory_service.delete_memory(memory_id)
    if success:
        return {"message": "Memory deleted successfully"}
    else:
        return {"message": "Memory deletion failed"}, 400



@memory_router.get("/test-run")
async def test_run():
    categories = {
        "insurance": "For any content related to the users insurance and insurance claims",
    }
    
    memory_service = MemoryService(user_id="brandon", categories=categories)
    messages = [
        {
            "role": "user",
            "content": "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts and I'm 25 years old. I have chronic back pain and I dont like to go to hospitals that are further than 10 minutes of walk",
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