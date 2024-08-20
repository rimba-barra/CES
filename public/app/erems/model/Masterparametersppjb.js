Ext.define('Erems.model.Masterparametersppjb', {
    extend: 'Ext.data.Model',
    alias: 'model.masterparametersppjbmodel',

    idProperty: 'parametersppjb_id',

    fields: [
        {
            name: 'parametersppjb_id',
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
            name: 'name_01',
            type: 'string'
        },
		{
            name: 'position_01',
            type: 'string'
        },
		{
            name: 'address_01',
            type: 'string'
        },
		{
            name: 'name_02',
            type: 'string'
        },
		{
            name: 'position_02',
            type: 'string'
        },
		{
            name: 'address_02',
            type: 'string'
        },
		{
            name: 'akta_no',
            type: 'string'
        },
		{
            name: 'akta_date',
            type: 'date',
			dateFormat: 'Y-m-d H:i:s.u'
        },
		{
            name: 'notaris',
            type: 'string'
        },
		{
            name: 'akta_no_2',
            type: 'string'
        },
		{
            name: 'akta_date_2',
            type: 'date',
			dateFormat: 'Y-m-d H:i:s.u'
        },
		{
            name: 'notaris_2',
            type: 'string'
        },
		{
            name: 'account_no',
            type: 'string'
        },
		{
            name: 'account_name',
            type: 'string'
        },
		{
            name: 'account_address',
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
        {name:'pt_aktano', type:'string'},
        {name:'pt_aktadate', type:'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name:'pt_notaris', type:'string'},
        {name:'notariskota', type:'string'},
        {name:'notaris2kota', type:'string'},
        {name:'pt_namapartner', type:'string'},
        {name:'pt_kotapartner', type:'string'},
        {name:'pt_notariskota', type:'string'},
        {name:'pt_name', type:'string'},
        {name:'pt_kota', type:'string'},
        {name:'pt2_aktadate', type:'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name:'pt2_aktano', type:'string'},
        {name:'pt_kecamatan', type:'string'},

        // added by rico 22022024
        {name:'phone', type:'string'},
        {name:'email', type:'string'},
        {name:'kelurahan', type:'string'},
        {name:'no_perjanjian_kso', type:'string'},
        {name:'tgl_perjanjian_kso', type:'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name:'notaris_perjanjian_kso', type:'string'},
        {name:'kotanotaris_perjanjian_kso', type:'string'},

        {name:'kso_name', type:'string'},
        {name:'objek_jualbeli_address', type:'string'},
        {name:'objek_jualbeli_kelurahan', type:'string'}
    ]
});