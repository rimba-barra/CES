Ext.define('Masterdata.model.Project', {
    extend: 'Ext.data.Model',
    alias: 'model.ProjectModel',

    idProperty: 'project_id',

    fields: [
        {
            name: 'project_id',
            type: 'int'
        },
        {
            name: 'project_name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },        
		{
            name: 'active',
            type: 'boolean'
        }
    ]
});