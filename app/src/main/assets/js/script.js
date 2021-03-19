const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
const btn4 = document.getElementById("4");
const btn5 = document.getElementById("5");
const btn6 = document.getElementById("6");
const score = document.getElementById("score");
const body = document.getElementById("body");
const btn_reset = document.getElementById("reset");
const progress = document.getElementById("progress");
const game = document.getElementById("game");
const end_message = document.getElementById("end_message");
const errors = document.getElementById("errors");

let started = false;
let end = false;

let timer;

const TIME_GAME = 30000; // 30 segundos 
let points = TIME_GAME;

const BLUE = "#0166ff";
const RED = "#fd0000";
const GREEN = "#006500";
const YELLOW = "#ffcb00";
const GREY = "#cccccc";
const BROWN = "#666632";
const WHITE = "#ffffff";

const sequence = [1,2,3,4,5,6];
let selected = 0;
let count_errors = 0;

function init() {
    setEndGame();
    btn1.style.backgroundColor = BLUE;
    btn2.style.backgroundColor = RED;
    btn3.style.backgroundColor = GREEN;
    btn4.style.backgroundColor = YELLOW;
    btn5.style.backgroundColor = GREY;
    btn6.style.backgroundColor = BROWN;
    body.style.backgroundColor = WHITE;
    score.textContent = TIME_GAME;
    points = TIME_GAME;
    btn_reset.textContent = "Iniciar";
    started = false;
    end = false;
    selected=0;
    count_errors=0;
    progress.style.width = "100%"
    errors.textContent = "Erros: 0";
    changeContent();
    visibleAll();
}

function actionReset(element) {
    if(element.textContent.toLowerCase() === "iniciar") startGame();
    else if(element.textContent.toLowerCase() === "reiniciar") init(); 
}

function startGame() {
    sequence.shuffle();
    started = true;
    btn_reset.textContent = "Reiniciar";
    initTimer();
}

function checkEndgame() {
    return btn1.classList.contains("invisible") &&
        btn2.classList.contains("invisible") &&
        btn3.classList.contains("invisible") &&
        btn4.classList.contains("invisible") &&
        btn5.classList.contains("invisible") &&
        btn6.classList.contains("invisible");
}

function visibleAll() {
    btn1.classList.remove("invisible");
    btn2.classList.remove("invisible");
    btn3.classList.remove("invisible");
    btn4.classList.remove("invisible");
    btn5.classList.remove("invisible");
    btn6.classList.remove("invisible");
}

function selectButton(element) {
    if(end) return;
    if(!started) startGame();
    if(parseInt(element.textContent) === sequence[selected]) {
        selected += 1;
    } else {
        changeBackground();
        visibleAll();
        count_errors +=1;
        selected = 0;
        return;
    }
    element.classList.add("invisible");
    changeBackground(element.style.backgroundColor);

    if(checkEndgame()) setEndGame();
}

function changeBackground(color = WHITE) {
    body.style.backgroundColor = color;
}

function initTimer() {
    timer = setInterval(() => {
        if(points <= 0) setEndGame();
        points = points - 20;
        progress.style.width = (points * 100 / TIME_GAME) +"%";
        if(points >= 0) score.textContent = points;
    }, 10);
}

function setEndGame() {
    end = true;
    clearInterval(timer);
    errors.textContent = "Erros: "+count_errors;
    changeContent();
}

function changeContent() {
    if(end) {
        game.classList.add("hide");
        end_message.classList.remove("hide");
    } else {
        game.classList.remove("hide");
        end_message.classList.add("hide");
    }
}

Array.prototype.shuffle = () => sequence.sort(() => .5 - Math.random());