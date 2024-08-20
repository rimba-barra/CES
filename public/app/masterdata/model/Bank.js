Ext.define('Masterdata.model.Bank', {
    extend: 'Ext.data.Model',
    alias: 'model.BankModel',

    idProperty: 'bank_id',

    fields: [
        {
            name: 'bank_id',
            type: 'int'
        },
        {
            name: 'bank_name',
            type: 'string'
        },
        {
            name: 'bank_company_name',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'use_erems',
            type: 'string'
        }
    ]
});