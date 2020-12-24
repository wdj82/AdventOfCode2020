import input from './input.js';

const instructions = input.split('\n');

function getNextTile(instruction) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < instruction.length; i++) {
        let a = instruction[i];
        let b = instruction[i + 1];
        if (a === 'n') {
            y -= 1;
            if (b === 'w') {
                x -= 1;
            }
            i += 1;
        } else if (a === 's') {
            y += 1;
            if (b === 'e') {
                x += 1;
            }
            i += 1;
        } else if (a === 'w') {
            x -= 1;
        } else {
            x += 1;
        }
    }
    return [x, y];
}

function flipTiles() {
    let blackTiles = new Set();
    let tiles = {};
    instructions.forEach((instruction) => {
        const [x, y] = getNextTile(instruction);
        if (blackTiles.has([x, y].toString())) {
            blackTiles.delete([x, y].toString());
        } else {
            blackTiles.add([x, y].toString());
            tiles[[x, y]] = [x, y];
            tiles[[x - 1, y - 1]] = [x - 1, y - 1];
            tiles[[x, y - 1]] = [x, y - 1];
            tiles[[x, y + 1]] = [x, y + 1];
            tiles[[x + 1, y + 1]] = [x + 1, y + 1];
            tiles[[x - 1, y]] = [x - 1, y];
            tiles[[x + 1, y]] = [x + 1, y];
        }
    });

    console.log('The number of black tiles initially is: ', blackTiles.size);

    for (let i = 0; i < 100; i++) {
        let newBlackTiles = new Set();
        let newTiles = {};
        for (let [x, y] of Object.values(tiles)) {
            let neighbors = 0;
            neighbors += blackTiles.has([x - 1, y - 1].toString());
            neighbors += blackTiles.has([x, y - 1].toString());
            neighbors += blackTiles.has([x, y + 1].toString());
            neighbors += blackTiles.has([x + 1, y + 1].toString());
            neighbors += blackTiles.has([x - 1, y].toString());
            neighbors += blackTiles.has([x + 1, y].toString());
            if (
                (blackTiles.has([x, y].toString()) && neighbors !== 0 && neighbors <= 2) ||
                (!blackTiles.has([x, y].toString()) && neighbors === 2)
            ) {
                newBlackTiles.add([x, y].toString());
                newTiles[[x, y]] = [x, y];
                newTiles[[x - 1, y - 1]] = [x - 1, y - 1];
                newTiles[[x, y - 1]] = [x, y - 1];
                newTiles[[x, y + 1]] = [x, y + 1];
                newTiles[[x + 1, y + 1]] = [x + 1, y + 1];
                newTiles[[x - 1, y]] = [x - 1, y];
                newTiles[[x + 1, y]] = [x + 1, y];
            }
        }
        tiles = newTiles;
        blackTiles = newBlackTiles;
    }
    console.log('The number of black tiles for after 100 days is: ', blackTiles.size);
}

flipTiles();
