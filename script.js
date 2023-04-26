const start = document.querySelector("#start");
const answer = document.querySelector("#choices");
const quiz = document.querySelector("#quiz");
const clear = document.querySelector("#timer");
const submit = document.querySelector("#submit");

const questions = ["What does API stand for?", "Which symbols denote an array?",
    "Which language is NOT used in webpages?", "Which command will switch to a new branch?",
    "What HTML type will display text as a heading?", "What CSS command will bold text?",
    "Which function will add two arrays?", "How many argument are required in a 'for' loop?"];

const answers = [["Application Programming Interface", "Application to Program Internet",
    "Amateur Programming Interface", "Application Public Interfaces"], ['"  "', "[  ]",
    "(  )", "{  }"], ["JavaScript", "CSS", "HTML", "Visual Basic"], ["git push", "git checkout",
    "git branch", "git switch"], ["<h1>", "<head>", "<header>", "<p>"], ["font-weight", "font-type",
    "font-bold", "bold-font"], ["+", "concat", "smush", "add"], ["0", "1", "2", "3"]];

const correct = ["Application Programming Interface", "[  ]", "Visual Basic", "git checkout",
    "<h1>", "font-weight", "concat", "3"];

let score = 0;
let timeleft = 100;
let wrong = 0;
let right = 0;
let timeMinus = 0;
let option = 0;
const numberQuestions = questions.length;

// starts the quiz
start.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const element = event.target;

    if (element.matches("#start")) {
        hideInit();
        renderQuestion();
        timer(timeleft);

        // sets background color for answer choices 
        // do here so it doesn't show up on load
        qback = document.querySelectorAll("li");
        for (let i = 0; i < qback.length; i++) {
            qback[i].setAttribute("style", "background-color: bisque")
        }
    };
});

// hides header, instructions and high score link
function hideInit() {
    goaway = document.querySelectorAll(".display");
    for (let i = 0; i < goaway.length; i++) {
        goaway[i].setAttribute("style", "display: none");
    }
}

// when a guess is chosen logs it as right or wrong
// then brings up next question
answer.addEventListener("click", function (event) {
    event.stopPropagation();
    const element = event.target;

    if (element.matches("li")) {
        if (element.textContent != correct[option]) {
            wrong++;
        } else {
            right++;
        };
        nextQuestion();
    }
});

// deletes correct answer from array and if not done
// puts up next question
function nextQuestion() {
    correct.splice(option, 1);

    if (questions.length == 0) {
        score = document.getElementById("counter").textContent;
        quiz.setAttribute("style", "display: none");
    } else {
        renderQuestion();
    }
}

// randomly chooses and displays question then deletes
// from array so it can't be chosen again
function renderQuestion() {
    option = Math.floor(Math.random() * questions.length);
    document.getElementById("Question").textContent = questions[option];
    questions.splice(option, 1);

    for (let i = 1; i <= 4; i++) {
        let choice = Math.floor(Math.random() * answers[option].length);
        let target = "choice" + i;
        document.getElementById(target).textContent = answers[option][choice];
        answers[option].splice(choice, 1);
    };
    answers.splice(option, 1);
    return option;
}

// keeps track of the countdown timer
function timer(timeleft) {
    // subtracts time for incorrect guess
    const timeInterval = setInterval(function () {
        if (timeMinus != wrong) {
            timeleft = timeleft - 15;
            timeMinus++;
        }
        
        timeleft--;
        if (timeleft < 0 || score != 0) {
            nextQuestion();
            clearInterval(timeInterval);
            gameEnd();
        } else {
            document.getElementById("counter").textContent = timeleft;
        }
    }, 1000);
}

// game end message and store score
function gameEnd() {
    clear.setAttribute("style", "display: none")

    const showup = document.querySelectorAll(".show");
    localStorage.setItem("score", score);
    document.getElementById("congrats").textContent = "Congratulations! You finished the quiz.  You got "
        + (right) + " questions right and " + wrong + " incorrect guesses. Your score was "
        + score + ". Click below to log your score."

    for (let i = 0; i < showup.length; i++) {
        showup[i].setAttribute("style", "display: block");
    }

}