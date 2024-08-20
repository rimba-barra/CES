Ext.define('Gl.model.Bungashl', {
    extend: 'Ext.data.Model',
    alias: 'model.bungashlmodel',
    idProperty: 'reportdate',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'reportdate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'printby', type: 'int'},
    ]
});