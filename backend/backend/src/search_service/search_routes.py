from fastapi import APIRouter
from .search_agent import SearchAgent
from pydantic import BaseModel
import requests
import asyncio
from dotenv import load_dotenv
import os
load_dotenv()

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


@search_router.post("/contactDoctor")
async def check_hospital_availability(request: Request):
    
    

    data = json.loads(await request.body())
    
    print(f"data: {data['message']}")

    arguments = data["message"]["toolCallList"][0]["function"]["arguments"]
    
    doctor_name = arguments["doctor_name"]
    doctor_phone_number = arguments["doctor_phone_number"]
    availability_when_user_is_free = arguments["availability_when_user_is_free"]
    reason_for_visit = arguments["reason_for_visit"]
    tool_id = data["message"]["toolCallList"][0]["id"]

    insurance_info = "Health insurance provider is Blue Shield, Has a Medicare Supplement Plan"

    phoneNumberId = "b3418c1b-5b69-4ca4-829c-c86a8fdbb22b"
    
    # Stub to demo our own phone nnumber
    cust = {"number": "+13417669783"}
    
    # Public API Key
    authorization = "Bearer 89e8bedd-1abd-46f4-bae3-90753ae0581e"

    message_content = f"""
        You are a virtual assistant helping jenny. You are going to call the hospital for jenny to check the availability for an appointment.

        Your task is to:  
        1. Call the hospital and ask the hospital whether if they accept patient's insurance type which is {insurance_info}. 
        2. If the insurance is **not** supported, politely hang up. 
        3. If the insurance **is** supported, inform the hospital about the patient’s symptoms .
        4. Ask for available appointment times that match the patient’s availability, but **do not** make a reservation. Just say I will double confirm and get back to you.  
        5. After you get the appointment information. Say thank you and hang up. 
        
        **Patient Information:**
        - **Patient Name:** jenny
        - **Insurance Provider:** {insurance_info}
        - **Reason for Visit:** {reason_for_visit}
        - **Preferred Availability:** {availability_when_user_is_free}

        During the call: 
        1. Use casual responses and maintain proper flow of the conversation and no gaps. 
        2. Remember to **only** check availability without making a reservation, and confirm all details with the hospital at the end.  
        Keep the conversation short and avoid over-explaining.
    """

    payload = {
        "name": "check_hospital_availability",
        "assistant": {
            "transcriber": {
                "provider": "deepgram",
                "model": "nova-2",
                "language": "en",
                "smartFormat": True,
            },
            "model": {
                "provider": "openai",
                "model": "gpt-4o-mini",
                "temperature": 0,
                "messages": [{"role": "assistant", "content": message_content}],
                "toolIds": [
                    "f4425b21-86f8-4820-a20c-c0797a1db985",
                    "8c1086c3-3323-4029-af84-bce1daed7d67",
                ],
                "maxTokens": 250,
            },
            "voice": {
                "fillerInjectionEnabled": True,
                "provider": "deepgram",
                "voiceId": "luna",
            },
        },
        "customer": cust,
        "phoneNumberId": phoneNumberId,
    }

    url = "https://api.vapi.ai/call"
    headers = {"Authorization": authorization, "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    id = response.json().get("id")

    while response.json().get("status") != "ended":
        url = f"https://api.vapi.ai/call/{id}"
        response = requests.request("GET", url, headers=headers)
        await asyncio.sleep(2)

    print(response.text)
    
    response = {"results": [{"toolCallId": tool_id, "result": response.text}]}

    # TODO: throw this into an LLM, get something regarding did we successfully get a time or not
    return response
    # return {"message": "Doctor contacted successfully"}


@search_router.post("/search")
async def search(request: Request):
    print(f"Search request: {request}")
    try:
        print(f"Request body: {await request.body()}")
        user_request = json.loads(await request.body())

        # user_data = user_request["message"]["toolWithToolCallList"][0]["function"]["parameters"]["properties"]
        print("ze request is ")
        print(user_request["message"]["toolCallList"])
        user_query = user_request["message"]["toolCallList"][0]["function"][
            "arguments"
        ]["user_query"]
        user_context = (
            "Health insurance provider is Blue Shield, Has a Medicare Supplement Plan"
        )

        tool_id = user_request["message"]["toolCallList"][0]["id"]

    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON: {e}")
        print(f"Error decoding JSON: {e}")
        return {"error": f"Invalid JSON: {e}"}

    search_agent = SearchAgent()
    results = search_agent.search(user_query, user_context)

    response = {"results": [{"toolCallId": tool_id, "result": json.dumps(results)}]}

    print(f"ze response is {response}")

    return response
