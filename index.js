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

async function recuperaFilm() {
  const query = input.value;
  if (!query) return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    );
    const data = await response.json();

    if (data.Search) {
      showMovies(
        data.Search.map((film) => ({
          title: film.Title,
          image: film.Poster !== "N/A" ? film.Poster : "placeholder.jpg",
        }))
      );
    } else {
      main.innerHTML = "<p>Nessun film trovato</p>";
    }
  } catch {
    main.innerHTML = "<p>Errore nel recupero dei dati</p>";
  }
}

async function recuperaAnime() {
  const query = input.value;
  if (!query) return;

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();

    if (data.data.length) {
      showAnime(
        data.data.map((anime) => ({
          title: anime.title,
          image: anime.images.jpg.image_url,
        }))
      );
    } else {
      main.innerHTML += "<p>Nessun anime trovato</p>";
    }
  } catch {
    main.innerHTML += "<p>Errore nel recupero degli anime</p>";
  }
}

// Funzione per mostrare FILM
function showMovies(datas) {
  main.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("movies-container");

  const titles = document.createElement("h1");
  titles.classList.add("movies-title");
  titles.innerText = "Film";

  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h2 = document.createElement("h2");
    h2.classList.add("card-title");
    h2.textContent = data.title;

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.title);
    div.appendChild(h2);
    div.appendChild(img);

    container.appendChild(div);
  });
  main.appendChild(titles);
  main.appendChild(container);
}

// Funzione per mostrare ANIME
function showAnime(datas) {
  const container = document.createElement("div");
  container.classList.add("movies-container");
  const title = document.createElement("h1");
  title.classList.add("anime-title");
  title.innerText = "Anime";
  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const h2 = document.createElement("h2");
    h2.classList.add("card-title");
    h2.textContent = data.title;

    const img = document.createElement("img");
    img.setAttribute("src", data.image);
    img.setAttribute("alt", data.title);

    div.appendChild(h2);
    div.appendChild(img);

    container.appendChild(div);
  });
  main.appendChild(title);
  main.appendChild(container);
}
