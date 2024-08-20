<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/spout/src/Spout/Autoloader/autoload.php';
use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\Style\StyleBuilder;
use Box\Spout\Writer\Style\Color;

class Erems_StockmereportbController extends Zend_Controller_Action {

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
		
		echo Zend_Json::encode($return);
		
		$this->_helper->viewRenderer->setNoRender(true);
    }
	
	function exportAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Stockmereportb();
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['bot_date'] = $this->getRequest()->getPost('bot_date');
		$post_data['top_date'] = $this->getRequest()->getPost('top_date');
			
		$result = $model->stockmereportbRead($post_data);

		$result = $result['data'];
		
		$user_id = $this->session->getUserId();
		
		$fileResult = 'Stockme_Reportb_'.time().'_'.$user_id.'.xlsx';
		$newFilePath = APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/'.$fileResult;

		$style = (new StyleBuilder())
           ->setShouldWrapText(false)
		   ->build();
		
		// ... and a writer to create the new file
		$writer = WriterFactory::create(Type::XLSX);
		
		$writer->openToFile($newFilePath);

		if(count($result) > 0){
			$judul = array();
			foreach($result[0] as $field => $value){
				array_push($judul, $field);
			}
			//$writer->addRow($judul);
			$writer->addRowWithStyle($judul, $style);
			
			
			
			
			foreach($result as $data){
				$isi = array();
				foreach($data as $field => $value){
					// add by tommy
					$value = $field=="payment_percentage"?number_format($value,2):$value;
					// /add by tommy
					
					//$value = (is_numeric($value) ? number_format($value,2) : $value);
					if(is_numeric($value)){
						if(strpos($value,".") !== false){
							$value = number_format($value,2);
						}
					}
					
					array_push($isi, $value);
				}
				//$writer->addRow($isi);
				$writer->addRowWithStyle($isi, $style);
			}
			//$writer->addRows([[1,2,'',3,''], ['', 'A','B','A','B']]);
			
			
			$writer->close();
			
			$url = 'app/erems/uploads/msexcel/' . $fileResult;
			
			$result['url'] = $url;
			
			$result['success'] = true;
			
		} else {
			$result['success'] = false;
		}

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
	}
	
}

?>
