Ext.define('Erems.model.Masterperhitungankomisi', {
	extend: 'Ext.data.Model',
	alias: 'model.masterperhitungankomisimodel',

	idProperty: 'komisi_perhitungan_id',

	fields: [
		{name: 'komisi_perhitungan_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'pricetype_id', type: 'int'},
		{name: 'judul', type: 'string'},
		{name: 'description', type: 'string'},
	]
});