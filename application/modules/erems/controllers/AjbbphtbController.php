<?php

class Erems_AjbbphtbController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		
		if($read_type_mode == 'others_config'){
			$projectid = $this->session->getCurrentProjectId();
			$ptid      = $this->session->getCurrentPtId();

			$result = array(
				'nonpajak_config'       => $this->nonpajakconfig($projectid, $ptid),
				'prolibfile'            => $this->prolibfile($projectid, $ptid),
				"typeCalculaterounding" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid)->typeCalculaterounding(),
			);
		}
		else {
        	$model_ajbbphtb = new Erems_Models_Ajbbphtb();

			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			
			$post_data['ajbbphtb_id'] = $this->getRequest()->getPost('ajbbphtb_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			
			$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
			// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
			$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
			$post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
			$post_data['ajbbphtb_no'] = $this->getRequest()->getPost('ajbbphtb_no');
			$post_data['ajbbphtb_startdate'] = $this->getRequest()->getPost('ajbbphtb_startdate');
			$post_data['ajbbphtb_enddate'] = $this->getRequest()->getPost('ajbbphtb_enddate');
			
			$result = $model_ajbbphtb->ajbbphtbRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_ajbbphtb = new Erems_Models_Ajbbphtb();
        $result = $model_ajbbphtb->ajbbphtbCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_ajbbphtb = new Erems_Models_Ajbbphtb();
        $result = $mode_ajbbphtb->ajbbphtbUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_ajbbphtb = new Erems_Models_Ajbbphtb();
        $result = $mode_ajbbphtb->ajbbphtbDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function prinoutAction(){
		
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Ajbbphtb();

		$post_data['ajbbphtb_id'] = $this->getRequest()->getPost('id');
		$document_name = $this->getRequest()->getPost('document_name');
		
		$rs = $model->ajbbphtbprinoutRead($post_data);
		$resultdata = $rs['data'][0];
		
		$user_id = $this->session->getUserId();
		
		$result['success'] = false;
		
		$data = array();
		if(count($resultdata) > 0){
			foreach($resultdata as $field => $value){
				$data[$field] = $value;
			}
			
			$p = new Erems_Box_Library_MyWordParser();
			
			$fileSrc = 'ajbbphtbprintout/'.$document_name;
			
			$finalFile = 'AJBBPHTB_DOC_'.time().'_'.$user_id.'.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			
			if($ok){
				$result['success'] = true;
				$result['url'] = $p->getUrl();
			} else {
				$result['success'] = false;
			}
			
		} else {
			$result['success'] = false;
		}
		
		echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
	}
	
	private function nonpajakconfig($project_id, $pt_id){
		$result = 0;
		
		$listprojectpt = Array(
			'0' => Array('project_id' => 3032, 'pt_id' => 3150),
			'1' => Array('project_id' => 3032, 'pt_id' => 4219)
		);
		
		foreach ($listprojectpt AS $item) { 
			if (in_array($project_id, $item) && in_array($pt_id, $item)) { 
				$result = 1;
			} 
		} 
		
		return $result;
	}

	private function prolibfile($projectid, $ptid){
		// cek semua fungsi yang digunakan keperluan masing Project 
		$dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
		$prolibsFiles      = scandir($dir);
		$prolibsFound      = NULL;
		$className         = "Prolibs_" . $projectid . "_" . $ptid;
		$prolibsFileSearch = $className . ".js";

		if (count($prolibsFiles) > 0) {
			$prolibsFiles = preg_grep("/.js$/", $prolibsFiles);

			if (in_array($prolibsFileSearch, $prolibsFiles)) {
				$prolibsFound = $className;
			}
		}

		return $prolibsFound;
	}
}

?>