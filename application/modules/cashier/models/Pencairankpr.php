<?php

class Cashier_Models_Pencairankpr extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function pencairankprRead($param) {
        $this->_schema = "cashier.dbo";
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_pencairankpr_id'], 
					$param['purchaseletter_id'], 
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_plpencairankpr_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	function pencairankprCreate($param_val = array()) {
		$winId = $param_val['winId'];
		$param = $param_val['data_detail'];
		
		$sp_name = 'sp_plpencairankprrzl_create';
		if($winId == 'win-fullpaymentformdata'){
			$sp_name = 'sp_plpencairankpr_fullpayment_create';
		}
		if (is_array($param) && count($param))
		{
			try {
				$purchaseletter_pencairankpr_id = ''; 
				$purchaseletter_id = ''; 
				$payment_id = ''; 
				$schedule_id = ''; 
				$escrow_date = ''; 
				$pengajuan_berkas_date = ''; 
				$pencairan_date = '';
				$pencairan_amount = ''; 
				$persen_pencairan = '';
				$persen_progress = ''; 
				$plafon_id = ''; 
				$keterangan = ''; 
				$duedate_escrow = '';
				$bilyet_no = ''; 
				$realisation_date = ''; 
				$deleted = ''; 
				
				foreach ($param as $idx => $data)
				{
					foreach ($data as $key => $value)	
					{
						switch ($key){
							case 'purchaseletter_pencairankpr_id': $purchaseletter_pencairankpr_id .= intval($value)."~";break;
							case 'purchaseletter_id': $purchaseletter_id .= intval($value)."~";break;
							case 'payment_id': $payment_id .= intval($value)."~";break;
							case 'schedule_id': $schedule_id .= intval($value)."~";break;
							case 'escrow_date': $escrow_date .= $value."~";break;
							case 'pengajuan_berkas_date': $pengajuan_berkas_date .= $value."~";break;
							case 'pencairan_date': $pencairan_date .= $value."~";break;
							case 'pencairan_amount': $pencairan_amount .= doubleval($value)."~";break;//$value."~";break;	
							case 'persen_pencairan': $persen_pencairan .= doubleval($value)."~";break;
							case 'persen_progress': $persen_progress .= doubleval($value)."~";break;
							case 'plafon_id': $plafon_id .= intval($value)."~";break;
							case 'keterangan': $keterangan .= $value."~";break;
							case 'duedate_escrow': $duedate_escrow .= $value."~";break;
							case 'bilyet_no': $bilyet_no .= $value."~";break;
							case 'realisation_date': $realisation_date .= $value."~";break;
							case 'deleted': $deleted .= $value."~";break;	
						}							
					}				
				};
				$purchaseletter_pencairankpr_id = preg_replace('/(~)$/','',$purchaseletter_pencairankpr_id);
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$payment_id = preg_replace('/(~)$/','',$payment_id);
				$schedule_id = preg_replace('/(~)$/','',$schedule_id);
				$escrow_date = preg_replace('/(~)$/','',$escrow_date);
				$pengajuan_berkas_date = preg_replace('/(~)$/','',$pengajuan_berkas_date);
				$pencairan_date = preg_replace('/(~)$/','',$pencairan_date);
				$pencairan_amount = preg_replace('/(~)$/','',$pencairan_amount);
				$persen_pencairan = preg_replace('/(~)$/','',$persen_pencairan);
				$persen_progress = preg_replace('/(~)$/','',$persen_progress);
				$plafon_id = preg_replace('/(~)$/','',$plafon_id);
				$keterangan = preg_replace('/(~)$/','',$keterangan);
				$duedate_escrow = preg_replace('/(~)$/','',$duedate_escrow);
				$bilyet_no = preg_replace('/(~)$/','',$bilyet_no);
				$realisation_date = preg_replace('/(~)$/','',$realisation_date);
				$deleted = preg_replace('/(~)$/','',$deleted);

				$payment_no = Erems_Box_Models_App_DocPrefixGenerator::get('PAYMENT');

				$result = $this->execSP3($sp_name, 
									$purchaseletter_pencairankpr_id,
								   $purchaseletter_id, 
								   $payment_id, 
								   $payment_no,
								   		$schedule_id,
								   $escrow_date, 
								   $pengajuan_berkas_date,
								   $pencairan_date, 
								   $pencairan_amount,
								   		$persen_pencairan,
										$persen_progress,
										$plafon_id,
										$keterangan,
										$duedate_escrow,
										
										$bilyet_no,
										$realisation_date,
										
								   $deleted,
								   $this->session->getUserId(),
								   '1'
								); 
					
				$this->returned['total'] = $result[0]; $this->returned['success'] = $result[0]>0;
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $this->returned;
    }

    /*function pencairankprCreate($param = array()) {
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$purchaseletter_pencairankpr_id = ''; 
				$purchaseletter_id = ''; 
				$payment_id = ''; 
				$schedule_id = ''; 
				$escrow_date = ''; 
				$pencairan_date = '';
				$pencairan_amount = ''; 
				$persen_pencairan = '';
				$persen_progress = ''; 
				$plafon_id = ''; 
				$keterangan = ''; 
				$deleted = ''; 
				
				foreach ($param as $idx => $data)
				{
					foreach ($data as $key => $value)	
					{
						switch ($key){
							case 'purchaseletter_pencairankpr_id': $purchaseletter_pencairankpr_id .= intval($value)."~";break;
							case 'purchaseletter_id': $purchaseletter_id .= intval($value)."~";break;
							case 'payment_id': $payment_id .= intval($value)."~";break;
							case 'schedule_id': $schedule_id .= intval($value)."~";break;
							case 'escrow_date': $escrow_date .= trim($value)."~";break;
							case 'pencairan_date': $pencairan_date .= $value."~";break;
							case 'pencairan_amount': $pencairan_amount .= doubleval($value)."~";break;//$value."~";break;	
							case 'persen_pencairan': $persen_pencairan .= doubleval($value)."~";break;
							case 'persen_progress': $persen_progress .= doubleval($value)."~";break;
							case 'plafon_id': $plafon_id .= intval($value)."~";break;
							case 'keterangan': $keterangan .= $value."~";break;
							case 'deleted': $deleted .= $value."~";break;	
						}							
					}				
				};
				$purchaseletter_pencairankpr_id = preg_replace('/(~)$/','',$purchaseletter_pencairankpr_id);
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$payment_id = preg_replace('/(~)$/','',$payment_id);
				$schedule_id = preg_replace('/(~)$/','',$schedule_id);
				$escrow_date = preg_replace('/(~)$/','',$escrow_date);
				$pencairan_date = preg_replace('/(~)$/','',$pencairan_date);
				$pencairan_amount = preg_replace('/(~)$/','',$pencairan_amount);
				$persen_pencairan = preg_replace('/(~)$/','',$persen_pencairan);
				$persen_progress = preg_replace('/(~)$/','',$persen_progress);
				$plafon_id = preg_replace('/(~)$/','',$plafon_id);
				$keterangan = preg_replace('/(~)$/','',$keterangan);
				$deleted = preg_replace('/(~)$/','',$deleted);

				$payment_no = Erems_Box_Models_App_DocPrefixGenerator::get('PAYMENT');

				$affectedRow = $this->execSP2('sp_plpencairankpr_create', 
									$purchaseletter_pencairankpr_id,
								   $purchaseletter_id, 
								   $payment_id, 
								   $payment_no,
								   		$schedule_id,
								   $escrow_date, 
								   $pencairan_date, 
								   $pencairan_amount,
								   		$persen_pencairan,
										$persen_progress,
										$plafon_id,
										$keterangan,
								   $deleted,
								   $this->session->getUserId(),
								   '1'
								); 
				$return['success'] = (bool)$affectedRow['data'][0]['total_row'];
				$return['total'] = $affectedRow['data'][0]['total_row'];				
			} catch(Exception $e) { }
		}
		return $return;
    }*/

    /*function pencairankprUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {	
                $affectedRow = $this->execSP('sp_pencairankpr_update', 
									$param['pencairankpr_id'], 
									$param['purchaseletter_id'], 
									'', 
									$param['pencairankprreason_id'], 
									$param['description'], 
									$param['pencairankpr_date'], 
									$param['biaya'], 
									$param['ktp'], 
									$param['name'], 
									$param['address'], 
									$param['telephone'], 
									$param['mobilephone'], 
									$param['city_id'], 
									$this->session->getUserId(), 
									'1'
                				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }*/

    function pencairankprDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'purchaseletter_pencairankpr_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_plpencairankpr_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	//get DueDate Escrow
	function pencairankprReadDueDateEscrow($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_id'],
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_plpencairankprduedateconst_read', $data);	
				//var_dump($result);			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	//get Progress Construction
	function pencairankprReadProgress($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['unit_id'],
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_plpencairankprprogressconst_read', $data);	
				//var_dump($result);			
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result;			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	function pencairanfullpaymenrtRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id']
				);
				$result = $this->execSP3('sp_plpencairanfullpayment_read', $data);	
				//var_dump($result);			
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { }
		}		
		return $return;
    }
    
    function checkallowedgenerateRead($param) {
        $return = true;
        $this->_schema = "cashier.dbo";
        if (is_array($param) && count($param)) {
            try {
                $resultdata = $this->execSP('sp_validation_plpencairankpr', 
									$param['purchaseletter_id']
								);
                if(!isset($resultdata[0])){
                    $resultdata[0]['allowedgenerate'] = false;
                }
                
                $return = array(
                    "data" => array(
                        "allowedgenerate" => ($resultdata[0]['allowedgenerate']==0?false:true)
                    ),
                );
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

}

?>