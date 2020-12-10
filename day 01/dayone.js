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
    const arr = [...inputArray].sort((a, b) => a - b);

    for (let i = 0; i <= arr.length - 3; i++) {
        if (i === 0 || arr[i] > arr[i - 1]) {
            let start = i + 1;
            let end = arr.length - 1;

            while (start < end) {
                if (arr[i] + arr[start] + arr[end] === 2020) {
                    return arr[i] * arr[start] * arr[end];
                }
                if (arr[i] + arr[start] + arr[end] < 2020) {
                    const currentStart = start;
                    while (arr[start] === arr[currentStart] && start < end) {
                        start++;
                    }
                } else {
                    const currentEnd = end;
                    while (arr[end] === arr[currentEnd] && start < end) {
                        end--;
                    }
                }
            }
        }
    }
}

console.log('first answer: ' + firstAnswer());
console.log('second answer: ' + secondAnswer());
