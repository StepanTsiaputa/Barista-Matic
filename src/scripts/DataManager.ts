class DataManager {

    private _dataValues;

    get dataValues() {
        return this._dataValues;
    }

    constructor(data) {
        this._dataValues = data
    }

    /*Returns data in the form required for the dataTable library
     [
        {
        "name":  "Coffee",
        "price": "$0.75",
        "count": "5"
        },
        .......
    ] */
    convertToDataForTable() {
        let arrData = [];

        for (let item of this._dataValues) {
            let itemArr = [];
            for (let key in item) {
                itemArr.push(item[key])
            }

            arrData.push(itemArr);
        }

        return arrData;
    }

    //Sets values to inventory data series
    setValue(name: drinkName, count: number | string) {
        let values = this._dataValues;
        for (let item of values) {
            if (item.name === name)
                item.count = count;
        }
    }
}