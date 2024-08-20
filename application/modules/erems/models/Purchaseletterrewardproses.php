<?php
            

class Erems_Models_Purchaseletterrewardproses extends Zend_Db_Table_Abstract
{
	protected $_schema = 'erems';
	protected $_name = 'th_purchaseletter';
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	function purchaseletterrewardRead($param) {
		$return['success'] = false;
			
			if (is_array($param) && count($param)) {
				try {
					$data = array(
						$this->session->getCurrentProjectId(), 
						$this->session->getCurrentPtId(),
						$param['page'],
						$param['limit'],
						$param['purchaseletter_no'],
						$param['customer_name'],
						$param['unit_number'],
						'', // salesman
						'1900-01-01', // range tanggal purchase awal
						'2999-12-31', // range tanggal purchase akhir
						$param['unit_virtualaccount_bca'],
						$param['unit_virtualaccount_mandiri']
						
						
					);
	
					$result = $this->execSP3('sp_purchaseletterb_read', $data);
					$return['total'] = $result[0][0]['totalRow'];
					$return['data'] = $result[1];
					$return['success'] = true;
				} catch (Exception $e) { /* var_dump($e->getMessage()); */
				}
			}
			return $return;
		
	}

	function purchaseletterdetailRead($param) {
		$return['success'] = false;
			
			if (is_array($param) && count($param)) {
				try {
					$data = array(
						$param['purchaseletter_id'],
					);
	
					$result = $this->execSP3('sp_purchaseletterdetail_v3_read', $data);
					$return['total'] = $result[0][0]['totalRow'];
					$return['data'] = $result[1];
					$return['success'] = true;
				} catch (Exception $e) { /* var_dump($e->getMessage()); */
				}
			}
			return $return;
		
	}

	function purchaseletterrewarddetailRead($param) {
		$return['success'] = false;
			// var_dump($param['purchaseletter_id']); die();
			if (is_array($param) && count($param)) {
				try {
					$data = array(
						$param['purchaseletter_id'],
						$param['page'],
						$param['limit'],
					);
	
					$result = $this->execSP3('sp_purchaseletterrewarddetail_read', $data);
					$return['total'] = $result[0][0]['totalRow'];
					$return['data'] = $result[1];
					$return['success'] = true;
					// var_dump($result);die();
				} catch (Exception $e) { /* var_dump($e->getMessage()); */
				}
			}
			return $return;
		
	}
	
	function purchaseletterrewardCreate($param=array())
	{	
		$return['success'] = false;
		// var_dump($param); die();
		if (is_array($param) && count($param))
		{
            $purchaseletter_id = ''; 
            $purchaseletter_reward_id = ''; 
            $reward_id = ''; 
            $group_id = '';
            $amount = '';
            $deleted = '';
			$user_date_check= '';
			$user_date_proses= '';
			$note= '';
			$user_date_check_change= '';
			$user_date_proses_change= '';
            // var_dump($param);die();
            foreach ($param['data_detail'] as $val)
            {
				// var_dump($val);die();
                    foreach ($val as $key => $value)	
                    {
                            switch ($key){
                                    case 'purchaseletter_id': $purchaseletter_id .= $value."~";break;
                                    case 'purchaseletter_reward_id': $purchaseletter_reward_id .= $value."~";break;
                                    case 'reward_id': $reward_id .= $value."~";break;
                                    case 'group_id': $group_id .= $value."~";break;
                                    case 'amount': $amount .= $value."~";break;
                                    case 'deleted': $deleted .= $value."~";break;
									case 'user_date_check': $user_date_check .= $value."~";break;
									case 'user_date_proses': $user_date_proses .= $value."~";break;
									case 'note': $note .= $value."~";break;
									case 'user_date_check_change': $user_date_check_change .= $value."~";break;
									case 'user_date_proses_change': $user_date_proses_change .= $value."~";break;	

                            }							
                    }				
            };
			// die();


            $purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
            $purchaseletter_reward_id = preg_replace('/(~)$/','',$purchaseletter_reward_id);
            $reward_id = preg_replace('/(~)$/','',$reward_id);
            $group_id = preg_replace('/(~)$/','',$group_id);
            $amount = preg_replace('/(~)$/','',$amount);
            $deleted = preg_replace('/(~)$/','',$deleted);
			$user_date_check = preg_replace('/(~)$/','',$user_date_check);
			$user_date_proses = preg_replace('/(~)$/','',$user_date_proses);
			$note = preg_replace('/(~)$/','',$note);
			$user_date_check_change = preg_replace('/(~)$/','',$user_date_check_change);
			$user_date_proses_change = preg_replace('/(~)$/','',$user_date_proses_change);

			// var_dump($user_date_check_change); die();

		// 	try {
                                
		// 		$result = $this->execSP('sp_purchaseletterreward_create',
  //                                       $purchaseletter_reward_id,
		// 								$this->session->getUserId(),
		// 								$user_date_check,
		// 								$user_date_proses,
		// 								$user_date_check_change,
		// 								$user_date_proses_change
  //                                       );
                           
		// 		$return['success'] = $result;
		// 	} catch(Exception $e) { 
  //                           var_dump($e);
  //                       }
		// }

		try {
                                
				$result = $this->execSP('sp_purchaseletterrewardproses_create',
                                        $purchaseletter_reward_id,
										$this->session->getUserId(),
										$user_date_check,
										$user_date_proses,
										$user_date_check_change,
										$user_date_proses_change
                                        );
                           
				$return['success'] = $result;
			} catch(Exception $e) { 
                            var_dump($e);
                        }
		}
		// var_dump($result); die();
		return $return;
	}
	

}

?>