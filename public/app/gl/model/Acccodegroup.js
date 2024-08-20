Ext.define('Gl.model.Acccodegroup', {
    extend: 'Ext.data.Model',
    alias: 'model.Acccodegroupmodel',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'desc', type: 'string'}
       
    ]
});