Ext.define('Erems.model.Admincollection', {
	extend: 'Ext.data.Model',
	alias: 'model.admincollectionmodel',
	idProperty: 'changeownership_id',
	fields: [
		{ name: 'purchaseletter_id', type: 'int' },
		{ name: 'cluster_id', type: 'int' },
		{ name: 'code', type: 'string' },
		{ name: 'cluster', type: 'string' },
		{ name: 'block', type: 'string' },
		{ name: 'unit_number', type: 'string' },
		{ name: 'customer_name', type: 'string' },
		{ name: 'purchaseletter_no', type: 'string' },
		{ name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'type_name', type: 'string' },
		{ name: 'harga_jual', type: 'decimal' },
		{ name: 'total_payment', type: 'decimal' },
		{ name: 'is_pay', type: 'boolean' },
		{ name: 'salesman_name', type: 'string' },
		{ name: 'collector_name', type: 'string' },
		{ name: 'clubname', type: 'string' },
		{ name: 'pricetype_id', type: 'int' },
		{ name: 'pricetype', type: 'string' },
		{ name: 'bank_name', type: 'string' },
		{ name: 'progress', type: 'int' },
		{ name: 'berkas', type: 'string' },
		{ name: 'is_alreadyakad', type: 'boolean' },
		{ name: 'pengakuan', type: 'string' },
		{ name: 'uangmukatype_id', type: 'int' },
		{ name: 'uangmukatype', type: 'string' },
		{ name: 'notes_batal', type: 'string' },

		{ name: 'is_recommended_tocancel', type: 'boolean' },
		{ name: 'recommended_tocancel_id', type: 'int' },
		{ name: 'recommended_tocancel', type: 'string' },
		{ name: 'recommended_tocancel_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },

		{ name: 'pengakuan_penjualan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },

		{ name: 'unit_id', type: 'int' },
		{ name: 'is_use', type: 'boolean' },
		{ name: 'kpr_acc_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'akad_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'kpr_realisation', type: 'decimal' },

		{ name: 'firstpurchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },

		{ name: 'is_generatefullpayment', type: 'boolean' },
		{ name: 'imb_no', type: 'string' },
		{ name: 'imb_date', type: 'date' },
		{ name: 'buktipemilik_id', type: 'int' },
		{ name: 'is_cashier', type: 'boolean' },

		// { name: 'employee_id', type: 'int' },
		{ name: 'collector_name', type: 'string' },
		{ name: 'position', type: 'string' },

		{ name: 'collector_id', type: 'int' },

		//added by anas 04062021		
		{ name: 'open_hari_va', type: 'int' },

		//added by rico 09082021		
		{ name: 'include_denda_va', type: 'int' },

		//added by rico 15092021		
		{ name: 'kpp', type: 'int' },

		//added by rico 27012022		
		{ name: 'dibiayai_instansi', type: 'int' },
		{ name: 'is_rencana_kpr', type: 'boolean' },

		{ name: 'kpr_date_adjust', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },

	]
});