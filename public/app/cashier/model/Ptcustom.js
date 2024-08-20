Ext.define('Cashier.model.Ptcustom', {
    extend: 'Ext.data.Model',
    alias: 'model.ptcustommodel',
    idProperty: 'projectpt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'project_code', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'pt_code', type: 'string'},
        {name: 'subholding_id', type: 'int'},
        {name: 'subholding_name', type: 'string'},
    ]
});