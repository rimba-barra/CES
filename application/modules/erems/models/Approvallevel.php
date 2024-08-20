<?php

class Erems_Models_Approvallevel extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_approvallevel';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function getAllRead($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['modul']
				);
				$result = $this->execSP3('sp_approvallevel_cbf_read', $data);
				$return['total']   = count($result[0]);
				$return['data']    = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}

}

?>