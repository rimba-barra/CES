Ext.define('Erems.model.Admincollectioncashierschedule', {
    extend: 'Ext.data.Model',
    alias: 'model.admincollectionschedulemodel',
    idProperty: 'schedule_id',
    fields: [
		{name: 'schedule_id', type: 'int'},
		{name: 'scheduletype_id', type: 'int'},
		{name: 'scheduletype', type: 'string'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'description', type: 'string'},
		{name: 'termin', type: 'int'},
		{name: 'duedate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'amount', type: 'decimal'},
		{name: 'remaining_balance', type: 'decimal'},
		{name: 'total_denda', type: 'decimal'},
		{name: 'remaining_denda', type: 'decimal'}
    ]
});