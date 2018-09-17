var canvas = document.getElementById("canvas");
var play = document.getElementById("play");

var ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
// ctx.imageSmoothingQuality = "high";

let shipIMG = new Image();
shipIMG.src = "img/spaceship.png";

let alienIMG = new Image();
alienIMG.src = "img/alien.png"; 

let missileIMG = new Image();
missileIMG.src = "img/missile.png"; 

var ship = {
    x:143,
    y:125
}

var alienArea = {
    xStart: 15,
    xEnd: 180
}

var aliens = [
    {x:15,y:5}, //first row
    {x:30,y:5},
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
    {x:15,y:15}, //second row
    {x:30,y:15},
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
    {x:15,y:25}, //third row
    {x:30,y:25},
    {x:45, y:25},
    {x:60, y:25},
    {x:75, y:25},
    {x:90, y:25},
    {x:105, y:25},
    {x:120, y:25},
    {x:135, y:25},
    {x:150, y:25},
    {x:165, y:25},
    {x:180, y:25}
];

var missiles = [];

// img.onload = function () {
//     var i = 0;
//     ctx.drawImage(aliens[i].src, aliens[i].x, aliens[i].y, aliens[i].w, aliens[i].h);
// }

console.log(aliens);

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

    if (event.keyCode == 32) {
        if (missiles.length == 0) {
            missiles.push({ x: ship.x ,y: ship.y });
        }
        
    }
});

const drawAliens = () => {
    for (i = 0; i < aliens.length; i++) {
        ctx.drawImage(alienIMG, aliens[i].x, aliens[i].y, 13, 10); 
    }
}

var end = false;

const moveAliens = () => {
    if (alienArea.xEnd <= canvas.width-15 && end == false) {   
        for (i = 0; i < aliens.length; i++) {
            aliens[i].x += 1;            
        }
        alienArea.xEnd +=1;
        alienArea.xStart +=1;
        if (alienArea.xEnd == canvas.width-15) {
            end = true;
            for (i = 0; i < aliens.length; i++) {
                aliens[i].y += 10;
            }
        }
    }

    if (alienArea.xStart >= 0 && end == true) {
        for (i = 0; i < aliens.length; i++) {
            aliens[i].x -= 1;  
        }
        alienArea.xEnd -=1;
        alienArea.xStart -=1;
        if (alienArea.xStart == 0) {
            end = false;
            for (i = 0; i < aliens.length; i++) {
                aliens[i].y += 10;
            }
        }
    }
}

const drawMissiles = () => {
    for (var i = 0; i < missiles.length; i++) {
        ctx.drawImage(missileIMG, missiles[i].x + 6.5, missiles[i].y - 4, 4, 4); 
    }
}

const moveMissiles = () => {
    for (var i = 0; i < missiles.length; i++) {
        if (missiles[i].y > 10) {
            missiles[i].y -= 10;
        }
        else {
            missiles.splice(i,1);
        }        
    }
}

const collisionDetection = () => {
    for (i = 0; i < aliens.length; i++) {
        for (n = 0; n < missiles.length; n++) {
            if (
            (missiles[n].y <= aliens[i].y + 5) && 
            (missiles[n].y >= aliens[i].y - 5) && 
            (missiles[n].x >= aliens[i].x - 6.5) && 
            (missiles[n].x <= aliens[i].x + 6.5)) {
                aliens.splice(i,1);
                missiles.splice(n,1)
            }
        }
    }
}

function gameLoop() {
    setTimeout(gameLoop, 50);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveAliens();
    drawAliens();
    drawShip();
    drawMissiles();
    moveMissiles();
    collisionDetection();
    console.log(missiles);
}

var gameStarted = false;
play.addEventListener("click", ()=> {
    if (gameStarted==false) {
        gameLoop();
        gameStarted = true;
    }
});