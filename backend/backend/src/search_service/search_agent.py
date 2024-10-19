import os
from dotenv import load_dotenv
from backend.src.search_service.groq import GroqService

load_dotenv()
PRINT_LOGS = os.getenv("PRINT_LOGS", default=False)


class SearchAgent:
    def __init__(self):
        self.groq_service = GroqService()


    def __search_query_formatter(self, user_query_string, user_context_dict):
        PRINT_LOGS and print(f"SearchAgent: __search_query_formatter inputs: user_query_string: {user_query_string} | user_context_dict: {user_context_dict}")

        """
        Uses an LLM to generate a Perplexity search query based on the user's query and context.
        
        :param user_query: The user's query string.
        :param user_context: Dictionary containing demographic, preferences, and context.
        :return: A string prompt ready to be sent to Perplexity.
        """
        prompt_template = f"""
        Here is the context of a particular user: {user_query_string} 
        and what the user has asked from me: {user_context_dict}. 
        Before I directly address the query, I want to do some research using Perplexity/web search to give the user options on what they want to do. 
        Make sure to phrase the query such that I get the most relevant results and to include as much relevant context as you can.
        Given this, can you help me prepare a search query for Perplexity?

        Example user_query_string: "I have been experiencing stomach pain and need to see a doctor soon."
        Example user_context_dict: {{
            "age": 45,
            "gender": "female",
            "medical_history": "diabetes",
            "location": "Richmond District, San Francisco",
            "travel_preferences": "walking distance",
            "timing_preferences": "this week"
        }}
        
        Example output query: "Find nearby doctors specializing in gastroenterology available this week within walking distance of Richmond District, San Francisco who accept patients with diabetes. The things I need include the doctor's name, address, and phone number to make appointments."
        """

        # Call to LLM (replace with your LLM model of choice)
        response = self.groq_service.get_groq_response(prompt_template)

        PRINT_LOGS and print(f"SearchAgent: __search_query_formatter: response: {response}")

        return response
