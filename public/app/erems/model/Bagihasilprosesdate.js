Ext.define('Erems.model.Bagihasilprosesdate', {
    extend: 'Ext.data.Model',
    alias: 'model.bagihasilprosesdatemodel',

    idProperty: 'lrp_id',

    fields: [
        {name: 'lrp_id', type: 'int'},
		{name: 'doc_no', type: 'string'},
		{name: 'proses_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'total', type: 'decimal'},
		// added by rico 25112022
		{name: 'pt_name', type: 'string'},
    ]
});