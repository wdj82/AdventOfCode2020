import input from './input.js';

// const input = `class: 1-3 or 5-7
// row: 6-11 or 33-44
// seat: 13-40 or 45-50

// your ticket:
// 7,1,14

// nearby tickets:
// 7,3,47
// 40,4,50
// 55,2,20
// 38,6,12`;

const [partOne, partTwo, partThree] = input.split('\n\n');

const fields = partOne.split('\n').reduce((obj, curr) => {
    const [field, ranges] = curr.split(': ');
    const [first, second] = ranges.split(' or ');
    const [firstStart, firstEnd] = first.split('-').map(Number);
    const [secondStart, secondEnd] = second.split('-').map(Number);

    obj[field] = {
        firstRange: {
            start: firstStart,
            end: firstEnd,
        },
        secondRange: {
            start: secondStart,
            end: secondEnd,
        },
    };
    return obj;
}, {});

const yourTicket = partTwo.split('\n')[1].split(',').map(Number);

const nearbyTickets = partThree
    .slice(partThree.indexOf('\n') + 1)
    .split('\n')
    .map((inner) => inner.split(',').map(Number));

function isValidValue(ticketValue) {
    return Object.values(fields).reduce((pass, ranges) => {
        //if passed before one of the ranges is valid so skip
        if (pass) return true;

        //check both ranges
        if (ticketValue >= ranges.firstRange.start && ticketValue <= ranges.firstRange.end) {
            return true;
        }
        if (ticketValue >= ranges.secondRange.start && ticketValue <= ranges.secondRange.end) {
            return true;
        }
        //failed both ranges
        return false;
    }, false);
}

//add up all invalid values of each ticket
function findScanningErrorRate(tickets) {
    return tickets.reduce((total, ticket) => {
        return (total += ticket.reduce((errorTotal, value) => {
            return isValidValue(value) ? errorTotal : (errorTotal += value);
        }, 0));
    }, 0);
}

console.log('The ticket scanning error rate is: ', findScanningErrorRate(nearbyTickets));
