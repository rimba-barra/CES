Ext.define('Cashier.model.Project', {
    extend: 'Ext.data.Model',
    alias: 'model.projectmodel',
    idProperty: 'project_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},       
        {name: 'code', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'address', type: 'string'},
    ]
});