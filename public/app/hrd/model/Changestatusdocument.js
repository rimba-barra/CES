Ext.define('Hrd.model.Changestatusdocument', {
    extend: 'Ext.data.Model',
    alias: 'model.changestatusdocumentmodel',
    idProperty: 'changstatusdocument_id',
    fields: [
        {name: 'changstatusdocument_id', type: 'int'},
        {name: 'changestatus_id', type: 'int'},
        {name: 'typedocument', type: 'string'},
        {name: 'filename', type: 'string'},
        {name: 'locationpath', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});