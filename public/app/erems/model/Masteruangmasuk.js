Ext.define('Erems.model.Masteruangmasuk', {
    extend: 'Ext.data.Model',
    alias: 'model.masteruangmasukmodel',
    idProperty: 'cashsources_id',
    fields: [
        {
            name: 'cashsources_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'cashsources',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});