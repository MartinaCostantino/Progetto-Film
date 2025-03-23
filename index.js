const API_KEY = "6dee2619";
const carosello = document.getElementById("carosello");
const caroselloSerie = document.getElementById("caroselloSerie");
const caroselloTop = document.getElementById("caroselloTop");

async function fetchMovies() {
  try {
    const currentYear = "2024";
    const SEARCH_QUERY = "movie";
    const responseMovies = await fetch(
      `http://www.omdbapi.com/?s=${SEARCH_QUERY}&y=${currentYear}&type=movie&apikey=${API_KEY}`
    );
    const result = await responseMovies.json();

    if (result.Search) {
      const moviesDetails = await Promise.all(
        result.Search.map(async (movie) => {
          const detailsResponse = await fetch(
            `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
          );
          return await detailsResponse.json();
        })
      );

      const sortedMovies = moviesDetails
        .filter((movie) => movie.Released !== "N/A")
        .sort((a, b) => new Date(b.Released) - new Date(a.Released))
        .slice(0, 20);
      renderMovies(sortedMovies);
    } else {
      console.error("Nessun film trovato");
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchSeries() {
  try {
    const currentYear = "2022";
    const responseSeries = await fetch(
      `http://www.omdbapi.com/?s=series&y=${currentYear}&type=series&apikey=${API_KEY}`
    );
    const result = await responseSeries.json();

    if (result.Search) {
      const seriesDetails = await Promise.all(
        result.Search.map(async (series) => {
          const detailsResponse = await fetch(
            `http://www.omdbapi.com/?i=${series.imdbID}&apikey=${API_KEY}`
          );
          return await detailsResponse.json();
        })
      );

      const sortedSeries = seriesDetails
        .filter((series) => series.Released !== "N/A")
        .sort((a, b) => new Date(b.Released) - new Date(a.Released))
        .slice(0, 20);
      renderSeries(sortedSeries);
    } else {
      console.error("Nessuna serie TV trovata");
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchTopRated() {
  try {
    const currentYear = "2024";
    const movieTopResponse = await fetch(
      `http://www.omdbapi.com/?s=movie&y=${currentYear}&type=movie&apikey=${API_KEY}`
    );
    const movieResult = await movieTopResponse.json();

    const moviesDetails = movieResult.Search
      ? await Promise.all(
          movieResult.Search.map(async (movie) => {
            const detailsResponse = await fetch(
              `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
            );
            return await detailsResponse.json();
          })
        )
      : [];

    const seriesTopResponse = await fetch(
      `http://www.omdbapi.com/?s=series&y=${currentYear}&type=series&apikey=${API_KEY}`
    );
    const seriesResult = await seriesTopResponse.json();

    const seriesDetails = seriesResult.Search
      ? await Promise.all(
          seriesResult.Search.map(async (series) => {
            const detailsResponse = await fetch(
              `http://www.omdbapi.com/?i=${series.imdbID}&apikey=${API_KEY}`
            );
            return await detailsResponse.json();
          })
        )
      : [];

    const allItems = [...moviesDetails, ...seriesDetails];

    const topRated = allItems
      .filter((item) => item.imdbRating !== "N/A")
      .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating))
      .slice(0, 20);

    renderTopRated(topRated);
  } catch (error) {
    console.error(error);
  }
}

function renderMovies(films) {
  carosello.innerHTML = "";

  films.forEach((film) => {
    const card = document.createElement("div");
    card.className = "card";

    const immagine = document.createElement("img");
    immagine.className = "immagine";
    immagine.src = film.Poster !== "N/A" ? film.Poster : "placeholder.jpg";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = film.Title;

    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent =
      film.imdbRating !== "N/A" ? `Rating: ${film.imdbRating}` : "Rating: N/A";

    const releaseDate = document.createElement("div");
    releaseDate.className = "release";
    releaseDate.textContent = `Released: ${film.Released}`;

    const description = document.createElement("div");
    description.className = "description";
    description.textContent =
      film.Plot !== "N/A" ? film.Plot : "Descrizione non disponibile.";

    description.style.display = "none";

    card.addEventListener("mouseover", () => {
      description.style.display = "block";
    });

    card.addEventListener("mouseout", () => {
      description.style.display = "none";
    });

    card.appendChild(immagine);
    card.appendChild(nome);
    card.appendChild(rating);
    card.appendChild(releaseDate);
    card.appendChild(description);
    carosello.appendChild(card);
  });
}

function renderSeries(series) {
  caroselloSerie.innerHTML = "";

  series.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "card";

    const immagine = document.createElement("img");
    immagine.className = "immagine";
    immagine.src = serie.Poster !== "N/A" ? serie.Poster : "placeholder.jpg";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = serie.Title;

    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent =
      serie.imdbRating !== "N/A"
        ? `Rating: ${serie.imdbRating}`
        : "Rating: N/A";

    const releaseDate = document.createElement("div");
    releaseDate.className = "release";
    releaseDate.textContent = `Released: ${serie.Released}`;

    const description = document.createElement("div");
    description.className = "description";
    description.textContent =
      serie.Plot !== "N/A" ? serie.Plot : "Descrizione non disponibile.";

    description.style.display = "none";

    card.addEventListener("mouseover", () => {
      description.style.display = "block";
    });

    card.addEventListener("mouseout", () => {
      description.style.display = "none";
    });

    card.appendChild(immagine);
    card.appendChild(nome);
    card.appendChild(rating);
    card.appendChild(releaseDate);
    card.appendChild(description);
    caroselloSerie.appendChild(card);
  });
}

function renderTopRated(tops) {
  caroselloTop.innerHTML = "";

  tops.forEach((top) => {
    const card = document.createElement("div");
    card.className = "card";

    const immagine = document.createElement("img");
    immagine.className = "immagine";
    immagine.src = top.Poster !== "N/A" ? top.Poster : "placeholder.jpg";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = top.Title;

    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent =
      top.imdbRating !== "N/A" ? `Rating: ${top.imdbRating}` : "Rating: N/A";

    const releaseDate = document.createElement("div");
    releaseDate.className = "release";
    releaseDate.textContent = `Released: ${top.Released}`;

    const description = document.createElement("div");
    description.className = "description";
    description.textContent =
      top.Plot !== "N/A" ? top.Plot : "Descrizione non disponibile.";

    description.style.display = "none";

    card.addEventListener("mouseover", () => {
      description.style.display = "block";
    });

    card.addEventListener("mouseout", () => {
      description.style.display = "none";
    });

    card.appendChild(immagine);
    card.appendChild(nome);
    card.appendChild(rating);
    card.appendChild(releaseDate);
    card.appendChild(description);
    caroselloTop.appendChild(card);
  });
}

function scrollCarouselF(direction) {
  carosello.scrollBy({ left: direction, behavior: "smooth" });
}

function scrollCarouselS(direction) {
  caroselloSerie.scrollBy({ left: direction, behavior: "smooth" });
}

function scrollCarouselT(direction) {
  caroselloTop.scrollBy({ left: direction, behavior: "smooth" });
}

fetchMovies();
fetchSeries();
fetchTopRated();
