let scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
const submit = document.querySelector("#submit");
const newScore = localStorage.getItem("score");
const clear = document.querySelector("#clear")

submit.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const element = event.target;
    if (element.matches("input")) {
        const initials = document.getElementById("highscore");
        localStorage.setItem("initials", initials[0].value);
        initials[0].value = "";
    }
    highScoreList();
});

function highScoreList() {
    const newInitials = localStorage.getItem("initials");
    const newEntry = [{
        initials: newInitials,
        score: newScore,
    }];
    if (scoreArray == null) {
        scoreArray = newEntry;
    } else {
        scoreArray.push(newEntry);
    }
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    renderHighScore();
}

function renderHighScore() {
    for (let i = 0; i < scoreArray.length; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode([scoreArray[i].initials,
            scoreArray[i].score]);
        node.appendChild(textnode);
        document.getElementById("high").appendChild(node);
    }
}

clear.addEventListener("click", function (event) {
    event.stopPropagation();
    const element = event.target;
    const popper = scoreArray.length;
    if (element.matches("button")) {
        for (let i = 0; i < popper; i++) {
            scoreArray.pop();
        }
    }
    localStorage.setItem("scoreArray", scoreArray);
    renderHighScore();
});

renderHighScore();