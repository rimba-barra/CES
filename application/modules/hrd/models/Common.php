<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Common extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Hrd_Models_General_Setup();
    }

    function RoutesAllRequest($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['mode_read']) {
                    case 'getdataemployee':
                        $return = $this->getdata_employee($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdataemployee_cleansing':
                        $return = $this->getdata_employee_cleansing($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdataemployeewithexection_for_employee_transfer':
                        $return = $this->getdata_employee_with_exception_for_employee_transfer($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdatashiftype':
                        $return = $this->getdata_shifttype($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdatastatusinformation':
                        $return = $this->getdata_statusinformation($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getjobfamily':
                        $return = $this->getdata_jobfamily($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getposition':
                        $return = $this->getdata_position($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getbanding':
                        $return = $this->getdata_banding($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'defaultdepartment':
                        $return = $this->getdata_department($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getgroupbyprojectpt':
                        $return = $this->getdata_group($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getgroupbyprojectpt_wcac':
                        $return = $this->getdata_group($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getalokasibiayabyprojectpt':
                        $return = $this->getdata_alokasibiaya($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getsectionbyprojectpt':
                        $return = $this->getdata_section($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdataallapprovalemployeetransfer':
                        $return = $this->getdata_approval_employee_transfer($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdatachangestatusdocument':
                        $return = $this->getdata_changestatus($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    
                    // added by Wulan Sari 2018.06.11
                    case 'getdataemployeedatasubholdingwithexception_for_reportto':
                        $return = $this->getdata_employeedatasubholdingwithexception_for_reportto($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    
                    // added by Wulan Sari 2018.12.11
                    case 'getalasanresign':
                        $return = $this->getdata_alasanresign($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    
                    // added by Wulan Sari 2020.06.03
                    case 'getptkp':
                        $return = $this->getdata_getptkp($param);
                        $data = $return['data'];
                        $counter = $return['total'];
                        $message = null;
                        $valid = true;
                        break;
                    
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = 'no action';
                }

                $return = array(
                    "success" => $valid,
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function getdata_employee($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => 'employeedataprojectpt',
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_employee_cleansing($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => 'employeedataprojectpt_cleansing',
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }
    

    public function getdata_employee_with_exception_for_employee_transfer($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'employeedataprojectptwithexception_for_employee_transfer',
            "subholding_id" => $this->setting->_subholding_id,
            "subholding_sub" => $this->setting->_subholding_sub,
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }
    
    // added by Wulan Sari 2018.06.11
    public function getdata_employeedatasubholdingwithexception_for_reportto($param) {        
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $param['project_id'];
        $this->setting->_pt_id = $param['pt_id'];
        $this->setting->_param = array(
            "hideparam" => 'employeedatasubholdingwithexception_for_reportto',
            "subholding_id" => $this->setting->_subholding_id,
            "subholding_sub" => $this->setting->_subholding_sub
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_alokasibiaya($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_section($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_approval_employee_transfer($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_group($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_department($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_statusinformation($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getdatastatusinformation',
            "statusinformation_id" => $param['statusinformation_id'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_shifttype($param) {
        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = array(
            "hideparam" => 'shifttypeprojectpt',
        );
        $result = $this->setting->executeSP();

        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_jobfamily($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_position($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_banding($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    public function getdata_changestatus($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
            "changestatus_id" => $param['changestatus_id'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }

        return $return;
    }

    // edited by wulan sari 20181210
    public function getdata_alasanresign($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }
        
        return $return;
    }
     

    // added by wulan sari 20200603
    public function getdata_getptkp($param) {
        $return = array("total" => 0, "data" => array());
        $this->setting->_storeprocedure = $this->setting->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => $param['mode_read'],
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return['total'] = $result[1][0]['RECORD_TOTAL'];
            $return['data'] = $result[2];
        }
        
        return $return;
    }

}
