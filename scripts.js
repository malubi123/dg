async function downloadFile(videoId) {
    try {
        // Użyj lokalnego serwera proxy do pobrania pliku
        const response = await fetch(`http://localhost:5002/download?video_id=${videoId}`);
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        } else {
            console.error('Failed to download video');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function downloadAndPlay(videoId, title) {
    // Ukryj wyniki wyszukiwania
    document.getElementById('results').style.display = 'none';
    
    // Pokaż odtwarzacz
    document.getElementById('player').style.display = 'block';
    
    // Przygotuj odtwarzacz
    const videoPlayer = document.getElementById('videoPlayer');
    const videoUrl = await downloadFile(videoId);
    if (videoUrl) {
        videoPlayer.src = videoUrl;
        videoPlayer.load();
        videoPlayer.play();
    }
}
