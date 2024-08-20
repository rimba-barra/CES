Ext.define('Erems.model.Purchaseletterrevisionchangeprice', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterrevisionchangepricemodel',
    idProperty: 'changeprice_id',
    fields: [
		{name: 'purchaseletterrevision_id', type: 'int'},		
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'revisiontype', type: 'string'},
		{name: 'changeprice_id', type: 'int'},
		{name: 'changeprice_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'harga_jual_lama', type: 'decimal'},
		{name: 'harga_jual_baru', type: 'decimal'},
		{name: 'alasan_changeprice', type: 'string'},
		{name: 'is_approve', type: 'boolean'},
		{name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'approve_by_name', type: 'string'}
    ]
});