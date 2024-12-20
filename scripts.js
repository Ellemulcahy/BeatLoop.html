async function searchMusic() {
    const query = document.getElementById('search').value;
    const clientId = '51005926db654a3b9ad28afa01128d1a'; 
    const clientSecret = 'd920251ae7934b69ac73d6dce489b6e7'; 

    try {
        // Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Fetch music data from Spotify API
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        const musicContainer = document.getElementById('music-container');
        musicContainer.innerHTML = '';

        if (data.tracks.items.length === 0) {
            musicContainer.innerHTML = '<p>No results found. Please try a different search term.</p>';
        } else {
            data.tracks.items.forEach(track => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('track');
                trackElement.innerHTML = `
                    <img src="${track.album.images[0].url}" alt="Album Cover">
                    <h3>${track.name}</h3>
                    <p>${track.artists[0].name}</p>
                    <audio controls>
                        <source src="${track.preview_url}" type="audio/mpeg">
                    </audio>
                `;
                musicContainer.appendChild(trackElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('music-container').innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

