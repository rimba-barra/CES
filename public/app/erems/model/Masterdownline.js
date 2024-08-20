Ext.define('Erems.model.Masterdownline', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterdownlineModel',

    idProperty: 'downline_id',

    fields: [
        {
            name: 'downline_id',
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
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'phone',
            type: 'string'
        },
        {
            name: 'rekening',
            type: 'string'
        },
        {
            name: 'registration_date',
            type: 'date'
        },
        {
            name: 'is_broker',
            type: 'boolean'
        },
    ]
});