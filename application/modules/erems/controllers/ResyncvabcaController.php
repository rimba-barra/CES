<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
// require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_ResyncvabcaController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
		
		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       	$ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
		
		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();
		
		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;

		$mode_read = ($this->getRequest()->getPost('mode_read') ? $this->getRequest()->getPost('mode_read') : '');
		//updated by anas 01092021
		if($mode_read == 'download'){
		// var_dump($mode_read); die();
			$return = $this->downloadRead($this->getRequest()->getPost());
		}else if($mode_read == 'detail'){
			$return = $this->detailRead($this->getRequest()->getPost());
		}else if($mode_read == 'resync'){
			$return = $this->resyncRead($this->getRequest()->getPost());
		}
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }

    // added by rico 12042022
    public function detailRead($params){
		$model 		= new Erems_Models_Resyncvabca();

        $projectId 	= $this->session->getCurrentProjectId();
        $nomor_va 	= $params['nomor_va'];
        $payment_date 	= date('Y-m-d', strtotime($params['payment_date']));

    	return $model->getResync($projectId, $nomor_va, $payment_date);
    }

    // added by rico 12042022
    public function resyncRead($params){
		$model 		= new Erems_Models_Resyncvabca();

        $resync_id 	= $params['resync_id'];
        
    	return $model->getResyncData($resync_id);
    }
}

?>
