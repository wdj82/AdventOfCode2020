import input from './input.js';

const data = input.split('\n').map(Number);

//look for the complement amongst the previous numbers
function isComplement(searchArray, currentNum) {
    const comp = new Map();

    for (let i = 0; i < searchArray.length; i++) {
        const num = searchArray[i];
        if (comp.has(num)) {
            return true;
        }
        comp.set(currentNum - num, true);
    }
    //didn't find a complement
    return false;
}

function findInvalidNumber(numbers) {
    //create the initial search array
    const preambleAmount = 25;
    const searchArray = [];
    let index = 0;
    while (index < preambleAmount) {
        searchArray.push(numbers[index]);
        index += 1;
    }

    //check if two of the previous numbers can be summed to the current number
    while (index < numbers.length) {
        const currentNum = numbers[index];
        if (!isComplement(searchArray, currentNum)) {
            return currentNum;
        }

        //found the complement - move the search array forward and continue the search
        searchArray.shift();
        searchArray.push(numbers[index]);
        index += 1;
    }
}

//find the continuous sequence of numbers that add up to the invalid number
function findEncryptionWeakness(invalidNumber, data) {
    //start with the first two numbers
    let numList = [data[0], data[1]];
    let sum = data[0] + data[1];
    let index = 2;

    //grow and shrink the list until it adds up to the invalid number
    while (sum !== invalidNumber) {
        if (sum < invalidNumber) {
            //add in the next number
            numList.push(data[index]);
            sum += data[index];
            index += 1;
        } else {
            //remove the first number
            const oldNum = numList.shift();
            sum -= oldNum;
        }
    }

    return Math.max(...numList) + Math.min(...numList);
}

const invalidNumber = findInvalidNumber(data);
console.log('the invalid number is: ', invalidNumber);
console.log('the encryption weakness is: ', findEncryptionWeakness(invalidNumber, data));
