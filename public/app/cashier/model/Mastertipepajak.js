Ext.define('Cashier.model.Mastertipepajak', {
    extend: 'Ext.data.Model',
    alias: 'model.mastertipepajakmodel',
    idProperty: 'tipepajakdetail_id',
    fields: [
        {name: 'tipepajakdetail_id', type: 'int'},
        {name: 'tipepajakdetail', type: 'string'}
    ]
});