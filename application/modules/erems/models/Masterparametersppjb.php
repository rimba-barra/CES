<?php

class Erems_Models_Masterparametersppjb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_parametersppjb';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterparametersppjbRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_parametersppjb_count', $param['parametersppjb_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code']);
                $resultdata = $this->execSP('sp_parametersppjb_read', $param['parametersppjb_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['start'], $param['limit']);

                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterparametersppjbCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_parametersppjb_create', 
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(), 
					$param['code'], 
					$param['name_01'], 
					$param['position_01'], 
					$param['address_01'], 
					$param['name_02'], 
					$param['position_02'],
					$param['address_02'],
					$param['akta_no'], 
					$param['akta_date'], 
					$param['notaris'],
					$param['akta_no_2'], 
					$param['akta_date_2'], 
					$param['notaris_2'],
					$param['account_no'],
					$param['account_name'], 
					$param['account_address'], 
					
					$param['pt_name'], 
					$param['pt_kota'],
					$param['notariskota'],
					$param['notaris2kota'], 
					$param['pt_namapartner'],
					$param['pt_kotapartner'], 
					$param['pt_aktano'],
					$param['pt_aktadate'],
					$param['pt_notaris'], 
					$param['pt_notariskota'],
					
					$param['pt2_aktano'],
					$param['pt2_aktadate'],
                    $param['pt_kecamatan'],

                    // added by rico 22022024
                    $param['phone'],
                    $param['email'],
                    $param['kelurahan'],
                    $param['no_perjanjian_kso'],
                    $param['tgl_perjanjian_kso'],
                    $param['notaris_perjanjian_kso'],
                    $param['kotanotaris_perjanjian_kso'],
					
					$this->session->getUserId(),
					'1',

                    $param['kso_name'],
                    $param['objek_jualbeli_address'],
                    $param['objek_jualbeli_kelurahan']
				);
                $return['success'] = $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterparametersppjbUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_parametersppjb_update', 
					$param['parametersppjb_id'], 
					$param['code'], 
					$param['name_01'], 
					$param['position_01'], 
					$param['address_01'], 
					$param['name_02'], 
					$param['position_02'],
					$param['address_02'],
					$param['akta_no'], 
					$param['akta_date'], 
					$param['notaris'],
					$param['akta_no_2'], 
					$param['akta_date_2'], 
					$param['notaris_2'],
					$param['account_no'],
					$param['account_name'], 
					$param['account_address'], 
					
					$param['pt_name'], 
					$param['pt_kota'],
					$param['notariskota'],
					$param['notaris2kota'], 
					$param['pt_namapartner'],
					$param['pt_kotapartner'], 
					$param['pt_aktano'],
					$param['pt_aktadate'],
					$param['pt_notaris'], 
					$param['pt_notariskota'],
					
					$param['pt2_aktano'],
					$param['pt2_aktadate'],
                    $param['pt_kecamatan'],

                    // added by rico 22022024
                    $param['phone'],
                    $param['email'],
                    $param['kelurahan'],
                    $param['no_perjanjian_kso'],
                    $param['tgl_perjanjian_kso'],
                    $param['notaris_perjanjian_kso'],
                    $param['kotanotaris_perjanjian_kso'],
					
					$this->session->getUserId(),
					'1',

                    $param['kso_name'],
                    $param['objek_jualbeli_address'],
                    $param['objek_jualbeli_kelurahan']
				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterparametersppjbDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'parametersppjb_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_parametersppjb_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>
