Ext.define('Erems.model.Masterunitdocument', {
    extend: 'Ext.data.Model',
    alias: 'model.MasterunitdocumentModel',

    idProperty: 'unitdocument_id',

    fields: [
		{name: 'unitdocument_id', type: 'int'},
		{name: 'documenttype_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'filename', type: 'string'},
		{name: 'description', type: 'string'},
        {name: 'documenttype_documenttype', type: 'string'}
    ]
});