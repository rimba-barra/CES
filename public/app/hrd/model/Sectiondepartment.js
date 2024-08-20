Ext.define('Hrd.model.Sectiondepartment', {
    extend: 'Ext.data.Model',
    alias: 'model.sectiondepartmentmodel',
    idProperty: 'section_id',
    fields: [
        {name: 'section_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'department_id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'section', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
    ]
});