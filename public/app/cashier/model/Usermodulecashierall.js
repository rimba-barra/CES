Ext.define('Cashier.model.Usermodulecashierall', {
    extend: 'Ext.data.Model',
    alias: 'model.usermodulecashierallmodel',
    idProperty: 'user_id',
    fields: [
        {name: 'user_id', type: 'int'},
        {name: 'user_name', type: 'string'},
        {name: 'user_fullname', type: 'string'},
    ]
});