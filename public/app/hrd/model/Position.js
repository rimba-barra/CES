Ext.define('Hrd.model.Position', {
    extend: 'Ext.data.Model',
    alias: 'model.positionmodel',
    idProperty: 'position_id',
    fields: [
        {name: 'position_id', type: 'int'},       
        {name: 'position', type: 'string'},
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