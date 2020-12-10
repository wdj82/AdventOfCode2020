import input from './input.js';

const inputCode = input.split('\n');

//run the program till completion or detecting an infinite loop
function runInstructions(code) {
    const savedIndex = new Map();
    let acc = 0;
    let index = 0;

    while (!savedIndex.has(index) && index < code.length) {
        savedIndex.set(index, true);
        const [op, arg] = code[index].split(' ');
        if (op.includes('nop')) {
            index += 1;
        } else if (op.includes('acc')) {
            acc += Number(arg);
            index += 1;
        } else {
            index += Number(arg);
        }
    }
    return {
        acc,
        completed: index === code.length, //did the program run till the end?
    };
}

//brute force a fix by swapping every 'nop' and 'jmp' until the program runs completely
function runInstructionsAndFix(code) {
    for (let i = 0; i < code.length; i++) {
        //skip acc
        if (code[i].includes('acc')) {
            continue;
        }

        //swap nop and jmp then test if the program can complete
        const savedInstruction = code[i];
        if (savedInstruction.includes('nop')) {
            code[i] = savedInstruction.replace('nop', 'jmp');
        } else {
            code[i] = savedInstruction.replace('jmp', 'nop');
        }
        const result = runInstructions(code);
        if (result.completed) {
            return result.acc;
        } else {
            //on incomplete return instruction to original before continuing
            code[i] = savedInstruction;
        }
    }
}

console.log('the acc with infinite loops is: ', runInstructions(inputCode).acc);
console.log('the acc with fixed code is: ', runInstructionsAndFix(inputCode));
