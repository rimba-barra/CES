Ext.define('Hrd.model.Workgroup', {
    extend: 'Ext.data.Model',
    alias: 'model.workgroupmodel',
    idProperty: 'workgroup_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'workgroup_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'active', type: 'bit'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
    ]
});