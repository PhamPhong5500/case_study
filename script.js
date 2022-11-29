    const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let name = prompt(`Enter Player's name:`)

const GameBoard = function (width,height) {
    this.width = width;
    this.height = height;
    // document.body.innerHTML = `<canvas id="myCanvas" width="${this.width}" height="${this.height}"></canvas>`
}

const Player = function (name,score = 0){
    this.name = name;
    this.score = score;

    this.drawName = function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Player: " + `${this.name}`, canvas.width - 115, 20);
    }

    this.drawScore = function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#6300dd";
        ctx.fillText("Score: " + this.score, 8, 20);
    }

    this.increaseScore = function (){
        this.score++;
    }
}


const Ball = function (x= canvas.width / 2, y= canvas.height - 30, radius = 10 , speedBall= 10) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    // this.radian = radian;
    this.speed_ball = speedBall;
    this.dx =3;
    this.dy =-3;

    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ddcb00";
        ctx.fill();
        ctx.closePath();
    }
};

const Paddles = function (paddleWidth=100, paddleHeight = 13){
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleX = canvas.width/2 - this.paddleWidth / 4;
    this.rightPressed = false;
    this.leftPressed = false;

    // Draw Paddle:
    this.drawPaddle = function (){
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#dd0034";
        ctx.fill();
        ctx.closePath();
    }
}


let ball = new Ball();
let paddle = new Paddles();
let player = new Player(name);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        paddle.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    console.log(e.clientX);
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    }
}



const main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    player.drawName();
    player.drawScore();
    // player.increaseScore()

    // Ball hit the wall
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) ball.dx = -ball.dx;
    if (ball.y + ball.dy < ball.radius) ball.dy = -ball.dy
    // Paddle hit the ball
    else if (ball.y + ball.dy > canvas.height - ball.radius *2) {
        if (ball.x >= paddle.paddleX && ball.x <= paddle.paddleX + paddle.paddleWidth) ball.dy = -ball.dy
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    ball.x += ball.dx;
    ball.y += ball.dy;


    if (paddle.rightPressed) {
        paddle.paddleX = Math.min(paddle.paddleX + 7, canvas.width - paddle.paddleWidth);
    } else if (paddle.leftPressed) {
        paddle.paddleX = Math.max(paddle.paddleX - 7, 0);
    }

    if (paddle.rightPressed) {
        paddle.paddleX = Math.min(paddle.paddleX + 7, canvas.width - paddle.paddleWidth);
    } else if (paddle.leftPressed) {
        paddle.paddleX = Math.max(paddle.paddleX - 7, 0);
    }
};


const interval = setInterval(main,10);
score = setInterval(player.increaseScore.bind(player), 3500);