import os

from mem0 import MemoryClient

class MemoryService:
    def __init__(self, user_id):
        self.client = MemoryClient(api_key=os.getenv("MEM0AI_API_KEY"))
        self.user_id = user_id

    def add_messages(self, messages):
        self.client.add(messages, user_id=self.user_id)

    def search_memory(self, query):
        return self.client.search(query, user_id=self.user_id)

    def get_all_memories(self):
        return self.client.get_all(user_id=self.user_id)


# EXAMPLE USAGE
# memory_service = MemoryService(user_id="alex")

# messages = [
#     {
#         "role": "user",
#         "content": "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts.",
#     },
#     {
#         "role": "assistant",
#         "content": "Hello Alex! I've noted that you're a vegetarian and have a nut allergy. I'll keep this in mind for any food-related recommendations or discussions.",
#     },
# ]
# memory_service.add_messages(messages)

# query = "What can I cook for dinner tonight?"
# memory_service.search_memory(query)

# user_memories = memory_service.get_all_memories()
