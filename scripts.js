document.getElementById("fetch-music").addEventListener("click", async () => {
    const musicSection = document.getElementById("music-section");
    const musicList = document.getElementById("music-list");

    try {
        const response = await fetch("https://api.example.com/top-tracks"); // Replace with a real API
        const data = await response.json();

        musicList.innerHTML = data.tracks.map(track => `
            <div class="track">
                <h3>${track.name}</h3>
                <p>${track.artist}</p>
            </div>
        `).join('');
        
        musicSection.classList.remove("hidden");
    } catch (error) {
        console.error("Error fetching music data:", error);
    }
});
