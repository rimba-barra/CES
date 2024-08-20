<?php

class Erems_Models_Keuanganmodelareport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_schedule';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function keuanganmodelareportRead($param) {

    	echo $param['purchase_startdate'] . ', ' . $this->session->getCurrentProjectId() . ', ' .  $param['pt_id'] . ', ' . $param['status'];
    	die();
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_reportkeuanganmodel1_read',
					$param['purchase_startdate'],
					$this->session->getCurrentProjectId(),
					$param['pt_id'],
					$param['status']
				);

				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data']    = $result;
				$return['success'] = true;

			} catch(Exception $e) { }
		}
		return $return;
    }



}

?>
