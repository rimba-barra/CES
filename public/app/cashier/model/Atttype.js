Ext.define('Cashier.model.Atttype', {
    extend: 'Ext.data.Model',
    alias: 'model.atttypemodel',

    idProperty: 'atttype_id',

    fields: [
        {
            name: 'atttype_id',
            type: 'int'
        },
        {
            name: 'atttype',
            type: 'string'
        }
    ]
});