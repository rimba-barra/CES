Ext.define('Erems.model.Bagihasilpilihdata', {
    extend: 'Ext.data.Model',
    alias: 'model.bagihasilpilihdatamodel',

    idProperty: 'purchaseletter_id',

    fields: [
        {name: 'purchaseletter_id', type: 'int'},
		{name: 'cluster', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_id', type: 'int'},
		{name: 'unit_number', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'firstpurchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
       	{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_name', type: 'string'},
		{name: 'pricetype', type: 'string'},
		{name: 'harga_total_jual', type: 'decimal'},
		{name: 'total_payment', type: 'decimal'},
      	{name: 'akad_realisasiondate', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'sppjb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'aktappjb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'is_prosesbagihasil', type: 'int'},
		{name: 'kelompok_edit', type: 'string'},
		{name: 'progress_contruction', type: 'decimal'},
		{name: 'landrepayment_id', type: 'int'},
		{name: 'landrepayment_code', type: 'string'},
		{name: 'range_name', type: 'string'},
		{name: 'komisi_marketing', type: 'decimal'},
		{name: 'persen_payment', type: 'decimal'},
		
		{name: 'cluster_id', type: 'int'},
		{name: 'is_set_tocluster', type: 'int'},
		{name: 'block_id', type: 'int'},
		{name: 'is_set_toblock', type: 'int'},
		{name: 'set_lrp', type: 'int'},
		{name: 'is_nonppn', type: 'boolean'},
		{name: 'is_set_toall', type: 'int'},
		// added by rico 09052022
		{name: 'type_name', type: 'string'},
		// added by rico 25112022
		{name: 'pt_name', type: 'string'},
    ]
});