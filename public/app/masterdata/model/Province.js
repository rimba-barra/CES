Ext.define('Masterdata.model.Province', {
    extend: 'Ext.data.Model',
    alias: 'model.ProvinceModel',

    idProperty: 'province_id',

    fields: [
        {
            name: 'province_id',
            type: 'int'
        },
        {
            name: 'province_name',
            type: 'string'
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
            name: 'country_name',
            type: 'string'
        }
    ]
});