import input from './input.js';

//part one - apply the mask to the binary value
function applyMask(mask, value) {
    let maskIndex = mask.length - 1;
    let valueIndex = value.length - 1;
    const result = [];
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

//part two - apply the mask with floating bits to the address
function applyMaskWithFloating(mask, address) {
    let maskIndex = mask.length - 1;
    let valueIndex = address.length - 1;
    const result = [];
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

//get all possible address generated from the floating bits
function getAddresses(floatingAddress) {
    const addressArray = [];
    const numFloats = floatingAddress.match(/X/g).length;
    const floatCombinations = [];

    //for n number of floating bits the number of combinations is 2^n
    //create a bit string for each combination (eg: two floats = [00, 01, 10, 11])
    for (let i = 0; i < Math.pow(2, numFloats); i++) {
        floatCombinations.push(i.toString(2).padStart(numFloats, '0'));
    }

    //for each combination create a new address
    for (let i = 0; i < floatCombinations.length; i++) {
        let index = 0;
        let address = '';
        //swap the X's with the combination's bits
        for (let j = 0; j < floatingAddress.length; j++) {
            const char = floatingAddress[j];
            if (char === 'X') {
                address += floatCombinations[i][index];
                index += 1;
            } else {
                address += char;
            }
        }
        addressArray.push(parseInt(address, 2));
    }

    //return the decimal address array
    return addressArray;
}

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
                //set all possible floating addresses to the value
                const floatingAddress = applyMaskWithFloating(mask, Number(address).toString(2));
                const addressArray = getAddresses(floatingAddress);
                addressArray.forEach((address) => (commands[address] = Number(value)));
            }
        }
    });

    //return the sum of all values in memory
    return Object.values(commands).reduce((acc, curr) => acc + curr, 0);
}

console.log('The sum of all values in memory for part one is: ', sumValues(input));
console.log('The sum of all values in memory for part two is: ', sumValues(input, false));
