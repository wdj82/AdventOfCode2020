import input from './input.js';

const expressions = input.split('\n');

//part one parse
function parseSimple(expression) {
    while (expression.match(/\(/)) {
        //parse what's inside  the parens (removing the parens)
        expression = expression.replace(/\([^()]+\)/, (match) => parseSimple(match.slice(1, match.length - 1)));
    }

    //compute until expression is just a number
    while (Number.isNaN(Number(expression))) {
        expression = expression.replace(/(\d+) ([+*]) (\d+)/, (_, a, op, b) =>
            op == '+' ? Number(a) + Number(b) : Number(a) * Number(b),
        );
    }

    return Number(expression);
}

//part two parse
function parseAdvanced(expression) {
    while (expression.match(/\(/)) {
        //parse what's inside  the parens (removing the parens)
        expression = expression.replace(/\([^()]+\)/, (match) => parseAdvanced(match.slice(1, match.length - 1)));
    }

    //addition first
    while (expression.match(/\+/)) {
        expression = expression.replace(/(\d+) \+ (\d+)/, (_, a, b) => Number(a) + Number(b));
    }

    //multiplication second
    while (expression.match(/\*/)) {
        expression = expression.replace(/(\d+) \* (\d+)/, (_, a, b) => Number(a) * Number(b));
    }

    return Number(expression);
}

const simpleTotal = expressions.reduce((total, expression) => (total += parseSimple(expression)), 0);
console.log('The sum of expressions using simple math is: ', simpleTotal);

const advancedTotal = expressions.reduce((total, expression) => (total += parseAdvanced(expression)), 0);
console.log('The sum of expressions using advanced math is: ', advancedTotal);
