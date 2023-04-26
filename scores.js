let scoreArray = localStorage.getItem("scoreArray");
const submit = document.querySelector("#submit");
const newScore = localStorage.getItem("score");
const clear = document.querySelector("#clear")

// takes in initials and updates high score list
submit.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const element = event.target;
    if (element.matches("input")) {
        const initials = document.getElementById("highscore");
        initials.setAttribute("style", "display: none")
    }
    highScoreList();
    return initials;
});

// adds items to high score list or creates new list
function highScoreList() {
    const newEntry = {
        initials: initials.value,
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

// displays high score list
function renderHighScore() {
    clearNodes();
    
    let popper = 0;
    if (scoreArray != null){
        scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
        sort();
        popper = scoreArray.length;
    }
    
    // popper prevents error for loop if null array
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

// clear high scores from local storage and html when button is pressed 
clear.addEventListener("click", function (event) {
    event.stopPropagation();
    const element = event.target;
    if (element.matches("button")) {
        localStorage.removeItem("scoreArray");
        clearNodes()
    }
    renderHighScore();
});

// removes current html elements
function clearNodes() {
    const list = document.getElementById("high");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

//sorts scores by score
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