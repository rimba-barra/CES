Ext.define('Cashier.model.Kategoriloans', {
    extend: 'Ext.data.Model',
    alias: 'model.kategoriloansmodel',
    idProperty: 'kategori_loans_id',
    fields: [
        {name: 'kategori_loans_id', type: 'int'},
        {name: 'kategori_loans_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});