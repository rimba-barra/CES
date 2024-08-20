Ext.define('Erems.model.Purchaseletternewschedulegrid', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletternewschedulegridmodel',
    idProperty: 'schedule_id',
    fields: [
        {name: 'schedule_id', type: 'int'},
        {name: 'duedate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'scheduletype_scheduletype_id', type: 'int'},
        {name: 'scheduletype_scheduletype', type: 'string'},
        {name: 'termin', type: 'desimal'},
        {name: 'remaining_balance', type: 'desimal'},
        {name: 'sourcemoney_sourcemoney_id', type: 'int'},
        {name: 'sourcemoney_sourcemoney', type: 'string'},
        {name: 'amount', type: 'desimal'},
        {name: 'persentase_npv', type: 'desimal'}
    ]
});