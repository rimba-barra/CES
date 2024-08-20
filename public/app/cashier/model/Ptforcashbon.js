Ext.define('Cashier.model.Ptforcashbon', {
    extend: 'Ext.data.Model',
    alias: 'model.ptforcashbonmodel',
    idProperty: 'pt_id_cashbon',
    fields: [
        {name: 'pt_id_cashbon', type: 'int'},
        {name: 'pt_id_owner', type: 'int'},
        {name: 'ptnameowner', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});