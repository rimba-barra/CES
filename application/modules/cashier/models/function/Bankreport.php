<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Function_Bankreport extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $session;

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Cashier_Models_General_Generaldata();
        $this->setting = new Cashier_Models_General_Setdata;
        //end setup
        //start paramter
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        //end parameter  
        //start create temporary for report 
        $this->_tmp_report = 'tmp_rpt_bankreport';
        $this->_tbl_kasbankdetail = 'td_kasbankdetail';
        //end create temporary for report                
    }

    public function istext($text) {
        return "''" . $text . "''";
    }

    public function truncatetable() {
        $sql = "TRUNCATE TABLE $this->_tmp_report ";
        $result = $this->_model->customefromquery($sql);
    }

    function insertdata($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tmp_report ($key) VALUES ($values)  
               ";
        $return = $this->_model->customefromquery($sql);
        return $return;
    }

    function getprojectpt($sp, $param) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getprojectpt';
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getaccountheaderbyprojectpt($sp, $param,$project_id,$pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getaccountheaderbyprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdeptbyprojectpt($sp, $param, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getdeptbyprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getcoabydeptprojectpt($sp, $param, $project_id, $pt_id, $department_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getcoabydeptprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubbydept($sp, $param, $project_id, $pt_id, $department_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubbydept';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getkasbankbycoadeptprojectpt($sp, $param, $project_id, $pt_id, $department_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getkasbankbycoadeptprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        //print_r($result);
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getaccountkasbankbyprojectptcoa_id($sp, $param, $project_id, $pt_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getaccountkasbankbyprojectptcoaid';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubcoabydept($sp, $param, $project_id, $pt_id, $department_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubcoabydept';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['department_id'] = $department_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function totalsubcoa($sp, $param, $project_id, $pt_id, $coa_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'totalsubcoa';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $param['coa_id'] = $coa_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getkasbankbyprojectpt($sp, $param, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getkasbankbyprojectpt';
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdatadetailbyidheader($sp, $id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_iddata = $id;
        $this->setting->_paramsql = 'getkasbankdetailbykasbankid';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getsubtotalkasbank($sp, $id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_iddata = $id;
        $this->setting->_paramsql = 'getsubtotalkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getdatareportbyuserdate($sp) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'getdatareportbyuserdate';
        $this->setting->_param = array(
            "reportdate" => $this->_curdate,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandprojectpttotalkasbank($sp, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_paramsql = 'getgrandtotalprojectptkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function gettotalsubcompany($sp, $project_id, $pt_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_pt_id = $pt_id;
        $this->setting->_paramsql = 'gettotalsubcompanydept';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandproject($sp, $project_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_paramsql = 'getgrandprojectdept';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getgrandprojecttotalkasbank($sp, $project_id) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_project_id = $project_id;
        $this->setting->_paramsql = 'getgrandtotalprojectkasbank';
        $result = $this->setting->executeSP();
        if (!empty($result[0])) {
            $return = $result[0][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function showreportbyuser($sp, $param) {
        $this->setting->_storeprocedure = $sp;
        $this->setting->_paramsql = 'showreportbyuser';
        $param['reportdate'] = $this->_curdate;
        $this->setting->_param = $param;
        $result = $this->setting->executeSP();        
        //var_dump($result);
        if (!empty(end($result))) {
           // $return = end(end((end($result['dataprocess']))));
            $return =$result[1][0]['dataprocess'];
        } else {
            $return = null;
        }
        return $return;
    }

}
