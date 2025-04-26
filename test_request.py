import requests

test_cases = [
    {"time": 2, "space": 1, "mood": "anxious"},
    {"time": 10, "space": 5, "mood": "tired"},
    {"time": 7, "space": 2, "mood": "focused"},
    {"time": 3, "space": 4, "mood": "sad"},
    {"time": 8, "space": 1, "mood": "stressed"},
]

for i, case in enumerate(test_cases):
    response = requests.post("http://127.0.0.1:5000/predict", json=case)
    print(f"Test {i+1} Input: {case} => Response: {response.json()}")
