const start = document.querySelector("#start");
const answer = document.querySelector("#choices");
const q = document.querySelector("#Questions");
const a1 = document.querySelector("#choice1");
const a2 = document.querySelector("#choice2");
const a3 = document.querySelector("#choice3");
const a4 = document.querySelector("#choice4");
const questions = ["What does API stand for?"];
const answers = [["Application Programming Interface", "Application to Program Internet",
    "Amateur Programming Interface", "Application Public Interfaces"]];
const correct = ["Application Programming Interface"];
let score = "";
let timeleft = 75;
let wrong = 0;

start.addEventListener("click", function(event) {
    event.stopPropagation();
    const element = event.target;
    
    if (element.matches ("button") === true) {
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

        if (element.matches("li") === true) {
            if (element.textContent != correct[localStorage.getItem("option")]) {
                wrong++;
            };

            if (questions.length == 0) {
                score = timeleft - (wrong * 15);
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
            gameEnd(score);
        } else {
            document.getElementById("counter").textContent = timeleft;
        }
    },1000);
}

function gameEnd(timeleft) {
    // show end game screen
}