<?php

class Erems_Models_Masterpbbinduk extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_pbbinduk';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterpbbindukRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_pbbinduk_count', $param['pbbinduk_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code']);
                $resultdata = $this->execSP('sp_pbbinduk_read', $param['pbbinduk_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterpbbindukCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_pbbinduk_create', 
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

    function masterpbbindukUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_pbbinduk_update', 
					$param['pbbinduk_id'], 
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

    function masterpbbindukDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'pbbinduk_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_pbbinduk_destroy', $param[$key_name], $this->session->getUserId());
                
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
