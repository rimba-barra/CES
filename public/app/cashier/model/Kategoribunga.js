Ext.define('Cashier.model.Kategoribunga', {
    extend: 'Ext.data.Model',
    alias: 'model.kategori_bungamodel',
    idProperty: 'kategori_bunga_id',
    fields: [
        {name: 'kategori_bunga_id', type: 'int'},
        {name: 'kategori_bunga_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});