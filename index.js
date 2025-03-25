const API_KEY = "6dee2619";
const caroselloDal = document.getElementById("caroselloDal");
const caroselloSerieDal = document.getElementById("caroselloSerieDal");
const caroselloTopDal = document.getElementById("caroselloTopDal");

async function fetchMovies() {
  try {
    const currentYear = "2025";
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
    const currentYear = "2024";
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
  caroselloDal.innerHTML = "";

  films.forEach((film) => {
    const cardDal = document.createElement("div");
    cardDal.className = "cardDal";

    const immagineDal = document.createElement("img");
    immagineDal.className = "immagine";
    immagineDal.src = film.Poster !== "N/A" ? film.Poster : "placeholder.jpg";

    const nomeDal = document.createElement("div");
    nomeDal.className = "nomeDal";
    nomeDal.textContent = film.Title;

    const ratingDal = document.createElement("div");
    ratingDal.className = "ratingDal";
    ratingDal.textContent =
      film.imdbRating !== "N/A" ? `Rating: ${film.imdbRating}` : "Rating: N/A";

    const releaseDateDal = document.createElement("div");
    releaseDateDal.className = "releaseDal";
    releaseDateDal.textContent = `Released: ${film.Released}`;

    const descriptionDal = document.createElement("div");
    descriptionDal.className = "descriptionDal";
    descriptionDal.textContent =
      film.Plot !== "N/A" ? film.Plot : "Descrizione non disponibile.";

    descriptionDal.style.display = "none";

    cardDal.addEventListener("mouseover", () => {
      descriptionDal.style.display = "block";
    });

    cardDal.addEventListener("mouseout", () => {
      descriptionDal.style.display = "none";
    });

    cardDal.appendChild(immagineDal);
    cardDal.appendChild(nomeDal);
    cardDal.appendChild(ratingDal);
    cardDal.appendChild(releaseDateDal);
    cardDal.appendChild(descriptionDal);
    caroselloDal.appendChild(cardDal);
  });
}

function renderSeries(series) {
  caroselloSerieDal.innerHTML = "";

  series.forEach((serie) => {
    const cardDal = document.createElement("div");
    cardDal.className = "cardDal";

    const immagineDal = document.createElement("img");
    immagineDal.className = "immagineDal";
    immagineDal.src = serie.Poster !== "N/A" ? serie.Poster : "placeholder.jpg";

    const nomeDal = document.createElement("div");
    nomeDal.className = "nomeDal";
    nomeDal.textContent = serie.Title;

    const ratingDal = document.createElement("div");
    ratingDal.className = "ratingDal";
    ratingDal.textContent =
      serie.imdbRating !== "N/A"
        ? `Rating: ${serie.imdbRating}`
        : "Rating: N/A";

    const releaseDateDal = document.createElement("div");
    releaseDateDal.className = "releaseDal";
    releaseDateDal.textContent = `Released: ${serie.Released}`;

    const descriptionDal = document.createElement("div");
    descriptionDal.className = "descriptionDal";
    descriptionDal.textContent =
      serie.Plot !== "N/A" ? serie.Plot : "Descrizione non disponibile.";

    descriptionDal.style.display = "none";

    cardDal.addEventListener("mouseover", () => {
      descriptionDal.style.display = "block";
    });

    cardDal.addEventListener("mouseout", () => {
      descriptionDal.style.display = "none";
    });

    cardDal.appendChild(immagineDal);
    cardDal.appendChild(nomeDal);
    cardDal.appendChild(ratingDal);
    cardDal.appendChild(releaseDateDal);
    cardDal.appendChild(descriptionDal);
    caroselloSerieDal.appendChild(cardDal);
  });
}

function renderTopRated(tops) {
  caroselloTopDal.innerHTML = "";

  tops.forEach((top) => {
    const cardDal = document.createElement("div");
    cardDal.className = "cardDal";

    const immagineDal = document.createElement("img");
    immagineDal.className = "immagineDal";
    immagineDal.src = top.Poster !== "N/A" ? top.Poster : "placeholder.jpg";

    const nomeDal = document.createElement("div");
    nomeDal.className = "nomeDal";
    nomeDal.textContent = top.Title;

    const ratingDal = document.createElement("div");
    ratingDal.className = "ratingDal";
    ratingDal.textContent =
      top.imdbRating !== "N/A" ? `Rating: ${top.imdbRating}` : "Rating: N/A";

    const releaseDateDal = document.createElement("div");
    releaseDateDal.className = "releaseDal";
    releaseDateDal.textContent = `Released: ${top.Released}`;

    const descriptionDal = document.createElement("div");
    descriptionDal.className = "descriptionDal";
    descriptionDal.textContent =
      top.Plot !== "N/A" ? top.Plot : "Descrizione non disponibile.";

    descriptionDal.style.display = "none";

    cardDal.addEventListener("mouseover", () => {
      descriptionDal.style.display = "block";
    });

    cardDal.addEventListener("mouseout", () => {
      descriptionDal.style.display = "none";
    });

    cardDal.appendChild(immagineDal);
    cardDal.appendChild(nomeDal);
    cardDal.appendChild(ratingDal);
    cardDal.appendChild(releaseDateDal);
    cardDal.appendChild(descriptionDal);
    caroselloTopDal.appendChild(cardDal);
  });
}

function scrollCarouselF(direction) {
  caroselloDal.scrollBy({ left: direction, behavior: "smooth" });
}

function scrollCarouselS(direction) {
  caroselloSerieDal.scrollBy({ left: direction, behavior: "smooth" });
}

function scrollCarouselT(direction) {
  caroselloTopDal.scrollBy({ left: direction, behavior: "smooth" });
}

fetchMovies();
fetchSeries();
fetchTopRated();
