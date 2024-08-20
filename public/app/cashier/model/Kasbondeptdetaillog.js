Ext.define('Cashier.model.Kasbondeptdetaillog', {
    extend: 'Ext.data.Model',
    alias: 'model.kasbondeptdetaillogmodel',
    idProperty: 'kasbondeptdetail_id',
    fields: [
        {name: 'kasbondept_id', type: 'int'},
        {name: 'voucher_no', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'module', type: 'string'},
        {name: 'transaction_date', type: 'datetime',dateFormat: 'Y-m-d h:i:s'},
        {name: 'eff_date', type: 'datetime',dateFormat: 'Y-m-d h:i:s'},
        {name: 'user_fullname', type: 'string'},
        {name: 'action', type: 'string'},
        {name: 'notes', type: 'string'},
    ]
});