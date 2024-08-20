Ext.define('Masterdata.model.Currency', {
    extend: 'Ext.data.Model',
    alias: 'model.CurrencyModel',

    idProperty: 'currency_id',

    fields: [
        {
            name: 'currency_id',
            type: 'int'
        },
        {
            name: 'currency_name',
            type: 'string'
        },
        {
            name: 'currency_symbol',
            type: 'string'
        },
		{
            name: 'currency_name_full',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'active',
            type: 'boolean'
        }
    ]
});