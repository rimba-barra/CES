Ext.define('Cashier.model.Status', {
    extend: 'Ext.data.Model',
    alias: 'model.statusmodel',
    idProperty: 'status_id',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});