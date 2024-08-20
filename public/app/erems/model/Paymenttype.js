Ext.define('Erems.model.Paymenttype', {
    extend: 'Ext.data.Model',
    alias: 'model.paymenttypemodel',
        
    idProperty: 'paymenttype_id',

    fields: [
        {name: 'paymenttype_id',type: 'int'},{name: 'code',type: 'string'},{name: 'paymenttype',type: 'string'},{name: 'description',type: 'string'},
    ]
});