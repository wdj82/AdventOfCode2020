import input from './input.js';

const inputArray = input.split('\n').map(Number);

function firstAnswer() {
    const comp = new Map();

    for (let i = 0; i < inputArray.length; i++) {
        const num1 = inputArray[i];
        if (comp.has(num1)) {
            return comp.get(num1) * num1;
        }
        comp.set(2020 - num1, num1);
    }
}

function secondAnswer() {
    for (let i = 0; i < inputArray.length; i++) {
        const num1 = inputArray[i];
        for (let j = i + 1; j < inputArray.length; j++) {
            const num2 = inputArray[j];
            for (let k = j + 1; k < inputArray.length; k++) {
                const num3 = inputArray[k];
                if (num1 + num2 + num3 === 2020) {
                    return num1 * num2 * num3;
                }
            }
        }
    }
}

console.log('first answer: ' + firstAnswer());
console.log('second answer: ' + secondAnswer());
