<?php

class Cashier_Models_Jupload extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'th_voucher_upload';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function juploadRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_voucherupload_read', 
									$param['projectpt_id'],
									$param['uploaduniquenumber']
								);

                $return['total'] = $resultdata[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata[1];
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function getlastvidRead($param) {
        $result = $this->execSP3('sp_get_cid', array(
            $param['pt_id'],
            $param['project_id'],
            'JR',
            $param['voucher_date'],
            $this->session->getUserId(),
            0
                )
        );

        return $result;
    }
    function juploadCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_jupload_create', 
									$param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['uploaduniquenumber']
                                                                        ,$param['seq_detail']
                                                                        ,$param['voucher_no']
                                                                        ,$param['voucher_date']
                                                                        ,$param['prefix']
                                                                        ,$param['description']
                                                                        ,$param['coa_detail']
                                                                        ,$param['type']
                                                                        ,$param['kawasan']
                                                                        ,$param['sub_unit']
                                                                        ,$param['amount_detail']
                                                                        ,$this->session->getUserId()
                                                                        ,$param['is_merge_coa']
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function iscoaexistRead($param) {
        $return = true;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_coa_checkexist_read', 
									$param['coa_detail'],
                                                                        $param['project_id']
                                                                        ,$param['pt_id']
								);
                if(!isset($resultdata[0])){
                    $resultdata[0]['IS_EXIST'] = false;
                    $resultdata[0]['coa_id'] = 0;
                    $resultdata[0]['kelsub_id'] = 0;
                    $resultdata[0]['kelsub'] = '';
                    $resultdata[0]['description'] = '';
                }
                
                $return = array(
                    "data" => array(
                        "IS_EXIST" => ($resultdata[0]['IS_EXIST']==0?false:true),
                        "coa_id" => $resultdata[0]['coa_id'],
                        "kelsub_id" => $resultdata[0]['kelsub_id'],
                        "kelsub" => $resultdata[0]['kelsub'],
                        "description" => $resultdata[0]['description']
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    function isprojectptexistRead($param) {
        $return = true;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_projectpt_checkexist_read', 
                                                                        $param['project_id']
                                                                        ,$param['pt_id']
								);
                if(!isset($resultdata[0])){
                    $resultdata[0]['IS_EXIST'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "IS_EXIST" => ($resultdata[0]['IS_EXIST']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    function checkbalanceRead($uploadunique) {
        $resultdata = $this->execSP('sp_checkbalanceuploadjournal', 
                                                                $uploadunique
                                                        );
        if(!isset($resultdata[0])){
            $resultdata[0]['voucher_no'] = '';
            $resultdata[0]['not_balance'] = '';
        }

        $return = array(
            "data" => $resultdata[0],
        );
        return $return;
    }
    
    function checkuploadidRead($param) {
        $resultdata = $this->execSP('sp_check_juploadid_read', 
                                                                        $param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['uploaduniquenumber']
                                                        );
        if(!isset($resultdata[0])){
            $resultdata[0]['voucher_no'] = '';
        }

        $return = array(
            "data" => $resultdata[0],
        );
        return $return;
    }
    
}

?>