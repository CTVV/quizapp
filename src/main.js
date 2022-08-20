import { GameData } from "./modules/gamedata";
import { shuffle } from "./modules/shuffle";
import { decodeHTMLEntities } from "./modules/htmlparser";
import "./modules/style.css";


// DOM elements
const menuElements = {
    mainPage: document.querySelector('.game-menu'),
    loading: document.querySelector('.loading'),
    questionChoice: Array.from(document.querySelectorAll('.query-question')),
}

const categoryElements = {
    selectPage: document.querySelector('.quiz-selection'),
    categoryChoice: Array.from(document.querySelectorAll('.query-category')),
}

const gameElements = {
    question: document.getElementById('question'),
    answers: Array.from(document.querySelectorAll('.answer')),
    questionNumber: document.querySelector('.question-number'),
    finalScore: document.getElementById('score'),
    gamePage: document.querySelector('.game'),
    endGamePage: document.querySelector('.end-game'),
}

const scoreElements = {
    scoreboardPage: document.querySelector('.scoreboard'),
    scoreboard: document.querySelector('.box'),
}

const buttons = {
    tryAgain: document.getElementById('tryAgain'),
    goToMenu: document.getElementById('goToMenu'),
    goToScorepage: document.getElementById('checkScoreboard'),
}

function verifyElementDictionary(target) {
    for (const key of Object.keys(target)){
        if (target[key] == null){
            return false;
        }
    }
    return true;
}

function verifyAllElements(){
    const refs = [menuElements, categoryElements, gameElements, scoreElements, buttons];

    for (let i = 0; i < refs.length; i++){
        if (!verifyElementDictionary(refs[i])) {
            console.error('failed to verify elements');
            return;
        }
    }
}

// consts
const numberOfScoresInScoreboard = 6;

// Variables
let gameData = GameData.getDeafault();
let count = 0;
let points = 0;
let correctAnswer = '';
let gameStarted = false;
let bestScoreArray = [];
let actualQuestionArray = [];


// If someone has played this game before, he will get his bestScores
function getScoreFromLocalStorage() {
    if(localStorage.bestScore){
        bestScoreArray = JSON.parse(localStorage.bestScore);
    }
}

// Get number of questions from user (Attached to event listeners)
function chooseNumberOfQuestions(e) {
    gameData.numberOfQuestions = Number(e.srcElement.value);
    showCategoryPage();
}

// Show Category Page
function showCategoryPage() {
    menuElements.mainPage.classList.add('not-visible');
    categoryElements.selectPage.classList.remove('not-visible');
}

// Get category from user (Attached to event listeners)
function chooseCategoryID(e) {
    gameData.categoryId = Number(e.srcElement.value);
    gameData.chosenCategory = e.srcElement.textContent;
    prepareForGame();
}

// Preparing game, by getting questions from API
function prepareForGame() {
    // Checks if data is avaible to use
        function dataChecker(){
        if (gameData.questionArray){
            menuElements.loading.classList.add('not-visible');
            // Populate first time DOM
            populateDOM(0);
            gameElements.questionNumber.classList.remove('not-visible');
            gameStarted = true;
            clearInterval(myInterval);
        } else {
            return;
        }
    }
    categoryElements.selectPage.classList.add('not-visible');
    menuElements.loading.classList.remove('not-visible');
    getQuestions();
    let myInterval = setInterval(dataChecker, 1000);
}

// Fetch data from server
async function getQuestions() {
    try {
        gameData.questionArray = null;
        let apiUrl = `https://opentdb.com/api.php?amount=${gameData.numberOfQuestions}&category=${gameData.categoryId}&type=multiple`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        gameData.questionArray = data.results;
    } catch (error) {
        console.log(error);
    }
}



// Populate DOM
function populateDOM(index) {
    if (!gameStarted) {
        gameElements.gamePage.classList.remove('not-visible');
    }
    changeQuestion(index);
    changeAnswers(index);
    // Use algorithm to shuffle answers array
    shuffle(actualQuestionArray);
    gameElements.answers.forEach( (el , i) => {
        el.textContent = decodeHTMLEntities(actualQuestionArray[i]);
    });
    count++;
    updateNumberOfQuestion();
}

function updateNumberOfQuestion(){
    gameElements.questionNumber.textContent = `${count}/${gameData.questionArray.length}`;
}

function changeQuestion(index){
    gameElements.question.textContent = decodeHTMLEntities(gameData.questionArray[index].question);   
}

function changeAnswers(index) {
    actualQuestionArray = gameData.questionArray[index].incorrect_answers.slice(0, 3);
    correctAnswer = gameData.questionArray[index].correct_answer;
    actualQuestionArray.push(gameData.questionArray[index].correct_answer);
}

function gameEvaluatingListener(e) {
    if (e.target.textContent === correctAnswer) {
        points++;
    } 
    if (count < gameData.questionArray.length){
        populateDOM(count);
    } else {
        gameElements.questionNumber.classList.add('not-visible');
        showEndGamePage();
    }
}

function showEndGamePage() {
    gameElements.gamePage.classList.add('not-visible');
    gameElements.endGamePage.classList.remove('not-visible');
    gameElements.finalScore.textContent = `${points}/${gameData.questionArray.length}`;
    updateScorePage();
}

function updateScorePage(){
    if (bestScoreArray.length <= numberOfScoresInScoreboard){
        bestScoreArray.push({'number': gameData.numberOfQuestions, 'category': gameData.chosenCategory, 'points': points});
        bestScoreArray.sort((a, b) => {
            return b.points/b.number - a.points/a.number;
        });
    } else {
        if (bestScoreArray[numberOfScoresInScoreboard].points/bestScoreArray[numberOfScoresInScoreboard].number < points/gameData.numberOfQuestions) {
            bestScoreArray.pop();
            bestScoreArray.push({'number': gameData.numberOfQuestions, 'category': gameData.chosenCategory, 'points': points});
            bestScoreArray.sort((a, b) => {
                return b.points/b.number - a.points/a.number;
            });
        }
    }
    scoreToLocalStorage();
}

// local Storage
function scoreToLocalStorage() {
    localStorage.setItem('bestScore', JSON.stringify(bestScoreArray));
}

function playAgain(){
    gameElements.endGamePage.classList.add('not-visible');
    gameData = GameData.getDeafault();
    count = 0;
    points = 0;
    actualQuestionArray = [];
    gameStarted = false;
    menuElements.mainPage.classList.remove('not-visible');
}

function goToScorePage() {
    menuElements.mainPage.classList.add('not-visible');
    scoreElements.scoreboardPage.classList.remove('not-visible');
    scoreElements.scoreboard.textContent = '';
    bestScoreArray.forEach((el, i) => {
        const newScore = document.createElement('div');
        newScore.classList.add('scores');
        newScore.textContent = `${bestScoreArray[i].category} - ${bestScoreArray[i].points}/${bestScoreArray[i].number}`;
        scoreElements.scoreboard.appendChild(newScore);
    });
}

function loadMenu() {
    scoreElements.scoreboardPage.classList.add('not-visible');
    menuElements.mainPage.classList.remove('not-visible');
}

// Adding event listeners
function questionEventListeners(){
    menuElements.questionChoice.forEach( (el) => {
        el.addEventListener('click', (e) => chooseNumberOfQuestions(e));
    });
}

function categoryEventListeners(){
    categoryElements.categoryChoice.forEach( (el) => {
        el.addEventListener('click', (e) => chooseCategoryID(e));
    });
}
function answersEventListeners(){
    gameElements.answers.forEach((el) => {
        el.addEventListener('click', (e) => gameEvaluatingListener(e));
    });
}

// On load
verifyAllElements();
getScoreFromLocalStorage();
questionEventListeners();
categoryEventListeners();
answersEventListeners();
// Event Listeners
buttons.tryAgain.addEventListener('click', playAgain);
buttons.goToMenu.addEventListener('click', loadMenu);
buttons.goToScorepage.addEventListener('click', goToScorePage);