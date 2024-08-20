Ext.define('Cashier.model.Apps', {
    extend: 'Ext.data.Model',
    alias: 'model.appsmodel',
    idProperty: 'apps_id',
    fields: [
        {name: 'apps_id', type: 'int'},      
        {name: 'apps_name', type: 'string'},
        {name: 'apps_basename', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});