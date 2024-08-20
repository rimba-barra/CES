Ext.define('Cashier.model.Table', {
    extend: 'Ext.data.Model',
    alias: 'model.tablemodel',
    idProperty: 'TABLE_NAME',
    fields: [    
        {name: 'TABLE_NAME', type: 'string'},
    ]
});