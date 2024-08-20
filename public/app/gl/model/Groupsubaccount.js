Ext.define('Gl.model.Groupsubaccount', {
    extend: 'Ext.data.Model',
    alias: 'model.groupsubaccountmodel',
    idProperty: 'from_coa_id',
    fields: [
        {name: 'from_kelsub', type: 'int'},
        {name: 'until_kelsub', type: 'int'},      
        {name: 'from_kelsub_name', type: 'string'},      
        {name: 'until_kelsub_name', type: 'string'},      
       
    ]
});