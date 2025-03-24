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



