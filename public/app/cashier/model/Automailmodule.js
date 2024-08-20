Ext.define('Cashier.model.Automailmodule', {
    extend: 'Ext.data.Model',
    alias: 'model.automailmodulemodel',
    idProperty: 'module_id',
    fields: [
        {name: 'module_id', type: 'int'},
        {name: 'module_code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
         {name: 'active', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});