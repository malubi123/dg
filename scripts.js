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
            <a href="#" onclick="playVideo('${video.id}', '${video.title}')">
                <img src="${video.thumbnail}" alt="${video.title}">
                <span>${video.title}</span>
            </a>
        `;
        resultsContainer.appendChild(videoElement);
    });
}

function playVideo(videoId, title) {
    const playerContainer = document.getElementById('player');
    playerContainer.innerHTML = `
        <h2>Odtwarzacz dla: ${title}</h2>
        <iframe width="640" height="360" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}
