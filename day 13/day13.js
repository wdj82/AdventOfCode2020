import input from './input.js';

const [line1, buses] = input.split('\n');
const departTime = Number(line1);

//part one
function findShortestWait(departTime, buses) {
    const busIds = buses.replace(/x,/g, '').split(',').map(Number);
    const shortestWait = { busId: 0, waitTime: Infinity };
    busIds.forEach((id) => {
        const waitTime = Math.floor(departTime / id) * id + id - departTime;
        if (waitTime < shortestWait.waitTime) {
            shortestWait.busId = id;
            shortestWait.waitTime = waitTime;
        }
    });
    return shortestWait.waitTime * shortestWait.busId;
}

//part two
function findEarliestOffsets(buses) {
    const busIds = buses.split(',').map(Number);
    let timestamp = busIds[0];
    let step = 1;

    busIds.forEach((bus, index) => {
        if (Number.isNaN(bus)) return;
        while ((timestamp + index) % bus !== 0) {
            timestamp += step;
        }
        step *= bus;
    });
    return timestamp;
}

console.log('The bus id multiplied by minutes waiting is: ', findShortestWait(departTime, buses));
console.log('Earliest timestamp to stagger all buses is one after the other: ', findEarliestOffsets(buses));
