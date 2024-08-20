<?php

class Cashier_Models_Prosesposting extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function getvoucherbyrangedateRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_getvoucherbyrangedate_count',  
									$param['projectpt_id'],
									$param['fromdate'], 
									$param['untildate']
								);
                $resultdata = $this->execSP('sp_getvoucherbyrangedate_read',  
									$param['projectpt_id'],
									$param['fromdate'], 
									$param['untildate']
								);
                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
                //var_dump($resultcount);
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    function prosesPostingJournal($param){

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP2('sp_summaryfullbyprojectpt_update',  
									$param['projectpt_id'],
									$param['fromdate'], 
									$param['untildate'],
									$this->session->getUserId()
								);
                $return['success'] = $resultdata;
//                var_dump($resultdata);
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function prosesPostingJournal2($param){

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP2('sp_summaryfullbyprojectpt2_update',  
                                    $param['project_id'],
                                    $param['pt_id'],
                                    $param['fromdate'], 
                                    $param['untildate'],
                                    $this->session->getUserId()
                                );
                $return['success'] = $resultdata;
//                var_dump($resultdata);
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    public function checksubdetail($params) {
        $hasil = array();
        $hasil = $this->execSP('sp_isexist_subdetail_voucher',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function checkcoatampungan($params) {
        $hasil = array();
        $hasil = $this->execSP('sp_isexist_coatampungan_voucher',
                $params['kasbank_id']
                );
        return $hasil;
    }
}

?>