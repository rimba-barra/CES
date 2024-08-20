<?php

class Erems_Models_Documentupload extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'td_cancellationdocument';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function documentuploadRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['sppjb_id'], 
					$param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_documentupload_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function documentuploadCreate($dc) {
        $return['success'] = false;

		try {				
			$data = array (
				$this->session->getUserId(),
				$dc->purchaseletter_id, 
				$dc->filename, 
				$dc->doc_type, 
				$dc->description, 
			);			

			$result = $this->execSP3('sp_documentupload_create', $data);
			$return['success'] = $result[0]>0;			
		} catch(Exception $e) { }
		return $return;
    }

    function documentuploadUpdate($dc) {
        $return['success'] = false;

		try {			
			$data = array (
				$this->session->getUserId(),
				gettype($dc) ? $dc['purchaseletter_id']: $dc->purchaseletter_id, 
				gettype($dc) ? $dc['sppjb_id']: $dc->sppjb_id, 
				gettype($dc) ? $dc['doc_filename']: $dc->filename, 
				gettype($dc) ? $dc['doc_type']: $dc->doc_type, 
				gettype($dc) ? $dc['description']: $dc->description, 
			);
			$result = $this->execSP3('sp_documentupload_update', $data);
			$return['total'] = $result[0];
			$return['success'] = $result[0]>0;			
		} catch(Exception $e) { }
		return $return;
    }

    function documentuploadDelete($param) {
        $return['success'] = false;

		// if (is_array($param) && count($param)){
			// $key_name = 'sppjb_doc_id';
			// $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			// foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		

			try {
				$data = array (
					// $param,
					// $param[$key_name],
					$this->session->getUserId()
				);

				$result = $this->execSP3('sp_documentupload_destroy', $param, $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { 
				print_r($e);
			}
		// }
		return $return;
	}

	function documentuploadprintoutRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$result = $this->execSP2('sp_documentupload_printout_read', 
					$param['documentupload_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);	
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
    }

    // added by rico 26102021
    public function saveUnitInformation($params){
        $return['success'] = false;

        $user = $this->execSP3('sp_current_user',$params['user_id']);

		try {				
			$data = array (
	            $params['user_id'],
	            $params['cancellationdocument_id'],
	            $params['filename'],
	            $params['description'],
	            $user[0][0]['user_email'],
	            $params['project_id'],
	            $params['pt_id'],
	            $params['alasan']
			);
			

			$result = $this->execSP3('sp_documentcancellation_create_history', $data);
			$return['success'] = $result[0]>0;			
		} catch(Exception $e) { }
		return $return;
    } 
}

?>