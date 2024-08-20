Ext.define('Erems.model.Pphpayment', {
    extend: 'Ext.data.Model',
    alias: 'model.PphpaymentModel',

    idProperty: 'purchaseletter_id',

    fields: [
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'unit_id', type: 'int'},
        {name: 'customer_name', type: 'string'},
		{name: 'salesman_id', type: 'int'},
		{name: 'salesman_name', type: 'string'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'unit_number', type: 'string'},
		{name: 'cluster_code', type: 'string'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'type_name', type: 'string'},
		{name: 'productcategory', type: 'string'},
		{name: 'pph_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'randomnumber', type: 'string'}
    ],
});