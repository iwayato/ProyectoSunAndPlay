import requests
import random

random.seed(1)
tachas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

while True:

    id = random.choice(tachas)

    URL = "https://tachasweb-default-rtdb.firebaseio.com/data/" + str(id) + ".json"

    r = requests.put(URL, json = {
                "id": id, 
                "Temperatura": random.randint(0, 100),
                "Humedad": random.randint(0, 60),
                "luz": random.randint(0, 100),
                "Aceleracion": random.randint(0, 100)})

    print (r.status_code)
    print (r.content)