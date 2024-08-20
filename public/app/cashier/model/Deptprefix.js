Ext.define('Cashier.model.Deptprefix', {
    extend: 'Ext.data.Model',
    alias: 'model.deptprefixmodel',
    idProperty: 'deptprefix_id',
    fields: [
        {name: 'deptprefix_id', type: 'int'},
        {name: 'department_id', type: 'int'},       
        {name: 'department', type: 'string'},       
        {name: 'deptcode', type: 'string'},       
        {name: 'deptdesc', type: 'string'},       
        {name: 'active', type: 'bit'},       
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});