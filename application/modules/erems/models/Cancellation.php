<?php

class Erems_Models_Cancellation extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_cancellation';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function cancellationRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cancellation_id'], 
					$param['purchaseletter_id'], 
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'], 
					$param['customer_name'], 
					$param['cancellation_startdate'], 
					$param['cancellation_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit'],
					$param['page']
				);
				$result = $this->execSP3('sp_cancellation_new_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				var_dump($e->getMessage()); 
			}
		}		
		return $return;
    }

    function cancellationCreate($param = array()) {
        $return['success'] = false;
		
		if (is_array($param) && count($param)){
			try {
				
				$msg_is_revision = $this->check_purchaseletterrevision($param['purchaseletter_id']);
				$msg = $this->cekTanggal($param['cancellation_date']);
				
				if($msg_is_revision != ''){
					$return['msg'] = $msg_is_revision;
					$return['success'] = false;
					
				} else if($msg != ''){
					$return['msg'] = $msg;
					$return['success'] = false;
					
				} else {
					
					$msg_firstpurchasedate = $this->check_firstpurchasedate($param['firstpurchase_date'], $param['cancellation_date']);
					if($msg_firstpurchasedate != ''){
						$return['msg'] = $msg_firstpurchasedate;
						$return['success'] = false;
						
					} else {
					
						$buyback_interest_persen = 0.00;
						if($param['buyback_interest_persen'] != ''){
							$buyback_interest_persen = $param['buyback_interest_persen'];
						}
						
						$data = array (
							$param['purchaseletter_id'], 
							$param['unit_id'], 
							$param['customer_id'], 
							'', 
							$param['cancelreason_id'], 
							$param['cancellation_date'], 
							$param['totalpayment'], 
							$param['lostpayment'], 
							$param['returnpayment'], 
							$param['is_buyback'], 
							$param['buyback_installment'], 
							$buyback_interest_persen, 
							$param['buyback_interest'], 
							$param['buyback_denda'], 
							$param['note'], 
							$param['is_recommended'],
							$this->session->getUserId(),
							'1',
                            $param['isUsedVerification'],
                            $param['cancellationdocument_id'] // added by rico 12072023
						);
						$result = $this->execSP3('sp_cancellation_create', $data);
						$return['total'] = $result[0];
						$return['success'] = $result[0]>0;
						if($return['success'] == false){
							$return['msg'] = 'Purchaseletter already Exist on Cancellation';
						}
						
						if($return['success']){
							$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
							$post_data['start'] = 0;
							$post_data['limit'] = 0;
							$post_data['parametername'] = 'APPROVAL_EMAIL_LIST_CANCELLATION';
							$post_data['value'] = '';
							$post_data['datatype'] = '';
							$post_data['description'] = '';
							$rs_app_sendmail = $model_masterparameterglobal->masterparameterglobalRead($post_data);
							
							if($rs_app_sendmail['total'] > 0){
								$emailAddress = Zend_Json::encode($rs_app_sendmail['data'][0]['value']);
								$listEmail = explode(",", $emailAddress);
								
								
								$model_purchaseletter = new Erems_Models_Purchaseletter();
								$post_data['purchaseletter_id'] = $param['purchaseletter_id'];
								$rs_purchaseletter = $model_purchaseletter->purchaseletterdetailRead($post_data);
								
								if($emailAddress){
									try{
										$message = '<html><body>';
										$message .= '<p>Dear Bapak / Ibu,</p>';
										$message .= "<p>Terdapat permohonan PEMBATALAN yang dibuat oleh user dari EREMS APPLICATION, mohon bantuan untuk followup permohonan berikut</p>";
										$message .= "Kawasan / Cluster: <strong>".$rs_purchaseletter['data'][0]['cluster_code']." / ".$rs_purchaseletter['data'][0]['cluster_cluster']."</strong><br>";
										$message .= "Block / Unit No : <strong>".$rs_purchaseletter['data'][0]['unit_unit_number']."</strong><br>";
										$message .= "Purchaseletter No : <strong>".$rs_purchaseletter['data'][0]['purchaseletter_no']."</strong><br>";
										$message .= "Purchase Date : <strong>".date("d-m-Y", strtotime($rs_purchaseletter['data'][0]['purchase_date']))."</strong><br>";
										$message .= "Customer Name : <strong>".$rs_purchaseletter['data'][0]['customer_name']."</strong><br>";
										$message .= "Sales Name : <strong>".$rs_purchaseletter['data'][0]['salesman_name']."</strong><br>";
										$message .= "Total Payment : <strong>".$param['totalpayment']."</strong><br>";
										$message .= "Cancellation Date : <strong>".date("d-m-Y", strtotime($param['cancellation_date']))."</strong><br>";
										//$message .= "<p>Cancellation Reason : </p>";
										$message .= "Uang Ditahan : <strong>".$param['lostpayment']."</strong><br>";
										$message .= "Uang Kembali : <strong>".$param['returnpayment']."</strong><br>";
										$message .= "Note	:<br>";
										$message .= "<strong>".$param['note']."</strong><br><br>";
										$message .= "Tanggal pembuatan : <strong>".date("d-m-Y")."</strong><br>";
										$message .= "Username pembuat : <strong>".$this->session->getUserName()."</strong><br>";
                                                                                $message .= "Proyek : <strong>".$rs_purchaseletter['data'][0]['unit_project_name']."</strong><br>";
										$message .= "<p>&nbsp;</p>";                                                                                
                                                               
                                                                                //edit by imaam on 20190710
                                                                                $message .= '<p> <br/>';
                                                                                $message .= '<br/>';
                                                                                $message .= '<br/>';
                                                                                $message .= '<a href="https://ces.ciputragroup.com/">Login disini untuk proses persetujuan</a><br/>';
                                                                                $message .= '<br/>';
                                                                                $message .= '<br/>';
                                                                                $message .= '</p>';

										$message .= "<p>Regards,</p>";
										$message .= "EREMS APPLICATIONS";
										$message .= "</body></html>";
										
										$mail = new Erems_Box_Library_Email();
										$mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
										$mail->getMail()->setBodyHtml(nl2br($message));
										$mail->getMail()->addTo($listEmail, 'PIC');
										//$mail->addCc('emailAddress', 'nameUser');
										$mail->getMail()->setSubject('[PEMBATALAN REQUEST] - '.$rs_purchaseletter['data'][0]['cluster_code'].' / '.$rs_purchaseletter['data'][0]['unit_unit_number']);
										$mail->getMail()->send();
									}
									catch ( Zend_Mail_Exception $e ) {
										//$return['success'] = 'email_failed';
									} 
								}
							}
						}
					}
				}
				
			} catch(Exception $e) { var_dump($e->getMessage());  }			
		}
		return $return;
    }

    function cancellationUpdate($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				
				$buyback_interest_persen = 0.00;
				if($param['buyback_interest_persen'] != ''){
					$buyback_interest_persen = $param['buyback_interest_persen'];
				}
				
				$data = array (
					$param['cancellation_id'], 
					$param['purchaseletter_id'], 
					$param['unit_id'], 
					$param['customer_id'], 
					$param['cancellation_no'], 
					$param['cancelreason_id'], 
					$param['cancellation_date'], 
					$param['totalpayment'], 
					$param['lostpayment'], 
					$param['returnpayment'], 
					$param['is_buyback'], 
					$param['buyback_installment'], 
					$buyback_interest_persen, 
					$param['buyback_interest'], 
					$param['buyback_denda'], 
					$param['note'], 
					$this->session->getUserId(),
					'1'
				);
				$result = $this->execSP3('sp_cancellation_update', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }

    function cancellationDelete($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			$key_name = 'cancellation_id';
			$param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
			foreach($param as $key=>$val){ if (is_array($val)){ $param[$key_name] .= $val[$key_name].','; }	}		
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_cancellation_destroy', $param[$key_name], $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function cancellationprintoutRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$result = $this->execSP2('sp_cancellation_printout_read', 
					$param['cancellation_id'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId()
				);	
				$return['data'] = $result;			
				$return['success'] = true;		
			} catch(Exception $e) { }
		}		
		return $return;
    }
	
	function cancellationApproveReject($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param)){
			try {
				
				$statusMsg = '';
				
				if($param['status'] == 'approve'){
					$statusMsg = 'APPROVE';
					
					$msg = $this->cekTanggal($param['cancellation_date']);
				
					if($msg != ''){
						$return['msg'] = $msg;
						$return['success'] = false;
						
					} else {
						$data = array (
							$param['cancellation_id'], 
							$param['purchaseletter_id'], 
							$param['unit_id'], 
							$param['customer_id'], 
							$param['status'], 
							$this->session->getUserId(),
							'1'
						);
						$result = $this->execSP3('sp_cancellation_approve_reject', $data);
						$return['total'] = $result[0];
						$return['success'] = $result[0]>0;		
					}
				} else {
					$statusMsg = 'REJECT';
					
					$data = array (
						$param['cancellation_id'], 
						$param['purchaseletter_id'], 
						$param['unit_id'], 
						$param['customer_id'], 
						$param['status'], 
						$this->session->getUserId(),
						'1'
					);
					$result = $this->execSP3('sp_cancellation_approve_reject', $data);
					$return['total'] = $result[0];
					$return['success'] = $result[0]>0;
				}
				
				//send email if approve / reject
				$config_sh = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
				$sh_feature = $config_sh->activateSh1Features('cancellation_approve_sendemail');
				
				if($sh_feature == 1){
					if($return['success']){
						$emailAddress = '';
						$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
						$post_data['start'] = 0;
						$post_data['limit'] = 0;
						$post_data['parametername'] = 'CANCELLATIAN_APPROVE_SENDEMAIL';
						$post_data['value'] = '';
						$post_data['datatype'] = '';
						$post_data['description'] = '';
						$rs_app_sendmail = $model_masterparameterglobal->masterparameterglobalRead($post_data);
						
						if($rs_app_sendmail['total'] > 0){
							$emailAddress = Zend_Json::encode($rs_app_sendmail['data'][0]['value']);
							$listEmail = explode(",", $emailAddress);
							
							$model_purchaseletter = new Erems_Models_Purchaseletter();
							$post_data['purchaseletter_id'] = $param['purchaseletter_id'];
							$rs_purchaseletter = $model_purchaseletter->purchaseletterdetailRead($post_data);
							//var_dump($rs_purchaseletter);exit;
							try{
								$message = '<html><body>';
								$message .= '<p>Dear Bapak / Ibu,</p>';
								$message .= "<p>Permohonan PEMBATALAN berikut yang diajukan dari EREMS APPLICATION telah di ".$statusMsg."</p>";
								$message .= "Kawasan / Cluster: <strong>".$rs_purchaseletter['data'][0]['cluster_code']." / ".$rs_purchaseletter['data'][0]['cluster_cluster']."</strong><br>";
								$message .= "Block / Unit No : <strong>".$rs_purchaseletter['data'][0]['unit_unit_number']."</strong><br>";
								$message .= "Purchaseletter No : <strong>".$rs_purchaseletter['data'][0]['purchaseletter_no']."</strong><br>";
								$message .= "Purchase Date : <strong>".date("d-m-Y", strtotime($rs_purchaseletter['data'][0]['purchase_date']))."</strong><br>";
								$message .= "Customer Name : <strong>".$rs_purchaseletter['data'][0]['customer_name']."</strong><br>";
								$message .= "Sales Name : <strong>".$rs_purchaseletter['data'][0]['salesman_name']."</strong><br>";
								$message .= "Cancellation Date : <strong>".date("d-m-Y", strtotime($param['cancellation_date']))."</strong><br>";
								$message .= "Tanggal ".$statusMsg." : <strong>".date("d-m-Y")."</strong><br>";
								$message .= "Username ".$statusMsg." : <strong>".$this->session->getUserName()."</strong><br>";
                                                                $message .= "Proyek : <strong>".$rs_purchaseletter['data'][0]['unit_project_name']."</strong><br>";
								$message .= "<p>&nbsp;</p>";
                                                               
                                                                //edit by imaam on 20190710
                                                                $message .= '<p> <br/>';
                                                                $message .= '<br/>';
                                                                $message .= '<br/>';
                                                                $message .= '<a href="https://ces.ciputragroup.com/">Login disini untuk melihat</a><br/>';
                                                                $message .= '<br/>';
                                                                $message .= '<br/>';
                                                                $message .= '</p>';
                                                                
								$message .= "<p>Regards,</p>";
								$message .= "EREMS APPLICATIONS";
								$message .= "</body></html>";
								
								$mail = new Erems_Box_Library_Email();
								$mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
								$mail->getMail()->setBodyHtml(nl2br($message));
								$mail->getMail()->addTo($listEmail, 'PIC');
								//$mail->addCc('emailAddress', 'nameUser');
								$mail->getMail()->setSubject('[PEMBATALAN-'.$statusMsg.'] - '.$rs_purchaseletter['data'][0]['cluster_code'].' / '.$rs_purchaseletter['data'][0]['unit_unit_number']);
								$mail->getMail()->send();
							}
							catch ( Zend_Mail_Exception $e ) {
								//$return['success'] = 'email_failed';
							}
						}
					}
				}
				
			} catch(Exception $e) { }
		}
		return $return;
    }
	
	function cekTanggal($cancellation_date){
		$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
		$post_data['start'] = 0;
		$post_data['limit'] = 0;
		$post_data['parametername'] = 'GLOBAL_TANGGAL_CLOSING';
		$post_data['value'] = '';
		$post_data['datatype'] = '';
		$post_data['description'] = '';
		$rs_tanggal = $model_masterparameterglobal->masterparameterglobalRead($post_data);
		$tglClosing = Zend_Json::encode(intval($rs_tanggal['data'][0]['value']));
		
		$firstDate = '';
		
		$inRange = 0;
		
		$msg = '';
		
		if($tglClosing > 0){
		
			$today = getdate();
			$todayDate = $today['mday'];
			$todayMonth = $today['mon'];
			$todayYear = $today['year'];

			$cancellationDate = $cancellation_date;
			$cancelDate = date('d', strtotime($cancellationDate));
			$cancelMonth = date('m', strtotime($cancellationDate));
			$cancelYear = date('Y', strtotime($cancellationDate));
			
			if($todayDate > $tglClosing){
				$firstDate = date('Y-m-01');
			} else {
				$firstDate = date("Y-m-01",strtotime("-1 month"));
			}
			
			$inRange = $this->check_in_range($firstDate, date('Y-m-d'), date("Y-m-d",strtotime($cancellationDate)));
			if(!$inRange){
				$msg = 'Cancellation Date harus diantara '.date("d-m-Y",strtotime($firstDate)).' dan '.date('d-m-Y');
			}
                //addby imaam on 20200903        
		} else if($tglClosing == -1){             
			$cancellationDate = date("Y-m-d",strtotime(date($cancellation_date)));
                        if (!($cancellationDate >= date('Y-m-01') && $cancellationDate <= date('Y-m-d'))) {
                            $msg = 'Cancellation Date harus diantara '.date("d-m-Y",strtotime(date('Y-m-01'))).' dan '.date('d-m-Y');
                        }            
		} else if($tglClosing == 0){
			if(date('Y-m-d', strtotime($cancellation_date)) > date('Y-m-d')){
				$msg = 'Cancellation Date tidak boleh lebih besar dari '.date('d-m-Y');
			}
		}
		return $msg;
	}
	
	function check_in_range($start_date, $end_date, $date_from_user)
	{
		// Convert to timestamp
		$start_ts = strtotime($start_date);
		$end_ts = strtotime($end_date);
		$user_ts = strtotime($date_from_user);
		
		// Check that user date is between start & end
		return (($user_ts >= $start_ts) && ($user_ts <= $end_ts));
	}
	
	function check_firstpurchasedate($firstpurchasedate, $cancellation_date)
	{
		// Convert to timestamp
		$start_ts = strtotime($firstpurchasedate);
		$end_ts = strtotime($cancellation_date);
		
		$msg = '';
		if($end_ts < $start_ts){
			$msg = 'Cancellation Date tidak boleh lebih kecil dari '.date('d-m-Y', strtotime($firstpurchasedate));
		}
		
		return $msg;
	}
	
	function check_purchaseletterrevision($purchaseletter_id)
	{
		$msg = '';
		try {
			$result = $this->execSP3('sp_cancellation_purchaseletterrevision_read', $purchaseletter_id);
			
			if($result[0]){
				$unit_number = $result[0][0]['unit_number'];
				$revisiontype = $result[0][0]['revisiontype'];
				$msg = 'Unit '.$unit_number.' tidak bisa dilakukan Pembatalan karena sedang menjalani proses '.$revisiontype;
			} 
			return $msg;
		} catch(Exception $e) { 
			var_dump($e->getMessage()); 
		}			
	}
        
        function getapprovalRead($param = array()){
        
            $hasil = array();
            $data = array (
                    $param['purchaseletter_id'], 
                    $param['verification_code'],
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId() 

            );
            $hasil = $this->execSP3('sp_verificationapproval_read', $data);   
//            var_dump($hasil);die();
            $return['totalRow'] = $hasil[0][0]['totalRow'];
            $return['data'] = $hasil[1];

            return $return;
        }

        function getpopupPpjbRead($param = array()){
            $hasil = array();
            $data = array (
                    $param['purchaseletter_id'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId() 

            );
            $hasil = $this->execSP3('sp_one_sppjb_read', $data);   

            $return['totalRow'] = count($hasil);
            $return['data'] = $hasil;

            return $return;
        }

        function getpopupSubrogasiRead($param = array()){
            $hasil = array();
            $data = array (
	            $param['unit_id'], 
				$this->session->getCurrentProjectId(), 
				$this->session->getCurrentPtId() 
            );
            $hasil = $this->execSP3('sp_one_buktipemilik_read', $data);   

            $return['totalRow'] = count($hasil);
            $return['data'] = $hasil;

            return $return;
        }

        // added by rico 01122022
	    function scheduleRead($param) {
	        $return['success'] = false;
			if (is_array($param) && count($param)){
				try {
					$data = array (
						$param['purchaseletter_id']
					);
					$result = $this->execSP3('sp_report_kartupiutang_listschedule', $data);	
		            $return['total'] = count($result);
		            $return['data'] = $result[0];	
					$return['success'] = true;				
				} catch(Exception $e) { 
					var_dump($e->getMessage()); 
				}
			}		
			return $return;
	    }

	    //add by dika 202221208
	    function cancellationAnulir($param = array()) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
								
				$data = array (
					$param['cancellation_id'], 
					$param['purchaseletter_id'], 
					$param['unit_id'], 
					$param['customer_id']
				);
				$result = $this->execSP3('sp_cancellation_anulir', $data);
				$return['total'] = $result[0];
				$return['success'] = $result[0]>0;			
			} catch(Exception $e) { }
		}
		return $return;
    }
}

?>