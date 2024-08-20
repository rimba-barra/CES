Ext.define('Erems.model.Masterrangebagihasildetail', {
	extend: 'Ext.data.Model',
	alias: 'model.masterrangebagihasildetail',

	idProperty: 'rangebagihasil_detail_id',

	fields: [
		{name: 'rangebagihasil_detail_id', type: 'int'},
		{name: 'rangebagihasil_id', type: 'int'},
		{name: 'hargatanah_permeter_start', type: 'int'},
		{name: 'hargatanah_permeter_end', type: 'int'},
		{name: 'komposisi_tanah_partner', type: 'decimal'},
		{name: 'komposisi_tanah_ciputra', type: 'decimal'},
		{name: 'komposisi_bangunan_partner', type: 'decimal'},
		{name: 'komposisi_bangunan_ciputra', type: 'decimal'},
		{name: 'deleted', type: 'int'},
	]
});