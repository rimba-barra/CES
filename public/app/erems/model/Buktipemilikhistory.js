Ext.define('Erems.model.Buktipemilikhistory', {
	extend: 'Ext.data.Model',
	alias: 'model.buktipemilikhistorymodel',
	idProperty: 'buktipemilikhistory_id',
	fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'customer_id', type: 'int'},
		{name: 'customer_name', type: 'string'},
		{name: 'tanggal_akta_subrogasi', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'is_holdlegal', type: 'int'},
		{name: 'notes_holdlegal', type: 'string'},
		{name: 'notaris_id', type: 'int'},
		{name: 'no_akta_subrogasi', type: 'string'},
		{name: 'is_unit_dikosongkan', type: 'int'},
		{name: 'notaris', type: 'string'},
	]
});