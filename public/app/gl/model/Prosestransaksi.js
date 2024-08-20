Ext.define('Gl.model.Prosestransaksi', {
    extend: 'Ext.data.Model',
    alias: 'model.prosestransaksimodel',
    idProperty: 'month_id',
    fields: [
        {name: 'fromdate', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'untildate', type: 'date',dateFormat: 'Y-m-d'},
    ]
});