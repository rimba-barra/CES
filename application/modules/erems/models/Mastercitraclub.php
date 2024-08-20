<?php

class Erems_Models_Mastercitraclub extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_citraclub';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function mastercitraclubRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_citraclub_count', $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['code'], $param['clubname'], $param['description']);
                $resultdata = $this->execSP('sp_citraclub_read' , $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['code'], $param['clubname'], $param['description'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function mastercitraclubCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_citraclub_create',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['clubname'], $param['description'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function mastercitraclubUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_citraclub_update', $param['citraclub_id'], $param['code'], $param['clubname'], $param['description'], $this->session->getUserId());
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function mastercitraclubDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'citraclub_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_citraclub_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
               
            }
        }
        return $return;
    }

}

?>
