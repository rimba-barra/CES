<?php

class Erems_Models_Masterverification extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 'mh_verification';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function masterverificationRead() {
		$return['success'] = false;
		try {
			$result = $this->execSP3('sp_master_verification_read', $this->session->getCurrentProjectId());
			$return['total']   = $result[0][0]['totalRow'];
			$return['data']    = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}
}

?>