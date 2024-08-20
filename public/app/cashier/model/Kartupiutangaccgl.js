Ext.define('Cashier.model.Kartupiutangaccgl', {
    extend: 'Ext.data.Model',
    alias: 'model.kartupiutangaccglmodel',
    idProperty: 'rn',
    fields: [
        {name: 'journal_id', type: 'int'},
        {name: 'journaldetail_id', type: 'int'},
        {name: 'journalsubdetail_id', type: 'int'},
        {name: 'subgl_id', type: 'int'},
        {name: 'voucher_date', type: 'string'},
        {name: 'voucher_no', type: 'string'},
        {name: 'coa', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'kelsub_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'pengali', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'indexsubdata', type: 'int'},
    ]
});