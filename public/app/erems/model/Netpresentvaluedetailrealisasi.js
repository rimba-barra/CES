Ext.define('Erems.model.Netpresentvaluedetailrealisasi', {
	extend     : 'Ext.data.Model',
	alias      : 'model.netpresentvaluedetailrealisasi',
	idProperty : 'realisasi_npv_detail_realisasi_id',
	fields     : [
		{name: 'npv_detail_realisasi_id', type: 'int'},
		{name: 'npv_id', type: 'int'},
		{name: 'record_no', type: 'int'},
		{name: 'duedate', type: 'date'},
		{name: 'scheduletype', type: 'string'},
		{name: 'scheduletype_id', type: 'int'},
		{name: 'termin', type: 'int'},
		{name: 'amount', type: 'decimal'},
		{name: 'npv_value', type: 'decimal'},
		{name: 'deleted', type: 'boolean'},
	]
});