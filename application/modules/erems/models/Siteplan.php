<?php

class Erems_Models_Siteplan extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name = '';
	protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function unitList($param = array()) {
		try {
			$data = array(
				$this->session->getCurrentProjectId(),
				$this->session->getCurrentPtId(),
				$param['cluster_id']
			);
			$result = $this->execSP3('sp_siteplanunit_read', $data);
			return Zend_Json::encode($result[0]);
		} catch (Exception $e) {
			
		}
	}

	function ruleLegend($param = array()) {
		if (is_array($param) && count($param)) {
			try {
				$result = $this->execSP3('sp_mastersiteplanlegenddetail_read', [0, $this->session->getCurrentProjectId(), $this->session->getCurrentPtId()]);
				$return = array();
				foreach ($result[0] as $val) {
					$return[$val['siteplanlegend_id']][] = $val;
				}
				return Zend_Json::encode($return);
			} catch (Exception $e) {
				
			}
		}
	}

	function masterLegendList($param = array()) {
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					0,
					NULL,
					NULL,
					0,
					0,
					1,
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_mastersiteplanlegend_read', $data);
//				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}

//        var_dump($result);
		return $return;
	}

}

?>