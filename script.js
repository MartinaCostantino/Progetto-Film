document.addEventListener("DOMContentLoaded", async function () {
    const carouselAnime= document.querySelector(".carousel-a");
    const prevButton = document.querySelector(".prev-anime");
    const nextButton = document.querySelector(".next-anime");

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
        const cardAnime = document.createElement("div");
        cardAnime.className = "card-anime";
        cardAnime.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="nome">${anime.title}</div>
            <div class="rating">⭐ ${anime.score}</div>
            <div class="release">${anime.aired.string}</div>
            <div class="description">${anime.synopsis}</div>
        `;
        return cardAnime;
    }

    async function loadCarousel() {
        const animes = await fetchAnime();
        
   
        if (Array.isArray(animes) && animes.length > 0) {
            carouselAnime.innerHTML = "";
            animes.forEach(anime => {
                const cardAnime = createAnimeCard(anime);
                carouselAnime.appendChild(cardAnime);
            });
        } else {
            console.error("Nessuna card da visualizzare");
        }
    }

    // let scrollAmount = 0;
    // const scrollStep = 300;

    // nextButton.addEventListener("click", () => {
    //     scrollAmount += scrollStep;
    //     carousel.style.transform = `translateX(-${scrollAmount}px)`;
    // });

    // prevButton.addEventListener("click", () => {
    //     scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    //     carousel.style.transform = `translateX(-${scrollAmount}px)`;
    // });

    await loadCarousel();
});

function scrollNext() {
    document.querySelector('.carousel-a').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
}

function scrollPrev(){
    document.querySelector('.carousel-a').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
}