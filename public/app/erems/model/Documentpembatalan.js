Ext.define('Erems.model.Documentpembatalan', {
    extend: 'Ext.data.Model',
    alias: 'model.documentpembatalanmodel',
    idProperty: 'cancellationdocument_id',
    fields: [
		{name: 'cancellation_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'filename', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'Addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{name: 'addby_fullname', type: 'string'},
    ]
});