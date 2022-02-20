let fields = [];
let currentShape = 'cross';
let numberOfMoves = 0;
let gameOver = false;
let winningPatterns = [];
let colorOfCircle = 'yellow';
let colorOfCross = 'aqua';
// horizontal
winningPatterns.push({ pattern: [0, 1, 2], line: { top: '303px', width: '283px', transform: 'scale(1)' } });
winningPatterns.push({ pattern: [3, 4, 5], line: { top: '440px', width: '283px', transform: 'scale(1)' } });
winningPatterns.push({ pattern: [6, 7, 8], line: { top: '581px', width: '283px', transform: 'scale(1)' } });
// vertical
winningPatterns.push({ pattern: [0, 3, 6], line: { top: '440px', left: '446px', width: '283px', transform: 'rotate(90deg) scale(1)' } });
winningPatterns.push({ pattern: [1, 4, 7], line: { top: '440px', left: '586px', width: '283px', transform: 'rotate(90deg)scale(1)' } });
winningPatterns.push({ pattern: [2, 5, 8], line: { top: '440px', right: '448px', width: '283px', transform: 'rotate(90deg) scale(1)' } });
//diagonal
winningPatterns.push({ pattern: [0, 4, 8], line: { top: '440px', width: '400px', transform: 'rotate(45deg) scale(1)' } });
winningPatterns.push({ pattern: [2, 4, 6], line: { top: '440px', width: '400px', transform: 'rotate(-45deg) scale(1)' } });


function getId(id) {
    return document.getElementById(id);
}

function fillShape(id) {
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
function showTie() {
    
    
}

function showWinner(shape) {
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
