<?php

class Erems_Models_Bagihasilproses extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function dataRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['unit_number'],
                    $param['customer_name'],
					$param['cluster_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    ($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
                );
                $result = $this->execSP3('sp_bagihasilproses_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { 
				var_dump($e->getMessage());
            }
        }
        return $return;
    }
	
	function dataprosesdateRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    ($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
                );
                $result = $this->execSP3('sp_bagihasilprosesdate_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { 
				var_dump($e->getMessage());
            }
        }
        return $return;
    }
	
	function dataprosesdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
					$param['lrp_id'],
					$param['unit_id'],
					$param['purchaseletter_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    ($param['limit'] > 0 ? $param['limit'] : 25),
					$param['page']
                );
                $result = $this->execSP3('sp_bagihasilprosesdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { 
				var_dump($e->getMessage());
            }
        }
        return $return;
    }
	
    function dataCreate($param = array()) {
		$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$result = $config->lrpSH1Raya();

        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
$ptID = $this->session->getCurrentPtId();
				$gencoSplitLRP = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getSplitPTLRP();
				if ($gencoSplitLRP == 1) {
					$ptID = $param['pt_id'];
				}
				
				$data = array (
					$param['doc_no'], 
					$param['proses_date'], 
					$this->session->getCurrentProjectId(),
                    $ptID,
					$this->session->getUserId()
				);
				if($result == 1){
					$result = $this->execSP3('sp_bagihasilproses_sh1_raya_create', $data);				
				}else{
					$result = $this->execSP3('sp_bagihasilproses_create', $data);				
				}
				
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }
	
	function dataUpdateBungaLRP($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				
				$data = array (
					$param['prosesbunga_date'], 
					$this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bagihasilprosesbunga_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }

    /*function dataUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$komisi_marketing = ($param['komisi_marketing'] ? $param['komisi_marketing'] : 0);
				
				$data = array (
					$param['purchaseletter_id'], 
					$param['is_prosesbagihasil'], 
					$param['kelompok_edit'], 
					$param['landrepayment_id'], 
					$komisi_marketing,
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bagihasilproses_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }

    function landrepaymentDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'landrepayment_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].'~#~'; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bagihasilproses_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }*/

	function exportData($param) {
		$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$genco = $config->lrpSH1Raya();

        $return['success'] = false;
		
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['lrp_id']
				);
				if($genco == 1){
					$result = $this->execSP3('sp_reportlandrepayment_excel_sh1_raya_read', $data);	
				}else{
					$result = $this->execSP3('sp_reportlandrepayment_excel_read', $data);				
				}
				
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) {  }
		}		
		return $return;
    }
	
	function exportBacklogData($param) {
		$config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
		$genco = $config->lrpSH1Raya();

        $return['success'] = false;
		
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['lrp_id']
				);
				if($genco == 1){
					$result = $this->execSP3('sp_reportlandrepayment_backlog_excel_sh1_raya_read', $data);	
				}else{
					$result = $this->execSP3('sp_reportlandrepayment_backlog_excel_read', $data);	
				}
				
				
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) {  }
		}		
		return $return;
    }
	
	function exportCancelData($param) {
        $return['success'] = false;
		
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['lrp_id']
				);
				
				$result = $this->execSP3('sp_reportlandrepayment_cancel_excel_read', $data);	
				
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) {  }
		}		
		return $return;
    }
	
	function exportChangekavelingData($param) {
        $return['success'] = false;
		
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['lrp_id']
				);
				
				$result = $this->execSP3('sp_reportlandrepayment_changekaveling_excel_read', $data);	
				
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) {  }
		}		
		return $return;
    }
	
	function exportBungaData($param) {
        $return['success'] = false;
		
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['lrp_id']
				);
				
				$result = $this->execSP3('sp_reportlandrepayment_bungalrp_excel_read', $data);	
				
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) {  }
		}		
		return $return;
    }
	
	function LRPDelete($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['lrp_id'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_bagihasilproses_destroy', $data);
				$return['total'] = $result[0];
				$return['success'] = true;
			} catch (Exception $e) {
				
			}
		}
		return $return;
	}
	
}

?>