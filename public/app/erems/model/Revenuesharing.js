Ext.define('Erems.model.Revenuesharing', {
	extend: 'Ext.data.Model',
	alias: 'model.revenuesharingmodel',

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
		{name: 'rangebagihasil_id', type: 'int'},
		{name: 'rangebagihasil_code', type: 'string'},
		{name: 'rangebagihasil_name', type: 'string'},
		
		// added by rico 05122022
		{name: 'harga_netto', type: 'decimal'},
		{name: 'biaya_legalitas_netto', type: 'decimal'},
	]
});