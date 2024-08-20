<?php

class Erems_Models_Admincollection_Admincollectioncashier extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function admincollectionRead($param) {
        $return['success'] = false;
        
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'], 
					$param['customer_name'], 
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$param['pricetype_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
                               
				$result = $this->execSP3('sp_admincollectioncashier_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }

    /*function admincollectionCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_admincollection_create', 
									$param['purchaseletter_id'], 
									'', 
									$param['admincollectionreason_id'], 
									$param['description'], 
									$param['admincollection_date'], 
									$param['biaya'], 
									$param['ktp'], 
									$param['name'], 
									$param['address'], 
									$param['telephone'], 
									$param['mobilephone'], 
									$param['city_id'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function admincollectionUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_admincollection_update', 
									$param['admincollection_id'], 
									$param['purchaseletter_id'], 
									'', 
									$param['admincollectionreason_id'], 
									$param['description'], 
									$param['admincollection_date'], 
									$param['biaya'], 
									$param['ktp'], 
									$param['name'], 
									$param['address'], 
									$param['telephone'], 
									$param['mobilephone'], 
									$param['city_id'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function admincollectionDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'admincollection_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_admincollection_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }*/

}

?>