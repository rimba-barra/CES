Ext.define('Erems.model.Writeoffdendascheduledetail', {
    extend: 'Ext.data.Model',
    alias: 'model.writeoffdendascheduledetailmodel',
    idProperty: 'schedule_id',
    fields: [
		{name: 'schedule_id', type: 'int'},
		{name: 'description', type: 'string'},
		{name: 'duedate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'scheduletype', type: 'string'},
		{name: 'queue', type: 'int'},
		{name: 'denda', type: 'decimal'},
		{name: 'remaining_denda', type: 'decimal'},
		{name: 'remaining_balance', type: 'decimal'}
    ]
});