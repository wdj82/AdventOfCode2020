import input from './input.js';

// const input = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
// trh fvjkl sbzzf mxmxvkd (contains dairy)
// sqjhc fvjkl (contains soy)
// sqjhc mxmxvkd sbzzf (contains fish)`;

//split the each food into its ingredients and allergens
const foods = input.split('\n').map((food) => {
    const [ingredients, allergens] = food.split('(contains ').map((x) => x.match(/[a-z]+/g));
    return { ingredients, allergens };
});

function parseFoods() {
    //contains each allergens possible ingredients
    const allergens = {};
    //all the unique ingredients used in all the food
    const allIngredients = new Set();

    foods.forEach((food) => {
        //add each ingredient used in this food to our set of all ingredients
        food.ingredients.forEach((x) => allIngredients.add(x));

        //add each possible ingredient to the each allergen
        food.allergens.forEach((allergen) => {
            const ingredients = new Set(food.ingredients);
            if (allergens[allergen]) {
                //only keep ingredients for this allergen that are also in this food
                allergens[allergen] = new Set([...allergens[allergen]].filter((x) => ingredients.has(x)));
            } else {
                allergens[allergen] = ingredients;
            }
        });
    });

    //for part one:
    //get all ingredients that are possible allergens
    const allergenIngredients = Object.values(allergens).reduce((acc, curr) => new Set([...acc, ...curr]), []);
    //find the ingredients that do not have any possible allergens
    const safeIngredients = new Set([...allIngredients].filter((x) => !allergenIngredients.has(x)));
    const timesSafe = foods.reduce(
        (count, food) => count + food.ingredients.filter((x) => safeIngredients.has(x)).length,
        0,
    );
    console.log('The number of times safe ingredients appear in all foods is: ', timesSafe);

    //for part two:
    //return the foods that do contain allergens
    const allergenEntries = Object.entries(allergens);

    while (allergenEntries.find(([, ingreds]) => ingreds.size > 1)) {
        allergenEntries.forEach(([allergen, ingredients]) => {
            if (ingredients.size === 1) {
                //remove the ingredient from the other allergens
                allergenEntries.forEach(([_allergen, _ingredients], i) => {
                    if (allergen !== _allergen) {
                        allergenEntries[i] = [_allergen, new Set([..._ingredients].filter((x) => !ingredients.has(x)))];
                    }
                });
            }
        });
    }
    //sort by allergen name and print a list of the ingredents
    const list = allergenEntries
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map((a) => [...a[1]][0])
        .join(',');
    console.log(list);
}

parseFoods();
