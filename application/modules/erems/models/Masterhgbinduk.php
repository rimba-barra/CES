<?php

class Erems_Models_Masterhgbinduk extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 'm_hgbinduk';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function masterhgbindukRead($param) {
//        $return['success'] = false;
//        if (is_array($param) && count($param)) {
//            try {
////                $resultcount = $this->execSP('sp_hgbinduk_count', $param['hgbinduk_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['hgbinduk'], $param['is_hpl']);
//                $resultdata = $this->execSP('sp_hgbinduk_new_read',
//                                            $param['hgbinduk_id'], 
//                                            $this->session->getCurrentProjectId(), 
//                                            $this->session->getCurrentPtId(), 
//                                            $param['code'], 
//                                            $param['hgbinduk'], 
//                                            $param['is_hpl'], 
//                                            $param['start'], 
//                                            $param['limit']);
//
//                $return['total'] = $resultcount[0]['RECORD_TOTAL'];
//                $return['data'] = $resultdata;
//                $return['success'] = true;
//            } catch (Exception $e) {
//                var_dump($e->getMessage());
//            }
//        }
//        return $return;
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $param['hgbinduk_id'], 
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(), 
                                $param['code'], 
                                $param['hgbinduk'], 
                                $param['is_hpl'],
                                '0',
                                $param['start'], 
                                $param['limit'],
                                $param['page']
                        );
                        $result = $this->execSP3('sp_hgbinduk_new_read', $data);				
                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[1];			
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		
        return $return;
    }
	
	function masterhgbindukdetailRead($param){
       $return['success'] = false;
       if (is_array($param) && count($param)) {
           try {
               $resultcount = $this->execSP('sp_hgbinduk_count', $param['hgbinduk_id'], $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['code'], $param['hgbinduk'], $param['is_hpl']);
               $resultdata = $this->execSP('sp_hgbinduk_read',
                                           $param['hgbinduk_id'], 
                                           $this->session->getCurrentProjectId(), 
                                           $this->session->getCurrentPtId(), 
                                           $param['code'], 
                                           $param['hgbinduk'], 
                                           $param['is_hpl'], 
                                           $param['start'], 
                                           $param['limit']);

               $return['total'] = $resultcount[0]['RECORD_TOTAL'];
               $return['data'] = $resultdata;
               $return['success'] = true;
           } catch (Exception $e) {
               var_dump($e->getMessage());
           }
       }
       return $return;
	}

    function masterhgbindukCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_hgbinduk_create', 
					$this->session->getCurrentProjectId(),
					$this->session->getCurrentPtId(), 
					$param['code'], 
					$param['hgbinduk'], 
					$param['kecamatan_id'], 
					$param['desa'], 
					$param['date'], 
					$param['gs'], 
					$param['gs_date'], 
					$param['luas'], 
                    $this->session->getUserId(),
					'1',
                    $param["nop_induk"],
					$param["jatuhtempo_date"],
					(($param["luas_sisa"]) ? $param["luas_sisa"] : 0),
					$param["akta_no"],
					$param["nib_no"],
					$param["project_id_owner"],
					$param["pt_id_owner"],
					$param["kelurahan"],
					$param["kecamatan"],
					$param["kabupaten"],
					$param["keterangan_1"],
					$param["keterangan_2"],
					$param["is_hpl"]
				);
                // $return['success'] = (bool) $affectedRow;
                $return = $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function masterhgbindukUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->execSP('sp_hgbinduk_update', 
					$param['hgbinduk_id'], 
					$param['code'], 
					$param['hgbinduk'], 
					$param['kecamatan_id'], 
					$param['desa'], 
					$param['date'], 
					$param['gs'], 
					$param['gs_date'], 
					$param['luas'], 
					$this->session->getUserId(),
					'1',
                    $param["nop_induk"],
					$param["jatuhtempo_date"],
					(($param["luas_sisa"]) ? $param["luas_sisa"] : 0),
					$param["akta_no"],
					$param["nib_no"],
					$param["project_id_owner"],
					$param["pt_id_owner"],
					$param["kelurahan"],
					$param["kecamatan"],
					$param["kabupaten"],
					$param["keterangan_1"],
					$param["keterangan_2"],
					$param["is_hpl"]
				);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function masterhgbindukDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'hgbinduk_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $affectedRow = $this->execSP('sp_hgbinduk_destroy', $param[$key_name], $this->session->getUserId());
                $return['total'] = $affectedRow;
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function exportData() {
        $return['success'] = false;
//        if (is_array($param) && count($param))
//        {
//                var_dump($param);
                try {

                        $sp_name = 'sp_hgbinduk_new_read';
   
                        $data = array (
                                
                                 '0', 
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(), 
                                '', 
                                '',
                                '', 
                                '1',
                                '1', 
                                '0',
                                '1'
                        );

                        $result = $this->execSP3($sp_name, $data);	

                        $return['data'] = $result;			
                        $return['success'] = true;		
                } catch(Exception $e) { }
//        }		
        return $return;
    }

}

?>
