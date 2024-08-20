<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_ComplaintController extends Zend_Controller_Action {

	protected $model;
	protected $result = array('total' => 0, 'success' => false, 'data' => array());

	public function init() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model   = new Erems_Models_Complaint();
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result         = array('data' => array(), 'total' => 0, 'success' => false);
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

		if ($read_type_mode == 'history') {
			return $this->historyRead();
			exit;
		}

		if ($read_type_mode == 'printout_document') {
			$result = $this->printDoc();
		}
		else if ($read_type_mode == 'status_salesforce') {
			$post_data['aftersales_id'] = $this->getRequest()->getPost('aftersales_id');
			$result = $this->model->statusSalesforceRead($post_data);
		}
		else if ($read_type_mode == 'grid_dokumen') {
			$post_data['aftersales_id'] = $this->getRequest()->getPost('aftersales_id');
			$result = $this->model->complaintdokumenRead($post_data);
		}
		else if ($read_type_mode == 'pengalihan_hak') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $this->model->complaintpengalihanhakRead($post_data);
		}
		else if ($read_type_mode == 'others_config') {
			$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			$ParameterDao = new Erems_Models_Master_ParameterDao;
			$arr_parameter = array(
				'projectid'     => $this->session->getCurrentProjectId(),
				'ptid'          => $this->session->getCurrentPtId(),
				'parametername' => 'USE_SALES_FORCE'
			);
			$paramUseSalesForce = $ParameterDao->get_parameter($arr_parameter);

			$arr_parameter['parametername'] = 'SEND_SALES_FORCE_SH1_SERVER';
			$paramSendSalesForceSH1Server = $ParameterDao->get_parameter($arr_parameter);

			$arr_parameter['parametername'] = 'NextDayUndanganDate1';
			$paramNextUndanganDate1 = $ParameterDao->get_parameter($arr_parameter);

			$arr_parameter['parametername'] = 'NextDayUndanganDate2';
			$paramNextUndanganDate2 = $ParameterDao->get_parameter($arr_parameter);

			$arr_parameter['parametername'] = 'NextDayUndanganDate3';
			$paramNextUndanganDate3 = $ParameterDao->get_parameter($arr_parameter);

			if ($paramSendSalesForceSH1Server['total'] == 0 || ($paramSendSalesForceSH1Server['total'] > 0 && $paramSendSalesForceSH1Server['data'][0]['value'] == 1)) {
				$sendSalesForceSH1Server = 1;
			} else {
				$sendSalesForceSH1Server = (int) $paramSendSalesForceSH1Server['data'][0]['value'];
			}

			$useSalesForce = 0;
			if ($paramUseSalesForce['total'] > 0) {
				$useSalesForce = (int) $paramUseSalesForce['data'][0]['value'];
			}

			$result = array(
				'survey_config'                 => $config->activateSurveyFeatures(),
				'sendwa'                        => array("getPurcheletterSendWa" => $config->getPurcheletterSendWa(), "getPurcheletterSendWaText" => $config->getPurcheletterSendWaText()),
				'useSalesForce'                 => $useSalesForce,
				'sendSalesForceSH1Server'       => $sendSalesForceSH1Server,
				'canSetupParameter'             => in_array($this->session->getUserId(), $config->getUserSetupSalesForce()) ? 1 : 0,
				'subholding'                    => $this->session->getcurrentSubholdingid(),
				'bastwithoutST'                 => $config->printBASTwithoutTglST(),
				'NextDayUndanganDate1'          => $paramNextUndanganDate1['total'] > 0 ? (int) $paramNextUndanganDate1['data'][0]['value'] : 0,
				'NextDayUndanganDate2'          => $paramNextUndanganDate2['total'] > 0 ? (int) $paramNextUndanganDate2['data'][0]['value'] : 0,
				'NextDayUndanganDate3'          => $paramNextUndanganDate3['total'] > 0 ? (int) $paramNextUndanganDate3['data'][0]['value'] : 0,
				'subholding_config'             => $config->activateSh1Features('aftersales_complaint'),
				'subholding_config_complaint'   => $config->complaintcitraraya(),
				'subholding_config_pinjampakai' => $config->pinjamPakaiPersentaseParams(),
				'counter_bast'                  => $config->counterbast(),
				'counter_nomer_surat'           => $config->counternomersurat(),
				'verification_doc_bast'         => $config->verification_doc_bast()
			);
		}
		else if ($read_type_mode == 'updateParameter') {
			$result = $this->model->UpdateParameter($this->getRequest()->getPost());
		}
		else if ($read_type_mode == 'grid_survey') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $this->model->complaintSurveyRead($post_data);
		}
		else if ($read_type_mode == 'logs') {
			$logs_type = ($this->getRequest()->getPost('logs_type') ? $this->getRequest()->getPost('logs_type') : '');
			$result = $this->downloadLogs($logs_type);
		}
		else {
			$post_data['start']         = $this->getRequest()->getPost('start');
			$post_data['limit']         = $this->getRequest()->getPost('limit');
			$post_data['page']          = $this->getRequest()->getPost('page');
			$post_data['cluster_id']    = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id']      = $this->getRequest()->getPost('block_id');
			$post_data['status_st']     = $this->getRequest()->getPost('status_st');
			$post_data['unit_number']   = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			$post_data['user_id']       = $this->session->getUserId();

			$result = $this->model->complaintRead($post_data);
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function readsuratAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_complaint = new Erems_Models_Complaint();
		$post_data['aftersales_id'] = $this->getRequest()->getPost('aftersales_id');

		$result = $model_complaint->complaintsuratRead($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function readdetailAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_complaint = new Erems_Models_Complaint();
		$post_data['aftersales_id'] = $this->getRequest()->getPost('aftersales_id');

		$result = $model_complaint->complaintdetailRead($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function readimagesAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_complaint = new Erems_Models_Complaint();
		$post_data['aftersales_complaint_id'] = $this->getRequest()->getPost('aftersales_complaint_id');

		$result = $model_complaint->complaintimagesRead($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploadimagesAction() {
		$upload = new Zend_File_Transfer_Adapter_Http();

		$files = $upload->getFileInfo('image_filename');

		foreach ($files as $file => $info) {
			$filename = $info['name'];
			if ($filename) {
				$ext  = pathinfo($filename, PATHINFO_EXTENSION);
				$name = pathinfo($filename, PATHINFO_FILENAME);

				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/', '', $name);
				$time          = explode('.', microtime());
				$postfix       = substr($time[1], 0, 5);
				$imageName     = "complaint_" . $new_file_name . "_" . $postfix . "." . $ext;

				$fileallowed = array('jpg', 'jpeg', 'png', 'tif', 'gif', 'JPG', 'JPEG', 'PNG', 'TIF', 'GIF');
				if (!(in_array($ext, $fileallowed))) {
					$msg = 'File type must images';
					$imageName = '';
					$success = false;
				} else {
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/complaint_images/' . $imageName, 'overwrite' => true));
					$success = false;
					$msg = '';

					try {
						$upload->receive();
						$success = true;
						$msg = 'success';
					} catch (Zend_File_Transfer_Exception $e) {
						$msg = $e->message();
						$imageName = '';
						$success = false;
					}
				}
			}
		}

		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('data' => array(), 'total' => 0, 'success' => $success, 'msg' => $msg, 'imageName' => $imageName);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploaddokumenAction() {
		$upload = new Zend_File_Transfer_Adapter_Http();
		$files = $upload->getFileInfo('dokumen_bast');

		foreach ($files as $file => $info) {
			$filename = $info['name'];
			if ($filename) {
				$ext     = pathinfo($filename, PATHINFO_EXTENSION);
				$time    = explode('.', microtime());
				$postfix = substr($time[1], 0, 5);

				if(in_array($this->getRequest()->getPost('jenis_file'), array('Form Pemeriksaan Bangunan', 'Sertifikat Layak ST', 'Form Ceklis Bangunan', 'Surat Kuasa dan Identitas Diri'))){
					$pref = '';
					$name = $this->getRequest()->getPost('jenis_file');
				}
				else{
					$pref = 'complaint_';
					$name = pathinfo($filename, PATHINFO_FILENAME);
				}

				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/', '', $name);

				$dokName = $pref . $new_file_name . "_" . $postfix . "." . $ext;

				$fileallowed = array('jpg', 'jpeg', 'png', 'tif', 'gif', 'JPG', 'JPEG', 'PNG', 'TIF', 'GIF', 'pdf');

				if (!(in_array($ext, $fileallowed))) {
					$msg = 'File type must images or pdf';
					$dokName = '';
					$success = false;
				}
				else {
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/erems/uploads/complaint_dokumen/' . $dokName, 'overwrite' => true));
					$success = false;
					$msg = '';

					try {
						$upload->receive();
						$success = true;
						$msg = 'success';
					} catch (Zend_File_Transfer_Exception $e) {
						$msg = $e->message();
						$dokName = '';
						$success = false;
					}
				}
			}
		}

		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('data' => array(), 'total' => 0, 'success' => $success, 'msg' => $msg, 'dokName' => $dokName);
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model_complaint = new Erems_Models_Complaint();
		if (isset($post_data['survey']) && $post_data['survey'] == true) {
			$result = $model_complaint->complaintSurveyPeriodeUpdate($post_data);
		}
		else if (isset($post_data['sync']) && $post_data['sync'] == true) {
			$result = $model_complaint->syncEms($post_data);
		}
		else {
			$result = $model_complaint->complaintUpdate($post_data);
		}

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function printDoc(){
		$model = new Erems_Models_Complaint();

		$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$document_name = $this->getRequest()->getPost('document_name');
		$parametername = $this->getRequest()->getPost('parametername');

		$fileSrc           = '';
		$fileRes           = '';
		$resData           = array();
		$result['success'] = false;

		if($parametername == 'PRINTOUT_BAST_DOC'){
			$fileSrc = 'bastprintout/' . $document_name;
			$fileRes = 'BAST_DOC_' . time() . '.docx';

			$post_data['unit_id'] = $this->getRequest()->getPost('id');

			$res     = $model->printoutRead($post_data);
			$resData = $res['data'][0];
		}
		else if (stripos($parametername, 'AFTERSALES_UNDANGAN') !== false) {
			$fileSrc = 'undanganprintout/' . $document_name;
			$fileRes = 'UNDANGAN_DOC_' . time() . '.docx';

			$post_data['aftersales_surat_id'] = $this->getRequest()->getPost('id');

			$res     = $model->printoutundanganRead($post_data);
			$resData = $res['data'][0];
		}
		else if($parametername == 'PRINTOUT_PINJAM_DOC'){
			$fileSrc = 'pinjampakai/' . $document_name;
			$fileRes = 'PINJAM_DOC_' . time() . '.docx';

			$post_data['unit_id'] = $this->getRequest()->getPost('id');

			$res     = $model->printoutpinjamRead($post_data);
			$resData = $res['data'][0];
		}
		else if ($parametername == 'SERTIFIKAT_LAYAK_ST') {
			$fileSrc = $document_name;
			$fileRes = 'SERTIFIKAT_LAYAK_ST_' . time() . '.docx';

			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('id');

			$res     = $model->printoutsertifikatlayakstRead($post_data);
			$resData = $res['data'][0];
		}

		if(count($resData) > 0 && $fileSrc != '' && $fileRes != ''){
			$data = array();
			foreach ($resData as $field => $value) {
				$data[$field] = $value;
			}

			$p       = new Erems_Box_Library_MyWordParser();
			$ok      = $p->printDoc($fileSrc, $fileRes, $data);
			$pathUrl = $p->getUrl();

			if ($generalConfig->getFormatFileSPT() == "pdf") {
				$wpdf = new Erems_Box_Library_WordToPdf();
				$wpdf->convert($pathUrl);

				$pathUrl = str_replace(".docx", ".pdf", $pathUrl);
			}

			if ($ok) {
				$result['success'] = true;
				$result['url']     = $pathUrl;
			}
		}

		return $result;
	}

	// added by rico 14102021
	function downloadLogs($type) {
		$model_complaint = new Erems_Models_Complaint();
		$result = $model_complaint->complaintLogs($this->getRequest()->getPost('unit_id'), $type);

		$data = $result['data'];

		if (count($data)) {
			$splitter = '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~';

			$text = '';
			for ($i = 0; $i < count($data); $i++) {
				$text .= $data[$i]['response'] . PHP_EOL . $splitter . PHP_EOL;
			}
			$url = "app/erems/log/" . $type . ".log";
		} else {
			$url = '';
			$text = '';
		}

		$hasil = array(
			"URL" => $url,
			"text" => $text
		);

		return $hasil;
	}

	// added by rico 19012022
	function historyRead() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_complaint = new Erems_Models_Complaint();

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['page'] = ($this->getRequest()->getPost('page') <= 0) ? 1 : $this->getRequest()->getPost('page');
		$post_data['limit'] = ($this->getRequest()->getPost('limit') <= 0) ? 25 : $this->getRequest()->getPost('limit');

		$result = $model_complaint->complainthistoryRead($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
