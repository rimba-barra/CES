Ext.define('Erems.model.Netpresentvaluedetailstandard', {
	extend     : 'Ext.data.Model',
	alias      : 'model.netpresentvaluedetailstandard',
	idProperty : 'standard_npv_detail_standard_id',
	fields     : [
		{name: 'npv_detail_standard_id', type: 'int'},
		{name: 'npv_id', type: 'int'},
		{name: 'record_no', type: 'int'},
		{name: 'duedate', type: 'date'},
		{name: 'scheduletype_id', type: 'int'},
		{name: 'scheduletype', type: 'string'},
		{name: 'termin', type: 'int'},
		{name: 'amount', type: 'decimal'},
		{name: 'remaining_balance', type: 'decimal'},
		{name: 'npv_value', type: 'decimal'},
		{name: 'deleted', type: 'boolean'},
	]
});