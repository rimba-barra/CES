Ext.define('Masterdata.model.Sistemdocumentnumbering', {
    extend: 'Ext.data.Model',
    alias: 'model.SistemdocumentnumberingModel',

    idProperty: 'sistemdocumentnumber_id',

    fields: [
        {
            name: 'sistemdocumentnumber_id',
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