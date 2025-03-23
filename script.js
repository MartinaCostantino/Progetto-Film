document.addEventListener("DOMContentLoaded", async function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    async function fetchAnime() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/anime");
            const data = await response.json();
            
            console.log("Dati ricevuti dall'API:", data); 
    
            
            if (data && data.data) {
                return data.data; 
            } else {
                console.error("Nessun dato disponibile");
                return []; 
            }
        } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
            return []; 
        }
    }
    
    
    function createAnimeCard(anime) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="nome">${anime.title}</div>
            <div class="rating">⭐ ${anime.score}</div>
            <div class="release">${anime.aired.string}</div>
            <div class="description">${anime.synopsis}</div>
        `;
        return card;
    }

    async function loadCarousel() {
        const animes = await fetchAnime();
        
   
        if (Array.isArray(animes) && animes.length > 0) {
            carousel.innerHTML = "";
            animes.forEach(anime => {
                const card = createAnimeCard(anime);
                carousel.appendChild(card);
            });
        } else {
            console.error("Nessuna card da visualizzare");
        }
    }

    let scrollAmount = 0;
    const scrollStep = 300;

    nextButton.addEventListener("click", () => {
        scrollAmount += scrollStep;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevButton.addEventListener("click", () => {
        scrollAmount = Math.max(scrollAmount - scrollStep, 0);
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    await loadCarousel();
});
