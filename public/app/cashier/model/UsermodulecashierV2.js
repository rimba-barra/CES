Ext.define('Cashier.model.UsermodulecashierV2', {
    extend: 'Ext.data.Model',
    alias: 'model.usermodulecashiermodelV2',
    idProperty: 'user_id',
    fields: [
        {name: 'user_id', type: 'int'},
        {name: 'user_name', type: 'string'},
        {name: 'user_fullname', type: 'string'},
    ]
});