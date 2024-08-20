Ext.define('Cashier.model.Masteremployee', {
    extend: 'Ext.data.Model',
    alias: 'model.masteremployeemodel',
    idProperty: 'employee_id',
    fields: [
        {name: 'employee_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_name', type: 'string'}, 
        {name: 'department_code', type : 'string'},
        {name: 'employee_name', type: 'string'},
        {name: 'nik_group', type: 'string'},
        {name: 'sex', type: 'string'},
        {name: 'department_id', type : 'string'},
        {name: 'reportto',  type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});