const start = document.querySelector("#start");
const answer = document.querySelector("#choices");
const quiz = document.querySelector("#quiz");
const clear = document.querySelector("#timer");
const submit = document.querySelector("#submit");
const questions = ["What does API stand for?"];
const answers = [["Application Programming Interface", "Application to Program Internet",
    "Amateur Programming Interface", "Application Public Interfaces"]];
const correct = ["Application Programming Interface"];
let score = "";
let timeleft = 75;
let wrong = 0;

start.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    const element = event.target;
    
    if (element.matches("#start")) {
        hideInit();
        renderQuestion();
        timer(timeleft);
    };
});

function hideInit() {
    goaway = document.querySelectorAll(".display");
    for (let i = 0; i < goaway.length; i++) {
        goaway[i].setAttribute("style", "display: none");
    }
}

answer.addEventListener("click", function(event){
        event.stopPropagation();
        const element = event.target;

        if (element.matches("li")) {
            if (element.textContent != correct[localStorage.getItem("option")]) {
                wrong++;
            };

            if (questions.length == 0) {
                score = document.getElementById("counter").textContent - (wrong * 15);
                quiz.setAttribute("style", "display: none"); 
            } else {
                renderQuestion();
            }
        }
});

function renderQuestion() {
    let option = Math.floor(Math.random()*questions.length);
    document.getElementById("Question").textContent = questions[option];
    questions.splice(option, 1);
    
    for (let i  = 1; i <= 4; i++) {
        let choice = Math.floor(Math.random()*answers[option].length);
        let target = "choice" + i;
        document.getElementById(target).textContent = answers[option][choice];
        answers[option].splice(choice, 1);
    };
    localStorage.setItem("option", option);
}

function timer(timeleft) {
    let timeInterval = setInterval(function() {
        timeleft --;
        if (timeleft < 0 || score != "") {
            clearInterval(timeInterval);
            gameEnd();
        } else {
            document.getElementById("counter").textContent = timeleft;
        }
    },1000);
}

function gameEnd() {
    clear.setAttribute("style", "display: none")
    
    const showup = document.querySelectorAll(".show");
    localStorage.setItem("score", score);
    document.getElementById("congrats").textContent = "Congratulations! You finished the quiz.  You got " 
        + (1 - wrong) + " questions right and " + wrong + " questions wrong. Your score was " 
        + score + ". Click below to see how you stack up."
    for (let i = 0; i < showup.length; i++) {
        showup[i].setAttribute("style", "display: block");
    }
    submit.addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        const element = event.target;
        if (element.matches("button")) {
            localStorage.setItem("initials", document.getElementById("initials").textContent);
        }
    });
}