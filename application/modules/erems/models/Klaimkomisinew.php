<?php

class Erems_Models_Klaimkomisinew extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	
    function klaimkomisinewRead($param) {
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
                    $param['page']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinew_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function klaimkomisinewdetailRead($param) {
	$return['success'] = false;
//        var_dump($param); die();
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id'],
                    0,
                    $this->session->getCurrentProjectId(), 
                    $this->session->getCurrentPtId(),
                    $param['start'],
                    $param['limit'],
                    $param['page']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinewdetail_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }    
    
    function klaimkomisinewdetailKomisiCairRead($param) {
        $return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinew_getdetail_komisicair', $data);
//                var_dump($result); die();
                $return = $result[0][0]['komisi_sudah_cair'];
//                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }    


    function klaimkomisinewDetail($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinew_getdetail', $data);
//                var_dump($result); die();
                $return = $result[0];
//                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function klaimkomisinewDetail2($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinew_getdetail2', $data);
//                var_dump($result); die();
                $return = $result[0];
//                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function klaimkomisinewGetupdate($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinewupdate_read', $data);
//                var_dump($result); die();
                $return = $result[0];
//                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function klaimkomisinewGetupdate2($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['purchaseletter_id']
                    
                );

		$result = $this->execSP3('sp_klaimkomisinewupdate2_read', $data);
//                var_dump($result); die();
                $return = $result[0];
//                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function klaimkomisinewCreate($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            
//            $param_detail = $param['details_spr'];
            $purchaseletter_id = ''; 
            $komisi_permintaan_id = ''; 
            $komisi_permintaan_detail_id = ''; 
            $pricetype_id = '';
            $persen_uangmasuk_coll = '';
            $persen_pencairan_komisi = '';
            $total_komisi = '';
            
            foreach ($param as $idx => $data)
            {

                    foreach ($data as $key => $value)	
                    {
                            switch ($key){
                                    case 'purchaseletter_id': $purchaseletter_id .= $value."~";break;
                                    case 'komisi_permintaan_id': $komisi_permintaan_id .= $value."~";break;
                                    case 'komisi_permintaan_detail_id': $komisi_permintaan_detail_id .= $value."~";break;
                                    case 'pricetype_id': $pricetype_id .= $value."~";break;
                                    case 'persen_uangmasuk_coll': $persen_uangmasuk_coll .= $value."~";break;
                                    case 'persen_pencairan_komisi': $persen_pencairan_komisi .= $value."~";break;
                                    case 'total_komisi': $total_komisi .= $value."~";break;

                            }							
                    }				
            };


            $purchaseletter_id = preg_replace('/(~)$/','',$purchaseletter_id);
            $komisi_permintaan_id = preg_replace('/(~)$/','',$komisi_permintaan_id);
            $komisi_permintaan_detail_id = preg_replace('/(~)$/','',$komisi_permintaan_detail_id);
            $pricetype_id = preg_replace('/(~)$/','',$pricetype_id);
            $persen_uangmasuk_coll = preg_replace('/(~)$/','',$persen_uangmasuk_coll);
            $persen_pencairan_komisi = preg_replace('/(~)$/','',$persen_pencairan_komisi);
            $total_komisi = preg_replace('/(~)$/','',$total_komisi);
            
//            var_dump($total_komisi);            die();

            try {
                $result = $this->execSP3('sp_klaimkomisinew_create', 
					$purchaseletter_id,
                                        $komisi_permintaan_id, 
                                        $komisi_permintaan_detail_id,
                                        $pricetype_id,
                                        $persen_uangmasuk_coll,
                                        $persen_pencairan_komisi,
                                        $total_komisi,
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
    
    function klaimkomisinewExist($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            try {
                $result = $this->execSP3('sp_klaimkomisinewexist_read', 
					$param['purchaseletter_id'],
                                        $param['pricetype_id']
                );
                
                $this->returned['exist1'] = $result[0][0]['EXIST1'];
                $this->returned['exist2'] = $result[1][0]['EXIST2'];
//                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
//        var_dump($this->returned);die();
        return $this->returned;
    }
    
    function klaimkomisinewUpdate1($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            
//            $param_detail = $param['details_spr'];
            $komisi_klaim_id = ''; 
            $komisi_sudah_cair = ''; 
            $persen_pencairan_komisi_awal = '';
            $persen_uangmasuk_coll = ''; 
            $persen_pencairan_komisi = ''; 
            $pricetype_id = '';
            $total_komisi = '';
            
            foreach ($param as $idx => $data)
            {

                    foreach ($data as $key => $value)	
                    {
                            switch ($key){
                                    case 'komisi_klaim_id': $komisi_klaim_id .= $value."~";break;
                                    case 'komisi_sudah_cair': $komisi_sudah_cair .= $value."~";break;
                                    case 'persen_pencairan_komisi_awal': $persen_pencairan_komisi_awal .= $value."~";break;
                                    case 'persen_uangmasuk_coll': $persen_uangmasuk_coll .= $value."~";break;
                                    case 'persen_pencairan_komisi': $persen_pencairan_komisi .= $value."~";break;
                                    case 'pricetype_id': $pricetype_id .= $value."~";break;
                                    case 'total_komisi': $total_komisi .= $value."~";break;

                            }							
                    }				
            };


            $komisi_klaim_id = preg_replace('/(~)$/','',$komisi_klaim_id);
            $komisi_sudah_cair = preg_replace('/(~)$/','',$komisi_sudah_cair);
            $persen_pencairan_komisi_awal = preg_replace('/(~)$/','',$persen_pencairan_komisi_awal);
            $pricetype_id = preg_replace('/(~)$/','',$pricetype_id);
            $persen_uangmasuk_coll = preg_replace('/(~)$/','',$persen_uangmasuk_coll);
            $persen_pencairan_komisi = preg_replace('/(~)$/','',$persen_pencairan_komisi);
            $total_komisi = preg_replace('/(~)$/','',$total_komisi);
            
//            var_dump($komisi_sudah_cair);            die();

            try {
                $result = $this->execSP3('sp_klaimkomisinew_update1', 
					$komisi_klaim_id,
                                        $komisi_sudah_cair, 
                                        $persen_pencairan_komisi_awal,
                                        $pricetype_id,
                                        $persen_uangmasuk_coll,
                                        $persen_pencairan_komisi,
                                        $total_komisi,
                                        $this->session->getCurrentProjectId(), 
                                        $this->session->getCurrentPtId(),
					$this->session->getUserId()
                );
                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
//                $this->returned['data'] = $result;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
//        var_dump($this->returned); die();
        return $this->returned;
    }
    
    function klaimkomisinewUpdate2($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            
//            $param_detail = $param['details_spr'];
            $komisi_klaim_id = ''; 
            $komisi_sudah_cair = ''; 
            $persen_pencairan_komisi_awal = '';
            $persen_uangmasuk_coll = ''; 
            $persen_pencairan_komisi = ''; 
            $pricetype_id = '';
            $total_komisi = '';
            
            foreach ($param as $idx => $data)
            {

                    foreach ($data as $key => $value)	
                    {
                            switch ($key){
                                    case 'komisi_klaim_id': $komisi_klaim_id .= $value."~";break;
                                    case 'komisi_sudah_cair': $komisi_sudah_cair .= $value."~";break;
                                    case 'persen_pencairan_komisi_awal': $persen_pencairan_komisi_awal .= $value."~";break;
                                    case 'persen_uangmasuk_coll': $persen_uangmasuk_coll .= $value."~";break;
                                    case 'persen_pencairan_komisi': $persen_pencairan_komisi .= $value."~";break;
                                    case 'pricetype_id': $pricetype_id .= $value."~";break;
                                    case 'total_komisi': $total_komisi .= $value."~";break;

                            }							
                    }				
            };


            $komisi_klaim_id = preg_replace('/(~)$/','',$komisi_klaim_id);
            $komisi_sudah_cair = preg_replace('/(~)$/','',$komisi_sudah_cair);
            $persen_pencairan_komisi_awal = preg_replace('/(~)$/','',$persen_pencairan_komisi_awal);
            $pricetype_id = preg_replace('/(~)$/','',$pricetype_id);
            $persen_uangmasuk_coll = preg_replace('/(~)$/','',$persen_uangmasuk_coll);
            $persen_pencairan_komisi = preg_replace('/(~)$/','',$persen_pencairan_komisi);
            $total_komisi = preg_replace('/(~)$/','',$total_komisi);
            
//            var_dump($total_komisi);            die();

            try {
                $result = $this->execSP3('sp_klaimkomisinew_update2', 
					$komisi_klaim_id,
                                        $komisi_sudah_cair, 
                                        $persen_pencairan_komisi_awal,
                                        $pricetype_id,
                                        $persen_uangmasuk_coll,
                                        $persen_pencairan_komisi,
                                        $total_komisi,
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
    
    function klaimkomisinewValidasi($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            try {
                $result = $this->execSP3('sp_klaimkomisinewvalidasi_read', 
					$param['purchaseletter_id']
                );
                
                $return = $result[0];
//                $this->returned['validasi'] = $result[0];
//                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
//        var_dump($this->returned);die();
        return $return;
    }
    
     function klaimkomisinewValidasi2($param = array()) {
        if (is_array($param) && count($param)) {
//            var_dump($param); die();
            try {
                $result = $this->execSP3('sp_klaimkomisinewvalidasi2_read', 
					$param['purchaseletter_id']
                );
                
                $return = $result[0];
//                $this->returned['validasi'] = $result[0];
//                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
//        var_dump($this->returned);die();
        return $return;
    }
    
   
    function klaimkomisinewDelete($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
                $key_name = 'komisi_permintaan_id';
                $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
                foreach ($param as $key => $val) {
                        if (is_array($val)) {
                                $param[$key_name] .= $val[$key_name] . ',';
                        }
                }
                $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
                // var_dump($param[$key_name]); var_dump($this->session->getUserId());        die();
                try {
                    $affectedRow = $this->execSP('sp_klaimkomisinew_destroy', $param[$key_name], $this->session->getUserId());
                    $return['total'] = $affectedRow;
                    $return['success'] = (bool) $affectedRow;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
   
//    function printoutRead($param) {
//        $return['success'] = false;
////        var_dump($param);die();
//        if (is_array($param) && count($param)) {
//                try {
//                        $result = $this->execSP2('sp_klaimkomisinew_printout_read',
//                                        $param['berkas_surat_id'],
//                                        $this->session->getUserId()
//                        );
//
//                        $return['data'] = $result;
//                        $return['success'] = true;
//                } catch (Exception $e) {
//
//                }
//        }
//        return $return;
//    }
    

}

?>