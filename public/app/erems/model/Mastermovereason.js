Ext.define('Erems.model.Mastermovereason', {
    extend: 'Ext.data.Model',
    alias: 'model.mastermovereasonmodel',
    idProperty: 'movereason_id',
    fields: [
        {
            name: 'movereason_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'movereason',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});