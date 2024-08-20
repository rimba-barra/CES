Ext.define('Erems.model.Masterpencairankomisi', {
	extend: 'Ext.data.Model',
	alias: 'model.masterpencairankomisimodel',

	idProperty: 'komisi_pencairan_id',

	fields: [
		{name: 'komisi_pencairan_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'komisi_distributionchannel_id', type: 'int'},
		{name: 'judul_komisi', type: 'string'},
		{name: 'code_judul_komisi', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'distributionchannel', type: 'string'},
		{name: 'jumlah_komisi', type: 'int'},
		{name: 'jumlah_persen', type: 'decimal'},
		{name: 'jumlah_nominal', type: 'int'},
		{name: 'reff_id', type: 'int'},
		{name: 'reff_name', type: 'string'},
	]
});