let corners = [0, 2, 6, 8];
let middle = 4;
let other = [1, 3, 5, 7];

function computerMove() {
    if (difficulty == 'easy') { randomMove(); }
    else { strategicMove() }
}

function randomMove() {
    let id = randomSelectField(getEmptyFields());
    placeShape(id);
}

function getEmptyFields() {
    let emptyFields = [];
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!field) { emptyFields.push(i) }
    };
    console.log(emptyFields);
    return emptyFields;
}
function randomSelectField(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    console.log(arr[randomIndex]);
    return arr[randomIndex];
}


function strategicMove() {
    let id;
    if (numberOfMoves == 1) {
        id = firstCompMove();
    } else {
        if (closeToWin('circle') > -1) {//computer wins
            id = closeToWin('circle');
        } else {
            if (closeToWin('cross') > -1) {//block player1
                id = closeToWin('cross');
            } else {
                id = randomSelectField(getEmptyFields());
            }
        }
    }
    placeShape(id);
}

function firstCompMove() {
    let index;
    if (fields[middle] == 'cross') {//random choice corner
        index = randomSelectField(corners);
    } else { index = middle }
    return index;
}
function closeToWin(shape) {
    for (let i = 0; i < winningPatterns.length; i++) {
        const pattern = winningPatterns[i].pattern;
        let matchCount = 0;
        let unmatched = -1;
        for (let j = 0; j < pattern.length; j++) {
            const index = pattern[j];
            if (fields[index] == shape) {
                matchCount++;
            } else {
                if (fields[index] == '') {
                    unmatched = index;
                }
            }
            console.log(shape, pattern, matchCount, unmatched);
        }
        if (matchCount == 2) {
            console.log(unmatched)
            if (unmatched > -1) {
                return unmatched;
            }
        }
    }
    return -1;
}