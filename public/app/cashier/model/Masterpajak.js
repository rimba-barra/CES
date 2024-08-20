Ext.define('Cashier.model.Masterpajak', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpajakmodel',
    idProperty: 'tipepajak_id',
    fields: [
        {name: 'tipepajak_id', type: 'int'},
        {name: 'tipepajak', type: 'string'}
    ]
});