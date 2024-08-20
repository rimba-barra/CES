Ext.define('Cashier.model.Paymentvia', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentviamodel',
    idProperty: 'payment_via_id',
    fields: [
        {name: 'payment_via_id', type: 'int'},
        {name: 'payment_via_name', type: 'string'},
        {name: 'payment_via_desc', type: 'string'},
       
    ]
});