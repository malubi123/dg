from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/search', methods=['GET'])
def search_youtube():
    query = request.args.get('query')
    search_url = f'https://www.youtube.com/results?search_query={query}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    video_data = []

    for video in soup.find_all('a', href=True):
        href = video['href']
        if '/watch?v=' in href:
            video_id = href.split('/watch?v=')[1].split('&')[0]
            title = video.get('title', 'No Title')
            thumbnail_url = f'https://img.youtube.com/vi/{video_id}/default.jpg'
            video_data.append({
                'id': video_id,
                'title': title,
                'thumbnail': thumbnail_url
            })

    return jsonify(video_data)

if __name__ == '__main__':
    app.run(port=5001)
