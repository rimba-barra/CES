Ext.define('Erems.model.Bankkpr', {
	extend: 'Ext.data.Model',
	alias: 'model.bankkprmodel',
	idProperty: 'purchaseletter_bankkpr_id',
	fields: [
		{ name: 'purchaseletter_bankkpr_id', type: 'int' },
		{ name: 'purchaseletter_id', type: 'int' },

		{ name: 'bank_id', type: 'int' },
		{ name: 'bank_createdby', type: 'int' },

		{ name: 'appraisalplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'appraisal_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'appraisal_createdby', type: 'int' },

		{ name: 'berkasmasuk_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'berkasbank_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'berkasbank_createdby', type: 'int' },

		{ name: 'interviewplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'interview_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'interview_createdby', type: 'int' },
		{ name: 'interview_pic', type: 'string' },

		{ name: 'kpr_acc_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'kpr_realisation', type: 'decimal' },
		{ name: 'kpr_tenor', type: 'int' },
		{ name: 'kpr_interest', type: 'decimal' },
		{ name: 'kpr_cicilan', type: 'decimal' },
		{ name: 'kpr_createdby', type: 'int' },
		{ name: 'debitur_name', type: 'string' },

		{ name: 'rejected_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'nextprocess_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'reject_createdby', type: 'int' },

		{ name: 'akadplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'akad_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'akad_createdby', type: 'int' },

		{ name: 'is_use', type: 'boolean' },
		{ name: 'is_rencana_kpr', type: 'boolean' },
		{ name: 'note', type: 'string' },

		{ name: 'bank_name', type: 'string' },
		{ name: 'bank_company_name', type: 'string' },

		{ name: 'bank_createdby_name', type: 'string' },
		{ name: 'appraisal_createdby_name', type: 'string' },
		{ name: 'berkasbank_createdby_name', type: 'string' },
		{ name: 'interview_createdby_name', type: 'string' },
		{ name: 'kpr_createdby_name', type: 'string' },
		{ name: 'reject_createdby_name', type: 'string' },
		{ name: 'akad_createdby_name', type: 'string' },

		{ name: 'is_bayarpajak', type: 'boolean' },
		{ name: 'pajak_amount', type: 'decimal' },
		{ name: 'data_akad', type: 'auto' },
		{ name: 'temp_id_detail', type: 'string' },
		{ name: 'is_print_lunas_dp', type: 'int' },
		{ name: 'print_lunas_dp_no', type: 'string' },

		{ name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'addby', type: 'int' },
		{ name: 'deleted', type: 'boolean' }
		
		//added by anas 21062021
		,
		{ name: 'no_sppk', type: 'string' },
		// added by rico 06042022
		{ name: 'admin_fee_kpr', type: 'decimal' },
		// added by rico 21042022
		{ name: 'is_cair_fee_kpr', type: 'boolean' },
		{ name: 'tanggal_cair_fee_kpr', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
		{ name: 'notes_fee_kpr', type: 'string' },
		
		// added by rico 12072023
		{ name: 'nomor_konfirmasi_tunggakan_bank', type: 'string' },
		{ name: 'tanggal_konfirmasi_tunggakan', type: 'date', dateFormat: 'Y-m-d' },
		{ name: 'lama_tunggakan_konfirmasi_tunggakan', type: 'int' },

		{ name: 'nomor_konfirmasi_tunggakan_bank_2', type: 'string' },
		{ name: 'tanggal_konfirmasi_tunggakan_2', type: 'date', dateFormat: 'Y-m-d' },
		{ name: 'lama_tunggakan_konfirmasi_tunggakan_2', type: 'int' },

		{ name: 'nomor_konfirmasi_tunggakan_bank_3', type: 'string' },
		{ name: 'tanggal_konfirmasi_tunggakan_3', type: 'date', dateFormat: 'Y-m-d' },
		{ name: 'lama_tunggakan_konfirmasi_tunggakan_3', type: 'int' },

		{ name: 'nomor_surat_pemberitahuan_buyback_bank', type: 'string' },
		{ name: 'tanggal_surat_pemberitahuan_buyback', type: 'date', dateFormat: 'Y-m-d' },
		{ name: 'is_print_buyback', type: 'int' },
		{ name: 'lama_tunggakan_surat_pemberitahuan_buyback', type: 'int' },

		{ name: 'collector_buyback_id', type: 'int' },
		{ name: 'collector_phone', type: 'string' },
		{ name: 'nama_pic_bank', type: 'string' },
		{ name: 'email_pic_bank', type: 'string' },
		{ name: 'phone_pic_bank', type: 'string' },
		{ name: 'alamat_bank', type: 'string' },
	]
});