Ext.define('Erems.model.Bagihasilprosesdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.bagihasilprosesdetailmodel',

    idProperty: 'lrp_detail_id',

    fields: [
        {name: 'lrp_detail_id', type: 'int'},
		{name: 'lrp_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		
		{name: 'unit_number', type: 'string'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		
		{name: 'doc_no', type: 'string'},
		{name: 'lrp_sharingparameter_id', type: 'int'},
		{name: 'purchaseletter_pencairankpr_id', type: 'int'},
		{name: 'termin_lrp', type: 'int'},
		{name: 'nilai_lrp_payment', type: 'decimal'},
		{name: 'total_payment', type: 'decimal'},
		{name: 'payment_percentage', type: 'decimal'},
		{name: 'pricetype_id', type: 'int'},
		{name: 'pricetype', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_id', type: 'int'},
		{name: 'customer_name', type: 'string'},
		{name: 'land_size', type: 'decimal'},
		{name: 'kelebihan', type: 'decimal'},
		{name: 'building_size', type: 'decimal'},
		{name: 'management_fee', type: 'decimal'},
		{name: 'management_fee_dpp', type: 'decimal'},
		{name: 'management_fee_ppn', type: 'decimal'},
		{name: 'management_fee_pph', type: 'decimal'},
		{name: 'royalty_fee', type: 'decimal'},
		{name: 'royalty_dpp', type: 'decimal'},
		{name: 'royalty_ppn', type: 'decimal'},
		{name: 'royalty_pph', type: 'decimal'},
		{name: 'harga_netto', type: 'decimal'},
		{name: 'harga_total_jual', type: 'decimal'}
    ]
});