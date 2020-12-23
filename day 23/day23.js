class Cup {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

//uses a single linked list for the cups
//and a hashmap to quickly finding a specific cup with its value
class Game {
    constructor(labels) {
        this.currentCup = null;
        this.lastCup = null;
        this.numCups = labels.length;
        this.cups = new Map();

        //add each value to the list
        for (let i = 0; i < this.numCups; i++) {
            this.push(Number(labels[i]));
        }
        //the last cups points to the first cup
        this.lastCup.next = this.currentCup;
    }

    //add cups up to the new max number
    addUpTo(newMaxCups) {
        const start = this.numCups + 1;
        for (let i = start; i <= newMaxCups; i++) {
            this.push(i);
        }
        //loop the last cup back to the first
        this.lastCup.next = this.currentCup;
        this.numCups = newMaxCups;
    }

    push(value) {
        const newCup = new Cup(value);
        if (!this.currentCup) {
            this.currentCup = newCup;
            this.lastCup = newCup;
        } else {
            this.lastCup.next = newCup;
            this.lastCup = newCup;
        }

        this.cups.set(newCup.value, newCup);
    }

    play(numTurns = 1) {
        for (let i = 0; i < numTurns; i++) {
            //remove the three cups
            const firstRemove = this.currentCup.next;
            const secondRemove = firstRemove.next;
            const thirdRemove = secondRemove.next;
            this.currentCup.next = thirdRemove.next;

            //find the target cup to reinsert
            let target = this.currentCup.value;
            while (true) {
                target = target - 1;
                if (target < 1) target = this.numCups;
                if (target !== firstRemove.value && target !== secondRemove.value && target !== thirdRemove.value) {
                    break;
                }
            }
            const targetCup = this.cups.get(target);

            //insert the three cups after the target cup
            const nextCup = targetCup.next;
            targetCup.next = firstRemove;
            thirdRemove.next = nextCup;

            //move the current cup along
            this.currentCup = this.currentCup.next;
        }
    }

    //return the cups after cup 1 in order
    partOneAnswer() {
        const values = [];
        let cup = this.cups.get(1).next;
        while (cup.value !== 1) {
            values.push(cup.value);
            cup = cup.next;
        }
        return values.join('');
    }

    //return the two cups after cup 1 multiplied together
    partTwoAnswer() {
        const cup = this.cups.get(1).next;
        return cup.value * cup.next.value;
    }
}

const input = `538914762`;

const game1 = new Game(input);
game1.play(100);
console.log('part one answer: ', game1.partOneAnswer());

const game2 = new Game(input);
game2.addUpTo(1000000);
game2.play(10000000);
console.log('part two answer: ', game2.partTwoAnswer());
