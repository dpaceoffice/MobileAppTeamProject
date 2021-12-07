import json
import os

with open('./package.json') as file:
    data = json.load(file)
    for dep in data['dependencies']:
        os.system("npm i "+str(data))