import input from './input.js';

// const input = `1 + 2 * 3 + 4 * 5 + 6
// 1 + (2 * 3) + (4 * (5 + 6))
// 2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

const expressions = input.split('\n');

function parse(expression) {
    while (expression.match(/\(/)) {
        //parse what's inside  the parens (removing the parens)
        expression = expression.replace(/\([^()]+\)/, (match) => parse(match.slice(1, match.length - 1)));
    }

    //compute until expression is just a number
    while (Number.isNaN(Number(expression))) {
        expression = expression.replace(/(\d+) ([+*]) (\d+)/, (_, a, op, b) =>
            op == '+' ? Number(a) + Number(b) : Number(a) * Number(b),
        );
    }
    return Number(expression);
}

const total = expressions.reduce((total, expression) => (total += parse(expression)), 0);

console.log(total);
