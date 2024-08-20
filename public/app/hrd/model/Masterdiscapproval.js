Ext.define('Hrd.model.Masterdiscapproval', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdiscapprovalmodel',
    idProperty: 'disckaryawan_approval_id',
    fields: [
        {name: 'disckaryawan_approval_id', type: 'int'},
        {name: 'employee_id', type: 'int'},
        {name: 'employee_name', type: 'string'},
        {name: 'tipe', type: 'string'},
        {name: 'tipe_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
    ]
});