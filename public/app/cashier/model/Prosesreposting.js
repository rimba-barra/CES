Ext.define('Cashier.model.Prosesreposting', {
    extend: 'Ext.data.Model',
    alias: 'model.prosesrepostingmodel',
    idProperty: 'month_id',
    fields: [
        {name: 'fromdate', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'untildate', type: 'date',dateFormat: 'Y-m-d'},
    ]
});