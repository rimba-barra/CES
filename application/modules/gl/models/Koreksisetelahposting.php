<?php

class Gl_Models_Koreksisetelahposting extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_jurnal';
    protected $_accountjournal = 'td_jurnaldetail';
    protected $_subaccountjournal = 'td_jurnalsubdetail';
    protected $_summary = 'th_summary';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->counterdoc = Zend_Controller_Action_HelperBroker::getExistingHelper('Documentno'); 
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
    }

    function defaultjournalRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(), 
            1,//is post
            $param['start'],
            $param['limit']
        );      
        $result = $this->execSP3('sp_journal_readall', $data);
        return $result;
    }

    function searcjournalRead($param) {
        if ($param['hideparam'] == 'customereset') {
            $posting = 0;
        } else {
            $posting = $param['is_posting'];
        }

        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['voucher_no'],
            $param['fromdate'],
            $param['untildate'],
            $posting,
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_journal_search', $data);
        return $result;
    }
    
    

    function dataRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'default':
                        $result = $this->defaultjournalRead($param);
                        $arraydata = $result[1];
                        break;  
                     case 'customesearch':
                        $result = $this->_model->customesearchjournal($param);
                        $arraydata = $result[1];
                        break;  
                    case 'livesearch':                         
                        $result = $this->searcjournalRead($param);
                        $arraydata = $result[1];
                        break;
                }               
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function journalReadAccountKoreksisetelahpostingRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    1,
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['start'],
                    $param['limit']
                );
                $result = $this->execSP3('sp_journaldetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        
        return $return;
    }

    function journalReadSubAccountKoreksisetelahpostingRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    1,
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['start'],
                    $param['limit']
                );
                $result = $this->execSP3('sp_journalsubdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }

    function journalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'checkexist') {
                    $result = $this->checkExist($param);
                } else if ($parameter == 'generatevoucher') {
                    $result = $this->generateVoucher($param);
                } else if ($parameter == 'autovalaccountjournal') {
                    $result = $this->autoValAccountKoreksisetelahposting($param);
                } else {
                    $result = $this->createData($param);
                }


                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }

    function getVoucherid($voucher) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $voucher
        );

        $result = $this->execSP3("sp_journal_getvoucher", $data);
        $journalid = $result[0][0]['journal_id'];
        return $journalid;
    }

    function getCoaid($coa) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        );

        $result = $this->execSP3("sp_coa_getbycoa", $data);
        $coa_id = $result[0][0]['coa_id'];
        return $coa_id;
    }
    
    function getKoreksisetelahpostingDetailid($param){        
        $data = array(
             $this->session->getCurrentProjectId(),
             $this->session->getCurrentPtId(),
             $param['journal_id'],       
             $param['kelsub_id'],       
             $param['coa_id'],       
             $param['kelsub'],       
             $param['coa'],       
             $param['type'],       
             $param['keterangan'],       
             $param['amount']       
        );
        $result = $this->execSP3("sp_journaldetail_getafterinsert", $data);
        if(!empty($result[0][0])){
            $hasil = $result[0][0];
        }else{
            $hasil ='';
        }
        
        return $hasil;
    }
    function accountjournalCreate($param) {
        if ($param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $journal_id = $this->getVoucherid($param['voucherno']),
                $param['sort'],
                $param['kelsub_id'],
                $coa_id = $this->getCoaid($param['coa']),
                $param['kelsub'],
                $param['coa'],
                $param['type'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journaldetail_create", $data);
        } else {
            $result = null;
        }

        return $result;
    }

    function accountjournalUpdate($param){
        if($param['state'] =='loaddata' and $param['deleted']==false){     
             $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['sort'],
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['kelsub_id'],
                    $param['coa_id'],
                    $param['coa'],
                    $param['kelsub'],
                    $param['type'],
                    $param['keterangan'],
                    $param['amount'],
                    $this->session->getUserId(),
                    '1'
                );
             $result = $this->execSP3("sp_journaldetail_update", $data);
        }else if($param['state'] =='loaddata' && $param['deleted']==true){
             $result = $this->accountjournalDelete($param);
        }else if($param['state'] !=='loaddata' && $param['deleted']==false){
            $result = $this->accountjournalCreate($param);
        }
        
        return $result;        
    }
    function accountjournalDelete($param){
        $data= array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journaldetail_id'],
                    $param['deleted'],
                    $this->session->getUserId(),
        );
        
       $result = $this->execSP3("sp_journaldetail_delete", $data);
       return $result;
    }
    
    function journalaccountjournalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                
                $param['keterangan'] = str_replace("'"," ",$param['keterangan']); //cleaning
                
                switch ($parameter){
                    case "default";
                        $result = $this->accountjournalCreate($param);
                    break;
                    case "update";
                        $result = $this->accountjournalUpdate($param);
                    break;
                }
                             
                $datadetail = array(
                    "journal_id"=>$this->getVoucherid($param['voucherno']),
                    "kelsub_id"=>$param['kelsub_id'],
                    "coa_id"=>$this->getCoaid($param['coa']),
                    "kelsub"=>$param['kelsub'],
                    "coa"=>$param['coa'],
                    "type"=>$param['type'],
                    "keterangan"=>$param['keterangan'],
                    "amount"=>$param['amount']
                );
                
                $hasil = $this->getKoreksisetelahpostingDetailid($datadetail);

                $return['total'] = $result[0];
                $return['success'] = true;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                $return['hasil'] = $hasil;
                
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                    $return['hasil'] = $hasil;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        return $return;
    }
    
    function subaccountCreate($param) {
        if ($param['deleted'] == false) {
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['journal_id'],
                $param['journaldetail_id'],
                $param['subgl_id'],
                $param['kelsub_id'],
                $param['code'],
                $param['code1'],
                $param['code2'],
                $param['code3'],
                $param['code4'],
                $param['keterangan'],
                $param['amount'],
                $this->session->getUserId(),
                '1'
            );
            $result = $this->execSP3("sp_journalsubdetail_create", $data);
        } else {
            $result = null;
        }
        return $result;
    }
    
    function subaccountUpdate($param){
        if($param['state']=='loaddata' && $param['deleted']==false){
            $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['journalsubdetail_id'],
                    $param['subgl_id'],
                    $param['kelsub_id'],
                    $param['code'],
                    $param['code1'],
                    $param['code2'],
                    $param['code3'],
                    $param['code4'],
                    $param['keterangan'],
                    $param['amount'],
                    $this->session->getUserId(),
                    '1'
            );
           $result = $this->execSP3("sp_journalsubdetail_update", $data);
        }else if($param['state']=='loaddata' && $param['deleted']==true){
            $result = $this->subaccountDelete($param);
        }else if($param['state'] !=='loaddata' && $param['deleted']==false){
           $result = $this->subaccountCreate($param);
        }
        
        return $result;
        
    }
    
    function subaccountDelete($param){
        $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journalsubdetail_id'],
                    $param['deleted'],
                    $this->session->getUserId(),
        );
       $result = $this->execSP3("sp_journalsubdetail_delete", $data);
       return $result;
    }

    function journalsubaccountjournalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                
                switch ($parameter) {
                        case 'default':
                            $result = $this->subaccountCreate($param);
                        break;                   
                        case 'update':
                            $result = $this->subaccountUpdate($param);
                        break;                    
                }
                
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['data'] = $result;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['data'] = $result;
                }
            } catch (Exception $ex) {
                var_dump($ex);
            }
        }
        
        return $return;
    }

    function checkExist($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['voucher_no']
        );
        return $this->execSP3("sp_journal_checkexist", $data);
    }

    function createData($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['no_generate'],
            date('Y-m-d', strtotime($param['voucher_date'])),
            $param['prefix_id'],
            $param['debit_total'],
            $param['credit_total'],
            $param['selisih'],
            $this->session->getUserId(),
            '1'
        );

        return $this->execSP3("sp_journal_create", $data);
        //var_dump($this->sqlStr);
    }

    function generateVoucher($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['prefix_id'],
        );
        $result = $this->execSP3("sp_journal_generate_voucher", $data);

        $counter = $result[0][0]['counterprefix'] + 1;
        $prefix_id = $result[1][0]['prefix_id'];
        $prefix = $result[1][0]['prefix'];
        $description = $result[1][0]['description'];
        $temp = "0000" . $counter;
        $nomor_urut = $prefix . substr($temp, -4) . '/' . date('m');
        $_docNo = $this->docNumber($prefix_id,$param['flagdocument']);  //nomor docoment for preview                   
        return $_docNo. "#" . $description . "#" . date('m');
    }
    
    function docNumber($prefix_id,$flag){
         $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $prefix_id,
        );
        $result = $this->execSP3("sp_journal_generate_voucher", $data);
        $prefix = $result[1][0]['prefix'];
        
        $_docdate     = new DateTime(date('Y-m-d'));
        $_project_id  = $this->session->getCurrentProjectId();
        $_pt_id       = $this->session->getCurrentPtId();
        $_apps_id     = $this->session->getCurrentModuleId();
        $_module      = "JOURNAL";  
        
        $_var1 = array();
        $_var1['PREFIX'] = $prefix;
        
        $_var2 = array();  
       
        $_docNo   = $this->counterdoc->get_advanceNo($_project_id, $_pt_id, $_apps_id, $_module, $_var1,$_var2, $_docdate, $flag);
        return $_docNo;
    }

    function autoValAccountKoreksisetelahposting($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coa_id'],
        );

        $result = $this->execSP3("sp_journal_getval_coa", $data);

        $counter = $result[0][0]['counterkelsub'];
        $coa_id = $result[1][0]['coa_id'];
        $kelsub_id = $result[1][0]['kelsub_id'];
        $kelsub = $result[1][0]['kelsub_acc'];
        $type = $result[1][0]['type'];
        $coaname = $result[1][0]['name'];

        return $counter . "|" . $coa_id . "|" . $kelsub_id . "|" . $kelsub . "|" . $coaname . "|" . $type;
    }

    function journalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['no_generate'],
                    date('Y-m-d', strtotime($param['voucher_date'])),
                    $param['prefix_id'],
                    $param['debit_total'],
                    $param['credit_total'],
                    $param['selisih'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalaccountjournalUpdate($param = array()) {

        $param['keterangan'] = str_replace("'","''",$param['keterangan']); //cleaning
        
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journal_id'],
                    $param['journaldetail_id'],
                    $param['coa_id'],
                    $param['coa'],
                    $param['type'],
                    $param['keterangan'],
                    $param['amount'],
                    $param['kelsub_id'],
                    $param['kelsub'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journalaccountjournal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalsubaccountjournalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['journaldetail_id'],
                    $param['journalsubdetail_id'],
                    $param['subgl_id'],
                    $param['kelsub_id'],
                    $param['code'],
                    $param['code1'],
                    $param['code2'],
                    $param['code3'],
                    $param['code4'],
                    $param['amount'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_journalsubaccountjournal_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journal_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            
            try {
                $paramdata = array(         
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param[$key_name]
                );
                
                $rcheck = $this->execSP3('sp_journal_getbyid',$paramdata);
                $statusposting = $rcheck[0][0]['is_post'];
                
                if ($statusposting == 0) {     
                    $data = array(         
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param[$key_name],
                        1,
                       $this->session->getUserId()
                    );
                                     
                    $result = $this->execSP3('sp_journal_delete', $data);
                    $status = "not used";
                    $msg = "";
                } else {
                    $result = NUll;
                    $status = "used";
                    $msg = "Sorry the data cannot deleted, because data has been posting";
                }
                
                $return['status'] = $status;
                $return['msg'] = $msg;
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalaccountjournalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journaldetail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_journalaccountjournal_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function journalsubaccountjournalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'journalsubdetail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_journalsubaccountjournal_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}

?>