import input from './input.js';

const inputArray = input.split('\n').map(Number);

function firstAnswer() {
    for (let i = 0; i < inputArray.length; i++) {
        const num1 = inputArray[i];
        for (let j = i + 1; j < inputArray.length; j++) {
            const num2 = inputArray[j];
            if (num1 + num2 === 2020) {
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
