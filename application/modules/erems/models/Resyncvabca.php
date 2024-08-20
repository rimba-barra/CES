<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Resyncvabca extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	function getResync($project, $nomor, $payment){
		$return['success'] = false;
		
		try{
			$data = array (
				$project, 
				$nomor, 
				$payment
			);

			$result = $this->execSP3('sp_getresync_read', $data);
			// var_dump($result); die();

            $return['totalRow'] = count($result[0]);
            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) {  
        	/*var_dump($e->getMessage());*/ 
        }

		return $return;
	}

	function getResyncData($resync){
		$return['success'] = false;
		
		try{
			$data = array (
				$resync
			);

			$result = $this->execSP3('sp_getresyncdata_read', $data);
			// var_dump($result); die();

            $return['totalRow'] = count($result[0]);
            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) {  
        	/*var_dump($e->getMessage());*/ 
        }

		return $return;
	}
}

?>