Ext.define('Masterdata.model.Masterglobalbankkpr', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterglobalbankkprModel',

    idProperty: 'bankkpr_id',

    fields: [
        {
            name: 'bankkpr_id',
            type: 'int'
        },
		{
            name: 'bank_id',
            type: 'int'
        },
		{
            name: 'bank_name',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
		{
            name: 'tahap1_id',
            type: 'int'
        },
		{
            name: 'tahap2_id',
            type: 'int'
        },
		{
            name: 'tahap3_id',
            type: 'int'
        },
		{
            name: 'tahap4_id',
            type: 'int'
        },
		{
            name: 'tahap5_id',
            type: 'int'
        },
		{
            name: 'tahap6_id',
            type: 'int'
        },
		{
            name: 'tahap7_id',
            type: 'int'
        },
		{
            name: 'tahap8_id',
            type: 'int'
        },
		{
			name: 'tahap1_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap2_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap3_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap4_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap5_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap6_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap7_persen', 
			type: 'decimal'
		},
		{
			name: 'tahap8_persen', 
			type: 'decimal'
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