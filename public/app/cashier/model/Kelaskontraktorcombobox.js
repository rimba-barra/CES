Ext.define('Cashier.model.Kelaskontraktorcombobox', {
    extend: 'Ext.data.Model',
    alias: 'model.kelaskontraktorcomboboxmodel',
    idProperty: 'kelaskontraktor_id',
    fields: [
        {name: 'kelaskontraktor_id', type: 'int'},
        {name: 'description', type: 'string'}
    ]
});