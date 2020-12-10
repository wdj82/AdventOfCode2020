import input from './input.js';

const adapters = input.split('\n').map(Number);

function chainAdapters(adapters) {
    const sortedAdapters = [...adapters].sort((a, b) => a - b);
    let oneCount = 1;
    let threeCount = 1;

    //if the difference in joltage between two adapters is one or three count it
    for (let i = 1; i < sortedAdapters.length; i++) {
        const diff = sortedAdapters[i] - sortedAdapters[i - 1];
        if (diff === 1) {
            oneCount += 1;
        } else if (diff === 3) {
            threeCount += 1;
        }
    }
    return oneCount * threeCount;
}

function findCombinations(adapters) {
    //remove duplicates and add the devices joltage to the list (max adapter + 3)
    const max = Math.max(...adapters) + 3;
    const uniqueAdapters = new Set(adapters);
    uniqueAdapters.add(max);

    //calculate the possible combinations up to the max joltage
    const combinations = {};
    //initial is always 1 jolt
    combinations[0] = 1;
    for (let i = 1; i <= max; i++) {
        //if this joltage is in the list set it's possible combinations based on the three previous joltages combinations
        if (uniqueAdapters.has(i)) {
            combinations[i] = (combinations[i - 1] || 0) + (combinations[i - 2] || 0) + (combinations[i - 3] || 0);
        }
    }
    //the final value is the total number of combinations for this max joltage
    return combinations[max];
}

console.log('1-jolt differences multiplied by 3-jolt differences is: ', chainAdapters(adapters));
console.log('total number of distinct combinations of adapters is: ', findCombinations(adapters));
