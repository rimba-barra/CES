Ext.define('Erems.model.Mastersiteplanlegend', {
	extend: 'Ext.data.Model',
	alias: 'model.mastersiteplanlegendmodel',

	idProperty: 'siteplan_legend_id',

	fields: [
		{name: 'siteplanlegend_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'prefixcode_svg', type: 'string'},
		{name: 'legendid_svg', type: 'string'},
		{name: 'color', type: 'string'},
		{name: 'file_svg', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'list_rules', type: 'string'},
	]
});