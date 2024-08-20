Ext.define('Erems.model.Masterpromotionmedia', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpromotionmediamodel',
    idProperty: 'mediapromotion_id',
    fields: [
        {
            name: 'mediapromotion_id',
            type: 'int'
        },
        {
            name: 'mediapromotion_kategori_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'mediapromotion_kategori',
            type: 'string'
        },
        {
            name: 'mediapromotion',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});