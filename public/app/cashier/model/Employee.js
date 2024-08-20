Ext.define('Cashier.model.Employee', {
    extend: 'Ext.data.Model',
    alias: 'model.employeemodel',
    idProperty: 'employee_id',
    fields: [
        {name: 'project_id', type: 'int'},       
        {name: 'pt_id', type: 'int'},       
        {name: 'employee_id', type: 'int'},       
        {name: 'employee_name', type: 'string'},       
        {name: 'department_id', type: 'int'},       
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'usertax_id', type: 'int'}
    ]
});