Ext.define('Hrd.model.Organization', {
    extend: 'Ext.data.Model',
    alias: 'model.organizationmodel',
    idProperty: 'organization_id',
    fields: [
        {name: 'organization_id', type: 'int'},
        {name: 'employee_id', type: 'int'},
        {name: 'organization', type: 'string'},
        {name: 'position', type: 'string'},
        {name: 'start_year', type: 'string'},
        {name: 'end_year', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
    ]
});