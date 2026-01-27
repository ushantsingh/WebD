let canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 700;

let pen = canvas.getContext("2d");

let direction = "right";
let gameOver = false;
let cell = 50;

// snake body
let cellQ = [[0, 0]];

// food position
let foodX, foodY;

// generate food on grid
function generateFood() {
    foodX = Math.floor(Math.random() * (1000 / cell)) * cell;
    foodY = Math.floor(Math.random() * (700 / cell)) * cell;
}

generateFood();

// keyboard control
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") direction = "down";
    else if (e.key === "ArrowUp") direction = "up";
    else if (e.key === "ArrowLeft") direction = "left";
    else if (e.key === "ArrowRight") direction = "right";
});

function draw() {
    pen.clearRect(0, 0, 1000, 700);

    // draw food
    pen.fillStyle = "red";
    pen.fillRect(foodX, foodY, cell, cell);

    // draw snake
    pen.fillStyle = "yellow";
    for (let i of cellQ) {
        pen.fillRect(i[0], i[1], cell, cell);
    }
}

function update() {
    if (gameOver) return;

    let x = cellQ[cellQ.length - 1][0];
    let y = cellQ[cellQ.length - 1][1];

    let newX = x;
    let newY = y;

    if (direction === "right") newX += cell;
    else if (direction === "left") newX -= cell;
    else if (direction === "down") newY += cell;
    else if (direction === "up") newY -= cell;

    //  wall collision
    if (newX < 0 || newX >= 1000 || newY < 0 || newY >= 700) {
        gameOver = true;
        clearInterval(gameLoop);
        alert("Game Over 💀");
        return;
    }

    cellQ.push([newX, newY]);

    //  food collision
    if (newX === foodX && newY === foodY) {
        generateFood(); // grow snake
    } else {
        cellQ.shift(); // normal movement
    }
}

// single game loop
let gameLoop = setInterval(() => {
    update();
    draw();
}, 300);
