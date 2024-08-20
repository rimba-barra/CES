Ext.define('Hrd.model.Group', {
    extend: 'Ext.data.Model',
    alias: 'model.groupmodel',
    idProperty: 'group_id',
    fields: [
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'group_id', type: 'int'},
        {name: 'group', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'uang_makan', type: 'number'},
        {name: 'uang_makan_extra', type: 'number'},
        {name: 'uang_transport', type: 'number'},
        {name: 'uang_hadir', type: 'number'},
        {name: 'lembur', type: 'boolean'},
        {name: 'lambat', type: 'boolean'},
        {name: 'denda_terlambat', type: 'number'},
        {name: 'uang_transport_mod', type: 'number'},
        {name: 'split_shift', type: 'boolean'},
        {name: 'uang_makan_mod', type: 'number'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
        {name: 'index_no', type: 'int'},
    ]
});