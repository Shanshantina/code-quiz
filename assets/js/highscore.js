// declare variables
var highScore = document.getElementById('highscore');
var goBack = document.getElementById('goback');
var clear = document.getElementById('clear');

// event listener add to clear the score
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

// retreive local storage
var scoreList = localStorage.getItem("scoreList");
scoreList = JSON.parse(scoreList);

if (scoreList !== null) {
    for (var i=0; i < scoreList.length; i++){
        var createList = document.createElement('li');
        createList.textContent = scoreList[i].initials + "'s " + "  score is " + scoreList[i].score + '.';
        highScore.appendChild(createList);
    }
}

goBack.addEventListener('click', function() {
    window.location = "index.html";
});


