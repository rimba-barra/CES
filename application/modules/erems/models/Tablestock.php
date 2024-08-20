<?php

class Erems_Models_Tablestock extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
    protected $_name = '';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function tablestockRead($param) {
        $return['success'] = false;
        	
        return $return;
    }

    function tablestockCreate($param = array()) {
        $return['success'] = false;
        
        return $return;
    }

    function tablestockUpdate($param = array()) {
        $return['success'] = false;
        
        return $return;
    }

    function tablestockDelete($param = array()) {
        $return['success'] = false;
       
        return $return;
    }
    
    function tablestockIndexBlock($param = array()) {
        
//        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'],
                                '1~3~4~5~8~10~11'
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

    function tablestockIndex($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'],
                                '1~3~4~5~8~10~11'
                        );
                        $result = $this->execSP3('sp_tablestock_index', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[1];			
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		

        return $return;
    }
    
    function tablestockIndexNomor($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['cluster_id'],
                                '1~3~4~5~8~10~11'
                        );
                        $result = $this->execSP3('sp_tablestock_index_nomor', $data);				
//                        $return['total'] = $result[0][0]['RECORD_TOTAL'];
                        $return['data'] = $result[0];				
                        $return['success'] = true;				
                } catch(Exception $e) { }
        }		

        return $return;
    }
    
    function tablestockDetail($param = array()) {
        
        $return['success'] = false;
        if (is_array($param) && count($param))
        {
                try {
                        $data = array (
                                $this->session->getCurrentProjectId(), 
                                $this->session->getCurrentPtId(),
                                $param['unit_id'],
//                                '1~3~4~5~8~10~11'
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