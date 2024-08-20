Ext.define('Masterdata.model.City', {
    extend: 'Ext.data.Model',
    alias: 'model.CityModel',

    idProperty: 'city_id',

    fields: [
        {
            name: 'city_id',
            type: 'int'
        },
        {
            name: 'city_name',
            type: 'string'
        },
        {
            name: 'city_type_id',
            type: 'int'
        },
        {
            name: 'province_id',
            type: 'int'
        },
        {
            name: 'country_id',
            type: 'int'
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
            name: 'city_fullname',
            type: 'string'
        },
        {
            name: 'city_type_name',
            type: 'string'
        },
        {
            name: 'province_name',
            type: 'string'
        },
        {
            name: 'country_name',
            type: 'string'
        }
    ]
});