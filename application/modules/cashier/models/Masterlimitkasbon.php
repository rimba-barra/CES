<?php

class Cashier_Models_Masterlimitkasbon extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'm_limitkasbondept';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function penandatanganRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_masterlimitkasbon_count', 
									$param['projectpt_id'],
									$param['user_id'], 
									$param['limit_cashbon']
								);
						
                $resultdata = $this->execSP('sp_masterlimitkasbon_read', 
									$param['projectpt_id'],
									$param['user_id'], 
									$param['limit_cashbon'],
									$param['start'], 
									$param['limit']
								);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function penandatanganCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_masterlimitkasbon_create', 
									$param['projectpt_id'],
									$this->session->getUserId()
                                    ,$param['user_id']
                                    ,$param['limit_cashbon']
                                    ,$param['limit_aging']
                                    ,$param['tipekasbondept_id']
                                                                      
                				);
                if(!empty($affectedRow[0])){
                    $return['success'] = false;
                }else{
                    $return['success'] = (bool) $affectedRow;
                }
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function penandatanganUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_masterlimitkasbon_update', 
                                    $param['projectpt_id'],
									$param['id_limitkasbon'],
									$this->session->getUserId()
                                    ,$param['user_id']
                                    ,$param['limit_cashbon']
                                     ,$param['limit_aging']
                                      ,$param['tipekasbondept_id']
                                                                     
                				);
                if(!empty($affectedRow[0])){
                    $return['success'] = false;
                }else{
                    $return['success'] = (bool) $affectedRow;
                }
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function penandatanganDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'id_limitkasbon';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_masterlimitkasbon_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
}

?>