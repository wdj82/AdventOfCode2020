const input = [2, 0, 1, 7, 4, 14, 18];

function getNumber(input, goal) {
    const lastSpokenIndex = new Map();

    //save the indexes of the input
    let i;
    for (i = 0; i < input.length; i++) {
        lastSpokenIndex.set(input[i], i);
    }

    let lastNum = input[i - 1];
    let nextNumber;
    while (i < goal) {
        //if the last number was spoken set next number to current index minus last spoken index
        if (lastSpokenIndex.has(lastNum)) {
            nextNumber = i - lastSpokenIndex.get(lastNum) - 1;
        } else {
            //the last number was new so next number is 0
            nextNumber = 0;
        }
        //save the current index for the last number
        lastSpokenIndex.set(lastNum, i - 1);
        lastNum = nextNumber;
        i += 1;
    }
    return lastNum;
}

console.log('The 2020th number spoken is: ', getNumber(input, 2020));
console.log('The 30000000th number spoken is: ', getNumber(input, 30000000));
