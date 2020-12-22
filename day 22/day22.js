import input from './input.js';

const [player1, player2] = input.split('\n\n').map((x) => x.split('\n').slice(1).map(Number));

//part one
function combat(player1, player2) {
    while (true) {
        if (player1.length === 0) return player2;
        if (player2.length === 0) return player1;

        const card1 = player1.shift();
        const card2 = player2.shift();
        if (card1 > card2) {
            player1.push(card1, card2);
        } else {
            player2.push(card2, card1);
        }
    }
}

//part two
function recursiveCombat(player1, player2) {
    const history = new Set();
    while (true) {
        if (player1.length === 0) return [2, player2];
        if (player2.length === 0) return [1, player1];

        //save history to avoid endless loops
        const key = `${player1}|${player2}`;
        if (history.has(key)) {
            return [1, player1];
        }
        history.add(key);

        const card1 = player1.shift();
        const card2 = player2.shift();

        let win = card1 > card2 ? 1 : 2;
        if (player1.length >= card1 && player2.length >= card2) {
            [win] = recursiveCombat(player1.slice(0, card1), player2.slice(0, card2));
        }
        if (win === 1) {
            player1.push(card1, card2);
        } else {
            player2.push(card2, card1);
        }
    }
}

function calcWinningScore(partOne = true) {
    let winningDeck;
    //send copies of the decks to avoid mutation
    if (partOne) {
        winningDeck = combat([...player1], [...player2]);
    } else {
        winningDeck = recursiveCombat([...player1], [...player2])[1];
    }

    return winningDeck.reduce((score, card, index) => score + (winningDeck.length - index) * card, 0);
}

console.log(`The winning player's score for part one is: ${calcWinningScore()}`);
console.log(`The winning player's score for part two is: ${calcWinningScore(false)}`);
