<?php

class Gl_Models_Asset extends Zend_Db_Table_Abstract {

    protected $_schema = 'gl';
    protected $_name = 'm_assetdata';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function assetRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(                    
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['asset_id'],
                    $param['asset_account'],
                    $param['asset_name'],
                    $param['asset_note'],
                    $param['start'],
                    $param['limit']
                );
                $result = $this->execSP3('sp_asset_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function assetCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['asset_account'],
                    $param['asset_name'],
                    $param['asset_note'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_asset_create', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
             
    function assetUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(                  
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['asset_id'],
                    $param['asset_account'],
                    $param['asset_name'],
                    $param['asset_note'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_asset_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function assetDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'asset_id';
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
                $result = $this->execSP3('sp_asset_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>