Ext.define('Erems.model.Masterberkasdocument', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterberkasdocumentModel',

    idProperty: 'berkasdocument_id',

    fields: [
        {name: 'berkasdocument_id', type: 'int'},
        {name: 'berkas_id', type: 'int'},
        {name: 'filename', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'documentname', type: 'string'}
    ]
});