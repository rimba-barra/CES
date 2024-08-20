Ext.define('Cashier.model.Projectptcashbon', {
    extend: 'Ext.data.Model',
    alias: 'model.projectptcashbonmodel',
    idProperty: 'pt_id_cashbon',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'pt_id_owner', type: 'int'},       
        {name: 'project_id', type: 'int'},       
        {name: 'pt_id', type: 'int'},    
        {name: 'pt_id_cashbon', type: 'int'},     
        {name: 'projectname', type: 'string'},
        {name: 'projectcode', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'ptcode', type: 'string'}
    ]
});