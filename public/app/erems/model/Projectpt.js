Ext.define('Erems.model.Projectpt', {
    extend: 'Ext.data.Model',
    alias: 'model.projectptmodel',
    idProperty: 'projectpt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'projectcode', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'ptcode', type: 'string'}
    ]
});