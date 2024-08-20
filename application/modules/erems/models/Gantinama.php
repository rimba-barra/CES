<?php

class Erems_Models_Gantinama extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_changename';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function gantinamaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_gantinama_count');
                $resultdata = $this->execSP('sp_gantinama_read', $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                //var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function gantinamadetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
               // $resultcount = 1;
                $resultdata = $this->execSP('sp_gantinamadetail_read', $param['changename_id']);

                $return['total'] = 1;
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
              //  var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function gantinamaCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_gantinama_create', $param['purchaseletter_id'], $param['reasonchgname_id'], 1, $this->session->getUserId(), $param['customer01_id'], $param['changename_date'], $param['customer_new_name'], $param['customer_new_address'], $param['customer_new_city_id'], $param['customer_new_zipcode'], $param['customer_new_home_phone'], $param['customer_new_mobile_phone'], $param['customer_new_office_phone'], $param['customer_new_fax'], $param['customer_new_KTP_number'], $param['customer_new_NPWP'], $param['customer_new_email'], $param['admistration_fee'], $param['changename_note']
                );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function gantinamaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_gantinama_update', $param['changename_id'], $param['changename_id'], $param['purchaseletter_id'], $param['reasonchgname_id'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function gantinamaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'changename_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_gantinama_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>