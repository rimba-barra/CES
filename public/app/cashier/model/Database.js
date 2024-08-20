Ext.define('Cashier.model.Database', {
    extend: 'Ext.data.Model',
    alias: 'model.databasemodel',
    idProperty: 'name',
    fields: [
        {name: 'name', type: 'string'},    
    ]
});