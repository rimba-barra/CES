Ext.define('Cashier.model.Vendorbank', {
    extend: 'Ext.data.Model',
    alias: 'model.vendorbankmodel',
    idProperty: 'vendor_bankacc_id',
    fields: [
        {name: 'vendor_id', type: 'int'},     
        {name: 'vendor_bankacc_id', type: 'int'},     
        {name: 'seq_no', type: 'int'},     
        {name: 'bank_id', type: 'int'},
        {name: 'bank_name', type: 'string'},
        {name: 'bank_account_name', type: 'string'},
        {name: 'bank_account_no', type: 'string'},
        {name: 'currency', type: 'string'},
        {name: 'currency_name', type: 'string'},
        {name: 'currency_word', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'statedata', type: 'string'},
    ]
});