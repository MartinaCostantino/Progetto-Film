
// QUIZ
const navBarQuiz = document.querySelector(".navbar_main_pc")
const inizaBtn = document.querySelector(".iniza-btn")
    const quiz_conteiner_list = document.querySelector(".quiz_conteiner_list")
    async function trivia() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=20&category=11&type=multiple`);
            const responseJson = await response.json();
            results = responseJson.results;
            console.log(responseJson.results);
            const question = results.find((x) => x.question)
            creaDomanda(question)
            console.log(question);
            
        } catch (error) {
            console.error(error)   
        }
    }
    
    function creaDomanda(question){
        const card_quiz = document.createElement("div")
        card_quiz.setAttribute("class","card_quiz")
        const titolo = document.createElement("h4")
        titolo.setAttribute("class","titoloDom")
        const info_quiz = document.createElement("div")
        info_quiz.setAttribute("class","info_quiz")
        const incorrect_answ = document.createElement("p")
        incorrect_answ.setAttribute("class", "incorrect_answ")
        const correct_answ = document.createElement("p")
        correct_answ.setAttribute("class", "correct_answ")
         
        quiz_conteiner_list.innerHTML = "";

        titolo.innerHTML = question.question;
        incorrect_answ.innerHTML = question.incorrect_answers;
        correct_answ.innerHTML = question.correct_answer;
        let answers = [
          question.incorrect_answers[0],
          question.incorrect_answers[1],
          question.incorrect_answers[2],
          question.correct_answer
         ]
        console.log(answers)
        answers.sort(() => Math.random() - 0.5);

        card_quiz.appendChild(titolo)
        answers.forEach((risp) => {
          const buttonRisp = document.createElement("button") 
          buttonRisp.setAttribute("class", "risposta")
          buttonRisp.innerHTML = risp;
          info_quiz.appendChild(buttonRisp)
          buttonRisp.addEventListener("click", () => soluzione(buttonRisp, risp,  question.correct_answer) )
        })
        card_quiz.appendChild(info_quiz)
        quiz_conteiner_list.appendChild(card_quiz)

        
    }
    inizaBtn.addEventListener("click", trivia)   
    
    function soluzione(buttonRisp, risp, correct_answer){
        const risposte = document.querySelectorAll(".risposta");
        const win = document.createElement("p")
        const lose = document.createElement("p")
        win.setAttribute("class","win")
        lose.setAttribute("class","lose")
        win.innerText = "WIN!!! 🎉";
        lose.innerText = "OH NO, YOU LOSE! 🙁";
        inizaBtn.innerText = "Play again!";
        inizaBtn.setAttribute("style", "width: 120px;")
        navBarQuiz.appendChild(inizaBtn)

        risposte.forEach(btn => {
        btn.disabled = true;
        });

        if (risp === correct_answer) {
                buttonRisp.classList.add("correct");
                quiz_conteiner_list.appendChild(win)
                
            } else {
                buttonRisp.classList.add("incorrect");
                risposte.forEach(btn=>{
                    if(btn.innerText === correct_answer){
                        btn.classList.add("correct")
                    }
                    quiz_conteiner_list.appendChild(lose)
                })}    
     }
    
    
    
// FOOTER

document.getElementById("year").textContent = new Date().getFullYear();



// HEADER
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

// Step 1: get DOM elements
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
  nextDom.click();
}, timeAutoNext);

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}

function updateThumbnails() {
  const thumbnailContainer = document.querySelector(".carousel .thumbnail");
  if (thumbnailContainer) {
    thumbnailContainer.style.width = "0";
    thumbnailContainer.style.height = "0";
    thumbnailContainer.style.opacity = "0";
    thumbnailContainer.style.overflow = "hidden";
    thumbnailContainer.style.pointerEvents = "none";
    thumbnailContainer.style.visibility = "hidden";
  }
}

window.addEventListener("load", updateThumbnails);
window.addEventListener("resize", updateThumbnails);

