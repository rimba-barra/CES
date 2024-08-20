<?php

class Erems_Models_Bankkpr extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function bankkprRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_bankkpr_id'], 
					$param['purchaseletter_id'], 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_plbankkpr_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	function bankkprakadRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['akadconfirmation_id'], 
					$param['purchaseletter_bankkpr_id'], 
					$param['purchaseletter_id'], 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_plbankkprakad_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }

	function bankkprCreate($param = array()) {
		$return['success'] = false;

		$purchaseletter_id_form = $param['purchaseletter_id_form'];
		$notes_batal            = $param['notes_batal'];
		$customer_address       = $param['customer_address'];
		$customer_ktp_address   = $param['customer_ktp_address']; //add by dika 20/19/2022
		$customer_homephone     = $param['customer_homephone'].' ';
		$customer_mobilephone   = $param['customer_mobilephone'].' ';
		$customer_officephone   = $param['customer_officephone'].' ';
		$customer_email         = $param['customer_email'];
		$collector_id           = $param['collector_id'];
		$param_data             = $param['data_detail'];
		$param_akad             = $param['detail_akad'];
		$kpp                    = $param['kpp'];
		$dibiayai_instansi      = $param['dibiayai_instansi'];

		$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$sh_feature = $config_sh->activateSh1Features('admincollection');

		if (is_array($param_data) && count($param_data)){
			try {
				$purchaseletter_bankkpr_id = ''; 
				$purchaseletter_id = ''; 
				$bank_id = ''; 
				$bank_createdby_name = '';
				
				$appraisalplan_date = '';
				$appraisal_date = ''; 
				$appraisal_createdby_name = ''; 
				
				$berkasmasuk_date = ''; 
				$berkasbank_date = '';
				$berkasbank_createdby_name = ''; 
				
				$interviewplan_date = ''; 
				$interview_date = ''; 
				$interview_createdby_name = ''; 
				$interview_pic = '';
				
				$kpr_acc_date = ''; 
				$kpr_realisation = ''; 
				$kpr_tenor = ''; 
				$kpr_interest = ''; 
				$kpr_cicilan = '';
				$kpr_createdby_name = '';
				
				$rejected_date = ''; 
				$nextprocess_date = ''; 
				$reject_createdby_name = ''; 
				
				$akadplan_date = ''; 
				$akad_date = ''; 
				$akad_createdby_name = '';
				
				$is_use = ''; 
				$is_rencana_kpr = ''; 
				$note = ''; 
				
				$is_bayarpajak = ''; 
				$pajak_amount = ''; 
				$temp_id_detail = '';
				
				$deleted = ''; 
				
				$akadconfirmation_id = ''; 
				$akadconfirmation_pl_id = ''; 
				$akadconfirmation_plbankkpr_id = ''; 
				$akadconfirmation_index = ''; 
				$akadconfirmation_date = ''; 
				$akadconfirmation_status_id = ''; 
				$akadconfirmation_note = ''; 
				$deleted_akad = ''; 
				$temp_id_akad = '';

				$debitur_name = '';

				//added by anas 21062021
				$no_sppk = '';

				//added by rico 06042022
				$admin_fee_kpr = '';

				//added by rico 06042022
				$is_cair_fee_kpr = '';
				$tanggal_cair_fee_kpr = '';
				$notes_fee_kpr = '';
				
				//added by rico 12072023
				$nomor_konfirmasi_tunggakan_bank = '';
				$tanggal_konfirmasi_tunggakan = '';
				$lama_tunggakan_konfirmasi_tunggakan = '';

				$nomor_konfirmasi_tunggakan_bank_2 = '';
				$tanggal_konfirmasi_tunggakan_2 = '';
				$lama_tunggakan_konfirmasi_tunggakan_2 = '';

				$nomor_konfirmasi_tunggakan_bank_3 = '';
				$tanggal_konfirmasi_tunggakan_3 = '';
				$lama_tunggakan_konfirmasi_tunggakan_3 = '';

				$nomor_surat_pemberitahuan_buyback_bank = '';
				$tanggal_surat_pemberitahuan_buyback = '';
				$lama_tunggakan_surat_pemberitahuan_buyback = '';
				
				$collector_buyback_id = '';
				$collector_phone = '';
				$nama_pic_bank = '';
				$email_pic_bank = '';
				$phone_pic_bank = '';
				$alamat_bank = '';

				foreach ($param_data as $idx => $data)
				{
					foreach ($data as $key => $value)	
					{
						switch ($key){
							case 'purchaseletter_bankkpr_id': $purchaseletter_bankkpr_id .= intval($value)."~";break;
							case 'purchaseletter_id': $purchaseletter_id .= intval($value)."~";break;
							case 'bank_id': $bank_id .= intval($value)."~";break;
							case 'bank_createdby_name': $bank_createdby_name .= $value."~";break;
							case 'appraisalplan_date': $appraisalplan_date .= $value."~";break;	
							case 'appraisal_date': $appraisal_date .= $value."~";break;
							case 'appraisal_createdby_name': $appraisal_createdby_name .= $value."~";break;
							case 'berkasmasuk_date': $berkasmasuk_date .= $value."~";break;
							case 'berkasbank_date': $berkasbank_date .= $value."~";break;
							case 'berkasbank_createdby_name': $berkasbank_createdby_name .= $value."~";break;
							case 'interviewplan_date': $interviewplan_date .= $value."~";break;
							case 'interview_date': $interview_date .= $value."~";break;
							case 'interview_createdby_name': $interview_createdby_name .= $value."~";break;
							case 'interview_pic': $interview_pic .= $value."~";break;
							case 'kpr_acc_date': $kpr_acc_date .= $value."~";break;
							case 'kpr_realisation': $kpr_realisation .= doubleval($value)."~";break;
							case 'kpr_tenor': $kpr_tenor .= intval($value)."~";break;
							case 'kpr_interest': $kpr_interest .= floatval($value)."~";break;
							case 'kpr_cicilan': $kpr_cicilan .= doubleval($value)."~";break;
							case 'kpr_createdby_name': $kpr_createdby_name .= $value."~";break;
							case 'rejected_date': $rejected_date .= $value."~";break;
							case 'nextprocess_date': $nextprocess_date .= $value."~";break;
							case 'reject_createdby_name': $reject_createdby_name .= $value."~";break;
							case 'akadplan_date': $akadplan_date .= $value."~";break;
							case 'akad_date': $akad_date .= $value."~";break;
							case 'akad_createdby_name': $akad_createdby_name .= $value."~";break;
							case 'is_use': $is_use .= $value."~";break;
							case 'is_rencana_kpr': $is_rencana_kpr .= $value."~";break;
							case 'note': $note .= $value."~";break;	
							case 'is_bayarpajak': $is_bayarpajak .= $value."~";break;	
							case 'pajak_amount': $pajak_amount .= $value."~";break;		
							case 'deleted': $deleted .= $value."~";break;	
							case 'temp_id_detail': $temp_id_detail .= $value."~";break;
							case 'debitur_name': $debitur_name .= $value."~";break;

							//added by anas 21062021
							case 'no_sppk': $no_sppk .= $value."~";break;

							//added by rico 06042022
							case 'admin_fee_kpr': $admin_fee_kpr .= $value."~";break;
							
							//added by rico 21042022
							case 'is_cair_fee_kpr': $is_cair_fee_kpr .= $value."~";break;
							case 'tanggal_cair_fee_kpr': $tanggal_cair_fee_kpr .= $value."~";break;
							case 'notes_fee_kpr': $notes_fee_kpr .= $value."~";break;
				
							//added by rico 12072023
							case 'nomor_konfirmasi_tunggakan_bank': $nomor_konfirmasi_tunggakan_bank .= $value."~";break;
							case 'tanggal_konfirmasi_tunggakan': $tanggal_konfirmasi_tunggakan .= $value."~";break;
							case 'lama_tunggakan_konfirmasi_tunggakan': $lama_tunggakan_konfirmasi_tunggakan .= $value."~";break;

							case 'nomor_konfirmasi_tunggakan_bank_2': $nomor_konfirmasi_tunggakan_bank_2 .= $value."~";break;
							case 'tanggal_konfirmasi_tunggakan_2': $tanggal_konfirmasi_tunggakan_2 .= $value."~";break;
							case 'lama_tunggakan_konfirmasi_tunggakan_2': $lama_tunggakan_konfirmasi_tunggakan_2 .= $value."~";break;

							case 'nomor_konfirmasi_tunggakan_bank_3': $nomor_konfirmasi_tunggakan_bank_3 .= $value."~";break;
							case 'tanggal_konfirmasi_tunggakan_3': $tanggal_konfirmasi_tunggakan_3 .= $value."~";break;
							case 'lama_tunggakan_konfirmasi_tunggakan_3': $lama_tunggakan_konfirmasi_tunggakan_3 .= $value."~";break;

							case 'nomor_surat_pemberitahuan_buyback_bank': $nomor_surat_pemberitahuan_buyback_bank .= $value."~";break;
							case 'tanggal_surat_pemberitahuan_buyback': $tanggal_surat_pemberitahuan_buyback .= $value."~";break;
							case 'lama_tunggakan_surat_pemberitahuan_buyback': $lama_tunggakan_surat_pemberitahuan_buyback .= $value."~";break;

							case 'collector_buyback_id': $collector_buyback_id .= $value."~";break;
							case 'collector_phone': $collector_phone .= $value."~";break;
							case 'nama_pic_bank': $nama_pic_bank .= $value."~";break;
							case 'email_pic_bank': $email_pic_bank .= $value."~";break;
							case 'phone_pic_bank': $phone_pic_bank .= $value."~";break;
							case 'alamat_bank': $alamat_bank .= $value."~";break;

						}							
					}				
				};
				
				$purchaseletter_bankkpr_id = preg_replace('/(~)$/','',$purchaseletter_bankkpr_id);
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$bank_id = preg_replace('/(~)$/','',$bank_id);
				$bank_createdby_name = preg_replace('/(~)$/','',$bank_createdby_name);
				
				$appraisalplan_date = preg_replace('/(~)$/','',$appraisalplan_date);
				$appraisal_date = preg_replace('/(~)$/','',$appraisal_date);
				$appraisal_createdby_name = preg_replace('/(~)$/','',$appraisal_createdby_name);
				
				$berkasmasuk_date = preg_replace('/(~)$/','',$berkasmasuk_date);
				$berkasbank_date = preg_replace('/(~)$/','',$berkasbank_date);
				$berkasbank_createdby_name = preg_replace('/(~)$/','',$berkasbank_createdby_name);
				
				$interviewplan_date = preg_replace('/(~)$/','',$interviewplan_date);
				$interview_date = preg_replace('/(~)$/','',$interview_date);
				$interview_createdby_name = preg_replace('/(~)$/','',$interview_createdby_name);
				$interview_pic = preg_replace('/(~)$/','',$interview_pic);
				
				$kpr_acc_date = preg_replace('/(~)$/','',$kpr_acc_date);
				$kpr_realisation = preg_replace('/(~)$/','',$kpr_realisation);
				$kpr_tenor = preg_replace('/(~)$/','',$kpr_tenor);
				$kpr_interest = preg_replace('/(~)$/','',$kpr_interest);
				$kpr_cicilan = preg_replace('/(~)$/','',$kpr_cicilan);
				$kpr_createdby_name = preg_replace('/(~)$/','',$kpr_createdby_name);
				
				$rejected_date = preg_replace('/(~)$/','',$rejected_date);
				$nextprocess_date = preg_replace('/(~)$/','',$nextprocess_date);
				$reject_createdby_name = preg_replace('/(~)$/','',$reject_createdby_name);
				
				$akadplan_date = preg_replace('/(~)$/','',$akadplan_date);
				$akad_date = preg_replace('/(~)$/','',$akad_date);
				$akad_createdby_name = preg_replace('/(~)$/','',$akad_createdby_name);
				
				$is_use = preg_replace('/(~)$/','',$is_use);
				$is_rencana_kpr = preg_replace('/(~)$/','',$is_rencana_kpr);
				$note = preg_replace('/(~)$/','',$note);
				
				$is_bayarpajak = preg_replace('/(~)$/','',$is_bayarpajak);
				$pajak_amount = preg_replace('/(~)$/','',$pajak_amount);
				$temp_id_detail = preg_replace('/(~)$/','',$temp_id_detail);
				
				$deleted = preg_replace('/(~)$/','',$deleted);
				
				$debitur_name = preg_replace('/(~)$/','',$debitur_name);

				//added by anas 21062021
				$no_sppk = preg_replace('/(~)$/','',$no_sppk);

				//added by rico 06042022
				$admin_fee_kpr = preg_replace('/(~)$/','',$admin_fee_kpr);

				//added by rico 21042022
				$is_cair_fee_kpr = preg_replace('/(~)$/','',$is_cair_fee_kpr);
				$tanggal_cair_fee_kpr = preg_replace('/(~)$/','',$tanggal_cair_fee_kpr);
				$notes_fee_kpr = preg_replace('/(~)$/','',$notes_fee_kpr);

				//added by rico 12072023
				$nomor_konfirmasi_tunggakan_bank = preg_replace('/(~)$/','',$nomor_konfirmasi_tunggakan_bank);
				$tanggal_konfirmasi_tunggakan = preg_replace('/(~)$/','',$tanggal_konfirmasi_tunggakan);
				$lama_tunggakan_konfirmasi_tunggakan = preg_replace('/(~)$/','',$lama_tunggakan_konfirmasi_tunggakan);

				$nomor_konfirmasi_tunggakan_bank_2 = preg_replace('/(~)$/','',$nomor_konfirmasi_tunggakan_bank_2);
				$tanggal_konfirmasi_tunggakan_2 = preg_replace('/(~)$/','',$tanggal_konfirmasi_tunggakan_2);
				$lama_tunggakan_konfirmasi_tunggakan_2 = preg_replace('/(~)$/','',$lama_tunggakan_konfirmasi_tunggakan_2);

				$nomor_konfirmasi_tunggakan_bank_3 = preg_replace('/(~)$/','',$nomor_konfirmasi_tunggakan_bank_3);
				$tanggal_konfirmasi_tunggakan_3 = preg_replace('/(~)$/','',$tanggal_konfirmasi_tunggakan_3);
				$lama_tunggakan_konfirmasi_tunggakan_3 = preg_replace('/(~)$/','',$lama_tunggakan_konfirmasi_tunggakan_3);

				$nomor_surat_pemberitahuan_buyback_bank = preg_replace('/(~)$/','',$nomor_surat_pemberitahuan_buyback_bank);
				$tanggal_surat_pemberitahuan_buyback = preg_replace('/(~)$/','',$tanggal_surat_pemberitahuan_buyback);
				$lama_tunggakan_surat_pemberitahuan_buyback = preg_replace('/(~)$/','',$lama_tunggakan_surat_pemberitahuan_buyback);

				$collector_buyback_id = preg_replace('/(~)$/','',$collector_buyback_id);
				$collector_phone = preg_replace('/(~)$/','',$collector_phone);
				$nama_pic_bank = preg_replace('/(~)$/','',$nama_pic_bank);
				$email_pic_bank = preg_replace('/(~)$/','',$email_pic_bank);
				$phone_pic_bank  = preg_replace('/(~)$/','',$phone_pic_bank);
				$alamat_bank = preg_replace('/(~)$/','',$alamat_bank);

				//detail akad
				if (is_array($param_akad) && count($param_akad) > 0){
					foreach ($param_akad as $idx => $data){
						foreach ($data as $key => $value){
							switch ($key){
								case 'akadconfirmation_id': $akadconfirmation_id .= $value."~";break;
								case 'purchaseletter_id': $akadconfirmation_pl_id .= $value."~";break;
								case 'purchaseletter_bankkpr_id': $akadconfirmation_plbankkpr_id .= $value."~";break;
								case 'akadconfirmation_index': $akadconfirmation_index .= $value."~";break;
								case 'akadconfirmation_date': $akadconfirmation_date .= $value."~";break;
								case 'akadconfirmation_status_id': $akadconfirmation_status_id .= $value."~";break;	
								case 'akadconfirmation_note': $akadconfirmation_note .= $value."~";break;	
								case 'deleted': $deleted_akad .= $value."~";break;
								case 'temp_id_akad': $temp_id_akad .= $value."~";break;
							}							
						}				
					};
					
					$akadconfirmation_id = preg_replace('/(~)$/','',$akadconfirmation_id);
					$akadconfirmation_pl_id = preg_replace('/(~)$/','',$akadconfirmation_pl_id);
					$akadconfirmation_plbankkpr_id = preg_replace('/(~)$/','',$akadconfirmation_plbankkpr_id);
					$akadconfirmation_index = preg_replace('/(~)$/','',$akadconfirmation_index);
					$akadconfirmation_date = preg_replace('/(~)$/','',$akadconfirmation_date);
					$akadconfirmation_status_id = preg_replace('/(~)$/','',$akadconfirmation_status_id);
					$akadconfirmation_note = preg_replace('/(~)$/','',$akadconfirmation_note);
					$deleted_akad = preg_replace('/(~)$/','',$deleted_akad);
					$temp_id_akad = preg_replace('/(~)$/','',$temp_id_akad);
				}

				$result = $this->execSP3('sp_plbankkpr_create', 
									$purchaseletter_bankkpr_id,
									$purchaseletter_id, 
									$bank_id,
									$bank_createdby_name,
									
									$appraisalplan_date,
									$appraisal_date, 
									$appraisal_createdby_name, 
									
									$berkasmasuk_date,
									$berkasbank_date,
									$berkasbank_createdby_name, 
									
									$interviewplan_date,
									$interview_date,
									$interview_createdby_name,
									$interview_pic,
									
									$kpr_acc_date, 
									$kpr_realisation, 
									$kpr_tenor,
									$kpr_interest, 
									$kpr_cicilan,
									$kpr_createdby_name,
									
									$rejected_date, 
									$nextprocess_date, 
									$reject_createdby_name, 
									
									$akadplan_date,
									$akad_date, 
									$akad_createdby_name,
									
									$is_use,
									
									$note,
									
									$is_bayarpajak,
									$pajak_amount,
									
									$deleted,

									$debitur_name,
									
									$temp_id_detail,
								   
								   	$akadconfirmation_id,
									$akadconfirmation_pl_id,
									$akadconfirmation_plbankkpr_id,
									$akadconfirmation_index,
									$akadconfirmation_date,
									$akadconfirmation_status_id,
									$akadconfirmation_note,
									$deleted_akad,
									$temp_id_akad,
									
									$notes_batal,
									
									$sh_feature,
									$customer_address,
									$customer_ktp_address, //add by dika 20/12/2022
									$customer_homephone,
									$customer_mobilephone,
									$customer_email,
									$customer_officephone,
									$collector_id,
								   
								    $this->session->getUserId(),
								    '1',

									//added by anas 21062021
								    $no_sppk,
								    // added by rico 27012022
								    $dibiayai_instansi,

									//added by rico 06042022
								    $admin_fee_kpr,

									//added by rico 21042022
								    $is_cair_fee_kpr,
								    $tanggal_cair_fee_kpr,
								    $notes_fee_kpr,
								    $is_rencana_kpr,

								    // added by rico 12072023
								    $nomor_konfirmasi_tunggakan_bank,
								    $tanggal_konfirmasi_tunggakan,
								    $nomor_surat_pemberitahuan_buyback_bank,
								    $tanggal_surat_pemberitahuan_buyback,
								    $lama_tunggakan_konfirmasi_tunggakan,
								    $lama_tunggakan_surat_pemberitahuan_buyback,
								    $nomor_konfirmasi_tunggakan_bank_2,
								    $tanggal_konfirmasi_tunggakan_2,
								    $lama_tunggakan_konfirmasi_tunggakan_2,
								    $nomor_konfirmasi_tunggakan_bank_3,
								    $tanggal_konfirmasi_tunggakan_3,
								    $lama_tunggakan_konfirmasi_tunggakan_3,
									$collector_buyback_id,
									$collector_phone,
									$nama_pic_bank,
									$email_pic_bank,
									$phone_pic_bank,
									$alamat_bank
								); 

				$return['total']   = $result[0];
				$return['success'] = $result[0]>0;

			} catch(Exception $e) { }
		} else {
			try {
				$data = array (
					$purchaseletter_id_form,
					$notes_batal,
					$sh_feature,
					$customer_address,
					$customer_ktp_address, //add by dika 20/12/2022
					$customer_homephone,
					$customer_mobilephone,
					$customer_email,
					$customer_officephone,
					
					$collector_id,
					
					$this->session->getUserId(),
					'1',
					// added by rico 15092021
					$kpp,
				    // added by rico 27012022
					$dibiayai_instansi
				);
				$result = $this->execSP3('sp_plbankkpr_notesbatal_update', $data);

				$return['total']   = $result[0];
				$return['success'] = $result[0]>0;

			} catch(Exception $e) { }	
		}
		
		return $return;
    }

    /*function bankkprCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$purchaseletter_bankkpr_id = ''; 
				$purchaseletter_id = ''; 
				$bank_id = ''; 
				$bank_createdby_name = '';
				
				$appraisalplan_date = '';
				$appraisal_date = ''; 
				$appraisal_createdby_name = ''; 
				
				$berkasmasuk_date = ''; 
				$berkasbank_date = '';
				$berkasbank_createdby_name = ''; 
				
				$interviewplan_date = ''; 
				$interview_date = ''; 
				$interview_createdby_name = ''; 
				$interview_pic = '';
				
				$kpr_acc_date = ''; 
				$kpr_realisation = ''; 
				$kpr_tenor = ''; 
				$kpr_interest = ''; 
				$kpr_cicilan = '';
				$kpr_createdby_name = '';
				
				$rejected_date = ''; 
				$nextprocess_date = ''; 
				$reject_createdby_name = ''; 
				
				$akadplan_date = ''; 
				$akad_date = ''; 
				$akad_createdby_name = '';
				
				$is_use = ''; 
				$note = ''; 
				
				$deleted = ''; 
				
				foreach ($param as $idx => $data)
				{
					foreach ($data as $key => $value)	
					{
						switch ($key){
							case 'purchaseletter_bankkpr_id': $purchaseletter_bankkpr_id .= intval($value)."~";break;
							case 'purchaseletter_id': $purchaseletter_id .= intval($value)."~";break;
							case 'bank_id': $bank_id .= intval($value)."~";break;
							case 'bank_createdby_name': $bank_createdby_name .= $value."~";break;
							case 'appraisalplan_date': $appraisalplan_date .= $value."~";break;	
							case 'appraisal_date': $appraisal_date .= $value."~";break;
							case 'appraisal_createdby_name': $appraisal_createdby_name .= $value."~";break;
							case 'berkasmasuk_date': $berkasmasuk_date .= $value."~";break;
							case 'berkasbank_date': $berkasbank_date .= $value."~";break;
							case 'berkasbank_createdby_name': $berkasbank_createdby_name .= $value."~";break;
							case 'interviewplan_date': $interviewplan_date .= $value."~";break;
							case 'interview_date': $interview_date .= $value."~";break;
							case 'interview_createdby_name': $interview_createdby_name .= $value."~";break;
							case 'interview_pic': $interview_pic .= $value."~";break;
							case 'kpr_acc_date': $kpr_acc_date .= $value."~";break;
							case 'kpr_realisation': $kpr_realisation .= doubleval($value)."~";break;
							case 'kpr_tenor': $kpr_tenor .= intval($value)."~";break;
							case 'kpr_interest': $kpr_interest .= floatval($value)."~";break;
							case 'kpr_cicilan': $kpr_cicilan .= doubleval($value)."~";break;
							case 'kpr_createdby_name': $kpr_createdby_name .= $value."~";break;
							case 'rejected_date': $rejected_date .= $value."~";break;
							case 'nextprocess_date': $nextprocess_date .= $value."~";break;
							case 'reject_createdby_name': $reject_createdby_name .= $value."~";break;
							case 'akadplan_date': $akadplan_date .= $value."~";break;
							case 'akad_date': $akad_date .= $value."~";break;
							case 'akad_createdby_name': $akad_createdby_name .= $value."~";break;
							case 'is_use': $is_use .= $value."~";break;
							case 'note': $note .= $value."~";break;		
							case 'deleted': $deleted .= $value."~";break;	
						}							
					}				
				};
				
				$purchaseletter_bankkpr_id = preg_replace('/(~)$/','',$purchaseletter_bankkpr_id);
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$bank_id = preg_replace('/(~)$/','',$bank_id);
				$bank_createdby_name = preg_replace('/(~)$/','',$bank_createdby_name);
				
				$appraisalplan_date = preg_replace('/(~)$/','',$appraisalplan_date);
				$appraisal_date = preg_replace('/(~)$/','',$appraisal_date);
				$appraisal_createdby_name = preg_replace('/(~)$/','',$appraisal_createdby_name);
				
				$berkasmasuk_date = preg_replace('/(~)$/','',$berkasmasuk_date);
				$berkasbank_date = preg_replace('/(~)$/','',$berkasbank_date);
				$berkasbank_createdby_name = preg_replace('/(~)$/','',$berkasbank_createdby_name);
				
				$interviewplan_date = preg_replace('/(~)$/','',$interviewplan_date);
				$interview_date = preg_replace('/(~)$/','',$interview_date);
				$interview_createdby_name = preg_replace('/(~)$/','',$interview_createdby_name);
				$interview_pic = preg_replace('/(~)$/','',$interview_pic);
				
				$kpr_acc_date = preg_replace('/(~)$/','',$kpr_acc_date);
				$kpr_realisation = preg_replace('/(~)$/','',$kpr_realisation);
				$kpr_tenor = preg_replace('/(~)$/','',$kpr_tenor);
				$kpr_interest = preg_replace('/(~)$/','',$kpr_interest);
				$kpr_cicilan = preg_replace('/(~)$/','',$kpr_cicilan);
				$kpr_createdby_name = preg_replace('/(~)$/','',$kpr_createdby_name);
				
				$rejected_date = preg_replace('/(~)$/','',$rejected_date);
				$nextprocess_date = preg_replace('/(~)$/','',$nextprocess_date);
				$reject_createdby_name = preg_replace('/(~)$/','',$reject_createdby_name);
				
				$akadplan_date = preg_replace('/(~)$/','',$akadplan_date);
				$akad_date = preg_replace('/(~)$/','',$akad_date);
				$akad_createdby_name = preg_replace('/(~)$/','',$akad_createdby_name);
				
				$is_use = preg_replace('/(~)$/','',$is_use);
				$note = preg_replace('/(~)$/','',$note);
				
				$deleted = preg_replace('/(~)$/','',$deleted);

				$affectedRow = $this->execSP2('sp_plbankkpr_create', 
									$purchaseletter_bankkpr_id,
									$purchaseletter_id, 
									$bank_id,
									$bank_createdby_name,
									
									$appraisalplan_date,
									$appraisal_date, 
									$appraisal_createdby_name, 
									
									$berkasmasuk_date,
									$berkasbank_date,
									$berkasbank_createdby_name, 
									
									$interviewplan_date,
									$interview_date,
									$interview_createdby_name,
									$interview_pic,
									
									$kpr_acc_date, 
									$kpr_realisation, 
									$kpr_tenor,
									$kpr_interest, 
									$kpr_cicilan,
									$kpr_createdby_name,
									
									$rejected_date, 
									$nextprocess_date, 
									$reject_createdby_name, 
									
									$akadplan_date,
									$akad_date, 
									$akad_createdby_name,
									
									$is_use,
									
									$note,
									
									$deleted,
								   
								    $this->session->getUserId(),
								    '1'
								); 
				$return['success'] = (bool)$affectedRow['data'][0]['total_row'];
				$return['total'] = $affectedRow['data'][0]['total_row'];				
			} catch(Exception $e) { }
		}
		return $return;
    }*/

    /*function bankkprUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_bankkpr_update', 
									$param['bankkpr_id'], 
									$param['purchaseletter_id'], 
									'', 
									$param['bankkprreason_id'], 
									$param['description'], 
									$param['bankkpr_date'], 
									$param['biaya'], 
									$param['ktp'], 
									$param['name'], 
									$param['address'], 
									$param['telephone'], 
									$param['mobilephone'], 
									$param['city_id'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }*/

    function bankkprDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'purchaseletter_bankkpr_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plbankkpr_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function bankkprBatalby($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				
				$data = array (
					$param['purchaseletter_id'], 
					$param['batal_by'], 
					$param['notes_batal'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_plbankkpr_batalby_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;	

				$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$sh_feature = $config_sh->activateSh1Features('recommendedtocancel_send_email');
				
				if($sh_feature == 1){
					if($return['success']){
						if($param['removeStatus'] == 0)
						{
							$emailAddress = '';
							$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
							$post_data['start'] = 0;
							$post_data['limit'] = 0;
							$post_data['parametername'] = 'RECOMMENDEDTOCANCEL_SEND_EMAIL';
							$post_data['value'] = '';
							$post_data['datatype'] = '';
							$post_data['description'] = '';
							$rs_app_sendmail = $model_masterparameterglobal->masterparameterglobalRead($post_data);
							
							if($rs_app_sendmail['total'] > 0){
								$emailAddress = Zend_Json::encode($rs_app_sendmail['data'][0]['value']);
								$listEmail = explode(",", $emailAddress);
								
								$model_purchaseletter = new Erems_Models_Purchaseletter();
								$post_data['purchaseletter_id'] = $param['purchaseletter_id'];
								$rs_purchaseletter = $model_purchaseletter->purchaseletterdetailRead($post_data);
								//var_dump($rs_purchaseletter);exit;
								try{
									$message = '<html><body>';
									$message .= '<p>Dear Bapak / Ibu,</p>';
									$message .= "<p>Berdasarkan pertimbangan maka disimpulkan untuk unit dibawah ini telah dinyatakan sebagai REKOMENDASI BATAL</p>";
									$message .= "Kawasan / Cluster: <strong>".$rs_purchaseletter['data'][0]['cluster_code']." / ".$rs_purchaseletter['data'][0]['cluster_cluster']."</strong><br>";
									$message .= "Block / Unit No : <strong>".$rs_purchaseletter['data'][0]['unit_unit_number']."</strong><br>";
									$message .= "Purchaseletter No : <strong>".$rs_purchaseletter['data'][0]['purchaseletter_no']."</strong><br>";
									$message .= "Purchase Date : <strong>".date("d-m-Y", strtotime($rs_purchaseletter['data'][0]['purchase_date']))."</strong><br>";
									$message .= "Customer Name : <strong>".$rs_purchaseletter['data'][0]['customer_name']."</strong><br>";
									$message .= "Sales Name : <strong>".$rs_purchaseletter['data'][0]['salesman_name']."</strong><br>";
									$message .= "Tanggal pembuatan : <strong>".date("d-m-Y")."</strong><br>";
									$message .= "Username pembuat : <strong>".$this->session->getUserName()."</strong><br>";
									$message .= "<p>Regards,</p>";
									$message .= "EREMS APPLICATIONS";
									$message .= "</body></html>";
									
									$mail = new Erems_Box_Library_Email();
									$mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
									$mail->getMail()->setBodyHtml(nl2br($message));
									$mail->getMail()->addTo($listEmail, 'PIC');
									//$mail->addCc('emailAddress', 'nameUser');
									$mail->getMail()->setSubject('[REKOMENDASI PEMBATALAN] - '.$rs_purchaseletter['data'][0]['cluster_code'].' / '.$rs_purchaseletter['data'][0]['unit_unit_number']);
									$mail->getMail()->send();
								}
								catch ( Zend_Mail_Exception $e ) {
									//$return['success'] = 'email_failed';
								}
							}
						}
					}
				}
				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function bankkprCreatePayment($param = array()) {
        $return['success'] = false;
		$return['payment_id'] = 0;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$param['unit_id'],
					//$param['kpr_acc_date'],
					$param['akad_date'],
					$param['kpr_realisation'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plbankkpr_payment_create', $data);
				
				foreach($result as $key => $data)
				{
					if(is_array($data))
					{
						foreach($data as $sub_key => $sub_data)
						{
							$return['payment_id'] =  $sub_data['payment_id'];
						}
					}
				}
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }
	
	function bankkprCreateFullPayment($param = array()) {
        $return['success'] = false;
		$return['payment_id'] = 0;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$param['unit_id'],
					$param['akad_date'],
					$param['kpr_realisation'],
					$param['payment_date'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plbankkpr_full_payment_create', $data);
				
				foreach($result as $key => $data)
				{
					if(is_array($data))
					{
						foreach($data as $sub_key => $sub_data)
						{
							$return['payment_id'] =  $sub_data['payment_id'];
						}
					}
				}
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }

}

?>