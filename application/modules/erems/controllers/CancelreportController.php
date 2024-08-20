<?php

class Erems_CancelreportController extends Erems_Box_Models_App_Hermes_Report {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	public function processParams($request) {
		$params = array(
			'start_date' => $request['start_date'],
			'end_date' => $request['end_date']
		);
		return $params;
	}

	public function initRead() {
		$otherAT = array(array(
				"PRINTOUT" => TRUE,
				"DATA" => ['project_name' => $this->session->getCurrentProjectName(), 'pt_name' => $this->session->getCurrentPtName()],
				"MSG" => '',
		));
		
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		
		$dm->setHasil(array($otherAT));

		return $dm;
	}

}

?>
