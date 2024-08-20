Ext.define('Gl.model.Bungaloan', {
    extend: 'Ext.data.Model',
    alias: 'model.bungaloanmodel',
    idProperty: 'bungaloan_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'bungaloan_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'bulan', type: 'int'},
        {name: 'bunga', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
    ]
});