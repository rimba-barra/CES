Ext.define('Erems.model.Masterpekerjaankonsumen', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterpekerjaankonsumenModel',

    idProperty: 'pekerjaankonsumen_id',

    fields: [
        {
            name: 'pekerjaankonsumen_id',
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