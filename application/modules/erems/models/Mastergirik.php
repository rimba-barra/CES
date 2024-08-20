<?php

class Erems_Models_Mastergirik extends Zend_Db_Table_Abstract
{
	protected $_schema			= 'erems';
	protected $_name 			= 'mh_girik';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function dataRead($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname 	= 'sp_mastergirik_read';
			// $spparamkey = array('datasearch'=>array('girik_id', 'code', 'girik_no', 'pemilik'), 'start', 'limit');
			$spparamkey = array('datasearch'=>array('girik_id', 'code', 'girik_no', 'pemilik'), 'page', 'limit');

			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { }
		}		
		return $this->returned;		
	}
	
	function datadetailRead($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname 	= 'sp_mastergirik_detail_read';
			$spparamkey = array('datasearch'=>array('girik_id'));
			
			try {							
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param));
				$this->returned['total'] = $result[0][0]['RECORD_TOTAL']; $this->returned['success'] = true; $this->returned['data'] = $result[1];
			} catch(Exception $e) { var_dump($e->getMessage());	 }
		}		
		return $this->returned;		
	}
	
	function dataCreate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_mastergirik_create';
			$spparamkey = array('data'=>array('girik_id', 'code', 'girik_no', 'girik_date', 'panjang'=>0, 'lebar'=>0, 'luas'=>0,
											  'alamat', 'kelurahan', 'kecamatan', 'kota', 'pemilik', 'alamat_pemilik', 'ktp_no'),
								'details'=>array(
												 'mastergirikdetail'=>array('girik_detail_id', 'girik_id'=>0, 'girik_detail_no', 'girik_detail_date', 'alamat_detail',
												 					'kelurahan_detail','kecamatan_detail', 'kota_detail', 'panjang_detail'=>0, 'lebar_detail'=>0, 'luas_detail'=>0,
																	'jenis_surat', 'pemilik_1', 'ktp_no_1', 'alamat_pemilik_1', 'pemilik_2', 'ktp_no_2', 'alamat_pemilik_2')
												),
								'detailsremoved'=>array(
												 'mastergirikdetail'=>array('girik_detail_id')
												)
							   );
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { var_dump($e->getMessage()); }			
		}
		return $this->returned;
	}
	
	function dataUpdate($param=array())
	{
		if (is_array($param) && count($param))
		{			
			$spname 	= 'sp_mastergirik_create';
			$spparamkey = array('data'=>array('girik_id', 'code', 'girik_no', 'girik_date', 'panjang'=>0, 'lebar'=>0, 'luas'=>0,
											  'alamat', 'kelurahan', 'kecamatan', 'kota', 'pemilik', 'alamat_pemilik', 'ktp_no'),
								'details'=>array(
												 'mastergirikdetail'=>array('girik_detail_id', 'girik_id'=>0, 'girik_detail_no', 'girik_detail_date', 'alamat_detail',
												 					'kelurahan_detail','kecamatan_detail', 'kota_detail', 'panjang_detail'=>0, 'lebar_detail'=>0, 'luas_detail'=>0,
																	'jenis_surat', 'pemilik_1', 'ktp_no_1', 'alamat_pemilik_1', 'pemilik_2', 'ktp_no_2', 'alamat_pemilik_2')
												),
								'detailsremoved'=>array(
												 'mastergirikdetail'=>array('girik_detail_id')
												)
							   );
								
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param),$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $this->returned;
	}
	
	function dataDelete($param=array())
	{
		if (is_array($param) && count($param))
		{
			$spname		= 'sp_mastergirik_destroy';
			$spparamkey	= array('data'=>array('girik_id'));			
						
			try {				
				$result = $this->execSP3($spname,$this->generateSPParam($spparamkey,$param,array('datadelimiter'=>($this->datadelimiter))),$this->session->getUserId());
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { }
		}
		return $this->returned;
	}
}