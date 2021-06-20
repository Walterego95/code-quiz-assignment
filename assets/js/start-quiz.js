// question const in DOM...
const questionEl = document.getElementById("question");
// answers in DOM...
const choicesEl = Array.from(document.getElementsByClassName("choice-text"));
// timer...
const timerContainerEl = document.getElementById("timer-container");

// start with empty question object...
let currentQuestion = {};
// create variable that pauses the clicking option for answer buttons...
let acceptingAnswers = false;
// start score at zero...
let score = 0;
// start with zero as question counter...
let questionCounter = 0;
// empty array so that questions are placed and pulled from here...
let availableQuestions = [];
// array with questions, answers and correct answers...
let questions = [
    {
        question: "2+2 equals...",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "22",
        answer: 3
    },
    {
        question: "Humans have a total of ______ fingers.",
        choice1: "5",
        choice2: "10",
        choice3: "20",
        choice4: "24",
        answer: 3
    },
    {
        question: "Does chinese language contain latin or roman numbers at all?",
        choice1: "yes",
        choice2: "no",
        choice3: "it is a hybrid language",
        choice4: "absolutely not",
        answer: 2,
        answer: 4
    }
];

// wrong answer takes off three seconds...
const wrongAnswer = 3;
// max questions...
const maxQuestions = 3;

// array that calls getNewQuestion function...
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

// turns on timer...
getNewQuestion = () => {
    startCount();
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        // go to game ending page...
        stopCount();
        return window.location.assign("game-ending.html");
    };

    // question counter adder...
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // for each choice element...
    choicesEl.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });
    //remove current question from availableQuestions object array
    availableQuestions.splice(questionIndex, 1);
    //ready to accept answers after delay
    acceptingAnswers = true;
};

// click for each choice...
choicesEl.forEach(choice => {
    choice.addEventListener("click", event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        // const for clicked button...
        const selectedChoice = event.target;
        // const for clicked button's data number...
        const selectedAnswer = selectedChoice.dataset["number"];

        // labels for right or wrong answers... 
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        // take off 3 seconds from timer if answer is incorrect...
        if (classToApply === "incorrect") {
            c -= 3;
        }

        // button color change based on right or wrong answer... 
        selectedChoice.parentElement.classList.add(classToApply);

        // set timeout to refresh new answers...
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// timer functions...
let c = 95;
let t;
let timer_is_on = 0;
// sets the time counted and also stops count...
timedCount = () => {
    timerContainerEl.textContent = "Timer:" + c;
    score = c;
    c = c - 1;
    t = setTimeout(timedCount, 1000);
    if (c < 0) {
        localStorage.setItem("mostRecentScore", 0);
        stopCount();
        window.location.assign("game-ending.html");
    }
}

// starts timer...
function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

// stops timer...
function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}
// starting the game...
startGame();
