Ext.define('Cashier.model.Appscontroller', {
    extend: 'Ext.data.Model',
    alias: 'model.appscontrollermodel',
    idProperty: 'controller_id',
    fields: [
        {name: 'controller_id', type: 'int'},      
        {name: 'apps_id', type: 'int'},      
        {name: 'apps_basename', type: 'string'},      
        {name: 'controller_name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'controllerdesc', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});