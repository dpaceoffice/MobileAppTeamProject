import json
import os

with open('./package.json') as file:
    data = json.load(file)
    for dep in data['dependencies']:
        cmd = "npm i "+str(dep)
        print(cmd+'\n')
        os.system(cmd)