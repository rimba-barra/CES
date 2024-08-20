<?php

class Erems_Models_Ajbbphtb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_ajbbphtb';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function ajbbphtbRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $resultcount = $this->execSP('sp_ajbbphtb_count', 
									$param['ajbbphtb_id'], 
									$param['purchaseletter_id'], 
									$param['cluster_id'], 
									$param['block_id'], 
									// $param['kavling_number_start'], 
									// $param['kavling_number_end'],  
									$param['unit_number'],
									$param['customer_id'], 
									$param['ajbbphtb_no'], 
									$param['ajbbphtb_startdate'], 
									$param['ajbbphtb_enddate'],
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId()
								);
						
                $resultdata = $this->execSP('sp_ajbbphtb_read', 
									$param['ajbbphtb_id'], 
									$param['purchaseletter_id'], 
									$param['cluster_id'], 
									$param['block_id'], 
									// $param['kavling_number_start'], 
									// $param['kavling_number_end'], 
									$param['unit_number'],									
									$param['customer_id'], 
									$param['ajbbphtb_no'], 
									$param['ajbbphtb_startdate'], 
									$param['ajbbphtb_enddate'],
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['start'], 
									$param['limit']
								);
                // print($param);
                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
                $return['data'] = $resultdata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function ajbbphtbCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_ajbbphtb_create', 
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['unit_id'], 
									$param['purchaseletter_id'], 
									'',
									$param['ajbbphtb_date'], 
									$param['npop'], 
									$param['npoptkp'], 
									$param['npopkp'], 
									$param['bphtb'], 
									$param['bajb'], 
									$param['nonpajak'], 
									$param['total'], 
									$this->session->getUserId(), 
									'1',
									$param['biaya_tanah_kosong'],
									$param['biaya_selisih_pph'],
									$param['biaya_lain_lain']
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function ajbbphtbUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_ajbbphtb_update', 
									$param['ajbbphtb_id'], 
									$this->session->getCurrentProjectId(), 
									$this->session->getCurrentPtId(),
									$param['unit_id'], 
									$param['purchaseletter_id'], 
									$param['ajbbphtb_no'], 
									$param['ajbbphtb_date'], 
									$param['npop'], 
									$param['npoptkp'], 
									$param['npopkp'], 
									$param['bphtb'], 
									$param['bajb'], 
									$param['nonpajak'], 
									$param['total'], 
									$this->session->getUserId(), 
									'1',
									$param['biaya_tanah_kosong'],
									$param['biaya_selisih_pph'],
									$param['biaya_lain_lain']
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function ajbbphtbDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'ajbbphtb_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_ajbbphtb_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
	
	function ajbbphtbprinoutRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_ajbbphtb_printout_read', 
					$param['ajbbphtb_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);	
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
    }

}

?>