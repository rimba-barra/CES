Ext.define('Gl.model.Consolidation', {
    extend: 'Ext.data.Model',
    alias: 'model.consolidationmodel',
    idProperty: 'consolidation_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'consolidation_id', type: 'int'},       
        {name: 'name', type: 'string'}
    ]
});