Ext.define('Masterdata.model.Pt', {
    extend: 'Ext.data.Model',
    alias: 'model.PtModel',

    idProperty: 'project_id',

    fields: [
        {
            name: 'pt_id',
            type: 'int'
        },
        {
            name: 'pt_name',
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