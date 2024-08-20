Ext.define('Cashier.model.Unitnumber', {
    extend: 'Ext.data.Model',
    alias: 'model.unitnumbermodel',
    idProperty: 'unit_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'rencana_serahterima_date', type: 'string'},
        {name: 'unit_id', type: 'int'},
        {name: 'unit_number', type: 'string'},
        {name: 'cluster', type: 'string'},
    ]
});