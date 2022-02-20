/**
 * data and functions used for one-player-mode
 */

let corners = [0, 2, 6, 8];
let middle = 4;

/**
 * dependent on difficulty choice on startscreen 
 * computer move is either random or strategic
 */
function computerMove() {
    if (difficulty == 'easy') { randomMove(); }
    else { strategicMove() }
}

/**
 * places shape randomly in empty field
 */
function randomMove() {
    let id = randomSelectField(getEmptyFields());
    placeShape(id);
}
/**
 * @returns {array} of indices of empty fields
 */
function getEmptyFields() {
    let emptyFields = [];
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (!field) { emptyFields.push(i) }
    };
    return emptyFields;
}

/**
 * @param {array} arr array of empty field indices
 * @returns random index of one empty field
 */
function randomSelectField(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
/**
 * places shape strategically for first computer move
 * for ongoing game:
 * places shape to win directly if possible
 * otherwise places shape to block other player from winning if necessary
 * otherwise places shape randomly
 */
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
/**
 * if player1 chose the middle -> random choice of a corner
 * otherwise choses middle field
 * @returns {integer} index of field to place shape in
 */
function firstCompMove() {
    let index;
    if (fields[middle] == 'cross') {//random choice corner
        index = randomSelectField(corners);
    } else { index = middle }
    return index;
}
/**
 * checks for each winning pattern if only one shape is remaining to complete it
 * if so, returns the index of the remaining empty field
 * otherwise returns -1
 * @param  shape to check 
 * @returns {integer} index of field to place shape in, -1 if no possibility to win resp. need to block other player from winning
 */
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
        }
        if (matchCount == 2) {//only one shape missing to win
            if (unmatched > -1) {
                return unmatched;
            }
        }
    }
    return -1;
}