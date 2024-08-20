Ext.define('Cashier.model.Cashfloweditor', {
    extend: 'Ext.data.Model',
    alias: 'model.cashfloweditormodel',
    idProperty: 'journaldetail_id',
    fields: [
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'journaldetail_id', type: 'int'},
        {name: 'jid', type: 'string'},
        {name: 'voucher_date', type: 'date'},
        {name: 'voucher_no', type: 'string'},
        {name: 'coa', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'kelsub_id', type: 'int'},
        {name: 'amount', type: 'money'},
        {name: 'hideparam', type: 'string'},
        {name: 'setupcashflow_id', type: 'int'},
        {name: 'cashflowtype_id', type: 'int'},
        {name: 'cashflowtype', type: 'string'},
    ]
});