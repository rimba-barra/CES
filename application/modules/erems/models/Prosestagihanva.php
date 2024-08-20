<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Prosestagihanva extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_unit';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function getAllSchedulebyVA($nova, $bank_name) {
		$return['success'] = false;
		
		try{
			$data = array (
					$nova." ",
					$bank_name
				);

			$result = $this->execSP3('sp_prosestagihanva_read', $data);
			// var_dump($result[0]); die();

            $return['purchaseletter'] = $result[0];
            $return['totalRow'] = $result[1];
            $return['data'] = $result[2];
            $return['success'] = true;
        } catch (Exception $e) {  /*var_dump($e->getMessage());*/ 
        }

		return $return;
	}

	function getParameter($proj, $pt, $name) {
		$return['success'] = false;
		
		try{
			$data = array (
					$proj,
					$pt,
					$name
				);

			$result = $this->execSP3('sp_global_parameter_read', $data);
			// var_dump($result[0]); die();

            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) {  /*var_dump($e->getMessage());*/ 
        }

		return $return;
	}

    function insertInstallmentPayment($param) { 
        $return['success'] = false;
		try {
			$data = array (
				$param['admin_id'],
				$param['payment_number'],
				$param['purchaseletter_id'],
				$param['paymentflag_id'],
				$param['paymentmethod_id'],
				$param['reference_no'],
				$param['payment'],
				$param['total'],
				$param['payment_date'],
				$param['payment_duedate'],
				$param['payment_cairdate'],
				$param['note'],
				$param['is_rejected'],
				$param['admin_fee'],
				$param['denda'],
				$param['cdn'],
				$param['cdn_val'],
				$param['receipt_no'],
				$param['detail_id'],
				$param['detail_scheduleid'],
				$param['detail_paymenttype'],
				$param['detail_payment'],
				$param['detail_amount'],
				$param['detail_remaining_balance'],
				$param['detail_denda'],
				$param['detail_note'],
				$param['cust_name'],
				$param['cust_address'],
				$param['cust_city'],
				$param['cust_officephone'],
				$param['cust_homephone'],
				$param['cust_mobilephone'],
		        $param['is_debitnote'],				
		        $param['is_creditnote'],
				$param['debitnote'],
				$param['creditnote'],
				$param['project_id'],
				$param['pt_id'],
				$param['no_print']
			);			

			$result = $this->execSP3Prep('sp_installmentpayment_create', $data);
			// var_dump($result); die();

			$return['data'] = $result[0];
			$return['success'] = $result[0] > 0;
			$return['msg'] = "";	
		} catch(Exception $e) { 
			// var_dump($e->getMessage()); 
			// $return['success'] = false;
			$return['msg'] = $e->getMessage();
		}

		return $return;
    }

}

?>