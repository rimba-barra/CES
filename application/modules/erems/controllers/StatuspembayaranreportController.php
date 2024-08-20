<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/spout/src/Spout/Autoloader/autoload.php';
use Box\Spout\Reader\ReaderFactory;
use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\Style\Color;
use Box\Spout\Writer\Style\Border;
use Box\Spout\Writer\Style\StyleBuilder;
use Box\Spout\Writer\Style\BorderBuilder;

class Erems_StatuspembayaranreportController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	function excelAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $projectId    = $this->session->getCurrentProjectId();
		$project_name = $this->session->getCurrentProjectName();
		$ptId         = $this->session->getCurrentPtId();
		$pt_name      = $this->session->getCurrentPtName();

		$angsuran_ke  = $this->getRequest()->getPost('angsuran_ke');
		$status_bayar = $this->getRequest()->getPost('status_bayar');

		$dao    = new Erems_Models_General_ReportDao();
		$res    = $dao->status_pembayaran($projectId, $status_bayar, $angsuran_ke);
		$result = $res[0];

		$result_final = array();
		if(count($result) > 0){
			$fileResult = 'StatusPembayaran_Report_' . time() . '_' . $this->session->getUserId() . '.xlsx';
			$newFilePath = APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $fileResult;

			$border = (new BorderBuilder())
			    ->setBorderBottom()
			    ->setBorderTop()
			    ->setBorderLeft()
			    ->setBorderRight()
			    ->build();

			$style = (new StyleBuilder())
				->setFontSize(11)
				->setShouldWrapText(false)
				->build();

		   	$style_judul = (new StyleBuilder())
				->setFontBold()
				->setFontSize(12)
				->setShouldWrapText(false)
				->setBorder($border)
				->build();

		   	$style_header = (new StyleBuilder())
				->setFontBold()
				->setFontSize(18)
				->setShouldWrapText(false)
				->build();

		   	$style_header2 = (new StyleBuilder())
				->setFontSize(12)
				->setShouldWrapText(false)
				->build();

			// ... and a writer to create the new file
			$writer = WriterFactory::create(Type::XLSX);
			//$reader = ReaderFactory::create(Type::XLSX);
			
			$writer->openToFile($newFilePath);
			//$reader->setShouldFormatDates(false); 

			$writer->addRowWithStyle(array(''), $style);
			$writer->addRowWithStyle(array('Report Status Pembayaran'), $style_header);
			$writer->addRowWithStyle(array(''), $style);
			$writer->addRowWithStyle(array('Project', $project_name), $style_header2);
			$writer->addRowWithStyle(array('PT', $pt_name), $style_header2);
			$writer->addRowWithStyle(array('Print Date', date("d-m-Y H:i:s")), $style_header2);
			$writer->addRowWithStyle(array(''), $style);

			$judul = array();
			foreach($result[0] as $field => $value){
				$judul[] = ucwords(str_replace('_', ' ', $field));
			} 
			$writer->addRowWithStyle($judul, $style_judul);
			
			foreach($result as $data){
				$isi = array();
				foreach($data as $field => $value){
					$value = (is_numeric($value) && $field != "unit_number" ? doubleval($value) : $value);

					if($this->is_Date($value)){
						$value = date("d/m/Y", strtotime($value));
					}
					
					$isi[] = $value;
				}
				$writer->addRowWithStyle($isi, $style);
			}
			$writer->close();
			
			$result_final['url']     = 'app/erems/uploads/msexcel/' . $fileResult;
			$result_final['success'] = true;
		} else {
			$result_final['success'] = false;
		}

        echo Zend_Json::encode($result_final);

        $this->_helper->viewRenderer->setNoRender(true);
	}

	function is_Date($x) {
    	return (DateTime::createFromFormat('d-m-Y', $x) !== FALSE);
	}
}

?>