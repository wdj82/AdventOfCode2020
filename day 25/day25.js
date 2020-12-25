const input = `11239946
10464955`;

const [cardKey, doorKey] = input.split('\n').map(Number);

function getLoopSize(target) {
    let value = 1;
    let loopSize = 0;
    while (value !== target) {
        value *= 7 % 20201227;
        value %= 20201227;
        loopSize++;
    }
    return loopSize;
}

function transform(subjectNum, loopSize) {
    let key = 1;
    for (let i = 0; i < loopSize; i++) {
        key *= subjectNum;
        key %= 20201227;
    }
    return key;
}

const cardLoopSize = getLoopSize(cardKey);
const encryptionKey = transform(doorKey, cardLoopSize);
console.log('The encryption key is: ', encryptionKey);
