<?php

class Erems_Models_Mastercollector extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function mastercollectorRead($param) {

        $return['success'] = false;
        
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['position'],
					1
				);
				
				$result = $this->execSP3('sp_mastercollector_read', $data);	
				// var_dump($result);die();			
				$return['total'] = $result[0][0]['totalRow'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	

    /*function mastercollectorCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_mastercollector_create', 
									$param['purchaseletter_id'], 
									'', 
									$param['mastercollectorreason_id'], 
									$param['description'], 
									$param['mastercollector_date'], 
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

    function mastercollectorUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_mastercollector_update', 
									$param['mastercollector_id'], 
									$param['purchaseletter_id'], 
									'', 
									$param['mastercollectorreason_id'], 
									$param['description'], 
									$param['mastercollector_date'], 
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

    function mastercollectorDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'mastercollector_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_mastercollector_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }*/

}

?>