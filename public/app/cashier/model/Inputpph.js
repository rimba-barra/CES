Ext.define('Cashier.model.Inputpph', {
    extend: 'Ext.data.Model',
    alias: 'model.inputpphmodel',
    idProperty: 'journalsubdetail_id',
    fields: [
        {name: 'journalsubdetail_pph_id', type: 'int'},
        {name: 'journalsubdetail_id', type: 'int'},
        {name: 'flag_pph', type: 'int'},
        {name: 'document_date', type: 'date', format: 'Y-m-d'},
        {name: 'document_no', type: 'string'},
        {name: 'receive_date', type: 'date', format: 'Y-m-d'},
        {name: 'voucher_no', type: 'string'},
        {name: 'voucher_date', type: 'date', format: 'Y-m-d'},
        {name: 'coa', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'keterangan', type: 'string'},
    ]
});