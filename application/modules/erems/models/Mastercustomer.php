<?php

class Erems_Models_Mastercustomer extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_customer';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function mastercustomerRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_customer_count', $param['code'], $param['name']);
                $resultdata = $this->execSP('sp_customer_read', $param['code'], $param['name'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
          
            }
        }
        return $return;
    }
    
    function mastercustomerdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                
                $resultdata = $this->execSP('sp_customerdetail_read', $param['customer_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
      
            }
        }
        return $return;
    }

    function mastercustomerCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_customer_create',$this->session->getUserId(),$param['code'],$param['name'],$param['address'],$param['city_id'],$param['zipcode'],$param['home_phone'],$param['office_phone'],$param['mobile_phone'],$param['fax'],$param['KTP_number'],$param['KTP_name'],$param['KTP_address'],$param['NPWP'],$param['birthplace'],$param['birthdate'],$param['marital_status'],$param['children'],$param['nationality'],$param['religion_id'],$param['purpose_id'],$param['education_id'],$param['email'],$param['company_name'],$param['company_address'],$param['company_phone'],$param['company_phoneext'],$param['company_city_id'],$param['company_zipcode'],$param['company_fax'],$param['company_position'],$param['emergency_name'],$param['emergency_address'],$param['emergency_phone'],$param['emergency_mobilephone'],$param['emergency_status'],$param['userid'],$param['password'],$param['photo'],$param['description']);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function mastercustomerUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_customer_update', $param['customer_id'],$this->session->getUserId(),$param['code'],$param['name'],$param['address'],$param['city_id'],$param['zipcode'],$param['home_phone'],$param['office_phone'],$param['mobile_phone'],$param['fax'],$param['KTP_number'],$param['KTP_name'],$param['KTP_address'],$param['NPWP'],$param['birthplace'],$param['birthdate'],$param['marital_status'],$param['children'],$param['nationality'],$param['religion_id'],$param['purpose_id'],$param['education_id'],$param['email'],$param['company_name'],$param['company_address'],$param['company_phone'],$param['company_phoneext'],$param['company_city_id'],$param['company_zipcode'],$param['company_fax'],$param['company_position'],$param['emergency_name'],$param['emergency_address'],$param['emergency_phone'],$param['emergency_mobilephone'],$param['emergency_status'],$param['userid'],$param['password'],$param['photo'],$param['description']);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function mastercustomerDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'customer_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_customer_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
