import input from './input.js';

const [partOne, partTwo, partThree] = input.split('\n\n');

//handle the input
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

//check if in both ranges for field
function isInRange(field, value) {
    if (
        (value >= field.firstRange.start && value <= field.firstRange.end) ||
        (value >= field.secondRange.start && value <= field.secondRange.end)
    ) {
        return true;
    }
    return false;
}

//check if this is a valid ticket value according to the field ranges
function isValueValid(ticketValue) {
    return Object.values(fields).reduce((pass, field) => {
        //if passed before one of the ranges is valid so skip
        if (pass) return true;

        return isInRange(field, ticketValue);
    }, false);
}

//check if the ticket is valid
function isValidTicket(ticket) {
    for (let i = 0; i < ticket.length; i++) {
        if (!isValueValid(ticket[i])) {
            return false;
        }
    }
    return true;
}

//part one - add up all invalid values of each ticket
function findScanningErrorRate() {
    return nearbyTickets.reduce((total, ticket) => {
        return (total += ticket.reduce((errorTotal, value) => {
            return isValueValid(value) ? errorTotal : (errorTotal += value);
        }, 0));
    }, 0);
}

//part two - find the correct order of the fields for each value
function getCorrectFields() {
    const validTickets = nearbyTickets.filter((ticket) => isValidTicket(ticket));
    const fieldNames = Object.keys(fields);
    const possiblities = Array.from({ length: fieldNames.length }, Object);
    const correctFields = {};
    const knownNames = {};

    while (Object.values(correctFields).length !== fieldNames.length) {
        //go through each value of the ticket
        validTickets.forEach((ticket, ticketIndex) => {
            ticket.forEach((value, valueIndex) => {
                //get all names that fit the rules for this value
                let possibleNames = fieldNames.map((name) => {
                    //skip if the name or value is known
                    if (correctFields[valueIndex] || knownNames[name]) {
                        return;
                    }
                    //if value matches the ranges for this name add it
                    if (isInRange(fields[name], value)) {
                        return name;
                    }
                });

                //intersect the names with any saved names for this value's index
                if (possiblities[valueIndex].length > 1) {
                    possibleNames = possiblities[valueIndex].filter((name) => possibleNames.includes(name));
                }

                //if only one name left we have an answer
                if (possibleNames.length === 1) {
                    const name = possibleNames[0];
                    correctFields[valueIndex] = name;
                    knownNames[name] = true;
                } else {
                    //otherwise store the names for future checks
                    possiblities[valueIndex] = possibleNames;
                }
            });
        });
    }
    return correctFields;
}

//part two - return product of all values that match fields with departure in the name
function getDepatureFieldProduct() {
    const correctFields = getCorrectFields();
    return yourTicket.reduce((acc, value, valueIndex) => {
        return correctFields[valueIndex].includes('departure') ? (acc *= value) : acc;
    }, 1);
}

console.log('The ticket scanning error rate is: ', findScanningErrorRate());
console.log('The departure fields multiplied together is: ', getDepatureFieldProduct());
