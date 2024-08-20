Ext.define('Cashier.model.Consolidation', {
    extend: 'Ext.data.Model',
    alias: 'model.consolidationmodel',
    idProperty: 'consolidation_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'consolidation_id', type: 'int'},       
        {name: 'group_consolidation', type: 'string'},
        {name: 'pt_idref', type: 'int'}
    ]
});