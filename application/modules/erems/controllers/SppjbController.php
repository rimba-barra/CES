<?php

class Erems_SppjbController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		
		$genco       = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$model_sppjb = new Erems_Models_Sppjb();

		if($read_type_mode == 'subholding_config'){
			$result = $genco->activateSh1Features('sppjb_tgl_st');
        } 
        else if($read_type_mode == 'citra_raya'){
			$result = $genco->atasNama();
        }
        //added by anas 08092021
        else if($read_type_mode == 'sendwa'){
			$otherAT = array(array(
				"getPurcheletterSendWa"     => $genco->getPurcheletterSendWa(),
				"getPurcheletterSendWaText" => $genco->getPurcheletterSendWaText(),
				"validasiPrintSPPJB"        => $genco->validasiPrintSPPJB() // added by rico 15082023
			));
	        $result = array($otherAT);
        }
        else if($read_type_mode == 'configuration'){
	        $result = array(
	        	"ShowMoreCustomerOnGrid" => $genco->ShowMoreCustomerOnGrid()
	        );
        }
        else if($read_type_mode == 'validasiPrint'){ // added by rico 15082023
        	$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        	$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');

			$result = $model_sppjb->validasiSppjbRead($post_data);
        }else if($read_type_mode == 'savedocument'){ // added by rico 21022024
			$data   = json_decode($this->getRequest()->getPost('data'));
			$model  = new Erems_Models_Documentupload();
			$result = $model->documentuploadCreate($data);
        }else if($read_type_mode == 'deletedocument'){
        	$data = json_decode($this->getRequest()->getPost('sppjb_doc_id'));
        	$model = new Erems_Models_Documentupload();
        	
    		$result = $model->documentuploadDelete($data);
        }
        else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page']  = $this->getRequest()->getPost('page');
			
			$post_data['sppjb_id']          = $this->getRequest()->getPost('sppjb_id');
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['cluster_id']        = $this->getRequest()->getPost('cluster_id');
			
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			$post_data['unit_id']  = $this->getRequest()->getPost('unit_id');
			
			$post_data['unit_number']   = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			
			$post_data['sppjb_startdate'] = $this->getRequest()->getPost('sppjb_startdate');
			$post_data['sppjb_enddate']   = $this->getRequest()->getPost('sppjb_enddate');
			
			$post_data['handover_startdate'] = $this->getRequest()->getPost('handover_startdate');
			$post_data['handover_enddate']   = $this->getRequest()->getPost('handover_enddate');
			
			$post_data['sign_startdate'] = $this->getRequest()->getPost('sign_startdate');
			$post_data['sign_enddate']   = $this->getRequest()->getPost('sign_enddate');
			
			// added by rico 16022022
			$post_data['is_cancel'] = $this->getRequest()->getPost('is_cancel');

			$result = $model_sppjb->sppjbRead($post_data);
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_sppjb = new Erems_Models_Sppjb();
        $result = $model_sppjb->sppjbCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_sppjb = new Erems_Models_Sppjb();
        $result = $mode_sppjb->sppjbUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_sppjb = new Erems_Models_Sppjb();
        $result = $mode_sppjb->sppjbDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function prinoutAction(){
		
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Sppjb();

		$post_data['sppjb_id']     = $this->getRequest()->getPost('id');
		$post_data['parameter_id'] = $this->getRequest()->getPost('parameter_id');
		$document_name             = $this->getRequest()->getPost('document_name');
		
		$rs = $model->sppjbprinoutRead($post_data);
		
		$resultdata = $rs['data']['data'][0];
		
		$result['success'] = false;
		
		$data = array();
		if(count($resultdata) > 0){
			foreach($resultdata as $field => $value){
				$data[$field] = $value;
			}
			
			//$data["schedule_list"] = str_replace('\n ', '
//                                                                                                                              
//', $data["schedule_list"]);
			$data["schedule_list"] = str_replace('\n ', '             ', $data["schedule_list"]);
			$data["rp"] = str_replace('\n ', '          ', $data["rp"]);
			$data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);
			
			$data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
			$data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
			$data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);
            $data["jenis_biaya_include"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_include"]);
			$data["jenis_biaya_exclude"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_exclude"]);
            $data["jenis_biaya_include_skhp"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_include_skhp"]);
			$data["jenis_biaya_exclude_skhp"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_exclude_skhp"]);
            $data["kuasa_direksi2"] = str_replace('\n ', '                                                                                                                                       ', $data["kuasa_direksi2"]);


			if($data["param_image_01"]){
				$data["param_image_01"] = 'app/erems/uploads/townplanning/'.$data["param_image_01"];	
			}

			$p = new Erems_Box_Library_MyWordParser();
			$wpdf = new Erems_Box_Library_WordToPdf();
			//$fileSrc = 'template_ppjb.docx';
			//$fileSrc = 'sppjbprintout/'.$data["document_name"];
			$fileSrc = 'sppjbprintout/'.$document_name;
			
			$finalFile = 'PPJB_DOC_'.time().'.docx';
			$ok = $p->printDoc($fileSrc, $finalFile, $data);
			
			$generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			if($generalConfig->getFormatFileSPPJB()=="pdf"){
	            $wpdf->convert($p->getUrl());
	            $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
	        }else{
	            $pathUrl = $p->getUrl();
	        }
			
			if($ok){
				$result['success'] = true;
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
}
?>
