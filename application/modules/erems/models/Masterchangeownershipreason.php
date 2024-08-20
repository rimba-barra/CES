<?php

class Erems_Models_Masterchangeownershipreason extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_changeownershipreason';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterchangeownershipreasonRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_changeownershipreason_count', $param['changeownershipreason_id'], $param['code']);
                $resultdata = $this->execSP('sp_changeownershipreason_read', $param['changeownershipreason_id'], $param['code'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    /*function masterchangeownershipreasonCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_changeownershipreason_create', 
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(), 
					$param['code'], 
					$param['nopinduk'], 
					$param['kecamatan_id'], 
					$this->session->getUserId(),
					'1'
				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterchangeownershipreasonUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_changeownershipreason_update', 
					$param['changeownershipreason_id'], 
					$param['code'], 
					$param['nopinduk'], 
					$param['kecamatan_id'], 
					$this->session->getUserId(),
					'1'
				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterchangeownershipreasonDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'changeownershipreason_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_changeownershipreason_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }*/

}

?>
