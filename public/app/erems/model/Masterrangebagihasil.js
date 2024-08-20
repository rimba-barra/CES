Ext.define('Erems.model.Masterrangebagihasil', {
	extend: 'Ext.data.Model',
	alias: 'model.masterrangebagihasilmodel',

	idProperty: 'rangebagihasil_id',

	fields: [
		{name: 'rangebagihasil_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'name', type: 'string'},
		{name: 'komisi_marketing', type: 'decimal'},
		{name: 'pph', type: 'decimal'},
		{name: 'is_progresif', type: 'int'},
	]
});