<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_General_Setdata extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    public $sqlsrvconnection = null;
    public $_name = null;
    public $_xmldata = null;
    public $_session = null;
    public $_param = null;
    public $_paramsql = null;
    public $_curdate = null;
    public $_storeprocedure = null;
    public $_iddata = 0;
    public $_projectpt_id = 0;
    public $_project_id = 0;
    public $_pt_id = 0;
    public $_user_id = 0;
    public $_module_id = 0;
    public $_group_id = 0;
    public $_lastactiveyear = null;
    public $_lastquery = null;
    public $_tabledata = null;
    /* start setting table */
    public $_schema_master = null;
    public $_schema_websec = null;
    public $_schema_gl = null;
    public $_schema_hrd = null;
    public $_schema_cashier = null;
    public $_m_project = null;
    public $_m_pt = null;
    public $_m_coa = null;
    public $_m_voucherprefix = null;
    public $_mh_vendor = null;
    public $_th_kasbank = null;
    public $_th_kasbon = null;
    public $_th_loan = null;
    public $_td_kasbankdetail = null;
    public $_td_kasbondetail = null;
    public $_td_kasbank_vendor = null;
    public $_m_grouptrans = null;
    public $_td_kasbank_kasbon = null;
    public $_td_loanpayment = null;
    public $_m_globalparam = null;
    public $_m_department = null;
    public $_m_prefix = null;
    public $_m_vendor = null;
    public $_th_kasbondept = null;
    public $_m_deptprefix_h = null;
    public $_m_deptprefix_d = null;
    public $_th_voucher = null;
    public $_td_voucherdetail = null;
    public $_md_vendor_bankacc = null;
    public $_m_kelsub = null;
    public $_m_subgl = null;
    public $_t_attachment = null;
    public $_m_employee = null;
    /* start added 31-01-2018 */
    public $_subholding_id = null;
    public $_function = null;

    /* start added 31-01-2018 */


    /* end setting table */

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->getGllastyear();
        /* start setup schema and table */
        $this->_schema_master = 'dbmaster.dbo.';
        $this->_schema_websec = 'dbwebsec.dbo.';
        $this->_schema_gl = 'gl_' . $this->_lastactiveyear . '.dbo.';
        $this->_schema_cashier = 'cashier.dbo.';
        $this->_schema_hrd = 'hrd.dbo.';

        $this->_sec_apps_group = $this->_schema_websec . 'sec_apps_group';
        $this->_sec_group_user = $this->_schema_websec . 'sec_group_user';
        $this->_m_project = $this->_schema_master . 'm_project';
        $this->_m_pt = $this->_schema_master . 'm_pt';
        $this->_m_coa = $this->_schema_gl . 'm_coa';
        $this->_m_prefix = $this->_schema_gl . 'm_prefix';
        $this->_m_voucherprefix = $this->_schema_cashier . 'm_voucherprefix';
        $this->_mh_vendor = $this->_schema_cashier . 'mh_vendor';
        $this->_th_kasbank = $this->_schema_cashier . 'th_kasbank';
        $this->_th_kasbon = $this->_schema_cashier . 'th_kasbon';
        $this->_td_kasbankdetail = $this->_schema_cashier . 'td_kasbankdetail';
        $this->_td_kasbondetail = $this->_schema_cashier . 'td_kasbondetail';
        $this->_td_kasbank_vendor = $this->_schema_cashier . 'td_kasbank_vendor';
        $this->_m_grouptrans = $this->_schema_cashier . 'm_grouptrans';
        $this->_td_kasbank_kasbon = $this->_schema_cashier . 'td_kasbank_kasbon';
        $this->_th_loan = $this->_schema_cashier . 'th_loan';
        $this->_td_loanpayment = $this->_schema_cashier . 'td_loanpayment';
        $this->_m_globalparam = $this->_schema_cashier . 'm_globalparam';
        $this->_m_vendor = $this->_schema_cashier . 'mh_vendor';
        $this->_m_department = $this->_schema_hrd . 'm_department';
        $this->_th_kasbondept = $this->_schema_cashier . 'th_kasbondept';
        $this->_m_deptprefix_h = $this->_schema_cashier . 'm_deptprefix_h';
        $this->_m_deptprefix_d = $this->_schema_cashier . 'm_deptprefix_d';
        $this->_th_voucher = $this->_schema_cashier . 'th_voucher';
        $this->_td_voucherdetail = $this->_schema_cashier . 'td_voucherdetail';
        $this->_md_vendor_bankacc = $this->_schema_cashier. 'md_vendor_bankacc';
        $this->_m_kelsub = $this->_schema_gl . 'm_kelsub';
        $this->_m_subgl = $this->_schema_gl . 'm_subgl';
        $this->_t_attachment = $this->_schema_cashier . 't_attachment';
        $this->_m_employee = $this->_schema_hrd . 'm_employee';

        /* end setup schema and table */
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_subholding_id = $this->_session->getcurrentSubholdingid();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();
        $this->_function = new Cashier_Helpers_Functionmodule;

        $this->_sp_common = 'sp_commondata';
        $this->_sp_getgllastyear = 'sp_getgllastyear';
        $this->_sp_checkoscashbon = 'sp_checkoscashbon';
    }

    function dataXml() {
        $this->getGllastyear();
        $this->get_groupid();
        $this->_param['currentdate'] = $this->_curdate;
        $this->_param['parametersql'] = $this->_paramsql;
        $this->_param['project_id'] = $this->_project_id;
        $this->_param['pt_id'] = $this->_pt_id;
        $this->_param['user_id'] = $this->_user_id;
        $this->_param['module_id'] = $this->_module_id;
        $this->_param['group_id'] = $this->_group_id;
        $this->_param['iddata'] = $this->_iddata;
        $this->_param['lastactiveyear'] = $this->_lastactiveyear;
        $result = $this->_function->array_to_xml($this->_param);
        $this->_xmldata = $result;
//        print_r($this->_param);
//        if($this->_param['hideparam']=='updateflagrequestmail'){
//           print_r($this->_storeprocedure.$this->_xmldata);
//       }
//       if($this->_param['hideparam']=='generatevouchernocash'){
//           print_r($this->_storeprocedure.$this->_xmldata);
//       }
        $this->_lastquery = ' EXEC ' . $this->_storeprocedure . "'" . $this->_xmldata . "'";
        //die();
        //print_r($this->_lastquery);
    }

    public function setDefaultProjectPt($param = null) {
        $project_id = 0;
        $pt_id = 0;
        if (isset($param['project_id'])) {
            if (!empty($param['project_id'])) {
                $pr_id = $param['project_id'];
            } else {
                $pr_id = $this->_session->getCurrentProjectId();
            }
            $project_id = $pr_id;
        } else {
            $project_id = $this->_session->getCurrentProjectId();
        }

        if (isset($param['pt_id'])) {
            if (!empty($param['pt_id'])) {
                $pt = $param['pt_id'];
            } else {
                $pt = $this->_session->getCurrentPtId();
            }

            $pt_id = $pt;
        } else {
            $pt_id = $this->_session->getCurrentPtId();
        }
        return array("project_id" => $project_id, "pt_id" => $pt_id);
    }

    function converttoXml() {
        $this->getGllastyear();
        $this->get_groupid();
        $this->_param['currentdate'] = $this->_curdate;
        $this->_param['parametersql'] = $this->_paramsql;
        $this->_param['project_id'] = $this->_project_id;
        $this->_param['pt_id'] = $this->_pt_id;
        $this->_param['user_id'] = $this->_user_id;
        $this->_param['module_id'] = $this->_module_id;
        $this->_param['group_id'] = $this->_group_id;
        $this->_param['iddata'] = $this->_iddata;
        $this->_param['lastactiveyear'] = $this->_lastactiveyear;
        $result = trim($this->_function->array_to_xml($this->_param));
        return $result;
    }

    public function array_to_xml_detail($array, $level = 1) {
        // default level 0
        $xml = ($level == 0) ? '<?xml version="1.0" encoding="ISO-8859-1"?>' . PHP_EOL : '';
        $tab = str_pad('', $level, '  ', STR_PAD_LEFT);
        foreach ($array as $node => $value) {
            $xml .= "{$tab}<{$node}>";
            if (!is_array($value)) {
                $xml .= $this->_function->clean_specialcaracter($value);
            } else {
                $level++;
                $xml .= PHP_EOL . $this->array_to_xml_detail($value, $level) . $tab;
            }
            $xml .= "</{$node}>" . PHP_EOL;
        }
        return '<detail>' . $xml . '</detail>';
    }

    function converttoXmldetail($data) {
        $result = trim($this->array_to_xml_detail($data));
        return $result;
    }

    public function createdatawithdetailXML($header, $detaildata) {
        unset($header['datadetail']);
        $tmphead = $this->Xmlparam($header);
        $tmphead2 = str_replace("</root>", "", $tmphead);
        $arraydetail = array();
        $tmphead2 .= '<details>';
        foreach ($detaildata as $row) {
            $arraydetail[] = $this->converttoXmldetail($row);
        }

        $detail = implode("", $arraydetail);
        $tmphead2 .= $detail;
        $tmphead2 .= '</details>';
        $tmphead2 .= '</root>';
        return $tmphead2;
    }

    function Xmlparam($param) {
        $param['iddata'] =  $this->_iddata;
        $param['currentdate'] =  $this->_curdate;
        $param['parametersql'] =  $this->_paramsql;
        $param['user_id'] =  $this->_user_id;
        $param['module_id'] =  $this->_module_id;
        $xml = $this->_function->array_to_xml($param);
        return $xml;
    }

    function dataXmlparam($param) {
        $this->_param['iddata'] = $this->_iddata;
        $this->_param['currentdate'] = $this->_curdate;
        $this->_param['parametersql'] = $this->_paramsql;
        $this->_param['project_id'] = $this->_project_id;
        $this->_param['pt_id'] = $this->_pt_id;
        $this->_param['user_id'] = $this->_user_id;
        $this->_param['module_id'] = $this->_module_id;
        $this->_xmldata = $param;
    }

    function executeSPwithparam($xml) {
        $result = null;
        $this->dataXmlparam($xml);
        $this->_lastquery = ' EXEC ' . $this->_storeprocedure . "'" . $this->_xmldata."'";
        try {
            $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
            //print_r($result);
            //print_r($this->_lastquery);
            return $result;
        } catch (Exception $exc) {
            $message = $exc->getMessage();
            $return = array(
                'success' => false,
                'counter' => 0,
                'msg' => $message,
                'parameter' => 'error',
                'lastaction' => $this->_lastquery,
            );

            echo json_encode($return);
            exit;
        }
    }

    function executeSP() {
        $this->dataXml();
        $this->_lastquery = ' EXEC ' . $this->_storeprocedure . ' ' . $this->_xmldata;
        try {
            $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
            return $result;
        } catch (Exception $ex) {
            $message = $ex->getMessage();
            $return = array(
                'success' => false,
                'counter' => 0,
                'msg' => $message,
                'parameter' => 'error',
                'lastaction' => $this->_lastquery,
            );
            echo json_encode($return);
            exit;
        }
    }

    function executeSPdebug() {
        $this->dataXml();
        $this->_lastquery = ' EXEC ' . $this->_storeprocedure . ' ' . $this->_xmldata;
        echo $this->_lastquery;
        try {
            $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
            return $result;
        } catch (Exception $ex) {
            $message = $ex->getMessage();
            $return = array(
                'success' => false,
                'counter' => 0,
                'msg' => $message,
                'parameter' => 'error',
                'lastaction' => $this->_lastquery,
            );
            echo json_encode($return);
            exit;
        }
    }

    public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array($query));
        return $result;
    }

    public function get_groupid() {
        $sql = "select 
                    a.user_id,a.projectpt_id,a.group_id,b.group_name,b.apps_id  
                from  $this->_sec_group_user a
                inner join $this->_sec_apps_group b on a.group_id = b.group_id
                where 
                    a.user_id = $this->_user_id
                and b.apps_id =$this->_module_id            
                ";
        $result = $this->customefromquery($sql);
        $row=array();
        if(isset($result[0][0])){
            $row = $result[0][0];
        }else{
            $row['group_id'] = 0;
            $row['projectpt_id'] = 0;
        }
        
        $this->_group_id = $row['group_id'];
        $this->_projectpt_id = $row['projectpt_id'];
    }

    public function get_defaultproject() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'defaultproject',
            "project_id" => $this->_session->getCurrentProjectId(),
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = array(
                'project_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
    }

    public function get_defaultpt() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'defaultpt',
            "pt_id" => $this->_session->getCurrentPtId(),
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = array(
                'pt_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
    }

    function getFixedcoa($param) {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getfixedcoa',
            "project_id" => $param['project_id'],
            "pt_id" => $param['pt_id'],
            "voucherprefix_id" => $param['voucherprefix_id']
        );
        $result = $this->executeSP();
        return $result[2][0];
    }

    function getUserdata() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getuserdata',
            "user_id" => $this->_user_id,
        );
        $result = $this->executeSP();
        if(!isset($result[2][0])){
            return array();
        }
        return $result[2][0];
    }

    function getGllastyear() {
        if($this->_lastactiveyear == 2018){
            $this->_lastactiveyear = 2018;
        }else{
            $result = $this->customefromquery("exec sp_getgllastyear");
            
            $excludes = array(      //ADALAH PROJECT2 YANG MASIH MEMAKAI GL TAHUNAN
                1,
                5,
                2084,
                4068,
                6105
            );
  
            if (in_array($this->_project_id, $excludes)) 
            { 
                $this->_lastactiveyear = $result[0][0]['dbapps_year'];
            } 
            else
            { 
                $this->_lastactiveyear = 2018; // nantinya semua akan kesini
            }

        }

    }

     function getOsCashbon($param) {
         $resultdata = $this->execSP3('sp_checkoscashbon', 
                                    $param['project_id'],
                                    $param['pt_id'],
                                    $param['user_id']
                                );

       return $resultdata;
        
    }

    function getHistory($param) {
         $resultdata = $this->execSP3('sp_trackingcashbon_read', 
                                    $param['kasbondept_id']
                                );

       return $resultdata;
        
    }

     function getPindahCoa($param) {
         $resultdata = $this->execSP3('sp_checkpindahcoa', 
                                    $param['project_id'],
                                    $param['pt_id']
                                );

       return $resultdata;
        
    }

     function getPindahCoaV2($param) {
         $resultdata = $this->execSP3('sp_checkpindahcoaV2', 
                                    $param['project_id'],
                                    $param['pt_id']
                                );

       return $resultdata;
        
    }

    function getEmployeedata() {
        $rowuser = $this->getUserdata(); // di sec user harus ada employee id
        $employee_id = $rowuser['employee_id'];
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getemployeedata',
            "employee_id" => $employee_id,
        );
        $result = $this->executeSP();
        //print_r($this->_lastquery);
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = array(
                'pt_id' => 0,
                'employee_id' => 0,
                'department_id' => 0,
                'manager_id' => 220,
            );
        }
        return $return;
    }

    function getUserdatabyid($userid) {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_user_id = $userid;
        $this->_param = array(
            "hideparam" => 'getuserdata',
            "user_id" => $userid,
        );
        $result = $this->executeSP();
        if(!isset($result[2][0])){
            return array();
        }
        return $result[2][0];
    }

    function getEmployeedatabyid($employee_id) {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getemployeedata',
            "employee_id" => $employee_id,
        );
        $result = $this->executeSP();
        //print_r($this->_lastquery);
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
    function getemployeebypt($param) {
        $pt_id = $param['pt_id'];
        $project_id = $param['project_id'];
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getemployeebypt',
            "project_id" => $project_id,
            "pt_id" => $pt_id,
        );
        $result = $this->executeSP();
        //print_r($this->_lastquery);
        if (!empty($result[2])) {
            $return = $result[2][0];
        } else {
            $return = array(
                'project_id' => 0,
                'pt_id' => 0,
                'employee_id' => 0,
                'department_id' => 0,
                'manager_id' => 0,
            );
        }
        return $return;
    }

     

    function getdata_standard($param) {
        $result = $this->extract_array_withcheck($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $this->_tabledata  $where  
               ";
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_standard_v2($param) {
        $result = $this->extract_array_allstring_sqlsrv($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $this->_tabledata  $where  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_standard_v3($param) {
        $result = $this->extract_array_allstring_sqlsrv_v2($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $this->_tabledata  $where  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_bytableparam_v2($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv_v2($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $table  $where  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_bytableparam($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $table  $where  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function executeQuery($sql) {
        $query = "
                    $sql
               ";
        $return = $this->customefromquery($query);
        return $return;
    }

    function insertdata($record) {
        $result = $this->extract_array_withcheck($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tabledata ($key) VALUES ($values)  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdatamanual($param) {
        $this->setConnection();
        $result = $this->extract_array_allstring($param);
        $where = $result['whereset'];
        $query = "
                 SELECT * FROM $this->_tabledata  $where  
               ";
        $return = $this->execquery($query);
        return $return;
    }

    function getdatamanual_bytableparam($table, $param) {
        $this->setConnection();
        $result = $this->extract_array_allstring($param);
        $where = $result['whereset'];
        $query = "
                 SELECT * FROM $table  $where  
               ";
        $return = $this->execquery($query);
        return $return;
    }

    function insertmanual($record) {
        $this->setConnection();
        $result = $this->extract_array_allstring($record);
        $key = $result['key'];
        $values = $result['values'];
        $query = "
                 INSERT INTO $this->_tabledata ($key) VALUES ($values)  
               ";
        $return = $this->execquery($query);
        return $return;
    }

    function insertdata_byparamtable($table, $record) {
        $result = $this->extract_array_withcheck($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $table ($key) VALUES ($values)  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function insertmanual_byparamtable($table, $record) {
        $this->setConnection();
        $result = $this->extract_array_allstring($record);
        $key = $result['key'];
        $values = $result['values'];
        $query = "
                 INSERT INTO $table ($key) VALUES ($values)  
               ";
        $return = $this->execquery($query);
        return $return;
    }

    function updatemanual($record, $whereset) {
        $this->setConnection();
        $resultdata = $this->extract_array_allstring($record);
        $resultwhere = $this->extract_array_allstring($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $query = "
                 UPDATE $this->_tabledata SET $data $where
               ";
        //echo $sql;
        $return = $this->execquery($query);
        return $return;
    }

    function deletemanual($whereset) {
        $resultwhere = $this->extract_array_allstring($whereset);
        $where = $resultwhere['whereset'];
        $query = "
                 DELETE FROM $this->_tabledata $where
               ";
        //echo $sql;
        $return = $this->execquery($query);
        return $return;
    }

    function updatedata($record, $whereset) {
        $resultdata = $this->extract_array_withcheck($record);
        $resultwhere = $this->extract_array_withcheck($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $this->_tabledata SET $data $where
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function update_bytableparam($table, $record, $whereset) {
        $resultdata = $this->extract_array_withcheck($record);
        $resultwhere = $this->extract_array_withcheck($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $table SET $data $where
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function deletedata($whereset) {
        $resultwhere = $this->extract_array_withcheck($whereset);
        $where = $resultwhere['whereset'];
        $sql = "
                 DELETE FROM $this->_tabledata $where
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    public function extract_array_allstring($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();


        foreach ($array as $key => $value) {
            if (!empty($value)) {
                $keydata[] = $key;
                $value = str_replace("'", "", $value);
                $value = "'" . $value . "'";
                $values[] = $value;
                $setdata[] = $key . '=' . $value;
                $where[] = ' AND ' . $key . '=' . $value;
            }
        }

        $firtwhere = str_replace("AND", '', $where[0]);
        $where[0] = $firtwhere;
        $setwhere = implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    public function extract_array_allstring_sqlsrv_v2($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();


        foreach ($array as $key => $value) {
            if (!empty($value)) {
                $keydata[] = $key;
                $value = str_replace("'", "", $value);
                $value = "''" . $value . "''";
                $values[] = $value;
                $setdata[] = $key . '=' . $value;
                $where[] = ' AND ' . $key . '=' . $value;
            }
        }

        $firtwhere = str_replace("AND", '', $where[0]);
        $where[0] = $firtwhere;
        $indexnext = count($where);
        $where[$indexnext] = "AND active=1";
        $where[$indexnext + 1] = "AND deleted=0";
        $setwhere = implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    public function extract_array_allstring_sqlsrv($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();


        foreach ($array as $key => $value) {
            if (!empty($value)) {
                $keydata[] = $key;
                $value = str_replace("'", "", $value);
                $value = "''" . $value . "''";
                $values[] = $value;
                $setdata[] = $key . '=' . $value;
                $where[] = ' AND ' . $key . '=' . $value;
            }
        }

        $firtwhere = str_replace("AND", '', $where[0]);
        $where[0] = $firtwhere;
        $setwhere = implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    public function extract_array_withcheck($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();


        foreach ($array as $key => $value) {
            if (!empty($value)) {
                $keydata[] = $key;
                $value = $this->checkdata($value);
                $values[] = $value;
                $setdata[] = $key . '=' . $value;
                $where[] = ' AND ' . $key . '=' . $value;
            }
        }

        $firtwhere = str_replace("AND", '', $where[0]);
        $where[0] = $firtwhere;
        $setwhere = implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    function checkdata($value) {
        if (is_numeric($value)) {
            return $value;
        } else {
            $txt = str_replace("'", ' ', $value);
            return "''" . $txt . "''";
        }
    }

    public function getcommonconfig() {
        $base = substr(getcwd(), 0, -6) . 'application/modules/main/configs/main.ini'; //get common config
        $file_contents = fopen($base, "r"); //read file main.ini
//        while(!feof($file_contents)) {
//        echo fgets($file_contents) . "<br>";
//      }
//      
        $dataconfig = array();
        while (!feof($file_contents)) { //loop all text in main.ini
            $line_of_text = fgets($file_contents); //loop one line from text main.ini
            $host = null;
            $username = null;
            $password = null;
            //filter text
            if (stripos($line_of_text, "resources.db.params.host") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['host'] = str_replace("resources.db.params.host=", "", $string); //remove text
            }
            if (stripos($line_of_text, "resources.db.params.username") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['username'] = str_replace("resources.db.params.username=", "", $string); //remove text
            }
            if (stripos($line_of_text, "resources.db.params.password") !== false) {
                $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                $dataconfig['password'] = str_replace("resources.db.params.password=", "", $string); //remove text
            }
        }
        //set configuration from main.ini               
        return $dataconfig;
        fclose($file_contents);
    }

    public function setConnection() {
        $config = $this->getcommonconfig();
        $host = str_replace('"', '', $config['host']);
        $username = str_replace('"', '', $config['username']);
        $password = str_replace('"', '', $config['password']);
        $db = 'cashier';
        $this->sqlsrvconnection = sqlsrv_connect($host, array("Database" => $db, "UID" => $username, "PWD" => $password));
        if ($this->sqlsrvconnection === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        }
    }

    function update_bytableparam_v2($table, $record, $whereset) {
        $resultdata = $this->extract_array_allstring_allownull($record);
        $resultwhere = $this->extract_array_allstring_allownull($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $table SET $data $where
               ";
        //echo $sql;
        return $this->execquery_v2($sql);
    }

    public function execquery($query, $flag = null) {
        $params = array();
        $options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
        $exec = sqlsrv_query($this->sqlsrvconnection, $query, $params, $options);
        $row_count = sqlsrv_num_rows($exec);

        if ($exec === false) {
            print(print_r(sqlsrv_errors()));
            echo " error data from query : <br/>" . $query;
            return false;
        } else {
            if ($row_count === 0) {
                return false;
            } else {
                return $exec;
            }
        }
        sqlsrv_free_stmt($exec);
    }

    public function extract_array_allstring_allownull($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();


        foreach ($array as $key => $value) {
            // if (!empty($value)) {
            $keydata[] = $key;
            $value = str_replace("'", "", $value);
            $value = "'" . $value . "'";
            $values[] = $value;
            $setdata[] = $key . '=' . $value;
            $where[] = ' AND ' . $key . '=' . $value;
            // }
        }

        $firtwhere = str_replace("AND", '', $where[0]);
        $where[0] = $firtwhere;
        $setwhere = implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    public function execquery_v2($query, $flag = null) {
        $this->setConnection();
        $params = array();
        $options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
        $exec = sqlsrv_query($this->sqlsrvconnection, $query, $params, $options);
        $row_count = sqlsrv_num_rows($exec);

        if ($exec === false) {
            print(print_r(sqlsrv_errors()));
            echo " error data from query : <br/>" . $query;
            return false;
        } else {
            if ($row_count === 0) {
                return false;
            } else {
                return $exec;
            }
        }
        sqlsrv_free_stmt($exec);
    }

    public function getarray($exec) {
        $data = array();
        while ($row = sqlsrv_fetch_array($exec, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }
        return $data;
    }

    public function getjson($prefix = null, $data) {
        if ($prefix !== null) {
            return json_encode(array("$prefix" => $data));
        } else {
            return json_encode(array("data" => $data));
        }
    }

    public function checkDate($date) {
        if ($date == '01-01-1970') {
            $cleardate = '';
        } else if ($date == '01-01-1990') {
            $cleardate = '';
        } else {
            $cleardate = $date;
        }
        return $cleardate;
    }

    function getdata_bytableparam_v3($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv_v2($param);
        $where = $result['whereset'];
        if (trim($where) !== 'WHERE') {
            $sql = "
                 SELECT * FROM $table  $where  
               ";
            $return = $this->customefromquery($sql);
            return $return;
        } else {
            return null;
        }
    }

    public function getbyid_voucherprefix($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_voucherprefix, array(
            "voucherprefix_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_prefix($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_prefix, array(
            "prefix_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_coa($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_coa, array(
            "coa_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_kasbondept($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_kasbondept, array(
            "kasbondept_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public function getbyid_kasbank($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_kasbank, array(
            "kasbank_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyidvoucher_kasbank($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_kasbank, array(
            "voucher_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_kasbonkasirforkasbondept($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_kasbon, array(
            "kasbondept_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_voucherdepartment($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_voucher, array(
            "voucher_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_kasbank_voucherdepartment($id) {
        $result = $this->getdata_bytableparam_v3($this->_th_voucher, array(
            "kasbank_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    public function getbyid_vendor($id) {
        $result = $this->getdata_bytableparam_v3($this->_mh_vendor, array(
            "vendor_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getbyid_vendorbankacc($id){
        $result = $this->getdata_bytableparam($this->_md_vendor_bankacc, array(
            "vendor_bankacc_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

      function getLastCashbonNo($param) {

         $resultdata = $this->execSP3('sp_getLastCashbonNo', 
                                    $param['project_id'],
                                    $param['pt_id'],
                                    $param['param_date'],
                                    $param['prefix'],
                                    $param['flag']
                                );


       return $resultdata;
        
    }

    function getLogVoucherDept($param) {
         $resultdata = $this->execSP3('sp_trackingvoucher_read', 
                                    $param['voucher_id']
                                );

       return $resultdata;
        
    }

    function getPtnamebyprojectpt($projectpt) {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_user_id = $projectpt;
        $this->_param = array(
            "hideparam" => 'getptnamebyprojectptid',
            "projectpt_id" => $projectpt,
        );
        $result = $this->executeSP();
        if(!isset($result[0][0]['result'])){
            return array();
        }
        return $result[0][0]['result'];
    }

    public function getbyid_is_cgg($project_id, $pt_id) {
        $result = $this->getdata_bytableparam($this->_schema_master.'m_pt_sh1a', array(
            "project_id" => $project_id,
            "pt_id" => $pt_id,
            "description" => 'CGG',
            "active" => 1
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getAttachment($voucher_id){
        $result = $this->getdata_bytableparam($this->_t_attachment, [
            "deleted" => 0,
            "transaction_id" => $voucher_id
        ]);
        
        if (!empty($result[0])) {
            return $result[0];
        }else{
            return null;
        }
    }

    public function getbyid_employeename($id) {
        $result = $this->getdata_bytableparam($this->_m_employee, array(
            "deleted"     => 0,
            "employee_id" => $id,
        ));
        if ($result) {
            if (!empty($result[0])) {
                return $result[0][0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}
