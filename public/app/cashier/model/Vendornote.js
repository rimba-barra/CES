Ext.define('Cashier.model.Vendornote', {
    extend: 'Ext.data.Model',
    alias: 'model.vendornotemodel',
    idProperty: 'vendornote_id',
    fields: [
        {name: 'statedata', type: 'string'},
        {name: 'vendor_id', type: 'int'},
        {name: 'vendornote_id', type: 'int'},     
        {name: 'code', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});