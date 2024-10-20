import asyncio
import uuid
import requests
import json

async def check_hospital_availability(data, mode):
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
        You are a virtual assistant responsible for calling hospitals on behalf of elderly patients to check insurance compatibility, estimate costs, and availability for appointments. 
        Your task is to:  
        1. Call the hospital and ask if the patient's insurance is accepted. 
        2. If the insurance is **not** supported, politely hang up. 
        3. If the insurance **is** supported, inform the hospital about the patient’s symptoms and request an estimated bill for the visit. 
        4. Ask for available appointment times that match the patient’s availability, but **do not** make a reservation.  
        
        **Patient Information:**
        - **Patient Name:** {name}
        - **Age:** {age}
        - **Birthday:** {birthday}
        - **Insurance Provider:** {insurance_info}
        - **Reason for Visit:** {reason_for_visit}
        - **Preferred Availability:** {availability}

        During the call: 
        1. Use casual, friendly language with short, simple responses. 
        2. Remember to **only** check availability without making a reservation, and confirm all details with the hospital at the end.  
        Keep the conversation short and avoid over-explaining.
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
                    "description": "Used to check the availability of the hospital appointment",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "insuranceYN": {
                                "type": "string",
                                "enum":["Y", "N"],
                                "description": "check if the patient's insurance is accepted "
                            },  
                            "availability": {
                                "type": "string",
                                "enum":["Y", "N"],
                                "description": "check if there is a available appointment times that match the patient’s availability"
                            },    
                            "datetime": {
                                "type": "string",
                                "description": "The date and time of the availability in ISO format."
                            }
                        }
                    }
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
    print(response_data)

    id = (response.json().get("id"))
    print(id)

    while response.json().get("status") != "ended":
        url = f"https://api.vapi.ai/call/{id}"
        print(url)
        headers = {"Authorization": "Bearer 89e8bedd-1abd-46f4-bae3-90753ae0581e"}
        response = requests.request("GET", url, headers=headers)
        print(response.text)
        await asyncio.sleep(2)

        


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

    asyncio.run(check_hospital_availability(input_data, 1))
    #check_hospital_availability(input_data, 2)
    


if __name__ == "__main__":
    main()