Ext.define('Gl.model.Month', {
    extend: 'Ext.data.Model',
    alias: 'model.monthmodel',
    idProperty: 'id',
    fields: [
       {name: 'id', type: 'int'},
       {name: 'month', type: 'string'},
    ]
});