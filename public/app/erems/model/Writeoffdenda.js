Ext.define('Erems.model.Writeoffdenda', {
    extend: 'Ext.data.Model',
    alias: 'model.writeoffdendamodel',
    idProperty: 'writeoff_id',
    fields: [
		{name: 'writeoff_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'writeoff_no', type: 'string'},
		{name: 'note', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'cluster_id', type: 'int'},
		{name: 'code', type: 'string'},
        {name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby_name', type: 'string'},  // added by rico 23112022
		{name: 'type_name', type: 'string'}
    ]
});