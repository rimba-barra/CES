Ext.define('Cashier.model.Deptaccess', {
    extend: 'Ext.data.Model',
    alias: 'model.deptaccessmodel',
    idProperty: 'deptaccess_id',
    fields: [
        {name: 'deptaccess_id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'department_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
        {name: 'code', type: 'string'},
    ]
});