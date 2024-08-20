Ext.define('Cashier.model.Masteroffbalancesheet', {
    extend: 'Ext.data.Model',
    alias: 'model.masteroffbalancesheet',
    idProperty: 'off_balancesheet_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'off_balancesheet_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'banktype_id', type: 'int'},
        {name: 'bank_type_id', type: 'int'},
        {name: 'banktype', type: 'string'},
        {name: 'bank_acc_no', type: 'string'},
        {name: 'bank_name', type: 'string'},
        {name: 'projectpt_name', type: 'string'},
        {name: 'debit', type: 'string'},
        {name: 'credit', type: 'string'},
        {name: 'closing_balance', type: 'string'},
        {name: 'opening_balance', type: 'string'},
        {name: 'banktype', type: 'string'},
        {name: 'date_from', type: 'date', format: 'd M Y'},
        {name: 'date_until', type: 'date', format: 'd M Y'},
    ]
});