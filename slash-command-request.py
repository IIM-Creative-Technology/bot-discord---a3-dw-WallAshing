import requests
from dotenv import load_dotenv
import os

load_dotenv()

url = "https://discord.com/api/v8/applications/781879146053369867/commands"

json = {
    "name": "xp",
    "type": 1,
    "description": "Show your xp",
}

headers = {
    "Authorization": "Bot " + os.getenv("TOKEN")
}

r = requests.post(url, headers=headers, json=json)
print(r.content)