async function searchLyrics() {
    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;
    const lyricsContainer = document.getElementById('lyrics-container');

    if (!artist || !song) {
        lyricsContainer.innerHTML = '<p>Please enter both artist and song title.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
        const data = await response.json();

        if (data.lyrics) {
            lyricsContainer.innerHTML = `
                <div class="lyrics">
                    <h3>${song} by ${artist}</h3>
                    <pre>${data.lyrics}</pre>
                </div>
            `;
        } else {
            lyricsContainer.innerHTML = '<p>Lyrics not found. Please try a different song.</p>';
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        lyricsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

