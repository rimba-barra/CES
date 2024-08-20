Ext.define('Cashier.model.Tipekontraktorcombobox', {
    extend: 'Ext.data.Model',
    alias: 'model.tipekontraktorcombobox',
    idProperty: 'tipekontraktor_id',
    fields: [
        {name: 'tipekontraktor_id', type: 'int'},
        {name: 'description', type: 'string'}
    ]
});