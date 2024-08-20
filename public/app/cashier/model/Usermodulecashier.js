Ext.define('Cashier.model.Usermodulecashier', {
    extend: 'Ext.data.Model',
    alias: 'model.usermodulecashiermodel',
    idProperty: 'user_id',
    fields: [
        {name: 'user_id', type: 'int'},
        {name: 'user_name', type: 'string'},
        {name: 'user_fullname', type: 'string'},
    ]
});