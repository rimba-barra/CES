Ext.define('Erems.model.Mastergaransi', {
    extend: 'Ext.data.Model',
    alias: 'model.mastergaransimodel',
        
    idProperty: 'guaranteetype_id',

    fields: [
        {name: 'guaranteetype_id',type: 'int'},{name: 'code',type: 'string'},{name: 'guaranteetype',type: 'string'},{name: 'description',type: 'string'},{name: 'guarantee',type: 'int'},{name: 'period',type: 'string'},{name: 'is_use',type: 'int'},
    ]
});