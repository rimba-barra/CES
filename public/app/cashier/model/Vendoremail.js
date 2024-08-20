Ext.define('Cashier.model.Vendoremail', {
    extend: 'Ext.data.Model',
    alias: 'model.vendoremailmodel',
    idProperty: 'vendor_email_id',
    fields: [
        {name: 'vendor_email_id', type: 'int'},     
        {name: 'vendor_id', type: 'int'},     
        {name: 'seq_no', type: 'int'},  
        {name: 'email', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'statedata', type: 'string'},
    ]
});