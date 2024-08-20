Ext.define('Erems.model.Mastercustomerdocument', {
    extend: 'Ext.data.Model',
    alias: 'model.MastercustomerdocumentModel',

    idProperty: 'customerdocument_id',

    fields: [
        {name: 'customerdocument_id', type: 'int'},
        {name: 'documenttype_id', type: 'int'},
        {name: 'customer_id', type: 'int'},
        {name: 'filename', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'documenttype_documenttype', type: 'string'}
    ]
});