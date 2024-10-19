from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")


class GroqService:
    def __init__(self):
        try:
            self.groq_client = Groq(GROQ_API_KEY)
        except Exception as e:
            raise ValueError(f"Error while initializing GroqService: {e}")

    def groq_response(self, query):
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
            return response
        except Exception as e:
            print(f"Error while fetching response from GroqService: {e}")
            return None

        
