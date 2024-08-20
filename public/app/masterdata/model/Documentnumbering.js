Ext.define('Masterdata.model.Documentnumbering', {
    extend: 'Ext.data.Model',
    alias: 'model.DocumentnumberingModel',

    idProperty: 'documentnumber_id',

    fields: [
        {
            name: 'documentnumber_id',
            type: 'int'
        },
        {
            name: 'apps_id',
            type: 'int'
        },
        {
            name: 'module_name',
            type: 'string'
        },
        {
            name: 'reset_type',
            type: 'string'
        },
        {
            name: 'format',
            type: 'string'
        }, 
        {
            name: 'year',
            type: 'int'
        },    
        {
            name: 'month',
            type: 'int'
        },      
        {
            name: 'day',
            type: 'int'
        },    
        {
            name: 'counter',
            type: 'int'
        },      
        /*{
            name: 'is_default',
            type: 'int'
        },*/
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
            name: 'application_name',
            type: 'string'
        },
        {
            name: 'project_name',
            type: 'string'
        },
        {
            name: 'pt_name',
            type: 'string'
        },        
    ]
});