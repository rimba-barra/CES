Ext.define('Erems.model.Hgbajb', {
	extend: 'Ext.data.Model',
	alias: 'model.hgbajbmodel',
	idProperty: 'hgbajb_id',
	fields: [
		// td_hgbajb -- detail
		{name: 'is_hgbajb_detail', type: 'string'},
		{name: 'hgbajb_id', type: 'int'},
		{name: 'hgbajb_buktipemilik_id', type: 'int'},
		{name: 'hgbinduk_id', type: 'int'},
		{name: 'hgbinduk', type: 'string'},
		{name: 'ajb_name', type: 'string'},
		{name: 'ajb_sign_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_notaris_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_number', type: 'string'},
		{name: 'ajb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'notaris_id', type: 'int'},
		{name: 'notaris_ajb', type: 'string'},
		{name: 'ajb_skmht_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_apht_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_tocustomer_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_tocontractor_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_number', type: 'string'},
		{name: 'hgb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_gsgu_no', type: 'string'},
		{name: 'hgb_gsgu_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_gsgu_luas', type: 'decimal'},
		{name: 'hgb_tocustomer_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_tocontractor_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pt_hgb_no', type: 'string'},
		{name: 'pt_hgb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pt_gsgu_no', type: 'string'},
		{name: 'pt_gsgu_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pt_luas', type: 'decimal'},
		{name: 'pt_id', type: 'int'},
		{name: 'pt_hgb_name', type: 'string'},
		{name: 'note', type: 'string'},
		{name: 'temp_buktipemilik_id', type: 'string'},

		{name: 'ajb_legal_tonotaris_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_notaris_tolegal_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ajb_legal_toperijinan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_perijinan_tolegal_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_legal_toperijinan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_shm_perijinan_tolegal_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_notaris_tobank_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_target_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_hm_no', type: 'string'},
		{name: 'hgb_hm_tocustomer_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hgb_nop', type: 'string'},

		{name: 'ajb_is_status_balik_nama', type: 'boolean'},
		{name: 'ajb_balik_nama_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},

		{name: 'hgb_gsgu_land_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},

		{name: 'kelengkapan_berkas_ajb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},

		{name: 'girik_id', type: 'int'},

		{name: 'akta_no_sh1', type: 'string'},
		{name: 'akta_date_sh1', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'notaris_id_sh1', type: 'int'},

		{name: 'tgl_terbit_pt', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'tgl_berakhir_pt', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'tgl_terima_pt', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'tgl_keluar_pt', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'posisi_pt', type: 'string'},
		{name: 'kelurahan_pt', type: 'string'},

		//start addby: Fatkur, addon: 22/7/19
		{name: 'hpl_no_gs', type: 'string'},
		{name: 'hpl_luas', type: 'decimal'},
		{name: 'hpl_skpt_no', type: 'string'},
		{name: 'hpl_kelurahan', type: 'string'},
		{name: 'hpl_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hpl_terima_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hpl_keluar_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'hpl_akhir_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		//end
		{name: 'ajb_validasipphselesai_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		/* Add by RH 06/06/2020 */
		{name: 'pt_hgb_nib', type: 'string'},
		/* END Add by RH 06/06/2020 */
		// added by rico 09122021
		{name: 'lunas_notaris', type: 'int'},
		{name: 'hgbajb_unit_id', type: 'int'},
	]
});