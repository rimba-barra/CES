Ext.define('Erems.model.Masterperhitungankomisidetail', {
	extend: 'Ext.data.Model',
	alias: 'model.masterperhitungankomisidetail',

	idProperty: 'komisi_perhitungan_detail_id',

	fields: [
		{name: 'komisi_perhitungan_detail_id', type: 'int'},
		{name: 'komisi_perhitungan_id', type: 'int'},
		{name: 'deleted', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'pricetype_id', type: 'int'},
		{name: 'pricetype_display', type: 'string'},
		{name: 'collection_name', type: 'string'},
		{name: 'persen_uangmasuk_coll', type: 'decimal'},
		{name: 'persen_pencairan_komisi', type: 'decimal'},
		{name: 'is_uangmuka', type: 'int'},
		{name: 'is_sppjb', type: 'int'},
		{name: 'is_akad', type: 'int'},
	]
});