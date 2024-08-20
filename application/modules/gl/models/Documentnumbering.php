<?php

class Gl_Models_Documentnumbering extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_subdsk';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
    }

    function documentnumberingRead($param) {
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
        $data = array(
            $param['documentnumber_id'],
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['module_name'],
            $param['format'],
            $param['start'],
            $param['limit'],
            $param['page']
        );
        return $this->execSP3('sp_documentnumbering_read', $data);
    }

    function documentnumberingCreate($param = array()) {
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
                   if ($result[0] == 1) {
                       $return['msg'] = "Data Saved Successfully!";
                   }
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
        $result = $this->execSP3('sp_documentnumbering_import', $data);
        foreach ($result[0] as $row) {                       
            $dataimport = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $row["subdsk"],
                $row["format"],
                $this->session->getUserId(),
                '1'
            );
            $this->execSP3('sp_documentnumbering_import_insert', $dataimport);
        }
        return 1;
    }   
    function checkDatabyPtProject($param){
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        return $this->execSP3('sp_documentnumbering_checkdata', $data);
    }  
    function checkExist($param){
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['module_name']
        );
         return $this->execSP3('sp_documentnumbering_checkexist', $data);
    }
    function defaultCreate($param){
            $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['year'],
                $param['month'],
                $param['module_name'],
                $param['format'],
                $param['counter'],
                $this->session->getUserId(),
                '1'
            );
        return $this->execSP3('sp_documentnumbering_create', $data);
    }

    function documentnumberingUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['documentnumber_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['module_name'],
                    $param['format'],
                    $param['counter'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_documentnumbering_update', $data);
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

    function documentnumberingDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'documentnumber_id';
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
                $result = $this->execSP3('sp_documentnumbering_destroy', $param[$key_name], $data);
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