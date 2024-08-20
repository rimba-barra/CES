Ext.define('Cashier.model.Consolidationv2', {
    extend: 'Ext.data.Model',
    alias: 'model.consolidationv2model',
    idProperty: 'consolidation_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'consolidation_id', type: 'int'},       
        {name: 'group_consolidation', type: 'string'},
        {name: 'pt_idref', type: 'int'}
    ]
});