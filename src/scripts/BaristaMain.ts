const container = '.baristaMaineContainer';
const url = "data/data.json";

enum drinkName {
    coffee         = "Coffee",
    decafCoffee    = "Decaf Coffee",
    caffeLatte     = "Caffe Latte",
    caffeAmericano = "Caffe Americano",
    caffeMocha     = "Caffe Mocha",
    cappuccino     = "Cappuccino"
}
Object.freeze(drinkName);

enum ingredients {
    cofee       = "Coffee",
    espresso    = "Espresso",
    decafCoffee = "Decaf Coffee",
    sugar       = "Sugar",
    cream       = "Cream",
    steamedMilk = "Steamed Milk",
    cocoa       = "Cocoa",
    foamedMilk  = "Foamed Milk"
}
Object.freeze(ingredients);

class BaristaMain{
    private _data: any;
    private _inventory: Inventory;
    private _ingredienFactory: BeveragesIngredientFactory;

    get ingredienFactory() : BeveragesIngredientFactory {
        return this._ingredienFactory;
    }

    private _dataManager: DataManager;

    get dataManager(): DataManager {
        return this._dataManager;
    }

    private _inventoryView: InventoryView;

    get inventoryView(): InventoryView {
        return this._inventoryView;
    }

    constructor() {
        this._getData();
    }

    private _getData() {
        $.ajax({
            url,
            success: data => {
                this._data = data;
                this._init();
            }
        });
    }

    private _init() {
        this._dataManager = new DataManager(this._data);
        this._inventory = new Inventory(this);
        this._inventoryView = new InventoryView(this);
        this._ingredienFactory = new BeveragesIngredientFactory();
        this._subscribe();
    }

    private _subscribe() {
        let containerElements = $(container).children();
        let self = this;

        for (let elem of containerElements) {
            $(elem).click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.makeDrink($(this));
                self.inventoryView.updateTable();
                self.updateBaveragesView();
            });

            let name = <drinkName>$(elem).attr('data-id');

            $(elem).find('.beveragePrice').text(this._inventory.getBevaregesPrice(name));
        }
    }

    // Gets all ingredients for beverages and check if enough
    private makeDrink(target: JQuery<HTMLElement>) {
        let name = target.attr('data-id');
        switch (name) {
            case drinkName.coffee:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            case drinkName.decafCoffee:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            case drinkName.caffeLatte:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            case drinkName.caffeAmericano:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            case drinkName.caffeMocha:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            case drinkName.cappuccino:
                this._inventory.getAllIng(this._ingredienFactory.getBeveragesIngredient(name)).catch(() => {
                    alert('Not enough ingredients for beverage');
                });
                break;
            default:
                Error('No match');
        }
    }

    // Method update button view
    updateBaveragesView() {
        let containerElements = $(container).children();

        for (let elem of containerElements) {
            let beverages = $(elem).attr('data-id'),
                enaught = this._inventory.checkIfEnought(this._ingredienFactory.getBeveragesIngredient(<drinkName>beverages));

            if (enaught)
                this._enableBtn($(elem));
            else
                this._disableBtn($(elem));
        }
    }

    // Adds class 'disable' for button when not enough ingredients
    private _disableBtn(btn: JQuery<HTMLElement>) {
        btn.addClass('disable');
    }

    // Removes class 'disable' for button when enough ingredients
    private _enableBtn(btn: JQuery<HTMLElement>) {
        btn.removeClass('disable');
    }

}