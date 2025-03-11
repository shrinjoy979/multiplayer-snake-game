const { GRID_SIZE } = require('./constants');

module.exports = {
    createGameState,
    gameLoop
}

function createGameState() {
    return {
        player: {
            pos: {
                x: 3,
                y: 10,
            },
            vel: {
                x: 1,
                y: 0,
            },
            snake: [
                {x: 1, y: 10},
                {x: 2, y: 10},
                {x: 3, y: 10}
            ],
        },
        food: {
            x: 7,
            y: 7,
        },
        gridsize: GRID_SIZE, // We are working with scren pixel and game grid | we have 600 px in screen grid and 20 Square in game grid
    };
}

function gameLoop(state) {
    if(!state) {
        return;
    }

    const playerOne = state.player;

    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;

    if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
        return 2;
    }

    // snake eaten the food, so we will incress the size of the snake
    if(state.food.x === playerOne.pos.x) {
        playerOne.snake.push({ ...playerOne.pos });
        playerOne.pos.x += playerOne.vel.x;
        playerOne.pos.y += playerOne.vel.y;
        randomFood();
    }
}