from bs4 import BeautifulSoup
import ast
import concurrent.futures
from glob import glob
import json

final = {}


def insert(key, value):
    if not final.get(key):
        final[key] = [value]
    else:
        final[key].append(value)


def process(name):
    # print(name, "2024" in name)
    with open(name, "r", encoding="utf-8") as f:
        data = f.read()
        html = BeautifulSoup(data)
        ques = html.find('script').text[len("      let data= "):]
        dic = ast.literal_eval(ques.strip())

        if "2020" in name:
            insert("2020", dic)
        elif "2021" in name:
            insert("2021", dic)
        elif "2022" in name:
            insert("2022", dic)
        elif "2023" in name:
            insert("2023", dic)
        elif "2024" in name:
            insert("2024", dic)
        else:
            insert("other", dic)


with concurrent.futures.ThreadPoolExecutor() as exc:
    exc.map(process, glob("Gate/*"))

with open("src\data.json", "w") as f:
    f.write(json.dumps(final))
