import input from './input.js';

// const input = `Player 1:
// 43
// 19

// Player 2:
// 2
// 29
// 14`;

const [player1, player2] = input.split('\n\n').map((x) => x.split('\n').slice(1).map(Number));

function getWinningDeck() {
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

function calcWinningScore() {
    const winningDeck = getWinningDeck().reverse();
    return winningDeck.reduce((score, card, index) => {
        return (score += card * (index + 1));
    }, 0);
}

console.log(`The winning player's score is: ${calcWinningScore()}`);
