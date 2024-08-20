Ext.define('Hrd.model.Jobfamily', {
    extend: 'Ext.data.Model',
    alias: 'model.jobfamilymodel',
    idProperty: 'jobfamily_id',
    fields: [
        {name: 'jobfamily_id', type: 'int'},       
        {name: 'jobfamily', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});