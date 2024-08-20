Ext.define('Cashier.model.Block', {
    extend: 'Ext.data.Model',
    alias : 'model.blockmodel',

    idProperty: 'block_id',

    fields: [
        {
            name: 'block_id',
            type: 'int'
        },
        {
            name: 'block',
            type: 'string'
        },
        {
            name: 'cluster',
            type: 'string'
        },
        {
            name: 'user_name',
            type: 'string'
        },
        {
            name: 'modi_user_name',
            type: 'string'
        }
    ]
});