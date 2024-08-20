<?php

class Erems_PiutangjtreportController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function initRead() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$creator = new Erems_Box_Models_App_Creator();

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);


		$msg = '';


		$mc = new Erems_Models_App_Masterdata_Cluster();
		$ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

		$mt = new Erems_Models_App_Masterdata_Type();
		$mt->setSes($this->getAppSession());
		$at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterPC = new Erems_Models_App_Masterdata_ProductCategory();
		$allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);

		/// salesman 
		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Salesman();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getAll($employee);

		$allSalesman = array();
		$this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

		$hasil = array();

		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"DATA" => $hasil,
				"MSG" => $msg
		));




		$dm->setHasil(array($otherAT, $ac, $at, $allPC, $allSalesman));


		return $dm;
	}

	public function printoutRead() {




		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$msg = '';





		// $dao = new Erems_Models_Payment_Dao();
		$ses = $this->getAppSession();
		$payment = new Erems_Models_Payment_Payment();
		$payment->setArrayTable($this->getAppData());
		$data = $this->getAppData();

		$appDao = new Erems_Models_Master_AppDao();
		$pt = new Erems_Box_Models_Master_Pt();
		$project = new Erems_Box_Models_Master_Project();
		$ptInfo = $appDao->getPt($ses->getPt()->getId());
		$pt->setArrayTable($ptInfo[0][0]);
		$projectInfo = $appDao->getProject($ses->getProject()->getId());
		$project->setArrayTable($projectInfo[0][0]);



		$hasil = array(
			'pt_id' => $ses->getPt()->getId(),
			'project_id' => $ses->getProject()->getId(),
			'buildingclass' => $data["buildingclass"],
			'buildingclass_name' => $data["buildingclass_name"],
			'cluster_id' => 0,
			'type_id' => 0,
			'productcategory_id' => 0,
			'unitstatus_id' => 0,
			'groupby' => 0,
			'Project' => $project->getName(),
			'Pt' => $pt->getName(),
			'date_bot' => $data["bot_date"],
			'date_top' => $data["top_date"]
		);

		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"DATA" => $hasil,
				"MSG" => $msg
		));




		$dm->setHasil(array($otherAT));


		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_Processor();
	}

}

?>
