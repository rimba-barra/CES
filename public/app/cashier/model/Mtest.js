Ext.define('Cashier.model.Mtest', {
    extend: 'Ext.data.Model',
    alias: 'model.mtestmodel',
    idProperty: 'test_id',
    fields: [
        {name: 'test_id', type: 'int'},
        {name: 'test1', type: 'string'},
        {name: 'test2', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});