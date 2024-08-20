Ext.define('Erems.model.Buktipemiliknjop', {
	extend: 'Ext.data.Model',
	alias: 'model.buktipemiliknjopmodel',
	idProperty: 'njop_id',
	fields: [
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'njop', type: 'float'},
		{name: 'tahun', type: 'string'},
		{name: 'addby_name', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'modiby_name', type: 'string'},
		{name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
	]
});