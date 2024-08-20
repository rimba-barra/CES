Ext.define('Erems.model.Masterpencairankomisidetail', {
	extend: 'Ext.data.Model',
	alias: 'model.masterpencairankomisidetail',

	idProperty: 'komisi_pencairan_detail_id',

	fields: [
		{name: 'komisi_pencairan_detail_id', type: 'int'},
		{name: 'komisi_pencairan_id', type: 'int'},
		{name: 'komisi_penerima_id', type: 'int'},
		{name: 'deleted', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'komisi_value', type: 'decimal'},
		{name: 'komisi_persen_nominal', type: 'string'},
		{name: 'populated_data', type: 'string'},
		{name: 'reff_id', type: 'int'},
		{name: 'salesman_id', type: 'int'},
		{name: 'reff_name', type: 'string'},
		{name: 'npwp', type: 'string'},
		{name: 'keterangan', type: 'string'},
		{name: 'penerima_komisi', type: 'string'},
		{name: 'distributionchannel', type: 'string'},
	]
});