from backend.src.search_service.groq import GroqService


class SearchAgent:
    def __init__(self):
        self.groq_service = GroqService()


    def search_query_formatter(self, query):
        return self.groq_service.format_query(query)