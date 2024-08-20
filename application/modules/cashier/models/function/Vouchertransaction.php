<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Function_Vouchertransaction extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $session;

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_General_Generaldata();
        $this->setting = new Cashier_Models_General_Setdata;
        //end setup
        //start paramter
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        //end parameter  
                    
    }

    public function istext($text) {
        return "''" . $text . "''";
    }

    function totalAmount($param) {
        $resultdetail = $this->setting->getdata_bytableparam_v2($this->setting->_td_voucherdetail, array("voucher_id" => $param['voucher_id']));
        $total = 0;
        if (!empty($resultdetail[0])) {
            $sum_in = $sum_out = 0;
            foreach ($resultdetail[0] as $row) {
                $dataflow = $row['dataflow'];
                if ($dataflow == 'I') {
                    $sum_in += $row['amount'];
                } else if ($dataflow == 'O') {
                    $sum_out += $row['amount'];
                }
            }
            if ($param['dataflow'] == 'I') {
                $total = floatval($sum_out) - floatval($sum_in);
            } else {
                $total = floatval($sum_in) - floatval($sum_out);
            }
        }

        $this->setting->_storeprocedure = 'sp_report_transaction_voucher';
        $this->setting->_paramsql = 'terbilang';
        $this->setting->_param = array('amount'=>abs($total));
        $result = $this->setting->executeSP();  
	//print_r($this->setting->_lastquery);
   
        $return = array("terbilang"=>$result[0][0]['terbilang'],"total_amount"=>abs($total));
        return $return;
    }

    
     function totalAmount_old($param){
        $this->setting->_storeprocedure = 'sp_report_transaction_voucher';
        $this->setting->_paramsql = 'totalamount';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        return $result[0][0];
    }
    
    function getdataheader($param){
        $this->setting->_storeprocedure = 'sp_data_th_cashbank';
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_param = array(
            "hideparam" => $param['hideparam'],
            "kasbank_id" => $param['kasbank_id'],
        );
        $result = $this->setting->executeSP();
        return $result[0][0];        
    }
    
    function getdatadetail($param){
        $this->setting->_storeprocedure = 'sp_report_transaction_cashbank';
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $param['kasbank_id'];
        $this->setting->_param = array(
            "hideparam" => $param['hideparam'],
            "kasbank_id" => $param['kasbank_id'],
        );
        $result = $this->setting->executeSP();
        return $result[0][0];        
    }

   

}
