Ext.define('Masterdata.model.Projectbyuser', {
    extend: 'Ext.data.Model',
    alias: 'model.ProjectbyuserModel',

    idProperty: 'project_id',

    fields: [
        {
            name: 'apps_id',
            type: 'int'
        },    
        {
            name: 'project_id',
            type: 'int'
        },       
        {
            name: 'project_name',
            type: 'string'
        },
		{
            name: 'active',
            type: 'boolean'
        }         
    ]
});


