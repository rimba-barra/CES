<?php

class Erems_Models_Schedulebiayalainlain extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'th_biayalainlain';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
	
    function schedulebiayalainlainRead($param){
	   $return['success'] = false;
        
        if (is_array($param) && count($param)) {

            try {
                $data = array(
                    $param['unit_number'],
                    $param['cluster_id'],
                    $param['block_id'],
                    $param['customer_name'],
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    $param['limit'],
                    $param['page'],
                    $param['virtual_account'],
                    $param['paymentflag_id']
                );

        		$result = $this->execSP3('sp_schedulebiayalainlain_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } 
            catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }

        return $return;
    }

    function detailschedulebiayalainlainRead($param){
        $return['success'] = false;        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['biayalainlain_id'],
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId()
                );

                $result = $this->execSP3('sp_schedulebiayalainlain_detail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['main_data'] = $result[2];
                $return['success'] = true;
            } 
            catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }

        return $return;
    }
    
    function schedulebiayalainlainCreate($param = array()){
        $return['success'] = false; 
        if (is_array($param) && count($param)) {

            $param_detail      = $param['details_data'];
            $due_date          = ''; 
            $scheduletype      = ''; 
            $termin            = ''; 
            $amount            = ''; 
            $remaining_balance = '';   

            if($param['paymenttype_paymenttype_id'] == 0){
                $return['success'] = false;
                $return['message'] = "Invalid payment type";
            }
            else{
                if (is_array($param_detail) && count($param_detail) > 0){
                    foreach ($param_detail as $idx => $data){
                        foreach ($data as $key => $value){
                            switch ($key){
                                case 'due_date': $due_date .= $value."~";break;
                                case 'scheduletype': $scheduletype .= $value."~";break;
                                case 'termin': $termin .= $value."~";break;
                                case 'amount': $amount .= $value."~";break;
                                case 'remaining_balance': $remaining_balance .= $value."~"; break;
                            }							
                        }				
                    };

                    $due_date = preg_replace('/(~)$/','',$due_date);
                    $scheduletype = preg_replace('/(~)$/','',$scheduletype);
                    $termin = preg_replace('/(~)$/','',$termin);
                    $amount = preg_replace('/(~)$/','',$amount);
                    $remaining_balance = preg_replace('/(~)$/','',$remaining_balance);
                }

                try {
                    $result = $this->execSP3('sp_schedulebiayalainlain_create', 
                        $this->session->getCurrentProjectId(), 
                        $this->session->getCurrentPtId(),
                        $param['paymentflag_id'],
                        $param['paymentflag_id'] == 2 ? $param['unit_unit_id'] : null,
                        $param['paymentflag_id'] == 3 ? $param['customer_customer_id'] : null,
                        $param['paymenttype_paymenttype_id'],
                        " " . $param['va_no'] ." ",
                        " " . $param['va_no_bca'] ." ",
                        $param['biayalainlain_total'],
                        $param['biayalainlain_time'],
                        $param['biayalainlain_value'],
                        $param['notes'],
                        $this->session->getUserId(),
                        //detail
                        $due_date,
                        $scheduletype, 
                        $termin, 
                        $amount, 
                        $remaining_balance
                    );

                    $return['total']   = $result[0];
                    $return['success'] = $result[0] > 0;
                } 
                catch (Exception $e) {  var_dump($e->getMessage()); }
            }
        }

        return $return;
    }

    function schedulebiayalainlainUpdate($param = array()){
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            
            $param_detail      = $param['details_data'];
            $due_date          = ''; 
            $scheduletype      = ''; 
            $termin            = ''; 
            $amount            = ''; 
            $remaining_balance = '';

            if($param['paymenttype_paymenttype_id'] == 0){
                $return['success'] = false;
                $return['message'] = "Invalid payment type";
            }
            else{           
                if (is_array($param_detail) && count($param_detail) > 0)
                {
                    foreach ($param_detail as $idx => $data)
                    {
                        foreach ($data as $key => $value)   
                        {
                            switch ($key){
                                case 'due_date': $due_date .= $value."~";break;
                                case 'scheduletype': $scheduletype .= $value."~";break;
                                case 'termin': $termin .= $value."~";break;
                                case 'amount': $amount .= $value."~";break;
                                case 'remaining_balance': $remaining_balance .= $value."~"; break;
                            }                           
                        }               
                    };

                    $due_date          = preg_replace('/(~)$/','',$due_date);
                    $scheduletype      = preg_replace('/(~)$/','',$scheduletype);
                    $termin            = preg_replace('/(~)$/','',$termin);
                    $amount            = preg_replace('/(~)$/','',$amount);
                    $remaining_balance = preg_replace('/(~)$/','',$remaining_balance);
                }
               
                try {
                    $result = $this->execSP3('sp_schedulebiayalainlain_update',
                        $this->session->getCurrentProjectId(), 
                        $this->session->getCurrentPtId(),
                        $param['biayalainlain_id'],
                        $param['paymentflag_id'] == 2 ? $param['unit_unit_id'] : null,
                        $param['paymentflag_id'] == 3 ? $param['customer_customer_id'] : null,
                        $param['paymenttype_paymenttype_id'],
                        " " . $param['va_no'] ." ",
                        " " . $param['va_no_bca'] ." ",
                        $param['biayalainlain_total'],
                        $param['biayalainlain_time'],
                        $param['biayalainlain_value'],
                        $param['notes'],
                        $this->session->getUserId(),
                        //detail
                        $due_date,
                        $scheduletype, 
                        $termin, 
                        $amount, 
                        $remaining_balance
                    );
                    $return['total'] = $result[0];
                    $return['success'] = $result[0] > 0;
                } 
                catch (Exception $e) { var_dump($e->getMessage()); }
            }
        }
        return $return;
    }    
    
    function schedulebiayalainlainDelete($param){
    	$return['success'] = false;
        $valid = false;
        if (is_array($param) && count($param)) {
            $key_name = 'biayalainlain_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            $valid = $this->validatorDelete($param[$key_name]);

            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . '~#~';
                    $valid = $this->validatorDelete($val[$key_name]);
                    if(!$valid){
                        break;
                    }
                }                
            }

            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);

            if($valid){
                try {
                    $affectedRow = $this->execSP('sp_schedulebiayalainlain_destroy', 
                        $param[$key_name], 
                        $this->session->getUserId()
                    );

                    $return['total'] = $affectedRow;
                    $return['success'] = (bool) $affectedRow;
                } catch (Exception $e) {

                }
            }
        }

        return $return;
    }      

    function validatorDelete($param) {
        $valid = false;
        try {
            $data = array(
                $param,
                $this->session->getCurrentProjectId(), 
                $this->session->getCurrentPtId()
            );

            $result = $this->execSP3('sp_schedulebiayalainlain_detail_read', $data);
            foreach ($result[1] as $val) {
                if($val['amount'] !== $val['remaining_balance']){
                    $valid = false;
                    break;
                }
                else{
                    $valid = true;
                }
            }
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
        return $valid;
    }    

    function paymenttypeallRead($param){
        $return['success'] = false;
        if (is_array($param) && count($param)){
            try {       
                $result = $this->execSP3('sp_schedulebiayalainlain_paymenttypeall_read',
                    '','','',
                    // $param['code'],
                    // $param['paymenttype'],
                    // $param['description'],
                    $param['start'], 
                    // $param['limit'], 
					9999,
                    $param['page']
                );

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];           
                $return['success'] = true;
            } 
            catch(Exception $e) { 
                var_dump($e->getMessage());
            }
        }
        return $return;
    }
    
    function unitschedulebllRead($param){
        $return['success'] = false;
        if (is_array($param) && count($param)){
            try {		
                $result = $this->execSP3('sp_schedulebiayalainlain_unit_read',
                    $param['unit_number'],
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'], 
                    $param['limit'], 
                    $param['page'],
                    $param['cluster_id'],
                    $param['unit_id']
                );

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];			
                $return['success'] = true;
            } 
            catch(Exception $e) { 
                var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function customerschedulebllRead($param){
        $return['success'] = false;
        if (is_array($param) && count($param)){
            try {       
                $result = $this->execSP3('sp_schedulebiayalainlain_customer_read',
                    $param['customer_id'],
                    $param['code'],
                    $param['name'],
                    $param['address'],
                    $param['KTP_number'],
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'], 
                    $param['limit'], 
                    $param['page']
                );

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];           
                $return['success'] = true;
            } 
            catch(Exception $e) { 
                var_dump($e->getMessage());
            }
        }
        return $return;
    }  

    // added by rico 23122021
    function newcustomer($param){
        $return['success'] = false;

        if (is_array($param) && count($param)){
            $customer_name  = empty($param['customer_name']) ? 0 : $param['customer_name'];
            $alamat         = empty($param['alamat']) ? 0 : $param['alamat'];
            $phone          = empty($param['phone']) ? 0 : str_replace('+', '', $param['phone']);
            $office_phone   = empty($param['office_phone']) ? 0 : str_replace('+', '', $param['office_phone']);
            $mobile_phone   = empty($param['mobile_phone']) ? 0 : str_replace('+', '', $param['mobile_phone']);
            $ktp_number     = empty($param['ktp_number']) ? 0 : $param['ktp_number'];
            $email          = empty($param['email']) ? '' : $param['email'];
            $npwp           = empty($param['npwp']) ? 0 : $param['npwp'];

            try {
                $result = $this->execSP3('sp_customerb_create',
                        $this->session->getUserId(), 
                        $this->session->getCurrentProjectId(), 
                        $this->session->getCurrentPtId(),
                        NULL,
                        $customer_name,
                        $alamat,
                        0,
                        NULL,
                        $phone,
                        $office_phone,
                        $mobile_phone,
                        NULL,
                        $ktp_number,
                        NULL,
                        NULL,
                        $npwp,
                        NULL,
                        NULL,
                        NULL,
                        0,
                        NULL,
                        0,
                        0,
                        0,
                        $email,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        0,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        0,
                        0,
                        0,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        0,
                        NULL,
                        NULL,
                        0,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        NULL
                );

                $return['success'] = true;
            } 
            catch(Exception $e) { 
                var_dump($e->getMessage());
            }
        }
        return $return;
    }  
}
?>