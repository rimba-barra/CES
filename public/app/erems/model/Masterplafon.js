Ext.define('Erems.model.Masterplafon', {
    extend: 'Ext.data.Model',
    alias: 'model.masterplafonmodel',

    idProperty: 'plafon_id',

    fields: [
        {
            name: 'plafon_id',
            type: 'int'
        },
		{
            name: 'plafon',
            type: 'string'
        },
		{
			name: 'persen_desc', 
			type: 'decimal'
		},
		{
			name: 'is_default', 
			type: 'boolean'
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