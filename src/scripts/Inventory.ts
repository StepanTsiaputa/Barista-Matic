class Inventory {
    private _baristaMain: BaristaMain;

    constructor(barista: BaristaMain) {
        this._baristaMain = barista;
    }

    // Removes ingredients from the date series
    getAllIng(ingredients): Promise<any> {
        return new Promise((resolve, reject) => {
            let values = this._baristaMain.dataManager.dataValues;
            if (this.checkIfEnought(ingredients)) {
                for(let val in ingredients) {
                    let ingr = ingredients[val];
                    for (let item of values) {
                        if (item.name === val)
                            item.count -= ingr;
                    }
                }
                resolve();
            } else
                reject();
        })
    }

    // Check if enough ingredient for beverages
    checkIfEnought(ingredients) {
        let values = this._baristaMain.dataManager.dataValues;
        let isEnought = true;
        for(let val in ingredients) {
            let ingr = ingredients[val];
            for (let item of values) {
                if (item.name === val) {
                    if (item.count - ingr < 0)
                        return false;
                    else
                        isEnought = true;
                }
            }
        }

        return isEnought;
    }

    // Returns summary price for beverages by given name
    getBevaregesPrice(bevarege: drinkName): string {
        let ingr = this._baristaMain.ingredienFactory.getBeveragesIngredient(bevarege);
        let values = this._baristaMain.dataManager.dataValues;
        let price = 0;
        for (let val in ingr) {
            for (let item of values) {
                if (item.name === val) {
                    price += Number(item.price.split('$').join('')) * ingr[val];
                }
            }
        }

        return `$${price.toFixed(2)}`;
    }
}