<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
// require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_TagihanvaController extends Zend_Controller_Action {

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
		}
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }

    // added by rico 12042022
    public function detailRead(){
		$model = new Erems_Models_Tagihanva();
        $projectId = $this->session->getCurrentProjectId();
		$ptId = $this->session->getCurrentPtId();

    	return $model->getCluster($projectId, $ptId);
    }
	
	public function downloadRead($param) {
        $projectId = $this->session->getCurrentProjectId();
		$ptId = $this->session->getCurrentPtId();

		$hasil = FALSE;
		$msg = "";
		$url = FALSE;
		$model = new Erems_Models_Tagihanva();

		$post_data['pt'] = $ptId;
		$post_data['project'] = $projectId;
		// $post_data['bankName'] = $param['data'];
		
		//added by anas 26082021
		$bankName = $param['data'];
		$periode_cutoff = $param['periode_cut_off'];


		$post_data['bankName'] = $bankName;
		$post_data['periode_cut_off'] = $periode_cutoff;
		
		// added by rico 12042022
		$post_data['cluster'] = $param['cluster'];

		$result = $model->getTagihanVAByBank($post_data);
        

        if($result['success'] == 'true')
        {
			if(count($result['data']) > 0)
	        {
		        $fileName = $bankName. "_" . $projectId . "_" . $ptId . "_" . $this->session->getUserId() . "" . time();
		        
				//added by anas 01092021
		        if($bankName == "Permata") //download jadi txt
		        {
					$content = "";
		        	foreach($result['data'] as $data){
						$content  .= str_pad($data['nomor_mva'], 16) . str_pad("000187670002030060088767000203006008", 36) . 
						substr(str_pad($data['customer_name'], 30),0,30) . str_pad("0000000000000000360", 19) . PHP_EOL;
		        	}

					file_put_contents(APPLICATION_PATH . '/../public/app/erems/uploads/txt/' . $fileName . ".txt", $content, FILE_APPEND);
					$hasil = TRUE;
		            $url = 'app/erems/uploads/txt/' . $fileName . ".txt";
		        }
		        else //download jadi excel
		        {
			        $jsonFile = APPLICATION_PATH . '/../public/app/erems/json/' . $fileName . '.json';
			        $excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexceljson/' . $fileName . '.xls';
			        $fp = fopen($jsonFile, 'w');
			        
			        fwrite($fp, json_encode($result['data']));
			        fclose($fp);
			        unset($result);
			        unset($model);
					
			        $jsonExcel = new Erems_Models_Library_JSON2Excel();

					//added by anas 26082021
			        if($bankName == "BCA" || $bankName == "BNI")
			        {
				        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/TagihanVA.xls';
				        $jsonExcel->fieldAwal = "TagihanVA";
			        }
			        else
			        {	
				        $jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/TagihanVAMandiri.xls';
				        $jsonExcel->fieldAwal = "TagihanVAMandiri";
			        }
					
					$hasil = $jsonExcel->process(array(), $jsonFile, $excelFile, 0, 'none', 'Excel5');

					if ($hasil) {
			            $url = "app/erems/uploads/msexceljson/" . $fileName . ".xls";
			        } else {
			            $msg = $jsonExcel->msg;
			        }
			    }
		    }
	    }	        

        $arrayRespon = array(
            "HASIL" => $hasil,
            "MSG" => $msg,
            "URL" => $url
        );
        return $arrayRespon;
    }
}

?>
