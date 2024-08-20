Ext.define('Erems.model.Permintaankomisi', {
	extend: 'Ext.data.Model',
	alias: 'model.permintaankomisimodel',

	idProperty: 'komisi_permintaan_id',

	fields: [
		{name: 'komisi_permintaan_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'cluster_code', type: 'string'},
		{name: 'block_code', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'pricetype_id', type: 'int'},
		{name: 'pricetype', type: 'string'},
		{name: 'perhitungan_komisi', type: 'string'},
		{name: 'harga_netto', type: 'int'},
		{name: 'harga_netto_komisi', type: 'int'},
		{name: 'harga_total_jual', type: 'int'},
		{name: 'total_payment', type: 'int'},
		{name: 'total_komisi', type: 'int'},
		{name: 'persentase_pembayaran', type: 'decimal'},
		{name: 'flag_delete', type: 'int'},

		{name: 'addon', type: 'date'},
		{name: 'addby', type: 'string'},
	]
});