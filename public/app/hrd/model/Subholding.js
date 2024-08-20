Ext.define('Hrd.model.Subholding', {
    extend: 'Ext.data.Model',
    alias: 'model.subholdingmodel',
    idProperty: 'subholding_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'holding_id', type: 'int'},    
        {name: 'subholding_id', type: 'int'},       
        {name: 'code', type: 'string'},       
        {name: 'name', type: 'string'},       
        {name: 'description', type: 'string'},    
    ]
});