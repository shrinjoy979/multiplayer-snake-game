const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const socket = io('http://localhost:3000');

socket.on('init', handleInit);
socket.on('gamestate', handleGameState)

const gameScreen = document.getElementById('gameScreen');

let canvas, ctx;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

function keydown(e) {
    console.log(e.keyCode); // keyCode is a numeric value, that represent key is pressed
}

init();

function paintGame(state) {
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = state.food;
    const gridsize = state.gridsize;
    const size  = canvas.width / gridsize; // // This calculates the pixels per grid square in game space [ie 600px / 20 squares = 30px per square]

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.player, size, SNAKE_COLOUR);
}

function paintPlayer(playerState, size, colour) {
    const snake = playerState.snake;
    ctx.fillStyle = colour;

    for(let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

paintGame(gameState);

function handleInit(msg) {
    console.log(msg);
}

function handleGameState(gameState) {
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState));
}