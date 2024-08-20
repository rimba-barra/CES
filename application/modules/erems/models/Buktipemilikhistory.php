<?php

class Erems_Models_Buktipemilikhistory extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 't_cancellation';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function buktipemilikhistoryRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {

			try {
				$limit = (empty($param['limit'])) ? 25 : $param['limit'];
				$page = (empty($param['page'])) ? 1 : $param['page'];
				$start = (empty($param['start'])) ? 0 : $param['start'];

				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$start,
					$limit,
					$page,
					$param['unit_id']
				);
				$result = $this->execSP3('sp_buktipemilikhistory_read', $data);

				$return['total']   = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result[1];
				$return['success'] = true;

			} 
			catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}
}

?>