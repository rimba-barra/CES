Ext.define('Gl.model.Pt', {
    extend: 'Ext.data.Model',
    alias: 'model.ptmodel',
    idProperty: 'pt_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'pt_id', type: 'int'},       
        {name: 'name', type: 'string'}
    ]
});