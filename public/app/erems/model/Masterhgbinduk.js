Ext.define('Erems.model.Masterhgbinduk', {
    extend: 'Ext.data.Model',
    alias: 'model.masterhgbindukmodel',

    idProperty: 'hgbinduk_id',

    fields: [
        {
            name: 'hgbinduk_id',
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
            name: 'hgbinduk',
            type: 'string'
        },
		{
            name: 'kecamatan_id',
            type: 'int'
        },
		{
            name: 'desa',
            type: 'string'
        },
		{
			name: 'date', 
			type: 'date', 
			dateFormat: 'Y-m-d H:i:s.u'
		},
		{
            name: 'gs',
            type: 'string'
        },
		{
			name: 'gs_date', 
			type: 'date', 
			dateFormat: 'Y-m-d H:i:s.u'
		},
		{
			name: 'luas', 
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
        },
        {
            name:'nop_induk',
            type:'string'
        },
		{name: 'jatuhtempo_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'luas_sisa', type: 'decimal'},
		{name: 'akta_no', type: 'string'},
		{name: 'nib_no', type: 'string'},
		{name: 'project_id_owner',type: 'int'},
		{name: 'pt_id_owner', type: 'int'},
		{name: 'kelurahan', type: 'string'},
		{name: 'kecamatan', type: 'string'},
		{name: 'kabupaten', type: 'string'},
		{name: 'keterangan_1', type: 'string'},
		{name: 'keterangan_2', type: 'string'},
		{name: 'is_hpl', type: 'boolean'}
    ]
});