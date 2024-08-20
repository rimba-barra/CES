Ext.define('Erems.model.Utilitydetail', {
    extend: 'Ext.data.Model',
    alias: 'model.utilitydetailmodel',
    idProperty: 'utility_id',
    fields: [
		{name: 'is_detail', type: 'string'},
		{name: 'utility_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'utilitytype_id', type: 'int'},
		{name: 'utilitytype', type: 'string'},
		{name: 'utilitystatus_id', type: 'int'},
		{name: 'utilitystatus', type: 'string'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'power', type: 'decimal'},
		{name: 'request_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'installment_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'followup_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'installment_no', type: 'string'},
		{name: 'meter_no', type: 'string'},
		{name: 'note', type: 'string'},
		{name: 'temp_utility_id', type: 'string'}
    ]
});