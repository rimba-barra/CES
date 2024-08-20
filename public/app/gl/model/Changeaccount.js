Ext.define('Gl.model.Changeaccount', {
    extend: 'Ext.data.Model',
    alias: 'model.changeaccountmodel',
    idProperty: 'month_id',
    fields: [
        {name: 'coa_old_id', type: 'int'},
        {name: 'coa_new_id', type: 'int'},
        {name: 'coa_old', type: 'string'},
        {name: 'coa_new', type: 'string'},
       
    ]
});