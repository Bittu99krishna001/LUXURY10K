import requests

url = "http://127.0.0.1:5001/api/security/dual-otp"
data = {
    "customerEmail": "krishnatak120ttt@gmail.com",
    "customerPhone": "918949128806"
}

response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Server Message:", response.text)