Ext.define('Erems.model.Tunggakanipl', {
	extend: 'Ext.data.Model',
	alias: 'model.tunggakaniplmodel',

	idProperty: 'purchaseletter_id',

	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'tunggakan_ipl', type: 'decimal'},
		{name: 'tunggakan_ipl_note', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
	]
});