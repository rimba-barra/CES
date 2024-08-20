<?php

class Erems_Models_Aktappjb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_aktappjb';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function aktappjbRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP3('sp_aktappjb_read',
					$param['aktappjb_id'],
					$param['purchaseletter_id'],
					$param['cluster_id'],
					$param['block_id'],
					$param['unit_id'],
					$param['unit_number'],
					$param['aktappjb_startdate'],
					$param['aktappjb_enddate'],
					$param['handover_startdate'],
					$param['handover_enddate'],
					$param['sign_startdate'],
					$param['sign_enddate'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page']
				);

				$return['total']   = $resultdata[0][0]['RECORD_TOTAL'];
				$return['data']    = $resultdata[1];
				$return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function aktappjbCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

				$serahterimaplan_date = '';
				$serahterimaplan_month = 0;

				if($param['radio_st_group'] == 'radio_tgl_st'){
					$serahterimaplan_date = $param['serahterimaplan_date'];
				}else if($param['radio_st_group'] == 'radio_bln_st'){
					$serahterimaplan_month = $param['serahterimaplan_month'];
				}

                $affectedRow = $this->execSP('sp_aktappjb_create',
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['unit_id'],
					$param['notaris_id'],
					$param['purchaseletter_id'],
					$param['aktappjb_no'],
					$param['customer_ktp'],
					$param['customer_npwp'],
					$param['aktappjb_name'],
					$param['aktappjb_address'],
					$param['aktappjb_date'],
					$param['firstinstallment_date'],
					$param['pelunasan_date'],
					$param['duration'],
					$param['sign_date'],
					$param['handover_date'],
					$serahterimaplan_date,
					$serahterimaplan_month,
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

    function aktappjbUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $serahterimaplan_date = '';
				$serahterimaplan_month = 0;

				if($param['radio_st_group'] == 'radio_tgl_st'){
					$serahterimaplan_date = $param['serahterimaplan_date'];
				}else if($param['radio_st_group'] == 'radio_bln_st'){
					$serahterimaplan_month = $param['serahterimaplan_month'];
				}

                $affectedRow = $this->execSP('sp_aktappjb_update',
					$param['aktappjb_id'],
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['unit_id'],
					$param['notaris_id'],
					$param['purchaseletter_id'],
					$param['aktappjb_no'],
					$param['customer_ktp'],
					$param['customer_npwp'],
					$param['aktappjb_name'],
					$param['aktappjb_address'],
					$param['aktappjb_date'],
					$param['firstinstallment_date'],
					$param['pelunasan_date'],
					$param['duration'],
					$param['sign_date'],
					$param['handover_date'],
					$serahterimaplan_date,
					$serahterimaplan_month,
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

    function aktappjbDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'aktappjb_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_aktappjb_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {

            }
        }
        return $return;
    }

}

?>
