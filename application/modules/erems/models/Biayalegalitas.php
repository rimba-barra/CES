<?php

class Erems_Models_Biayalegalitas extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	
    function biayalegalitasRead($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {

            try {
                $data = array(
                    $param['unit_number'],
                    $param['cluster_id'],
                    $param['block_id'],
                    $param['customer_name'],
                    0,
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    $param['limit'],
                    $param['page'],
                    $param['virtual_account']
                    
                );

		$result = $this->execSP3('sp_biayalegalitas_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function biayalegalitasCreate($param = array()) {
        if (is_array($param) && count($param)) {
            
            $param_detail = $param['details_data'];
            // var_dump($param); die();
            $due_date = ''; 
            $scheduletype = ''; 
            $termin = ''; 
            $amount = ''; 
            $remaining_balance = '';
           
            
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

                    $due_date = preg_replace('/(~)$/','',$due_date);
                    $scheduletype = preg_replace('/(~)$/','',$scheduletype);
                    $termin = preg_replace('/(~)$/','',$termin);
                    $amount = preg_replace('/(~)$/','',$amount);
                    $remaining_balance = preg_replace('/(~)$/','',$remaining_balance);
            }

            // var_dump($due_date.' '.$scheduletype.' '.$termin.' '.$amount.' '.$remaining_balance); die();
            try {
                $result = $this->execSP3('sp_biayalegalitas_create', 
					$param['purchaseletter_id'],
                    $param['va_no'],
                    $param['persentase'],
					$param['biayalegalitas_total'],
                    $param['biayalegalitas_time'],
                    $param['biayalegalitas_value'],
                    $due_date,
                    $scheduletype, 
                    $termin, 
                    $amount, 
                    $remaining_balance,
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
					$this->session->getUserId(),
                    $param['jenis_biaya_1'],
                    $param['jenis_biaya_2'],
                    $param['jenis_biaya_3'],
                    $param['jenis_biaya_4'],
                    $param['notes'],
                    $param['va_no_bca'],
                    $param['jenis_biaya_4'],
                    $param['biaya_ajb'],
                    $param['biaya_bphtb'],
                    $param['biaya_bbn'],
                    $param['is_use_biaya_ajb'],
                    $param['is_use_biaya_bphtb'],
                    $param['is_use_biaya_bbn']
                );
                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) {  var_dump($e->getMessage()); 
            }
        }
        return $this->returned;
    }
    
    function biayalegalitasUpdate($param = array()) {
        
        if (is_array($param) && count($param)) {
            
            $param_detail = $param['details_data'];
            $berkas_id = ''; 
            $berkas_surat_detail_id = ''; 
            $berkas_code = ''; 
            $berkas_name = ''; 
            $berkas_description = ''; 
            $berkas_status = '';
            $deleted_data = ''; 
            
//            var_dump($param); die();
            
            $berkas_status_all = array();
            $status_all = '';
            
            if (is_array($param_detail) && count($param_detail) > 0)
            {
                    foreach ($param_detail as $idx => $data)
                    {

                            foreach ($data as $key => $value)	
                            {
                                    switch ($key){
                                            case 'berkas_id': $berkas_id .= $value."~";break;
                                            case 'berkas_surat_detail_id': $berkas_surat_detail_id .= $value."~";break;
                                            case 'berkas_code': $berkas_code .= $value."~";break;
                                            case 'berkas_name': $berkas_name .= $value."~";break;
                                            case 'berkas_description': $berkas_description .= $value."~";break;
                                            case 'berkas_status': $berkas_status .= $value."~"; array_push($berkas_status_all,$value); break;
                                            case 'deleted': $deleted_data .= $value."~";break;
                                    }							
                            }				
                    };

                    $berkas_id = preg_replace('/(~)$/','',$berkas_id);
                    $berkas_surat_detail_id = preg_replace('/(~)$/','',$berkas_surat_detail_id);
                    $berkas_code = preg_replace('/(~)$/','',$berkas_code);
                    $berkas_name = preg_replace('/(~)$/','',$berkas_name);
                    $berkas_description = preg_replace('/(~)$/','',$berkas_description);
                    $berkas_status = preg_replace('/(~)$/','',$berkas_status);
                    $deleted_data = preg_replace('/(~)$/','',$deleted_data);
            }
            
            if (in_array('BELUM', $berkas_status_all)){
                $status_all = 'BELUM';
            } else {
                $status_all = 'SUDAH';
            }
            
//            var_dump($param['berkas_group_menu']); die();
            

            try {
                $result = $this->execSP3('sp_biayalegalitas_update',
                    $param['berkas_surat_id'],
                    $param['purchaseletter_id'],
                    $param['berkas_no'],
                    $param['berkas_date'],
                    $param['berkas_jatuhtempo_date'],
                    $param['berkas_group_menu'],
                    $status_all,
                    $berkas_surat_detail_id,
                    $berkas_id,
                    $berkas_code, 
                    $berkas_name, 
                    $berkas_description, 
                    $berkas_status, 
                    $deleted_data, 
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
					$this->session->getUserId()
                );

                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $this->returned;
    }
    
    function biayalegalitasDelete($param) {
    	$return['success'] = false;
        $valid = false;
        if (is_array($param) && count($param)) {
            $key_name = 'biayalegalitas_id';
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
                    $affectedRow = $this->execSP('sp_biayalegalitas_destroy', $param[$key_name], $this->session->getUserId());
                    $return['total'] = $affectedRow;
                    $return['success'] = (bool) $affectedRow;
                } catch (Exception $e) {

                }
            }
        }
        return $return;
    }
    
    function purchaseletterblRead($param)
    {
//            var_dump($param);            die();
            $return['success'] = false;
            if (is_array($param) && count($param))
            {
                    try {		
                            $result = $this->execSP3('sp_purchaseletterbl_read',$param['unit_id'],$param['customer_name'],$this->session->getCurrentProjectId(), $this->session->getCurrentPtId(),$param['start'], $param['limit'], $param['page'],$param['cluster_id']);
                            $return['total'] = $result[0][0]['RECORD_TOTAL'];
                            $return['data'] = $result[1];			
                            $return['success'] = true;
                    } catch(Exception $e) { 
                        var_dump($e->getMessage());
                    }
            }
            return $return;
    }
    
    function detailberkasRead($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['berkas_surat_id'],
                    0,
                    $param['start'],
                    $param['limit'],
                    $param['page']
                    
                );

		$result = $this->execSP3('sp_biayalegalitasdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    

    
    function printoutRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
                try {
                    $result = $this->execSP2('sp_biayalegalitas_printout_read',
                                    $param['biayalegalitas_id'],
                                    $this->session->getUserId()
                    );

                    $return['data'] = $result;
                    $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }

    function detailBiayalegalitasRead($param) {
        $return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['biayalegalitas_id'],
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId()
                );

                $result = $this->execSP3('sp_biayalegalitasdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['main_data'] = $result[2];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }

    function biayalegalitasUpdateWithNewRule($param = array()) {
        if (is_array($param) && count($param)) {
            
            $param_detail = $param['details_data'];
            // var_dump($param); die();
            $due_date = ''; 
            $scheduletype = ''; 
            $termin = ''; 
            $amount = ''; 
            $remaining_balance = '';
           
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

                    $due_date = preg_replace('/(~)$/','',$due_date);
                    $scheduletype = preg_replace('/(~)$/','',$scheduletype);
                    $termin = preg_replace('/(~)$/','',$termin);
                    $amount = preg_replace('/(~)$/','',$amount);
                    $remaining_balance = preg_replace('/(~)$/','',$remaining_balance);
            }

            // var_dump($due_date.' '.$scheduletype.' '.$termin.' '.$amount.' '.$remaining_balance); die();
           
            try {
                $result = $this->execSP3('sp_biayalegalitas_updateWithNewRule', 
                    $param['biayalegalitas_id'],
                    $param['purchaseletter_id'],
                    $param['va_no'],
                    $param['persentase'],
                    $param['biayalegalitas_total'],
                    $param['biayalegalitas_time'],
                    $param['biayalegalitas_value'],
                    $due_date,
                    $scheduletype, 
                    $termin, 
                    $amount, 
                    $remaining_balance,
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $this->session->getUserId(),
                    $param['jenis_biaya_1'],
                    $param['jenis_biaya_2'],
                    $param['jenis_biaya_3'],
                    $param['jenis_biaya_4'],
                    $param['notes'],
                    $param['va_no_bca'],
                    $param['jenis_biaya_5'],
                    $param['biaya_ajb'],
                    $param['biaya_bphtb'],
                    $param['biaya_bbn'],
                    $param['is_use_biaya_ajb'],
                    $param['is_use_biaya_bphtb'],
                    $param['is_use_biaya_bbn']
                );
                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) {  var_dump($e->getMessage()); 
            }
        }
        return $this->returned;
    }

    function validatorDelete($param) {
        $valid = false;
        try {
            $data = array(
                $param,
                $this->session->getCurrentProjectId(), 
                $this->session->getCurrentPtId()
            );

            $result = $this->execSP3('sp_biayalegalitasdetail_read', $data);
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
}

?>