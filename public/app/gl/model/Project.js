Ext.define('Gl.model.Project', {
    extend: 'Ext.data.Model',
    alias: 'model.projectmodel',
    idProperty: 'project_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},       
        {name: 'name', type: 'string'}
    ]
});