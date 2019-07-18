class InventoryView {
    private _table: any;
    private _baristaMain: BaristaMain;

    constructor(barista: BaristaMain) {
        this._baristaMain = barista;

        this._init();
        this.initTableView();
        this._editValue();
    }

    initTableView() {
        this._table.DataTable( {
            data: this._getData(),
            paging: false,
            ordering: false,
            info: false,
            searching: false,
            buttons: [
                'selectCells'
            ],
            columnDefs: [{
                className: 'dt-center', 'targets': '_all'
            }]
        });
    }

    // Update table when are changes in ingredients
    updateTable() {
        let dataTable = this._table.DataTable();

        dataTable.clear().rows.add(this._getData()).draw();
    }

    private _editValue() {
        let dataTable = this._table.DataTable(),
            self = this;

        this._table.on( 'click', 'td', function () {
            let cell = dataTable.cell( this );
            if (cell[0][0].column !== 2)
                return;

            let count = prompt("Please insert count");

            if (count !== null  && count !== '') {
                if (!isNaN(+count)) {
                    let ingradientName = dataTable.row(cell.index().row).data()[0];

                    cell.data(count).draw();
                    self._baristaMain.dataManager.setValue(<drinkName>ingradientName, count);
                    self._baristaMain.updateBaveragesView();
                }
            }

        });
    }

    private _init() {
        this._table = $('#inventoryTable');
    }

    private _getData() {
        return this._baristaMain.dataManager.convertToDataForTable();
    }
}