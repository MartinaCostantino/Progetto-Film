const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const main = document.getElementById("main");
const input = document.getElementById("search");
const searchButton = document.querySelector(".searchbtn");
const apiKey = "202cd8db"; // per OMDB
const animeApiUrl = "https://api.jikan.moe/v4/anime";

searchButton.addEventListener("click", () => {
  recuperaFilm();
  recuperaAnime();
});

// Funzione per recuperare i FILM
async function recuperaFilm() {
  const query = input.value.trim();
  if (!query) return;

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  console.log("Chiamata API Film:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      const filmList = data.Search.map((film) => ({
        title: film.Title,
        image: film.Poster !== "N/A" ? film.Poster : "placeholder.jpg",
      }));

      showMovies(filmList);
    } else {
      console.log("Nessun film trovato:", data.Error);
      main.innerHTML =
        "<p style='color: white; text-align: center;'>Nessun film trovato</p>";
    }
  } catch (error) {
    console.error("Errore nel recupero dei film:", error);
    main.innerHTML =
      "<p style='color: white; text-align: center;'>Errore nel recupero dei dati</p>";
  }
}

// Funzione per recuperare gli ANIME
async function recuperaAnime() {
  const query = input.value.trim();
  if (!query) return;

  const url = `${animeApiUrl}?q=${query}`;
  console.log("Chiamata API Anime:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const animeList = data.data.map((anime) => ({
        title: anime.title,
        image: anime.images.jpg.image_url,
      }));

      showAnime(animeList);
    } else {
      console.log("Nessun anime trovato.");
    }
  } catch (error) {
    console.error("Errore nel recupero degli anime:", error);
  }
}

// Funzione per mostrare FILM
function showMovies(datas) {
  main.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("movies-container");

  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = data.title;

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.title);

    div.appendChild(img);
    div.appendChild(h2);
    container.appendChild(div);
  });

  main.appendChild(container);
}

// Funzione per mostrare ANIME
function showAnime(datas) {
  const container = document.createElement("div");
  container.classList.add("movies-container");

  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = data.title;

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.title);

    div.appendChild(img);
    div.appendChild(h2);
    container.appendChild(div);
  });

  main.appendChild(container);
}
