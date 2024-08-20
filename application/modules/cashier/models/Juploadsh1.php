<?php

class Cashier_Models_Juploadsh1 extends Zend_Db_Table_Abstract {

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
                $affectedRow = $this->execSP('sp_juploadsh1_create', 
									$param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['uploaduniquenumber']
                                                                        ,$param['seq_detail']
                                                                        ,$param['voucher_no']
                                                                        ,$param['voucher_date']
                                                                        ,$param['prefix']
                                                                        ,str_replace("'", '', $param['description'])
                                                                        ,$param['coa_detail']
                                                                        ,$param['type']
                                                                        ,$param['kawasan']
                                                                        ,$param['sub_unit']
                                                                        ,$param['amount_detail']
                                                                        ,$this->session->getUserId()
                                                                        ,$param['is_merge_coa']
                                                                        ,$param['cashflow']
                                                                        ,$param['sub_description']
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
        $resultdata = $this->execSP('sp_check_juploadid_read', $param['project_id'] ,$param['pt_id']  ,$param['uploaduniquenumber'] ,$param['voucher_date']); 
        if(!isset($resultdata[0])){
            $resultdata[0]['voucher_no'] = '';
            $resultdata[0]['closing'] = false;
        }

        $return = array(
            "data" => $resultdata[0],
        );
        return $return;
    }
    
    function checkcashflowRead($param) {
        $resultdata = $this->execSP('sp_cashflow_checkexist_read', 
                                                                        $param['cashflow']
                                                                        ,$param['project_id']
                                                                        ,$param['pt_id']
                                                                        ,$param['coa_detail']
                                                        );
        if(!isset($resultdata[0])){
            $resultdata[0]['IS_EXIST'] = false;
            $resultdata[0]['setupcashflow_id'] = '';
            $resultdata[0]['IS_EXIST_COA'] = false;
        }

        $return = array(
            "data" => $resultdata[0],
        );
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
    
    function checkprefixRead($param) {
        $resultdata = $this->execSP('sp_prefix_checkexist_read', 
                                                                        $param['prefix']
                                                                        ,$param['project_id']
                                                                        ,$param['pt_id']
                                                        );
        if(!isset($resultdata[0])){
            $resultdata[0]['IS_EXIST'] = false;
            $resultdata[0]['prefix_id'] = '';
            $resultdata[0]['is_cashier'] = 1;
        }

        $return = array(
            "data" => $resultdata[0],
        );
        return $return;
    }

    function isjournalnumberexistsRead($param) {
        
        $resultdata = $this->execSP('sp_validator_read', 'checknomorjournal', 'journal', $param['project_id'], $param['pt_id'], $param['voucher_no']);

        if(!isset($resultdata[0]['voucher_no'])){
            $resultdata[0]['IS_EXIST'] = false;
        } else {
            $resultdata[0]['IS_EXIST'] = true;
        }

        $return = array(
            "data" => $resultdata[0],
        );
        return $return;

    }

    function isprefixactive($param) {

        $resultdata = $this->execSP('sp_validator_read', 'validasiprefixjournalactive', 'journal', $param['project_id'], $param['pt_id'], $param['prefix']);
        $return = array(
            "data" => $resultdata[0],
        );
        return $return;
    }

    function checkjournalnotbalance($pt_id,$project_id) {
        $result = $this->execSP('sp_checkjournalnotbalance', 
            $pt_id, $project_id
        );
        
        return $result;
    }
    function checkJournalBeforeUpload($param) {
        $resultdata = $this->execSP3('sp_checkjournalbeforeupload', $param['project_id'], $param['pt_id'], $param['uploaduniquenumber'], $param['mode_query'], $param['journal_ids']);
        // echo json_encode($resultdata);die;

        $return = array(
            "data" => $resultdata[0],
            "journal_id" => $resultdata[1],
        );

        // echo json_encode($return);die;
        return $return;
    }
    
}

?>