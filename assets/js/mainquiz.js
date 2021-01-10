// multiplechoice questions and answers in one array
var questions = [
    {
        title: "Which built-in method returns the string representation of the number's value?",
        multipleChoice: ['toValue()','toNumber()','toString()','None of the above'],
        answer: 'toString()'
    },
    {
        title: 'Which of the following is not JavaScript Data Types?',
        multipleChoice: ['Undefined','Number','Boolean','Float'],
        answer: 'Float'
    },
    {
        title: 'Which built-in method combines the text of two strings and returns a new string?',
        multipleChoice: ['append()','concat()','attach()','None of above'],
        answer: 'concat()'
    },
    {
        title: 'Which built-in method sorts the elements of an array?',
        multipleChoice: ['changeOrder(order)', 'order()','sort()','None of the above'],
        answer: 'sort()'
    },
    {
        title: 'Inside which HTML element do we put the JavaScript?',
        multipleChoice: ['<js>','<scripting>','<script>','<javascript>'],
        answer: '<script>'
    }
]

// declare variables
var score = 0;
var questionList = 0;

var currentTime = document.getElementById('timer');
var timer = document.getElementById('startquiz');
var questionContainer = document.getElementById('questionContainer');
var wrapper = document.getElementById('container');
var timeInterval = 0;

var timeLeft = 80;
var penalty = 6;
var ulCreate = document.createElement('ul');
ulCreate.setAttribute('id', 'ul');

// trigger timer when start the quiz
function countdown() {
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            currentTime.textContent = 'Time left: '+ timeLeft;
            timeLeft--;
        } else {
            currentTime.textContent = "Time's up!";
            clearInterval(timeInterval);
            completed();
        }
    }, 1000);
    displayQuestions (questionList);
}
timer.addEventListener("click", countdown);

// display questions and choices to the page
function displayQuestions(questionList) {
    questionContainer.innerHTML ="";
    ulCreate.innerHTML="";
    var getQuestion = questions[questionList].title;
    var getChoice = questions[questionList].multipleChoice;
    // for loop to loop through questions information array
    for (var i=0; i<questions.length;i++) {
        // get the questions only   
        questionContainer.textContent = getQuestion;
        questionContainer.appendChild(ulCreate);
    }
    // pick the multiple choice
    getChoice.forEach(function(newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// compare player choices with answers
function compare(event) {
    var el = event.target;

    if (el.matches('li')) {
        var message = document.createElement('div');
        message.setAttribute('id', 'message');

        //if the answer is correct
        if(el.textContent === questions[questionList].answer) {
            score++;
            message.textContent = 'Correct answer';
        } else {
            // will subtrack 6 seconds off from the timeLeft
            timeLeft = timeLeft - penalty;
            message.textContent = 'Incorrect! the correct answer is: ' + questions[questionList].answer;
        }
    }
    // question list to find out number of the questions player on
    questionList++;

    if(questionList >= questions.length) {
        completed();
        message.textContent = "End of this Quiz! You got " + score + "/" + questions.length + " Correct!";
    } else {
        displayQuestions(questionList);
    }
    questionContainer.appendChild(message);
}

// after complete the quiz page
function completed() {
    questionContainer.innerHTML ="";
    currentTime.innerHTML = "";

    // heading
    var createHeading = document.createElement('h1');
    createHeading.setAttribute('id', "createHeading");
    createHeading.textContent = 'Quiz Completed!';
    questionContainer.appendChild(createHeading);

    // final score shows up
    var getScore = document.createElement('p');
    getScore.setAttribute('id', 'getScore');
    questionContainer.appendChild(getScore);

    // calculate the score
    if(timeLeft >= 0) {
        var timeRemain = timeLeft;
        clearInterval(timeInterval);
        getScore.textContent = "Your final score is: " + timeRemain;        
    }

    // label
    var label = document.createElement("label");
    label.setAttribute("id", "label");
    label.textContent = "Enter your initials: ";
    questionContainer.appendChild(label);

    // input box
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'initials');
    input.textContent = '';
    questionContainer.appendChild(input);

    // submit the score
    var submitScore = document.createElement('button');
    submitScore.setAttribute('type', 'submit');
    submitScore.setAttribute('id', 'submit');
    submitScore.textContent = 'Submit';
    questionContainer.appendChild(submitScore);

    // check if the initial is inputed or not    
    function inputSave() {
        var initials = input.value;

        if (!initials) {
            alert('Please input your initial.');
            return false;
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemain
            }
            console.log(finalScore);
            
            // storage the score
            var scoreList = localStorage.getItem('scoreList');
            if (scoreList === null) {
                scoreList = [];
            } else {
                scoreList = JSON.parse(scoreList);
            }
            scoreList.push(finalScore);
            var newScore = JSON.stringify(scoreList);
            localStorage.setItem('scoreList', newScore);
            // go to highscore page
            window.location = "highscore.html";
        }
    };
    // add listener to submit
    submitScore.addEventListener('click', inputSave);
}

