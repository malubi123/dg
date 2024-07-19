from flask import Flask, request, send_file, abort
import requests
from io import BytesIO

app = Flask(__name__)

@app.route('/download', methods=['GET'])
def download_video():
    video_id = request.args.get('video_id')
    if not video_id:
        abort(400, 'Missing video_id parameter')
    
    # URL do pobierania pliku wideo (należy dostosować)
    download_url = f'https://www.y2mate.com/youtube/{video_id}'
    
    try:
        response = requests.get(download_url)
        response.raise_for_status()  # Sprawdza, czy żądanie zakończyło się błędem
        
        # Pobieranie i przesyłanie pliku
        return send_file(BytesIO(response.content), as_attachment=True, attachment_filename=f'{video_id}.mp4', mimetype='video/mp4')
    except requests.RequestException:
        abort(500, 'Failed to download video')

if __name__ == '__main__':
    app.run(port=5002)
