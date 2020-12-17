import { input, searchDirections } from './input.js';

let currentGrid = new Map();
let rangeX = { min: 0, max: 0 };
let rangeY = { min: 0, max: 0 };
let rangeZ = { min: 0, max: 0 };
let rangeW = { min: 0, max: 0 };

function createGrid() {
    input.split('\n').forEach((line, y) => {
        for (let x = 0; x < line.length; x++) {
            const active = line[x] === '#';
            const coords = [x, y, 0, 0].join(',');
            currentGrid.set(coords, active);
        }
    });
}

function getActiveNeighbors(x, y, z, w) {
    //all possible search directions are saved in the input.js file
    //didn't want to do more loops than I had to
    return searchDirections.reduce((count, dir) => {
        const key = [x + dir.x, y + dir.y, z + dir.z, w + dir.w].join(',');
        return currentGrid.get(key) === true ? count + 1 : count;
    }, 0);
}

function simulate() {
    for (let cycles = 0; cycles < 6; cycles++) {
        //get new min and max dimensions for the next grid
        for (let key of currentGrid.keys()) {
            const [x, y, z, w] = key.split(',').map(Number);
            rangeX.min = Math.min(x, rangeX.min);
            rangeX.max = Math.max(x, rangeX.max);
            rangeY.min = Math.min(y, rangeY.min);
            rangeY.max = Math.max(y, rangeY.max);
            rangeZ.min = Math.min(z, rangeZ.min);
            rangeZ.max = Math.max(z, rangeZ.max);
            rangeW.min = Math.min(w, rangeZ.min);
            rangeW.max = Math.max(w, rangeZ.max);
        }

        const nextGrid = new Map();
        //for part one just remove the W loop
        for (let x = rangeX.min - 1; x <= rangeX.max + 1; x++) {
            for (let y = rangeY.min - 1; y <= rangeY.max + 1; y++) {
                for (let z = rangeZ.min - 1; z <= rangeZ.max + 1; z++) {
                    for (let w = rangeZ.min - 1; w <= rangeZ.max + 1; w++) {
                        const activeNeighbors = getActiveNeighbors(x, y, z, w);
                        const key = [x, y, z, w].join(',');
                        const isActive = currentGrid.get(key);
                        if (isActive && activeNeighbors !== 2 && activeNeighbors !== 3) {
                            nextGrid.set(key, false);
                        } else if (!isActive && activeNeighbors === 3) {
                            nextGrid.set(key, true);
                        } else {
                            nextGrid.set(key, isActive);
                        }
                    }
                }
            }
        }
        currentGrid = nextGrid;
    }

    //count all active cubes in the final grid state
    let count = 0;
    currentGrid.forEach((isActive) => {
        if (isActive) count += 1;
    });
    return count;
}

createGrid();
console.log('The number of active cubes in the 4-dimensinal space is: ', simulate());
