<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_VDApprovesubdetail extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();

        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_td_vouchersubdetail';
    }

    function VDApprovesubdetailRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[3][0]['RECORD_TOTAL'];
                        if (!empty($result[3][0]['RECORD_TOTAL'])) {
                            $data = $result[4];
                        } else {
                            $data = null;
                        }
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

    public function VDApprovesubdetailCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';              
                switch ($this->setting->_param['hideparam']) {
                    case 'subdetailcreate':
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['counterdata'];

                        if ($counter > 0) {
                            $valid = $result[2][0]['VALIDDATA'];
                            $counter = $result[3][0]['RECORD_TOTAL'];
                            $message = $result[4][0]['MSG'];
                        } else {
                            $valid = $result[3][0]['VALIDDATA'];
                            $counter = $result[4][0]['RECORD_TOTAL'];
                            $message = $result[5][0]['MSG'];
                        }

                        break;

                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function VDApprovesubdetailUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';               
                $this->setting->_iddata = $param['vouchersubdetail_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'subdetailupdate':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function VDApprovesubdetailDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'vouchersubdetail_id';
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
                $valid = $result[1][0]['VALIDDATA'];
                $counter = $result[2][0]['RECORD_TOTAL'];
                $message = $result[3][0]['MSG'];

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
