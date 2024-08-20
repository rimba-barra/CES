<?php
            

class Erems_Models_Purchaseletter extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function purchaseletterRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_purchaseletter_count');
				//$resultdata = $this->execSP('sp_purchaseletter_read',$param['start'], $param['limit']); marked by Tommy Toban 8 Nov 2013
				/* added by Tommy Toban 8 Nov 2013*/
                                $resultdata = $this->execSP('sp_purchaseletter_read',$param['start'], $param['limit'],
                                                            $param['cluster_id'],$param['type_id'],$param['pt_id'],$param['productcategory_id'],
                                                            $param['block_id'],$param['purpose_id'],$param['unit_number']);
				/* end added by Tommy Toban 8 Nov 2013*/
                                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                           // var_dump($e->getMessage()); marked by Tommy Toban 8 Nov 2013
                        }
		}
		return $return;
	}
	
	//added by Tirtha Brata September 9th, 2013
	function purchaseletterv2Read($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$resultcount = $this->execSP('sp_purchaseletterv2_count',$param['param_spcreq'],$param['unit_id'],$param['purchaseletter_no'],$param['block_id']);
				$resultdata = $this->execSP('sp_purchaseletterv2_read',$param['param_spcreq'],$param['unit_id'],$param['purchaseletter_no'],$param['block_id'],$param['start'], $param['limit']);
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	//end added by Tirtha Brata September 9th, 2013
        
		
	//
        
        function purchaseletterdetailRead($param,$spName = 'sp_purchaseletterdetail_read')
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				
				$resultdata = $this->execSP($spName,$param['purchaseletter_id']);
				
				$return['total'] = 1;
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
        
        function purchaseletterScheduleRead($param)
	{
               
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				
				$resultdata = $this->execSP('sp_schedule_read',$param['purchaseletter_id']);
				
				$return['total'] = 1;
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	//added by Tirtha Brata September 17th, 2013
	function purchaseletterdetailwithpaymentRead($param)
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				
				$resultdata = $this->execSP('sp_purchaseletterdetailwithpayment_read',$param['purchaseletter_id'],$param['param_scheduletype']);
				
				$return['total'] = 1;
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	//end added by Tirtha Brata September 17th, 2013
	
	function purchaseletterCreate($param=array())
	{	
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
                                
				$affectedRow = $this->execSP('sp_purchaseletter_create',
                                        $this->session->getUserId(),
                                        $param['purchaseletter_no'],
                                        $param['purchase_date'],
                                        $param['unit_id'],
                                        $param['rencana_serahterima_date'],
                                        $param['uangmukatype_id'],
                                        $param['collector_id'],
                                        $param['salesman_id'],
                                        $param['customer_id'],
                                        $param['is_pay'],
                                        $param['clubcitra_member'],
                                        $param['clubcitra_id'],
                                        $param['saleslocation_id'],
                                        $param['mediapromotion_id'],
                                        $param['pricetype_id'],
                                        $param['bankkpr_id'],
                                        $param['rencana_serahterima'],
                                        $param['billingrules_id'],
                                        $param['tandajadi_time'],
                                        $param['tandajadi_value'],
                                        $param['uangmuka_time'],
                                        $param['uangmuka_value'],
                                        $param['sisacicilan_time'],
                                        $param['sisacicilan_value'],
                                        $param['remaining_balance'],
                                        $param['total_payment'],
                                        $param['total_interst'],
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
                                        $param['notes'],
                                        $param['corporate'],
                                        $param['customer_name'],
                                        $param['customer_address'],
                                        $param['customer_city_id'],
                                        $param['customer_zipcode'],
                                        $param['customer_homephone'],
                                        $param['customer_mobilephone'],
                                        $param['customer_officephone'],
                                        $param['customer_fax'],
                                        $param['customer_ktp'],
                                        $param['customer_npwp'],
                                        $param['customer_email'],
                                        $param['tanahpermeter'],
                                        $param['kelebihantanah'],
                                        $param['harga_tanah'],
                                        $param['harga_kelebihantanah'],
                                        $param['harga_bangunan'],
                                        $param['harga_jualdasar'],
                                        $param['persen_dischargadasar'],
                                        $param['harga_dischargadasar'],
                                        $param['persen_dischargatanah'],
                                        $param['harga_dischargatanah'],
                                        $param['persen_dischargabangunan'],
                                        $param['harga_dischargabangunan'],
                                        $param['harga_netto'],
                                        $param['persen_ppntanah'],
                                        $param['harga_ppntanah'],
                                        $param['persen_ppnbangunan'],
                                        $param['harga_ppnbangunan'],
                                        $param['harga_bbnsertifikat'],
                                        $param['harga_bphtb'],
                                        $param['harga_bajb'],
                                        $param['harga_jual'],
                                        $param['persen_salesdisc'],
                                        $param['harga_salesdisc'],
                                        $param['harga_administrasi'],
                                        $param['harga_admsubsidi'],
                                        $param['harga_pmutu'],
                                        $param['harga_paket_tambahan'],
                                        $param['harga_total_jual']
                                        
                                        );
                           
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { 
                            var_dump($e);
                        }
		}
		return $return;
	}
	
	function purchaseletterUpdate($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
                            
				$affectedRow = $this->execSP('sp_purchaseletter_update',
                                        $this->session->getUserId(),
                                        $param['purchaseletter_id'],
                                        $param['corporate'],
                                        $param['notes'],
                                        $param['customer_name'],
                                        $param['customer_address'],
                                        $param['customer_city_id'],
                                        $param['customer_zipcode'],
                                        $param['customer_homephone'],
                                        $param['customer_mobilephone'],
                                        $param['customer_officephone'],
                                        $param['customer_fax'],
                                        $param['customer_ktp'],
                                        $param['customer_npwp'],
                                        $param['customer_email'],
                                        $param['salesman_id'],
                                        $param['clubcitra_member'],
                                        $param['clubcitra_id'],
                                        $param['saleslocation_id'],
                                        $param['mediapromotion_id'],
                                        $param['bankkpr_id'],
                                        $param['collector_id']
                                    );
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { }
		}
		return $return;
	}
	
	function purchaseletterDelete($param=array())
	{
               
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'purchaseletter_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			$param[$key_name] = preg_replace('/(,)$/','',$param[$key_name]);
			try {
				$affectedRow = $this->execSP('sp_purchaseletter_destroy', $param[$key_name], $this->session->getUserId());
				$return['total'] = $affectedRow;
				$return['success'] = (bool)$affectedRow;				
			} catch(Exception $e) { }
		}
		return $return;
	}
        
        function purchaseletterberkasRead($param)
	{
//            var_dump($param);            die();
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {		
				$result = $this->execSP3('sp_purchaseletter_berkas_read',$param['unit_id'],$param['purchaseletter_no'],$param['block_id'],$param['customer_name'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit'], $param['page'],$param['cluster_id'],$param['cluster_code'],$param['berkas_group']);
                                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                                $return['data'] = $result[1];			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}

	function allpurchaseletterRead($param){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {		
				$resultdata = $this->execSP('sp_purchaseletter_all_read', $param['unit_id']);
				
				$return['total']   = count($resultdata);
				$return['data']    = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                var_dump($e->getMessage());
            }
		}
		return $return;
	}
}

?>