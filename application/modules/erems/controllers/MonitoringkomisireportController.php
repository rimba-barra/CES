<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_MonitoringkomisireportController extends ApliController {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {

		$ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

		$project_name = $this->session->getCurrentProjectName();
		$pt_name = $this->session->getCurrentPtName();

		/// salesman 

		$session = Apli::getSession();

		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Salesman();
		$employee->setProject($session->getProject());
		$employee->setPt($session->getPt());
		$salesman = $dao->getAll($employee);

		$return['project_name'] = $project_name;
		$return['pt_name'] = $pt_name;
		$return['salesman'] = $salesman[1];

		echo Zend_Json::encode($return);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
