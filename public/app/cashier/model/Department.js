Ext.define('Cashier.model.Department', {
    extend: 'Ext.data.Model',
    alias: 'model.departmentmodel',
    idProperty: 'department_id',
    fields: [
        {name: 'department_id', type: 'int'},       
        {name: 'department', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'manager_id', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});