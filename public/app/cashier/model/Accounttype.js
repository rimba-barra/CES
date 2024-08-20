Ext.define('Cashier.model.Accounttype', {
    extend: 'Ext.data.Model',
    alias: 'model.accounttypemodel',
    idProperty: 'account_type_id',
    fields: [
        {name: 'account_type_id', type: 'int'},
        {name: 'account_type_code', type: 'string'},
        {name: 'account_type', type: 'string'},
        {name: 'description', type: 'string'},
    ]
});