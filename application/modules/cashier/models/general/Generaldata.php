<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_General_Generaldata extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    public $_session = null;
    public $_projectpt_id = 0;
    public $_project_id = 0;
    public $_pt_id = 0;
    public $_user_id = 0;
    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();
        $this->_function = new Cashier_Helpers_Functionmodule;
        $this->setting = new Cashier_Models_General_Setdata;
        $this->_sp_common = 'sp_commondata';
    }
    
    public function field_data($table){
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getfieldtable',           
            "table" => $table,           
        );
        $result = $this->setting->executeSP();
        return $result[0];        
    }
       
    
    public function txt($text){
        return "''".$text."''";
    }
    
    public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array($query));
        return $result;
    }

    public function extract_array($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            $keydata[] = $key;
            $values[] = $value;
            $setdata[] = $key . '=' . $value;
            $where[] = ' AND ' . $key . '=' . $value;
        }
        
        $wherefix = "
                        WHERE 
                                active =1 
                            AND deleted =0 
                            AND project_id =$this->_project_id 
                            AND pt_id=$this->_pt_id 
                     ";
        $setwhere = $wherefix . implode(" ", $where);
        
        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => $setwhere,
            "wherefix" => $wherefix,
        );

        return $return;
    }

    function getconfig($module) {
        $base = substr(getcwd(), 0, -6) . 'application/modules/' . $module . '/configs/config.ini'; //get common config
        $file_contents = fopen($base, "r"); //read file config.ini
        $module_id = 0; //default value
        while (!feof($file_contents)) { //loop all text in config.ini
            $line_of_text = fgets($file_contents); //loop one line from text config.ini
            //filter text
            if (stripos($line_of_text, "module.id") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $module_id = str_replace("module.id=", "", $string); //remove text
            }
        }
        //set configuration from config.ini 
        $config = array(
            "module_id" => $module_id,
        );
        return $config;
    }

    function getEmployeebyId($idemployee) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getemployeedata',
            "employee_id" => $idemployee,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = array(
                'employee_id' => 0,
                'department_id' => 0,
                'manager_id' => 0,
            );
        }
        return $return;
    }


    function getUserdatabyid($userid) {
        $_function = new Cashier_Helpers_Functionmodule;
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $_param = array(
            "hideparam" => 'getuserdata',
            "user_id" => $userid,
            "parametersql" => "read"
        );
        // print_r($this->setting->_param); 
        $_xmldata = $_function->array_to_xml($_param);
        try {
            $result = $this->execSP3($this->_sp_common, $_xmldata);
        } catch (Exception $ex) {
            $message = $ex->getMessage();
            $return = array(
                'success' => false,
                'counter' => 0,
                'msg' => $message,
                'parameter' => 'error',
                'last_query' => 'EXEC ' .$this->_sp_common. ' ' .$_xmldata
            );
            echo json_encode($return);
            exit;
        }
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getPrefixCoa($voucherprefix_id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getprefixcoa',
            "voucherprefix_id" => $voucherprefix_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[1])) {
            $return = $result[1][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function getGlobalparam($project_id,$pt_id,$name) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        
        //override
        $this->setting->_pt_id = $pt_id;
        $this->setting->_project_id = $project_id;

        $this->setting->_param = array(
            "hideparam" => 'get_globalparam',
            "pt_id" => $pt_id,
            "project_id" => $project_id,
            "globalname" => $name 
        );
        $result = $this->setting->executeSP();
        if (!empty($result[1])) {
            $return = $result[1][0]['value'];
        } else {
            $return = 'default';
        }
        return $return;
    }

    function getGlobalparamV2($project_id,$name) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'get_globalparamV2',
            "project_id" => $project_id,
            "globalname" => $name 
        );
        $result = $this->setting->executeSP();
        if (!empty($result[1])) {
            $return = $result[1][0]['value'];
        } else {
            $return = 'default';
        }
        return $return;
    }

    function getMultisign($department_id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'get_multisign',
            "department_id" => $department_id
        );
        $result = $this->setting->executeSP();

        if (!empty($result[1])) {

            $iname = array();
            foreach ($result[1] as $r) {
                $iname[] = $r['initial_name'];
            }

            $return = $iname;
        } else {
            $return = 'default';
        }
        return $return;
    }

    function moduledata($param) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getmoduleincashier',
            "modulename" => $param,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = null;
        }
        return $return;
    }

    function moduledata_byid($id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getmodulecashierbyid',
            "moduletrx_id" => $id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

    function getcoabyid($id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getcoaglbyid',
            "coa_id" => $id
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

    function getcoa($coa) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'getcoagl',
            "coa" => $coa
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

    function getdatawithdynamictabledetailwithsort($table, $permalinkheader_id, $linkheader_id, $permalinkdetail_id, $linkdetail_id, $permalinksort, $sort) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'dynamictabledetail',
            "table" => $table,
            "permalink_id" => $permalinkheader_id,
            "link_id" => $linkheader_id,
            "permalinkdetail_id" => $permalinkdetail_id,
            "linkdetail_id" => $linkdetail_id,
            "permalink_sort" => $permalinksort,
            "sort" => $sort,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

    function getdatawithdynamictable($table, $permalink_id, $link_id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'dynamictable',
            "table" => $table,
            "permalink_id" => $permalink_id,
            "link_id" => $link_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }

        return $return;
    }

    function getdatawithdynamictableall($table, $permalink_id, $link_id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_param = array(
            "hideparam" => 'dynamictableall',
            "table" => $table,
            "permalink_id" => $permalink_id,
            "link_id" => $link_id,
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = 0;
        }

        return $return;
    }

    function getKelsubbyid($id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $id;
        $this->setting->_param = array(
            "hideparam" => 'getkelsubbyid',
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

    function getSubglbyid($id) {
        $this->setting->_storeprocedure = $this->_sp_common;
        $this->setting->_paramsql = 'read';
        $this->setting->_iddata = $id;
        $this->setting->_param = array(
            "hideparam" => 'getsubglbyid',
        );
        $result = $this->setting->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = 0;
        }
        return $return;
    }

}
