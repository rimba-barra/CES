<?php

class Erems_Models_Informasitagihan extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 'th_tagihan';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function informasitagihanRead($params) {
		$return['success'] = false;
		try {
			$post = $params->getPost();
			$data = array(
				$params->getPost('page'),
				$params->getPost('limit'),
				$this->session->getCurrentProjectId(),
				($params->getPost('cluster_id') ? $params->getPost('cluster_id') : 0),
				$params->getPost('unit_number'),
				$params->getPost('customer_name')
			);
			$result = $this->execSP3('sp_informasi_tagihan_read', $data);

			$return['total']   = $result[0][0]['totalRow'];
			$return['data']    = $result[1];
			$return['success'] = true;
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function checkDatainformasitagihanRead($params) {
		$return['success'] = false;
		try {
			$post = $params->getPost();
			$data = array(
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$params->getPost('tanggal'),
				$params->getPost('periode'),
			);
			$result = $this->execSP3('sp_informasi_tagihan_checkdata_read', $data);

			if($result[0][0]['totalRow'] > 0){
				$return['success'] = true;	
			}
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function informasitagihanCreate($param = array()) {
		$return['success'] = false;
		try {
			$affectedRow = $this->execSP3('sp_informasi_tagihan_create', 
				$param['tanggal'],
				$param['periode'],
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$this->session->getUserId()
			);
			$return['success'] = (bool)$affectedRow;

		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function informasitagihandetailRead($params) {
		$return['success'] = false;
		$result = array();
		try {
			if($params->getPost('mode') == 'gettagihanpurchaseletter'){
				$data = array(
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$params->getPost('page'), 
					$params->getPost('limit'),
					$params->getPost('tagihan_id'), 
					($params->getPost('cluster_id') ? $params->getPost('cluster_id') : 0),
					$params->getPost('unit_number'),
					$params->getPost('customer_name')
				);
				$result = $this->execSP3('sp_informasi_tagihan_purchaseletter_read', $data);
			}
			else if($params->getPost('mode') == 'gettagihanschedule'){
				$result = $this->execSP3('sp_informasi_tagihan_schedule_read', $params->getPost('tagihan_detail_id'));
			}

			if(count($result) > 0){
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];
				$return['success'] = true;
			}
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}

	function informasitagihanprintRead($params){
		$return['success'] = false;
		$result = array();
		try {
			$result = $this->execSP3('sp_informasi_tagihan_print_read', 
				$params->getPost('tagihan_detail_id'),
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId()
			);
			if(isset($result[0]) && isset($result[1]) && count($result[0]) > 0 && count($result[1]) > 0){
				$return['total']    = count($result[0]);
				$return['data']     = $result[0][0];
				$return['schedule'] = $result[1];
				$return['param']    = $result[2];
				$return['success']  = true;
			}
		} catch (Exception $e) {
			echo $e;
		}
		return $return;
	}
}

?>