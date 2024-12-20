async function searchMusic() {
    const query = document.getElementById('search').value.trim();
    const resultsContainer = document.getElementById('results-container');

    resultsContainer.innerHTML = ''; // Clear previous results

    if (!query) {
        resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.data.length === 0) {
            resultsContainer.innerHTML = '<p>No results found. Try a different search.</p>';
            return;
        }

        // Display the results
        data.data.forEach(track => {
            const trackElement = document.createElement('div');
            trackElement.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <img src="${track.album.cover}" alt="Album cover" style="width: 100px; height: 100px; border-radius: 10px;">
                    <p><strong>${track.title}</strong> by ${track.artist.name}</p>
                    <audio controls>
                        <source src="${track.preview}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p><a href="https://www.google.com/search?q=${encodeURIComponent(track.artist.name + ' ' + track.title + ' lyrics')}" target="_blank">Find Lyrics</a></p>
                </div>
                <hr>
            `;
            resultsContainer.appendChild(trackElement);
        });
    } catch (error) {
        console.error('Error fetching music:', error);
        resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}
