Ext.define('Erems.model.Writeoffdendadetail', {
    extend: 'Ext.data.Model',
    alias: 'model.writeoffdendadetailmodel',
    idProperty: 'writeoffdetail_id',
    fields: [
		{name: 'writeoffdetail_id', type: 'int'},
		{name: 'writeoff_id', type: 'int'},
		{name: 'schedule_id', type: 'int'},
		{name: 'denda', type: 'decimal'},
		{name: 'writeoff', type: 'decimal'},
		{name: 'after_writeoff', type: 'decimal'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'description', type: 'string'},
		{name: 'scheduletype', type: 'string'},
		{name: 'remaining_balance', type: 'decimal'},
		{name: 'remaining_denda', type: 'decimal'},
		{name: 'deleted', type: 'boolean'}
    ]
});