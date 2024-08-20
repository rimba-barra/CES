Ext.define('Cashier.model.Consolidationaccess', {
    extend: 'Ext.data.Model',
    alias: 'model.consolidationaccessmodel',
    idProperty: 'consolidation_access_id',
    fields: [
        {name: 'consolidation_access_id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'user_email', type: 'string'},
        {name: 'consolidation_id', type: 'int'},
        {name: 'group_consolidation', type: 'string'},
    ]
});