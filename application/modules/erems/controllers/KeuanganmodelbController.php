<?php

class Erems_KeuanganmodelbController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function initRead() {


		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$otherAT = array(array(
				"PRINTOUT" => TRUE
		));




		$dm->setHasil(array($otherAT));


		return $dm;
	}

	public function excelRead() {



		$projectId = $this->getAppSession()->getProject()->getId();
		$ptId = $this->getAppSession()->getPt()->getId();
		$params = $this->getAppData();

		$hasil = FALSE;
		$msg = "";


		$dao = new Erems_Models_Master_GeneralDao();
		$ptId = isset($params["pt_id"]) && $params["pt_id"] ? $params["pt_id"] : 0;
		$filterDate = intval($params["year"]) . "-" . intval($params["month"]) . "-01";
		$dataKeuangan = $dao->getKeuanganModel2($projectId, $ptId, $filterDate, $params["status"]);
		$dataKeuangan = $dataKeuangan[0];

		$dataKeuanganEscrow = $dao->getKeuanganModel2Escrow($projectId, $ptId, $filterDate, $params["status"]);
		$dataKeuanganEscrow = $dataKeuanganEscrow[0];


		$aDao = new Erems_Models_Master_AppDao();
		$projectInfo = $aDao->getProject($projectId);


		$dataHeader = array(
			"project_name" => $projectInfo[0][0]["name"]
		);




		$fileName = $projectId . "_" . $ptId . "_" . $this->getAppSession()->getUser()->getId() . "" . time();
		$excelFile = APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $fileName . '.xlsx';

		// $jsonExcel = new Erems_Models_Library_JsonToExcelWithTemplate();
		$jsonExcel = new Erems_Models_Library_MyPhpExcel();
		$jsonExcel->fileTemplate = APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/KeuanganModel2.xlsx';

		$variables = array();
		$hasil = $jsonExcel->process($dataKeuangan, $dataKeuanganEscrow, $dataHeader, $excelFile, date("d-m-Y", strtotime($filterDate)));

		if ($hasil) {
			$url = "app/erems/uploads/msexcel/" . $fileName . ".xlsx";
		} else {
			$msg = $jsonExcel->msg;
		}

		$arrayRespon = array(
			"HASIL" => $hasil,
			"MSG" => $msg,
			"URL" => $url
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_Processor();
	}

}

?>
