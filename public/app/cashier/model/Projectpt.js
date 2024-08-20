Ext.define('Cashier.model.Projectpt', {
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
        {name: 'ptcode', type: 'string'},
        {name: 'pt_name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'subholding_id', type: 'int'},
        {name: 'subholdingname', type: 'string'}
    ]
});