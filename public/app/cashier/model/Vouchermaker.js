Ext.define('Cashier.model.Vouchermaker', {
    extend: 'Ext.data.Model',
    alias: 'model.vouchermakermodel',
    idProperty: 'addby',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'addby', type: 'int'},
        {name: 'user_email', type: 'string'},
    ]
});