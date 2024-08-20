Ext.define('Gl.model.Subcoalist', {
    extend: 'Ext.data.Model',
    alias: 'model.subcoalistmodel',
    idProperty: 'from_coa_id',
    fields: [
        {name: 'from_subgl_id', type: 'int'},
        {name: 'until_subgl_id', type: 'int'},      
        {name: 'from_subgl_name', type: 'string'},      
        {name: 'until_subgl_name', type: 'string'},      
       
    ]
});