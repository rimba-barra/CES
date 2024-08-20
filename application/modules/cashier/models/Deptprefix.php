<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Deptprefix extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_m_deptprefix_h';
    }

    function DeptprefixRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    public function importData() {
        $arraydata = $this->setting->_param['department_id'];
        foreach ($arraydata as $row) {
            $department_id = $row;
            if ($department_id !== 'undefined') {
                $this->setting->_paramsql = 'create';
                $this->setting->_param['department_id'] = $department_id;
                $this->setting->_param['active'] = 1;
                $result = $this->setting->executeSP();
                $this->createDatadetail($department_id);
            }
        }
    }

    public function createDatadetail($department_id) {
        error_reporting(1);
        $execdata = $this->setting->getdatamanual_bytableparam($this->setting->_m_deptprefix_h, array(
            "project_id" => $this->setting->_project_id,
            "pt_id" => $this->setting->_pt_id,
            "department_id" => $department_id,
            "deleted" => '0',
        ));
        $result = $this->setting->getarray($execdata);
        if (!empty($result[0])) {
            $rowhead = $result[0];
            $execdatadept = $this->setting->getdatamanual_bytableparam($this->setting->_m_department, array(
                "project_id" => $this->setting->_project_id,
                "pt_id" => $this->setting->_pt_id,
                "department_id" => $department_id,
                "deleted" => '0',
            ));
            $resultdept = $this->setting->getarray($execdatadept);
            if (!empty($resultdept[0])) {
                $rowdept = $resultdept[0];

                $record = array(
                    "deptprefix_id" => $rowhead['deptprefix_id'],
                    "project_id" => $this->setting->_project_id,
                    "pt_id" => $this->setting->_pt_id,
                    "deptprefix" => $rowdept['code'],
                    "addby" =>  $this->setting->_user_id,
                    "addon" =>date('Y-m-d H:i:s'),
                );
                

                $execdatadetail = $this->setting->getdatamanual_bytableparam($this->setting->_m_deptprefix_d, array(
                    "deptprefix_id" => $rowhead['deptprefix_id'],
                    "project_id" => $this->setting->_project_id,
                    "pt_id" => $this->setting->_pt_id,
                    "deleted" => '0',
                ));
               
                $resultdetail = $this->setting->getarray($execdatadetail);
                if (empty($resultdetail[0])) {
                    $this->setting->insertmanual_byparamtable($this->setting->_m_deptprefix_d, $record);
                }
            }
        }
    }

    public function DeptprefixCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        if ($valid == 'true') {
                            $data = $result[5][0];
                        } else {
                            $data = null;
                        }
                        break;
                    case 'importdata':
                        $this->importData();
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $data = null;
                        $message = null;
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                        $data = null;
                }
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function DeptprefixUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['deptprefix_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'update':
                            $result = $this->setting->executeSP();
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];

                            if ($valid == 'true') {
                                if (empty($result[1][0])) {
                                    $d = null;
                                } else {
                                    $d = $result[1][0];
                                }
                                $data = $d;
                            } else {
                                $data = null;
                            }
                            break;
                        default:
                            $result = null;
                            $valid = false;
                            $counter = 1;
                            $message = 'data error';
                            $data = null;
                    }
                } else {
                    $result = null;
                    $valid = false;
                    $counter = 1;
                    $message = 'data error';
                    $data = null;
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function DeptprefixDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'deptprefix_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();
                $valid = $result[0][0]['VALIDDATA'];
                $counter = $result[1][0]['RECORD_TOTAL'];
                $message = $result[2][0]['MSG'];
                $return = array(
                    "success" => $valid,
                    "total" => $counter,
                    "msg" => $message,
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}
