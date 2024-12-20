document.getElementById("fetch-music").addEventListener("click", async () => {
    const clientId = '51005926db654a3b9ad28afa01128d1a';
    const clientSecret = 'd920251ae7934b69ac73d6dce489b6e7';


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
