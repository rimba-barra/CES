<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Tagihanva extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function getTagihanVAByBank($param) {
		$return['success'] = false;
		
		try{
			$data = array (
					$param['pt'],
					$param['project'],
					$param['bankName'],
					//added by anas 26082021
					$param['periode_cut_off'],
					//added by rico 12042022
					$param['cluster']
				);

			$result = $this->execSP3('sp_tagihanva_read', $data);
			// var_dump($result); die();

            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) {  /*var_dump($e->getMessage());*/ 
        }

		return $return;
	}

	function getCluster($project, $pt){
		$return['success'] = false;
		
		try{
			$data = array (
				$project, $pt
			);

			$result = $this->execSP3('sp_clusterb_read', $data);
			// var_dump($result); die();

            $return['totalRow'] = $result[0][0]['totalRow'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) {  
        	/*var_dump($e->getMessage());*/ 
        }

		return $return;
	}
}

?>