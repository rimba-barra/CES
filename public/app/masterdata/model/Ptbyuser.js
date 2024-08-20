Ext.define('Masterdata.model.Ptbyuser', {
    extend: 'Ext.data.Model',
    alias: 'model.PtbyuserModel',

    idProperty: 'pt_id',

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
            name: 'pt_id',
            type: 'int'
        },        
        {
            name: 'pt_name',
            type: 'string'
        },
		{
            name: 'active',
            type: 'boolean'
        }         
    ]
});


