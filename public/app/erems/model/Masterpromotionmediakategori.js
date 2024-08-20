Ext.define('Erems.model.Masterpromotionmediakategori', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpromotionmediakategorimodel',
    idProperty: 'mediapromotion_kategori_id',
    fields: [
        {
            name: 'mediapromotion_kategori_id',
            type: 'int'
        },
        {
            name: 'mediapromotion_kategori',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
    ]
});