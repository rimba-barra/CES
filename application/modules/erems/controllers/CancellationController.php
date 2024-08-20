<?php

class Erems_CancellationController extends Zend_Controller_Action {
    
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    
    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $projectId = $this->session->getCurrentProjectId();
        $ptId = $this->session->getCurrentPtId();
        
        $model_cancellation = new Erems_Models_Cancellation();
        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        if($read_type_mode == 'verification_approval'){
            // added by rico 15082023
            $otherAT = array(array(
                "sh3b" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->validasish3b(),
                "writeoff" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->writeOffDendawithVerificationApproval()
            ));
            $result = $otherAT;
        } else if($read_type_mode == 'verificationapproval'){
            $post_data['verification_code'] = $this->getRequest()->getPost('verification_code');
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result = $model_cancellation->getapprovalRead($post_data);
        } 
        //added by anas 09092021
        else if($read_type_mode == 'sendwa'){
            $otherAT = array(array(
                "getPurcheletterSendWa" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getPurcheletterSendWa(),
                "getPurcheletterSendWaText" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getPurcheletterSendWaText(),      
            ));
            $result = array($otherAT);
        // added by rico 17122021
        } else if($read_type_mode == 'popupppjb'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $genco_popup       = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->showPopupSppjb();

            $result = array("records"=>$model_cancellation->getpopupPpjbRead($post_data), "genco_popup"=>$genco_popup);
        // added by rico 22072022
        } else if($read_type_mode == 'popupsubrogasi'){
            $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');

            $result = array("records"=>$model_cancellation->getpopupSubrogasiRead($post_data));

        // added by rico 01122022
        } else if($read_type_mode == 'schedule'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $post_data['page'] = (empty($this->getRequest()->getPost('page'))) ? 1 : $this->getRequest()->getPost('page');
            $post_data['limit'] = (empty($this->getRequest()->getPost('limit'))) ? 25 : $this->getRequest()->getPost('limit');

            $result = $model_cancellation->scheduleRead($post_data);
        //add by dika 202221208
        }else if ($read_type_mode == 'others_config') {
            $config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

            $result = array(
                'userAnulirCancel'             => in_array($this->session->getUserId(), $config->setAnulirPembatalanUser()) ? 1 : 0
            );
        } else if ($read_type_mode == 'savedocument') {
            $this->savedocument($this->getRequest()->getPost());
        } else if ($read_type_mode == 'deletedocument') {
            $this->deletedocument($this->getRequest()->getPost());
        } else if ($read_type_mode == 'savedownload') {
            $this->saveDownload($this->getRequest()->getPost());
        } else{
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['page'] = $this->getRequest()->getPost('page');

            $post_data['cancellation_id'] = $this->getRequest()->getPost('cancellation_id');
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');

            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['block_id'] = $this->getRequest()->getPost('block_id');
            // $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
            // $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
            $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
            $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
            $post_data['cancellation_startdate'] = $this->getRequest()->getPost('cancellation_startdate');
            $post_data['cancellation_enddate'] = $this->getRequest()->getPost('cancellation_enddate');

            $result = $model_cancellation->cancellationRead($post_data);
        }
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_cancellation = new Erems_Models_Cancellation();
        $result = $model_cancellation->cancellationCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_cancellation = new Erems_Models_Cancellation();
        $result = $mode_cancellation->cancellationUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_cancellation = new Erems_Models_Cancellation();
        $result = $mode_cancellation->cancellationDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function printoutAction(){
		
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Cancellation();

		$post_data['cancellation_id'] = $this->getRequest()->getPost('id');
		$document_name = $this->getRequest()->getPost('document_name');
		
		$rs = $model->cancellationprintoutRead($post_data);
		$resultdata = $rs['data'][0];
		
		$result['success'] = false;
		
		$data = array();
		if(count($resultdata) > 0){
			foreach($resultdata as $field => $value){
				$data[$field] = $value;
			}
			
			$p = new Erems_Box_Library_MyWordParser();

            //added by anas 09092021
            $wpdf = new Erems_Box_Library_WordToPdf();

			//$fileSrc = 'template_ppjb.docx';
			//$fileSrc = 'sppjbprintout/'.$data["document_name"];
			$fileSrc = 'pembatalanprintout/'.$document_name;
			
			$finalFile = 'PEMBATALAN_DOC_'.time().'.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			
            //added by anas 09092021
            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

            if($generalConfig->getFormatFileSPPJB()=="pdf"){
                $wpdf->convert($p->getUrl());
                $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
            }else{
                $pathUrl = $p->getUrl();
            }
            //end added by anas 09092021

			if($ok){
				$result['success'] = true;
				// $result['url'] = $p->getUrl();
                //updated by anas 09092021
                $result['url'] = $pathUrl;
			} else {
				$result['success'] = false;
			}
			
		} else {
			$result['success'] = false;
		}
		
		echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
	}
    
    function approverejectAction(){
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['cancellation_id'] = $this->getRequest()->getPost('id');
        $post_data['status'] = $this->getRequest()->getPost('status');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
        $post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
        $post_data['cancellation_date'] = $this->getRequest()->getPost('cancellation_date');
        
        $model = new Erems_Models_Cancellation();
        $result = $model->cancellationApproveReject($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    //add by dika 20221208
    function anulirAction(){
        
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['cancellation_id'] = $this->getRequest()->getPost('id');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
        $post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
        
        $model = new Erems_Models_Cancellation();
        $result = $model->cancellationAnulir($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function savedocument($records) {
        $hasil = FALSE;
        $msg = "Proses...";

        $params = $records;
        $params = json_decode($params["data"],true);
        $newDocument = new Erems_Models_DocumentpembatalanModel();
        $newDocument->setArrayTable($params);
        $valid = FALSE;

        if($newDocument->getFileName() == ""){
            $msg = "Please upload file first";
        }else{
            $valid = TRUE;
        } 

        if ($valid) {
           $dao = new Erems_Models_Documentpembatalan();
           if($newDocument->getId() > 0){
               $newDocument->setModiBy($this->session->getUserId());
               $hasil = $dao->documentpembatalanUpdate($newDocument);
           }else{             
               $newDocument->setAddBy($this->session->getUserId());
               $hasil = $dao->documentpembatalanCreate($newDocument);
           }
        }
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }  
    
    public function deletedocument($records) {
        $hasil = FALSE;
        $msg = "Proses...";

        $params = $records;
        $id = $params["cancellationdocument_id"];
        
        if($id==0){
            $msg = "Invalid document id";
        }else{
            $dao = new Erems_Models_Documentpembatalan();

            $data = array(
                'cancellationdocument_id' => $id
            );

            $hasil = $dao->documentpembatalanDelete($data);
        }
        
        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // added by rico 27102021
    public function saveDownload($records){
        $params = $records;
        $params = json_decode($params["data"],true);

        $data = array(
            "user_id" => $this->session->getUserId(), 
            "project_id" => $this->session->getCurrentProjectId(),
            "pt_id" => $this->session->getCurrentPtId(),
            "filename" => $params[0],
            "description" => $params[1],
            "cancellationdocument_id" => $params[2], 
            "alasan" => $params[3], 
        );

        $dao   = new Erems_Models_Documentpembatalan();
        $hasil = $dao->saveUnitInformation($data);

        $arrayRespon = array("HASIL" => $data, "MSG" => "msg");
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

}

?>