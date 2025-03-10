document.getElementById("search").addEventListener("input", function() {
    let query = this.value;
    if (query.length > 2) {
        fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
            .then(response => response.json())
            .then(data => {
                let animeList = document.getElementById("anime-list");
                animeList.innerHTML = "";
                data.data.slice(0, 10).forEach(anime => {
                    let animeCard = document.createElement("div");
                    animeCard.classList.add("anime-card");
                    animeCard.innerHTML = `
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                        <h3>${anime.title}</h3>
                        <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "No synopsis available"}</p>
                    `;
                    animeList.appendChild(animeCard);
                });
            });
    }
});