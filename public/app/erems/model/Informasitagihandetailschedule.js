Ext.define('Erems.model.Informasitagihandetailschedule', {
	extend     : 'Ext.data.Model',
	alias      : 'model.informasitagihandetailschedule',
	idProperty : 'tagihan_detail_schedule_id',
	fields     : [
		{name: 'tagihan_detail_schedule_id', type: 'int'},
		{name: 'tagihan_id', type: 'int'},
		{name: 'tagihan_detail_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'scheduletype_id', type: 'int'},
		{name: 'scheduletype', type: 'string'},
		{name: 'termin', type: 'int'},
		{name: 'duedate', type: 'date'},
		{name: 'amount', type: 'decimal'},
		{name: 'remaining_balance', type: 'decimal'},
		{name: 'denda', type: 'decimal'},
		{name: 'remaining_denda', type: 'decimal'},
		{name: 'deleted', type: 'boolean'},
	]
});