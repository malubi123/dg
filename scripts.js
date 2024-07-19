async function searchVideos() {
    const query = document.getElementById('searchQuery').value;
    const response = await fetch(`http://localhost:5001/search?query=${encodeURIComponent(query)}`);
    const videos = await response.json();

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <a href="#" onclick="downloadAndPlay('${video.id}', '${video.title}')">
                <img src="${video.thumbnail}" alt="${video.title}">
                <span>${video.title}</span>
            </a>
        `;
        resultsContainer.appendChild(videoElement);
    });
}

async function downloadAndPlay(videoId, title) {
    // Ukryj wyniki wyszukiwania
    document.getElementById('results').style.display = 'none';
    
    // Pokaż odtwarzacz
    const playerContainer = document.getElementById('player');
    playerContainer.style.display = 'block';
    
    // Przygotuj odtwarzacz
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = `https://www.y2mate.com/youtube/${videoId}`; // Link do pobierania, zamień na prawdziwy link, jeśli dostępny
    videoPlayer.load();
    videoPlayer.play();

    // Wykonaj pobieranie pliku w tle
    // Użyj Fetch API lub XMLHttpRequest do pobrania pliku (np. przez serwer proxy)
}
