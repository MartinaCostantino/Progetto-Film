// QUIZ
const navBarQuiz = document.querySelector(".navbar_main_pc");
const inizaBtn = document.querySelector(".iniza-btn");
const quiz_conteiner_list = document.querySelector(".quiz_conteiner_list");
async function trivia() {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=20&category=11&type=multiple`
    );
    const responseJson = await response.json();
    results = responseJson.results;
    console.log(responseJson.results);
    const question = results.find((x) => x.question);
    creaDomanda(question);
    console.log(question);
  } catch (error) {
    console.error(error);
  }
}

function creaDomanda(question) {
  const card_quiz = document.createElement("div");
  card_quiz.setAttribute("class", "card_quiz");
  const titolo = document.createElement("h4");
  titolo.setAttribute("class", "titoloDom");
  const info_quiz = document.createElement("div");
  info_quiz.setAttribute("class", "info_quiz");
  const incorrect_answ = document.createElement("p");
  incorrect_answ.setAttribute("class", "incorrect_answ");
  const correct_answ = document.createElement("p");
  correct_answ.setAttribute("class", "correct_answ");

  quiz_conteiner_list.innerHTML = "";

  titolo.innerHTML = question.question;
  incorrect_answ.innerHTML = question.incorrect_answers;
  correct_answ.innerHTML = question.correct_answer;
  let answers = [
    question.incorrect_answers[0],
    question.incorrect_answers[1],
    question.incorrect_answers[2],
    question.correct_answer,
  ];
  console.log(answers);
  answers.sort(() => Math.random() - 0.5);

  card_quiz.appendChild(titolo);
  answers.forEach((risp) => {
    const buttonRisp = document.createElement("button");
    buttonRisp.setAttribute("class", "risposta");
    buttonRisp.innerHTML = risp;
    info_quiz.appendChild(buttonRisp);
    buttonRisp.addEventListener("click", () =>
      soluzione(buttonRisp, risp, question.correct_answer)
    );
  });
  card_quiz.appendChild(info_quiz);
  quiz_conteiner_list.appendChild(card_quiz);
}
// inizaBtn.addEventListener("click", trivia);

function soluzione(buttonRisp, risp, correct_answer) {
  const risposte = document.querySelectorAll(".risposta");
  const win = document.createElement("p");
  const lose = document.createElement("p");
  win.setAttribute("class", "win");
  lose.setAttribute("class", "lose");
  win.innerText = "WIN!!! 🎉";
  lose.innerText = "OH NO, YOU LOSE! 🙁";
  inizaBtn.innerText = "Play again!";
  inizaBtn.setAttribute("style", "width: 120px;");
  navBarQuiz.appendChild(inizaBtn);

  risposte.forEach((btn) => {
    btn.disabled = true;
  });

  if (risp === correct_answer) {
    buttonRisp.classList.add("correct");
    quiz_conteiner_list.appendChild(win);
  } else {
    buttonRisp.classList.add("incorrect");
    risposte.forEach((btn) => {
      if (btn.innerText === correct_answer) {
        btn.classList.add("correct");
      }
      quiz_conteiner_list.appendChild(lose);
    });
  }
}

// FOOTER

document.getElementById("year").textContent = new Date().getFullYear();

// HEADER
// const hamMenu = document.querySelector(".ham-menu");
// const offScreenMenu = document.querySelector(".off-screen-menu");

// hamMenu.addEventListener("click", () => {
//   hamMenu.classList.toggle("active");
//   offScreenMenu.classList.toggle("active");
// });

// // carosello grande
// let nextDom = document.getElementById("next");
// let prevDom = document.getElementById("prev");

// let carouselDom = document.querySelector(".carousel");
// let SliderDom = carouselDom.querySelector(".carousel .list");
// let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
// let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
// let timeDom = document.querySelector(".carousel .time");

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
// let timeRunning = 3000;
// let timeAutoNext = 7000;

// nextDom.onclick = function () {
//   showSlider("next");
// };

// prevDom.onclick = function () {
//   showSlider("prev");
// };

// let runTimeOut;
// let runNextAuto = setTimeout(() => {
//   nextDom.click();
// }, timeAutoNext);

// function showSlider(type) {
//   let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
//   let thumbnailItemsDom = document.querySelectorAll(
//     ".carousel .thumbnail .item"
//   );

//   if (type === "next") {
//     SliderDom.appendChild(SliderItemsDom[0]);
//     thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//     carouselDom.classList.add("next");
//   } else {
//     SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//     thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//     carouselDom.classList.add("prev");
//   }

//   clearTimeout(runTimeOut);
//   runTimeOut = setTimeout(() => {
//     carouselDom.classList.remove("next");
//     carouselDom.classList.remove("prev");
//   }, timeRunning);

//   clearTimeout(runNextAuto);
//   runNextAuto = setTimeout(() => {
//     nextDom.click();
//   }, timeAutoNext);
// }

// function updateThumbnails() {
//   const thumbnailContainer = document.querySelector(".carousel .thumbnail");
//   if (thumbnailContainer) {
//     thumbnailContainer.style.width = "0";
//     thumbnailContainer.style.height = "0";
//     thumbnailContainer.style.opacity = "0";
//     thumbnailContainer.style.overflow = "hidden";
//     thumbnailContainer.style.pointerEvents = "none";
//     thumbnailContainer.style.visibility = "hidden";
//   }
// }

// window.addEventListener("load", updateThumbnails);
// window.addEventListener("resize", updateThumbnails);

// FILM

const API_KEY = "6dee2619";
const caroselloDal = document.getElementById("caroselloDal");
const caroselloSerieDal = document.getElementById("caroselloSerieDal");
const caroselloTopDal = document.getElementById("caroselloTopDal");

async function fetchMovies() {
  try {
    const currentYear = "2025";
    const SEARCH_QUERY = "movie";
    const responseMovies = await fetch(
      `http://www.omdbapi.com/?s=${SEARCH_QUERY}&y=${currentYear}&type=movie&apikey=6dee2619`
    );
    const result = await responseMovies.json();
    console.log(result);
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

// ANIME
document.addEventListener("DOMContentLoaded", async function () {
  const carouselAnime = document.querySelector(".carousel-a");
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
      animes.forEach((anime) => {
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
  document.querySelector(".carousel-a").scrollBy({
    left: 300,
    behavior: "smooth",
  });
}

function scrollPrev() {
  document.querySelector(".carousel-a").scrollBy({
    left: -300,
    behavior: "smooth",
  });
}
