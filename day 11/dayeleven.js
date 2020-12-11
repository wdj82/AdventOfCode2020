import input from './input.js';

//convert the input into an array of arrays
const layout = input.split('\n').map((row) => row.split(''));
//for checking all eight directions of the layout
const searchDirections = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
];

//outer function saves the layout
const checkAdjacentSeats = (height, width, layout) => {
    //if seat is within bounds and is filled return 1
    return (row, column) => {
        if (row >= 0 && row < height && column >= 0 && column < width) {
            if (layout[row][column] === '#') {
                return 1;
            }
        }
        return 0;
    };
};

//part 1 rules - return how many directly adjacent seats are occupied
function numDirectlyAdjacent(row, column, layout) {
    let count = 0;
    const getAdjacentFilledSeat = checkAdjacentSeats(layout.length, layout[0].length, layout);

    //check each of the eight directions for a filled seat
    searchDirections.forEach((dir) => {
        count += getAdjacentFilledSeat(row + dir.y, column + dir.x);
    });

    return count;
}

const checkForSeats = (height, width, layout) => {
    //search in the direction provided for a filled seat
    return (row, column, yDir, xDir) => {
        while (row >= 0 && row < height && column >= 0 && column < width) {
            if (layout[row][column] !== '.') {
                if (layout[row][column] === '#') {
                    return 1;
                }
                break;
            }
            row += yDir;
            column += xDir;
        }
        //didn't find a filled seat
        return 0;
    };
};

//part 2 rules - look at the first seat in each direction and count the occupied ones
function numSeenFilledSeats(row, column, layout) {
    let count = 0;
    const getFilledSeat = checkForSeats(layout.length, layout[0].length, layout);

    //check each of the eight directions for a filled seat
    searchDirections.forEach((dir) => {
        count += getFilledSeat(row + dir.y, column + dir.x, dir.y, dir.x);
    });

    return count;
}

//simulate how the seats empty or fill until no changes then return the filled seats
function simulateRules(layout, tooManyOccupied = 4, partOne = true) {
    let numOccupiedSeats = 0;
    let didChange = true;

    //simulate until nothing changes
    while (didChange) {
        didChange = false;
        let newLayout = layout.map((inner) => inner.slice());

        for (let row = 0; row < layout.length; row++) {
            for (let column = 0; column < layout[row].length; column++) {
                const position = layout[row][column];
                //skip any floor
                if (position === '.') continue;

                //fill or empty the seats based on the rules
                let filledSeats;
                if (partOne) {
                    //part one rules
                    filledSeats = numDirectlyAdjacent(row, column, layout);
                } else {
                    //part two rules
                    filledSeats = numSeenFilledSeats(row, column, layout);
                }
                if (position === 'L' && filledSeats === 0) {
                    newLayout[row][column] = '#';
                    didChange = true;
                    numOccupiedSeats += 1;
                } else if (position === '#' && filledSeats >= tooManyOccupied) {
                    newLayout[row][column] = 'L';
                    didChange = true;
                    numOccupiedSeats -= 1;
                }
            }
        }
        layout = newLayout;
    }
    return numOccupiedSeats;
}

console.log('the number of filled seats for part one is: ', simulateRules(layout));
console.log('the number of filled seats for part two is: ', simulateRules(layout, 5, false));
