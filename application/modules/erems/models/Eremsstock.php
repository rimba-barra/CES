<?php

class Erems_Models_Eremsstock extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = '';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function eremsstockRead($param) {
        $return['success'] = false;
        	
        return $return;
    }

    function eremsstockCreate($param = array()) {
        $return['success'] = false;
        
        return $return;
    }

    function eremsstockUpdate($param = array()) {
        $return['success'] = false;
        
        return $return;
    }

    function eremsstockDelete($param = array()) {
        $return['success'] = false;
       
        return $return;
    }
    
    function eremsstockIndexBlock($param = array()) {
        
//        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'],
                                '3~5'
                        );
                        $result = $this->execSP3('sp_tablestock_index_block', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[0];			
//                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		
        
//        var_dump($result);
        return $return;
    }

    function eremsstockIndex($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'] ,
                                '3~5'
                        );
                        $result = $this->execSP3('sp_tablestock_index', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[1];			
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		

        return $return;
    }
    
    function eremsstockIndexNomor($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'],
                                '3~5'
                        );
                        $result = $this->execSP3('sp_tablestock_index_nomor', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[0];				
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		

        return $return;
    }
    
    function eremsstockDetail($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['unit_id'],
//                                '3~5'
                        );
                        $result = $this->execSP3('sp_tablestock_detail', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[0];				
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		

        return $return;
    }

}

?>