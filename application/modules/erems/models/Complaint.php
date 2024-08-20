<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Complaint extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_aftersales';
	protected $datadelimiter = '~#~';
	protected $returned = array('total' => 0, 'success' => false, 'data' => array());
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function complaintRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['cluster_id'],
					$param['block_id'],
					//$param['unit_id'],
					$param['unit_number'],
					$param['customer_name'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page'],
					// added by Rico 11 Mei 2021
					$param['user_id'],
					$param['status_st']
				);
				//$result = $this->execSP3('sp_complaint_read', $data);
				$result = $this->execSP3('sp_complaint_new_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintsuratRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					'',
					$param['aftersales_id']
				);
				$result = $this->execSP3('sp_aftersales_surat_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintdetailRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					'',
					$param['aftersales_id']
				);
				$result = $this->execSP3('sp_aftersales_complaint_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintimagesRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					'',
					$param['aftersales_complaint_id']
				);
				$result = $this->execSP3('sp_aftersales_complaint_images_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function statusSalesforceRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_aftersales_salesforce_status_read', $param['aftersales_id']);
//                                var_dump($result[0][0]);
				$return['data'] = $result[0][0];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintdokumenRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					0,
					$param['aftersales_id']
				);
				$result = $this->execSP3('sp_aftersales_complaint_dokumen_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintpengalihanhakRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_complaint_pengalihanhak_read', $data);
//				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function complaintUpdate($param = array()) {
		$aftersales_id          = $param['aftersales_id'];
		$unit_id                = $param['unit_id'];
		$serahterima_date       = $param['serahterima_date'];
		$phone_no               = $param['phone_no'];
		$receive_status         = $param['receive_status'];
		$hunian_status          = $param['hunian_status'];
		$datang_date            = $param['datang_date'];
		$pinjampakai_date       = $param['pinjampakai_date'];
		$pinjampakai_status     = $param['pinjampakai_status'];
		$guaranteetype_sipil_id = $param['guaranteetype_sipil_id'];
		$guaranteetype_bocor_id = $param['guaranteetype_bocor_id'];
		$garansi_sipil_date     = $param['garansi_sipil_date'];
		$garansi_bocor_date     = $param['garansi_bocor_date'];
		$note                   = $param['note'];
		$serahterima1_date      = $param['serahterima1_date'];
		$serahterima2_date      = $param['serahterima2_date'];
		$checklist1_date        = $param['checklist1_date'];
		$checklist2_date        = $param['checklist2_date'];
		$recheck1_date          = $param['recheck1_date'];
		$recheck2_date          = $param['recheck2_date'];
		$serahterima1_note      = $param['serahterima1_note'];
		$serahterima2_note      = $param['serahterima2_note'];
		$bast_no                = $param['bast_no'];
		$param_dokumen          = $param['data_dokumen'];
		$param_surat            = $param['data_surat'];
		$param_detail           = $param['data_detail'];
		$param_images           = $param['detail_images'];
		$alasan                 = $param['alasan'];
		//add by dika 17012023
		$customer_address       = $param['customer_address'];
		$customer_ktp_address   = $param['customer_ktp_address'];
		$customer_homephone     = $param['customer_homephone'];
		$customer_mobilephone   = $param['customer_mobilephone'];
		$customer_officephone   = $param['customer_officephone'];
		$customer_email         = $param['customer_email'];

		$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$sh_feature = $config_sh->activateSh1Features('aftersales_complaint');

		if (is_array($param) && count($param)) {
			try {
				$aftersales_surat_id            = '';
				$aftersales_id_surat            = '';
				$jenis_surat                    = '';
				$undangan                       = '';
				$surat_no                       = '';
				$send_date                      = '';
				$keterangan                     = '';
				$deleted_surat                  = '';
				// added by rico 10122021
				$undangan_date                  = '';
				$is_hadir                       = '';

				$aftersales_complaint_id        = '';
				$aftersales_id_detail           = '';
				$unit_id_detail                 = '';
				$complaint_no                   = '';
				$complainttype_id               = '';
				$pengawas_id                    = '';
				$contractor_id                  = '';
				$complaint_date                 = '';
				$complaintstatus_id             = '';
				$estimation                     = '';
				$start_date                     = '';
				$end_date                       = '';
				$detail_complaint               = '';
				$respon_user                    = '';
				$respon_date                    = '';
				$respon_note                    = '';
				$complainttype                  = '';
				$complaintstatus                = '';
				$contractorname                 = '';
				$pengawas_name                  = '';
				$deleted_detail                 = '';
				$temp_id_detail                 = '';

				$aftersales_complaint_images_id = '';
				$aftersales_complaint_id_images = '';
				$image_filename                 = '';
				$description                    = '';
				$deleted_images                 = '';
				$temp_id_images                 = '';

				$aftersales_dokumenupload       = '';
				$aftersales_dokumen_id          = '';
				$doc_filename                   = '';
				$jenis_file                     = '';
				$description_dokumen            = '';
				$deleted_dokumen                = '';

				//surat
				if (is_array($param_surat) && count($param_surat) > 0) {
					foreach ($param_surat as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'aftersales_surat_id': $aftersales_surat_id .= $value . "~";
									break;
								case 'aftersales_id': $aftersales_id_surat .= $value . "~";
									break;
								case 'jenis_surat': $jenis_surat .= $value . "~";
									break;
								case 'undangan': $undangan .= $value . "~";
									break;
								case 'surat_no': $surat_no .= $value . "~";
									break;
								case 'send_date': $send_date .= $value . "~";
									break;
								// added by rico 10122021
								case 'undangan_date': $undangan_date .= $value . "~";
									break;
								case 'keterangan': $keterangan .= $value . "~";
									break;
								case 'deleted': $deleted_surat .= $value . "~";
									break;
								case 'is_hadir': $is_hadir .= $value . "~";
									break;
							}
						}
					};

					$aftersales_surat_id = preg_replace('/(~)$/', '', $aftersales_surat_id);
					$aftersales_id_surat = preg_replace('/(~)$/', '', $aftersales_id_surat);
					$jenis_surat         = preg_replace('/(~)$/', '', $jenis_surat);
					$undangan            = preg_replace('/(~)$/', '', $undangan);
					$surat_no            = preg_replace('/(~)$/', '', $surat_no);
					$send_date           = preg_replace('/(~)$/', '', $send_date);
					$keterangan          = preg_replace('/(~)$/', '', $keterangan);
					$deleted_surat       = preg_replace('/(~)$/', '', $deleted_surat);
					// added by rico 10122021
					$undangan_date       = preg_replace('/(~)$/', '', $undangan_date);
					$is_hadir            = preg_replace('/(~)$/', '', $is_hadir);
				}

				//detail complaint
				if (is_array($param_detail) && count($param_detail) > 0) {
					foreach ($param_detail as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'aftersales_complaint_id': $aftersales_complaint_id .= $value . "~";
									break;
								case 'aftersales_id': $aftersales_id_detail .= $value . "~";
									break;
								case 'unit_id': $unit_id_detail .= $value . "~";
									break;
								case 'complaint_no': $complaint_no .= $value . "~";
									break;
								case 'complainttype_id': $complainttype_id .= $value . "~";
									break;
								case 'pengawas_id': $pengawas_id .= $value . "~";
									break;
								case 'contractor_id': $contractor_id .= $value . "~";
									break;
								case 'complaint_date': $complaint_date .= $value . "~";
									break;
								case 'complaintstatus_id': $complaintstatus_id .= $value . "~";
									break;
								case 'estimation': $estimation .= $value . "~";
									break;
								case 'start_date': $start_date .= $value . "~";
									break;
								case 'end_date': $end_date .= $value . "~";
									break;
								case 'detail_complaint': $detail_complaint .= $value . "~";
									break;
								case 'respon_user': $respon_user .= $value . "~";
									break;
								case 'respon_date': $respon_date .= $value . "~";
									break;
								case 'respon_note': $respon_note .= $value . "~";
									break;
								case 'complainttype': $complainttype .= $value . "~";
									break;
								case 'complaintstatus': $complaintstatus .= $value . "~";
									break;
								case 'contractorname': $contractorname .= $value . "~";
									break;
								case 'pengawas_name': $pengawas_name .= $value . "~";
									break;
								case 'deleted': $deleted_detail .= $value . "~";
									break;
								case 'temp_id_detail': $temp_id_detail .= $value . "~";
									break;
							}
						}
					};

					$aftersales_complaint_id = preg_replace('/(~)$/', '', $aftersales_complaint_id);
					$aftersales_id_detail    = preg_replace('/(~)$/', '', $aftersales_id_detail);
					$unit_id_detail          = preg_replace('/(~)$/', '', $unit_id_detail);
					$complaint_no            = preg_replace('/(~)$/', '', $complaint_no);
					$complainttype_id        = preg_replace('/(~)$/', '', $complainttype_id);
					$pengawas_id             = preg_replace('/(~)$/', '', $pengawas_id);
					$contractor_id           = preg_replace('/(~)$/', '', $contractor_id);
					$complaint_date          = preg_replace('/(~)$/', '', $complaint_date);
					$complaintstatus_id      = preg_replace('/(~)$/', '', $complaintstatus_id);
					$estimation              = preg_replace('/(~)$/', '', $estimation);
					$start_date              = preg_replace('/(~)$/', '', $start_date);
					$end_date                = preg_replace('/(~)$/', '', $end_date);
					$detail_complaint        = preg_replace('/(~)$/', '', $detail_complaint);
					$respon_user             = preg_replace('/(~)$/', '', $respon_user);
					$respon_date             = preg_replace('/(~)$/', '', $respon_date);
					$respon_note             = preg_replace('/(~)$/', '', $respon_note);
					$complainttype           = preg_replace('/(~)$/', '', $complainttype);
					$contractorname          = preg_replace('/(~)$/', '', $contractorname);
					$pengawas_name           = preg_replace('/(~)$/', '', $pengawas_name);
					$deleted_detail          = preg_replace('/(~)$/', '', $deleted_detail);
					$temp_id_detail          = preg_replace('/(~)$/', '', $temp_id_detail);
				}

				//detail images
				if (is_array($param_images) && count($param_images) > 0) {
					foreach ($param_images as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'aftersales_complaint_images_id': $aftersales_complaint_images_id .= $value . "~";
									break;
								case 'aftersales_complaint_id': $aftersales_complaint_id_images .= $value . "~";
									break;
								case 'image_filename': $image_filename .= $value . "~";
									break;
								case 'description': $description .= $value . "~";
									break;
								case 'deleted': $deleted_images .= $value . "~";
									break;
								case 'temp_id_images': $temp_id_images .= $value . "~";
									break;
							}
						}
					};

					$aftersales_complaint_images_id = preg_replace('/(~)$/', '', $aftersales_complaint_images_id);
					$aftersales_complaint_id_images = preg_replace('/(~)$/', '', $aftersales_complaint_id_images);
					$image_filename                 = preg_replace('/(~)$/', '', $image_filename);
					$description                    = preg_replace('/(~)$/', '', $description);
					$deleted_images                 = preg_replace('/(~)$/', '', $deleted_images);
					$temp_id_images                 = preg_replace('/(~)$/', '', $temp_id_images);
				}

				//detail dokumen
				if (is_array($param_dokumen) && count($param_dokumen) > 0) {
					foreach ($param_dokumen as $idx => $data) {

						foreach ($data as $key => $value) {
							switch ($key) {
								case 'aftersales_dokumenupload': $aftersales_dokumenupload .= $value . "~";
									break;
								case 'aftersales_id': $aftersales_dokumen_id .= $value . "~";
									break;
								case 'doc_filename': $doc_filename .= $value . "~";
									break;
								case 'jenis_file': $jenis_file .= $value . "~";
									break;
								case 'description': $description_dokumen .= $value . "~";
									break;
								case 'deleted': $deleted_dokumen .= $value . "~";
									break;
							}
						}
					};

					$aftersales_dokumenupload = preg_replace('/(~)$/', '', $aftersales_dokumenupload);
					$aftersales_dokumen_id    = preg_replace('/(~)$/', '', $aftersales_dokumen_id);
					$doc_filename             = preg_replace('/(~)$/', '', $doc_filename);
					$jenis_file               = preg_replace('/(~)$/', '', $jenis_file);
					$description_dokumen      = preg_replace('/(~)$/', '', $description_dokumen);
					$deleted_dokumen          = preg_replace('/(~)$/', '', $deleted_dokumen);
				}

				$result = $this->execSP3('sp_complaint_update', $aftersales_id,
						$unit_id,
						$serahterima_date,
						$phone_no,
						$receive_status,
						$hunian_status,
						$datang_date,
						$pinjampakai_date,
						$pinjampakai_status,
						$guaranteetype_sipil_id,
						$guaranteetype_bocor_id,
						$garansi_sipil_date,
						$garansi_bocor_date,
						$note,
						$serahterima1_date,
						$serahterima2_date,
						$checklist1_date,
						$checklist2_date,
						$recheck1_date,
						$recheck2_date,
						$serahterima1_note,
						$serahterima2_note,
						$bast_no,
						$aftersales_surat_id,
						$aftersales_id_surat,
						$jenis_surat,
						$undangan,
						$surat_no,
						$send_date,
						$keterangan,
						$deleted_surat,
						$aftersales_complaint_id,
						$aftersales_id_detail,
						$unit_id_detail,
						$complaint_no,
						$complainttype_id,
						$pengawas_id,
						$contractor_id,
						$complaint_date,
						$complaintstatus_id,
						$estimation,
						$start_date,
						$end_date,
						$detail_complaint,
						$respon_user,
						$respon_date,
						$respon_note,
						$complainttype,
						$complaintstatus,
						$contractorname,
						$pengawas_name,
						$deleted_detail,
						$temp_id_detail,
						$aftersales_complaint_images_id,
						$aftersales_complaint_id_images,
						$image_filename,
						$description,
						$deleted_images,
						$temp_id_images,
						$aftersales_dokumenupload,
						$aftersales_dokumen_id,
						$doc_filename,
						$jenis_file,
						$description_dokumen,
						$deleted_dokumen,
						$alasan,
						$this->session->getUserId(), '1',
						// added by rico 10122021
						$undangan_date,
						$is_hadir,
						//add by dika 17012023
						$customer_address,
						$customer_ktp_address,
						$customer_homephone,
						$customer_mobilephone,
						$customer_officephone,
						$customer_email,
						$sh_feature
				);

				//addby imaam on 20210101
				$surat = $this->execSP('sp_salesforce_unitinfosurat_read', $unit_id);

				$msgtoSF = '';
				$ParameterDao = new Erems_Models_Master_ParameterDao;
				$paramUseSalesForce = $ParameterDao->get_parameter(array('projectid' => $this->session->getCurrentProjectId(), 'ptid' => $this->session->getCurrentPtId(), 'parametername' => 'USE_SALES_FORCE'));
				$useSalesForce = $paramUseSalesForce['total'] > 0 ? (int) $paramUseSalesForce['data'][0]['value'] : 0;
				$configSalesForce = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->sendtoSalesForce();
				if ($useSalesForce == 1 && ($surat[0]['data_surat'] > 0 || date('Y', strtotime($pinjampakai_date)) > 1970)) {
					$subHolding = $this->session->getcurrentSubholdingid();
					$res_sf = 1;
					$res_sf_sh2 = 1;
					if ($subHolding == 1) {
						$res_sf = $this->processtoSalesForce($configSalesForce, $unit_id, 1);
						$res_sf_sh2 = $this->processtoSalesForce($configSalesForce, $unit_id, 2); // added by rico 20092022
					} else if ($subHolding == 2) {
						$SendSalesForceSH1Server = $ParameterDao->get_parameter(array('projectid' => $this->session->getCurrentProjectId(), 'ptid' => $this->session->getCurrentPtId(), 'parametername' => 'SEND_SALES_FORCE_SH1_SERVER'));
						if ($SendSalesForceSH1Server['total'] == 0 || ($SendSalesForceSH1Server['total'] > 0 && $SendSalesForceSH1Server['data'][0]['value'] == 1)) {
							$res_sf = $this->processtoSalesForce($configSalesForce, $unit_id, 1);
						}
						$res_sf_sh2 = $this->processtoSalesForce($configSalesForce, $unit_id, 2);
					} else if (in_array($subHolding(3,4))) {
						$SendSalesForceSH2Server = $ParameterDao->get_parameter(array('projectid' => $this->session->getCurrentProjectId(), 'ptid' => $this->session->getCurrentPtId(), 'parametername' => 'SEND_SALES_FORCE_SH2_SERVER'));
						if ($SendSalesForceSH2Server['total'] == 0 || ($SendSalesForceSH2Server['total'] > 0 && $SendSalesForceSH2Server['data'][0]['value'] == 1)) {
							$res_sf_sh2 = $this->processtoSalesForce($configSalesForce, $unit_id, 2);
						}
						$res_sf = $this->processtoSalesForce($configSalesForce, $unit_id, 1);
					}

					if ($res_sf == 0){
						$msgtoSF .= '<br/>send to Salesforce SH1 Server FAILED, contact administrator to check or delete this unit in Salesforce';
					}
					if($res_sf_sh2 == 0) {
						$msgtoSF .= '<br/>send to Salesforce SH2 Server FAILED, contact administrator to check or delete this unit in Salesforce';
					}
				}
				$this->returned['msgtoSF'] = $msgtoSF;

				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;

				if ($useSalesForce == 1 && date('Y', strtotime($serahterima_date)) > 1970){
					$dSF['data']['serahterima_date'] = $serahterima_date;
					$dSF['data']['garansi_sipil_date'] = $garansi_sipil_date;
					$dSF['data']['garansi_bocor_date'] = $garansi_bocor_date;
					$dSF['data']['unit_id'] = $unit_id;
					$this->updatetoSalesForce($dSF);
				}

				if ((date('Y', strtotime($serahterima_date)) > 1970 || date('Y', strtotime($pinjampakai_date)) > 1970 ) && ($param['is_sent_ems'] == 0 || $param['is_sent_ems'] == "" ) && $result[0] > 0) {
					$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
					$apiEms = $genco->getInfoApiEms();
					if ($apiEms['active'] == 1) {
						$this->unitInfoEms($unit_id, $apiEms, ['pinjampakai_date' => $pinjampakai_date]);
					}
				}
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $this->returned;
	}

	function syncEms($param = []) {
		$unit_id = $param['unit_id'];
		$serahterima_date = $param['serahterima_date'];
		$pinjampakai_date = $param['pinjampakai_date'];
		$return = 0;
		if ((date('Y', strtotime($serahterima_date)) > 1970 || date('Y', strtotime($pinjampakai_date)) > 1970)) {
			$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$apiEms = $genco->getInfoApiEms();
			if ($apiEms['active'] == 1) {
				$return = $this->unitInfoEms($unit_id, $apiEms, ['pinjampakai_date' => $pinjampakai_date, 'sync' => 1]);
			}
		}
		$this->returned['total'] = 1;
		$this->returned['success'] = $return > 0;
		return $this->returned;
	}



	function updatetoSalesForce($param = []) {
		$serahterima_date = date('Y-m-d', strtotime($param['data']['serahterima_date']));
		$garansi_sipil_date = date('Y-m-d', strtotime($param['data']['garansi_sipil_date']));
		$garansi_bocor_date = date('Y-m-d', strtotime($param['data']['garansi_bocor_date']));
		// $garansi_sipil_date = $param['data']['garansi_sipil_date'];
		// $garansi_bocor_date = $param['data']['garansi_bocor_date'];
		$unitId = $param['data']['unit_id'];

		$res = $this->execSP('sp_salesforce_unitinfo_read', $unitId);
		$data = $res[0];

		$urltoken = 'https://login.salesforce.com/services/oauth2/token';
		$client_id = '3MVG9ZL0ppGP5UrB3TaY4U.5psjwWA22k3PgQMGOFI1PquDjHwtaxCby.WBqrGFsfySBjBsCYjfGGBVM0E1KU';
		$client_secret = '552E7F122827B2E93394233922ACC436404E96559EA27C0040BE72AD1CD90A9D';
		$username = 'adminsalesforce@ciputra.co.id';
		$password = 'C1putr4SH2k3r3N';


		$paramsToken = array(
			'grant_type' => 'password',
			'client_id' => $client_id,
			'client_secret' => $client_secret,
			'username' => $username,
			'password' => $password
		);

		$curlToken = curl_init();

		curl_setopt_array($curlToken, array(
			CURLOPT_URL => $urltoken,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_POSTFIELDS => http_build_query($paramsToken),
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));

		$response = curl_exec($curlToken);

		curl_close($curlToken);
		$resToken = json_decode($response);
		$access_token = $resToken->access_token;

		$status = 0;
		$project_code = $data['project_id'];
		$cluster_code = $data['unit_Cluster_Code__c'];
		$block = $data['unit_Block__c'];
		$tanggal_serah_terima = $serahterima_date;
		$civil_warranty_start_date = $serahterima_date;
		$civil_warranty_end_date = $garansi_sipil_date;
		$leak_warranty_start_date = $serahterima_date;
		$leak_warranty_end_date = $garansi_bocor_date;

		$paramsProcess = [
		   "data" => [
				 [
					"project_code" => $project_code,
					"cluster_code" => $cluster_code,
					"block" => $block,
					"tanggal_serah_terima" => $tanggal_serah_terima,
					"civil_warranty_start_date" => $civil_warranty_start_date,
					"civil_warranty_end_date" => $civil_warranty_end_date,
					"leak_warranty_start_date" => $leak_warranty_start_date,
					"leak_warranty_end_date" => $leak_warranty_end_date
				 ]
			  ]
		];

		$url = 'https://citraland.my.salesforce.com/services/apexrest/v1/unit/update';


		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => $url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => 'POST',
		  CURLOPT_POSTFIELDS => json_encode($paramsProcess),
		  CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json',
				'Authorization: Bearer ' . $access_token
		  ),
		));

		$response = json_decode(curl_exec($curl));

		curl_close($curl);

		if ($response->type=='success') {
			$status = 1;
		}

		$this->execSP3('sp_api_salesforce_logs', 'Update Sales Force', $this->session->getUserId(), $unitId, $_SERVER['REMOTE_ADDR'], NULL, 'POST', json_encode($paramsProcess), base64_encode(json_encode($response)), $status);

	}

	function processtoSalesForce($configSalesForce, $unitId, $subHolding) {
		$res = $this->execSP('sp_salesforce_unitinfo_read', $unitId);
		$data = $res[0];

		if (count($data) > 0 && count($configSalesForce) > 0) {
			if ($data['progress_salesforce'] == 'OPEN' && $subHolding == 1) {
				return 1;
			}
			if ($data['progress_salesforce_sh2'] == 'OPEN' && $subHolding == 2) {
				return 1;
			}
			$errors = array();
			try {
				if ($subHolding == 1) {
					$client_id = $configSalesForce['credential']['sh1']['client_id'];
					$client_secret = $configSalesForce['credential']['sh1']['client_secret'];
					$username = $configSalesForce['credential']['sh1']['username'];
					$password = $configSalesForce['credential']['sh1']['password'];
					$url = $configSalesForce['credential']['sh1']['url'];
					$bodyUnit = array(
						"Project__c" => $data['unit_Project__c'],
						"Name" => $data['unit_Name'],
						"Cluster_Name__c" => $data['unit_Cluster_Name__c'],
						"Cluster_Code__c" => $data['unit_Cluster_Code__c'],
						"Block__c" => $data['unit_Block__c'],
						"VA_Number__c" => $data['unit_VA_Number__c'],
						"Purpose_type__C" => $data['Purpose_type__C'],
						"Status__c" => $data['Status__c']
					);
				} else if ($subHolding == 2) {
					$client_id = $configSalesForce['credential']['sh2']['client_id'];
					$client_secret = $configSalesForce['credential']['sh2']['client_secret'];
					$username = $configSalesForce['credential']['sh2']['username'];
					$password = $configSalesForce['credential']['sh2']['password'];
					$url = $configSalesForce['credential']['sh2']['url'];
					$bodyUnit = array(
						"Project__c" => $data['unit_Project__c'],
						"Account__c" => $data['unit_AccountId'],
						"Name" => $data['unit_Name'],
						"Cluster_Name__c" => $data['unit_Cluster_Name__c'],
						"Cluster_Code__c" => $data['unit_Cluster_Code__c'],
						"Block__c" => $data['unit_Block__c'],
						"VA_Number__c" => $data['unit_VA_Number__c'],
						"Purpose_type__C" => $data['Purpose_type__C'],
						"Status__c" => $data['Status__c']
					);
				} else {
					$client_id = $configSalesForce['credential']['general']['client_id'];
					$client_secret = $configSalesForce['credential']['general']['client_secret'];
					$username = $configSalesForce['credential']['general']['username'];
					$password = $configSalesForce['credential']['general']['password'];
					$url = $configSalesForce['credential']['general']['url'];
					$bodyUnit = array(
						"Project__c" => $data['unit_Project__c'],
						"Account__c" => $data['unit_AccountId'],
						"Name" => $data['unit_Name'],
						"Cluster_Name__c" => $data['unit_Cluster_Name__c'],
						"Cluster_Code__c" => $data['unit_Cluster_Code__c'],
						"Block__c" => $data['unit_Block__c'],
						"VA_Number__c" => $data['unit_VA_Number__c'],
						"Purpose_type__C" => $data['Purpose_type__C'],
						"Status__c" => $data['Status__c']
					);
				}

				$paramsToken = array(
					'grant_type' => 'password',
					'client_id' => $client_id,
					'client_secret' => $client_secret,
					'username' => $username,
					'password' => $password
				);

				$curlToken = curl_init();

				curl_setopt_array($curlToken, array(
					CURLOPT_URL => $configSalesForce['urltoken'],
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'POST',
					CURLOPT_SSL_VERIFYPEER => false,
					CURLOPT_POSTFIELDS => http_build_query($paramsToken),
					CURLOPT_HTTPHEADER => array(
						'Content-Type: application/x-www-form-urlencoded'
					),
				));

				$response = curl_exec($curlToken);

				curl_close($curlToken);
				$resToken = json_decode($response);
				$access_token = $resToken->access_token;

				$customer = array(
					"method" => "PATCH",
					"url" => $configSalesForce['customer'] . $data['customer_url'],
					"referenceId" => $data['customer_referenceId'],
					"body" => array(
						"Name" => $data['customer_Name'],
						"Phone" => $data['customer_Phone'],
						"Type" => $data['customer_Type'],
						"BillingStreet" => $data['customer_BillingStreet'],
						"Email__c" => $data['customer_Email__c']
					)
				);

				$project = array(
					"method" => "PATCH",
					"url" => $configSalesForce['project'] . $data['project_url'],
					"referenceId" => $data['project_referenceId'],
					"body" => array(
						"Name" => $data['project_Name'],
						"Phone__c" => $data['project_Phone__c'],
						"Address__c" => $data['project_Address__c'],
						"Email__c" => $data['project_Email__c']
					)
				);

				$unit = array(
					"method" => "POST",
					"url" => $configSalesForce['unit'],
					"referenceId" => $data['unit_referenceId'],
					"body" => $bodyUnit
				);

				if ($subHolding == 1) {
					$paramsProcess = array(
						"allOrNone" => $data['allOrNone'],
						"compositeRequest" => array(
							$project, $unit
						)
					);
				} else if ($subHolding == 2) {
					$paramsProcess = array(
						"allOrNone" => $data['allOrNone'],
						"compositeRequest" => array(
							$customer, $project, $unit
						)
					);
				} else {
					$paramsProcess = array(
						"allOrNone" => $data['allOrNone'],
						"compositeRequest" => array(
							$project, $unit
						)
					);
				}

				$curlProses = curl_init();
				curl_setopt_array($curlProses, array(
					CURLOPT_URL => $url,
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'POST',
					CURLOPT_SSL_VERIFYPEER => false,
					CURLOPT_POSTFIELDS => json_encode($paramsProcess),
					CURLOPT_HTTPHEADER => array(
						'Content-Type: application/json',
						'Authorization: Bearer ' . $access_token
					)
				));

				$response = curl_exec($curlProses);
				curl_close($curlProses);

				$status = 0;
				$r = json_decode($response);
				if (isset($r->compositeResponse[0]->body->success)) {
					$status = 1;
				}

				$this->execSP3('sp_api_salesforce_status', $unitId, $status, $subHolding);
				$this->execSP3('sp_api_salesforce_logs', 'After Sales', $this->session->getUserId(), $unitId, $_SERVER['REMOTE_ADDR'], json_encode($configSalesForce), 'POST', json_encode($paramsProcess), base64_encode($response), $status);

				return $status;
			} catch (Zend_Rest_Client_Exception $e) {
				$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
			} catch (Exception $e) {
				$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
			}
		}
	}

	function unitInfoEms($unitId, $apiEms, $paramAddon) {
		$readResult = $this->execSP('sp_ems_unitinfo_read', $unitId);
		if (count($readResult) > 0) {
//$client = new Zend_Rest_Client('https://ems.ciputragroup.com:11443');
			$errors = array();
			$return = true;
			try {
//				$path = 'index.php/api/erems/';
				$arrParam = [
					'sync' => isset($paramAddon['sync']) ? $paramAddon['sync'] : 0,
					'project_id' => $readResult[0]['project_id'],
					'customer_name' => $readResult[0]['customer_name'],
					'customer_address' => $readResult[0]['customer_address'],
					'customer_email' => $readResult[0]['customer_email'],
					'customer_ktp' => $readResult[0]['customer_ktp'],
					'customer_ktp_address' => $readResult[0]['customer_ktp_address'],
					'customer_mobilephone1' => $readResult[0]['customer_mobilephone1'],
					'customer_homephone' => $readResult[0]['customer_homephone'],
					'customer_officephone' => $readResult[0]['customer_officephone'],
					'customer_npwp_no' => $readResult[0]['customer_npwp_no'],
					'customer_npwp_name' => $readResult[0]['customer_npwp_name'],
					'customer_npwp_address' => $readResult[0]['customer_npwp_address'],
					'customer_source_id' => $readResult[0]['customer_source_id'],
					'kawasan_source_id' => $readResult[0]['kawasan_source_id'],
					'kawasan_code' => $readResult[0]['kawasan_code'],
					'kawasan_name' => $readResult[0]['kawasan_name'],
					'kawasan_description' => $readResult[0]['kawasan_description'],
					'purpose_use_name' => $readResult[0]['purpose_use_name'],
					'purpose_use_description' => $readResult[0]['purpose_use_description'],
					'purpose_use_source_id' => $readResult[0]['purpose_use_source_id'],
					'unit_blok_unit' => $readResult[0]['unit_blok_unit'],
					'unit_luas_tanah' => $readResult[0]['unit_luas_tanah'],
					'unit_luas_bangunan' => $readResult[0]['unit_luas_bangunan'],
					'unit_tgl_st' => $readResult[0]['unit_tgl_st'],
					'unit_tgl_pinjampakai' => $paramAddon['pinjampakai_date'],
					'unit_source_id' => $readResult[0]['unit_source_id'],
					'unit_pt_id_estate' => $readResult[0]['unit_pt_id_estate'],
					'unit_pt_id_erems' => $readResult[0]['unit_pt_id_erems'],
					'blok_source_id' => $readResult[0]['blok_source_id']
				];
//$result = $client->restPost($path . 'kirim', ['send_data' => $this->dec_enc('encrypt', json_encode($arrParam))]);
//echo $respon = $result->getBody();
// set post fields
				$post = ['send_data' => $this->dec_enc('encrypt', json_encode($arrParam))];

				$ch = curl_init($apiEms['link']);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

// execute!
				$respon = curl_exec($ch);
				$error = curl_error($ch);
// close the connection, release resources used
				curl_close($ch);

// do anything you want with your response
//				var_dump($respon);
//				echo ($respon);
				if ($error != "") {
					$respon = $error;
				} else {
					$respon = $this->dec_enc('decrypt', $respon);
				}
				$this->execSP3('sp_api_ems_logs', 'After Sales', $_SERVER['REMOTE_ADDR'], $apiEms['link'], 'POST', json_encode($arrParam), $respon);
			} catch (Zend_Rest_Client_Exception $e) {
				$return = false;
				$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
			} catch (Exception $e) {
				$return = false;
				$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
			}

			return $return;
//			if ($errors) {
//				print_r($errors);
//			} else {
//				print_r($respon);
//			}
		}
	}

	function dec_enc($action, $string) {
		$output = false;

		$encrypt_method = "AES-256-CBC";
		$secret_key = '2151ae91210a9ae3eaa9bec9fd82ce95b0ecfbc5';
		$secret_iv = 'faa4762cade124d130ba867298f8e22a6e2ce4e4';

// hash
		$key = hash('sha256', $secret_key);

// iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
		$iv = substr(hash('sha256', $secret_iv), 0, 16);

		if ($action == 'encrypt') {
			$output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
			$output = base64_encode($output);
		} else if ($action == 'decrypt') {
			$output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
		}

		return $output;
	}

	function printoutRead($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_complaint_printout_read',
						$param['unit_id'],
						$this->session->getUserId()
				);

				$return['data'] = $result;
				$return['success'] = true;
			} catch (Exception $e) {

			}
		}
		return $return;
	}

	function printoutundanganRead($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_complaint_printout_undangan_read',
						$param['aftersales_surat_id']
				);

				$return['data'] = $result;
				$return['success'] = true;
			} catch (Exception $e) {

			}
		}
		return $return;
	}

	function complaintUpdateSurvey($param = array()) {
		$aftersales_id = $param['aftersales_id'];
		$unit_id = $param['unit_id'];
		$param_nilai_survey = $param['nilai_survey'];
		$param_nilai_survey_nps = $param['nilai_survey_nps'];
		$param_periode = $param['periode'];

		if (is_array($param) && count($param)) {
			try {

				$result = $this->execSP3('sp_complaintsurvey_update', $aftersales_id,
						$unit_id,
						$param_nilai_survey,
						$param_nilai_survey_nps,
						$this->session->getUserId()
				);

				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}

		return $this->returned;
	}

	function UpdateParameter($param = array()) {
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_parameter_update_create', $param['parameter_name'],
						$param['value'],
						$this->session->getCurrentProjectId(),
						$this->session->getCurrentPtId(),
						$this->session->getUserId()
				);

				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}

		return $this->returned;
	}

//added by anas 04082021
	function complaintSurveyRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
						// $param['start'],
// $param['limit'],
// $param['page'],
				);
				$result = $this->execSP3('sp_survey_aftersales_read', $data);
// $return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

//added by anas 04082021
	function complaintSurveyPeriodeUpdate($param = array()) {
		$survey_aftersales_id = $param['survey_aftersales_id'];
		$purchaseletter_id = $param['purchaseletter_id'];
		$periode = $param['periode'];
		$nilai_survey = $param['nilai_survey'];
		$nilai_survey_nps = $param['nilai_survey_nps'];

		if (is_array($param) && count($param)) {
			try {

				$result = $this->execSP3('[sp_survey_aftersales_update]',
						$survey_aftersales_id,
						$purchaseletter_id,
						$periode,
						$nilai_survey,
						$nilai_survey_nps,
						$this->session->getUserId()
				);

				$this->returned['total'] = $result[0];
				$this->returned['success'] = $result[0] > 0;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}

		return $this->returned;
	}

//added by rico 14102021
	function complaintLogs($unit_id, $type) {
		try {
			$result = $this->execSP3('[sp_complaint_logs_read]', $unit_id, $type);

			$this->returned['data'] = $result[0];
		} catch (Exception $e) {
			var_dump($e->getMessage());
		}

		return $this->returned;
	}

	function complainthistoryRead($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['purchaseletter_id'],
					$param['page'],
					$param['limit']
				);
				$result = $this->execSP3('sp_complaint_history_serahterima_read', $data);

				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) { /* var_dump($e->getMessage()); */
			}
		}
		return $return;
	}

	function printoutpinjamRead($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_pinjampakai_printout_read',
						$param['unit_id'],
						$this->session->getUserId()
				);

				$return['data'] = $result;
				$return['success'] = true;
			} catch (Exception $e) {

			}
		}
		return $return;
	}

	function printoutsertifikatlayakstRead($param) {
		$return['success'] = false;

		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP2('sp_complaint_take_over_read_printout',
						$param['purchaseletter_id']
				);

				$return['data']    = $result;
				$return['success'] = true;
			} catch (Exception $e) {

			}
		}
		return $return;
	}

}

?>
