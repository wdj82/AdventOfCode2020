import input from './input.js';

const passwordArray = input.split('\n');

function countChars(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count += 1;
        }
    }
    return count;
}

function testPasswordsOne(passwords) {
    let result = 0;

    passwords.forEach((test) => {
        const [policy, password] = test.split(':');
        const [minMax, letter] = policy.split(' ');
        const [min, max] = minMax.split('-').map(Number);
        const count = countChars(password, letter);
        if (count >= min && count <= max) {
            result += 1;
        }
    });

    return result;
}

function testPasswordsTwo(passwords) {
    let result = 0;

    passwords.forEach((test) => {
        const [policy, password] = test.split(':');
        const [positions, letter] = policy.split(' ');
        const [firstIndex, secondIndex] = positions.split('-').map(Number);

        const first = password[firstIndex];
        const second = password[secondIndex];

        if ((first === letter || second === letter) && first !== second) {
            result += 1;
        }
    });

    return result;
}

console.log(testPasswordsOne(passwordArray));
console.log(testPasswordsTwo(passwordArray));
