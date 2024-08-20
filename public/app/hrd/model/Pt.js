Ext.define('Hrd.model.Pt', {
    extend: 'Ext.data.Model',
    alias: 'model.ptmodel',
    idProperty: 'pt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'project_id', type: 'int'},       
        {name: 'pt_id', type: 'int'},       
        {name: 'pt_proyek', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'description', type: 'string'},
    ]
});