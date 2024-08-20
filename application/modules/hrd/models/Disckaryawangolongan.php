<?php

class Hrd_Models_Disckaryawangolongan extends Zend_Db_Table_Abstract
{
	protected $_schema		= 'hrd';
	protected $_name 		= 't_disc';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function dataRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {   
				$data = array (
					$param['employee_name'], 
					$param['noref'], 
					$param['project_id'], 
					$param['pt_id'], 
					$param['lokasi_project_id'], 
					$param['discstatus'], 
					$param['tgl_pengajuan_dari'], 
					$param['tgl_pengajuan_sampai'], 
					$param['start'], 
					$param['limit'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_disc_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                            //var_dump($e);                         
                        }
		}		
		return $return;
	}
        
	function discstatusRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_discstatus_read', $data);
				$return = $result[0];				
			} catch(Exception $e) { }
		}		
		return $return;
	}
        
	function dataUpdate($param = array()) {
            $return['success'] = false;            
            if (is_array($param) && count($param))
            {
                    try {   
                            $data = array (
                                    $param['disc_id'],
                                    $param['group_code'],
                                    $this->session->getUserId()
                            );
                            $result = $this->execSP3('sp_disc_update', $data);
                            $return['total'] = $result[0];
                            $return['success'] = $result[0]>0;
                    } catch(Exception $e) { 
                        var_dump($e);                         
                    }
            }		
            return $return;
    }
	
}