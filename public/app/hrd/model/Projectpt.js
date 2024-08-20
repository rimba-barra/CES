Ext.define('Hrd.model.Projectpt', {
    extend: 'Ext.data.Model',
    alias: 'model.projectptmodel',
    idProperty: 'projectpt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
	    {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'}, 
        {name: 'pt_name', type: 'string'},
    ]
});