import csv
import requests
import os
from bs4 import BeautifulSoup

FILEPATH = 'quotes_hp.csv'

# https://www.greetingcardpoet.com/magical-harry-potter-quotes
def scrape_greetingcardpoet():
    filepath = FILEPATH
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

if __name__ == "__main__":
    scrape_greetingcardpoet()