Ext.define('Hrd.model.Masterdisctanahapartment', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdisctanahapartmentmodel',
    idProperty: 'disctanah_apartment_id',
    fields: [
        {name: 'disctanah_apartment_id', type: 'int'},
        {name: 'group_code', type: 'string'},
        {name: 'max_luastanah', type: 'float'},
        {name: 'max_luasbangunan', type: 'float'},
        {name: 'max_rupiah', type: 'float'},
        {name: 'rumus_luas_tanah', type: 'float'},
        {name: 'max_persendisc', type: 'float'},
        {name: 'is_approve', type: 'string'},
        {name: 'approveon', type: 'string'},
        {name: 'approveby', type: 'string'},
        {name: 'approveby_name', type: 'string'},
        {name: 'is_reject', type: 'string'},
        {name: 'rejecton', type: 'string'},
        {name: 'rejectby', type: 'string'},
        {name: 'rejectby_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
    ]
});