<?php

class Erems_Models_Sourcemoney extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'm_sourcemoney';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function sourcemoneyRead($param)
	{
		$return['success'] = false;
		if (is_array($param))
		{
			try {		
				$resultcount = $this->execSP('sp_sourcemoney_count');
				$resultdata = $this->execSP('sp_sourcemoney_read');
				
				$return['total'] = $resultcount[0]['RECORD_TOTAL'];
				$return['data'] = $resultdata;			
				$return['success'] = true;
			} catch(Exception $e) { 
                            var_dump($e->getMessage());
                        }
		}
		return $return;
	}
	
	
}
?>