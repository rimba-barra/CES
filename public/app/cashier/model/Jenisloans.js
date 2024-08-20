Ext.define('Cashier.model.Jenisloans', {
    extend: 'Ext.data.Model',
    alias: 'model.jenisloansmodel',
    idProperty: 'jenis_loans_id',
    fields: [
        {name: 'jenis_loans_id', type: 'int'},
        {name: 'loans_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});