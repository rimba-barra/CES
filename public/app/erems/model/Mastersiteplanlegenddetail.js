Ext.define('Erems.model.Mastersiteplanlegenddetail', {
	extend: 'Ext.data.Model',
	alias: 'model.mastersiteplanlegenddetail',

	idProperty: 'siteplanlegenddetail_id',

	fields: [
		{name: 'siteplanlegenddetail_id', type: 'int'},
		{name: 'siteplanlegend_id', type: 'int'},
		{name: 'siteplanparameter_id', type: 'int'},
		{name: 'index', type: 'string'},
		{name: 'display', type: 'string'},
		{name: 'display_rule', type: 'string'},
		{name: 'operator', type: 'string'},
		{name: 'relational_table', type: 'string'},
		{name: 'relational_field_id', type: 'string'},
		{name: 'relational_field_value', type: 'string'},
		{name: 'value', type: 'string'},
		{name: 'value_display', type: 'string'},
		{name: 'deleted', type: 'int'},
		{name: 'relational_id', type: 'int'},
		{name: 'relational_value', type: 'string'},
	]
});