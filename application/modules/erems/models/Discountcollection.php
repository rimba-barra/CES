<?php

class Erems_Models_Discountcollection extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_purchaseletter';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function discountcollectionRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['cluster_id'], 
					$param['block_id'], 
					// $param['kavling_number_start'], 
					// $param['kavling_number_end'], 
					$param['unit_number'],
					$param['customer_name'], 
					$param['purchase_startdate'], 
					$param['purchase_enddate'], 
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					$param['start'], 
					$param['limit']
				);
				$result = $this->execSP3('sp_discountcollection_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function discountcollectionscheduleRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['purchaseletter_id'], 
					''
				);
				$result = $this->execSP3('sp_schedule_read', $data);				
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}		
		return $return;
    }
	
	function discountcollectionscheduleUpdate($param = array()) {
		$return['success'] = false;
                $param_data = $param['data'];
                if (is_array($param) && count($param))
		{
			try {
				$schedule_id = ''; 
				$purchaseletter_id = ''; 
				$discount_persen = ''; 
				$discount = ''; 
				
				foreach ($param_data as $idx => $data)
				{
					if($data){
						foreach ($data as $key => $value)	
						{
							switch ($key){
								case 'schedule_id': $schedule_id .= intval($value)."~";break;//$value."~";break;
								case 'purchaseletter_id': $purchaseletter_id .= intval($value)."~";break;//$value."~";break;
								case 'discount_persen': $discount_persen .= doubleval($value)."~";break;//($value ? $value : 0)."~";break;
								case 'discount': $discount .= doubleval($value)."~";break;//($value ? $value : 0)."~";break;
							}							
						}
					}					
				};
				
				$schedule_id = preg_replace('/(~)$/','',$schedule_id);
				$purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
				$discount_persen = preg_replace('/(~)$/','',$discount_persen);
				$discount = preg_replace('/(~)$/','',$discount);
                                
				//get DISC_APPROVAL
				$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
				$post_data['start'] = 0;
        		$post_data['limit'] = 0;
				$post_data['parametername'] = 'DISC_APPROVAL';
				$post_data['value'] = '';
				$post_data['datatype'] = '';
				$post_data['description'] = '';
				$rs_approval = $model_masterparameterglobal->masterparameterglobalRead($post_data);
				$is_needApproval = preg_replace('/[^A-Za-z0-9-]/', '', Zend_Json::encode($rs_approval['data'][0]['value']));

				$affectedRow = $this->execSP2('sp_discountcollectionschedule_update', 
									$schedule_id,
									$purchaseletter_id, 
									$discount_persen,
									$discount,
									$is_needApproval,
								    $this->session->getUserId(),
								    '1',
                                                                    $param['isUsedVerification'],
                                                                    $param['duedate_dc']
								); 
				$return['success'] = (bool)$affectedRow['data'][0]['total_row'];
				$return['total'] = $affectedRow['data'][0]['total_row'];				
				
				if($is_needApproval == 1){
					$model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
					$post_data['start'] = 0;
					$post_data['limit'] = 0;
					$post_data['parametername'] = 'DISC_APP_SENDMAIL';
					$post_data['value'] = '';
					$post_data['datatype'] = '';
					$post_data['description'] = '';
					$rs_app_sendmail = $model_masterparameterglobal->masterparameterglobalRead($post_data);
					$is_sendEmail = preg_replace('/[^A-Za-z0-9-]/', '', Zend_Json::encode($rs_app_sendmail['data'][0]['value']));
					if($is_sendEmail == 1){
						
							$data = array (
								'', 
								'', 
								'', 
								$this->session->getCurrentProjectPtId(),
								'disc_approval_group', 
								0, 
								0
							);
							$result = $this->execSP3('sp_group_erems_user_read', $data);
							foreach ($result as $idx => $data)
							{
								foreach ($data as $key => $value)	
								{
									$fullName = $value['user_fullname']; 
									$emailAddress = $value['user_email']; 
									if($emailAddress){
										try{
											$message = '<html><body>';
											$message .= '<p>Dear Bapak / Ibu,</p>';
											$message .= "<p>Terdapat permohonan Discount Approval yang dibuat oleh user dari EREMS APPLICATION, mohon bantuan untuk followup permohonan tersebut</p>";
											$message .= "<p>&nbsp;</p>";
											$message .= "<p>Regards,</p>";
											$message .= "EREMS APPLICATIONS";
											$message .= "</body></html>";
											
											//$mail = new Erems_Libraries_Email();
											$mail = new Erems_Box_Library_Email();
											$mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
											$mail->getMail()->setBodyHtml(nl2br($message));
											$mail->getMail()->addTo($emailAddress, $fullName);
											//$mail->addCc('emailAddress', 'nameUser');
											$mail->getMail()->setSubject('Discount Approval Request');
											$mail->getMail()->send();
										}
										catch ( Zend_Mail_Exception $e ) {
											$return['success'] = 'email_failed';
										} 
									}
								}
							}		
					}
				}
								
				
			} catch(Exception $e) { var_dump($e->getMessage()); }
		}
		return $return;
    }
}

?>