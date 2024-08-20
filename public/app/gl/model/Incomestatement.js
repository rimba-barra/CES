Ext.define('Gl.model.Incomestatement', {
    extend: 'Ext.data.Model',
    alias: 'model.incomestatementmodel',
    idProperty: 'reporttype',
    fields: [
        {name: 'reporttypeincome', type: 'int'},      
        {name: 'levelincome', type: 'int'},
        {name: 'monthdataincome', type: 'int'},      
        {name: 'yeardataincome', type: 'int'},      
    ]
});