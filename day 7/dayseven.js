import input from './input.js';

const bagsArray = input.split('\n');

//create an object containing each bag and the bags it can contain as an inner object
function createBagObjects(bags) {
    const bagObjects = {};
    bags.forEach((bag) => {
        //break out the bag and the bags it can contain - getting rid of all bag or bags and the peroid from the input
        const [currentBag, innerBags] = bag.replace(/(bags|bag)[.]?/g, '').split(' contain ');

        //if the bag cannot hold any other bags set to 0 and continue
        if (innerBags.includes('no other')) {
            bagObjects[currentBag.trim()] = 0;
            return;
        }

        //save the inner bags as an object with the bags and their count
        const innerBagsObj = {};
        innerBags.split(',').forEach((innerBag) => {
            const count = Number(innerBag.slice(0, 2));
            const bag = innerBag.slice(2).trim();
            innerBagsObj[bag] = count;
        });

        //set the bag to point to it's inner bag contents in the saved object
        bagObjects[currentBag.trim()] = innerBagsObj;
    });
    return bagObjects;
}

//recursively search the bag object for every bag that can hold a shiny gold bag
function findBagsThatCanHoldGoldBag(bags, savedBags = {}) {
    let total = 0;
    Object.entries(bags).forEach(([outterBag, containedBags]) => {
        if (typeof containedBags !== 'object' || outterBag === 'shiny gold') {
            //skip the shiny bag and don't count bags that don't hold other bags
            savedBags[outterBag] = false;
            return;
        }

        if (savedBags[outterBag] || containedBags['shiny gold']) {
            //already did this bag or can hold a shiny gold bag itself
            savedBags[outterBag] = true;
            total += 1;
            return;
        }

        if (savedBags[outterBag] === false) {
            //ruled out this bag
            return;
        }

        //check bags this bag contains to see if they can hold a shiny gold bag
        const innerBags = Object.keys(containedBags);
        let found = 0;
        for (let i = 0; i < innerBags.length; i++) {
            const innerBag = innerBags[i];

            if (savedBags[innerBag]) {
                //we know this inner bag works so save the outer bag and stop looping
                savedBags[outterBag] = true;
                total += 1;
                return;
            }

            if (savedBags[innerBag] === false) {
                //we know this inner bag is bad skip it
                continue;
            }

            //recursive search
            found = findBagsThatCanHoldGoldBag({ [innerBag]: allBags[innerBag] });
            if (found > 0) {
                //one of the inner bags of this inner bag works save the outer bag
                savedBags[outterBag] = true;
                total += found;
                return;
            }
        }
        //if we got to this point and nothing was found the outter bag can't hold a shiny bag
        savedBags[outterBag] = false;
    });
    return total;
}

//recursively find out how many bags this bag contains
function findTotalBags(startBag) {
    //base is a bag not containing any other bags
    if (typeof allBags[startBag] === 'number') {
        return allBags[startBag];
    }

    //get the total number of bags each of the inner bags contains
    let total = 0;
    Object.entries(startBag).forEach(([bag, count]) => {
        total += count + count * findTotalBags(allBags[bag]);
    });
    return total;
}

const allBags = createBagObjects(bagsArray);
console.log('number of bags that can hold the shiny gold bag: ', findBagsThatCanHoldGoldBag(allBags));
console.log('total bags the shiny gold bag contains: ', findTotalBags(allBags['shiny gold']));
