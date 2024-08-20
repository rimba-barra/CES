Ext.define('Cashier.model.Kasbondeptdecvdept', {
    extend: 'Ext.data.Model',
    alias: 'model.kasbondeptdecvdeptmodel',
    idProperty: 'kasbondeptdetail_id',
    fields: [
        {name: 'kasbondept_id', type: 'int'},
        {name: 'voucher_id', type: 'int'},
        {name: 'amount', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'voucher_date', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'user_fullname', type: 'string'},
        {name: 'vid', type: 'string'},
        {name: 'voucher_no', type: 'string'},
        {name: 'cashier_voucher_no', type: 'string'},
        {name: 'status', type: 'string'},
    ]
});