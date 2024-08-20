Ext.define('Cashier.model.Bank', {
    extend: 'Ext.data.Model',
    alias: 'model.bankmodel',
    idProperty: 'bank_id',
    fields: [
        {name: 'bank_id', type: 'int'},
        {name: 'bank_name', type: 'string'},
        {name: 'bank_full_name', type: 'string'},
        {name: 'bank_company_name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'bank_code', type: 'string'},
       
    ]
});