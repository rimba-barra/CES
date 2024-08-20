Ext.define('Erems.model.CancellationSchedule', {
    extend: 'Ext.data.Model',
    alias: 'model.cancellationschedulemodel',
    idProperty: 'schedule_id',
    fields: [
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'schedule_id', type: 'int'},
		{name: 'duedate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'scheduletype_id', type: 'int'},
        {name: 'scheduletype', type: 'string'},
        {name: 'termin', type: 'decimal'},
        {name: 'remaining_balance', type: 'decimal'},
        {name: 'sourcemoney_sourcemoney_id', type: 'int'},
        {name: 'sourcemoney_sourcemoney', type: 'string'},
        {name: 'amount', type: 'decimal'},
        {name: 'persentase_npv', type: 'decimal'}
    ]
});