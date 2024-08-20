Ext.define('Erems.model.Masterpurposebuy', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpurposebuymodel',

    idProperty: 'purposebuy_id',
    
    fields: [
        {
            name: 'purposebuy_id',
            type: 'int'
        },
        {
            name: 'purposebuy',
            type: 'string'
        },
		{
            name: 'description',
            type: 'string'
        },
        {
            name: 'addby',
            type: 'string'
        },
		{
            name: 'Addon',
            type: 'string'
        },
		{
            name: 'Modion',
            type: 'string'
        },
        {
            name:'Modiby',
            type:'string'
        },
        {
            name: 'inactiveon',
            type: 'string'
        },
        {
            name:'inactiveby',
            type:'string'
        },
        {
            name: 'deleteon',
            type: 'string'
        },
        {
            name:'deleteby',
            type:'string'
        },
        {
            name: 'active',
            type: 'int'
        },
        {
            name: 'deleted',
            type: 'bit'
        }
    ]
});