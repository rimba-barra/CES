Ext.define('Cashier.model.Configdb', {
    extend: 'Ext.data.Model',
    alias: 'model.configdbmodel',
    idProperty: 'config_id',
    fields: [
        {name: 'config_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'base_db', type: 'string'},
        {name: 'for_apps', type: 'string'},
        {name: 'host', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'db', type: 'string'},
        {name: 'port', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});