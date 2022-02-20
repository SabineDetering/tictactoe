let fields = [];
for (let i = 0; i < 9; i++) { fields.push(''); }
let numberofPlayers;
let difficulty = 'easy';
let currentShape = 'cross';
let numberOfMoves = 0;
let gameOver = false;
let winningPatterns = [];
let symbolCircle;
let symbolCross;

function symbolMaker(image, color) {
    return { image, color };
}
let symbols = {
    'yellowCircle': symbolMaker('./img/circle-yellow.png', '#ffde59'), 'redCircle': symbolMaker('./img/circle-red.png', '#ff1616'), 'blueCross': symbolMaker('./img/cross-blue.png', '#38b6ff'), 'greenCross': symbolMaker('./img/cross-green.png', '#7ed957')
}

function lineMaker(pattern, top, left, width, transform) {
    return { pattern, line: { top, left, width, transform } }
}
// horizontal
winningPatterns.push(lineMaker([0, 1, 2], '16.6%', '16%', '68%', 'scale(1)'));
winningPatterns.push(lineMaker([3, 4, 5], '50%', '16%', '68%', 'scale(1)'));
winningPatterns.push(lineMaker([6, 7, 8], '83.2%', '16%', '68%', 'scale(1)'));
// vertical
winningPatterns.push(lineMaker([0, 3, 6], '50%', '-17.2%', '68%', 'rotate(90deg) scale(1)'));
winningPatterns.push(lineMaker([1, 4, 7], '50%', '16.6%', '68%', 'rotate(90deg) scale(1)'));
winningPatterns.push(lineMaker([2, 5, 8], '50%', '50%', '68%', 'rotate(90deg) scale(1)'));
//diagonal
winningPatterns.push(lineMaker([0, 4, 8], '50%', '2.7%', '96%', 'rotate(45deg) scale(1)'));
winningPatterns.push(lineMaker([2, 4, 6], '50%', '1.8%', '96%', 'rotate(-45deg) scale(1)'));


function getId(id) {
    return document.getElementById(id);
}
/**
 * hides start screen and transfers choices for mode, difficulty and symbols 
 */
function start() {
    getId('start-screen').style.transform = 'scale(0)';
    numberofPlayers = +document.querySelector('input[name="mode"]:checked').value;
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    symbolCross = symbols[document.querySelector('input[name="symbol1"]:checked').value];
    symbolCircle = symbols[document.querySelector('input[name="symbol2"]:checked').value];
    renderGameScreen();
}
/**
 * shows chosen symbols in player panel
 */
function renderGameScreen() {
    getId('player-cross').innerHTML =
        `<img src="${symbolCross.image}">Player 1`;
    getId('player-circle').innerHTML =
        `<img src="${symbolCircle.image}">Player 2`;
}

/**
 * places symbol in field if feasible and checks if game is over
 * @param {integer} id of field
 */
function placeShape(id) {
    if (!fields[id] && !gameOver) {
        fields[id] = currentShape;
        numberOfMoves++;
        draw();
        checkForWin();
        checkForTie();
        togglePlayer();
        if (computersTurn()) {
            setTimeout(computerMove, 500);
        }
    }
}
/**
 * returns true if game is not over and computer is next player (one player mode and odd number of moves)
 * @returns boolean
 */
function computersTurn() {
    return !gameOver && numberofPlayers == 1 && numberOfMoves % 2 == 1
}
/**
 * switches active player and shape
 */
function togglePlayer() {
    if (currentShape == 'cross') {
        currentShape = 'circle';
        getId('player-cross').classList.add('player-inactive');
        getId('player-circle').classList.remove('player-inactive');
    } else {
        currentShape = 'cross';
        getId('player-cross').classList.remove('player-inactive');
        getId('player-circle').classList.add('player-inactive');
    };
}
/**
 * shows shapes in the playfield
 */
function draw() {
    for (let i = 0; i < fields.length; i++) {
        const field = getId('td-' + i);
        if (fields[i] == 'circle') {
            field.innerHTML = `<img src=${symbolCircle.image}>`
        } else if (fields[i] == 'cross') {
            field.innerHTML = `<img src=${symbolCross.image}>`
        }
    }
}
/**
 * checks if current player meets any winning pattern and draws a line through winning patterns
 * sets gameOver=true if there is a winner
 */
function checkForWin() {
    for (let i = 0; i < winningPatterns.length; i++) {
        let pattern = winningPatterns[i].pattern;
        if (fields[pattern[0]] == currentShape &&
            fields[pattern[1]] == currentShape &&
            fields[pattern[2]] == currentShape) {
            if (!gameOver) {//first winning pattern
                showWinningLine(1, i, currentShape);
            } else {//second winning pattern
                showWinningLine(2, i, currentShape);
            }
            gameOver = true;
            setTimeout(showWinner, 1500, currentShape);
        }
    }
}
/**
 * shows a line through a winning pattern using the styles of the pattern and the main color of the winner
 */
function showWinningLine(number, index, shape) {
    let winningLine = winningPatterns[index].line;
    let displayedLine = getId('line-' + number);
    displayedLine.style.backgroundColor = (shape == 'circle' ? symbolCircle.color : symbolCross.color);
    for (const style in winningLine) {
        displayedLine.style[style] = winningLine[style];
    }
}

/**
 * checks if there are no more moves and then sets gameOver=true
 */
function checkForTie() {
    if (!gameOver && numberOfMoves == 9) {
        gameOver = true;
        setTimeout(showTie, 1000);
    }
}

/**
 * shows finish screen for tie
 */
function showTie() {
    getId('winner-text').innerHTML = `Tie!`;
    showGameover();
}

/**
 * shows finish screen for winner
 */
function showWinner(shape) {
    let winnerText = getId('winner-text');
    winnerText.innerHTML = `The winner is `;
    if (shape == 'cross') {
        winnerText.innerHTML +=
            `Player 1&nbsp <img src='${symbolCross.image}' style="width:40px;">`;
    } else {
        winnerText.innerHTML +=
            `Player 2&nbsp <img src='${symbolCircle.image}' style="width:40px;">`;
    }
    showGameover();
}

function showGameover() {
    getId('gameover-screen').style.transform = "scale(1)";
}
/**
 * resets game
 */
function reset() {
    resetDisplay();
    resetVars();
}

/**
 * removes all shapes and lines from play field
 * hides gameover screen
 * initialises active player to player 1
 */
function resetDisplay() {
    for (let i = 0; i < 9; i++) {
        getId('td-' + i).innerHTML = '';
    }
    getId('line-1').style.transform = 'scale(0)';
    getId('line-2').style.transform = 'scale(0)';
    getId('gameover-screen').style.transform = "scale(0)";
    getId("player-cross").classList.remove("player-inactive");
    getId("player-circle").classList.add("player-inactive");
}
/**
 * resets all game relevant variables
 */
function resetVars() {
    for (let i = 0; i < 9; i++) { fields[i] = ''; }
    currentShape = 'cross';
    numberOfMoves = 0;
    gameOver = false;
}
/**
 * shows start screen to allow new choices
 */
function showStartScreen() {
    reset();
    getId('start-screen').style.transform = 'scale(1)';
}
