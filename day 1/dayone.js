import input from './input.js';

const inputArray = input.split('\n').map(Number);

function firstAnswer() {
    for (let i = 0; i < inputArray.length; i++) {
        const num1 = inputArray[i];
        const target = 2020 - num1;
        for (let j = i + 1; j < inputArray.length; j++) {
            const num2 = inputArray[j];
            if (num2 === target) {
                return num1 * num2;
            }
        }
    }
}

function secondAnswer() {
    for (let i = 0; i < inputArray.length; i++) {
        const num1 = inputArray[i];
        for (let j = i + 1; j < inputArray.length; j++) {
            const num2 = inputArray[j];
            const target = 2020 - num1 - num2;
            for (let k = j + 1; k < inputArray.length; k++) {
                const num3 = inputArray[k];
                if (num3 === target) {
                    return num1 * num2 * num3;
                }
            }
        }
    }
}

console.log('first answer: ' + firstAnswer());
console.log('second answer: ' + secondAnswer());
