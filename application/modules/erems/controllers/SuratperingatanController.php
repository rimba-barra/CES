<?php

class Erems_SuratperingatanController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model_suratperingatan = new Erems_Models_Suratperingatan();

		$post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
		$post_data['read_type_mode'] = $this->getRequest()->getPost('read_type_mode');

		if ($post_data['mode_read'] == 'generate_berkas') {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$result = $model_suratperingatan->generateberkasRead($post_data);
		} else if ($post_data['mode_read'] == 'gridsprdetail') {
			$post_data['suratperingatan_id'] = $this->getRequest()->getPost('suratperingatan_id');
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$result = $model_suratperingatan->griddetailsprRead($post_data);
		} else if ($post_data['read_type_mode'] == 'printout_document') {
			$document_name = $this->getRequest()->getPost('document_name');
			$id = explode(",", $this->getRequest()->getPost('id'));
			$purchaseletter_id = $id[0];
			$suratperingatan_id = $id[1];
			$suratperingatan_index = $id[2];
			$result = $this->printsprout($suratperingatan_index, $suratperingatan_id, $purchaseletter_id);
		} else if ($post_data['mode_read'] == 'get_spr_index') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_suratperingatan->getsprindexRead($post_data);
		} else if ($post_data['mode_read'] == 'detail_grid') {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['tanggal_pembuatan'] = $this->getRequest()->getPost('tanggal_pembuatan');
			$result = $model_suratperingatan->detailgridRead($post_data);
		} else if ($post_data['mode_read'] == 'spr') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_suratperingatan->sprRead($post_data);
		} else if ($post_data['mode_read'] == 'schedule_payment') {
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$result = $model_suratperingatan->scheduleRead($post_data);
		} else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');

			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
//            $post_data['block_id'] = $this->getRequest()->getPost('block_id');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
//            $post_data['berkas_group'] = $this->getRequest()->getPost('berkas_group_menu');
			$post_data['page'] = $this->getRequest()->getPost('page');

			$result = $model_suratperingatan->suratperingatanRead($post_data);
		}






		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model_suratperingatan = new Erems_Models_Suratperingatan();

		$result = $model_suratperingatan->suratperingatanCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

//        var_dump($post_data);die();
		$model_suratperingatan = new Erems_Models_Suratperingatan();
		$result = $model_suratperingatan->pengumpulanberkasUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

//        var_dump($post_data);        die();
		$model_suratperingatan = new Erems_Models_Suratperingatan();
		$result = $model_suratperingatan->pengumpulanberkasDelete($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function printsprout($suratperingatan_index, $suratperingatan_id, $purchaseletter_id) {
		$model = new Erems_Models_Suratperingatan();
		$document_name = $this->getRequest()->getPost('document_name');
		$post_data['suratperingatan_id'] = $suratperingatan_id;
		$post_data['purchaseletter_id'] = $purchaseletter_id;
		$rs = $model->printsprRead($post_data);
		$rs_detail = $model->printsprdetailRead($post_data);
		if ($suratperingatan_index == 1) {
			$document_name_fn = str_replace('SURAT_PERINGATAN', 'SURAT_PERINGATAN_1', $document_name);
		} else if ($suratperingatan_index == 2) {
			$document_name_fn = str_replace('SURAT_PERINGATAN', 'SURAT_PERINGATAN_2', $document_name);
		} else if ($suratperingatan_index == 3) {
			$document_name_fn = str_replace('SURAT_PERINGATAN', 'SURAT_PERINGATAN_3', $document_name);
		} else if ($suratperingatan_index == 4) {
			$document_name_fn = str_replace('SURAT_PERINGATAN', 'SURAT_PEMBATALAN_SEPIHAK', $document_name);
			$rs = $model->printpembatalanRead($post_data);
		}

		if ($suratperingatan_index != 4) {
			$resultdata = $rs['data'][0];
			$resultdata_detail = $rs_detail['data'];
		} else {
			$resultdata = $rs['data'][0];
		}

		$result['success'] = false;

		$ParameterDao = new Erems_Models_Master_ParameterDao;
		$arr_parameter = array(
			'projectid'     => $this->session->getCurrentProjectId(), 
			'ptid'          => $this->session->getCurrentPtId(),
			'parametername' => 'CICILAN_TYPE_SP'
		);
		$paramCicilantxt = $ParameterDao->get_parameter($arr_parameter);
		$txtCicilan = $paramCicilantxt['success'] && $paramCicilantxt['total'] > 0 ? $paramCicilantxt['data'][0]['value'] : 'Cicilan';

		$data = $resultdata;
		if (count($resultdata) > 0) {
			$termin            = '';
			$duedate           = '';
			$remaining_balance = '';
			$remaining_denda   = '';
			$total             = '';
			$hari_denda        = '';
			foreach ($resultdata_detail as $key => $value) {
				if(isset($resultdata_detail[$key]['hari_denda'])){
					$hari_denda .= $resultdata_detail[$key]['hari_denda'] . '       ';
				}
				$termin .= $txtCicilan . ' ' . $resultdata_detail[$key]['termin'] . '       ';
				$duedate .= date_format(date_create($resultdata_detail[$key]['duedate']), "d M Y") . '          ';
				$remaining_balance .= 'Rp. ' . number_format($resultdata_detail[$key]['remaining_balance']) . '           ';
				$remaining_denda .= 'Rp. ' . number_format($resultdata_detail[$key]['remaining_denda']) . '          ';
				$total .= 'Rp. ' . number_format($resultdata_detail[$key]['total']) . '         ';
			}

			$data["hari_denda"]        = $hari_denda;
			$data["termin"]            = $termin;
			$data["duedate"]           = $duedate;
			$data["remaining_balance"] = $remaining_balance;
			$data["remaining_denda"]   = $remaining_denda;
			$data["total"]             = $total;

			$p = new Erems_Box_Library_MyWordParser();
			$wpdf = new Erems_Box_Library_WordToPdf();
			$fileSrc = 'suratperingatan/' . $document_name_fn;

			if ($suratperingatan_index == 4) {
				$finalFile = 'SURAT_PEMBATALAN_SEPIHAK_' . time() . '.docx';
			} else {
				$finalFile = 'SURAT_PERINGATAN_' . $suratperingatan_index . '_' . time() . '.docx';
			}
			$ok = $p->printDoc($fileSrc, $finalFile, $data);

			$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			if ($generalConfig->getFormatFileSPT() == "pdf") {
				$wpdf->convert($p->getUrl());
				$pathUrl = str_replace(".docx", ".pdf", $p->getUrl());
			} else {
				$pathUrl = $p->getUrl();
			}

			if ($ok) {
				$result['success'] = true;
				$result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
		} else {
			$result['success'] = false;
		}
		return $result;
	}

}

?>