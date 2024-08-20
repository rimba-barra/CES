Ext.define('Cashier.model.Ptcustomcombo', {
    extend: 'Ext.data.Model',
    alias: 'model.ptcustomcombomodel',
    idProperty: 'pt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},       
        {name: 'pt_id', type: 'int'},       
        {name: 'pt_proyek', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'pt_name', type: 'string'},
    ]
});