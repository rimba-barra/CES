<?php

class Erems_Models_Historysuratperingatan extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = 't_buktipemilik';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

	
    function historysuratperingatanRead($param) {
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
                    $param['start'],
                    $param['limit'],
                    $param['page']
                    
                );


		$result = $this->execSP3('sp_historysuratperingatan_read', $data);
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $result[1];
                $return['success'] = true;
            } catch (Exception $e) { /* var_dump($e->getMessage()); */
            }
        }
        // var_dump($result);die();
        return $return;
    }
    
    
    function detailRead($param) {
	$return['success'] = false;
        
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['suratperingatan_id'],
                    // 0,
                    $param['start'],
                    $param['limit'],
                    $param['page']
                    
                );

		$result = $this->execSP3('sp_historysuratperingatandetail_read', $data);
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
//        var_dump($param);die();
        if (is_array($param) && count($param)) {
                try {
                        $result = $this->execSP2('sp_historysuratperingatan_printout_read',
                                        $param['berkas_surat_id'],
                                        $this->session->getUserId()
                        );

                        $return['data'] = $result;
                        $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
    function printspr1outRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
                try {
                        $result = $this->execSP2('sp_historysuratperingatanspr1_printout_read',
                                        $param['berkas_spr_id'],
                                        $this->session->getUserId()
                        );
                        $return['data'] = $result;
                        $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
    function printspr2outRead($param) {
        $return['success'] = false;
//        var_dump($param);die();
        if (is_array($param) && count($param)) {
                try {
                        $result = $this->execSP2('sp_historysuratperingatanspr2_printout_read',
                                        $param['berkas_spr_id'],
                                        $this->session->getUserId()
                        );

                        $return['data'] = $result;
                        $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
    function printspr3outRead($param) {
        $return['success'] = false;
//        var_dump($param);die();
        if (is_array($param) && count($param)) {
                try {
                        $result = $this->execSP2('sp_historysuratperingatanspr3_printout_read',
                                        $param['berkas_spr_id'],
                                        $this->session->getUserId()
                        );

                        $return['data'] = $result;
                        $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
    function printspr4outRead($param) {
        $return['success'] = false;
//        var_dump($param);die();
        if (is_array($param) && count($param)) {
                try {
                        $result = $this->execSP2('sp_historysuratperingatan_pembatalan_read',
                                        $param['berkas_spr_id'],
                                        $this->session->getUserId()
                        );
//                        var_dump($result);die();
                        $return['data'] = $result;
                        $return['success'] = true;
                } catch (Exception $e) {

                }
        }
        return $return;
    }
    
    
    

}

?>