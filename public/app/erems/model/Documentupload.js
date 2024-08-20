Ext.define('Erems.model.Documentupload', {
    extend: 'Ext.data.Model',
    alias: 'model.documentuploadmodel',
    idProperty: 'sppjb_doc_id',
    fields: [
		{name: 'sppjb_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'doc_filename', type: 'string'},
		{name: 'doc_type', type: 'string'},
		{name: 'document_type', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{name: 'addby_fullname', type: 'string'},
    ]
});