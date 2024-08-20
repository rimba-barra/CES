Ext.define('Masterdata.model.Appsbyuser', {
    extend: 'Ext.data.Model',
    alias: 'model.AppsbyuserModel',

    idProperty: 'apps_id',

    fields: [
        {
            name: 'apps_id',
            type: 'int'
        },          
        {
            name: 'apps_name',
            type: 'string'
        },
        {
            name: 'apps_basename',
            type: 'string'
        },
		{
            name: 'active',
            type: 'boolean'
        }       
    ]
});


