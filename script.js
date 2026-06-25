const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{x: 160, y: 160}];
let dx = gridSize;
let dy = 0;
let appleX = 96;
let appleY = 96;
let score = 0;

function main() {
    if (hasGameEnded()) {
        alert("Fim de Jogo! Pontuação: " + score);
        document.location.reload();
        return;
    }

    setTimeout(function onTick() {
        clearCanvas();
        drawApple();
        moveSnake();
        drawSnake();
        main();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lightgreen';
    snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize - 2, gridSize - 2));
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const hasEatenApple = snake[0].x === appleX && snake[0].y === appleY;
    if (hasEatenApple) {
        score += 10;
        deployApple();
    } else {
        snake.pop();
    }
}

function deployApple() {
    appleX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    appleY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, gridSize - 2, gridSize - 2);
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if (keyPressed === 37 && !goingRight) { dx = -gridSize; dy = 0; }
    if (keyPressed === 38 && !goingDown) { dx = 0; dy = -gridSize; }
    if (keyPressed === 39 && !goingLeft) { dx = gridSize; dy = 0; }
    if (keyPressed === 40 && !goingUp) { dx = 0; dy = gridSize; }
}

// Inicia o jogo
main();