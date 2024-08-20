<?php

class Erems_Models_Formundanganajb extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	
    function formundanganajbRead($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['unit_number'],
                    $param['cluster_id'], 
                    $param['block_id'],
                    0,
                    $this->session->getCurrentProjectId(), 
//                    $this->session->getCurrentPtId(),
                    0,
                    $param['start'],
                    $param['limit'],
                    $param['page']
                    
                );

		$result = $this->execSP3('sp_undanganajb_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $return;
    }
    
    function formundanganajbdetailRead($param) {
        $return['success'] = false;
//        var_dump($param);        die();
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$param['hgbajb_id']
				);
				$result = $this->execSP3('sp_undanganajb_detail_read', $data);				
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
				
			}
		}		
		return $return;
    }
    
    function formundanganajbdetailCreate($param = array()) {
    //    var_dump($param);die();
        $hgbajb_id          = $param['hgbajb_id'];
        $unit_id            = $param['unit_id'];
        $buktipemilik_id    = $param['buktipemilik_id'];
        $undangan_date      = $param['undangan_date'];
        $janjian_ajb_date   = $param['janjian_ajb_date'];
        $email_1_date      = $param['email_1_date'];
        $email_2_date      = $param['email_2_date'];
        $email_3_date      = $param['email_3_date'];
        $email_4_date      = $param['email_4_date'];
        $surat_1_date      = $param['surat_1_date'];
        $surat_2_date      = $param['surat_2_date'];
        $surat_3_date      = $param['surat_3_date'];
        $surat_4_date      = $param['surat_4_date'];
        $wa_1_date      = $param['wa_1_date'];
        $wa_2_date      = $param['wa_2_date'];
        $wa_3_date      = $param['wa_3_date'];
        $wa_4_date      = $param['wa_4_date'];
        $wa_1_keterangan  = $param['wa_1_keterangan'];
        $wa_2_keterangan  = $param['wa_2_keterangan'];
        $wa_3_keterangan  = $param['wa_3_keterangan'];
        $wa_4_keterangan  = $param['wa_4_keterangan'];
        $description        = $param['description_undangan'];
        $respon_undanganajb_id  = $param['respon_undanganajb_id'];
        $is_got_email  = $param['is_got_email'];
        $jam_janjian_ajb = $param['jam_janjian_ajb'];
        
        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_undanganajb_detail_create', 
					$hgbajb_id, 
					$unit_id, 
					$buktipemilik_id, 
					$undangan_date, 
					$janjian_ajb_date, 
					$email_1_date, 
					$email_2_date, 
					$email_3_date, 
					$email_4_date, 
					$surat_1_date, 
					$surat_2_date, 
					$surat_3_date, 
					$surat_4_date, 
                    $wa_1_date, 
					$wa_2_date, 
					$wa_3_date, 
					$wa_4_date,
                    $wa_1_keterangan, 
					$wa_2_keterangan, 
					$wa_3_keterangan, 
					$wa_4_keterangan,  
                                        $param['email_1_status'],
                                        $param['email_2_status'],
                                        $param['email_3_status'],
                                        $param['email_4_status'],
                                        $param['surat_1_status'],
                                        $param['surat_2_status'],
                                        $param['surat_3_status'],
                                        $param['surat_4_status'],
                                        $param['wa_1_status'],
                                        $param['wa_2_status'],
                                        $param['wa_3_status'],
                                        $param['wa_4_status'],
					$description, 
                                        $respon_undanganajb_id,
                                        $is_got_email,
                                        $jam_janjian_ajb,
					$this->session->getUserId()
                );

                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $this->returned;
    }
    
    function formundanganajbdetailUpdate($param = array()) {
//        var_dump($param);die();
        $hgbajb_undangan_id = $param['hgbajb_undangan_id'];
        $undangan_date      = $param['undangan_date'];
        $janjian_ajb_date   = $param['janjian_ajb_date'];
        $email_1_date      = $param['email_1_date'];
        $email_2_date      = $param['email_2_date'];
        $email_3_date      = $param['email_3_date'];
        $email_4_date      = $param['email_4_date'];
        $surat_1_date      = $param['surat_1_date'];
        $surat_2_date      = $param['surat_2_date'];
        $surat_3_date      = $param['surat_3_date'];
        $surat_4_date      = $param['surat_4_date'];
        $wa_1_date      = $param['wa_1_date'];
        $wa_2_date      = $param['wa_2_date'];
        $wa_3_date      = $param['wa_3_date'];
        $wa_4_date      = $param['wa_4_date'];
        $wa_1_keterangan  = $param['wa_1_keterangan'];
        $wa_2_keterangan  = $param['wa_2_keterangan'];
        $wa_3_keterangan  = $param['wa_3_keterangan'];
        $wa_4_keterangan  = $param['wa_4_keterangan'];
        $description        = $param['description_undangan'];
        $respon_undanganajb_id  = $param['respon_undanganajb_id'];
        $is_got_email  = $param['is_got_email'];
        $jam_janjian_ajb = $param['jam_janjian_ajb'];
        
        // var_dump($respon_undanganajb_id);
        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP3('sp_undanganajb_detail_update', 
                                        $hgbajb_undangan_id,
					$undangan_date, 
					$janjian_ajb_date, 
					$email_1_date, 
					$email_2_date, 
					$email_3_date, 
					$email_4_date, 
					$surat_1_date, 
					$surat_2_date, 
					$surat_3_date, 
					$surat_4_date, 
                    $wa_1_date, 
					$wa_2_date, 
					$wa_3_date, 
					$wa_4_date,
                    $wa_1_keterangan, 
					$wa_2_keterangan, 
					$wa_3_keterangan, 
					$wa_4_keterangan,  
                                        $param['email_1_status'],
                                        $param['email_2_status'],
                                        $param['email_3_status'],
                                        $param['email_4_status'],
                                        $param['surat_1_status'],
                                        $param['surat_2_status'],
                                        $param['surat_3_status'],
                                        $param['surat_4_status'],
                                        $param['wa_1_status'],
                                        $param['wa_2_status'],
                                        $param['wa_3_status'],
                                        $param['wa_4_status'],
					$description, 
                                        $respon_undanganajb_id,
                                        $is_got_email,
                                        $jam_janjian_ajb,
					$this->session->getUserId()
                );

                $this->returned['total'] = $result[0];
                $this->returned['success'] = $result[0] > 0;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        return $this->returned;
    }
    
    function formundanganajbdetailDelete($param) {
	$return['success'] = false;
        if (is_array($param) && count($param)) {
                $key_name = 'hgbajb_undangan_id';
                $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
//                foreach ($param as $key => $val) {
//                        if (is_array($val)) {
//                                $param[$key_name] .= $val[$key_name] . ',';
//                        }
//                }
                $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
                try {
                        $affectedRow = $this->execSP('sp_undanganajb_detail_destroy', $param[$key_name], $this->session->getUserId());
                        $return['total'] = $affectedRow;
                        $return['success'] = (bool) $affectedRow;
                } catch (Exception $e) {

                }
        }
        return $return;
    }

    function formundanganajbexportexcel() { 
        $return['success'] = false;
		/*if (is_array($param) && count($param))
		{*/
			try {						
				$data = array (
                    $this->session->getCurrentProjectId(), 
//                    $this->session->getCurrentPtId(),
				);
				
				$result = $this->execSP3('sp_undanganajb_export_excel', $data);	
				//$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[0];			
				$return['success'] = true;		
			} catch(Exception $e) { var_dump($e->getMessage()); }
		//}		
		return $return;
    }

    //added by anas 27052021
    function printoutRead($param) {
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            try {
                $result = $this->execSP2('sp_undanganajb_printout_read',
                        $param['unit_id'],
                        $this->session->getUserId()
                );

                $return['data'] = $result;
                $return['success'] = true;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }


}

?>