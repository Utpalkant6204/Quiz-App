const que = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1: 'if(i==5)',
        choice2: 'if i==5 then',
        choice3: 'if i=5 then',
        choice4: 'if i==5',
        answer: 1,
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        choice1: 'var colors = ["red", "green", "blue"]',
        choice2: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        choice3: 'var colors = (1:"red", 2:"green", 3:"blue")',
        choice4: 'var colors = "red", "green", "blue"',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
let p = CORRECT_BONUS * MAX_QUESTIONS;


function startGame () {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        localStorage.setItem("mostRecentScore", score);
        localStorage.setItem("maxScore", p);
        return window.location.assign('end.html');
    }
    
    questionCounter++;
    progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    que.innerText = currentQuestion.question;
    
    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const ans = selectedAnswer == currentQuestion.answer ? "correct" : "wrong";
        selectedChoice.parentElement.classList.add(ans);

        if(ans=="correct")
        {
            score += CORRECT_BONUS;
            scoreText.innerText = score;
        }
        
       setTimeout(() => {
           selectedChoice.parentElement.classList.remove(ans);
           getNewQuestion();
         }, 800);
    
    });
});


startGame();

