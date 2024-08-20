<?php
            

class Erems_Models_Changeprice extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'th_changeprice';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function changepriceRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_changeprice_count');
				$resultdata = $this->execSP('sp_changeprice_read',$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            //var_dump($e->getMessage());
                        }
		}
		return $return;
	}
        
        function changepricedetailRead($param){
            $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = 1;
				$resultdata = $this->execSP('sp_changepricedetail_read',$param['changeprice_id']);
				
				$return['total'] = $resultcount;
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                           // var_dump($e->getMessage());
                        }
		}
		return $return;
        }
	
	function changepriceCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_changeprice_create',
                                        $this->session->getUserId(),
                                        $param['purchaseletter_id'],
                                        2,
                                        $param['type_id_new'],
$param['landsize_new'],
                                        $param['buildingsize_new'],
$param['kelebihan_new'],
                                        $param['bank_id_new'],
                                        $param['changeprice_date'],
                                        $param['inhouse_term'],
                                        $param['corporate_new'],
$param['pricetype_id_new'],
$param['tanahpermeter_new'],
$param['kelebihantanah_new'],
$param['harga_tanah_new'],
$param['harga_kelebihantanah_new'],
$param['harga_bangunan_new'],
$param['harga_jualdasar_new'],
$param['persen_dischargedasar_new'],
$param['harga_dischargedasar_new'],
$param['persen_dischargetanah_new'],
$param['harga_dischargetanah_new'],
$param['persen_dischargebangunan_new'],
$param['harga_dischargebangunan_new'],
$param['harga_neto_new'],
$param['persen_ppntanah_new'],
$param['harga_ppntanah_new'],
$param['persen_ppnbangunan_new'],
$param['harga_ppnbangunan_new'],
$param['harga_bbnsertifikat_new'],
$param['harga_bphtb_new'],
$param['harga_bajb_new'],
$param['harga_jual_new'],
$param['persen_salesdisc_new'],
$param['harga_salesdisc_new'],
                                        $param['harga_administrasi_new'],
$param['harga_admsubsidi_new'],
$param['harga_pmutu_new'],
                                        $param['harga_paket_tambahan_new'],
                                        $param['harga_total_jual_new'],
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
                                        $param['detail']['description']
                                        );
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) {
                            var_dump($e);
                            
                        }
		}
		return $return;
	}
	
	function changepriceUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$affectedRow = $this->execSP('sp_changeprice_update', $param['changeprice_id'], $param['changeprice_id'],$param['purchaseletter_id'],$param['changeprice_date'], $this->session->getUserId());
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function changepriceDelete($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'changeprice_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_changeprice_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
}

?>