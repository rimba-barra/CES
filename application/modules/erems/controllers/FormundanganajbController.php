<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_FormundanganajbController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_formundanganajb = new Erems_Models_Formundanganajb();
        
        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
//        var_dump($read_type_mode); 

       if($read_type_mode == 'detail'){
            $post_data['hgbajb_id'] = $this->getRequest()->getPost('hgbajb_id');
//                var_dump($post_data); die();
            $result = $model_formundanganajb->formundanganajbdetailRead($post_data);
        }else if ($read_type_mode == 'ExporttoExcel'){
            $result = $this->exportdata();
        } 
         //added by anas 27052021
        else if($read_type_mode == 'printout_document'){
            $result = $this->printout();
        }
        //end added by anas
        else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['block_id'] = $this->getRequest()->getPost('block_id');
            $post_data['page'] = $this->getRequest()->getPost('page');


            $result = $model_formundanganajb->formundanganajbRead($post_data);
        }

        
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
//        var_dump($post_data);die();
        $model_formundanganajb = new Erems_Models_Formundanganajb();
        $result = $model_formundanganajb->formundanganajbdetailCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_formundanganajb = new Erems_Models_Formundanganajb();
        $result = $model_formundanganajb->formundanganajbdetailUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_formundanganajb = new Erems_Models_Formundanganajb();
        $result = $model_formundanganajb->formundanganajbdetailDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function exportdata() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Formundanganajb();

		$result = $model->formundanganajbexportexcel();

		$resultdata = $result['data'];

		$data = array();

        $user_id = $this->session->getUserId();

        // Instantiate a new PHPExcel object 
		$objPHPExcel = new PHPExcel();
		// Set the active Excel worksheet to sheet 0 
		$objPHPExcel->setActiveSheetIndex(0);
		// Initialise the Excel row number 
		$rowCount = 1;
		$column = 'A';

		if (count($resultdata) > 0) {
			foreach ($resultdata[0] as $field => $value) {
				$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $field);
				$column++;
			}

			$rowCount = 2;
			foreach ($resultdata as $rs) {
				$column = 'A';
				foreach ($rs as $field => $value) {
					$objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
					$column++;
				}
				$rowCount++;
			}

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $fileResult = 'UndanganAJB_Report_'.time().'_'.$user_id.'.xlsx';
			$objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
			$url = 'app/erems/downloadfile/msexcel/' . $fileResult;

			$result['url'] = $url;
			$result['success'] = true;
		} else {
			$result['success'] = false;
		}
		return $result;
	}

    //added by anas 27052021
    function printout(){
        $model = new Erems_Models_Formundanganajb();

        $post_data['unit_id'] = $this->getRequest()->getPost('id');
        $document_name = $this->getRequest()->getPost('document_name');
        
        $rs = $model->printoutRead($post_data);
        $resultdata = $rs['data'][0];
        
        $result['success'] = false;
        
        $data = array();
        if(count($resultdata) > 0){
            foreach($resultdata as $field => $value){
                $data[$field] = $value;
            }
            
            $p = new Erems_Box_Library_MyWordParser();
            $wpdf = new Erems_Box_Library_WordToPdf();
            $fileSrc = 'undanganajb/'.$document_name;
            
            $finalFile = 'UNDANGAN_AJB_DOC_'.time().'.docx';
            $ok = $p->printDoc($fileSrc, $finalFile, $data);
            
            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

            if($generalConfig->getFormatFileSPT()=="pdf"){
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
        return $result;
    }

}

?>