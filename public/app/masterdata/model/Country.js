Ext.define('Masterdata.model.Country', {
    extend: 'Ext.data.Model',
    alias: 'model.CountryModel',

    idProperty: 'country_id',

    fields: [
        {
            name: 'country_id',
            type: 'int'
        },
        {
            name: 'country_code',
            type: 'string'
        },
        {
            name: 'country_code_alpha3',
            type: 'string'
        },
        {
            name: 'country_code_alpha2',
            type: 'string'
        },
        {
            name: 'country_name',
            type: 'string'
        },
        {
            name: 'country_name_en',
            type: 'string'
        },
		{
            name: 'default_country',
            type: 'boolean'
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