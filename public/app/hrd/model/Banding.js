Ext.define('Hrd.model.Banding', {
    extend: 'Ext.data.Model',
    alias: 'model.bandingmodel',
    idProperty: 'banding_id',
    fields: [
        {name: 'banding_id', type: 'int'},
        {name: 'index_no', type: 'int'},       
        {name: 'banding', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});