<?php

class Cashier_Models_Masterpenandatangan extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'm_penandatangan';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function penandatanganRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_masterpenandatangan_count', 
									$param['projectpt_id'],
									$param['inisial'], 
									$param['name']
								);
						
                $resultdata = $this->execSP('sp_masterpenandatangan_read', 
									$param['projectpt_id'],
									$param['inisial'], 
									$param['name'],
									$param['start'], 
									$param['limit'],
									$this->session->getUserId()
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
                $affectedRow = $this->execSP('sp_masterpenandatangan_create', 
									$param['projectpt_id'],
									$this->session->getUserId()
                                                                        ,$param['inisial']
                                                                        ,$param['name']
                                                                        ,$param['jabatan']
                                                                        ,$param['departemen']
                                                                        ,$param['sort']
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
                $affectedRow = $this->execSP('sp_masterpenandatangan_update', 
                                    $param['projectpt_id'],
									$param['penandatangan_id'],
									$this->session->getUserId()
                                                                        ,$param['inisial']
                                                                        ,$param['name']
                                                                        ,$param['jabatan']
                                                                        ,$param['departemen']
                                                                        ,$param['sort']
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
            $key_name = 'penandatangan_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_masterpenandatangan_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
}

?>