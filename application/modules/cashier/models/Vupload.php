<?php

class Cashier_Models_Vupload extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'th_voucher_upload';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function vuploadRead($param) {
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
            'VC',
            $param['pengajuandate'],
            $this->session->getUserId(),
            0
                )
        );

        return $result;
    }
    function vuploadCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_vupload_create', 
									$param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['uploaduniquenumber']
                                                                        ,$param['department']
                                                                        ,$param['coa_header']
                                                                        ,$param['dataflow']
                                                                        ,$param['amount_header']
                                                                        ,$param['note']
                                                                        ,$param['is_customer']
                                                                        ,$param['is_vendor']
                                                                        ,$param['vendor_name']
                                                                        ,$param['pengajuandate']
                                                                        ,$param['kwitansidate']
                                                                        ,$param['duedate']
                                                                        ,$param['receipt_no']
                                                                        ,$param['status']
                                                                        ,$param['vid']
                                                                        ,$param['coa_detail']
                                                                        ,str_replace("'", '', $param['description'])
                                                                        ,$param['sub_unit']
                                                                        ,$param['seq_detail']
                                                                        ,$param['is_posting']
                                                                        ,$param['amount']
                                                                        ,$this->session->getUserId()
                                                                        ,$param['spk']
                                                                        ,$param['kawasan']
                                                                        ,str_replace("\r", "", str_replace("\n","",$param['paymentdate']))
                                                                        // ,$param['paymentdate']
                                                                        ,$param['is_merge_coa']
                				);
                // var_dump($affectedRow[0]['RESULT']);
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

    function checksubRead($param) {
        
        $resultdata = $this->execSP('sp_sub_checkexist_read', 
                                                                        $param['sub_unit']
                                                                        ,$param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['coa_detail']
                                                        );
        if(!isset($resultdata[0])){
            $resultdata[0]['IS_EXIST'] = false;
            $resultdata[0]['subgl_id'] = '';
        }

        $return = array(
            "data" => $resultdata[0],
        );
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
    function checkvuploadidRead($param) {
        $return = true;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_checkexistvuploadid_read', 
									$param['uploaduniquenumber'],
                                                                        $param['project_id']
                                                                        ,$param['pt_id']
								);
                if(!isset($resultdata[0])){
                    $resultdata[0]['allowed'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "allowed" => ($resultdata[0]['allowed']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    function validasiprefixRead($param) {
        $return = true;
        if (is_array($param) && count($param)) {
            try {
                
                $resultdata = $this->execSP('sp_validator_read', 'all', 'validasiprefixactive', 
                                                                        $param['project_id'], $param['pt_id'],
                        $param['coa_header'],$param['dataflow'],0,0
                ); 
                if(!isset($resultdata[0])){
                    $resultdata[0]['allowed'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "allowed" => ($resultdata[0]['allowed']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function checkvoucheridexists($param) {

        $return = true;
        if (is_array($param) && count($param)) {
            try {

                $uniquenumber = $param['project_id'].$param['pt_id'].$param['uploaduniquenumber'];
                
                $resultdata = $this->execSP('sp_validator_read', 'checkvoucheridexists', 'all', $param['project_id'], $param['pt_id'], $uniquenumber);

                if(!isset($resultdata[0])){
                    $resultdata[0]['result'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "is_exists" => ($resultdata[0]['result']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function checkdepartmentexists($param) {

        $return = true;
        if (is_array($param) && count($param)) {
            try {

                $uniquenumber = $param['project_id'].$param['pt_id'].$param['uploaduniquenumber'];
                
                $resultdata = $this->execSP('sp_validator_read', 'checkdepartmentexists', 'all', $param['project_id'], $param['pt_id'], $param['department']);

                if(!isset($resultdata[0])){
                    $resultdata[0]['result'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "is_not_exists" => ($resultdata[0]['result']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
}

?>