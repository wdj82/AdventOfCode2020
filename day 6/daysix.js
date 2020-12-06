import input from './input.js';

const groups = input.split('\n\n');

function countQuestions(group, flag) {
    const groupArray = group.split('\n');

    //create an object storing each unique answer and how many times it was given
    const uniqueAnswers = {};
    groupArray.forEach((string) => {
        for (let i = 0; i < string.length; i++) {
            const letter = string[i];
            uniqueAnswers[letter] = (uniqueAnswers[letter] || 0) + 1;
        }
    });

    //for part one just need the count for all unique answers
    if (flag === 'any') {
        return Object.keys(uniqueAnswers).length;
    }

    //for part two only return answers where everyone answered yes
    if (flag === 'all') {
        const answerCounts = Object.values(uniqueAnswers);
        //add all answer counts equal to the number of people in the group and return
        return answerCounts.reduce((total, answerCount) => (answerCount === groupArray.length ? (total += 1) : total), 0);
    }

    //impossible but what the hell
    throw new Error('unknown flag');
}

function sumQuestions(groups, flag = 'any') {
    return groups.reduce((total, group) => total + countQuestions(group, flag), 0);
}

console.log(sumQuestions(groups));
console.log(sumQuestions(groups, 'all'));
