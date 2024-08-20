<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Kartupiutangbiayalegalitasreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function kartupiutangbiayalegalitasreportReadCount($param){
    	$return['success'] = false;
			try {
				$data = array (
					$this->session->getCurrentProjectId(),
					$param['cluster_id']
				);
				$result = $this->execSP3('sp_report_kartupiutang_biaya_legalitas_read_count', $data);
				$return['data'] = $result[0];			
				$return['success'] = true;		
			} catch(Exception $e) { var_dump($e->getMessage()); }
		return $return;
    }

    function cmdPipe($commandline)
	{
	    if (false === ($pipe = popen($commandline, 'r'))) {
	        throw new \RuntimeException('Cannot open pipe');
	    }
	    $output = '';
	    while (!feof($pipe)) {
	        $output .= fread($pipe, 1024);
	    }
	    pclose($pipe);
	    return $output;
	}

	function kartupiutangbiayalegalitasreportPython($param){
		$return['success'] = false;
		try {
			$data = array (
				$this->session->getCurrentProjectId(),
				$param['cluster_id']
			);

			$data = "'".implode("','", array_filter($data))."'";
			$createexcel = 'python '.APPLICATION_PATH .'/modules/erems/models/BigReport.py "exec sp_report_kartupiutang_biaya_legalitas_read '.$data.'" "Kartupiutangall_Report" "'.$this->session->getUserId().'"';
			$resultPython = exec($createexcel);
			$resultPython = rtrim($resultPython);

			$return['data'] = $resultPython;
			$return['success'] = true;
		} catch(Exception $e) { var_dump($e->getMessage()); }
		return $return;
	}    

    function kartupiutangbiayalegalitasreportRead($param) { 
        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					// $this->session->getCurrentPtId(),
					$param['cluster_id']
				);
				$result = $this->execSP3('sp_report_kartupiutang_biaya_legalitas_read', $data);
				$return['data'] = $result[0];			
				$return['success'] = true;		
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    

}

?>