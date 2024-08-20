Ext.define('Cashier.model.Dailytransactionkp', {
    extend: 'Ext.data.Model',
    alias: 'model.dailytransactionkpmodel',
    idProperty: 'kasbank_id',
    fields: [
        {name: 'kasbank_id', type: 'int'},
        {name: 'submit_date', type: 'date', dateformat: 'Y-m-d'},
        {name: 'voucher_id', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'status', type: 'string'}
    ]
});