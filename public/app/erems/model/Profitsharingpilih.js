Ext.define('Erems.model.Profitsharingpilih', {
	extend: 'Ext.data.Model',
	alias: 'model.profitsharingpilihmodel',

	idProperty: 'purchaseletter_id',

	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'harga_total_jual', type: 'int'},
		{name: 'akad_realisasiondate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'cluster_code', type: 'string'},
		{name: 'unit_id', type: 'int'},
		{name: 'unit_number', type: 'string'},
		{name: 'progress', type: 'int'},
		{name: 'customer_name', type: 'string'},
		{name: 'pricetype', type: 'string'},
		{name: 'is_nonppn', type: 'boolean'},
		{name: 'total_payment', type: 'int'},
		{name: 'sppjb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ppjb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'set_rs', type: 'int'},
		{name: 'profitsharing_id', type: 'int'},
		{name: 'profitsharing_code', type: 'string'},
		{name: 'profitsharing_name', type: 'string'},
	]
});