Ext.define('Cashier.model.Masterwhatsnew', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterwhatsnewModel',

    idProperty: 'whatsnew_id',

    fields: [
        {
            name: 'whatsnew_id',
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
            name: 'app_name',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'publish_start_date',
            type: 'date'
        },
        {
            name: 'publish_end_date',
            type: 'date'
        },
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'image',
            type: 'string'
        }
    ]
});