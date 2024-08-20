Ext.define('Cashier.model.Coadept', {
    extend: 'Ext.data.Model',
    alias: 'model.coadeptmodel',
    idProperty: 'coadept_id',
    fields: [
        {name: 'coadept_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'kelsub_id', type: 'int'},
        {name: 'department_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'department', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'kelsubdesc', type: 'string'},
        
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'is_journal', type: 'int'},
    ]
});