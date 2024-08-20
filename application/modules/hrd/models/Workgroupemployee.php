<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Workgroupemployee extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->setting = new Hrd_Models_General_Setup();
        $this->setting->_storeprocedure = 'sp_workgroupemployee';
    }

    function Read($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
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
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $valid = true;
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

    function Readdetail($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'readdetail';
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

    function Readdetailshift($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'readdetailshift';
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

    public function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if (isset($param['project_id']) > 0) {
                    //echo 'key project id ada';  
                    $this->setting->_project_id = $param['project_id'];
                }
                if (isset($param['pt_id']) > 0) {
                    //echo 'key pt id ada';   
                    $this->setting->_pt_id = $param['pt_id'];
                }

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        if ($valid == 'true') {
                            $data = $result[3][0];
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

    public function Createdetail($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'createdetail';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $data = null;
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

    public function Createdetailshift($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if($param['status_dayofweek']==false){
                    $param['status_dayofweek']=0;
                }
                
                $this->setting->_param = $param;
                
                $this->setting->_paramsql = 'createdetailshift';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $data = null;
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

    public function Update($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['workgroup_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'update':
                            $result = $this->setting->executeSP();
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];

                            if ($valid == 'true') {
                                if (empty($result[0][0])) {
                                    $d = null;
                                } else {
                                    $d = $result[0][0];
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

    public function Updatedetail($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'updatedetail';
                $this->setting->_iddatadetail = $param['workgroupdetail_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'update':
                            $result = $this->setting->executeSP();
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];

                            if ($valid == 'true') {
                                if (empty($result[0][0])) {
                                    $d = null;
                                } else {
                                    $d = $result[0][0];
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

    public function Updatedetailshift($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'updatedetailshift';
                $this->setting->_param['workgroupdetail_id'] = $param['workgroupdetail_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'update':
                            $result = $this->setting->executeSP();
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];

                            if ($valid == 'true') {
                                if (empty($result[0][0])) {
                                    $d = null;
                                } else {
                                    $d = $result[0][0];
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

    function Delete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'workgroup_id';
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

    function Deletedetail($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'workgroupdetail_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_iddatadetail = $param[$key_name];
                $this->setting->_paramsql = 'deletedetail';
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

    function Deletedetailshift($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'workgroupdetailshift_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $this->setting->_param['workgroupdetailshift_id'] = $param[$key_name];
                $this->setting->_paramsql = 'deletedetailshift';
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
