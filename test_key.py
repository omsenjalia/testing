import os
import requests

def test_api():
    api_key = "forg_61078075a4ee762e332f5e0a2512974a6144beec"
    headers = {"Authorization": f"Bearer {api_key}"}

    print("Testing GET /v1/products...")
    res = requests.get("https://api.forg.to/api/v1/products?limit=5", headers=headers)
    print(f"Status: {res.status_code}")
    if res.status_code == 200:
        data = res.json()
        products = data.get("data", [])
        print(f"Found {len(products)} products")
        for p in products:
            owner = p.get("owner", {})
            print(f"- Product: {p.get('name')}, Owner: {owner.get('username')}")

            username = owner.get('username')
            if username:
                print(f"  Testing GET /v1/users/{username}...")
                user_res = requests.get(f"https://api.forg.to/api/v1/users/{username}", headers=headers)
                print(f"  Status: {user_res.status_code}")
                if user_res.status_code == 200:
                    user_data = user_res.json().get("data", {})
                    print(f"  Location: {user_data.get('location')}")

if __name__ == "__main__":
    test_api()
