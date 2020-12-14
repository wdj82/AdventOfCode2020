import input from './input.js';

// const input = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`;

//part one - apply the mask to the binary value
function applyMask(mask, value) {
    let maskIndex = mask.length - 1;
    let valueIndex = value.length - 1;
    let result = [];
    while (maskIndex >= 0) {
        if (mask[maskIndex] !== 'X') {
            result.push(mask[maskIndex]);
        } else {
            result.push(value[valueIndex] || 0);
        }
        maskIndex -= 1;
        valueIndex -= 1;
    }
    //return result as decimal
    return parseInt(result.reverse().join(''), 2);
}

//part two - apply the mask with floating bits
function applyMaskWithFloating(mask, address) {
    let maskIndex = mask.length - 1;
    let valueIndex = address.length - 1;
    let result = [];
    while (maskIndex >= 0) {
        if (mask[maskIndex] === '0') {
            result.push(address[valueIndex] || 0);
        } else if (mask[maskIndex] === '1') {
            result.push('1');
        } else {
            result.push('X');
        }
        maskIndex -= 1;
        valueIndex -= 1;
    }
    return result.reverse().join('');
}

function getAddresses(floatingAddress) {}

//return sum of all values in memory after running the input commands
function sumValues(input, partOne = true) {
    const commands = {};
    let mask = '';

    const lines = input.split('\n');

    //parse the input line by line
    lines.forEach((line) => {
        //update the mask
        if (line.includes('mask')) {
            mask = line.slice(7);
        } else {
            //get the address and value
            const [left, value] = line.split(' = ');
            const address = left.slice(left.indexOf('[') + 1, left.indexOf(']'));

            if (partOne) {
                //set the address in memory to the value after applying the mask
                commands[address] = applyMask(mask, Number(value).toString(2));
            } else {
                //part two
                const floatingAddress = applyMaskWithFloating(mask, Number(address).toString(2));
                console.log(floatingAddress);
            }
        }
    });

    //return the sum of all values in memory
    return Object.values(commands).reduce((acc, curr) => acc + curr, 0);
}

console.log('The sum of all values in memory for part one is: ', sumValues(input));
console.log('The sum of all values in memory for part two is: ', sumValues(input, false));
