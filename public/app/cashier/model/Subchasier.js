Ext.define('Cashier.model.Subchasier', {
    extend: 'Ext.data.Model',
    alias: 'model.subchasiermodel',
    idProperty: 'subcashier_id',
    fields: [
        {name: 'subcashier_id', type: 'int'},    
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});