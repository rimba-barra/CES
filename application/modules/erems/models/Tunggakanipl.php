<?php

class Erems_Models_Tunggakanipl extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'mh_komisi_permintaan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function tunggakaniplRead($params) {
		$return['success'] = false;
		try {
			$data = array(
				$params->getPost('purchaseletter_id'),
				$params->getPost('unit_number'),
				$params->getPost('cluster_id'),
				$params->getPost('block_id'),
				$params->getPost('unit_id'),
				$params->getPost('customer_name'),
				$params->getPost('page'),
				$params->getPost('limit'),
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId()
			);
			$result = $this->execSP3('sp_tunggakanipl_read', $data);
			$return['total'] = $result[0][0]['totalRow'];
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
//			echo $e;
		}
		return $return;
	}
	
	function tunggakaniplUpdate($params) {
		$return['success'] = false;
		try {
			$data = array(
				$params['purchaseletter_id'],
				$params['tunggakan_ipl'],
				$params['tunggakan_ipl_note'],
				$this->session->getUserId()
			);
			$result = $this->execSP3('sp_tunggakanipl_update', $data);
			$return['data'] = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
//			echo $e;
		}
		return $return;
	}

}

?>