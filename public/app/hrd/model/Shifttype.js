Ext.define('Hrd.model.Shifttype', {
    extend: 'Ext.data.Model',
    alias: 'model.shifttypemodel',
    idProperty: 'shifttype_id',
    fields: [
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'shifttype_id', type: 'int'},
        {name: 'shifttype', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'in_time', type: 'string'},
        {name: 'out_time', type: 'string'},
        {name: 'holyday', type: 'boolean'},
        {name: 'outafter_time', type: 'string'},
        {name: 'different_day', type: 'boolean'},
    ]
});