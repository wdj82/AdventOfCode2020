import input from './input.js';

// const input = `0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"

// ababbb
// bababa
// abbbab
// aaabbb
// aaaabbb`;

const [rawRules, messages] = input.split('\n\n');
const rules = Object.fromEntries(rawRules.split('\n').map((rule) => rule.split(': ')));

const processedRules = {};

function createRegex(input) {
    //we've created the regex for this rule return it
    if (processedRules[input]) {
        return processedRules[input];
    }

    const rule = rules[input];

    if (rule[0] === '"') {
        processedRules[input] = rule.replace(/["]+/g, '');
        return processedRules[input];
    }

    if (!rule.includes('|')) {
        processedRules[input] = rule.split(' ').map(createRegex).join('');
        return processedRules[input];
    }

    const test =
        '(' +
        rule
            .split(' ')
            .map((x) => (x === '|' ? x : createRegex(x)))
            .join('') +
        ')';
    processedRules[input] = test;
    return test;
}

const regex = new RegExp('^' + createRegex(0) + '$', 'gm');
// console.log(regex);
// console.log(processedRules);
const partOneMatches = messages.match(regex).length;
console.log('The number of messages that match rule 0 are: ', partOneMatches);
