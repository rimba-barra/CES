Ext.define('Masterdata.model.Projectpt', {
    extend: 'Ext.data.Model',
    alias: 'model.ProjectptModel',

    idProperty: 'projectpt_id',

    fields: [
        {
            name: 'projectpt_id',
            type: 'int'
        },
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'pt_id',
            type: 'int'
        },
        {
            name: 'description',
            type: 'string'
        },
		{
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'project_name',
            type: 'string'
        },
		{
            name: 'pt_name',
            type: 'string'
        }
    ]
});