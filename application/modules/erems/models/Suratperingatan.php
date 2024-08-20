<?php

class Erems_Models_Suratperingatan extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }


    function suratperingatanRead($param) {
       $return['success'] = false;
//        var_dump($param); die();
       if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['unit_number'],
                $param['cluster_id'],
//                    $param['block_id'],
                $param['customer_name'],
//                    $param['berkas_group'],
//                    0,
                $this->session->getCurrentProjectId(), 
                $this->session->getCurrentPtId(),
                isset($param['page']) && $param['page'] ? $param['page'] : 1,
                isset($param['limit']) && $param['limit'] ? $param['limit'] : 25,
                $param['page']

            );


            $result = $this->execSP3('sp_suratperingatan_read', $data);
            $return['total'] = $result[0][0]['totalRow'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function suratperingatanCreate($param = array()) {
    if (is_array($param) && count($param)) {
        $param_detail = $param['details_data'];
        $scheduletype_id = ''; 
        $termin = ''; 
        $duedate = ''; 
        $amount = '';
        $remaining_balance = ''; 
        $denda2 = '';
        $rest_denda = '';  


        if (is_array($param_detail) && count($param_detail) > 0)
        {
            foreach ($param_detail as $idx => $data)
            {

                foreach ($data as $key => $value)	
                {
                    switch ($key){
                        case 'scheduletype_id': $scheduletype_id .= $value."~";break;
                        case 'termin': $termin .= $value."~";break;
                        case 'duedate': $duedate .= $value."~";break;
                        case 'amount': $amount .= $value."~";break;
                        case 'remaining_balance': $remaining_balance .= $value."~";break;
                        case 'denda2': $denda2 .= $value."~";break;
                        case 'rest_denda': $rest_denda .= $value."~";break;
                    }							
                }				
            };

            $scheduletype_id = preg_replace('/(~)$/','',$scheduletype_id);
            $termin = preg_replace('/(~)$/','',$termin);
            $duedate = preg_replace('/(~)$/','',$duedate);
            $amount = preg_replace('/(~)$/','',$amount);
            $remaining_balance = preg_replace('/(~)$/','',$remaining_balance);
            $denda2 = preg_replace('/(~)$/','',$denda2);
            $rest_denda = preg_replace('/(~)$/','',$rest_denda);
        }
            // var_dump($param['total_remaining_balance']);die();


        try {
            $result = $this->execSP3('sp_suratperingatan_create', 
               $param['purchaseletter_id'],
               $param['unit_id'],
               $param['suratperingatan_date'],
               $param['suratperingatan_index'],
               $param['total_remaining_balance'],
               $param['total_remaining_denda'],
               $param['total_nilai'],
               $param['suratperingatan_next_date'],
               $param['notes'],
               $scheduletype_id,
               $termin, 
               $duedate, 
               $amount, 
               $remaining_balance,
               $denda2, 
               $rest_denda, 
               $this->session->getCurrentProjectId(), 
               $this->session->getCurrentPtId(),
               $this->session->getUserId()
           );
            $this->returned['total'] = $result[0];
            $this->returned['success'] = $result[0] > 0;
        } catch (Exception $e) {  /*var_dump($e->getMessage());*/
        }
    }
        // var_dump($result);die();
    return $this->returned;
}

function suratperingatansprCreate($param = array()) {
//        var_dump($this->session->getCurrentProjectId()); die();
//        var_dump($param);
    if (is_array($param) && count($param)) {

        $param_detail = $param['details_spr'];
        $berkas_code = ''; 
        $berkas_name = ''; 
        $berkas_description = ''; 
        $berkas_status = '';


        if (is_array($param_detail) && count($param_detail) > 0)
        {
            foreach ($param_detail as $idx => $data)
            {

                foreach ($data as $key => $value)	
                {
                    switch ($key){
                        case 'berkas_code': $berkas_code .= $value."~";break;
                        case 'berkas_name': $berkas_name .= $value."~";break;
                        case 'berkas_description': $berkas_description .= $value."~";break;
                        case 'berkas_status': $berkas_status .= $value."~";break;

                    }							
                }				
            };


            $berkas_code = preg_replace('/(~)$/','',$berkas_code);
            $berkas_name = preg_replace('/(~)$/','',$berkas_name);
            $berkas_description = preg_replace('/(~)$/','',$berkas_description);
            $berkas_status = preg_replace('/(~)$/','',$berkas_status);

        }


        try {
            $result = $this->execSP3('sp_suratperingatanspr_create', 
               $param['purchaseletter_id'],
               $param['berkas_surat_id'],
               $param['spr_no'],
               $param['spr_date'],
               $param['spr_index'],
               $param['spr_next_date'],
               $param['notes'],
               $berkas_code, 
               $berkas_name, 
               $berkas_description, 
               $berkas_status, 
               $this->session->getUserId()
           );

            $this->returned['total'] = $result[0];
            $this->returned['success'] = $result[0] > 0;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $this->returned;
}

function suratperingatanUpdate($param = array()) {

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
            $result = $this->execSP3('sp_suratperingatan_update',
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

function suratperingatanDelete($param) {
	$return['success'] = false;
    if (is_array($param) && count($param)) {
        $key_name = 'berkas_surat_id';
        $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
        foreach ($param as $key => $val) {
            if (is_array($val)) {
                $param[$key_name] .= $val[$key_name] . ',';
            }
        }
        $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
        try {
            $affectedRow = $this->execSP('sp_suratperingatan_destroy', $param[$key_name], $this->session->getUserId());
            $return['total'] = $affectedRow;
            $return['success'] = (bool) $affectedRow;
        } catch (Exception $e) {

        }
    }
    return $return;
}

function generateberkasRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                0,
                $this->session->getCurrentProjectId(), 
                $this->session->getCurrentPtId(),
                $param['start'],
                $param['limit'],
                $param['page']

            );

            $result = $this->execSP3('sp_suratperingatan_genmaster_read', $data);
            $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function gridberkassprRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['purchaseletter_id'],
                $param['berkas_surat_id'],
                0,
                $param['start'],
                $param['limit'],
                $param['page']

            );

            $result = $this->execSP3('sp_suratperingatanspr_read', $data);
            $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
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

            $result = $this->execSP3('sp_suratperingatandetail_read', $data);
            $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function griddetailsprRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['suratperingatan_id'],
                0,
                $param['start'],
                $param['limit'],
                $param['page']

            );

            $result = $this->execSP3('sp_suratperingatan_sprdetail_read', $data);
            $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function getsprindexRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['purchaseletter_id']
            );

            $result = $this->execSP3('sp_suratperingatan_sprindex_read', $data);
//                $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result;
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
        // var_dump($return); die();
    return $return;
}

function griddetailsprviewRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['berkas_spr_id']
            );

            $result = $this->execSP3('sp_suratperingatan_sprdetailview_read', $data);
//                $return['total'] = $result[0][0]['RECORD_TOTAL'];
//                var_dump($result[0]); die();
            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function printsprRead($param) {
    $return['success'] = false;
//        var_dump($param);die();
    if (is_array($param) && count($param)) {
        try {
            $result = $this->execSP2('sp_suratperingatan_printout_read',
                $param['purchaseletter_id'],
                $param['suratperingatan_id'],
                $this->session->getUserId()
            );
            $return['data'] = $result;
            $return['success'] = true;
        } catch (Exception $e) {

        }
    }
    return $return;
}

function printsprdetailRead($param) {
    $return['success'] = false;
//        var_dump($param);die();
    if (is_array($param) && count($param)) {
        try {
            $result = $this->execSP2('sp_suratperingatan_printout_detail_read',
                $param['suratperingatan_id']
            );
            $return['data'] = $result;
            $return['success'] = true;
        } catch (Exception $e) {

        }
    }
    return $return;
}


function printpembatalanRead($param) {
    $return['success'] = false;
//        var_dump($param);die();
    if (is_array($param) && count($param)) {
        try {
            $result = $this->execSP2('sp_suratperingatan_print_pembatalan_read',
                $param['suratperingatan_id'],
                $param['purchaseletter_id']
            );
//                        var_dump($result);die();
            $return['data'] = $result;
            $return['success'] = true;
        } catch (Exception $e) {

        }
    }
    return $return;
}

function sprRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['purchaseletter_id']
            );

            $result = $this->execSP3('sp_suratperingatan_spr_read', $data);
//                $return['total'] = $result[0][0]['RECORD_TOTAL'];
//                var_dump($result[0]); die();
            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function scheduleRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['purchaseletter_id']
            );

            $result = $this->execSP3('sp_suratperingatan_schedule_read', $data);
//                $return['total'] = $result[0][0]['RECORD_TOTAL'];
//                var_dump($result[0]); die();
            $return['data'] = $result[0];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}

function detailgridRead($param) {
	$return['success'] = false;

    if (is_array($param) && count($param)) {
        try {
            $data = array(
                $param['purchaseletter_id'],
                $param['tanggal_pembuatan'],
                $this->session->getCurrentProjectId(), 
                $this->session->getCurrentPtId(),
                $param['start'],
                $param['limit'],
                $param['page']

            );

            $result = $this->execSP3('sp_suratperingatan_detail_read', $data);
            $return['total'] = $result[0][0]['RECORD_TOTAL'];
            $return['data'] = $result[1];
            $return['success'] = true;
        } catch (Exception $e) { /* var_dump($e->getMessage()); */
        }
    }
    return $return;
}


}

?>