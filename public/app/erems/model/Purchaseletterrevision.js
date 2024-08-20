Ext.define('Erems.model.Purchaseletterrevision', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterrevisionmodel',
    idProperty: 'purchaseletter_id',
    fields: [
		{name: 'purchaseletter_id', type: 'int'},		
		{name: 'cluster_id', type: 'int'},		
		{name: 'code', type: 'string'},
        {name: 'cluster', type: 'string'},
		{name: 'block_code', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'unit_type_name', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_name', type: 'string'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'salesman_name', type: 'string'},
		{name: 'clubcitra_member', type: 'string'},
		{name: 'productcategory', type: 'string'},
		{name: 'pricetype', type: 'string'}
    ]
});