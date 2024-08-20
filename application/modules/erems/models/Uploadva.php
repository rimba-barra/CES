<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Uploadva extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_unit';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function getAllByBank($param) {
		$return['success'] = false;
		
		try{
			$data = array (
					$param['pt'],
					$param['project'],
					$param['bankName']
				);
			$result = $this->execSP3('sp_uploadva_read', $data);
			// var_dump($result); die();

            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) {  /*var_dump($e->getMessage());*/ 
        }

		return $return;
	}

    function uploadVAUpdate($param) { 
        $return['success'] = false;
		try {
			$data = array (
				$param['unit_id'],
				$param['vitual_account'],
				$param['bank_name'],
				$param['admin_id']
			);

			$result = $this->execSP3('sp_uploadva_update', $data);	
					
			$return['data'] = $result[0];
			$return['success'] = $result[0] > 0;	
		} catch(Exception $e) { 
			// var_dump($e->getMessage()); 
			// $return['success'] = false;
			$return['msg'] = $e->getMessage();
		}

		return $return;
    }

}

?>