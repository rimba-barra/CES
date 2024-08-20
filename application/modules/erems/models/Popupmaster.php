<?php

class Erems_Models_Popupmaster extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function popupbelumakadkreditRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupbelumakadkredit_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupsudahakadkreditRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupsudahakadkredit_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumsppjbRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'], 
					$param['customer_name'], 
					$param['pricetype_id']
				);
				$result = $this->execSP3('sp_popupbelumsppjb_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumajbRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'], 
					$param['page']
				);
				$result = $this->execSP3('sp_popupbelumajblist_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumhgbptRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupbelumhgbpt_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumhgbcustomerRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupbelumhgbcustomer_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popuppembatalanRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popuppembatalan_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumstRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupbelumst_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupbelumimbRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupbelumimb_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupsudahprogressbelumcairRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupsudahprogressbelumcair_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popuplistsertifikatRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_popuplistsertifikat_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
	function popupspkenahariiniRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['unit_number'],
					$param['purchaseletter_no'],
					0,
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_popupspkenahariini_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}
	
	function popupagingcomplaintRead($param) {
		$return['success'] = false;
		if (is_array($param) && count($param)) {
			try {
				$data = array(
					$param['unit_number'],
					$param['purchaseletter_no'],
					0,
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(),
					$param['start'],
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_popupagingcomplaint_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];
				$return['success'] = true;
			} catch (Exception $e) {
				var_dump($e->getMessage());
			}
		}
		return $return;
	}
	
	function exportData($param) {
        $return['success'] = false;
		
		if (is_array($param) && count($param)){
			try {
				$popup_type = $param['popup_type'];
				
				if($popup_type == 'insentifpajak'){
					$res = $this->popupinsentifpajakRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by anas 23062021
				else if($popup_type == 'lunasum'){
					$res = $this->popuplunasumRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 16072021
				else if($popup_type == 'popupppatk'){
					$res = $this->popupppatkRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 16072021
				else if($popup_type == 'popupreservation'){
					$res = $this->popupreservationRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 16072021
				else if($popup_type == 'popupprintedlunasdp'){
					$res = $this->popupprintedlunasdpRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 19112021
				else if($popup_type == 'lunasumbelumakad'){
					$res = $this->popuplunasumbelumakadRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 06122021
				else if($popup_type == 'vida'){
					$res = $this->popupvidaRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'perpanjanganschedule'){
					$res = $this->popupperpanjanganscheduleRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'hasilsurvey'){
					$res = $this->popuphasilsurveyRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'dibiayaiinstansi'){
					$res = $this->popupdibiayaiinstansiRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'upgradeppn'){
					$res = $this->upgradeppnRead($param, 'all');
					$result[0] = $res['data'];
				}
				else if($popup_type == 'popupkomisi'){
					$res = $this->popupkomisiRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'adminfeekpr'){
					$res = $this->adminfeekprRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 26072022
				else if($popup_type == 'followuphistory'){
					$res = $this->popupfollowuphistoryRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 23082022
				else if($popup_type == 'hargadatastock'){
					$res = $this->hargadatastockRead($param);
					$result[0] = $res['data'];
				}
				// added by rico 02092022
				else if($popup_type == 'popuppenundaanbiayalegalitas'){
					$res = $this->penundaanbiayaRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 02092022
				else if($popup_type == 'documenthistorycustomer'){
					$res = $this->documenthistorycustomerRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 02092022
				else if($popup_type == 'documenthistoryunit'){
					$res = $this->documenthistoryunitRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 02092022
				else if($popup_type == 'logkomunikasicustomer'){
					$res = $this->logkomunikasicustomerRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 07122021
				else if($popup_type == 'popuppurchaseletterreward'){
					$res = $this->popuppurchaseletterrewardRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 10102022
				else if($popup_type == 'popuplistautocancel'){
					$res = $this->popuplistautocancelRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 12102022
				else if($popup_type == 'listpembatalan'){
					$res = $this->popuplistpembatalanRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 23112022
				else if($popup_type == 'listbelumkomisi'){
					$res = $this->popuplistbelumkomisiRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 28112022
				else if($popup_type == 'blokirpurchaseletter'){
					$res = $this->popupblokirpurchaseletterRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 18012023
				else if($popup_type == 'pinjampakailunas'){
					$res = $this->popuppinjampakailunasRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 18012023
				else if($popup_type == 'discountcollection'){
					$res = $this->popupdiscountcollectionRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 19012023
				else if($popup_type == 'disckaryawan'){
					$res = $this->popupdisckaryawanRead($param, 'all');
					$result[0] = $res['data'];
				}
				//added by rico 16022023
				else if($popup_type == 'jatuhtempoescrow'){
					$res = $this->popupjatuhtempoescrowRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 13042023
				else if($popup_type == 'popupfakturtagihan'){
					$res = $this->popupfakturtagihanRead($param, 'all');
					$result[0] = $res['data'];
				}
				// added by rico 16052023
				else if($popup_type == 'dendasystem'){
					$res = $this->popupdendasystemRead($param, 'all');
					$result[0] = $res['data'];
				}
				else if($popup_type == 'unitlunas'){
					$res = $this->popupunitlunasRead($param, 'all');
					$result[0] = $res['data'];
				}
				else{
					$sp_name = '';
					
					if($popup_type == 'belumakadkredit') { $sp_name = 'sp_popupbelumakadkredit_read'; }
					if($popup_type == 'sudahakadkredit') { $sp_name = 'sp_popupsudahakadkredit_read'; }
					if($popup_type == 'belumsppjb') { $sp_name = 'sp_popupbelumsppjb_read'; }
					if($popup_type == 'belumajb') { $sp_name = 'sp_popupbelumajblist_read'; }
					if($popup_type == 'belumhgbpt') { $sp_name = 'sp_popupbelumhgbpt_read'; }
					if($popup_type == 'belumhgbcustomer') { $sp_name = 'sp_popupbelumhgbcustomer_read'; }
					if($popup_type == 'pembatalan') { $sp_name = 'sp_popuppembatalan_read'; }
					if($popup_type == 'belumst') { $sp_name = 'sp_popupbelumst_read'; }
					if($popup_type == 'belumimb') { $sp_name = 'sp_popupbelumimb_read'; }
					if($popup_type == 'sudahprogressbelumcair') { $sp_name = 'sp_popupsudahprogressbelumcair_read'; }
					if($popup_type == 'popupdenda') { $sp_name = 'sp_popupdenda_export_read'; }
                    //edited by Rizal 1 Maret 2019
					if($popup_type == 'popupchangecancelrev') { $sp_name = 'sp_popupchangecancelrev_needprocess_read'; }
                    //endedited
					if($popup_type == 'spkenahariini') { $sp_name = 'sp_popupspkenahariini_read'; }
					if($popup_type == 'agingcomplaint') { $sp_name = 'sp_popupagingcomplaint_read'; }
					if($popup_type == 'listsertifikat') { $sp_name = 'sp_popuplistsertifikat_read'; }

					if($popup_type == 'listsertifikat'){
						$data = array (
							$param['unit_number'], 
							$param['purchaseletter_no'], 
							1, 
							$this->session->getCurrentProjectId(), 
							$this->session->getCurrentPtId(),
							$param['start'], 
							$param['limit'],
							$param['page']=>1
						);
					} else {
						$data = array (
							$param['unit_number'], 
							$param['purchaseletter_no'], 
							1, 
							$this->session->getCurrentProjectId(), 
							$this->session->getCurrentPtId(),
							$param['start'], 
							$param['limit']
						);
					}

					$result = $this->execSP3($sp_name, $data);	
				}
				
				$return['data']    = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
    }
    
    //edited by Rizal 1 Maret 2019
    function popupchangecancelrevRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_number'], 
					$param['purchaseletter_no'], 
					0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_popupchangecancelrev_needprocess_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
    //endedited

    function popupinsentifpajakRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_insentif_pajak_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

	//added by anas 23062021
    function popuplunasumRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_lunas_um_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
    function popupppatkRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$param['periode'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);

				$result = $this->execSP3('sp_popup_ppatk_read', $data);		
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}
		return $return;

	}
	
    function popupreservationRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
        	$blockId = ''; $clusterId=''; $reservationDateUntil =''; $reservationDate='';
			try {
				$data = array (
					$param['reservation_no'], 
					$clusterId, 
					$blockId, 
					$param['unit_number'], 
					$param['customer_name'], 
					$reservationDate, 
					$reservationDateUntil, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0
				);
				$result = $this->execSP3('sp_popup_reservation_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
	
    function popupprintedlunasdpRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_printed_lunas_dp_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

	//added by rico 19112021
    function popuplunasumbelumakadRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_lunas_um_belum_akad_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 06122021
    function popupvidaRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_vida_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 07122021
    function popupperpanjanganscheduleRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_perpanjangan_schedule_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 18012022
    function popuphasilsurveyRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_hasil_survey_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 27012022
    function popupdibiayaiinstansiRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_dibiayai_instansi_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
    function upgradeppnRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_upgradeppn_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    //add by dika 30032022
     function popupkomisiRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['employee_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_komisi_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function adminfeekprRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				// print_r($param);
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$param['cair_start_date'], 
					$param['cair_end_date'], 
					isset($param['status']) && $param['status'] ? $param['status'] : 0, 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_adminfeekpr_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 26072022
    function popupfollowuphistoryRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_followuphistory_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 26072022
    function hargadatastockRead($param){
		$return['success'] = false;
		if (is_array($param) && count($param)){

			$unitNumber  = isset($param['unit_number']) && $param['unit_number'] ? $param['unit_number'] : 0;
			$cluster  	 = isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0;
			$block  	 = isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0;
			$tipe  		 = isset($param['type_id']) && $param['type_id'] ? $param['type_id'] : 0;
			$position  	 = isset($param['position_id']) && $param['position_id'] ? $param['position_id'] : 0;
			$pc  		 = isset($param['productcategory_id']) && $param['productcategory_id'] ? $param['productcategory_id'] : 0;
			$side  		 = isset($param['side_id']) && $param['side_id'] ? $param['side_id'] : 0;
			$purpose  	 = isset($param['purpose_id']) && $param['purpose_id'] ? $param['purpose_id'] : 0;
			$unitStatus  = isset($param['unitstatus_id']) && $param['unitstatus_id'] ? $param['unitstatus_id'] : 0;
			$progressbot = isset($param['bot_progress']) ? intval($param['bot_progress']) : '';
			$progresstop = isset($param['top_progress']) ? intval($param['top_progress']) : '';
			
			try {
				$data = array (
					isset($param['page']) && $param['page'] ? $param['page'] : 1, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 999999,
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$unitStatus,
					$unitNumber,
					$cluster,
					$block,
					$tipe,
					$position,
					$pc,
					$side,
					$purpose,
					$progressbot,
					$progresstop
				);
				$result = $this->execSP3('sp_popup_hargadatastock_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function penundaanbiayaRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_penundaanbiaya_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function documenthistorycustomerRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['name'],
				);
				$result = $this->execSP3('sp_popupdocumentcustomer_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function documenthistoryunitRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['name'],
				);
				$result = $this->execSP3('sp_popupdocumentunit_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function logkomunikasicustomerRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['department'], 
				);
				$result = $this->execSP3('sp_popupcustomerkomunikasi_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
    function popuppurchaseletterrewardRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 1, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 999999,
					$param['purchaseletter_no'],
					$param['customer_name'],
					$param['unit_number'],
					'', // salesman
					'1900-01-01', // range tanggal purchase awal
					'2999-12-31', // range tanggal purchase akhir
					$param['unit_virtualaccount_bca'],
					$param['unit_virtualaccount_mandiri']
				);
				$result = $this->execSP3('sp_popup_popuppurchaseletterreward_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }
    
    function popuplistautocancelRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				// print_r($param);
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_list_auto_cancel_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

	//added by rico 12102022
    function popuplistpembatalanRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_list_pembatalan_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

	//added by rico 12102022
    function popuplistbelumkomisiRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_list_belum_komisi_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

	//added by rico 28112022
	function popupblokirpurchaseletterRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_blokir_purchaseletter_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}

	//added by rico 18012023
	function popuppinjampakailunasRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_pinjam_pakai_lunas_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}

	//added by rico 18012023
	function popupdiscountcollectionRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_discount_collection_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}

	//added by rico 18012023
	function popupdisckaryawanRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_disc_karyawan_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}
	
	// added by rico 16022023
	function popupjatuhtempoescrowRead($param, $flag='grid') {
        $return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['plafon_id']) && $param['plafon_id'] ? $param['plafon_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popupjatuhtempoescrow_read', $data);		
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;					
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 16032023
	function popupppatkLapor($param){	
		$return['success'] = false;
		
		if (is_array($param) && count($param)){
			try {
				$affectedRow = $this->execSP('sp_popupppatk_update',
					$param['purchaseletter_id'],
					$param['addon'],
					$param['addby']
                );
                           
				$return['success'] = (bool)$affectedRow;
			} catch(Exception $e) { 
                var_dump($e);
	        }
		}
		return $return;
	}

	// 13042023
    function popupfakturtagihanRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				// print_r($param);
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					$param['unit_number'], 
					$param['jatuhtempo_date_start'], 
					$param['jatuhtempo_date_end'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_fakturtagihan_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    // added by rico 16052023
    function popupdendasystemRead($param, $flag='grid'){
		$return['success'] = false;

		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['cluster_id']) && $param['cluster_id'] ? $param['cluster_id'] : 0, 
					isset($param['block_id']) && $param['block_id'] ? $param['block_id'] : 0, 
					$param['customer_name'], 
					$param['unit_number'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag,
					isset($param['check_all_data']) && $param['check_all_data'] ? $param['check_all_data'] : 0
				);
				$result = $this->execSP3('sp_popup_denda_system_vs_generate_denda_read', $data);				
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function popupunitlunasRead($param, $flag='grid'){
		$return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				$data = array (
					isset($param['unit_number']) && $param['unit_number'] ? $param['unit_number'] : '', 
					isset($param['purchaseletter_no']) && $param['purchaseletter_no'] ? $param['purchaseletter_no'] : '', 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					isset($param['page']) && $param['page'] ? $param['page'] : 0, 
					isset($param['limit']) && $param['limit'] ? $param['limit'] : 0,
					$flag
				);
				$result = $this->execSP3('sp_popup_unit_lunas_read', $data);	
				$return['total']   = $result[0][0]['totalRow'];
				$return['data']    = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
	}
}


?>