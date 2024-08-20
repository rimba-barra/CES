<?php

class Erems_Models_Masterpromotionmedia extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_mediapromotion';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterpromotionmediaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_mediapromotion_count', $param['code'], $param['mediapromotion'], $param['description']);
                $resultdata = $this->execSP('sp_mediapromotion_read', $param['code'], $param['mediapromotion'], $param['description'], $param['start'], $param['limit'], $param['page']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterpromotionmediaCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_mediapromotion_create', 
                    $param['code'], 
                    $param['mediapromotion'], 
                    $param['description'], 
                    $param['mediapromotion_kategori_id'], 
                    $this->session->getUserId()
                );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterpromotionmediaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_mediapromotion_update', 
                    $param['mediapromotion_id'], 
                    $param['code'], 
                    $param['mediapromotion'], 
                    $param['description'], 
                    $param['mediapromotion_kategori_id'], 
                    $this->session->getUserId()
                );
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterpromotionmediaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'mediapromotion_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_mediapromotion_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
