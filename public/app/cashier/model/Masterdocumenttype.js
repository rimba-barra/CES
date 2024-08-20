Ext.define('Cashier.model.Masterdocumenttype', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdocumenttypemodel',
    idProperty: 'documenttype_id',
    fields: [
        {name: 'documenttype_id', type: 'int'},
        {name: 'documenttype', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'sort', type: 'int'},
        {name: 'hideparam', type: 'string'},
    ]
});