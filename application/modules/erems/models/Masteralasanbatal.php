<?php

class Erems_Models_Masteralasanbatal extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_cancelreason';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masteralasanbatalRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_cancelreason_count', $param['code'], $param['cancelreason'], $param['description']);
                $resultdata = $this->execSP('sp_cancelreason_read', $param['code'], $param['cancelreason'], $param['description'], $param['start'], $param['limit'], $param['page']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masteralasanbatalCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_cancelreason_create', $param['code'], $param['cancelreason'], $param['description'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masteralasanbatalUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_cancelreason_update', $param['cancelreason_id'], $param['code'], $param['cancelreason'], $param['description'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masteralasanbatalDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'cancelreason_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_cancelreason_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
