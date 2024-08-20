Ext.define('Erems.model.Complainthistory', {
    extend: 'Ext.data.Model',
    alias: 'model.complainthistorymodel',
    idProperty: 'history_rencana_serahterima_id',
    fields: [
		{name: 'history_rencana_serahterima_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'rencana_serahterima_date_old', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'rencana_serahterima_date_new', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'modul', type: 'string'},
		{name: 'user_email', type: 'string'},
		{name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
    ]
});