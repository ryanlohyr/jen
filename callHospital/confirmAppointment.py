import asyncio
import uuid
import requests
import json

async def confirm_appointment(data, mode):
    # Assuming `data` is a JSON string
    person_info = json.loads(data)

    # Extract information from JSON
    name = person_info['name']
    age = person_info['age']
    birthday = person_info['birthday']
    insurance_info = person_info['insurance_info']
    availability = person_info['availability']  # e.g., {'time_hour': 14, 'date': 20, 'month': 10, 'year': 2024}
    hospital_info = person_info['hospital']  # e.g., {'name': 'City Hospital', 'number': '1234567890', 'operation_hour': '9 AM - 5 PM'}
    reason_for_visit = "stomach ache"  # Example reason for the visit

        
    # Creating the message dynamically
    message_content = f"""
        You are a virtual assistant responsible for finalizing hospital appointments on behalf of elderly patients.
        After gathering availability options from several hospitals, you will now call the selected hospital to confirm the booking based on the patient's choice. Your task is to:

        1. Call the hospital that matches the elderly patient's chosen availability.
        2. Confirm the booking for the selected time and date, ensuring the appointment is scheduled.

        If no details are provided, assume the following:

        **Default Information:**
        - **Today's Date:** October 19, 2024
        - **Patient Name:** Gen Lee
        - **Age:** 76
        - **Insurance Provider:** MediHealth
        - **Reason for Visit:** Stomach ache
        - **Selected Appointment Time:** October 20, 2024, between 3 PM - 5 PM

        During the call:
        - Use friendly and casual language.
        - Be concise and to the point, keeping the conversation short.
        - do not ask the same question again

        Make sure to **clearly confirm the booking at the end of the conversation and thank the hospital staff.
    """

    if mode == 1:
        phoneNumberId = "b3418c1b-5b69-4ca4-829c-c86a8fdbb22b"
        cust = {"number": "+13417669783"}
    else:
        phoneNumberId = "5fdd5366-7319-4b83-a5b2-1d0f86f3c5a7"
        cust = {"number": "+15108335337"}

    payload = {
        "name": "check_hospital_availability",
        "assistant": {
            "transcriber": {
                "provider": "deepgram",
                "model": "nova-2",
                "language": "en",
                "smartFormat": True
            },
            "model": {
                "provider": "openai",
                "model": "gpt-3.5-turbo",
                "temperature": 0.2,
                "messages": [
                    {
                        "role": "assistant",
                        "content": message_content
                    }
                ],
                "functions": [
                    {
                    "name": "checkAvailability",
                    "async": "false",
                    "description": "Used to check the availability of the hospital appointment",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "appointmentYN": {
                                "type": "string",
                                "enum":["Y", "N"],
                                "description": "check if appointment has been confirmed"
                            },    
                            "datetime": {
                                "type": "string",
                                "description": "The date and time of the availability in ISO format (only return if appointmentYN is Y"
                            }
                        }
                    },
                    "required":[
                        "appointmentYN"
                    ]
                    }
                ],
                "maxTokens": 250,
            },
            "voice": {
                "fillerInjectionEnabled": True,
                "provider": "deepgram",
                "voiceId": "luna"
            }
        },
        "phoneNumberId": "b3418c1b-5b69-4ca4-829c-c86a8fdbb22b",
        "assistantOverrides": {},
        "customer": cust
    }
    headers = {

        "Authorization": "Bearer 89e8bedd-1abd-46f4-bae3-90753ae0581e",
        "Content-Type": "application/json"
    }
    url = "https://api.vapi.ai/call"
    #response = requests.request("POST", url, json=payload, headers=headers)
    
    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()

    id = (response.json().get("id"))

    while response.json().get("status") != "ended":
        url = f"https://api.vapi.ai/call/{id}"
        headers = {"Authorization": "Bearer 89e8bedd-1abd-46f4-bae3-90753ae0581e"}
        response = requests.request("GET", url, headers=headers)
    print("\n\n",response.text)

        


def main():
    # Example input data
    input_data = '''{
        "name": "John Doe",
        "age": 72,
        "birthday": "1952-07-29",
        "insurance_info": "MediHealth",
        "availability": {
            "time_hour": 14,
            "date": 20,
            "month": 10,
            "year": 2024
        },
        "hospital": {
            "name": "City Hospital",
            "number": "+1234567890",
            "operation_hour": "9 AM - 5 PM"
        }
    }'''

    input_data2 = '''{
        "name": "John Doe",
        "age": 72,
        "birthday": "1952-07-29",
        "insurance_info": "MediHealth",
        "availability": {
            "time_hour": 14,
            "date": 20,
            "month": 10,
            "year": 2024
        },
        "hospital": {
            "name": "City Hospital",
            "number": "+1234567890",
            "operation_hour": "9 AM - 5 PM"
        }
    }'''

    asyncio.run(confirm_appointment(input_data, 1))
    


if __name__ == "__main__":
    main()