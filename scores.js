let scoreArray = localStorage.getItem("scoreArray");
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
        initials.setAttribute("style", "display: none")
    }
    highScoreList();
});

function highScoreList() {
    const newInitials = localStorage.getItem("initials");
    const newEntry = {
        initials: newInitials,
        score: newScore,
    };
    if (scoreArray == null) {
        scoreArray = [newEntry];
    } else {
        scoreArray.push(newEntry);
    }
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    sort();
    renderHighScore();
}

function renderHighScore() {
    clearNodes();
    
    let popper = 0;
    if (scoreArray != null){
        scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
        sort();
        popper = scoreArray.length;
    }
    
    for (let i = 0; i < popper; i++) {
        const node = document.createElement("li");
        if(scoreArray[i].initials.length == 2) {
            scoreArray[i].initials = "\xa0" + scoreArray[i].initials
        }
        const hightext = scoreArray[i].initials + "\xa0 - \xa0"  + scoreArray[i].score
        const textnode = document.createTextNode(hightext);
        node.appendChild(textnode);
        document.getElementById("high").appendChild(node);
    }
}

clear.addEventListener("click", function (event) {
    event.stopPropagation();
    const element = event.target;
    if (element.matches("button")) {
        localStorage.removeItem("scoreArray");
        clearNodes()
    }
    renderHighScore();
});

function clearNodes() {
    const list = document.getElementById("high");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function sort() {
    if (scoreArray.length > 1) {
        for (let i=0; i < scoreArray.length-1; i++) {
            if (scoreArray[i].score < scoreArray[i+1].score) {
                let [mover] = scoreArray.splice(i+1,1);
                scoreArray.unshift(mover);
                i=-1;
            }
        }
    }
    
}

renderHighScore();