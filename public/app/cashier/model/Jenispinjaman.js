Ext.define('Cashier.model.Jenispinjaman', {
    extend: 'Ext.data.Model',
    alias: 'model.jenispinjamanmodel',
    idProperty: 'jenis_pinjaman_id',
    fields: [
        {name: 'jenis_pinjaman_id', type: 'int'},
        {name: 'jenis_pinjaman_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});