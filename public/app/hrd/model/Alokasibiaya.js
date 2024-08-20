Ext.define('Hrd.model.Alokasibiaya', {
    extend: 'Ext.data.Model',
    alias: 'model.alokasibiayamodel',
    idProperty: 'alokasibiaya_id',
    fields: [
        {name: 'alokasibiaya_id', type: 'int'},       
        {name: 'project_id', type: 'int'},       
        {name: 'pt_id', type: 'int'},       
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});