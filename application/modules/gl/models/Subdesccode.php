<?php

class Gl_Models_Subdesccode extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_subdsk';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }

    function subdesccodeRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'project') {
                    $result = $this->projectRead();
                    $arraydata = $result[1];
                } else if ($parameter == 'pt') {
                    $result = $this->ptRead();
                    $arraydata = $result[1];
                } else {
                    $result = $this->defaultRead($param);
                    $arraydata = $result[1];
                }

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                //var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function projectRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_project_read', $param);
        return $this->execSP3('sp_projectbylogin_read', $data);
    }

    function ptRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_pt_read', $param);
        return $this->execSP3('sp_ptbylogin_read', $data);
    }

    function defaultRead($param) {
         if(!isset($param['projectpt_id'])){
            $param['projectpt_id'] = 0;
        }

        $data = array(
            $param['subdsk_id'],
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['subdsk'],
            $param['description'],
            $param['start'],
            $param['limit'],
            $param['projectpt_id']
        );
        return $this->execSP3('sp_subdesccode_read', $data);
    }

    function subdesccodeCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];

                if ($parameter == 'checkexist') {
                   $result = $this->checkExist($param);
                   $tmp_total =0;
                }else if($parameter == 'importdata'){
                    $result = $this->importData($param);
                    $tmp_total =0;
                }else if($parameter == 'checkdatabyptproject'){
                    $result = $this->checkDatabyPtProject($param);
                    $tmp_total = $result[0][0]['RECORD_TOTAL'];
                }else {
                   $result = $this->defaultCreate($param);
                   $tmp_total =0;
                }

                
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['parameter'] = $parameter;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = $tmp_total;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function importData($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        $result = $this->execSP3('sp_subdesccode_import', $data);
        foreach ($result[0] as $row) {                       
            $dataimport = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $row["subdsk"],
                $row["description"],
                $this->session->getUserId(),
                '1'
            );
            $this->execSP3('sp_subdesccode_import_insert', $dataimport);
        }
        return 1;
    }   
    function checkDatabyPtProject($param){
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        return $this->execSP3('sp_subdesccode_checkdata', $data);
    }  
    function checkExist($param){
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['subdsk']." "
        );
         return $this->execSP3('sp_subdesccode_checkexist', $data);
    }
    function defaultCreate($param){
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['subdsk']." ",
                $param['description'],
                $this->session->getUserId(),
                '1'
            );
        return $this->execSP3('sp_subdesccode_create', $data);
    }

    function subdesccodeUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['subdsk_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['subdsk'],
                    $param['description'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_subdesccode_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function subdesccodeDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'subdsk_id';
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
                $result = $this->execSP3('sp_subdesccode_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['param'] = 'used';
                    $return['total'] = 0;
                } else {
                    $return['total'] = $result[0];
                    $return['success'] = true;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}

?>