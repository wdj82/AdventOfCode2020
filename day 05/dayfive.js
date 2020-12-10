import input from './input.js';

const boardingPasses = input.split('\n');

function bsp(input, end) {
    let start = 0;
    for (let i = 0; i < input.length; i++) {
        const letter = input[i];
        const half = (end - start) / 2;
        if (letter === 'F' || letter === 'L') {
            end -= half;
        } else if (letter === 'B' || letter === 'R') {
            start += half;
        }
    }
    return start;
}

function findSeatId(pass) {
    return bsp(pass.slice(0, 7), 128) * 8 + bsp(pass.slice(7), 8);
}

function findHighestId(boardingPasses) {
    return boardingPasses.reduce((highestId, pass) => Math.max(findSeatId(pass), highestId), 0);
}

function findMissingId(boardingPasses) {
    const seatIds = boardingPasses.map(findSeatId).sort((a, b) => a - b);
    for (let i = 1; i < seatIds.length; i++) {
        if (seatIds[i] + 1 !== seatIds[i + 1]) {
            return seatIds[i] + 1;
        }
    }
}

console.log(findHighestId(boardingPasses));
console.log(findMissingId(boardingPasses));
