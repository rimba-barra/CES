Ext.define('Cashier.model.User', {
    extend: 'Ext.data.Model',
    alias: 'model.usermodel',
    idProperty: 'user_id',
    fields: [
        {name: 'user_id', type: 'int'},       
        {name: 'user_name', type: 'string'},
        {name: 'user_fullname', type: 'string'},
        {name: 'employee_id', type: 'int'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});