<?php

class Cashier_EscrowreportController extends Cashier_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function initRead() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

		$creator = new Cashier_Box_Models_App_Creator();

		$dm = new Cashier_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$msg = '';
		$hasil = array();
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"DATA" => $hasil,
				"MSG" => $msg
		));
		$dm->setHasil(array($otherAT));
		return $dm;
	}

	public function excelRead() {
		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();
		$params = $this->getAppData();
		//  $salesmanId = intval($params["salesman_id"]) == 999 ? 0 : intval($params["salesman_id"]);
		$hasil = FALSE;
		$msg = "";

		$url = FALSE;

		$variables = $this->getAppData();

		/// header info
		$appDao = new Cashier_Models_Master_GeneralDao();
		$pt = new Cashier_Box_Models_Master_Pt();
		$project = new Cashier_Box_Models_Master_Project();
		$ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
		$pt->setArrayTable($ptInfo[0][0]);
		$projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
		$project->setArrayTable($projectInfo[0][0]);

		$variables["project"] = $project->getName();
		$variables["pt"] = $pt->getName();
		$variables["print_date"] = date("d-m-Y H:i:s");

		if (isset($variables["cbf_bank_id"]) && ($variables["cbf_bank_id"] == 1 || $variables["bank_id"] == "")) {
			$variables["bank_id"] = "ALL";
		}

		$dao = new Cashier_Models_General_ReportDao();
		$escrow = $dao->escrow($projectId, $variables["periode_startdate"], $variables["periode_enddate"], $variables["bank_id"], $variables["Statuslunas"]);
		foreach ($escrow[0] as $key => $value) {
			$escrow[0][$key]['purchase_date'] = $this->dateFormat($value['purchase_date']);
			$escrow[0][$key]['customer_homephone'] = $value['customer_homephone'] . ' ';
			$escrow[0][$key]['customer_mobilephone'] = $value['customer_mobilephone'] . ' ';
			$escrow[0][$key]['akad_realisasiondate'] = $this->dateFormat($value['akad_realisasiondate']);
			$escrow[0][$key]['akad_realisasiondate'] = $this->dateFormat($value['akad_realisasiondate']);
			$escrow[0][$key]['duedate_escrow'] = $this->dateFormat($value['duedate_escrow']);
			$escrow[0][$key]['realisation_date'] = $this->dateFormat($value['realisation_date']);
			$escrow[0][$key]['pencairan_date'] = $this->dateFormat($value['pencairan_date']);
			$escrow[0][$key]['duedate_escrow_t2'] = $this->dateFormat($value['duedate_escrow_t2']);
			$escrow[0][$key]['realisation_date_t2'] = $this->dateFormat($value['realisation_date_t2']);
			$escrow[0][$key]['pencairan_date_t2'] = $this->dateFormat($value['pencairan_date_t2']);
			$escrow[0][$key]['duedate_escrow_t3'] = $this->dateFormat($value['duedate_escrow_t3']);
			$escrow[0][$key]['realisation_date_t3'] = $this->dateFormat($value['realisation_date_t3']);
			$escrow[0][$key]['pencairan_date_t3'] = $this->dateFormat($value['pencairan_date_t3']);
			$escrow[0][$key]['duedate_escrow_t4'] = $this->dateFormat($value['duedate_escrow_t4']);
			$escrow[0][$key]['realisation_date_t4'] = $this->dateFormat($value['realisation_date_t4']);
			$escrow[0][$key]['pencairan_date_t4'] = $this->dateFormat($value['pencairan_date_t4']);
			$escrow[0][$key]['duedate_escrow_t5'] = $this->dateFormat($value['duedate_escrow_t5']);
			$escrow[0][$key]['realisation_date_t5'] = $this->dateFormat($value['realisation_date_t5']);
			$escrow[0][$key]['pencairan_date_t5'] = $this->dateFormat($value['pencairan_date_t5']);
			$escrow[0][$key]['duedate_escrow_t6'] = $this->dateFormat($value['duedate_escrow_t6']);
			$escrow[0][$key]['realisation_date_t6'] = $this->dateFormat($value['realisation_date_t6']);
			$escrow[0][$key]['pencairan_date_t6'] = $this->dateFormat($value['pencairan_date_t6']);
			$escrow[0][$key]['duedate_escrow_t7'] = $this->dateFormat($value['duedate_escrow_t7']);
			$escrow[0][$key]['realisation_date_t7'] = $this->dateFormat($value['realisation_date_t7']);
			$escrow[0][$key]['pencairan_date_t7'] = $this->dateFormat($value['pencairan_date_t7']);
			$escrow[0][$key]['duedate_escrow_t8'] = $this->dateFormat($value['duedate_escrow_t8']);
			$escrow[0][$key]['realisation_date_t8'] = $this->dateFormat($value['realisation_date_t8']);
			$escrow[0][$key]['pencairan_date_t8'] = $this->dateFormat($value['pencairan_date_t8']);
		}
//		print_r($escrow[0]);
//		die;
		$fileName = "Escrow Report_" . $projectId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
		$jsonFile = APPLICATION_PATH . '/../public/app/cashier/uploads/' . $fileName . '.json';
		$excelFile = APPLICATION_PATH . '/../public/app/cashier/uploads/msexceljson/' . $fileName . '.xlsx';
		$fp = fopen($jsonFile, 'w');

		fwrite($fp, json_encode($escrow[0]));
		fclose($fp);
		unset($escrow);
		unset($dao);

		// $jsonExcel = new Cashier_Models_Library_JsonToExcelWithTemplate();
		$jsonExcel = new Cashier_Models_Library_JSON2Excel();
		$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/cashier/uploads/exceltemplate/ReportEscrow.xlsx';
		$jsonExcel->fieldAwal = "cluster";
		$hasil = $jsonExcel->process($variables, $jsonFile, $excelFile);

		if ($hasil) {
			$url = "app/cashier/uploads/msexceljson/" . $fileName . ".xlsx";
		} else {
			$msg = $jsonExcel->msg;
		}

		$arrayRespon = array(
			"HASIL" => $hasil,
			"MSG" => $msg,
			"URL" => $url
		);
		return Cashier_Box_Tools::instantRead($arrayRespon, array());
	}

	private function dateFormat($date) {
		$returnDate = ($date == "" || $date == NULL || date('Y', strtotime($date)) == 1970 ? "" : date('d/m/Y', strtotime($date)));
		return $returnDate;
	}

	protected function getDefaultProcessor() {
		return new Cashier_Models_App_Box_Processor();
	}

}

?>
