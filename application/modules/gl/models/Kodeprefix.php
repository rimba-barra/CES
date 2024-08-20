<?php

class Gl_Models_Kodeprefix extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_prefix';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');           
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }   

    function kodeprefixRead($param) { 
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            
           if($param['hideparam']=='customereset'){
               $is_casflow =0;
               $is_cashier =0;
               $openmonth =0;
           }else{
                $is_casflow =$param['is_cashflow'];
                $is_cashier =$param['is_cashier'];
                $openmonth =$param['openmonth'];
           }
            try {                
                if($param['hideparam']=='changeyear'){
                    $tmp = explode("_", $this->session->getSelectedDbApp());
                    $this->_schema = $tmp[0].'_'.$param['dbyear']. '.dbo';     
                }else{
                    $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
                }
                
                $data = array(                                        
                    1,
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['prefix_id'],
                    $param['prefix'],
                    $param['description'],
                    $is_casflow,
                    $is_cashier,
                    $openmonth,
                    $param['start'],
                    $param['limit']
                );  
                
                
                if($param['hideparam'] !=='livesearch'){
                    $result = $this->execSP3('sp_kodeprefix_read', $data);                   
                }else{
                     $result = $this->execSP3('sp_kodeprefix_search', $data);
                }    
                
                
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $this->clean_blackdiamondquestion($result[1]);
                $return['success'] = true;
            } catch (Exception $e) {                
                var_dump($e);
            }
        }
        return $return;
    }
    
     public function clean_blackdiamondquestion($data) {
        $arraydata = array();
        $result = $data;
        foreach ($result as $row) {  
            foreach ($row as $index => $value) {
               $row[$index] = utf8_encode($value); 
            }
            $arraydata[]=$row;
        }
        return $arraydata;
    }

    function kodeprefixCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                
                if ($parameter == 'checkexist') {
                    $sp = "sp_kodeprefix_checkexist";
                    $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param['prefix']                       
                       );
                }else{
                    $sp = "sp_kodeprefix_create";
                     $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param['prefix'],
                        $param['description'],
                        $param['is_cashflow'],
                        $param['is_cashier'],
                        $param['openmonth'],
                        $this->session->getUserId(),
                        '1'
                       );                    
                }
                
                $result = $this->execSP3($sp, $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['parameter'] = $parameter;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function kodeprefixUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['prefix_id'],
                    $param['prefix'],
                    $param['description'],
                    $param['is_cashflow'],
                    $param['is_cashier'],
                    $param['openmonth'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_kodeprefix_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function kodeprefixDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'prefix_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_kodeprefix_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}

?>