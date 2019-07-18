class BeveragesIngredientFactory {

    // Returns object ingredients by beverages name
    getBeveragesIngredient(baverages: drinkName) {
        let ingr = {};
        switch (baverages) {
            case drinkName.coffee:
                ingr[ingredients.cofee] = 3;
                ingr[ingredients.sugar] = 1;
                ingr[ingredients.cream] = 1;
                break;
            case drinkName.decafCoffee:
                ingr[ingredients.decafCoffee] = 3;
                ingr[ingredients.sugar] = 1;
                ingr[ingredients.cream] = 1;
                break;
            case drinkName.caffeLatte:
                ingr[ingredients.espresso] = 3;
                ingr[ingredients.steamedMilk] = 1;
                break;
            case drinkName.caffeAmericano:
                ingr[ingredients.espresso] = 3;
                break;
            case drinkName.caffeMocha:
                ingr[ingredients.espresso] = 1;
                ingr[ingredients.cocoa] = 1;
                ingr[ingredients.cream] = 1;
                ingr[ingredients.steamedMilk] = 1;
                break;
            case drinkName.cappuccino:
                ingr[ingredients.espresso] = 2;
                ingr[ingredients.steamedMilk] = 1;
                ingr[ingredients.foamedMilk] = 1;
                break;
            default:
                Error('No match');
        }

        return ingr;
    }
}