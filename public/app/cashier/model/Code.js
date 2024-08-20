Ext.define('Cashier.model.Code', {
    extend: 'Ext.data.Model',
    alias: 'model.codemodel',
    idProperty: 'code_id',
    fields: [
        {name: 'code_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'objectname', type: 'string'},
        {name: 'rptfile', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});