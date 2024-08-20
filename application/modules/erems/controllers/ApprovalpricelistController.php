<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_ApprovalpricelistController extends Zend_Controller_Action {
	private $model;
	function init() {
		date_default_timezone_set('Asia/Jakarta');
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->model  = new Erems_Models_Master_Pricelist();
	}

	function readAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data  = $this->getRequest()->getPost();

		$post_data['project_id'] = $this->session->getCurrentProjectId();        
		$post_data['pt_id']      = $this->session->getCurrentPtId();

		if(isset($post_data['mode_read'])){
			if($post_data['mode_read'] == 'getHtmlemail'){
				$res = Erems_Box_Tools::emailPricelist($post_data);
				if($res['html']){
					$result['success']    = true;
					$result['html']       = Zend_Json::encode($res['html']);
					$result['data_email'] = $res['data_email'];
					$result['show_btn']   = $res['show_btn'];
				}
			}
			else if($post_data['mode_read'] == 'update_status'){
				$result = $this->updateStatus($post_data);
			}
			else if($post_data['mode_read'] == 'export_excel'){
				$result = $this->exportExcel($post_data);
			}
		}
		else{
			$result = $this->model->pricelistbystatus($post_data);
		}

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function statusAction(){
		$exp   = explode('/', $_SERVER['REQUEST_URI']);
		$indx  = count($exp) > 0 ? count($exp)-1 : 0;
		$check = $exp[$indx];

		$queryString = explode('&',base64_decode($check));

		$param = array();
		foreach ($queryString as $key => $value) {
			list($k,$v) = explode('=',$value);
			$param[$k] = $v;
		}

		if($param['status'] == 'DETAIL' && $param['modulesmenu'] == 'Approvalpricelistopen'){
			$module_menu = Zend_Json::encode(array(
				'controller' => $param['modulesmenu'],
				'data'       => array('pricelist_id' => $param['pricelist_id'])
			));

			if(!isset($_COOKIE['url_module'])){ setcookie('url_module', base64_encode('main/index/home/apps/'.$param['moduleid'].'/code/'.$param['projectptid']), 0, '/'); }
			if(!isset($_COOKIE['module_name'])){ setcookie('module_name', base64_encode($param['modulename']), 0, '/'); }
			if(!isset($_COOKIE['module_menu'])){ setcookie('module_menu', base64_encode($module_menu), 0, '/'); }

			$uri_path = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME']) . '/');
			$link     = 'Location: ' . $uri_path;
			header($link);
		}
		exit;
	}

	function updateStatus($param){
		$status = $param['status'];
		$result = array('success' => false, 'msg' => 'Data pricelist gagal ' . ($status == 'APPROVE' ? 'disetujui' : 'direject') . '.');

		$listApprv = $this->model->pricelistCheckApproveList($param);
		if($listApprv['success']){
			$data = $listApprv['data'];

			$approvallevel  = count($data[3]);
			$masterapproval = count($data[2]);
			if($approvallevel < $masterapproval){
				$param['approveid']    = $data[2][$approvallevel]['user_id'];
				$param['approvename']  = $data[2][$approvallevel]['user_name'];
				$param['approveemail'] = $data[2][$approvallevel]['email'];
				$param['approveorder'] = $data[2][$approvallevel]['approve_order'];

				if($param['status'] == 'APPROVE' && $masterapproval-$approvallevel > 1){
					$param['status'] = 'OPEN';
				}

				$sendStatus = $this->model->pricelistSetStatusDocStatus($param);

				if($sendStatus['success']){
					$param['sendtoemail']       = true;
					$param['approvallevelnext'] = true;
					$param['dataApproval']      = $sendStatus;
					$param['project_id']        = $sendStatus['data']['project_id'];
					$param['pt_id']             = $sendStatus['data']['pt_id'];
					$param['assign_approveby']  = $sendStatus['data']['approveby'];
					$param['assign_rejectby']   = $sendStatus['data']['rejectby'];

					$sEm = $this->sendEmailWithAttachment($param);

					if($sEm['statusSentMail']){
						$msg = 'Data pricelist ' . $sendStatus['data']['keterangan'] . ' sukses ' . ($status == 'APPROVE' ? 'disetujui' : 'direject') .'.<br>Terkirim ke email ' . $sEm['emailAddress'];
						if(isset($sEm['emailAddress_cc']) && count($sEm['emailAddress_cc']) > 0){ 
							$ecc = array();
							foreach($sEm['emailAddress_cc'] as $keycc => $valcc){
								$ecc[] = $valcc['email'];
							}
							$msg .= ' dan CC ke ' . implode(', ', $ecc) . '.';
						}

						$result['success'] = true;
						$result['msg']     = $msg;
					}
					else{
						$result['msg'] = 'Data pricelist ' . $sendStatus['data']['keterangan'] . ' tidak terkirim ke email '. $sEm['emailAddress'] .' dan gagal ' . ($status == 'APPROVE' ? 'disetujui' : 'direject') . '.';
					}
				}
			}
		}

		return $result;
	}

	function sendEmailWithAttachment($param){
		$result['success']        = false;
		$result['statusSentMail'] = false;

		$dataEmail = Erems_Box_Tools::emailPricelist($param);

		if($dataEmail['html']){
			$var = array(
				'title'       => "CES System - " . $dataEmail['data_email']['project_name'],
				'subject'     => 'Request Pricelist from '.$dataEmail['data_email']['project_name'],
				'content'     => $dataEmail['html'],
				'sender'      => $dataEmail['data_email']['email_sender'],
				'recipient'   => $dataEmail['data_email']['email_recipient'],
				'ccrecipient' => $dataEmail['data_email']['email_cc'],
			);

			$statusSentMail = Erems_Box_Tools::emailSend($var);
			if($statusSentMail){
				$result['statusSentMail']  = true;
				$result['success']         = true;
				$result['emailAddress']    = $dataEmail['data_email']['email_recipient']["email"];
				$result['emailAddress_cc'] = $dataEmail['data_email']['email_cc'];

				if(!$dataEmail['data_email']['is_sendmail']){
					$this->model->pricelistSendMailAccept($param);
				}
			}
			else{
				$result['message'] = "Email gagal terkirim.";
			}
		}
		return $result;
	}

	function exportExcel($param){
		$hasil = FALSE;
		$msg   = "";
		$url   = FALSE;

		$arr_status  = array('ALL' => 'Semua', 'OPEN' => 'Menunggu Persetujuan', 'APPROVE' => 'Disetujui', 'REJECT' => 'Ditolak');
		$arr_periode = array();
		if($param['periode_startdate']){
			$arr_periode[] = date('d-m-Y', strtotime($param['periode_startdate']));
			if(!$param['periode_enddate']){
				$arr_periode[] = '-';
			}
		}
		if($param['periode_enddate']){
			if(!$param['periode_startdate']){
				$arr_periode[] = '-';
			}
			$arr_periode[] = date('d-m-Y', strtotime($param['periode_enddate']));
		}

		$param["filter_projectpt"] = $this->session->getCurrentProjectName() . ' - ' . $this->session->getCurrentPtName();
		$param["filter_status"]    = strtoupper($arr_status[$param['status']]);
		$param["filter_periode"]   = count($arr_periode) ? implode(' s/d ', $arr_periode) : '-';
		$param["print_date"]       = date("d-m-Y H:i:s");

		$data = $this->model->pricelistbystatus($param);
		if($data['success'] && $data['total'] > 0){
			$fileName = "ApprovalProcelist_" . $param['project_id'] . "_" . $param['pt_id'] . "_" . $this->session->getUserId() . "" . time();
			$jsonFile  = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
			$excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xlsx';
			$fp        = fopen($jsonFile, 'w');
	        
	        fwrite($fp, json_encode($data['data']));
	        fclose($fp);

	        $fileTemplate = 'ApprovalPricelist-APPROVE';
	        if($param['status'] == 'REJECT'){
	        	$fileTemplate = 'ApprovalPricelist-REJECT';
	        }
	        else if($param['status'] == 'ALL'){
	        	$fileTemplate = 'ApprovalPricelist';
	        }

	        $jsonExcel = new Erems_Models_Library_JSON2Excel();
	        $fileTemplate = 'ApprovalPricelist-APPROVE';
	        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/' . $fileTemplate . '.xlsx';
	        $jsonExcel->fieldAwal = "project_name";
	        $hasil = $jsonExcel->process($param, $jsonFile, $excelFile);

	        if ($hasil) {
	            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xlsx";
	        } else {
	            $msg = $jsonExcel->msg;
	        }

		}

        return array("HASIL" => $hasil, "MSG" => $msg, "URL" => $url);
	}
}
?>