<?php

class Cashier_Models_Masterpenandatanganrange extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'm_penandatangan_range';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function penandatanganrangeRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_masterpenandatanganrange_count', 
									($param['projectpt_id']==""?$this->session->getCurrentPtId():$param['projectpt_id']),
									$param['penandatangan_inisial'], 
									$param['penandatangan_name'],
									$param['range_untilamount'], 
									$param['range_fromamount']
								);
						
                $resultdata = $this->execSP('sp_masterpenandatanganrange_read',  
									($param['projectpt_id']==""?$this->session->getCurrentPtId():$param['projectpt_id']),
									$param['penandatangan_inisial'], 
									$param['penandatangan_name'],
									$param['range_untilamount'], 
									$param['range_fromamount'],
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

    function penandatanganrangeCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_masterpenandatanganrange_create', 
									$this->session->getUserId()
                                                                        ,$param['penandatangan_id']
                                                                        ,$param['rangeapprove_id']
                                                                        ,$param['prefix_id']
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

    function penandatanganrangeUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_masterpenandatanganrange_update', 
									$param['range_penandatangan_id'],
									$this->session->getUserId()
                                                                        ,$param['penandatangan_id']
                                                                        ,$param['rangeapprove_id']
                                                                        ,$param['prefix_id']
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

    function penandatanganrangeDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'range_penandatangan_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_masterpenandatanganrange_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>