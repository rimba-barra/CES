Ext.define('Erems.model.Masteralasangantinama', {
    extend: 'Ext.data.Model',
    alias: 'model.masteralasangantinamamodel',
    idProperty: 'reasonchgname_id',
    fields: [
        {
            name: 'reasonchgname_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'reasonchgname',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});

