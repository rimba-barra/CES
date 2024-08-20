Ext.define('Erems.model.Surathimbauanuangmuka', {
    extend: 'Ext.data.Model',
    alias: 'model.surathimbauanuangmukamodel',
        
    idProperty: 'purchaseletter_id',

    fields: [
        {name: 'purchaseletter_id',type: 'int'},
        {name: 'cluster_code',type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'firstpurchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'pricetype', type: 'string'},
		{name: 'land_size', type: 'decimal'},
		{name: 'building_size', type: 'decimal'},
		{name: 'type_name', type: 'string'},
		{name: 'harga_netto', type: 'decimal'},
		{name: 'harga_total_jual', type: 'decimal'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'persen_bayar', type: 'string'},
		{name: 'last_payment_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'sppjb_sign_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'kpr_acc_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'serahterima_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'progress', type: 'decimal'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'block_code', type: 'string'},
    ]
});