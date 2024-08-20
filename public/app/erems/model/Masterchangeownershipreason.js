Ext.define('Erems.model.Masterchangeownershipreason', {
    extend: 'Ext.data.Model',
    alias: 'model.masterchangeownershipreasonkmodel',

    idProperty: 'changeownershipreason_id',

    fields: [
        {
            name: 'changeownershipreason_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
		{
            name: 'changeownershipreason',
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
        }
    ]
});