let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let btn4 = document.getElementById("4");
let btn5 = document.getElementById("5");
let btn6 = document.getElementById("6");
let score = document.getElementById("score");
let body = document.getElementById("body");
let btn_reset = document.getElementById("reset");

let started = false;

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

function init() {
    stopTimer();
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
    selected=0;
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
    return btn1.classList.contains("hide") &&
        btn2.classList.contains("hide") &&
        btn3.classList.contains("hide") &&
        btn4.classList.contains("hide") &&
        btn5.classList.contains("hide") &&
        btn6.classList.contains("hide");
}

function visibleAll() {
    btn1.classList.remove("hide");
    btn2.classList.remove("hide");
    btn3.classList.remove("hide");
    btn4.classList.remove("hide");
    btn5.classList.remove("hide");
    btn6.classList.remove("hide");
}

function selectButton(element) {
    if(!started) startGame();
    if(parseInt(element.textContent) === sequence[selected]) {
        selected += 1;
    } else {
        changeBackground();
        visibleAll();
        selected = 0;
        return;
    }
    element.classList.add("hide");
    changeBackground(element.style.backgroundColor);

    if(checkEndgame()) stopTimer();
}

function changeBackground(color = WHITE) {
    body.style.backgroundColor = color;
}

function initTimer() {
    timer = setInterval(() => {
        if(points <= 0) stopTimer();
        points = points - 10;
        if(points >= 0) score.textContent = points;
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
}

Array.prototype.shuffle = () => sequence.sort(() => .5 - Math.random());