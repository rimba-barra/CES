<?php

class Hrd_Models_Masterharibesar extends Zend_Db_Table_Abstract
{
	protected $_schema		= 'hrd';
	protected $_name 		= 'm_holiday';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function masterharibesarRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {   
				$data = array (
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['start'], 
                    $param['limit'],
                    $param['page'], 
                    $param['holiday_name']
				);
				$result = $this->execSP3('sp_masterharibesar_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                //var_dump($e);                         
            }
		}		
		return $return;
	}
        
	function holidaynameRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['page'], 
                    $param['limit'],
                    $param['holiday_name']
                );
				$result = $this->execSP3('sp_holidayname_read', $data);
				$return = $result[1];				
			} catch(Exception $e) { }
		}		
		return $return;
	}	

    function masterharibesarCreate($param = array()) 
    {
        if (is_array($param) && count($param)) {
            
            if($param['holiday_name_id'] == 0)
            {
                $this->returned['success'] = false;
                $this->returned['message'] = "Invalid type";
            }
            else
            {    
                try {
                    $result = $this->execSP3('sp_masterharibesar_create', 
                        
                        $this->session->getCurrentProjectId(), 
                        $this->session->getCurrentPtId(),
                        $param['holiday_date'],
                        $param['holiday_name_id'],
                        $this->session->getUserId()
                    );

                    $this->returned['total'] = $result[0];
                    $this->returned['success'] = $result[0] > 0;
                } 
                catch (Exception $e) {  var_dump($e->getMessage()); 
                }
            }
            
        }

        return $this->returned;
    }

    function masterharibesarUpdate($param = array()) 
    {
        if (is_array($param) && count($param)) {            
            
            if($param['holiday_name_id'] == 0)
            {
                $this->returned['success'] = false;
                $this->returned['message'] = "Invalid type";
            }
            else
            {     
                try {
                    $result = $this->execSP3('sp_masterharibesar_update',
                        $param['holiday_shift_id'],
                        $param['holiday_name_id'],
                        $param['holiday_date'],
                        $this->session->getUserId()
                    );
                    $this->returned['total'] = $result[0];
                    $this->returned['success'] = $result[0] > 0;
                } 
                catch (Exception $e) {  var_dump($e->getMessage()); 
                }
            }
            
        }
        return $this->returned;
    }    
    
    function masterharibesarDelete($param) 
    {
        $return['success'] = false;
        $valid = false;
        if (is_array($param) && count($param)) {
            $key_name = 'holiday_shift_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';

            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . '~#~';
                }                
            }

            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);

            try {
                $affectedRow = $this->execSP('sp_masterharibesar_destroy', 
                    $param[$key_name], 
                    $this->session->getUserId()
                );

                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {

            }
        }

        return $return;
    }      

	
}