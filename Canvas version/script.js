let canvas = document.getElementById("canvas");
let play = document.getElementById("play");
let reset = document.getElementById("reset");

let ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
// ctx.imageSmoothingQuality = "high";

let shipIMG = new Image();
shipIMG.src = "img/spaceship.png";

let alienIMG = new Image();
alienIMG.src = "img/alien.png"; 

let missileIMG = new Image();
missileIMG.src = "img/missile.png"; 

let bombIMG = new Image();
bombIMG.src = "img/bombs.png"; 

let barrierIMG = new Image();
barrierIMG.src = "img/barrier.png"; 

let ship = {
    x:143,
    y:133
}

let alienArea = {
    xStart: 100,
    xEnd: 100
}

let aliens = [
    {x:15, y:5}, //first row
    {x:30, y:5},
    {x:45, y:5},
    {x:60, y:5},
    {x:75, y:5},
    {x:90, y:5},
    {x:105, y:5},
    {x:120, y:5},
    {x:135, y:5},
    {x:150, y:5},
    {x:165, y:5},
    {x:180, y:5},
    {x:15, y:15}, //second row
    {x:30, y:15},
    {x:45, y:15},
    {x:60, y:15},
    {x:75, y:15},
    {x:90, y:15},
    {x:105, y:15},
    {x:120, y:15},
    {x:135, y:15},
    {x:150, y:15},
    {x:165, y:15},
    {x:180, y:15},
    {x:15, y:25}, //third row
    {x:30, y:25},
    {x:45, y:25},
    {x:60, y:25},
    {x:75, y:25},
    {x:90, y:25},
    {x:105, y:25},
    {x:120, y:25},
    {x:135, y:25},
    {x:150, y:25},
    {x:165, y:25},
    {x:180, y:25},
    {x:15, y:35}, //fourth row
    {x:30, y:35},
    {x:45, y:35},
    {x:60, y:35},
    {x:75, y:35},
    {x:90, y:35},
    {x:105, y:35},
    {x:120, y:35},
    {x:135, y:35},
    {x:150, y:35},
    {x:165, y:35},
    {x:180, y:35}
];
let barriers = [
    {x:44,  y:115},
    {x:44,  y:118},
    {x:44,  y:121},
    {x:44,  y:124},
    {x:104, y:115},
    {x:104, y:118},
    {x:104, y:121},
    {x:104, y:124},
    {x:164, y:115},
    {x:164, y:118},
    {x:164, y:121},
    {x:164, y:124},
    {x:224, y:115},
    {x:224, y:118},
    {x:224, y:121},
    {x:224, y:124}
];

let missiles = [];
let bombs = [];

const drawShip = () => {
    ctx.drawImage(shipIMG, ship.x, ship.y, 17, 13);
}

document.addEventListener("keydown", (event) => {
    console.log(event.keyCode);
    if (event.keyCode == 39) {              //move right
        if (ship.x < canvas.width - 30) {
            ship.x += 10;
        }     
    }
    else if (event.keyCode == 37) {         //move left
        if (ship.x > 20) {
            ship.x -= 10;
        }     
    }
    if (event.keyCode == 32) {              //space bar press
        if (missiles.length == 0) {
            missiles.push({ x: ship.x ,y: ship.y });
        }   
    }
});

const setAlienArea = () => {
    alienArea.xStart = 100;
    alienArea.xEnd = 100;
    for (i = 0; i < aliens.length; i++) {
        if (aliens[i].x <= alienArea.xStart ) {
            alienArea.xStart = aliens[i].x;
        }

        if (aliens[i].x >= alienArea.xEnd) {
             alienArea.xEnd = aliens[i].x;;
        }
    }
}

const drawAliens = () => {
    for (i = 0; i < aliens.length; i++) {
        ctx.drawImage(alienIMG, aliens[i].x, aliens[i].y, 13, 10); 
    }
}

let left = false;

const moveAliens = () => {
    if (alienArea.xEnd <= canvas.width-15 && left == false) {   
        for (i = 0; i < aliens.length; i++) {
            aliens[i].x += 1;            
        }
        if (alienArea.xEnd == canvas.width-15) {
            left = true;
            for (i = 0; i < aliens.length; i++) {
                aliens[i].y += 10;
            }
        }
    }

    if (alienArea.xStart >= 0 && left == true) {
        for (i = 0; i < aliens.length; i++) {
            aliens[i].x -= 1;  
        }
        if (alienArea.xStart == 0) {
            left = false;
            for (i = 0; i < aliens.length; i++) {
                aliens[i].y += 10;
            }
        }
    }
}

const dropBomb = () => {
    let randomAlien = Math.floor(Math.random()*aliens.length);
    if (gameEnded == false) {
        bombs.push({x: aliens[randomAlien].x + 5,y: aliens[randomAlien].y + 6.5});
    }
}

const moveBomb = () => {
    for (i = 0; i < bombs.length; i++) {
        if (bombs[i].y < 140) {
            bombs[i].y += 2;
        }
        else {
            bombs.splice(i,1);
        }  
    }
}

const drawBomb = () => {
    for (i = 0; i < bombs.length; i++) {
        ctx.drawImage(bombIMG, bombs[i].x, bombs[i].y, 3, 3); 
    }
}

const moveMissiles = () => {
    for (i = 0; i < missiles.length; i++) {
        if (missiles[i].y > 10) {
            missiles[i].y -= 5;
        }
        else {
            console.log(missiles);
            missiles.splice(i,1);
            console.log(missiles);
        }        
    }
}

const drawMissiles = () => {
    for (i = 0; i < missiles.length; i++) {
        ctx.drawImage(missileIMG, missiles[i].x + 6.5, missiles[i].y - 4, 4, 4); 
    }
}

const drawBarriers = () => {
    for (i = 0; i < barriers.length; i++) {
        ctx.drawImage(barrierIMG, barriers[i].x, barriers[i].y, 35, 2);
    }
}

const collisionDetection = () => {
    if (aliens.length == 0) {
        gameEnded = true;
        endGame();
        return;
    }
    for (i = 0; i < aliens.length; i++) { // just aliens
        if (
        (aliens[i].y <= ship.y + 8.5) && // aliens and ship
        (aliens[i].y >= ship.y - 8.5) && 
        (aliens[i].x >= ship.x - 6.5) && 
        (aliens[i].x <= ship.x + 6.5)) {
            endGame();
        }
        for (n = 0; n < missiles.length; n++) { // aliens and missiles
            if (
            (missiles[n].y <= aliens[i].y + 5) && 
            (missiles[n].y >= aliens[i].y - 5) && 
            (missiles[n].x >= aliens[i].x - 6.5) && 
            (missiles[n].x <= aliens[i].x + 6.5)) {
                aliens.splice(i,1);
                missiles.splice(n,1);
            }
        }
    }
    for (p = 0; p < bombs.length; p++) { // just bombs
        if (
        (bombs[p].y <= ship.y + 3) &&
        (bombs[p].y >= ship.y - 3) &&
        (bombs[p].x <= ship.x + 10)&&
        (bombs[p].x >= ship.x - 4)) {
            endGame();
        } 
        for (q = 0; q < barriers.length; q++) { // bombs and barriers
            if (
            (bombs[p].y <= barriers[q].y + 1.5) &&
            (bombs[p].y >= barriers[q].y - 1.5) &&
            (bombs[p].x <= barriers[q].x + 35) &&
            (bombs[p].x >= barriers[q].x)) {
                console.log("barrier removed");
                bombs.splice(p,1);
                barriers.splice(q,1);
            }
            for (l = 0; l < missiles.length; l++) { // missiles and barriers
                if (
                    (missiles[p].y <= barriers[q].y + 1.5) &&
                    (missiles[p].y >= barriers[q].y - 1.5) &&
                    (missiles[p].x <= barriers[q].x + 20) &&
                    (missiles[p].x >= barriers[q].x - 10)) {
                        missiles.splice(p,1);
                    }
            }
        }    
    }
}

const endGame = () => {
    console.log("game over");
    canvas.style.visibility = "hidden";
    reset.disabled = false;
}

let resetGame = () => {
    canvas.style.visibility = "visible";
    play.disabled = false;
    reset.disabled = true;
    gameEnded = true;
    left = false;
    aliens = [
        {x:15, y:5}, //first row
        {x:30, y:5},
        {x:45, y:5},
        {x:60, y:5},
        {x:75, y:5},
        {x:90, y:5},
        {x:105, y:5},
        {x:120, y:5},
        {x:135, y:5},
        {x:150, y:5},
        {x:165, y:5},
        {x:180, y:5},
        {x:15, y:15}, //second row
        {x:30, y:15},
        {x:45, y:15},
        {x:60, y:15},
        {x:75, y:15},
        {x:90, y:15},
        {x:105, y:15},
        {x:120, y:15},
        {x:135, y:15},
        {x:150, y:15},
        {x:165, y:15},
        {x:180, y:15},
        {x:15, y:25}, //third row
        {x:30, y:25},
        {x:45, y:25},
        {x:60, y:25},
        {x:75, y:25},
        {x:90, y:25},
        {x:105, y:25},
        {x:120, y:25},
        {x:135, y:25},
        {x:150, y:25},
        {x:165, y:25},
        {x:180, y:25},
        {x:15, y:35}, //fourth row
        {x:30, y:35},
        {x:45, y:35},
        {x:60, y:35},
        {x:75, y:35},
        {x:90, y:35},
        {x:105, y:35},
        {x:120, y:35},
        {x:135, y:35},
        {x:150, y:35},
        {x:165, y:35},
        {x:180, y:35} ];
    barriers = [
        {x:44,  y:115},
        {x:44,  y:118},
        {x:44,  y:121},
        {x:44,  y:124},
        {x:104, y:115},
        {x:104, y:118},
        {x:104, y:121},
        {x:104, y:124},
        {x:164, y:115},
        {x:164, y:118},
        {x:164, y:121},
        {x:164, y:124},
        {x:224, y:115},
        {x:224, y:118},
        {x:224, y:121},
        {x:224, y:124}
    ];
    missiles = [];
    bombs = [];
    ship.x = 143;
    drawAliens();
    drawShip();
    drawBarriers();
}

function bombLoop() {
    if (gameEnded == false) {
        setTimeout(bombLoop, 1000);
        dropBomb();
    }
}

function gameLoop() {
    if (gameEnded == false) {
        setTimeout(gameLoop, 50);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAlienArea();
    moveAliens();
    drawAliens();
    drawShip();
    drawMissiles();
    moveMissiles();
    moveBomb();
    drawBomb();
    drawBarriers();
    collisionDetection();
}

let gameStarted = false;
let gameEnded = false;

play.disabled = false;
play.addEventListener("click", ()=> {
    if (gameEnded = true) {
        gameStarted = false;
        gameEnded = false; 
    }
    if (gameStarted == false) {
        play.disabled = true;
        reset.disabled = false;
        gameLoop();
        bombLoop();
    }
});

reset.addEventListener("click", resetGame);