Ext.define('Erems.model.Masterupline', {
    extend: 'Ext.data.Model',
    alias: 'model.MasteruplineModel',

    idProperty: 'upline_id',

    fields: [
        {
            name: 'upline_id',
            type: 'int'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        }
    ]
});