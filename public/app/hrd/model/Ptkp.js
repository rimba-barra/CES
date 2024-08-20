Ext.define('Hrd.model.Ptkp', {
    extend: 'Ext.data.Model',
    alias: 'model.ptkpmodel',
    idProperty: 'ptkp_id',
    fields: [
        {name: 'ptkp_id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});