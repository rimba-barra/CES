<?php

class Erems_Models_Masterprofitsharing extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'mh_profitsharing';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function profitsharingRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['profitsharing_id'], 
					$param['code'], 
					$param['keterangan'], 
					$param['start'], 
					$param['limit'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);
				$result = $this->execSP3('sp_masterprofitsharing_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }

    function profitsharingCreate($param = array()) {
    	$return['success'] = false;

		$profitsharing_id  = $param['profitsharing_id'];
		$code              = $param['code'];
		$keterangan        = $param['keterangan'];
		$komisi_marketing  = $param['komisi_marketing'];
		$meter_awal        = $param['tanah_permeter_awal'];
		$nilai_lahan_gross = $param['nilai_lahan_gross'];
		$efisiensi_lahan   = $param['efisiensi_lahan'];
		$management_fee    = $param['management_fee'];
		$royalty           = $param['royalty'];

        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_masterprofitsharing_create', 
					$profitsharing_id, 
					$this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
					$code, 
					$keterangan, 
					$komisi_marketing,
					$meter_awal,
					$nilai_lahan_gross,
					$efisiensi_lahan,
					$management_fee, 
					$royalty, 
					$this->session->getUserId()
                );

				$return['total']   = $result[0];
				$return['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */ }
        }
        return $return;
    }

    function profitsharingUpdate($param = array()) {
        $return['success'] = false;

		$profitsharing_id  = $param['profitsharing_id'];
		$code              = $param['code'];
		$keterangan        = $param['keterangan'];
		$komisi_marketing  = $param['komisi_marketing'];
		$meter_awal        = $param['tanah_permeter_awal'];
		$nilai_lahan_gross = $param['nilai_lahan_gross'];
		$efisiensi_lahan   = $param['efisiensi_lahan'];
		$management_fee    = $param['management_fee'];
		$royalty           = $param['royalty'];

		if (is_array($param) && count($param)){
			try {
				$data = array (
					$profitsharing_id, 
					$this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
					$code, 
					$keterangan, 
					$komisi_marketing,
					$meter_awal,
					$nilai_lahan_gross,
					$efisiensi_lahan,
					$management_fee, 
					$royalty, 
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterprofitsharing_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function profitsharingDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			$key_name = 'profitsharing_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~#~'; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_masterprofitsharing_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
}

?>