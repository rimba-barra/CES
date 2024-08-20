Ext.define('Gl.model.Balancesheet', {
    extend: 'Ext.data.Model',
    alias: 'model.balancesheetmodel',
    idProperty: 'reporttype',
    fields: [
        {name: 'reporttype', type: 'int'},      
        {name: 'level', type: 'int'},
        {name: 'monthdata', type: 'int'},      
        {name: 'yeardata', type: 'int'},      
    ]
});