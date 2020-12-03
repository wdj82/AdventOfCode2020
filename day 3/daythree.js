import input from './input.js';

const inputArray = input.split('\n');

function findTrees(terrain, xSlope, ySlope) {
    const height = terrain.length;
    const width = terrain[0].length;

    let x = 0;
    let y = 0;
    let hitTrees = 0;
    while (y < height - 1) {
        y += ySlope;
        x += xSlope;
        if (x >= width) {
            x -= width;
        }
        if (terrain[y][x] === '#') {
            hitTrees += 1;
        }
    }
    return hitTrees;
}
console.log(findTrees(inputArray, 3, 1));
console.log(
    findTrees(inputArray, 1, 1) *
        findTrees(inputArray, 3, 1) *
        findTrees(inputArray, 5, 1) *
        findTrees(inputArray, 7, 1) *
        findTrees(inputArray, 1, 2)
);
