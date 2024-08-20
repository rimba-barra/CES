Ext.define('Gl.model.Yearcombo', {
    extend: 'Ext.data.Model',
    alias: 'model.yearcombomodel',
    idProperty: 'id',
    fields: [
       {name: 'dbapps_id', type: 'int'},
       {name: 'dbapps_year', type: 'string'},
    ]
});