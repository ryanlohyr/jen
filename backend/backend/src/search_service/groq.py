from groq import Groq
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

PRINT_LOGS = os.getenv("PRINT_LOGS", default=False)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")


class GroqService:
    """
    A service class to interact with the Groq API.

    Attributes:
        groq_client (Groq): An instance of the Groq client initialized with the API key.
    """

    def __init__(self):
        """
        Initializes the GroqService with the provided GROQ_API_KEY.

        Raises:
            ValueError: If there is an error while initializing the Groq client.
        """
        try:
            self.groq_client = Groq(GROQ_API_KEY)
        except Exception as e:
            raise ValueError(f"Error while initializing GroqService: {e}")

    def get_groq_response(self, query: str) -> Optional[str]:
        """
        Fetches a response from the Groq API based on the provided query.

        Args:
            query (str): The query string to send to the Groq API.

        Returns:
            Optional[str]: The response content from the Groq API, or None if there was an error.

        Raises:
            ValueError: If there is an error while fetching the response from the Groq API.
        """
        PRINT_LOGS and print(f"GroqService: get_groq_response input: query: {query}")
        try:
            chat_completion = self.groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": query,
                    }
                ],
                model="llama-3.1-8b-instant",
            )
            response = chat_completion.choices[0].message.content

            PRINT_LOGS and print(f"GroqService: get_groq_response: response: {response}")
            return response
        except Exception as e:
            print(f"Error while fetching response from GroqService: {e}")
            return None