Ext.define('Erems.model.Masternotaris', {
    extend: 'Ext.data.Model',
    alias: 'model.masternotarismodel',
        
    idProperty: 'notaris_id',

    fields: [
        {name: 'notaris_id',type: 'int'},{name: 'code',type: 'string'},{name: 'notaris',type: 'string'},{name: 'alamat',type: 'string'},{name: 'telp',type: 'string'},{name: 'fax',type: 'string'},{name: 'email',type: 'string'},{name: 'city_id',type: 'int'},{name: 'country_id',type: 'int'},{name: 'country_name',type: 'string'},{name: 'city_name',type: 'string'},{name: 'notaris_register',type: 'string'},{name: 'notaris_npwp',type: 'string'}
    ]
});