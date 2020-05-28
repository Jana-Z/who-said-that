import csv
import requests
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup

FILEPATH_QUOTES = 'quotes.csv'
FILEPATH_HOUSES = 'houses_hp.csv'

load_dotenv()

# https://www.greetingcardpoet.com/magical-harry-potter-quotes
def scrape_greetingcardpoet(filepath):
    quotes = []

    url = 'https://www.greetingcardpoet.com/magical-harry-potter-quotes'
    print(f'Scraping {url}')

    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    content = soup.find('div', class_='entry-content')

    paragraphs = content.find_all('p')

    for p in paragraphs:
        if p.find('strong'):
            quote = p.text
            author = p.find("strong").text.strip()
            quote = quote[:-len(author)].strip('\"')
            if quote and not ':' in quote:
                quotes.append([quote, author])

    if os.path.isfile(filepath):
        with open(filepath,'w') as f:
            writer = csv.writer(f, delimiter=',')
            for q in quotes:
                q[0] = q[0].strip('\"')
                writer.writerow(q)
        print(f'Added {len(quotes)} new quotes.')
        
    else:
        raise OSError(f'{filepath} is not a path to a file')

def get_houses(filepath):
    url = "https://www.potterapi.com/v1/characters"
    params = {"key": os.getenv("API_KEY")}
    res = requests.get(url, params=params)
    characters = res.json()
    house_dict = {}
    for char in characters:
        if 'house' in char:
            house_dict[char['name']] = char['house']
    print(house_dict)
    # Save house_dict as csv
    if os.path.isfile(filepath):
        with open(filepath,'w') as f:
            writer = csv.writer(f, delimiter=',')
            for (char, house) in house_dict.items():
                writer.writerow([char, house])
    else:
        raise OSError(f'{filepath} is not a path to a file')

def map_house_to_char(filepath_quotes, filepath_houses):
    quotes = []
    houses = {}

    if os.path.isfile(filepath_quotes):
        with open(filepath_quotes,'r') as f:
            reader = csv.reader(f, delimiter=',')
            quotes = [l for l in reader] if reader else []
    else:
        raise OSError(f'{filepath_quotes} is not a path to a file')

    if os.path.isfile(filepath_houses):
        with open(filepath_houses,'r') as f:
            reader = csv.reader(f, delimiter=',')
            for line in reader: 
                houses[line[0]] = line[1]
    else:
        raise OSError(f'{filepath_houses} is not a path to a file')

    for quote in quotes:
        author = quote[1]
        if author in houses:
            quote.append(houses[author])
        else:
            quotes.remove(quote)

    with open(filepath_quotes, 'w') as f:
        writer = csv.writer(f, delimiter=',')
        for quote in quotes:
            writer.writerow(quote)

if __name__ == "__main__":
    # scrape_greetingcardpoet(FILEPATH_QUOTES)
    # get_houses(FILEPATH_HOUSES)
    map_house_to_char(FILEPATH_QUOTES, FILEPATH_HOUSES)