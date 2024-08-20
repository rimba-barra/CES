Ext.define('Cashier.model.Kreditur', {
    extend: 'Ext.data.Model',
    alias: 'model.krediturmodel',
    idProperty: 'kreditur_id',
    fields: [
        {name: 'kreditur_id', type: 'int'},
        {name: 'kreditur_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
    ]
});