Ext.define('Cashier.model.Consolesupportcombobox', {
    extend: 'Ext.data.Model',
    alias: 'model.consolesupportcomboboxmodel',
    idProperty: 'consolidation_access_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'consolidation_access_id', type: 'int'},       
        {name: 'group_consolidation', type: 'string'},
         {name: 'pt_idref', type: 'int'},  
           {name: 'coa_reference', type: 'string'},
       // {name: 'user_id', type: 'int'}
    ]
});