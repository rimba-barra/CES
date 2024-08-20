Ext.define('Cashier.model.Coauseraccess', {
    extend: 'Ext.data.Model',
    alias: 'model.coauseraccessmodel',
    idProperty: 'coauseraccess_id',
    fields: [
        {name: 'coauseraccess_id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'mode_read', type: 'string'},
    ]
});