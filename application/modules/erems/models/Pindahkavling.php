<?php
            

class Erems_Models_Pindahkavling extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'th_changekavling';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function pindahkavlingRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_pindahkavling_count',$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
				$resultdata = $this->execSP('sp_pindahkavling_read',$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['page'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
          
                        }
		}
		return $return;
	}
        
       // 
	function pindahkavlingdetailRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
			
				$resultdata = $this->execSP('sp_pindahkavlingdetail_read',$param['pindahkavling_id']);
				
				$return['total'] = 1;
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                    
                        }
		}
		return $return;
	}
        
	function pindahkavlingCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_pindahkavling_create',
                                        $this->session->getUserId(),
                                        $this->session->getCurrentProjectId(), 
                                        $this->session->getCurrentPtId(),
                                        $param['purchaseletter01_id'],
                                        $param['marketingstock_id'],
                                        $param['purchaseletter_no'],
                                        $param['purchase_date'],
                                        '!3',
                                        $param['remaining_balance'],
                                        $param['total_payment'],
                                        $param['total_interst'],
                                        $param['harga_bangunan'],
                                        $param['persen_dischargebangunan'],
                                        $param['harga_dischargebangunan'],
                                        $param['persen_ppnbangunan'],
                                        $param['harga_ppnbangunan'],
                                        $param['harga_administrasi'],
                                        $param['harga_paket_tambahan'],
                                        $param['persen_salesdisc'],
                                        $param['harga_salesdisc'],
                                        $param['harga_jualdasar'],
                                        $param['persen_dischargedasar'],
                                        $param['harga_dischargedasar'],
                                        $param['harga_neto'],
                                        $param['harga_bphtb'],
                                        $param['harga_bajb'],
                                        $param['harga_jual'],
                                        $param['harga_admsubsidi'],
                                        $param['harga_pmutu'],
                                        $param['harga_total_jual'],
                                        $param['detail']['schedule_id'],
                                        $param['detail']['scheduletype_id'],
                                        $param['detail']['duedate'],
                                        $param['detail']['amount'],
                                        $param['detail']['sourcemoney_id'],
                                        $param['detail']['remaining_balance'],
                                        $param['detail']['intersetflag'],
                                        $param['detail']['interset'],
                                        $param['detail']['remaining_interest'],
                                        $param['detail']['recomendationdate'],
                                        $param['detail']['termin'],
                                        $param['detail']['description'],
                                        $param['movereason_id'],
                                        $param['notes']
                                        );
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { 
                              var_dump($e);
                        }
		}
		return $return;
	}
	
	function pindahkavlingUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_changekavling_update', $param['changekavling_id'], $param['changekavling_id'],$param['purchaseletter_id'],$param['changekavling_date'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function pindahkavlingDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'changekavling_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_changekavling_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>