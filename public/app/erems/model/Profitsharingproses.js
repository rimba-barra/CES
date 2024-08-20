Ext.define('Erems.model.Profitsharingproses', {
	extend: 'Ext.data.Model',
	alias: 'model.profitsharingprosesmodel',

	idProperty: 'purchaseletter_id',

	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'cluster_code', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_name', type: 'string'},
		{name: 'harga_netto', type: 'decimal'},
		{name: 'harga_total_jual', type: 'decimal'},
		{name: 'total_pengurang_rs', type: 'decimal'},
		{name: 'total_rs', type: 'decimal'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'luas_tanah_di_rs', type: 'decimal'},
		{name: 'rs_tanah_partner', type: 'decimal'},
		{name: 'rs_bangunan_partner', type: 'decimal'},
		{name: 'rs_tanah_ciputra', type: 'decimal'},
		{name: 'rs_bangunan_ciputra', type: 'decimal'},
		{name: 'doc_no', type: 'string'},
		{name: 'process_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
	]
});