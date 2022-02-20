let fields = [];
let currentShape = 'cross';
let numberOfMoves = 0;
let gameOver = false;
let winningPatterns = [];
let colorOfCircle = 'yellow';
let colorOfCross = 'aqua';

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

function placeShape(id) {
    if (!fields[id] && !gameOver) {
        fields[id] = currentShape;
        numberOfMoves++;
        draw();
        checkForWin();
        togglePlayer();
    }
}

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

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            getId('circle-' + i).classList.remove('d-none');
        } else if (fields[i] == 'cross') {
            getId('cross-' + i).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    for (let i = 0; i < winningPatterns.length; i++) {
        let pattern = winningPatterns[i].pattern;
        if (fields[pattern[0]] == currentShape &&
            fields[pattern[1]] == currentShape &&
            fields[pattern[2]] == currentShape) {
            gameOver = true;
            showWinningLine(i, currentShape);
            showWinner(currentShape);
        }
    }
    if (!gameOver && numberOfMoves == 9) {
        gameOver = true;
        showTie();
    }
}
function showGameover() {
    getId('gameover-screen').style.transform = "scale(1)";
}
function showTie() {
    showGameover();  
    
}

function showWinner(shape) {
    showGameover();  
    getId('winner-text').innerHTML = `The winner is ${shape}!`;
    getId('winner-text').style.backgroundColor = (shape == 'circle' ? colorOfCircle : colorOfCross);
}
function showWinningLine(index, shape) {
    let line = winningPatterns[index].line;
    getId('line').style.backgroundColor = (shape == 'circle' ? colorOfCircle : colorOfCross);
    for (const style in line) {
        getId('line').style[style] = line[style];
    }
}
function reset() {
    fields = [];
    for (let i = 0; i < 8; i++) {
        getId('circle-' + i).classList.add('d-none');
        getId('cross' + i).classList.add('d-none');
    }
    getId('line').style.transform = 'scale(0)';

    let currentShape = 'cross';
    let numberOfMoves = 0;
    let gameOver = false;
}
