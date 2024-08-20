Ext.define('Cashier.model.Grouptransaction', {
    extend: 'Ext.data.Model',
    alias: 'model.grouptransactionmodel',
    idProperty: 'grouptrans_id',
    fields: [
        {name: 'grouptrans_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_default', type: 'boolean'},
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});