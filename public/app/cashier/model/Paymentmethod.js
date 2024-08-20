Ext.define('Cashier.model.Paymentmethod', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentmethodmodel',
    idProperty: 'paymentmethod_id',
    fields: [
        {name: 'paymentmethod_id', type: 'int'},
        {name: 'paymentmethod', type: 'string'}
       
    ]
});