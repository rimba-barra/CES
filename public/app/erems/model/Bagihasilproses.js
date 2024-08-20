Ext.define('Erems.model.Bagihasilproses', {
	extend: 'Ext.data.Model',
	alias: 'model.bagihasilprosesmodel',

	idProperty: 'purchaseletter_id',

	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'land_size', type: 'decimal'},
		{name: 'kelebihan', type: 'decimal'},
		{name: 'building_size', type: 'decimal'},
		{name: 'harga_netto', type: 'decimal'},
		{name: 'harga_total_jual', type: 'decimal'},
		{name: 'firstpurchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_name', type: 'string'},
		{name: 'pricetype', type: 'string'},
		{name: 'harga_total_jual', type: 'decimal'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'progress_pembayaran', type: 'decimal'},
		{name: 'akad_realisasiondate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'is_prosesbagihasil', type: 'int'},
		{name: 'kelompok_edit', type: 'string'},
		{name: 'progress_contruction', type: 'decimal'},
		{name: 'landrepayment_id', type: 'int'},
		{name: 'landrepayment_code', type: 'string'},

		{name: 'doc_no', type: 'string'},
		{name: 'proses_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'cogs', type: 'decimal'},
		{name: 'nlrp', type: 'decimal'},
		{name: 'lrp_payment', type: 'decimal'},
		{name: 'total_nlrp', type: 'decimal'},

		{name: 'bunga_lrp_amount', type: 'decimal'},
		{name: 'bunga_lrp_amount_paid', type: 'decimal'},
		{name: 'pt_id', type: 'int'}
	]
});