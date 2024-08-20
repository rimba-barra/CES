<?php

class Erems_Models_Purchaseletterpbb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function purchaseletterpbbRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'],
					$param['customer_name'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_purchaseletterpbb_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function purchaseletterpbbdetailRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					0,
					0
				);
				$result = $this->execSP3('sp_plpbb_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;					
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function purchaseletterpbbdetailCreate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					$param['unit_id'], 
					$param['nop_dibayar'], 
					$param['tahun'], 
					$param['pokok'], 
					$param['denda'], 
					$param['total'], 
					$param['tahun_bayar'], 
					$param['keterangan'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_plpbb_create', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;
			} catch(Exception $e) { }			
		}
		return $return;
    }

    function purchaseletterpbbdetailUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_pbb_id'], 
					$param['nop_dibayar'], 
					$param['tahun'], 
					$param['pokok'], 
					$param['denda'], 
					$param['total'], 
					$param['tahun_bayar'], 
					$param['keterangan'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_plpbb_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function purchaseletterpbbdetailDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'purchaseletter_pbb_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plpbb_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
}

?>