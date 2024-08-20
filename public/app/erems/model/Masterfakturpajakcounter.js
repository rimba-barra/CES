Ext.define('Erems.model.Masterfakturpajakcounter', {
    extend: 'Ext.data.Model',
    alias: 'model.masterfakturpajakcountermodel',

    idProperty: 'fakturpajak_counter_id',

    fields: [
        {
            name: 'fakturpajak_counter_id',
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
            name: 'year',
            type: 'int'
        },
		{
            name: 'counter',
            type: 'int'
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