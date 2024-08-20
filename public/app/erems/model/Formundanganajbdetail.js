Ext.define('Erems.model.Formundanganajbdetail', {
	extend: 'Ext.data.Model',
	alias: 'model.formundanganajbdetailmodel',
	idProperty: 'hgbajb_undangan_id',
	fields: [
		// undangan-ajb-detail
		{ name: 'hgbajb_undangan_id', type: 'int' },
		{ name: 'hgbajb_id', type: 'int' },
		{ name: 'unit_id', type: 'int' },
		{ name: 'buktipemilik_id', type: 'int' },
		{ name: 'respon_undanganajb_id', type: 'int' },
		{ name: 'respon', type: 'string' },
		{ name: 'undangan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'janjian_ajb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'email_1_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'email_2_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'email_3_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'email_4_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'surat_1_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'surat_2_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'surat_3_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'surat_4_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'wa_1_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'wa_2_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'wa_3_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'wa_4_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'email_1_status', type: 'int' },
		{ name: 'email_2_status', type: 'int' },
		{ name: 'email_3_status', type: 'int' },
		{ name: 'email_4_status', type: 'int' },
		{ name: 'surat_1_status', type: 'int' },
		{ name: 'surat_2_status', type: 'int' },
		{ name: 'surat_3_status', type: 'int' },
		{ name: 'surat_4_status', type: 'int' },
		{ name: 'wa_1_status', type: 'int' },
		{ name: 'wa_2_status', type: 'int' },
		{ name: 'wa_3_status', type: 'int' },
		{ name: 'wa_4_status', type: 'int' },
		{ name: 'wa_1_keterangan', type: 'string' },
		{ name: 'wa_2_keterangan', type: 'string' },
		{ name: 'wa_3_keterangan', type: 'string' },
		{ name: 'wa_4_keterangan', type: 'string' },
		{ name: 'description_undangan', type: 'string' },
		{ name: 'is_got_email', type: 'int' },
		{ name: 'isGotEmail', type: 'string' },
		{ name: 'nomor_undangan', type: 'string' },
		{ name: 'jam_janjian_ajb', type: 'time' },

	]
});