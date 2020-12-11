import input from './input.js';

//convert the input into an array of arrays
const layout = input.split('\n').map((row) => row.split(''));

//check the target seat is within the layout bounds
const checkBounds = (height, width) => {
    return (row, column) => row >= 0 && row < height && column >= 0 && column < width;
};

//return how many directly adjacent seats are occupied
function numDirectlyAdjacent(row, column, layout) {
    let count = 0;
    const isInBounds = checkBounds(layout.length, layout[0].length);

    if (isInBounds(row, column - 1) && layout[row][column - 1] === '#') {
        count += 1;
    }
    if (isInBounds(row, column + 1) && layout[row][column + 1] === '#') {
        count += 1;
    }
    if (isInBounds(row - 1, column) && layout[row - 1][column] === '#') {
        count += 1;
    }
    if (isInBounds(row + 1, column) && layout[row + 1][column] === '#') {
        count += 1;
    }
    if (isInBounds(row - 1, column + 1) && layout[row - 1][column + 1] === '#') {
        count += 1;
    }
    if (isInBounds(row + 1, column + 1) && layout[row + 1][column + 1] === '#') {
        count += 1;
    }
    if (isInBounds(row + 1, column - 1) && layout[row + 1][column - 1] === '#') {
        count += 1;
    }
    if (isInBounds(row - 1, column - 1) && layout[row - 1][column - 1] === '#') {
        count += 1;
    }
    return count;
}

//look at the first seat in each direction and count the occupied ones
function numFirstSeen(row, column, layout) {
    let count = 0;
    const height = layout.length;
    const width = layout[0].length;
    let i, j;

    //look to the right
    for (i = column + 1; i < width; i++) {
        if (layout[row][i] !== '.') {
            if (layout[row][i] === '#') {
                count += 1;
            }
            break;
        }
    }

    //look to the left
    for (i = column - 1; i >= 0; i--) {
        if (layout[row][i] !== '.') {
            if (layout[row][i] === '#') {
                count += 1;
            }
            break;
        }
    }

    //look down
    for (i = row + 1; i < height; i++) {
        if (layout[i][column] !== '.') {
            if (layout[i][column] === '#') {
                count += 1;
            }
            break;
        }
    }

    //look up
    for (i = row - 1; i >= 0; i--) {
        if (layout[i][column] !== '.') {
            if (layout[i][column] === '#') {
                count += 1;
            }
            break;
        }
    }

    //look upper right
    i = row - 1;
    j = column + 1;
    while (i >= 0 && j < width) {
        if (layout[i][j] !== '.') {
            if (layout[i][j] === '#') {
                count += 1;
            }
            break;
        }
        i -= 1;
        j += 1;
    }

    //look lower right
    i = row + 1;
    j = column + 1;
    while (i < height && j < width) {
        if (layout[i][j] !== '.') {
            if (layout[i][j] === '#') {
                count += 1;
            }
            break;
        }
        i += 1;
        j += 1;
    }

    //look upper left
    i = row - 1;
    j = column - 1;
    while (i >= 0 && j >= 0) {
        if (layout[i][j] !== '.') {
            if (layout[i][j] === '#') {
                count += 1;
            }
            break;
        }
        i -= 1;
        j -= 1;
    }

    //look lower left
    i = row + 1;
    j = column - 1;
    while (i < height && j >= 0) {
        if (layout[i][j] !== '.') {
            if (layout[i][j] === '#') {
                count += 1;
            }
            break;
        }
        i += 1;
        j -= 1;
    }

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
                let numOccupiedAdjacent;
                if (partOne) {
                    //part one rules
                    numOccupiedAdjacent = numDirectlyAdjacent(row, column, layout);
                } else {
                    //part two rules
                    numOccupiedAdjacent = numFirstSeen(row, column, layout);
                }
                if (position === 'L' && numOccupiedAdjacent === 0) {
                    newLayout[row][column] = '#';
                    didChange = true;
                    numOccupiedSeats += 1;
                } else if (position === '#' && numOccupiedAdjacent >= tooManyOccupied) {
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
