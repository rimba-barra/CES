<?php

class Erems_Models_Fakturtagihanreport extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'th_schedule';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function fakturtagihanreportUpdate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['project_id'],
					$param['pt_id'],
					$param['param_periode_date'],
					$param['group_admin_display']

					//added by anas 10052021
					, $param['list_unit']
						//end added by anas
				);
				$result = $this->execSP3('sp_schedulefakturtagihanno_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

	//added by anas 10052021
	function getAllUnit($params) {
		$return['success'] = false;

		try {
			$data = array(
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$params->getPost('page'),
				$params->getPost('limit'),
				$params->getPost('unit_number', ''),
				$params->getPost('due_date', '') // added by rico 12052023
			);
			$result = $this->execSP3('sp_reportfakturtagihanunit_read', $data);
			$return['total'] = $result[0][0]['totalRow'];
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
			
		}

		return $return;
	}

	function getReport($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {

			try {
				$data = array(
					$param['project_id'],
					$param['pt_id'],
					$param['param_periode_date'],
					$param['group_admin_display'],
					$param['list_unit']
				);
				$result = $this->execSP3('sp_reportfakturtagihan_read', $data);
				$return['data'] = $result[0];
				$return['success'] = $result[0] > 0;
			} catch (Exception $e) {
			}
		}
		return $return;
	}

}

?>