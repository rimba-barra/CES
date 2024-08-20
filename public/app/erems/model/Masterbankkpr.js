Ext.define('Erems.model.Masterbankkpr', {
    extend: 'Ext.data.Model',
    alias: 'model.masterbankkprmodel',

    idProperty: 'bankkpr_id',

    fields: [
        {
            name: 'bankkpr_id',
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
            name: 'tahap1_name',
            type: 'string'
        },
		{
            name: 'tahap2_name',
            type: 'string'
        },
		{
            name: 'tahap3_name',
            type: 'string'
        },
		{
            name: 'tahap4_name',
            type: 'string'
        },
		{
            name: 'tahap5_name',
            type: 'string'
        },
		{
            name: 'tahap6_name',
            type: 'string'
        },
		{
            name: 'tahap7_name',
            type: 'string'
        },
		{
            name: 'tahap8_name',
            type: 'string'
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
        },
        {
            name: 'initial_bank',
            type: 'string'
        },
        {
            name: 'alamat_bank',
            type: 'string'
        },
        {
            name: 'pic_bank',
            type: 'string'
        },
        {
            name: 'nama_pt_bank',
            type: 'string'
        },
        {
            name: 'atas_nama_bank_project',
            type: 'string'
        },
        {
            name: 'nomor_rekening_project',
            type: 'string'
        },
        {
            name: 'jabatan',
            type: 'string'
        },
        {
            name: 'pic_collection',
            type: 'string'
        },
        {
            name: 'pic_collection_phone',
            type: 'string'
        },
    ]
});