Ext.define('Erems.model.Masterpbbinduk', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpbbindukmodel',

    idProperty: 'pbbinduk_id',

    fields: [
        {
            name: 'pbbinduk_id',
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
            name: 'code',
            type: 'string'
        },
		{
            name: 'nopinduk',
            type: 'string'
        },
		{
            name: 'kecamatan_id',
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