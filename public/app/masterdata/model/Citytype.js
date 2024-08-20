Ext.define('Masterdata.model.Citytype', {
    extend: 'Ext.data.Model',
    alias: 'model.CitytypeModel',

    idProperty: 'city_type_id',

    fields: [
        {
            name: 'city_type_id',
            type: 'int'
        },
        {
            name: 'city_type_name',
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