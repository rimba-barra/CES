<?php

class Erems_Models_Pengalihanhak extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_changeownership';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function pengalihanhakRead($param) {
//        $return['success'] = false;
//        if (is_array($param) && count($param)) {
//            try {
//                $resultcount = $this->execSP('sp_changeownership_count',
//									$param['changeownership_id'],
//									$param['purchaseletter_id'],
//									$param['cluster_id'],
//									$param['block_id'],
//									// $param['kavling_number_start'],
//									// $param['kavling_number_end'],
//									$param['unit_number'],
//									$param['customer_name'],
//									$param['changeownershipreason_id'],
//									$param['changeownership_startdate'],
//									$param['changeownership_enddate'],
//									$param['description'],
//									$this->session->getCurrentProjectId(),
//									$this->session->getCurrentPtId()
//								);
//
//                $resultdata = $this->execSP('sp_changeownership_read',
//									$param['changeownership_id'],
//									$param['purchaseletter_id'],
//									$param['cluster_id'],
//									$param['block_id'],
//									// $param['kavling_number_start'],
//									// $param['kavling_number_end'],
//									$param['unit_number'],
//									$param['customer_name'],
//									$param['changeownershipreason_id'],
//									$param['changeownership_startdate'],
//									$param['changeownership_enddate'],
//									$param['description'],
//									$this->session->getCurrentProjectId(),
//									$this->session->getCurrentPtId(),
//									$param['start'],
//									$param['limit']
//								);
//
//                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
//                $return['data'] = $resultdata;
//                $return['success'] = true;
//            } catch (Exception $e) {
//                var_dump($e->getMessage());
//            }
//        }
//        return $return;
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $param['changeownership_id'],
                                $param['purchaseletter_id'],
                                $param['cluster_id'],
                                $param['block_id'],
                                // $param['kavling_number_start'],
                                // $param['kavling_number_end'],
                                $param['unit_number'],
                                $param['customer_name'],
                                $param['changeownershipreason_id'],
                                $param['changeownership_startdate'],
                                $param['changeownership_enddate'],
                                $param['description'],
                                $this->session->getCurrentProjectId(),
                                $this->session->getCurrentPtId(),
                                '0',
                                $param['start'],
                                $param['limit'],
                                $param['page']
                        );
                        $result = $this->execSP3('sp_changeownership_new_read', $data);
                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[1];
                        $return['success'] = true;
                } catch(Exception $e) { }
        }
        return $return;
    }

    function pengalihanhakCreate($param = array()) {
        $return['success'] = false;

        //added by anas 12032021
        $return['msg'] = '';
    	//endded anas
        if (is_array($param) && count($param)) {
            try {

        		//added by anas 12032021
            	if(isset($param['changeownershipreason_id']) == false){
            		$return['msg'] = "Invalid New Ownership Reason Change";
            	}
            	else if(isset($param['city_id'])  == false){
            		$return['msg'] = "Invalid City";
            	}
            	else if(isset($param['changeownershipreason_id_01'])  == false){
            		$return['msg'] = "Invalid Purchase Letter Reason Change";
            	}
            	else if(isset($param['purposebuy_id'])  == false){
            		$return['msg'] = "Invalid Purpose Buy";
            	}
            	else{
            		//// added by Erwin.st 180722
		            $ParameterDao = new Erems_Models_Master_ParameterDao;
		            $hasil        = $ParameterDao->get_parameter(array('projectid' => $this->session->getCurrentProjectId(), 'ptid' => $this->session->getCurrentPtId(), 'parametername' => 'AUTO_CREATE_CUSTOMER_PENGALIHANHAK'));

		            $parameter_autocreatecustomer = $hasil['success'] && isset($hasil['total']) && $hasil['total'] > 0 ? 1 : 0;

	                $affectedRow = $this->execSP('sp_changeownership_create',
						$param['purchaseletter_id'],
						'',
						$param['changeownershipreason_id'],
						$param['description'],
						($param['changeownership_date'] ? $param['changeownership_date'] : NULL),
						$param['biaya'],
						$param['ktp'],
						$param['name'],
						$param['address'],
						$param['telephone'],
						$param['mobilephone'],
						$param['city_id'],
						$param['njop'],
						$param['changeownership_status'],
						$param['pph_final'],
						$param['pelaporan_pajak'],
						$param['harga_real_transaksi'],
						($param['changeownership_pelaksanaan_date'] ? $param['changeownership_pelaksanaan_date'] : NULL),
						$param['penjual_ktp_suami'],
						$param['penjual_ktp_istri'],
						$param['penjual_ksk_kk'],
						$param['penjual_ganti_nama'],
						$param['penjual_sk_wni'],
						$param['penjual_akta_nikah'],
						$param['penjual_akta_cerai'],
						$param['penjual_akta_kematian'],
						$param['penjual_akta_waris'],
						$param['penjual_akta_npwp'],
						$param['penjual_sk_belum_nikah'],
						$param['penjual_spt_asli'],
						$param['penjual_sppjb_asli'],
						$param['penjual_bast_asli'],
						$param['penjual_skl_asli'],
						$param['penjual_lain_lain'],
						$param['penjual_lain_lain_keterangan'],
						$param['penjual_pbb'],
						$param['penjual_pbb_keterangan'],
						$param['penjual_printout_pbb'],
						$param['penjual_retribusi'],
						$param['penjual_retribusi_keterangan'],
						$param['penjual_kuitansi_asli'],
						$param['penjual_kuitansi_asli_keterangan'],
						$param['penjual_pinjam_pakai'],
						$param['penjual_sertifikat'],
						$param['penjual_ijb'],
						$param['penjual_ajb'],
						$param['penjual_surat_kuasa'],
						$param['pembeli_ktp_suami'],
						$param['pembeli_ktp_istri'],
						$param['pembeli_ksk_kk'],
						$param['pembeli_ganti_nama'],
						$param['pembeli_sk_wni'],
						$param['pembeli_akta_nikah'],
						$param['pembeli_akta_cerai'],
						$param['pembeli_npwp'],
						$param['pembeli_akta_kematian'],
						$param['pembeli_akta_waris'],
						$param['pembeli_sk_belum_menikah'],
						$param['pembeli_lain_lain'],
						$param['pembeli_lain_lain_keterangan'],
						$param['pembeli_catatan'],
						$param['penjual_nama'],
						$param['penjual_alamat'],
						$param['penjual_kota'],
						$param['penjual_telpon'],
						$param['pembeli_nama'],
						$param['pembeli_alamat'],
						$param['pembeli_kota'],
						$param['pembeli_telpon'],
						$param['menyerahkan_nama'],
						$param['menyerahkan_selaku'],
						$param['menyerahkan_telpon'],
						($param['penerima_date'] ? $param['penerima_date'] : NULL),
						$param['penerima_name'],
						($param['pembuat_ph_date'] ? $param['pembuat_ph_date'] : NULL),
						$param['pembuat_ph_name'],
						($param['pelaksana_ph_date'] ? $param['pelaksana_ph_date'] : NULL),
						$param['pelaksana_ph_name'],
						($param['pemeriksa_ph_date'] ? $param['pemeriksa_ph_date'] : NULL),
						$param['pemeriksa_ph_name'],
						$param['ppjb_penegasan'],
						$this->session->getUserId(),
						'1',
						$param['nomor_setor_pajak'],
                        $param['nomor_kuasa'],
                        $param['nama_notaris'],
                        ($param['tanggal_akta'] ? $param['tanggal_akta'] : NULL),
                        ($param['plan_changeownership_date'] ? $param['plan_changeownership_date'] : NULL),
                        $param['npwp_no'],
                        $param['email'],
                        $param['birthplace'],
						($param['birthdate'] ? $param['birthdate'] : NULL),
						$param['pekerjaan'],
						$param['sumber_dana'],
						$param['fax'],
						$param['is_badan_hukum'],
						$param['customer_name_badan_hukum'],
						$param['changeownershipreason_id_01'],
						$param['purposebuy_id'],
						$param['parametersppjb_id'],
						$param['nama_suami_istri'],
						$parameter_autocreatecustomer,
						$param['ktp_address'],
						$param['file_ktp_name'],
						$param['koresponden_rt'],
						$param['koresponden_rw'],
						$param['koresponden_kelurahan'],
						$param['koresponden_kecamatan'],
						$param['koresponden_city_id'],
						$param['koresponden_province_id'],
						$param['koresponden_zipcode'],
						$param['ktp_rt'],
						$param['ktp_rw'],
						$param['ktp_kelurahan'],
						$param['ktp_kecamatan'],
						$param['ktp_city_id'],
						$param['ktp_province_id'],
						$param['ktp_zipcode'],
						$param['alamat_surat_menyurat'],
						$param['porsi_kepemilikkan']
    				);
	                $return['success'] = (bool) $affectedRow;
	            }
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function pengalihanhakUpdate($param = array()) {
        $return['success'] = false;

        //added by anas 12032021
        $return['msg'] = '';
        //end added anas
        if (is_array($param) && count($param)) {
            try {

		        //added by anas 12032021
            	if(isset($param['changeownershipreason_id']) == false){
            		$return['msg'] = "Invalid New Ownership Reason Change";
            	}
            	else if(isset($param['city_id'])  == false){
            		$return['msg'] = "Invalid City";
            	}
            	else if(isset($param['changeownershipreason_id_01'])  == false){
            		$return['msg'] = "Invalid Purchase Letter Reason Change";
            	}
            	else if(isset($param['purposebuy_id'])  == false){
            		$return['msg'] = "Invalid Purpose Buy";
            	}
            	else{
	                $affectedRow = $this->execSP('sp_changeownership_update',
						$param['changeownership_id'],
						$param['purchaseletter_id'],
						$param['changeownership_no'],
						$param['changeownershipreason_id'],
						$param['description'],
						$param['changeownership_date'],
						$param['biaya'],
						$param['ktp'],
						$param['name'],
						$param['address'],
						$param['telephone'],
						$param['mobilephone'],
						$param['city_id'],
						$param['njop'],
						$param['changeownership_status'],
						$param['pph_final'],
						$param['pelaporan_pajak'],
						$param['harga_real_transaksi'],
						($param['changeownership_pelaksanaan_date'] ? $param['changeownership_pelaksanaan_date'] : NULL),
						$param['penjual_ktp_suami'],
						$param['penjual_ktp_istri'],
						$param['penjual_ksk_kk'],
						$param['penjual_ganti_nama'],
						$param['penjual_sk_wni'],
						$param['penjual_akta_nikah'],
						$param['penjual_akta_cerai'],
						$param['penjual_akta_kematian'],
						$param['penjual_akta_waris'],
						$param['penjual_akta_npwp'],
						$param['penjual_sk_belum_nikah'],
						$param['penjual_spt_asli'],
						$param['penjual_sppjb_asli'],
						$param['penjual_bast_asli'],
						$param['penjual_skl_asli'],
						$param['penjual_lain_lain'],
						$param['penjual_lain_lain_keterangan'],
						$param['penjual_pbb'],
						$param['penjual_pbb_keterangan'],
						$param['penjual_printout_pbb'],
						$param['penjual_retribusi'],
						$param['penjual_retribusi_keterangan'],
						$param['penjual_kuitansi_asli'],
						$param['penjual_kuitansi_asli_keterangan'],
						$param['penjual_pinjam_pakai'],
						$param['penjual_sertifikat'],
						$param['penjual_ijb'],
						$param['penjual_ajb'],
						$param['penjual_surat_kuasa'],
						$param['pembeli_ktp_suami'],
						$param['pembeli_ktp_istri'],
						$param['pembeli_ksk_kk'],
						$param['pembeli_ganti_nama'],
						$param['pembeli_sk_wni'],
						$param['pembeli_akta_nikah'],
						$param['pembeli_akta_cerai'],
						$param['pembeli_npwp'],
						$param['pembeli_akta_kematian'],
						$param['pembeli_akta_waris'],
						$param['pembeli_sk_belum_menikah'],
						$param['pembeli_lain_lain'],
						$param['pembeli_lain_lain_keterangan'],
						$param['pembeli_catatan'],
						$param['penjual_nama'],
						$param['penjual_alamat'],
						$param['penjual_kota'],
						$param['penjual_telpon'],
						$param['pembeli_nama'],
						$param['pembeli_alamat'],
						$param['pembeli_kota'],
						$param['pembeli_telpon'],
						$param['menyerahkan_nama'],
						$param['menyerahkan_selaku'],
						$param['menyerahkan_telpon'],
						($param['penerima_date'] ? $param['penerima_date'] : NULL),
						$param['penerima_name'],
						($param['pembuat_ph_date'] ? $param['pembuat_ph_date'] : NULL),
						$param['pembuat_ph_name'],
						($param['pelaksana_ph_date'] ? $param['pelaksana_ph_date'] : NULL),
						$param['pelaksana_ph_name'],
						($param['pemeriksa_ph_date'] ? $param['pemeriksa_ph_date'] : NULL),
						$param['pemeriksa_ph_name'],
						$param['ppjb_penegasan'],
						$this->session->getUserId(),
						'1',
						$param['nomor_setor_pajak'],
						$param['nomor_kuasa'],
						$param['nama_notaris'],
						($param['tanggal_akta'] ? $param['tanggal_akta'] : NULL),
						($param['plan_changeownership_date'] ? $param['plan_changeownership_date'] : NULL),
						$param['npwp_no'],
						$param['email'],
						$param['birthplace'],
						($param['birthdate'] ? $param['birthdate'] : NULL),
						$param['pekerjaan'],
						$param['sumber_dana'],
						$param['fax'],
						$param['is_badan_hukum'],
						$param['customer_name_badan_hukum'],
						$param['changeownershipreason_id_01'],
						$param['purposebuy_id'],
						$param['parametersppjb_id'],
						$param['nama_suami_istri'],
						$param['ktp_address'],
						$param['koresponden_rt'],
						$param['koresponden_rw'],
						$param['koresponden_kelurahan'],
						$param['koresponden_kecamatan'],
						$param['koresponden_city_id'],
						$param['koresponden_province_id'],
						$param['koresponden_zipcode'],
						$param['ktp_rt'],
						$param['ktp_rw'],
						$param['ktp_kelurahan'],
						$param['ktp_kecamatan'],
						$param['ktp_city_id'],
						$param['ktp_province_id'],
						$param['ktp_zipcode'],
						$param['alamat_surat_menyurat'],
						$param['porsi_kepemilikkan']
    				);
	                $return['success'] = (bool) $affectedRow;
	            }
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function pengalihanhakDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'changeownership_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_changeownership_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {

            }
        }
        return $return;
    }

	function pengalihanhakprinoutRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_changeownership_printout_read',
					$param['changeownership_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$return['data'] = $result;
				$return['success'] = true;
			} catch(Exception $e) { }
		}
		return $return;
    }

    function exportData($param) {
        $return['success'] = false;

        if (is_array($param) && count($param))
        {
//                var_dump($param);
                try {

                        $sp_name = 'sp_changeownership_new_read';

                        $data = array (
                                 '0',
                                '0',
                                '0',
                                '0',
                                // $param['kavling_number_start'],
                                // $param['kavling_number_end'],
                                '',
                                '',
                                '0',
                                '',
                                '',
                                '',
                                $this->session->getCurrentProjectId(),
                                $this->session->getCurrentPtId(),
                                '1',
                                '1',
                                '0',
                                $param['page']=>1
                        );


                        $result = $this->execSP3($sp_name, $data);

                        $return['data'] = $result;
                        $return['success'] = true;
                } catch(Exception $e) { }
        }
        return $return;
    }

}

?>
