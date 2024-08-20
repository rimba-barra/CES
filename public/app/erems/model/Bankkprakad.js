Ext.define('Erems.model.Bankkprakad', {
    extend: 'Ext.data.Model',
    alias: 'model.bankkprakadmodel',
    idProperty: 'akadconfirmation_id',
    fields: [
		{name: 'akadconfirmation_id', type: 'int'},
		{name: 'purchaseletter_bankkpr_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'akadconfirmation_index', type: 'int'},
		{name: 'akadconfirmation_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'akadconfirmation_status_id', type: 'int'},
		{name: 'akadconfirmation_status', type: 'string'},
		{name: 'akadconfirmation_note', type: 'string'},
		{name: 'temp_id_akad' , type:'string'},
		
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'}
    ]
});