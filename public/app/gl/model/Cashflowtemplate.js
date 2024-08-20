Ext.define('Gl.model.Cashflowtemplate', {
    extend: 'Ext.data.Model',
    alias: 'model.cashflowtemplatemodel',
    idProperty: 'reporttype',
    fields: [
        {name: 'reporttype', type: 'int'},      
        {name: 'level', type: 'int'},
        {name: 'monthdata', type: 'int'},      
        {name: 'yeardata', type: 'int'},      
    ]
});