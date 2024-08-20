Ext.define('Erems.model.Masteralasanbatal', {
    extend: 'Ext.data.Model',
    alias: 'model.masteralasanbatalmodel',
    idProperty: 'cancelreason_id',
    fields: [
        {
            name: 'cancelreason_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'cancelreason',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});