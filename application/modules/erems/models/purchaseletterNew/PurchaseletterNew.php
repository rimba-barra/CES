<?php
class Erems_Models_PurchaseletterNew_PurchaseletterNew extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletterNew';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function purchaseLetterRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				if($param['is_draft']) $param['deleted'] = 1;
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['page'],
					$param['limit'],
					$param['purchaseletter_no'],
					$param['customer_name'],
					$param['unit_number'],
					$param['salesman'],
					$param['purchase_date_bot'],
					$param['purchase_date_top'],
					$param['unit_virtualaccount_bca'],
					$param['unit_virtualaccount_mandiri'],
					$param['is_draft'],
					$param['deleted']
				);

				$result = $this->execSP3('sp_purchaseletternew_read', $data);

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }
	
    function purchaseLetterCreate($param = array()) {
        $return['success'] = false;
        $param = json_decode($param,1);
        $checkValid = $this->purchaseletterValidator($param);
		$purchaseletter_id             = isset($param['purchaseletter_id']) ? $param['purchaseletter_id']:0;

        if($checkValid['status']){
			if (is_array($param) && count($param))
			{
				try {
					$pl_no = $this->generateNomorDokumen($param);
		            $sp_exec = 'sp_purchaseletternew_create';
		            $status_pl = Erems_Box_Config::UNITSTATUS_SOLD;
		            $paramdetail = $param['dataSchedule'];
		            $paramkomisi = $param['dataKomisi'];

					$param['billingrules_term_tandajadi'] = 0;
					$param['billingrules_tandajadi']      = 0;
					$param['billingrules_term_uangmuka']  = 0;
					$param['billingrules_uangmuka']       = 0;
					$param['billingrules_term_angsuran']  = 0;
					$param['billingrules_angsuran']       = 0;
					$param['upline_upline_id']    		  = 0;
					$param['cac_cac_id']	    		  = 0;
					$param['clubcitra_id']	    		  = 0;
					$param['salesman_id']		    	  = 0;

					$param['downline_id']      = 0;
					$param['keterangan_bayar'] = '';
					$param['keterangan_1']     = '';
					$param['keterangan_2']     = '';
					$param['keterangan_3']     = '';
					$param['house_advisor']    = '';
					$param['manager']          = '';
					$param['hs_keuangan']      = '';
					
					if(isset($param['is_draft'])){
						if($param['is_draft']){
				            $status_pl = 11;
				            $pl_no = null;
				        }
			        }
					
					$purchaseletter_detail_schedule_id                = '';
					$purchaseletter_detail_scheduletype_id            = '';
					$purchaseletter_detail_termin                     = '';
					$purchaseletter_detail_duedate                    = '';
					$purchaseletter_detail_amount                     = '';
					$purchaseletter_detail_sourcemoney_sourcemoney_id = '';
					$purchaseletter_detail_persentase_npv             = '';

					// detail Schedule
					if (is_array($paramdetail) && count($paramdetail) > 0) {
	                    foreach ($paramdetail as $idx => $data) {
	                    	if($data['scheduletype_scheduletype_id'] == 4){
	                    		$param['billingrules_term_tandajadi']++;
	                    		$param['billingrules_tandajadi'] += floatval($data['amount']);
	                    	}
	                    	if($data['scheduletype_scheduletype_id'] == 5){
	                    		$param['billingrules_term_uangmuka']++;
	                    		$param['billingrules_uangmuka'] += floatval($data['amount']);
	                    	}
	                    	if($data['scheduletype_scheduletype_id'] != 4 && $data['scheduletype_scheduletype_id'] != 5){
	                    		$param['billingrules_term_angsuran']++;
	                    		$param['billingrules_angsuran'] += floatval($data['amount']);
	                    	}

	                        foreach ($data as $key => $value) {
	                            switch ($key) {
	                                case 'schedule_id' : $purchaseletter_detail_schedule_id .= $value . "~";
	                                    break;
									case 'scheduletype_scheduletype_id' : $purchaseletter_detail_scheduletype_id .= $value ."~";
										break;
									case 'termin' : $purchaseletter_detail_termin .= $value ."~";
										break;
									case 'duedate' : $purchaseletter_detail_duedate .= $value ."~";
										break;
									case 'amount' : $purchaseletter_detail_amount .= $value ."~";
										break;
									case 'sourcemoney_sourcemoneyid' : $purchaseletter_detail_sourcemoney_sourcemoney_id .= $value ."~";
										break;
									case 'persentase_npv' : $purchaseletter_detail_persentase_npv .= $value ."~";
										break;
	                            }
	                        }
	                    };

						$purchaseletter_detail_schedule_id                = preg_replace('/(~)$/', '', $purchaseletter_detail_schedule_id);
						$purchaseletter_detail_scheduletype_id            = preg_replace('/(~)$/', '', $purchaseletter_detail_scheduletype_id);
						$purchaseletter_detail_termin                     = preg_replace('/(~)$/', '', $purchaseletter_detail_termin);
						$purchaseletter_detail_duedate                    = preg_replace('/(~)$/', '', $purchaseletter_detail_duedate);
						$purchaseletter_detail_amount                     = preg_replace('/(~)$/', '', $purchaseletter_detail_amount);
						$purchaseletter_detail_sourcemoney_sourcemoney_id = preg_replace('/(~)$/', '', $purchaseletter_detail_sourcemoney_sourcemoney_id);
						$purchaseletter_detail_persentase_npv			  = preg_replace('/(~)$/', '', $purchaseletter_detail_persentase_npv);
	                }

					$purchaseletter_detail_komisi_penerima_id = '';
					$purchaseletter_detail_komisi_persen_nominal = '';
					$purchaseletter_detail_komisi_value = '';
					$purchaseletter_detail_populated_data = '';
					$purchaseletter_detail_reff_id = '';
					$purchaseletter_detail_reff_value = '';
					$purchaseletter_detail_reff_name = '';
					$purchaseletter_detail_npwp = '';

					// detail komisi
					if (is_array($paramkomisi) && count($paramkomisi) > 0) {
	                    foreach ($paramkomisi as $idx => $data) {
	                        foreach ($data as $key => $value) {
	                            switch ($key) {
	                                case 'komisi_penerima_id' : 
	                                	$purchaseletter_detail_komisi_penerima_id .= $value . "~";
	                                    break;
	                                case 'komisi_value' : $purchaseletter_detail_komisi_value .= $value . "~";
	                                    break;
	                                case 'populated_data' : 
	                                	$purchaseletter_detail_populated_data .= $value . "~";
	                                	switch($value){
	                                		case 'kode_kc':
	                                			$param['upline_upline_id'] = $data['reff_id'];
	                                			break;
	                                		case 'member':
	                                			$param['cac_cac_id'] = $data['reff_id'];
	                                			break;
	                                		case 'CC':
	                                			$param['clubcitra_id'] = $data['reff_id'];
	                                			break;
	                                		case 'salesman':
	                                			$param['salesman_id'] = $data['reff_id'];
	                                			break;
	                                		default:
	                                			break;	
	                                	}

	                                	if($value != 'freetext'){
	                                		$purchaseletter_detail_reff_value .= $data['reff_id'] . "~";
	                                		$purchaseletter_detail_reff_id .= $data['reff_id'] . "~";
	                                	}
	                                	else{
	                                		$purchaseletter_detail_reff_value .= "~";
	                                		$purchaseletter_detail_reff_id .= "~";
	                                	}
	                                    break;
	                                // case 'reff_id' : 
	                                // 	$purchaseletter_detail_reff_id .= $value . "~";
	                                //     break;
	                                // case 'reff_value' : $purchaseletter_detail_reff_value .= $value . "~";
	                                //     break;
	                                case 'reff_name' : $purchaseletter_detail_reff_name .= $value . "~";
	                                    break;
	                                case 'npwp' : $purchaseletter_detail_npwp .= $value . "~";
	                                    break;
	                                case 'komisi_persen_nominal' : $purchaseletter_detail_komisi_persen_nominal .= $value . "~";
	                                	break;
	                            }
	                        }
	                    };

						$purchaseletter_detail_komisi_penerima_id    = preg_replace('/(~)$/', '', $purchaseletter_detail_komisi_penerima_id);
						$purchaseletter_detail_komisi_persen_nominal = preg_replace('/(~)$/', '', $purchaseletter_detail_komisi_persen_nominal);
						$purchaseletter_detail_komisi_value          = preg_replace('/(~)$/', '', $purchaseletter_detail_komisi_value);
						$purchaseletter_detail_populated_data        = preg_replace('/(~)$/', '', $purchaseletter_detail_populated_data);
						$purchaseletter_detail_reff_id               = preg_replace('/(~)$/', '', $purchaseletter_detail_reff_id);
						$purchaseletter_detail_reff_value            = preg_replace('/(~)$/', '', $purchaseletter_detail_reff_value);
						$purchaseletter_detail_reff_name             = preg_replace('/(~)$/', '', $purchaseletter_detail_reff_name);
						$purchaseletter_detail_npwp                  = preg_replace('/(~)$/', '', $purchaseletter_detail_npwp);
	                }
					$data = array(
						$purchaseletter_id,
						$this->session->getUserId(),
						$status_pl, 
						$pl_no,
						date('Y-m-d', strtotime($param['purchase_date'])), 
						$param['unit_unit_id'], 
						$param['salesman_id'],//diganti sama salsesnya iki//$pl->getSalesman()->getId() 
						$param['customer_customer_id'], 
						$param['pricetype_id'], 
						isset($param['bank_bank_id'])?$param['bank_bank_id']:0, 
						$param['price_tanahpermeter'],
						$param['price_bangunanpermeter'],
						0,//di tabel ada, tapi di form ga ada//$price->getKelebihan(), 
						$param['price_harga_tanah'],
						0,//di tabel ada, tapi di form ga ada//$price->getTotalKelebihan(), 
						$param['price_harga_bangunan'], 
						$param['price_harga_jualdasar'],
						$param['price_persen_dischargadasar'],
						$param['price_harga_dischargadasar'],
						$param['price_persen_dischargatanah'],
						$param['price_harga_dischargatanah'],
						$param['price_persen_dischargabangunan'],
						$param['price_harga_dischargabangunan'],
						$param['price_harga_neto'],//$price->getNetto(), 
						$param['price_persen_ppntanah'],//$price->getPpnTanah(), 
						$param['price_harga_ppntanah'],//$price->getAfterPpnTanah(), 
						$param['price_persen_ppnbangunan'],//$price->getPpnBangunan(),
						$param['price_harga_ppnbangunan'],//$price->getAfterPpnBangunan(),
						$param['price_persen_ppnbm'],//$price->getPpnbm(),
						$param['price_harga_ppnbm'],//$price->getAfterPpnbm(),
						$param['price_persen_pph22'],//$price->getPph22(),
						$param['price_harga_pph22'],//$price->getAfterPph22(),
						$param['price_harga_bbnsertifikat'],//$price->getBbnSertifikat(), 
						$param['price_harga_bphtb'],//$price->getBphtb(), 
						$param['price_harga_bajb'],//$price->getBajb(), 
						$param['biaya_administrasi'],//$pa->getPrice(), 
						$param['biaya_admsubsidi'],//$pa->getSubsidi(), 
						$param['biaya_pmutu'],//$pa->getPMutu(), 
						$param['biaya_paket_tambahan'],//$pa->getPaketTambahan(), 
						$param['price_harga_jual'],//$price->getJual(), 
						$param['persen_salesdisc'],//$pa->getDiskon(), 
						$param['harga_salesdisc'],//$pa->getPriceDiskon(), 
						$param['harga_total_jual'],//$pl->getTotal(), 
						$purchaseletter_detail_schedule_id, 
						$purchaseletter_detail_scheduletype_id, 
						$purchaseletter_detail_termin, 
						$purchaseletter_detail_duedate, 
						$purchaseletter_detail_amount,
						$purchaseletter_detail_sourcemoney_sourcemoney_id,
						$purchaseletter_detail_persentase_npv,
						0,// di tabel ada, tapi di form ga ada $param['billingrules_billingrules_id'], //$pl->getBilling()->getId(), 
						$param['billingrules_term_tandajadi'],// $pl->getBilling()->getTandaJadi()->getQuantity(), 
						$param['billingrules_tandajadi'],// $pl->getBilling()->getTandaJadi()->getAmount(), 
						$param['billingrules_term_uangmuka'],// $pl->getBilling()->getUangMuka()->getQuantity(), 
						$param['billingrules_uangmuka'],// $pl->getBilling()->getUangMuka()->getAmount(), 
						$param['billingrules_term_angsuran'],// $pl->getBilling()->getAngsuran()->getQuantity(),      
						$param['billingrules_angsuran'],//$pl->getBilling()->getAngsuran()->getAmount(), 
						'',// di tabel ada, tapi di form ga ada $param['clubcitra_member'],//$pl->getMemberName(), 
						$param['clubcitra_id'],//$pl->getClubCitra()->getId(), 
						$param['saleslocation_saleslocation_id'],//$pl->getSalesLocation()->getId(), 
						$param['mediapromotion_mediapromotion_id'],//$pl->getMediaPromotion()->getId(), 
						$param['rencana_serahterima'],//$pl->getRencanaSerahTerima(), 
						$param['rencana_serahterima_date'],//$pl->getRencanaSerahTerimaDate(),
						isset($param['collector_employee_id'])?$param['collector_employee_id']:0,//$pl->getCollector()->getId(), 
						$param['notes'],//$pl->getNotes(),
						0,// di tabel ada, tapi di form ga ada $param['kpp'],//$pl->getKpp(),
						$param['upline_upline_id'],//$pl->getUpline()->getId(),
						0,// di tabel ada, tapi di form ga ada $param['is_upline_referall'],//$pl->getIsUplineReferall(),
						$param['cac_cac_id'],//$pl->getCac()->getId(),
						0,// di tabel ada, tapi di form ga ada $param['is_cac_referall'],//$pl->getIsCacReferall(),
						$param['downline_id'],//$pl->getDownlineId(),
						$param['keterangan_bayar'],//$pl->getKeteranganBayar(),
						$param['keterangan_1'],//$pl->getKeterangan1(),
						$param['keterangan_2'],//$pl->getKeterangan2(),
						$param['keterangan_3'],//$pl->getKeterangan3(),
						$param['house_advisor'],//$pl->getHouseAdvisor(),
						$param['manager'],//$pl->getManager(),
						$param['hs_keuangan'],//$pl->getHsKeuangan(),
						$param['biaya_asuransi'],//$pl->getBiayaAsuransi(),
						$param['promo'],//$pl->getPromo(),
						isset($param['rewardsales_reward_id'])?$param['rewardsales_reward_id']:0,//$pl->getRewardSales()->getId(),
						isset($param['rewardcustomer_reward_id'])?$param['rewardcustomer_reward_id']:0,//$param['rewardcustomer_reward_id'],//$pl->getRewardCustomer()->getId(),
						isset($param['rewardtambahan_reward_id'])?$param['rewardtambahan_reward_id']:0,//$param['rewardtambahan_reward_id'],//$pl->getRewardTambahan()->getId(),
						isset($param['purposebuy_purposebuy_id'])?$param['purposebuy_purposebuy_id']:0,
						$param['harga_pembulatan'],//$pl->getHargaPembulatan(),
						$param['is_auto_sms'],//$pl->getIsAutoSms(),
						$param['is_not_allowed_sp'],//$pl->getIsNotAllowedSendSP(),
						$param['is_repeat_order'],//$pl->getIsRepeatOrder(),
						$param['unit_virtualaccount_bca'],//$pl->getVirtualaccountBca(),
						$param['unit_virtualaccount_mandiri'],//$pl->getVirtualaccountMandiri(),
						$param['periode_angsuran'],//$pl->getVirtualaccountBca(),
						$param['jenis_periode'],//$pl->getVirtualaccountMandiri(),
						$param['is_draft'],
						$param['deleted'],
						$purchaseletter_detail_komisi_penerima_id,
						$purchaseletter_detail_komisi_persen_nominal,
						$purchaseletter_detail_komisi_value,
						$purchaseletter_detail_populated_data,
						$purchaseletter_detail_reff_id,
						$purchaseletter_detail_reff_value,
						$purchaseletter_detail_reff_name,
						$purchaseletter_detail_npwp,
						$param['customer_name'],
						$param['customer_address'],
						isset($param['city_city_name'])?$param['city_city_name']:'',
						$param['customer_zipcode'],
						$param['customer_home_phone'],
						$param['customer_mobile_phone'],
						$param['customer_office_phone'],
						$param['customer_fax'],
						$param['customer_KTP_number'],
						$param['customer_KTP_address'],
						$param['customer_NPWP'],
						$param['customer_NPWP_address'],
						$param['customer_email'],
						$param['distribution_channel_id'],
						$param['komisi_pencairan_id'],
						$param['perhitungan_komisi_id'],
						$param['closing_fee'],
						$param['pricelist_id'],
						$param['koefisien_id']
					);

					if($purchaseletter_id)
					{
						$result = $this->execSP3('sp_purchaseletternew_update', $data);
					}
					else{
						$result = $this->execSP3($sp_exec, $data);
						$return['purchaseletter_id'] = $result[1][0]['purchaseletter_id'];
					}
					
					if(isset($param['is_draft'])){
						if(!$param['is_draft']){
					        if ($result[0]>0) {
								$param['purchaseletter_no'] = $pl_no;
					        	$this->setCounterNomorDokumen($param);
					        }
					    }
					}

					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;
				} catch(Exception $e) {
	                var_dump($e->getMessage());
	            }			
			}
		}
		else{
			$return['success_transaction'] = null;
			$return['msg'] = $checkValid['msg'];
			$return['others'] = null;
		}
		return $return;
    }

    function purchaseLetterDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'purchaseletter_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~'; }	}		
			try {
				$result = $this->execSP3('sp_purchaseletternew_destroy', $param[$key_name], $this->session->getUserId(), Erems_Box_Config::UNITSTATUS_STOCK);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) {
                var_dump($e->getMessage());
            }
		}
		return $return;
    }

    function unitOneRead($param) {
        $return['success'] = false;

        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_id']
				);
				$result = $this->execSP3('sp_unit_one_read', $data);		

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    function unitlistRead($param, $statusUnit) {
        $return['success'] = false;
        if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['page'], 
					$param['limit'],
					$param['unit_number'], //unit number
					0, //BLOCK NUMBER
					$statusUnit//Erems_Box_Config::UNITSTATUS_STOCK// 
				);
				$result = $this->execSP3('sp_purchaseletternew_unit_read', $data);

				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }
  //   function unitlistRead($param, $statusUnit) {
  //       $return['success'] = false;
  //       if (is_array($param) && count($param))
		// {
		// 	try {
		// 		$data = array (
		// 			$this->session->getCurrentProjectId(), 
		// 			$this->session->getCurrentPtId(),
		// 			// $param['start'],
		// 			$param['page'], 
		// 			$param['limit'],
		// 			Erems_Box_Config::UNITSTATUS_STOCK,
		// 			$param['unit_number'], //unit number
		// 			0, //BLOCK NUMBER
		// 			1
		// 		);

		// 		$result = $this->execSP3('sp_unitbsimpleb_read', $data);

		// 		$return['total'] = $result[0][0]['totalRow'];
		// 		$return['data'] = $result[1];			
		// 		$return['success'] = true;				
		// 	} catch(Exception $e) { 
  //               var_dump($e->getMessage());				
		// 	}
		// }		
		// return $return;
  //   }

    function customerlistRead($param) {
        $dataList = array( 
			array('mapping' => "customer.customer_id" ,'name' => "customer_id"),
			array('mapping' => "customer.code" ,'name' => "code"),
			array('mapping' => "customer.name" ,'name' => "name"),
			array('mapping' => "customer.address" ,'name' => "address"),
			array('mapping' => "customer.city_city_id" ,'name' => "city_city_id"),
			array('mapping' => "customer.zipcode" ,'name' => "zipcode"),
			array('mapping' => "customer.email" ,'name' => "email"),
			array('mapping' => "customer.fax" ,'name' => "fax"),
			array('mapping' => "customer.home_phone" ,'name' => "home_phone"),
			array('mapping' => "customer.office_phone" ,'name' => "office_phone"),
			array('mapping' => "customer.mobile_phone" ,'name' => "mobile_phone"),
			array('mapping' => "customer.birthplace" ,'name' => "birthplace"),
			array('mapping' => "customer.birthdate" ,'name' => "birthdate",'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.marital_status" ,'name' => "marital_status"),
			array('mapping' => "customer.nationality" ,'name' => "nationality"),
			array('mapping' => "customer.photo" ,'name' => "photo"),
			array('mapping' => "customer.description" ,'name' => "description"),
			array('mapping' => "customer.NPWP" ,'name' => "NPWP"),
			array('mapping' => "customer.children" ,'name' => "children"),
			array('mapping' => "customer.religion_religion_id" ,'name' => "religion_religion_id"),
			array('mapping' => "customer.purpose_purpose_id" ,'name' => "purpose_purpose_id"),
			array('mapping' => "customer.purposebuy_purposebuy_id" ,'name' => "purposebuy_purposebuy_id"),
			array('mapping' => "customer.education_education_id" ,'name' => "education_education_id"),
			array('mapping' => "customer.is_temporary" ,'name' => "is_temporary"),
			array('mapping' => "customer.NPWP_address" ,'name' => "NPWP_address"),
			array('mapping' => "customer.general_gelar" ,'name' => "general_gelar"),
			array('mapping' => "customer.general_virtualaccount_no" ,'name' => "general_virtualaccount_no"),
			array('mapping' => "customer.general_province_id" ,'name' => "general_province_id"),
			array('mapping' => "customer.general_kecamatan" ,'name' => "general_kecamatan"),
			array('mapping' => "customer.general_kelurahan" ,'name' => "general_kelurahan"),
			array('mapping' => "customer.general_rt" ,'name' => "general_rt"),
			array('mapping' => "customer.general_rw" ,'name' => "general_rw"),
			array('mapping' => "customer.general_kewarganegaraan" ,'name' => "general_kewarganegaraan"),
			array('mapping' => "customer.general_kodewna" ,'name' => "general_kodewna"),
			array('mapping' => "customer.general_pekerjaan" ,'name' => "general_pekerjaan"),
			array('mapping' => "customer.identitas_documenttype_id" ,'name' => "identitas_documenttype_id"),
			array('mapping' => "customer.identitas_no" ,'name' => "identitas_no"),
			array('mapping' => "customer.identitas_province_id" ,'name' => "identitas_province_id"),
			array('mapping' => "customer.identitas_city_id" ,'name' => "identitas_city_id"),
			array('mapping' => "customer.identitas_rt" ,'name' => "identitas_rt"),
			array('mapping' => "customer.identitas_rw" ,'name' => "identitas_rw"),
			array('mapping' => "customer.identitas_kecamatan" ,'name' => "identitas_kecamatan"),
			array('mapping' => "customer.identitas_kelurahan" ,'name' => "identitas_kelurahan"),
			array('mapping' => "customer.identitas_kodepos" ,'name' => "identitas_kodepos"),
			array('mapping' => "customer.ppatk_badanhukum" ,'name' => "ppatk_badanhukum"),
			array('mapping' => "customer.ppatk_bentukusaha_id" ,'name' => "ppatk_bentukusaha_id"),
			array('mapping' => "customer.ppatk_bidangusaha" ,'name' => "ppatk_bidangusaha"),
			array('mapping' => "customer.ppatk_bilalain" ,'name' => "ppatk_bilalain"),
			array('mapping' => "customer.ppatk_instrumentpembayaran_id" ,'name' => "ppatk_instrumentpembayaran_id"),
			array('mapping' => "customer.ppatk_rekeningwakat_no" ,'name' => "ppatk_rekeningwakat_no"),
			array('mapping' => "customer.ppatk_rinciantransaksi" ,'name' => "ppatk_rinciantransaksi"),
			array('mapping' => "customer.ppatk_sumberdana" ,'name' => "ppatk_sumberdana"),
			array('mapping' => "customer.ppatk_rekeningtrans_no" ,'name' => "ppatk_rekeningtrans_no"),
			array('mapping' => "customer.ppatk_namawali" ,'name' => "ppatk_namawali"),
			array('mapping' => "customer.company_aktapendirian" ,'name' => "company_aktapendirian"),
			array('mapping' => "customer.company_aktaperubahan" ,'name' => "company_aktaperubahan"),
			array('mapping' => "customer.company_aktasusunanpengurus" ,'name' => "company_aktasusunanpengurus"),
			array('mapping' => "customer.company_tanggalaktapendirian" ,'name' => "company_tanggalaktapendirian" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_tanggalaktaperubahan" ,'name' => "company_tanggalaktaperubahan" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_tanggalaktasusunanpengurus" ,'name' => "company_tanggalaktasusunanpengurus", 'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_email" ,'name' => "company_email"),
			array('mapping' => "customer.company_pic" ,'name' => "company_pic"),
			array('mapping' => "customer.addname" ,'name' => "addname"),
			array('mapping' => "customer.modiname" ,'name' => "modiname"),
			array('mapping' => "customer.modiby" ,'name' => "modiby"),
			array('mapping' => "customer.Addon" ,'name' => "Addon"),
			array('mapping' => "customer.Modion" ,'name' => "Modion"),
			array('mapping' => "customer.Currentusername" ,'name' => "Currentusername"),
			array('mapping' => "customer.Currentdate" ,'name' => "Currentdate"),
			array('mapping' => "customer.gender" ,'name' => "gender"),
			array('mapping' => "customer.KK_number" ,'name' => "KK_number"),
			array('mapping' => "customer.NPPKP" ,'name' => "NPPKP"),
			array('mapping' => "customer.NPWP_name" ,'name' => "NPWP_name"),
			array('mapping' => "customer.NPWP_klu_id" ,'name' => "NPWP_klu_id"),
			array('mapping' => "customer.NPWP_klasifikasiusaha_id" ,'name' => "NPWP_klasifikasiusaha_id"),
			array('mapping' => "customer.NPWP_status_id" ,'name' => "NPWP_status_id"),
			array('mapping' => "customer.NPWP_tarif" ,'name' => "NPWP_tarif"),
			array('mapping' => "customer.NPWP_tarifno" ,'name' => "NPWP_tarifno"),
			array('mapping' => "customer.downline_id" ,'name' => "downline_id"),
			array('mapping' => "customer.totaldocument_ktpsim" ,'name' => "totaldocument_ktpsim"),
			array('mapping' => "customer.home_phone2" ,'name' => "home_phone2"),
			array('mapping' => "customer.mobile_phone2" ,'name' => "mobile_phone2"),
			array('mapping' => "customer.KTP_number" ,'name' => "KTP_number"),
			array('mapping' => "customer.KTP_name" ,'name' => "KTP_name"),
			array('mapping' => "customer.KTP_address" ,'name' => "KTP_address"),
			array('mapping' => "customer.company_name" ,'name' => "company_name"),
			array('mapping' => "customer.company_address" ,'name' => "company_address"),
			array('mapping' => "customer.company_phone" ,'name' => "company_phone"),
			array('mapping' => "customer.company_phoneext" ,'name' => "company_phoneext"),
			array('mapping' => "customer.company_city_id" ,'name' => "company_city_id"),
			array('mapping' => "customer.company_zipcode" ,'name' => "company_zipcode"),
			array('mapping' => "customer.company_fax" ,'name' => "company_fax"),
			array('mapping' => "customer.company_position" ,'name' => "company_position"),
			array('mapping' => "customer.emergency_name" ,'name' => "emergency_name"),
			array('mapping' => "customer.emergency_address" ,'name' => "emergency_address"),
			array('mapping' => "customer.emergency_phone" ,'name' => "emergency_phone"),
			array('mapping' => "customer.emergency_mobilephone" ,'name' => "emergency_mobilephone"),
			array('mapping' => "customer.emergency_status" ,'name' => "emergency_status"),
			array('mapping' => "customer.userid" ,'name' => "userid"),
			array('mapping' => "customer.password" ,'name' => "password")
		);
		$hasil = array();
        $hasil = $this->execSP3('sp_customerb_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
                $param['code'],
                $param['name'],
                $param['birthdate'],
				$param['page'], 
				$param['limit'],
                $param['address'],
                $param['mobile_phone'],
                $param['home_phone'],
                'm_customer');
		$return['totalRow'] = $hasil[0][0]['totalRow'];

        $return['model'] = $dataList;
        foreach ($hasil[1] as $value) {
        	$return['data'][] = array(
        		'customer' => array(
					'customer_id' => $value['customer_id'],
					'code' => $value['code'],
					'name' => $value['name'],
					'address' => $value['address'],
					'home_phone' => $value['home_phone'],
					'office_phone' => $value['office_phone'],
					'Addon' => $value['Addon'],
					'Modion' => $value['Modion'],
					'Currentusername' => $this->getUserlogin()->getCurrentuser()['user_fullname'],
					'Currentdate' => date('Y-m-d H:i:s'),
					'KTP_name' => $value['KTP_name'],
					'KTP_address' => $value['KTP_address'],
					'mobile_phone' => $value['mobile_phone'],
					'KTP_number' => $value['KTP_number']
        		)	
        	);
        }

        return $return;         
    }

    function browsedetailRead($param) {
		$hasil = array();
        $clusterId = intval($param['cluster_cluster_id']);
		$clusterId = ($clusterId==999 || $clusterId==0)?0:$clusterId;

		$hasil = $this->execSP3('sp_blockb_read',
                $clusterId,
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId());

		$return['total'] = $hasil[0];
		$return['data'] = $hasil[1];
        $return['model'] = null;
        return $return;
    }

    function selectedcustomerRead($param){
    	$dataList = array(
			array('mapping' => "customer.customer_id" ,'name' => "customer_id"),
			array('mapping' => "customer.code" ,'name' => "code"),
			array('mapping' => "customer.name" ,'name' => "name"),
			array('mapping' => "customer.address" ,'name' => "address"),
			array('mapping' => "customer.city_city_id" ,'name' => "city_city_id"),
			array('mapping' => "customer.zipcode" ,'name' => "zipcode"),
			array('mapping' => "customer.email" ,'name' => "email"),
			array('mapping' => "customer.fax" ,'name' => "fax"),
			array('mapping' => "customer.home_phone" ,'name' => "home_phone"),
			array('mapping' => "customer.office_phone" ,'name' => "office_phone"),
			array('mapping' => "customer.mobile_phone" ,'name' => "mobile_phone"),
			array('mapping' => "customer.birthplace" ,'name' => "birthplace"),
			array('mapping' => "customer.birthdate" ,'name' => "birthdate" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.marital_status" ,'name' => "marital_status"),
			array('mapping' => "customer.nationality" ,'name' => "nationality"),
			array('mapping' => "customer.photo" ,'name' => "photo"),
			array('mapping' => "customer.description" ,'name' => "description"),
			array('mapping' => "customer.NPWP" ,'name' => "NPWP"),
			array('mapping' => "customer.children" ,'name' => "children"),
			array('mapping' => "customer.religion_religion_id" ,'name' => "religion_religion_id"),
			array('mapping' => "customer.purpose_purpose_id" ,'name' => "purpose_purpose_id"),
			array('mapping' => "customer.purposebuy_purposebuy_id" ,'name' => "purposebuy_purposebuy_id"),
			array('mapping' => "customer.education_education_id" ,'name' => "education_education_id"),
			array('mapping' => "customer.is_temporary" ,'name' => "is_temporary"),
			array('mapping' => "customer.NPWP_address" ,'name' => "NPWP_address"),
			array('mapping' => "customer.general_gelar" ,'name' => "general_gelar"),
			array('mapping' => "customer.general_virtualaccount_no" ,'name' => "general_virtualaccount_no"),
			array('mapping' => "customer.general_province_id" ,'name' => "general_province_id"),
			array('mapping' => "customer.general_kecamatan" ,'name' => "general_kecamatan"),
			array('mapping' => "customer.general_kelurahan" ,'name' => "general_kelurahan"),
			array('mapping' => "customer.general_rt" ,'name' => "general_rt"),
			array('mapping' => "customer.general_rw" ,'name' => "general_rw"),
			array('mapping' => "customer.general_kewarganegaraan" ,'name' => "general_kewarganegaraan"),
			array('mapping' => "customer.general_kodewna" ,'name' => "general_kodewna"),
			array('mapping' => "customer.general_pekerjaan" ,'name' => "general_pekerjaan"),
			array('mapping' => "customer.identitas_documenttype_id" ,'name' => "identitas_documenttype_id"),
			array('mapping' => "customer.identitas_no" ,'name' => "identitas_no"),
			array('mapping' => "customer.identitas_province_id" ,'name' => "identitas_province_id"),
			array('mapping' => "customer.identitas_city_id" ,'name' => "identitas_city_id"),
			array('mapping' => "customer.identitas_rt" ,'name' => "identitas_rt"),
			array('mapping' => "customer.identitas_rw" ,'name' => "identitas_rw"),
			array('mapping' => "customer.identitas_kecamatan" ,'name' => "identitas_kecamatan"),
			array('mapping' => "customer.identitas_kelurahan" ,'name' => "identitas_kelurahan"),
			array('mapping' => "customer.identitas_kodepos" ,'name' => "identitas_kodepos"),
			array('mapping' => "customer.ppatk_badanhukum" ,'name' => "ppatk_badanhukum"),
			array('mapping' => "customer.ppatk_bentukusaha_id" ,'name' => "ppatk_bentukusaha_id"),
			array('mapping' => "customer.ppatk_bidangusaha" ,'name' => "ppatk_bidangusaha"),
			array('mapping' => "customer.ppatk_bilalain" ,'name' => "ppatk_bilalain"),
			array('mapping' => "customer.ppatk_instrumentpembayaran_id" ,'name' => "ppatk_instrumentpembayaran_id"),
			array('mapping' => "customer.ppatk_rekeningwakat_no" ,'name' => "ppatk_rekeningwakat_no"),
			array('mapping' => "customer.ppatk_rinciantransaksi" ,'name' => "ppatk_rinciantransaksi"),
			array('mapping' => "customer.ppatk_sumberdana" ,'name' => "ppatk_sumberdana"),
			array('mapping' => "customer.ppatk_rekeningtrans_no" ,'name' => "ppatk_rekeningtrans_no"),
			array('mapping' => "customer.ppatk_namawali" ,'name' => "ppatk_namawali"),
			array('mapping' => "customer.company_aktapendirian" ,'name' => "company_aktapendirian"),
			array('mapping' => "customer.company_aktaperubahan" ,'name' => "company_aktaperubahan"),
			array('mapping' => "customer.company_aktasusunanpengurus" ,'name' => "company_aktasusunanpengurus"),
			array('mapping' => "customer.company_tanggalaktapendirian" ,'name' => "company_tanggalaktapendirian" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_tanggalaktaperubahan" ,'name' => "company_tanggalaktaperubahan" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_tanggalaktasusunanpengurus" ,'name' => "company_tanggalaktasusunanpengurus" ,'type' => "date",'dateFormat' => "Y-m-d H:i:s.u"),
			array('mapping' => "customer.company_email" ,'name' => "company_email"),
			array('mapping' => "customer.company_pic" ,'name' => "company_pic"),
			array('mapping' => "customer.addname" ,'name' => "addname"),
			array('mapping' => "customer.modiname" ,'name' => "modiname"),
			array('mapping' => "customer.modiby" ,'name' => "modiby"),
			array('mapping' => "customer.Addon" ,'name' => "Addon"),
			array('mapping' => "customer.Modion" ,'name' => "Modion"),
			array('mapping' => "customer.Currentusername" ,'name' => "Currentusername"),
			array('mapping' => "customer.Currentdate" ,'name' => "Currentdate"),
			array('mapping' => "customer.gender" ,'name' => "gender"),
			array('mapping' => "customer.KK_number" ,'name' => "KK_number"),
			array('mapping' => "customer.NPPKP" ,'name' => "NPPKP"),
			array('mapping' => "customer.NPWP_name" ,'name' => "NPWP_name"),
			array('mapping' => "customer.NPWP_klu_id" ,'name' => "NPWP_klu_id"),
			array('mapping' => "customer.NPWP_klasifikasiusaha_id" ,'name' => "NPWP_klasifikasiusaha_id"),
			array('mapping' => "customer.NPWP_status_id" ,'name' => "NPWP_status_id"),
			array('mapping' => "customer.NPWP_tarif" ,'name' => "NPWP_tarif"),
			array('mapping' => "customer.NPWP_tarifno" ,'name' => "NPWP_tarifno"),
			array('mapping' => "customer.downline_id" ,'name' => "downline_id"),
			array('mapping' => "customer.totaldocument_ktpsim" ,'name' => "totaldocument_ktpsim"),
			array('mapping' => "customer.home_phone2" ,'name' => "home_phone2"),
			array('mapping' => "customer.mobile_phone2" ,'name' => "mobile_phone2"),
			array('mapping' => "customer.KTP_number" ,'name' => "KTP_number"),
			array('mapping' => "customer.KTP_name" ,'name' => "KTP_name"),
			array('mapping' => "customer.KTP_address" ,'name' => "KTP_address"),
			array('mapping' => "customer.company_name" ,'name' => "company_name"),
			array('mapping' => "customer.company_address" ,'name' => "company_address"),
			array('mapping' => "customer.company_phone" ,'name' => "company_phone"),
			array('mapping' => "customer.company_phoneext" ,'name' => "company_phoneext"),
			array('mapping' => "customer.company_city_id" ,'name' => "company_city_id"),
			array('mapping' => "customer.company_zipcode" ,'name' => "company_zipcode"),
			array('mapping' => "customer.company_fax" ,'name' => "company_fax"),
			array('mapping' => "customer.company_position" ,'name' => "company_position"),
			array('mapping' => "customer.emergency_name" ,'name' => "emergency_name"),
			array('mapping' => "customer.emergency_address" ,'name' => "emergency_address"),
			array('mapping' => "customer.emergency_phone" ,'name' => "emergency_phone"),
			array('mapping' => "customer.emergency_mobilephone" ,'name' => "emergency_mobilephone"),
			array('mapping' => "customer.emergency_status" ,'name' => "emergency_status"),
			array('mapping' => "customer.userid" ,'name' => "userid"),
			array('mapping' => "customer.password" ,'name' => "password"),
			array('mapping' => "city.city_id" ,'name' => "city_city_id"),
			array('mapping' => "city.city_name" ,'name' => "city_city_name"),
			array('mapping' => "city.provinsi_province_id" ,'name' => "city_provinsi_province_id")
		);

    	$id = (int) $param['customer_id'];
     	
		$return['totalRow'] = '';
		$return['data'] = '';
        $return['model'] = $dataList;

        if($id != 0){
	        $hasil = $this->execSP3('sp_customerdetail_read',$id);
			$return['totalRow'] = $hasil[0][0]['totalRow'];
			$return['data'][] = array(
					'customer' => array(
						'customer_id' => $hasil[1][0]['customer_id'],
						'code' => $hasil[1][0]['code'],
						'name' => $hasil[1][0]['name'],
						'email' => $hasil[1][0]['email'],
						'mobile_phone' => $hasil[1][0]['mobile_phone'],
						'birthdate' => $hasil[1][0]['birthdate'],
						'NPWP' => $hasil[1][0]['NPWP'],
						'general_kewarganegaraan' => $hasil[1][0]['general_kewarganegaraan'],
						'ppatk_badanhukum' => $hasil[1][0]['ppatk_badanhukum'],
						'company_tanggalaktapendirian' => $hasil[1][0]['company_tanggalaktapendirian'],
						'company_tanggalaktaperubahan' => $hasil[1][0]['company_tanggalaktaperubahan'],
						'company_tanggalaktasusunanpengurus' => $hasil[1][0]['company_tanggalaktasusunanpengurus'],
						'Addon' => $hasil[1][0]['Addon'],
						'Currentusername' => $this->getUserlogin()->getCurrentuser()['user_fullname'],
						'Currentdate' => date('Y-m-d H:i:s'),
						'NPWP_tarif' => $hasil[1][0]['NPWP_tarif'],
						'NPWP_tarifno' => $hasil[1][0]['NPWP_tarifno'],
						'Addon' => $hasil[1][0]['Addon'],
						'KTP_address' => $hasil[1][0]['KTP_address'],
						'KTP_name' => $hasil[1][0]['KTP_name'],
						'KTP_number' => $hasil[1][0]['KTP_number'],
						'Modion' => $hasil[1][0]['Modion'],
						'address' => $hasil[1][0]['address'],
						'home_phone' => $hasil[1][0]['home_phone'],
						'office_phone' => $hasil[1][0]['office_phone'],
						'zipcode' => $hasil[1][0]['zipcode'],
						'fax' => $hasil[1][0]['fax'],
						'NPWP_address' => $hasil[1][0]['NPWP_address'],
						'email' => $hasil[1][0]['email']
					),
	        		'city' => array(
						'city_id' => $hasil[1][0]['city_city_id'],
						'city_name' => $hasil[1][0]['city_city_name']
	        		)
				);
	    }
        return $return;
    }

	function getUserlogin() {
       // if(!$this->currentuser){         
          $this->currentuser = new Erems_Models_Master_User();
        // }
        return $this->currentuser;
    }

    protected function fillData($data, & $filledArray, Erems_Box_Models_App_Creator $creator, $creatorName, $creatorParams = NULL) {
        if (count($data) > 0) {
            foreach ($data as $record) {
                $obj = $creator->create($creatorName, $creatorParams);
                $obj->setArrayTable($record);
                $filledArray[] = $obj;
            }
        }
        /* if jumlah filledArray = 0 maka isi dengan 1 data dummy  */
        if (count($filledArray) == 0) {
            $filledArray[] = $creator->create($creatorName, $creatorParams);
        }
    }

    function initiateDataDefaultRead($param){
        $testingSession = new Erems_Box_Models_App_Session();
        $testingSession->setSession('user', $this->session->getUserId());
   		$testingSession->setSession('pt', $this->session->getCurrentPtId());
   		$testingSession->setSession('project', $this->session->getCurrentProjectId());
   		$testingSession->setSession('group', $this->session->getCurrentGroupId());

      	$modelKomisiDistributionChannel = array(
      		array('mapping' => "komisidistributionchannel.komisi_distributionchannel_id" ,'name' => "komisi_distributionchannel_id"),
      		array('mapping' => "komisidistributionchannel.code" ,'name' => "code"),
      		array('mapping' => "komisidistributionchannel.distributionchannel" ,'name' => "distributionchannel"),
      		array('mapping' => "komisidistributionchannel.description" ,'name' => "description"),
      		array('mapping' => "komisidistributionchannel.Addon" ,'name' => "Addon"),
      		array('mapping' => "komisidistributionchannel.user_name" ,'name' => "user_name"),
      		array('mapping' => "komisidistributionchannel.Modion" ,'name' => "Modion"),
      		array('mapping' => "komisidistributionchannel.modi_user_name" ,'name' => "modi_user_name")
      	);
      	$modelBank = array(
      		array('mapping' => "bank.bank_id" ,'name' => "bank_id"),
      		array('mapping' => "bank.bank_name" ,'name' => "bank_name"),
      		array('mapping' => "bank.bank_company_name" ,'name' => "bank_company_name")
      	);
      	$modelCollector = array(
      		array('mapping' => "collector.employee_id" ,'name' => "employee_id"),
      		array('mapping' => "collector.employee_name" ,'name' => "employee_name")
      	);
      	$modelrewardsales = array(
      		array('mapping' => "rewardsales.reward_id" ,'name' => "reward_id"),
      		array('mapping' => "rewardsales.name" ,'name' => "name")
      	);
      	$modelrewardcustomer = array(
      		array('mapping' => "rewardcustomer.reward_id" ,'name' => "reward_id"),
      		array('mapping' => "rewardcustomer.name" ,'name' => "name")
      	);
      	$modelrewardtambahan = array(
      		array('mapping' => "rewardtambahan.reward_id" ,'name' => "reward_id"),
      		array('mapping' => "rewardtambahan.name" ,'name' => "name")
      	);
      	$modelperhitungankomisi = array(
      		array('mapping' => "perhitungankomisi.perhitungan_komisi_id" ,'name' => "perhitungan_komisi_id"),
      		array('mapping' => "perhitungankomisi.judul_perhitungan_komisi" ,'name' => "judul_perhitungan_komisi")
      	);
      	$modelpurposebuy = array(
			array('mapping' => "purposebuy.purposebuy_id", 'name' => "purposebuy_id"),
			array('mapping' => "purposebuy.purposebuy", 'name' => "purposebuy"),
			array('mapping' => "purposebuy.description", 'name' => "description")
      	);
      	$modelmediapromotion = array(
      		array('mapping' => "mediapromotion.mediapromotion_id", 'name' => "mediapromotion_id"),
			array('mapping' => "mediapromotion.code", 'name' => "code"),
			array('mapping' => "mediapromotion.mediapromotion", 'name' => "mediapromotion"),
			array('mapping' => "mediapromotion.description", 'name' => "description")
      	);
      	$modelsaleslocation = array(
      		array('mapping' => "saleslocation.saleslocation_id", 'name' => "saleslocation_id"),
			array('mapping' => "saleslocation.code", 'name' => "code"),
			array('mapping' => "saleslocation.saleslocation", 'name' => "saleslocation"),
			array('mapping' => "saleslocation.description", 'name' => "description")
      	);
      	$modelcity = array(
			array('mapping' => "city.city_id", 'name' => "city_id"),
			array('mapping' => "city.city_name", 'name' => "city_name"),
			array('mapping' => "city.provinsi_province_id", 'name' => "provinsi_province_id")
      	);
      	$modelsourcemoney = array(
      		array('mapping' => "sourcemoney.sourcemoney_id", 'name' => "sourcemoney_id"),
			array('mapping' => "sourcemoney.sourcemoney", 'name' => "sourcemoney"),
			array('mapping' => "sourcemoney.description", 'name' => "description")
      	);
      	
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_initiateDataDefault_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				1,
				9999,
				Erems_Box_Config::POSITION_ID_COLLECTOR
			);
        if(is_array($hasil[1])){
	        $return['data']['komisidistributionchannel']['model'] = $modelKomisiDistributionChannel;
	        foreach ($hasil[1] as $value) {
	        	$return['data']['komisidistributionchannel']['data'][] = array(
					'komisi_distributionchannel_id' => $value['komisi_distributionchannel_id'],
					'code' => $value['code'],
					'distributionchannel' => $value['distributionchannel'],
					'description' => $value['description'],
					'Addon' => $value['addon'],
					'user_name' => $value['user_name'],
					'Modion' => $value['modion'],
					'modi_user_name' => $value['modi_user_name']
	        	);
	        }
	    }
        if(is_array($hasil[3])){
	        $return['data']['bank']['model'] = $modelBank;
	        foreach ($hasil[3] as $value) {
	        	$return['data']['bank']['data'][] = array(
					'bank_id' => $value['bank_id'],
					'bank_name' => $value['bank_name'],
					'bank_company_name' => $value['bank_company_name']
	        	);
	        }
	    }
        if(is_array($hasil[5])){
	        $return['data']['collector']['model'] = $modelCollector;
	        foreach ($hasil[5] as $value) {
	        	$return['data']['collector']['data'][] = array(
					'employee_id' => $value['employee_id'],
					'employee_name' => $value['employee_name']
	        	);
	        }
	    }
        if(is_array($hasil[6])){
	        $return['data']['perhitungankomisi']['model'] = $modelperhitungankomisi;
	        foreach ($hasil[6] as $value) {
	        	$return['data']['perhitungankomisi']['data'][] = array(
					'perhitungan_komisi_id' => $value['komisi_perhitungan_id'],
					'judul_perhitungan_komisi' => $value['judul']
	        	);
	        }
	    }
        if(is_array($hasil[8])){
	        $return['data']['mediapromotion']['model'] = $modelmediapromotion;
	        foreach ($hasil[8] as $value) {
	        	$return['data']['mediapromotion']['data'][] = array(
					'mediapromotion_id' => $value['mediapromotion_id'],
					'code' => $value['code'],
					'mediapromotion' => $value['mediapromotion'],
					'description' => $value['description']
	        	);
	        }
	    }
        if(is_array($hasil[10])){
	        $return['data']['saleslocation']['model'] = $modelsaleslocation;
	        foreach ($hasil[10] as $value) {
	        	$return['data']['saleslocation']['data'][] = array(
					'saleslocation_id' => $value['saleslocation_id'],
					'code' => $value['code'],
					'saleslocation' => $value['saleslocation'],
					'description' => $value['description']
	        	);
	        }
	    }

        $rewardDao = new Erems_Models_Reward_RewardDao();
        $allRewardSales = $rewardDao->getAllWOPL($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), 0);
        $allRewardCustomer = $rewardDao->getAllWOPL($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), 2);
        $allRewardTambahan = $rewardDao->getAllWOPL($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), 1);

        if(is_array($allRewardSales[1])){
	        $return['data']['rewardsales']['model'] = $modelrewardsales;
	        foreach ($allRewardSales[1] as $value) {
	        	$return['data']['rewardsales']['data'][] = array(
					'reward_id' => $value['reward_id'],
					'name' => $value['name']
	        	);
	        }
	    }
	    if(is_array($allRewardCustomer[1])){
	        $return['data']['rewardcustomer']['model'] = $modelrewardcustomer;
	        foreach ($allRewardCustomer[1] as $value) {
	        	$return['data']['rewardcustomer']['data'][] = array(
					'reward_id' => $value['reward_id'],
					'name' => $value['name']
	        	);
	        }
	    }
	    if(is_array($allRewardTambahan[1])){
	        $return['data']['rewardtambahan']['model'] = $modelrewardtambahan;
	        foreach ($allRewardTambahan[1] as $value) {
	        	$return['data']['rewardtambahan']['data'][] = array(
					'reward_id' => $value['reward_id'],
					'name' => $value['name']
	        	);
	        }
	    }

        $purposeBuyDao = new Erems_Models_Master_PurposeBuyDao();
        $allPurposeBuy = $purposeBuyDao->getAllWOPL();
        if(is_array($allPurposeBuy[1])){
	        $return['data']['purposebuy']['model'] = $modelpurposebuy;
	        foreach ($allPurposeBuy[1] as $value) {
	        	$return['data']['purposebuy']['data'][] = array(
					'purposebuy_id' => $value['purposebuy_id'],
					'purposebuy' => $value['purposebuy'],
					'description' => $value['description']
	        	);
	        }
	    }

        $masterGeneralDao = new Erems_Models_Master_GeneralDao();
        $allCty = $masterGeneralDao->getAllCityWOR();
        if(is_array($allCty[1])){
	        $return['data']['city']['model'] = $modelcity;
	        foreach ($allCty[1] as $value) {
	        	$return['data']['city']['data'][] = array(
					'city_id' => $value['city_id'],
					'city_name' => $value['city_name'],
					'provinsi_province_id' => $value['provinsi_province_id']
	        	);
	        }
	    }

        $allSM = $masterGeneralDao->getAllSourceMoney();
        if(is_array($allSM[1])){
	        $return['data']['sourcemoney']['model'] = $modelpurposebuy;
	        foreach ($allSM[1] as $value) {
	        	$return['data']['sourcemoney']['data'][] = array(
					'sourcemoney_id' => $value['sourcemoney_id'],
					'sourcemoney' => $value['sourcemoney'],
					'description' => $value['description']
	        	);
	        }
	    }

        $return['data']['others'][0][0] = $this->dataGenco($param);

        return $return;  
    }

    function detailOneRead($param){
        $hasil = array();
        $id = (int) $param['purchaseletter_id'];
        if ($id == 0)
            return $hasil;
        $hasil = $this->execSP3('sp_purchaseletternew_detail_read', $id, $param['is_draft'], $param['deleted']);
        $hasil['others'][0][0] = $this->dataGenco($param);
        
        return $hasil;
    }

    function detailKomisiOneRead($param){
    	$modelkomisiPencairanGrid = array(
    		array('mapping' => "komisi_pencairan_detail_id" ,'name' => "komisi_pencairan_detail_id"),
    		array('mapping' => "komisi_pencairan_id" ,'name' => "komisi_pencairan_id"),
    		array('mapping' => "komisi_penerima_id" ,'name' => "komisi_penerima_id"),
    		array('mapping' => "deleted" ,'name' => "deleted"),
    		array('mapping' => "project_id" ,'name' => "project_id"),
    		array('mapping' => "pt_id" ,'name' => "pt_id"),
    		array('mapping' => "code" ,'name' => "code"),
    		array('mapping' => "komisi_value" ,'name' => "komisi_value"),
    		array('mapping' => "populated_data" ,'name' => "populated_data"),
    		array('mapping' => "reff_id" ,'name' => "reff_id"),
    		array('mapping' => "reff_name" ,'name' => "reff_name"),
    		array('mapping' => "npwp" ,'name' => "npwp"),
    		array('mapping' => "penerima_komisi" ,'name' => "penerima_komisi"),
    		array('mapping' => "distributionchannel" ,'name' => "distributionchannel"),
    		array('mapping' => "komisi_persen_nominal" ,'name' => "komisi_persen_nominal")
    	);

		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_detail_komisi_read',
                $param['purchaseletter_id'],
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				1,
				9999
			);
        if(is_array($hasil[1])){
	        $return['model'] = $modelkomisiPencairanGrid;
	        $return['data'] = $hasil[1];
	    }

        return $return;  
    }

    function detailScheduleOneRead($param) {
        $hasil = array();
        $id = (int) $param['purchaseletter_id'];
        if ($id == 0)
            return $hasil;
        $hasil = $this->execSP3('sp_purchaseletternew_kartupiutangschedule_read', $id);

      	$modelSchedule = array(
			array('name' => "schedule_id",   'mapping' => "schedule.schedule_id"),
			array('name' => "scheduletype_id",  'mapping' => "schedule.scheduletype_id"),
			array('name' => "purchaseletter_id",   'mapping' => "schedule.purchaseletter_id"),
			array('name' => "description",   'mapping' => "schedule.description"),
			array('name' => "termin",  'mapping' => "schedule.termin"),
			array('name' => "duedate", 'mapping' => "schedule.duedate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "amount",  'mapping' => "schedule.amount"),
			array('name' => "remaining_balance",   'mapping' => "schedule.remaining_balance"),
			array('name' => "sourcemoney_sourcemoney_id",   'mapping' => "schedule.sourcemoney_sourcemoney_id"),
			array('name' => "denda",   'mapping' => "schedule.denda"),
			array('name' => "is_pay",  'mapping' => "schedule.is_pay"),
			array('name' => "remaining_denda",  'mapping' => "schedule.remaining_denda"),
			array('name' => "sp1_date",   'mapping' => "schedule.sp1_date",   'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp1_no",  'mapping' => "schedule.sp1_no"),
			array('name' => "sp1_plandate",  'mapping' => "schedule.sp1_plandate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp2_date",   'mapping' => "schedule.sp2_date",   'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp2_no",  'mapping' => "schedule.sp2_no"),
			array('name' => "sp2_plandate",  'mapping' => "schedule.sp2_plandate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp3_date",   'mapping' => "schedule.sp3_date",   'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp3_no",  'mapping' => "schedule.sp3_no"),
			array('name' => "sp3_plandate",  'mapping' => "schedule.sp3_plandate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp4_date",   'mapping' => "schedule.sp4_date",   'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp4_no",  'mapping' => "schedule.sp4_no"),
			array('name' => "sp4_plandate",  'mapping' => "schedule.sp4_plandate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp1_userdate",  'mapping' => "schedule.sp1_userdate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp2_userdate",  'mapping' => "schedule.sp2_userdate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp3_userdate",  'mapping' => "schedule.sp3_userdate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "sp4_userdate",  'mapping' => "schedule.sp4_userdate",  'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "lama_tunggakan",   'mapping' => "schedule.lama_tunggakan"),
			array('name' => "scheduletype_scheduletype_id", 'mapping' => "scheduletype.scheduletype_id"),
			array('name' => "scheduletype_scheduletype", 'mapping' => "scheduletype.scheduletype"),
			array('name' => "scheduletype_description",  'mapping' => "scheduletype.description"),
			array('name' => "sourcemoney_sourcemoney_id",   'mapping' => "sourcemoney.sourcemoney_id"),
			array('name' => "sourcemoney_sourcemoney",   'mapping' => "sourcemoney.sourcemoney"),
			array('name' => "sourcemoney_description",   'mapping' => "sourcemoney.description")
		);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

        if(is_array($hasil[1])){
        	$return['totalRow'] = $hasil[0][0]['totalRow'];
	        $return['model'] = $modelSchedule;
	        foreach ($hasil[1] as $value) {
	        	$return['data'][] = array(
	        		"schedule" => array(
						'schedule_id' => $value['schedule_id'],
						'purchaseletter_id' => $value['purchaseletter_id'],
						'termin' => $value['termin'],
						'duedate' => $value['duedate'],
						'amount' => $value['amount'],
						'remaining_balance' => $value['remaining_balance']
					),
					"scheduletype" => array(
						"scheduletype_id" => $value['scheduletype_scheduletype_id'],
						"scheduletype" => $value['scheduletype_scheduletype'],
						"description" => $value['scheduletype_description']
					),
					"sourcemoney" => array(
						"sourcemoney_id" => $value['sourcemoney_sourcemoney_id'],
						"sourcemoney" => $value['sourcemoney_sourcemoney'],
						"description" => $value['sourcemoney_description']
					)
	        	);
	        }
	    }
        return $return;  
    }

    function komisiPencairanCbRead($param){
      	$modelKomisiPencairanCb = array(
			array('mapping' => "komisipencairan.komisi_pencairan_id" ,'name' => "komisi_pencairan_id"),
			array('mapping' => "komisipencairan.code" ,'name' => "code"),
			array('mapping' => "komisipencairan.judul_komisi" ,'name' => "judul_komisi"),
			array('mapping' => "komisipencairan.description" ,'name' => "description"),
			array('mapping' => "komisipencairan.Addon" ,'name' => "Addon"),
			array('mapping' => "komisipencairan.user_name" ,'name' => "user_name"),
			array('mapping' => "komisipencairan.Modion" ,'name' => "Modion"),
			array('mapping' => "komisipencairan.modi_user_name" ,'name' => "modi_user_name")
		);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_komisi_pencairan_read',
				$param['komisidistributionchannel_id'],
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				1,
				9999
			);
        if(is_array($hasil[1])){
	        $return['data']['komisipencairan']['model'] = $modelKomisiPencairanCb;
	        foreach ($hasil[1] as $value) {
	        	$return['data']['komisipencairan']['data'][] = array(
					'komisi_pencairan_id' => $value['komisi_pencairan_id'],
					'code' => $value['code'],
					'judul_komisi' => $value['judul_komisi'],
					'description' => $value['description'],
					'Addon' => $value['addon'],
					'user_name' => $value['user_name'],
					'Modion' => $value['modion'],
					'modi_user_name' => $value['modi_user_name']
	        	);
	        }
	    }

        return $return;  
    }

    function komisiPencairanGridRead($param){
    	$modelkomisiPencairanGrid = array(
    		array('mapping' => "komisi_pencairan_detail_id" ,'name' => "komisi_pencairan_detail_id"),
    		array('mapping' => "komisi_pencairan_id" ,'name' => "komisi_pencairan_id"),
    		array('mapping' => "komisi_penerima_id" ,'name' => "komisi_penerima_id"),
    		array('mapping' => "deleted" ,'name' => "deleted"),
    		array('mapping' => "project_id" ,'name' => "project_id"),
    		array('mapping' => "pt_id" ,'name' => "pt_id"),
    		array('mapping' => "code" ,'name' => "code"),
    		array('mapping' => "persentase" ,'name' => "persentase"),
    		array('mapping' => "populated_data" ,'name' => "populated_data"),
    		array('mapping' => "reff_id" ,'name' => "reff_id"),
    		array('mapping' => "reff_name" ,'name' => "reff_name"),
    		array('mapping' => "npwp" ,'name' => "npwp"),
    		array('mapping' => "penerima_komisi" ,'name' => "penerima_komisi"),
    		array('mapping' => "distributionchannel" ,'name' => "distributionchannel"),
    		array('mapping' => "komisi_value" ,'name' => "komisi_value"),
    		array('mapping' => "komisi_persen_nominal" ,'name' => "komisi_persen_nominal")
    	);

		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_komisi_pencairan_detail_read',
                $param['komisi_pencairan_detail_id'],
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				1,
				9999
			);
        if(is_array($hasil[1])){
	        $return['model'] = $modelkomisiPencairanGrid;
	        $return['data'] = $hasil[1];
	    }

        return $return;  
    }

    function pricelistCbRead($param){
      	$modelPricelist = array(
      		array('mapping' => "pricelist.pricelist_id" ,'name' => "pricelist_id"),
      		array('mapping' => "pricelist.keterangan" ,'name' => "keterangan")
      	);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_pricelist_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				$param['unit_id']
			);
        if(is_array($hasil[1])){
	        $return['data']['pricelist']['model'] = $modelPricelist;
	        foreach ($hasil[1] as $value) {
	        	$return['data']['pricelist']['data'][] = array(
					'pricelist_id' => $value['pricelist_id'],
					'keterangan' => $value['keterangan']
	        	);
	        }
	    }
        return $return;  
    }

    function pricetypeCbRead($param){
      	$modelPricetype = array(
      		array('mapping' => "pricetype.pricelistdetail_koefisien_id" ,'name' => "pricelistdetail_koefisien_id"),
      		array('mapping' => "pricetype.pricetype" ,'name' => "pricetype"),
      		array('mapping' => "pricetype.pricetype_id" ,'name' => "pricetype_id")
      	);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_pricetype_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				$param['unit_id'],
				$param['pricelist_id']
			);
        if(is_array($hasil[1])){
	        $return['data']['pricetype']['model'] = $modelPricetype;
	        foreach ($hasil[1] as $value) {
	        	$return['data']['pricetype']['data'][] = array(
					'pricelistdetail_koefisien_id' => $value['pricelistdetail_koefisien_id'],
					'pricetype' => $value['pricetype'],
					'pricetype_id' => $value['pricetype_id']
	        	);
	        }
	    }
        return $return;  
    }

    function pricelistkoefisieneCbRead($param){
      	$modelKoefisien = array(
      		array('mapping' => "koefisien.pricelist" ,'name' => "pricelist"),
      		array('mapping' => "koefisien.koefisien_id" ,'name' => "koefisien_id")
      	);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_koefisien_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				$param['unit_id'],
				$param['pricelist_id'],
				$param['pricetype_id']
			);
        if(is_array($hasil[1])){
	        $return['data']['koefisien']['model'] = $modelKoefisien;
	        foreach ($hasil[1] as $value) {
	        	$return['data']['koefisien']['data'][] = array(
					'pricelist' => $value['pricelist'],
					'koefisien_id' => $value['koefisien_id']
	        	);
	        }
	    }
        return $return;  
    }

    function pricelistkoefisieneFillRead($param){
		// $return['totalRow'] = 0;
		$return['data'] = '';
        // $return['model'] = null;

		$hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_koefisien_fill_read',
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId(),
				$param['unit_id'],
				$param['pricelist_id'],
				$param['pricetype_id'],
				$param['koefisien_id']
			);
        if(is_array($hasil[1])){
        	$return['data'] = $hasil[1];
	    }
        return $return;  
    }

    function purchaseletterValidator($param = array()){
    	$msg = "";
    	$setStatus = false;
        $testingSession = new Erems_Box_Models_App_Session();
        $testingSession->setSession('user', $this->session->getUserId());
   		$testingSession->setSession('pt', $this->session->getCurrentPtId());
   		$testingSession->setSession('project', $this->session->getCurrentProjectId());
   		$testingSession->setSession('group', $this->session->getCurrentGroupId());

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistPurchaseletter($testingSession);
        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($testingSession, "GLOBAL");
        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);
        $validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($param['purchase_date'], $tanggalClosing);

        /// TEMP CITRAGRANCBDCIBUBUR
        $validasiCitraGrandCBDCibubur = $this->tempValidasiKhususCitraGrandCBDCibubur($param['purchase_date'], $testingSession);
        if($validasiCitraGrandCBDCibubur["STATUS"]===FALSE){
            $validasiTanggalClosing["HASIL"] = TRUE;
            $param['purchase_date'] = $validasiCitraGrandCBDCibubur["TGL"]->format("Y-m-d");
        }
        ///END TEMP CITRAGRANCBDCIBUBUR
        
        //SET PURPOSE
        $daouunit = new Erems_Models_Unit_UnitDao();
        $oneUnit = $daouunit->getOneUnit($param['unit_unit_id']);
        $purpose = $oneUnit[1][0]['purpose'];
        $apart = array("apartemen", "apartment", "apartement", "apart", "apartmen");
        
        // VALIDASI TANDA JADI MINIMUM DARI MARKETING STOCK
        $daoMarketingStock = new Erems_Models_Marketingstock_Dao();
        $oneMarketingStock = $daoMarketingStock->getByUnitId($this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$param['unit_unit_id']);
        $oneMarketingStock = Erems_Box_Tools::toObjectRow($oneMarketingStock,new Erems_Models_Marketingstock_MarketingStock());
        
        $validMinTJ = FALSE;
        $minTandaJadi = doubleval($oneMarketingStock->getMinimumTandaJadi());
        if( $minTandaJadi > 0){
            if(floatval($param['dataSchedule'][0]['amount']) >= $minTandaJadi){
                $validMinTJ = TRUE;
            }
        }else{
            $validMinTJ = TRUE; // kalau gak ada setingan minimum tanda jadi, maka abaikan validasi ini.
        }        
        //END VALIDASI TANDA JADI MINIMUM DARI MARKETING STOCK
        
        /// VALIDASI TOTAL JUAL = TOTAL SCHEDULE AMOUNT
        $amountBalance = FALSE;
        $schedules = $param["dataSchedule"];

        $totSchAmt = 0;
        foreach ($schedules as $schedule){
        	// if($schedule['scheduletype_scheduletype_id'] == 4){continue;}
            $totSchAmt =$totSchAmt+$schedule["amount"];
        }
        
        if($totSchAmt == Erems_Box_Tools::unformatMoney($param["harga_total_jual"])){
            $amountBalance = TRUE;
        }   
		
		// khusus untuk create
		if($param['purchaseletter_id'] > 0){
			$amountBalance = TRUE;
		}
        // END  VALIDASI TOTAL JUAL = TOTAL SCHEDULE AMOUNT 

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
        $subholding = $genco->activateSh1Features('salesman_validasi');

        //validasi is draft before
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();        
        $IsDraftBefore = $dao->checkDraftBefore($param['purchaseletter_id']);
        
        $isNova = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->isNoVa();
        
        if (is_array($paramsRequestResult)) {
            $params = $paramsRequestResult["parameters"];
            $statusProject = $params[Erems_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT];
            // validasi untuk project perumahan
            if ($statusProject == Erems_Box_Config::STATUS_PROJECT_PERUMAHAN) {
                if ($param['customer_customer_id'] == 0) {
                    $msg = "Please insert customer";
                } else if (strtotime(date($param['purchase_date']))-strtotime(date("Y-m-d")) > 0) {
                    $msg = "Tanggal purchaseletter tidak boleh lebih dari ".date("d-m-Y");
                } else if (!$validasiTanggalClosing["HASIL"] && intval($param['purchaseletter_id'])==0) { // validasi closing untuk proses create saja
                    $msg = $validasiTanggalClosing["MSG"];
                } else if (!$validasiTanggalClosing["HASIL"] && $IsDraftBefore[0][0]['is_draft']) { // validasi closing untuk proses draft to real saja
                    $msg = $validasiTanggalClosing["MSG"];
                } else if ($param['unit_unit_id'] == 0) {
                    $msg = "Please insert unit";
                } 
                // else if(strlen($param['sales']==0) && (strlen($pl->getMemberName())==0) && $subholding == 1){
                //     if(strlen($pl->getSalesman()->getId()>1)){
                //                  $msg =  "Please Insert salesman";
                //     } else if(strlen($pl->getMemberName())>1){
                //                  $msg =  "Please Insert member";
                //     }
                //     $msg =  "Please Insert salesman";                            
                // } 
                // else if(strlen($pl->getSalesman()->getId()==0) && $subholding != 1){
                //     $msg =  "Please Insert salesman";
                // } 
                else if (!isset($param['pricetype_id'])) {
                    $msg = "Please select Price Type first";
                } else if (floatval($param['price_tanahpermeter']) == 0 && (!in_array(strtolower($purpose), $apart))) {
                    $msg = "Harga tanah per m2 kosong";
                } else if ($param["productcategory_productcategory"] == "BANGUNAN" && $param["price_harga_bangunan"] == 0) {
                    $msg = "Please insert building price";
                } else if (intval($param["rencana_serahterima"]) <= 0) {
                    $msg = "Please insert Rencana Serah Terima";
                } else if (strlen($param["rencana_serahterima_date"]) < 5) {
                    $msg = "Please insert Serah Terima Planning Date";
                } else if (!$amountBalance) {
                    $msg = "Total harga jual tidak sama dengan total amount schedule/tagihan.";
                } else if (!$validMinTJ) {
                    $msg = "Minimum Tanda Jadi is Rp. ". Erems_Box_Tools::toCurrency($minTandaJadi)." .";
                } else if (abs($param["harga_pembulatan"]) > $genco->getMaxPembulatan()){
                    $msg = "Harga pembulatan Maksimal Tidak boleh lebih dari +- ".$genco->getMaxPembulatan();
                // } else if($isNova){
                //     // $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();        
                //     $nomerVABCAExist = $this->nomerVAExist($param['unit_virtualaccount_bca'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),'BCA',$param['purchaseletter_id']);
                //     $nomerVAMandiriExist = $this->nomerVAExist($param['unit_virtualaccount_mandiri'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),'MANDIRI',$param['purchaseletter_id']);
                //     if($nomerVABCAExist[0][0]['data'] > 0 ){
                //         $msg = "Nomer Virtual Account BCA sudah ada";
                //     } else if($nomerVAMandiriExist[0][0]['data'] > 0 ){
                //         $msg = "Nomer Virtual Account Mandiri sudah ada";
                //     } else {
                //         $setStatus = TRUE;
                //     }
                } else {
                    $setStatus = TRUE;
                }
            } else {
                // validasi untuk projek apartment
                if ($param['customer_customer_id'] == 0) {
                    $msg = "Please insert customer";
                } else if (strtotime(date($param['purchase_date']))-strtotime(date("Y-m-d")) > 0) {
                    $msg = "Tanggal purchaseletter tidak boleh lebih dari ".date("d-m-Y");
                } else if (!$validasiTanggalClosing["HASIL"] && intval($param['purchaseletter_id'])==0) { // validasi closing untuk proses create saja
                    $msg = $validasiTanggalClosing["MSG"];
                } else if ($param['unit_unit_id'] == 0) {
                    $msg = "Please insert unit";
                // } else if(strlen($pl->getSalesman()->getId()==0) && (strlen($pl->getMemberName())==0) && $subholding == 1){
                //     if(strlen($pl->getSalesman()->getId()>1)){
                //                  $msg =  "Please Insert salesman";
                //     }else if(strlen($pl->getMemberName())>1){
                //                  $msg =  "Please Insert member";
                //     }
                //     $msg =  "Please Insert salesman";                            
                // }else if(strlen($pl->getSalesman()->getId()==0) && $subholding != 1){
                //     $msg =  "Please Insert salesman";
                } else if ($param['pricetype_id'] == 0) {
                    $msg = "Please select Price Type first";
                } else if ($params["productcategory_productcategory"] == "BANGUNAN" && $param['price_harga_bangunan'] == 0) {
                    $msg = "Please insert building price";
                } else if (intval($param['rencana_serahterima']) <= 0) {
                    $msg = "Please insert Rencana Serah Terima";
                } else if (strlen($param['rencana_serahterima_date']) < 5) {
                    $msg = "Please insert Serah Terima Planning Date";
                } else if (!$amountBalance) {
                    $msg = "Total harga jual tidak sama dengan total amount schedule/tagihan.";
                } else if (!$validMinTJ) {
                    $msg = "Minimum Tanda Jadi is Rp. ". Erems_Box_Tools::toCurrency($minTandaJadi)." .";
                } else if (abs($param['harga_pembulatan']) > $genco->getMaxPembulatan()){
                    $msg = "Harga pembulatan Maksimal Tidak boleh lebih dari +- ".$genco->getMaxPembulatan();
                } else {
                    $setStatus = TRUE;
                }
            }
        }
        return array("msg" => $msg, "status" => $setStatus);
    }

    function tempValidasiKhususCitraGrandCBDCibubur($tglPurchase, $session) {
        $hasil = array("STATUS" => FALSE, "MSG" => "Validasi run...","TGL"=>NULL);

        if ($session->getProject()->getId() === 2075 && $session->getPt()->getId() === 2097) {
            $tanggalSekarang = new DateTime("1900-01-01 00:00:00.000000");
            $tanggalSekarang->setDate(date("Y"), date("m"), date("d"));
            $tglPurchase = new DateTime($tglPurchase);
            $tglSakral = new DateTime("1900-01-01 00:00:00.000000");
            $tglSakral->setDate(2017,10,28);
            
            if($tglPurchase <= $tglSakral){
                $tglPurchase->setDate(2017,10,28);
                $hasil["STATUS"] = FALSE;
                $hasil["MSG"] = "Tanggal purchase di bawah tanggal sakral.";
                $hasil["TGL"] = $tglPurchase;
            }else{
                $hasil["STATUS"] = TRUE;
                $hasil["MSG"] = "Tanggal purchase di atas tgl sakral.";
            }
            
            
        } else {
            $hasil["STATUS"] = TRUE;
            $hasil["MSG"] = "Validasi bukan untuk proyek ini.";
        }
        return $hasil;
    }

    function nomerVAExist($nomerVA,$project,$pt,$bank,$id) {
        $hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_nomervaexist_read',
                $project,
                $pt,
                $nomerVA,
                $bank,
                $id
                );
        return $hasil; 
    }

    function getOne($unitId){
        $hasil = array();
        // $unitId = (int) $unit->getId();
        if($unitId==0){
            return $hasil;
        }
        $hasil = $this->execSP3('sp_unit_one_read',$unitId);
        return $hasil;
    }

    private function setCounterNomorDokumen($param){
    	
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();

        $unitDb = $this->getOne(intval($param['unit_unit_id']));
        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($param['purchase_date'])));
        $counter->getProject()->setId($unitDb[1][0]["project_id"]);
        $counter->getPt()->setId($unitDb[1][0]["pt_id"]);

        $getIsPurchaseNomorResetByProject = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getIsPurchaseNomorResetByProject();
        if($getIsPurchaseNomorResetByProject){
            $pt_id = $this->session->getCurrentPtId();
        }else{
            $pt_id = $counter->getPt()->getId();
        }

        $isResetByCounter = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($unitDb[1][0]["project_id"], $pt_id)->getIsPurchaseNomorResetByCluster();
        // kalau reset hanya per tahun makan set cluster = 0 , jika pakai per tahun dan per cluster set cluster by unit
        $counter->getCluster()->setId($isResetByCounter == 1 ? $unitDb[1][0]["cluster_id"] : 0);
        if ($isResetByCounter < 0) { // tidak reset per tahun dan cluster
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, 0, 0);
        } else {
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, $counter->getCluster()->getId(), $counter->getYear());
        }
        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());
        $counter->setId($lastNumber->getId());
        $counter->setNextNumber(intval($param['purchaseletter_no']) + 1);

        if ($counter->getId() == 0) {
            $hasilSaveCounter = $daoCounter->save($counter);
        } else {
            $hasilSaveCounter = $daoCounter->update($counter);
        }
    }

    private function generateNomorDokumen($param){
        // GENERATE NOMOR DOKUMEN
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();
        
        // $dao = new Erems_Models_Unit_UnitDao();
        $unitDb = $this->getOne(intval($param['unit_unit_id']));

        $session = new Erems_Box_Models_App_Session();
        $session->setSession('user', $this->session->getUserId());
   		$session->setSession('pt', $this->session->getCurrentPtId());
   		$session->setSession('project', $this->session->getCurrentProjectId());
   		$session->setSession('group', $this->session->getCurrentGroupId());

        // $unitDb = $this->unitDb;
        // $purchaseletter = $this->purchaseletter;

        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($param['purchase_date'])));
        $counter->getProject()->setId($unitDb[1][0]["project_id"]);
        $counter->getPt()->setId($unitDb[1][0]["pt_id"]);

        //add by imaam on 02/09/2019
        $getIsPurchaseNomorResetByProject = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getIsPurchaseNomorResetByProject();
        if($getIsPurchaseNomorResetByProject){
            $pt_id = $this->session->getCurrentPtId();
        }else{
            $pt_id = $counter->getPt()->getId();
        }


        //$counter->getCluster()->setId($unitDb[1][0]["cluster_id"]);
        $isResetByCounter = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($unitDb[1][0]["project_id"], $pt_id)->getIsPurchaseNomorResetByCluster();
       
        // kalau reset hanya per tahun makan set cluster = 0 , jika pakai per tahun dan per cluster set cluster by unit
        $counter->getCluster()->setId($isResetByCounter == 1 ? $unitDb[1][0]["cluster_id"] : 0);
        if ($isResetByCounter < 0) { // tidak reset per tahun dan cluster
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, 0, 0);
        } else {
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, $counter->getCluster()->getId(), $counter->getYear());
        }
        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());
        $counter->setId($lastNumber->getId());
        if (intval($lastNumber->getNextNumber()) == 0) {
            $lastNumber->setNextNumber(1);
        }
        $paramsNomor = array(
            "nomor" => $lastNumber->getNextNumber(),
            "project_id" => $counter->getProject()->getId(),
            "pt_id" => $counter->getPt()->getId(),
            "purchase_date" => $param['purchase_date'],
            "cluster_code" => $unitDb[1][0]["cluster_code"],
            "productcategory_code" => $unitDb[1][0]["productcategory_productcategory"] == "BANGUNAN" ? "B" : "K",
            "block_code" => $unitDb[1][0]["block_code"]
        );

        $newNomor = NULL;
        $nomorUseGenco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->isNomorUseGenco();
        if($nomorUseGenco){
            $newNomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $pt_id)->getPurchaseNomorTpl($paramsNomor);
        }else{
            $newNomor = $this->getNewNomor($paramsNomor);
        }
        if (strlen($newNomor) < 5) {
            echo "TIDAK ADA NOMOR PURCHASELETTER";

            die();
        }
        return $newNomor;
        // /GENERATE NOMOR DOKUMEN
    }

    private function getNewNomor($paramsNomor) {
        $subj = new Erems_Models_Purchaseletter_NomorSubject();
        $subj->attach(new Erems_Models_Purchaseletternomor_Biasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_Local());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOff);
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOrc());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarRes());
        $subj->attach(new Erems_Models_Purchaseletternomor_BmwCilegon());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraIndah());
        $subj->attach(new Erems_Models_Purchaseletternomor_Bizpark3Bekasi());
        $subj->attach(new Erems_Models_Purchaseletternomor_Palu());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunJoManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_LosariMakassar());
        $subj->attach(new Erems_Models_Purchaseletternomor_Medan());
        $subj->attach(new Erems_Models_Purchaseletternomor_Lampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandLampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandCibubur());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandTallasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandGreenlake());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandAmbon());
        $subj->attach(new Erems_Models_Purchaseletternomor_TheTamanDayuSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPalembang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandKendari());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranMutiaraYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunGardenYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraHarmoniSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandDenpasar());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraRaya());
        $subj->attach(new Erems_Models_Purchaseletternomor_BarsaCityYogya());
		$subj->attach(new Erems_Models_Purchaseletternomor_CitralakeSuites());
        $subj->setPurchaseParams($paramsNomor);
        return $subj->getPurchaseNomor();
    }

    function dataGenco($param){
    	//Setting All default data from genco and others things
        $generalDao = new Erems_Models_Master_GeneralDao();
        $allDownline = $generalDao->getAllDownline($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
	    $return['data']['DOWNLINE'] = $allDownline;

        $testingSession = new Erems_Box_Models_App_Session();
        $testingSession->setSession('user', $this->session->getUserId());
   		$testingSession->setSession('pt', $this->session->getCurrentPtId());
   		$testingSession->setSession('project', $this->session->getCurrentProjectId());
   		$testingSession->setSession('group', $this->session->getCurrentGroupId());
        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($testingSession, "PURCHASELETTER");

	    $pt = new Erems_Box_Models_Master_Pt();
        $appDao = new Erems_Models_Master_AppDao();
        $project = new Erems_Box_Models_Master_Project();

        if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
            $pt->setName('CONSTANT_PT');
        } else {
            $ptInfo = $appDao->getPt( $this->session->getCurrentPtId());
            $pt->setArrayTable($ptInfo[0][0]);
            $projectInfo = $appDao->getProject($this->session->getCurrentProjectId());
            $project->setArrayTable($projectInfo[0][0]);
        }
        $isAuthorizerUser = FALSE;
        if (Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getAucoMode() == 0) {
            $isAuthorizerUser = FALSE;
            $superUserPurchase = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), "PURCHASELETTER_SUPERUSER");
            $isAuthorizerUser = Erems_Box_Tools::integerOrArray($this->session->getUserId(), $superUserPurchase) ? TRUE : FALSE;
        } else {
            $ses = $this->session;
            $isAuthorizerUser = intval($paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID']) == $ses->getCurrentGroupId();
            $paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID'] = 0;
        }
        $is_plrevision = FALSE;
        $plrevision_supervisor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getPurchaseletterRevision();
        if(is_array($plrevision_supervisor)) {
            $is_plrevision = in_array($this->session->getUserId(), $plrevision_supervisor);
        } else {
            $is_plrevision = $this->session->getUserId() == $plrevision_supervisor ? TRUE : FALSE;
        }
        $templatePrintout = NULL;
        $isPurchasePrintoutCentralized = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->isPurchasePrintoutCentralized();
        if ($isPurchasePrintoutCentralized) {
            $templatePrintout = Erems_Models_Purchaseletter_SptPrintoutCentralized::getTemplate();
        } else {
            $templatePrintout = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getPurchPrintoutTemplate();
        }
        $templatePayScheme = array();
        $tempTemplatePayScheme = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getTplSPTPaymentScheme();
        if (!is_array($tempTemplatePayScheme)) {
            $templatePayScheme[] = array("value" => $tempTemplatePayScheme, "text" => "Payment Scheme");
        } else {
            $templatePayScheme = $tempTemplatePayScheme;
        }

        $isRescheduleApproveUser = FALSE;
        $isRescheduleApproveUser = Erems_Box_Tools::integerOrArray($this->session->getUserId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), "PURCHASELETTER_SUPERUSER"));

        //check after update ==========================================================================================>>>>>>>>>>>>>>>>>>>>>>>>>
        $dataChangeNameValid = FALSE;
        $dataChangeNameErrorMsg = "Biaya Admin Ganti Nama Belum Lunas.";

        $others = array(
                "ISAUTHORIZEDUSER" => $isAuthorizerUser,
                "PLREVISION_SUPERVISOR" => $is_plrevision,
                "SOURCEMONEY_DEFAULT" => Erems_Box_Config::SOURCEMONEY_DEFAULT,
                "SCHEDULE_PEMBULATAN" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSchedulePembulatan(),
                "PT_NAME" => $pt->getName(),
                "ISSUPERVISOR" => $this->session->getCurrentGroupId() == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getUserGroupPurchaseletterSupervisor(),
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "TEMPLATEPRINTOUT" => $templatePrintout,
                "TEMPLATEPRINTOUTPAYSCHEME" => $templatePayScheme,
                "DATACHANGENAME" => $dataChangeNameValid,
                "DATACHANGENAME_ERR_MSG" => $dataChangeNameErrorMsg,
                "DOWNLINE" => $allDownline,
                "IS_SH1" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->activateSh1Features(),
                "SHOW_REWARD" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->isPurchaseletterShowReward(),
                "APPROVENOW_RSCH" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->useApproveNowReschedule(),
                "IS_FLASHPRINT" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->useFlashPrintPurchaseletter(),
                "USE_RUBIY_PROLIBS" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->useRumusBiayaProlibs(),
                "IS_PURCHASEPRINTKTPSIM" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->isPurchasePrintKtpSim(),
                "USE_RUMUSBIAYAPROLIBSPURCHASELETTER" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->useRumusBiayaProlibsPurchaseletter(),
                "NOPTKP" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NOPTKP(),
                "pembulatan1000" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->pembulatan1000(),
	            "RESCHEDULEAPPROVEUSER" => $isRescheduleApproveUser
              );
        return $others;
    }

    function checkauthorize($param){
    	// $data = $this->getAppData();
        $testingSession = new Erems_Box_Models_App_Session();
        $testingSession->setSession('user', $this->session->getUserId());
   		$testingSession->setSession('pt', $this->session->getCurrentPtId());
   		$testingSession->setSession('project', $this->session->getCurrentProjectId());
   		$testingSession->setSession('group', $this->session->getCurrentGroupId());
        $tglPurchase = $param["purchase_date"];
        // get closing paramater
        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($testingSession, "GLOBAL");
        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);
        $validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($tglPurchase, $tanggalClosing);
        $otherAT = array(array(
                "ISAUTHORIZEDUSER" => $this->session->getUserId() == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER ? TRUE : FALSE,
                "VALIDASITGLCLOSING" => $validasiTanggalClosing
        ));
        return $otherAT;
    }

	function authlogin($param) {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        // $data = $this->getAppData();
        $data = $param;
        $auth = new Erems_Box_Models_Auth_Auth();
        $result = $auth->ldapLogin($data["a"], $data["b"]);
        $loginSuccess = false;
        $msg = "Login Error";
        if ($result) {
            $dao = new Erems_Models_Master_UserDao();
            $userInfo = $dao->getUser($data["a"]);
            if (array_key_exists(0, $userInfo)) {
                if (array_key_exists(0, $userInfo[0])) {
                    if (array_key_exists('user_id', $userInfo[0][0])) {
                        $userId = $userInfo[0][0]['user_id'];

                        if ($userId == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER) {
                            $loginSuccess = TRUE;
                            $msg = "Success";
                        } else {
                            $msg = "Not Authorized User";
                        }
                    }
                }
            }
        } else {
            $msg = "Invalid username or password";
        }
        $otherAT = array(array(
                "LOGINSUCCESS" => $loginSuccess,
                "LOGINMSG" => $msg
        ));
        $dm->setHasil(array($otherAT));
        return $dm;
    }

    function reschedule($param) {
        $hasil = array();
        $id = (int) $param['purchaseletter_id'];
        if ($id == 0)
            return $hasil;
        $hasil = $this->execSP3('sp_purchaseletternew_reschedule_read', $id);

      	$modelReschedule = array(
			array('name' => "reschedule_id", 'mapping' => "reschedule.reschedule_id"),
			array('name' => "purchaseletter_purchaseletter_id", 'mapping' => "reschedule.purchaseletter_purchaseletter_id"),
			array('name' => "reason", 'mapping' => "reschedule.reason"),
			array('name' => "is_approve", 'mapping' => "reschedule.is_approve"),
			array('name' => "approve_date", 'mapping' => "reschedule.approve_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "rencanaserahterima_date", 'mapping' => "reschedule.rencanaserahterima_date"),
			array('name' => "rencanaserahterima_month", 'mapping' => "reschedule.rencanaserahterima_month"),
			array('name' => "Addon", 'mapping' => "reschedule.Addon", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "purchaseletter_purchaseletter_id", 'mapping' => "purchaseletter.purchaseletter_id"),
			array('name' => "purchaseletter_purchaseletter_no", 'mapping' => "purchaseletter.purchaseletter_no"),
			array('name' => "purchaseletter_purchase_date", 'mapping' => "purchaseletter.purchase_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "purchaseletter_unit_id", 'mapping' => "purchaseletter.unit_id"),
			array('name' => "purchaseletter_customer_id", 'mapping' => "purchaseletter.customer_id"),
			array('name' => "purchaseletter_city_city_name", 'mapping' => "purchaseletter.city_city_name"),
			array('name' => "purchaseletter_salesman_id", 'mapping' => "purchaseletter.salesman_id"),
			array('name' => "purchaseletter_total_payment", 'mapping' => "purchaseletter.total_payment"),
			array('name' => "purchaseletter_remaining_balance", 'mapping' => "purchaseletter.remaining_balance"),
			array('name' => "purchaseletter_api_aci", 'mapping' => "purchaseletter.api_aci"),
			array('name' => "purchaseletter_downline_id", 'mapping' => "purchaseletter.downline_id"),
			array('name' => "purchaseletter_keterangan_bayar", 'mapping' => "purchaseletter.keterangan_bayar"),
			array('name' => "purchaseletter_keterangan_1", 'mapping' => "purchaseletter.keterangan_1"),
			array('name' => "purchaseletter_keterangan_2", 'mapping' => "purchaseletter.keterangan_2"),
			array('name' => "purchaseletter_keterangan_3", 'mapping' => "purchaseletter.keterangan_3"),
			array('name' => "purchaseletter_house_advisor", 'mapping' => "purchaseletter.house_advisor"),
			array('name' => "purchaseletter_manager", 'mapping' => "purchaseletter.manager"),
			array('name' => "purchaseletter_hs_keuangan", 'mapping' => "purchaseletter.hs_keuangan"),
			array('name' => "purchaseletter_rencanaserahterima_date", 'mapping' => "purchaseletter.rencanaserahterima_date"),
			array('name' => "purchaseletter_Addon", 'mapping' => "purchaseletter.Addon", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "purchaseletter_promo", 'mapping' => "purchaseletter.promo"),
			array('name' => "purchaseletter_persen_bayar", 'mapping' => "purchaseletter.persen_bayar"),
			array('name' => "purchaseletter_total_bayar", 'mapping' => "purchaseletter.total_bayar"),
			array('name' => "purchaseletter_unit_progress", 'mapping' => "purchaseletter.unit_progress"),
			array('name' => "purchaseletter_last_progress_date", 'mapping' => "purchaseletter.last_progress_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "purchaseletter_realisation_serahterima_date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name' => "purchaseletter_is_lunas", 'mapping' => "purchaseletter.is_lunas"),
			array('name' => "purchaseletter_lunas_date", 'mapping' => "purchaseletter.lunas_date"),
			array('name' => "purchaseletter_firstpurchase_date", 'mapping' => "purchaseletter.firstpurchase_date"),
			array('name' => "purchaseletter_is_draft", 'mapping' => "purchaseletter.is_draft"),
			array('name' => "purchaseletter_unit_virtualaccount_bca", 'mapping' => "purchaseletter.unit_virtualaccount_bca"),
			array('name' => "purchaseletter_unit_virtualaccount_mandiri", 'mapping' => "purchaseletter.unit_virtualaccount_mandiri"),
			array('name' => "purchaseletter_harga_total_jual", 'mapping' => "purchaseletter.harga_total_jual"),
			array('name' => "purchaseletter_harga_netto", 'mapping' => "purchaseletter.harga_netto"),
			array('name' => "purchaseletter_customer_npwp", 'mapping' => "purchaseletter.customer_npwp"),
			array('name' => "purchaseletter_plafon_kpr", 'mapping' => "purchaseletter.plafon_kpr"),
			array('name' => "purchaseletter_purchaseletter_customer_name", 'mapping' => "purchaseletter.purchaseletter_customer_name"),
			array('name' => "purchaseletter_cluster_id", 'mapping' => "purchaseletter.cluster_id"),
			array('name' => "detail"),
			array('name' => "deletedRows")
		);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

        if(is_array($hasil[1])){
        	$return['totalRow'] = $hasil[0][0]['totalRow'];
	        $return['model'] = $modelReschedule;
	        foreach ($hasil[1] as $value) {
	        	$return['data'][] = array(
					"purchaseletter" => array(
						"purchaseletter_id" => $value['purchaseletter_id']
					),
					"reschedule" => array(
						"reschedule_id" => $value['reschedule_id'],
						"purchaseletter_purchaseletter_id" => $value['purchaseletter_id'],
						"reason" => $value['reason'],
						"is_approve" => $value['is_approve'],
						"approve_date" => $value['approve_date'],
						"rencanaserahterima_date" => $value['rencanaserahterima_date'],
						"rencanaserahterima_month" => $value['rencanaserahterima_month'],
						"Addon" => $value['Addon'],
					)
	        	);
	        }
	    }
        return $return;  
    }
    function getScheduleById($param) {
        $hasil = array();
        $id = (int) $param['purchaseletter_id'];
        $reschedule_id = (int) $param['reschedule_id'];
        if ($id == 0 && $reschedule_id == 0)
            return $hasil;
        $sp_exec = 'sp_purchaseletternew_kartupiutangschedule_read';
        if(isset($param['reschedule_id'])){
        	$sp_exec = 'sp_purchaseletternew_reschschedule_read'; 
        	$id = $reschedule_id; 
        }

        $hasil = $this->execSP3($sp_exec, $id);

      	$modelReschedule = array(
			array('name'=> "schedule_id", 'mapping' => "schedule.schedule_id"),
			array('name'=> "scheduletype_id", 'mapping' => "schedule.scheduletype_id"),
			array('name'=> "purchaseletter_id", 'mapping' => "schedule.purchaseletter_id"),
			array('name'=> "description", 'mapping' => "schedule.description"),
			array('name'=> "termin", 'mapping' => "schedule.termin"),
			array('name'=> "duedate", 'mapping' => "schedule.duedate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "amount", 'mapping' => "schedule.amount"),
			array('name'=> "remaining_balance", 'mapping' => "schedule.remaining_balance"),
			array('name'=> "sourcemoney_sourcemoney_id", 'mapping' => "schedule.sourcemoney_sourcemoney_id"),
			array('name'=> "denda", 'mapping' => "schedule.denda"),
			array('name'=> "is_pay", 'mapping' => "schedule.is_pay"),
			array('name'=> "remaining_denda", 'mapping' => "schedule.remaining_denda"),
			array('name'=> "sp1_date", 'mapping' => "schedule.sp1_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp1_no", 'mapping' => "schedule.sp1_no"),
			array('name'=> "sp1_plandate", 'mapping' => "schedule.sp1_plandate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp2_date", 'mapping' => "schedule.sp2_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp2_no", 'mapping' => "schedule.sp2_no"),
			array('name'=> "sp2_plandate", 'mapping' => "schedule.sp2_plandate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp3_date", 'mapping' => "schedule.sp3_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp3_no", 'mapping' => "schedule.sp3_no"),
			array('name'=> "sp3_plandate", 'mapping' => "schedule.sp3_plandate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp4_date", 'mapping' => "schedule.sp4_date", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp4_no", 'mapping' => "schedule.sp4_no"),
			array('name'=> "sp4_plandate", 'mapping' => "schedule.sp4_plandate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp1_userdate", 'mapping' => "schedule.sp1_userdate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp2_userdate", 'mapping' => "schedule.sp2_userdate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp3_userdate", 'mapping' => "schedule.sp3_userdate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "sp4_userdate", 'mapping' => "schedule.sp4_userdate", 'type' => "date", 'dateFormat' => "Y-m-d H:i:s.u"),
			array('name'=> "lama_tunggakan", 'mapping' => "schedule.lama_tunggakan"),
			array('name'=> "scheduletype_scheduletype_id", 'mapping' => "scheduletype.scheduletype_id"),
			array('name'=> "scheduletype_scheduletype", 'mapping' => "scheduletype.scheduletype"),
			array('name'=> "scheduletype_description", 'mapping' => "scheduletype.description"),
			array('name'=> "sourcemoney_sourcemoney_id", 'mapping' => "sourcemoney.sourcemoney_id"),
			array('name'=> "sourcemoney_sourcemoney", 'mapping' => "sourcemoney.sourcemoney"),
			array('name'=> "sourcemoney_description", 'mapping' => "sourcemoney.description")
		);
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;

        if(is_array($hasil[1])){
        	$return['totalRow'] = $hasil[0][0]['totalRow'];
	        $return['model'] = $modelReschedule;
			$return['dataPrintout'] = $hasil[1];
	        foreach ($hasil[1] as $value) {
	        	$return['data'][] = array(
	        		"schedule" => array(
						'schedule_id' => $value['schedule_id'],
						'purchaseletter_id' => $value['purchaseletter_id'],
						'termin' => $value['termin'],
						'duedate' => $value['duedate'],
						'amount' => $value['amount'],
						'remaining_balance' => $value['remaining_balance']
					),
					"scheduletype" => array(
						"scheduletype_id" => $value['scheduletype_scheduletype_id'],
						"scheduletype" => $value['scheduletype_scheduletype'],
						"description" => $value['scheduletype_description']
					),
					"sourcemoney" => array(
						"sourcemoney_id" => $value['sourcemoney_sourcemoney_id'],
						"sourcemoney" => $value['sourcemoney_sourcemoney'],
						"description" => $value['sourcemoney_description']
					)
	        	);
	    //     	$return['data'][] = array(
					// "schedule" => array(
					// 	"schedule_id" => $value['schedule_id'],
					// 	"scheduletype_id" => $value['scheduletype_id'],
					// 	"purchaseletter_id" => $value['purchaseletter_id'],
					// 	"description" => $value['description'],
					// 	"termin" => $value['termin'],
					// 	"duedate" => $value['duedate'],
					// 	"amount" => $value['amount'],
					// 	"remaining_balance" => $value['remaining_balance'],
					// 	"sourcemoney_sourcemoney_id" => $value['sourcemoney_sourcemoney_id'],
					// 	"denda" => $value['denda'],
					// 	"is_pay" => $value['is_pay'],
					// 	"remaining_denda" => $value['remaining_denda'],
					// 	"sp1_date" => $value['sp1_date'],
					// 	"sp1_no" => $value['sp1_no'],
					// 	"sp1_plandate" => $value['sp1_plandate'],
					// 	"sp2_date" => $value['sp2_date'],
					// 	"sp2_no" => $value['sp2_no'],
					// 	"sp2_plandate" => $value['sp2_plandate'],
					// 	"sp3_date" => $value['sp3_date'],
					// 	"sp3_no" => $value['sp3_no'],
					// 	"sp3_plandate" => $value['sp3_plandate'],
					// 	"sp4_date" => $value['sp4_date'],
					// 	"sp4_no" => $value['sp4_no'],
					// 	"sp4_plandate" => $value['sp4_plandate'],
					// 	"sp1_userdate" => $value['sp1_userdate'],
					// 	"sp2_userdate" => $value['sp2_userdate'],
					// 	"sp3_userdate" => $value['sp3_userdate'],
					// 	"sp4_userdate" => $value['sp4_userdate'],
					// 	"lama_tunggakan" => $value['lama_tunggakan']
					// ),
					// "scheduletype" => array(
					// 	"scheduletype_id" => $value['scheduletype_scheduletype_id'],
					// 	"scheduletype" => $value['scheduletype_scheduletype'],
					// 	"description" => $value['scheduletype_description']
					// ),
					// "sourcemoney" => array(
					// 	"sourcemoney_id" => $value['sourcemoney_sourcemoney_id'],
					// 	"sourcemoney" => $value['sourcemoney_sourcemoney'],
					// 	"description" => $value['sourcemoney_description']
					// )
	    //     	);
	        }
	    }
        return $return;  
    }
    function createReschedule($param) {
        $return['success'] = false;
    	$data = json_decode(json_decode($param['data'],true),true);
    	$paramdetail = $data['dataSchedule'];
    	$deletedRows = '';

    	$sp_exec = 'sp_purchaseletternew_reschedule_create';
    	if($data['reschedule_id'] != ''){
    		$sp_exec = 'sp_purchaseletternew_reschedule_update';
			$deletedRows = preg_replace('/(,)/', '~', $data['deletedRows']);
			$deletedRows = preg_replace('/(~)$/', '', $deletedRows);
    	}

    	// detail Schedule
		$purchaseletter_detail_schedule_id                = '';
		$purchaseletter_detail_scheduletype_id            = '';
		$purchaseletter_detail_scheduletype_scheduletype  = '';
		$purchaseletter_detail_termin                     = '';
		$purchaseletter_detail_duedate                    = '';
		$purchaseletter_detail_amount                     = '';
		$purchaseletter_detail_sourcemoney_sourcemoney_id = '';
		$purchaseletter_detail_remaining_balance          = '';

		if (is_array($paramdetail) && count($paramdetail) > 0) {
            foreach ($paramdetail as $idx => $dataValue) {
                foreach ($dataValue as $key => $value) {
                    switch ($key) {
                        case 'schedule_id' : $purchaseletter_detail_schedule_id .= $value . "~";
                            break;
						case 'scheduletype_scheduletype_id' : $purchaseletter_detail_scheduletype_id .= $value ."~";
							break;
						case 'scheduletype_scheduletype' : $purchaseletter_detail_scheduletype_scheduletype .= $value ."~";
							break;
						case 'termin' : $purchaseletter_detail_termin .= $value ."~";
							break;
						case 'duedate' : $purchaseletter_detail_duedate .= $value ."~";
							break;
						case 'amount' : $purchaseletter_detail_amount .= $value ."~";
							break;
						case 'sourcemoney_sourcemoney_id' : $purchaseletter_detail_sourcemoney_sourcemoney_id .= $value ."~";
							break;
						case 'remaining_balance' : $purchaseletter_detail_remaining_balance .= $value ."~";
							break;
                    }
                }
            };
			$purchaseletter_detail_schedule_id                = preg_replace('/(~)$/', '', $purchaseletter_detail_schedule_id);
			$purchaseletter_detail_scheduletype_id            = preg_replace('/(~)$/', '', $purchaseletter_detail_scheduletype_id);
			$purchaseletter_detail_scheduletype_scheduletype  = preg_replace('/(~)$/', '', $purchaseletter_detail_scheduletype_scheduletype);
			$purchaseletter_detail_termin                     = preg_replace('/(~)$/', '', $purchaseletter_detail_termin);
			$purchaseletter_detail_duedate                    = preg_replace('/(~)$/', '', $purchaseletter_detail_duedate);
			$purchaseletter_detail_amount                     = preg_replace('/(~)$/', '', $purchaseletter_detail_amount);
			$purchaseletter_detail_sourcemoney_sourcemoney_id = preg_replace('/(~)$/', '', $purchaseletter_detail_sourcemoney_sourcemoney_id);
			$purchaseletter_detail_remaining_balance          = preg_replace('/(~)$/', '', $purchaseletter_detail_remaining_balance);
        }

	    $hasil = $this->execSP3($sp_exec, 
				$data['reschedule_id'],
				$this->session->getUserId(),
                $data['purchaseletter_purchaseletter_id'],
                $data['reason'],
                isset($data['is_approve'])?$data['is_approve']:0,
                isset($data['approve_date'])?date('Y-m-d', strtotime($data['approve_date'])):'',
				date('Y-m-d', strtotime($data['rencanaserahterima_date'])),
                $data['rencanaserahterima_month'],
                $purchaseletter_detail_schedule_id,
				// $purchaseletter_detail_scheduletype_id,
				$purchaseletter_detail_scheduletype_scheduletype,
				$purchaseletter_detail_termin,
				$purchaseletter_detail_duedate,
				$purchaseletter_detail_amount,
				$purchaseletter_detail_sourcemoney_sourcemoney_id,
				$purchaseletter_detail_remaining_balance,
				$deletedRows
        );

		$return['total'] = count($hasil[0]);
		$return['success'] = $hasil[0]>0;
		$return['data'] = $hasil[0];

        return $return;  
    }

    function scheduleadvanceinit() {
		$return['totalRow'] = 0;
		$return['data'] = '';
        $return['model'] = null;
      	$modelscheduletype = array(
			array('mapping' => "scheduletype.scheduletype_id", 'name' => "scheduletype_id"),
			array('mapping' => "scheduletype.scheduletype", 'name' => "scheduletype"),
			array('mapping' => "scheduletype.description", 'name' => "description")
      	);

		$masterGeneralDao = new Erems_Models_Master_GeneralDao();
        $allscheduletype = $masterGeneralDao->getAllScheduleType();
        if(is_array($allscheduletype[1])){
	        $return['data']['scheduletype']['model'] = $modelscheduletype;
	        foreach ($allscheduletype[1] as $value) {
	        	$return['data']['scheduletype']['data'][] = array(
					'scheduletype_id' => $value['scheduletype_id'],
					'scheduletype' => $value['scheduletype'],
					'description' => $value['description']
	        	);
	        }
	    }

        return $return; 
    }

    function approveReschedule($param) {
		$return['total'] = 0;
        $return['model'] = null;
		$return['success'] = false;

        $hasil = $this->execSP3('sp_purchaseletternew_reschedule_approve',
				$this->session->getUserId(),
				$param['reschedule_id']
			);

		$return['total'] = count($hasil[0]);
		$return['success'] = $hasil[0]>0;
		$return['data'] = $hasil[0];

        return $return;
    }

	function deletedReschedule($param) {
		$return['total'] = 0;
        $return['model'] = null;
		$return['success'] = false;

        $hasil = $this->execSP3('sp_purchaseletternew_reschedule_destroy', 
				$param['data'],
				$this->session->getUserId()
			);
		$return['total'] = count($hasil[0]);
		$return['success'] = $hasil[0]>0;
		$return['data'] = $hasil[0];
        
        return $return;
    }

    function printout($param) {
        $hasil = array();
        $hasil = $this->execSP3('sp_purchaseletternew_detail_printout_read', $param['purchaseletter_id'], Erems_Box_Config::SCHTYPE_UANGMUKA,  Erems_Box_Config::SCHTYPE_TANDAJADI);
        return $hasil;
    }

    function process($session, $genco, $wordParser, $paramsTemplate, $fileSrc, $data) {
        // addon 20190114
        // SPT NEW CONCEPT
        // split template berdasarkan pricetype dan product category
        if ($genco->isPurchasePrintoutCentralized()) {
            // replace prefix ".kpr"
            if (strpos($fileSrc, '.kpr') !== false) {
                $fileSrc = str_replace(".kpr", "", $fileSrc);
            }
            $generalDao = new Erems_Models_Master_GeneralDao();
            $globalParams = $generalDao->getGlobalParameterFilter($session->getProject()->getId(), $session->getPt()->getId(), "PURCHASELETTER_TPL_PRINT_");
            $globalParams = $globalParams[0];
            $globalParams = $this->processDbParams($globalParams);

            $prefixAsuransi = "-ASURANSI-";
            $useAsuransi = FALSE;
            $asuransiTextPos = strpos($fileSrc, $prefixAsuransi);

            if ($asuransiTextPos !== FALSE) {
                $useAsuransi = TRUE;
                $fileSrc = str_replace($prefixAsuransi, "", $fileSrc);
                $globalParams["WITH_ASURANSI"] = "TRUE";
            }
            $pInclude = $this->getTextConfig($data["pricetype_pricetype"], $data["productcategory_productcategory"], $data);
            $paramPrefix = "";
            if ($data["pricetype_pricetype"] == "KPR") {
                $paramPrefix = $data["productcategory_productcategory"] == "BANGUNAN" ? "KPR_BGN" : "KPR_KAV";
            } else {
                $paramPrefix = $data["productcategory_productcategory"] == "BANGUNAN" ? "INH_CASH_BGN" : "INH_CASH_KAV";
            }
            $pAlpha = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n");
            if (key_exists("PASAL2", $pInclude)) {
                $dataAddData = $this->addData("pcount", "ptext", $wordParser, $pInclude["PASAL2"], $pAlpha, $data, $globalParams);
                $data = $dataAddData["data"];
            }
            if (key_exists("PASAL3", $pInclude)) {
                $dataAddDataB = $this->addData("pcountb", "ptextb", $wordParser, $pInclude["PASAL3"], $pAlpha, $data, $globalParams);
                $data = $dataAddDataB["data"];
            }
            // pasal x
            if (key_exists("PASALX", $pInclude)) {
                foreach ($pInclude["PASALX"] as $row) {
                    $splitText = $this->splitOptionText($row);
                    if ($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL"] == $splitText["PARAM_VAL"]) {
                        // ganti persen dengan nilai parameter global
                        if (strpos($splitText["TEXT"], "[PERSEN_ANGKA]") !== FALSE) {
                            $splitText["TEXT"] = str_replace("[PERSEN_ANGKA]", $globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL_PERSENTASE"], $splitText["TEXT"]);
                        }
                        if (strpos($splitText["TEXT"], "[PERSEN_TERBILANG]") !== FALSE) {
                            $tempTerbilang = Erems_Box_Library_Terbilang::terbilang($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL_PERSENTASE"], 3);
                            $splitText["TEXT"] = str_replace("[PERSEN_TERBILANG]", str_replace("Rupiah", "", $tempTerbilang), $splitText["TEXT"]);
                        }
                        $data["parac"] = $splitText["TEXT"];
                    }
                }
            }
            //pasal pindah kavling
            if (key_exists("PINDAHKAVLING", $pInclude)) {
                foreach ($pInclude["PINDAHKAVLING"] as $row) {
                    $splitText = $this->splitOptionText($row);
                    if ($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_PINDAHBLOK"] == $splitText["PARAM_VAL"]) {
                        $data["parad"] = $splitText["TEXT"];
                    }
                }
            }
            $spcData = $paramsTemplate["data"];
            if ($spcData["pricetype_pricetype"] == "KPR") {
                $fileSrc = str_replace("INHOUSE_CASH", "KPR", $fileSrc);
                $fileSrc = $this->changeFileNameByProductCategory($spcData, $fileSrc);
            } else {
                $fileSrc = $this->changeFileNameByProductCategory($spcData, $fileSrc);
            }
        }
        //END SPT NEW CONCEPT
        return array(
            "fileSrc" => $fileSrc,
            "data" => $data
        );
    }

    private function changeFileNameByProductCategory($data, $fileName) {
        if ($data["productcategory_productcategory"] == "KAVLING") {
            return str_replace("BANGUNAN", "KAVLING", $fileName);
        }
        return $fileName;
    }

    private function addData($kolomTextA, $kolomTextB, $wordParser, $ketentuanList, $hurufList, $data, $globalParams) {
        $count = 0;
        for ($i = 0; $i < count($ketentuanList); $i++) {
            $optionTextExist = FALSE;
            $splitText = NULL;
            $optionText = "";
            if (strpos($ketentuanList[$i], '##') !== false) {
                $optionTextExist = TRUE;
                $splitText = $this->splitOptionText($ketentuanList[$i]);
                /// sync global param dan option text
                foreach ($globalParams as $k => $v) {
                    if ($k == $splitText["PARAM_NAME"] && $v == $splitText["PARAM_VAL"]) {
                        $optionText = $splitText["TEXT"];
                    }
                }
            }
            if ($optionTextExist && strlen($optionText) > 0) {
                $data[$kolomTextA . '' . ($count + 1)] = $hurufList[$count] . ".";
                $data[$kolomTextB . '' . ($count + 1)] = $optionText;

                $count++;
            }
            if (!$optionTextExist) {
                $data[$kolomTextA . '' . ($count + 1)] = $hurufList[$count] . ".";
                $data[$kolomTextB . '' . ($count + 1)] = $ketentuanList[$i];

                $count++;
            }
        }
        $wordParser->addLoopingField(array($kolomTextA, $kolomTextB), $count);
        return array(
            "data" => $data
        );
    }

    private function splitOptionText($text) {
        $openChar = "[[";
        $closeChar = "]]";
        $posA = strpos($text, $openChar);
        $posB = strpos($text, $closeChar);
        $paramsText = substr($text, $posA + 2, $posB - 2);
        $params = explode("##", $paramsText);
        return array(
            "PARAM_NAME" => $params[0],
            "PARAM_VAL" => $params[1],
            "TEXT" => substr($text, strlen($paramsText) + 4, strlen($text))
        );
    }

    private function getTextConfig($priceType, $productCategory, $par=NULL) {
        $tcInhouseCashBgn = array(
            "PASAL2" => array(
                "Ijin mendirikan bangunan (IMB);",
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[WITH_ASURANSI##TRUE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Pajak Pertambahan Nilai Barang Mewah (PPNBM);",
                "Biaya Administrasi (apabila ada);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL3##OPTION 2]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                //"Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "[[WITH_ASURANSI##FALSE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."."
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            ),
        );
        $tcInhouseCashKav = array(
            "PASAL2" => array("Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[WITH_ASURANSI##TRUE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Ijin mendirikan bangunan (IMB);",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Biaya penyambungan listrik dan air bersih",
                "Pajak Pertambahan Nilai Membangun Sendiri (sesuai ketentuan pemerintah)",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL3##OPTION 2]]Biaya Pemecahan sertikat hak atas tanah",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), ",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT),",
                "Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya Administrasi (apabila ada);",
                "[[WITH_ASURANSI##FALSE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"].""
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );
        $tcKprBgn = array(
            "PASAL2" => array(
                "Ijin Mendirikan Bangunan (IMB);",
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;  ",
                "Pajak Pertambahan Nilai (PPN);",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama pemesan;",
                "[[UM>=12]]Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)",
            ),
            "PASAL3" => array(
                "Pajak Pertambahan Nilai Barang Mewah (PPNBM);",
                "Biaya Administrasi (apabila ada);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya premi dan asuransi jiwa berjangka menurun PT Asuransi Ciputra Indonesia (Ciputra Life) dengan manfaar pertanggungan senilai fasilitas KPR dari Bank."
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."]"
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );
        $tcKprKav = array(
            "PASAL2" => array(
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[UM>=12]]Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Ijin mendirikan bangunan (IMB)",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Biaya penyambungan listrik dan air bersih",
                "Pajak Pertambahan Nilai Membangun Sendiri (sesuai ketentuan pemerintah)",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL3##OPTION 1]]Biaya Pemecahan sertikat hak atas tanah",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), ",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), ",
                "Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA ",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya Administrasi (apabila ada);",
                "Biaya premi asuransi jiwa berjangka menurun dari PT Asuransi Ciputra Indonesia (CiputraLife) dengan manfaat pertanggungan senilai fasilitas KPR dari Bank."
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."]"
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );
        if ($priceType == "CASH" || $priceType == "INHOUSE") {
            if ($productCategory == "BANGUNAN") {
                return $tcInhouseCashBgn;
            } else {
                return $tcInhouseCashKav;
            }
        } else {
            if ($productCategory == "BANGUNAN") {
                return $tcKprBgn;
            } else {
                return $tcKprKav;
            }
        }
    }

    private function processDbParams($dbParams) {
        $params = array(
            "WITH_ASURANSI" => "FALSE",
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK" => NULL
        );
        foreach ($dbParams as $row) {
            //  var_dump($row);
            foreach ($params as $k => $v) {
                if ($row["parametername"] == $k) {
                    $params[$k] = $row["value"];
                }
            }
        }
        return $params;
    }

    public static function getTemplate() {
        return array(
            array("value" => "all\PurchaseLetter-Revisi.INHOUSE_CASH.BANGUNAN-ASURANSI-.docx", "text" => "SPT dengan Asuransi"),
            array("value" => "all\PurchaseLetter-Revisi.INHOUSE_CASH.BANGUNAN.docx", "text" => "SPT")
        );
    }

	function apiaci($param) {
		$return['total'] = 0;
        $return['model'] = null;
		$return['success'] = false;

        $hasil = $this->execSP3('sp_purchaseletternew_setapiaci',
				$this->session->getUserId(),
				$param['purchaseletter_id'],
				$param['apiaci']
			);
        
		$return['total'] = count($hasil[0]);
		$return['success'] = $hasil[0]>0;
		$return['data'] = $hasil[0];

        return $return;
    }

}