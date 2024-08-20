<?php

class Erems_Models_Installmentpayment extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_payment';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function installmentpaymentRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_installmentpayment_count',$param['paymentflag']);
                $spName = '';
                switch (intval($param['paymentflag'])){
                    case 2:$spName = 'sp_otherspayment_read';break;
                    case 3:$spName = 'sp_nonlinkpayment_read';break;
                    default:$spName='sp_installmentpayment_read';break;
                }
                $resultdata = $this->execSP($spName, $param['start'], $param['limit']);
           
               
                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
               // var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function installmentpaymentdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
              
                $resultdata = $this->execSP('sp_installmentpaymentdetail_read', $param['payment_id']);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
               // var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function installmentpaymentdetailtableRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
              
                $resultdata = $this->execSP('sp_installmentpaymentdetailtable_read', $param['payment_id']);
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
               // var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    //

    function installmentpaymentCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                
                
                
                
                
                $affectedRow = $this->execSP('sp_installmentpayment_create', 
                        $this->session->getUserId(), 
                        $param['purchaseletter_id'], 
                        $param['paymentflag_id'], 
                        $param['paymentmethod_id'], 
                        $param['payment_date'], 
                        $param['payment'], 
                        $param['total_payment'], 
                        $param['detail']['detail_id'], 
                        $param['detail']['remaining_balance'],
                        $param['detail']['paymenttype_id'],
                        $param['detail']['payment'],
                        $param['detail']['amount'],
                        $param['detail']['description'],
                        $param['cdn_val'], 
                        $param['cdn_amount'], 
                        $param['admin_fee'], 
                        $param['denda'], 
                        $param['note'], 
                        $param['due_date'], 
                        $param['cair_date'], 
                        $param['reference'],
                        $param['is_reference_rejected'],
                        $param['name'],
                        $param['address'],
                        $param['telp_home'],
                        $param['telp_office'],
                        $param['mobile_phone'],
                        $param['city_id']
                );
           
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e);
                
            }
        }
        return $return;
    }

    function installmentpaymentUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP3('sp_installmentpayment_update', $param['payment_id'], $param['payment_id'], $param['payment_no'], $this->session->getUserId());
                $return['success'] = $affectedRow;
                //var_dump($affectedRow);
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function installmentpaymentDelete($param = '') {
        $return['success'] = false;
        if (strlen($param) > 0) {
          
    
            try {
                $affectedRow = $this->execSP('sp_installmentpayment_destroy',$param, $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>