Ext.define('Erems.model.Revenuesharingprint', {
	extend: 'Ext.data.Model',
	alias: 'model.revenuesharingprintmodel',

	idProperty: 'purchaseletter_id',

	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'process_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'harga_total_jual', type: 'int'},
		{name: 'harga_netto', type: 'int'},
		{name: 'payment', type: 'int'},
		{name: 'rs_total_partner_dpp', type: 'int'},
		{name: 'rs_total_partner_ppn', type: 'int'},
		{name: 'rs_total_partner_pph', type: 'int'},
		{name: 'rs_total_ciputra_dpp', type: 'int'},
		{name: 'rs_total_ciputra_ppn', type: 'int'},
		{name: 'rs_total_ciputra_pph', type: 'int'},
		{name: 'cluster_code', type: 'string'},
		{name: 'unit_id', type: 'int'},
		{name: 'unit_number', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'type_name', type: 'string'},
		{name: 'land_size', type: 'decimal'},
		{name: 'building_size', type: 'decimal'},
	]
});