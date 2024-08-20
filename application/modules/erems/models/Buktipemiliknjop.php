<?php

class Erems_Models_Buktipemiliknjop extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = 'm_njop';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function buktipemiliknjopRead($param) {
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
				$result = $this->execSP3('sp_buktipemiliknjop_read', $data);

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

	function buktipemiliknjopCreate($param){
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_buktipemiliknjop_create', 
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['unit_id'],
					$param['njop'],
					$param['tahun'],
					$this->session->getUserId()
				);

				$return['success'] = $affectedRow;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function buktipemiliknjopUpdate($param){
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$affectedRow = $this->execSP('sp_buktipemiliknjop_update', 
					$param['njop_id'],
					$param['njop'],
					$param['tahun'],
					$param['unit_id'],
					$this->session->getUserId()
				);

				$return['success'] = $affectedRow;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}

	function buktipemiliknjopDelete($param){
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			$key_name = 'njop_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach ($param as $key => $val) {
				if (is_array($val)) {
					$param[$key_name] .= $val[$key_name] . '~';
				}
			}
			$param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_buktipemiliknjop_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool) $affectedRow;
			} catch (Exception $e) {

			}
		}
		return $return;
	}
}

?>