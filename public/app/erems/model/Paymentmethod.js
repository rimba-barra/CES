Ext.define('Erems.model.Paymentmethod', {
    extend: 'Ext.data.Model',
    alias: 'model.paymentmethodmodel',
        
    idProperty: 'paymentmethod_id',

    fields: [
        {name: 'paymentmethod_id',type: 'int'},{name: 'code',type: 'string'},{name: 'paymentmethod',type: 'string'},{name: 'description',type: 'string'},
    ]
});