<?php

class Erems_SklController extends Zend_Controller_Action {
    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        //added by anas 20052021
        if($this->getRequest()->getPost('mode_read') == 'detailGenco'){
            return $this->printAction();
            exit;
        }
        //end added by anas

        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_skl = new Erems_Models_Skl();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = (empty($this->getRequest()->getPost('limit'))) ? 25 : $this->getRequest()->getPost('limit');
		$post_data['page'] = $this->getRequest()->getPost('page');
		
		$post_data['skl_id'] = $this->getRequest()->getPost('skl_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		// $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
		// $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['skl_no'] = $this->getRequest()->getPost('skl_no');
		$post_data['skl_startdate'] = $this->getRequest()->getPost('skl_startdate');
		$post_data['skl_enddate'] = $this->getRequest()->getPost('skl_enddate');
		
        //added by fatkur 22072021
        if($read_type_mode == 'printout_document'){
            $result = $this->printout();
        } else if ($this->getRequest()->getPost('mode_read') == 'printdocGenco'){
            $result =  Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSKLReportNameModel2();
        } else {
            $result = $model_skl->sklRead($post_data);
        }
		
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_skl = new Erems_Models_Skl();
        $result = $model_skl->sklCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_skl = new Erems_Models_Skl();
        $result = $mode_skl->sklUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_skl = new Erems_Models_Skl();
        $result = $mode_skl->sklDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function printAction()
	{
		// $report_fn = 'Skl.mrt';
				
		// echo ($report_fn && file_exists($this->_helper->session->report_path.$report_fn)) ? $report_fn : 'ERROR';
				
        //updated by anas 20052021
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $otherAT = array("data" => array(
                "REPORT_FILE" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSKLReportName()
        ));
        echo Zend_Json::encode($otherAT);
        //end updated by anas

        $this->_helper->viewRenderer->setNoRender(true);

	}

    //added by fatkur 22072021
    function printout(){
        $model = new Erems_Models_Skl();

        $post_data['pl_id'] = $this->getRequest()->getPost('id');
        $document_name = $this->getRequest()->getPost('document_name');
        
        $rs = $model->sklPrintDocRead($post_data);
        // var_dump($rs); die();
        $resultdata = $rs['data'][0][0];
        
        $result['success'] = false;
        
        $data = array();
        if(count($resultdata) > 0){
            foreach($resultdata as $field => $value){
                $data[$field] = $value;
            }
            
            $p = new Erems_Box_Library_MyWordParser();
            $wpdf = new Erems_Box_Library_WordToPdf();
            $fileSrc = 'skl/'.$document_name;
            $finalFile = 'SKL_DOC_'.time().'.docx';
            $ok = $p->printDoc($fileSrc, $finalFile, $data);
            // var_dump($fileSrc); die();
            
            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

            if($generalConfig->getFormatFileSPT()=="pdf"){
                $wpdf->convert($p->getUrl());
                $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
            }else{
                $pathUrl = $p->getUrl();
            }

            // var_dump($pathUrl); die();
            
            if($ok){
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