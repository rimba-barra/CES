<?php

/*
 * created by ahmad riadi - mis
 */

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Gl_Models_General_Setdata extends Zend_Db_Table_Abstract {

    protected $_schema = 'gl_2017';
    public $_name = null;
    public $_xmldata = null;
    public $_session = null;
    public $_param = null;
    public $_paramsql = null;
    public $_curdate = null;
    public $_storeprocedure = null;
    public $_iddata = 0;
    public $_iddatadetail = 0;
    public $_iddatasubdetail = 0;
    public $_projectpt_id = 0;
    public $_project_id = 0;
    public $_pt_id = 0;
    public $_user_id = 0;
    public $_module_id = 0;
    public $_dataexec = null;
    public $_tabledata = null;
    public $_m_employee = null;
    public $_sec_user = null;
    public $_m_project = null;
    public $_m_pt = null;
    public $_m_department = null;
    public $_subholding_id = null;
    public $_subholding_sub = null;
    public $_schema_gl = null;
    public $_th_jurnal = null;
    public $_td_jurnaldetail = null;
    public $_td_journalsubdetail = null;
    public $_m_coa = null;
    public $_m_prefix = null;
    public $_m_kelsub = null;
    public $_m_subgl = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_subholding_id = $this->_session->getcurrentSubholdingid();
        $this->_subholding_sub = $this->_session->getcurrentSubholdingsub();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();
        $this->_sec_apps_group = 'dbwebsec.dbo.sec_apps_group';
        $this->_sec_group_user = 'dbwebsec.dbo.sec_group_user';
        $this->_m_project = 'dbmaster.dbo.m_project';
        $this->_m_pt = 'dbmaster.dbo.m_pt';
        $this->_sp_common = 'sp_commondata';
        $this->_m_employee = 'm_employee';
        $this->_m_coa = 'm_coa';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';
        $this->_m_prefix = 'm_prefix';
        $this->_m_kelsub = 'm_kelsub';
        $this->_m_subgl = 'm_subgl';
    }

    public function setSchemagl($gl) {
        $this->_schema_gl = $gl . '.dbo.';
    }

    public function clean_blackdiamondquestion($data) {
        $arraydata = array();
        $result = $data;
        foreach ($result as $row) {
            foreach ($row as $index => $value) {
                $row[$index] = utf8_encode($value);
            }
            $arraydata[] = $row;
        }
        return $arraydata;
    }

    public function array_to_xml($array, $level = 1) {
        // default level 0
        $xml = ($level == 0) ? '<?xml version="1.0" encoding="ISO-8859-1"?>' . PHP_EOL : '';
        $tab = str_pad('', $level, '  ', STR_PAD_LEFT);
        foreach ($array as $node => $value) {
            $xml .= "{$tab}<{$node}>";
            if (!is_array($value)) {
                $xml .= $this->clean_specialcaracter($value);
            } else {
                $level++;
                $xml .= PHP_EOL . $this->array_to_xml($value, $level) . $tab;
            }
            $xml .= "</{$node}>" . PHP_EOL;
        }
        return '<root>' . $xml . '</root>';
    }

    function clean_specialcaracter($string) {
        $string = str_replace('&', '&amp;', $string);
        $string = str_replace('<', '&lt;', $string);
        $string = str_replace('>', '&gt;', $string);
        $string = str_replace('"', '&quot;', $string);
        $string = str_replace("'", '`', $string);
        return $string;
    }

    function dataXml() {
        $this->_param['currentdate'] = $this->_curdate;
        $this->_param['parametersql'] = $this->_paramsql;
        $this->_param['project_id'] = $this->_project_id;
        $this->_param['pt_id'] = $this->_pt_id;
        $this->_param['user_id'] = $this->_user_id;
        $this->_param['module_id'] = $this->_module_id;
        $this->_param['iddata'] = $this->_iddata;
        $this->_param['iddatadetail'] = $this->_iddatadetail;
        $this->_param['iddatasubdetail'] = $this->_iddatasubdetail;


        $result = $this->array_to_xml($this->_param);
        $this->_xmldata = $result;
        //print_r($this->_storeprocedure.$this->_xmldata);       
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

    public function get_defaultproject() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'defaultproject',
            "project_id" => $this->_project_id,
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
            "pt_id" => $this->_pt_id,
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

    public function get_defaultemployee() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'defaultemployee',
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result;
        } else {
            $return = false;
        }
        return $return;
    }

    public function get_defaultdepartment() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'defaultdepartment',
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result;
        } else {
            $return = false;
        }
        return $return;
    }

    public function getUserdata() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'getuserdata',
            "user_id" => $this->_user_id,
        );
        $result = $this->executeSP();
        return $result[2][0];
    }

    function converttoXml() {
        $this->_param['currentdate'] = $this->_curdate;
        $this->_param['parametersql'] = $this->_paramsql;
        $this->_param['project_id'] = $this->_project_id;
        $this->_param['pt_id'] = $this->_pt_id;
        $this->_param['user_id'] = $this->_user_id;
        $this->_param['module_id'] = $this->_module_id;
        $result = trim($this->array_to_xml($this->_param));
        return $result;
    }

    function executeSP() {
        $this->dataXml();
        $this->_dataexec = ' EXEC ' . $this->_storeprocedure . "'" . $this->_xmldata . "'";
        //print_r($this->_dataexec);
        $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
        return $result;
    }

    public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array($query));
        return $result;
    }

    public function get_subholding() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'subholding',
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = array(
                'subholding_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
    }

    public function get_project() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'project',
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = array(
                'project_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
    }

    public function get_pt() {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_param = array(
            "hideparam" => 'pt',
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = array(
                'pt_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
    }

    public function get_projectpt($project_id) {
        $this->_storeprocedure = $this->_sp_common;
        $this->_paramsql = 'read';
        $this->_project_id = $project_id;
        $this->_param = array(
            "hideparam" => 'ptinproject',
        );
        $result = $this->executeSP();
        if (!empty($result[2])) {
            $return = $result[2];
        } else {
            $return = array(
                'pt_id' => 0,
                'name' => null,
                'code' => null,
            );
        }
        return $return;
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
            $keydata[] = $key;
            $value = $this->checkdata($value);
            $values[] = $value;
            $setdata[] = $key . '=' . $value;
            $where[] = ' AND ' . $key . '=' . $value;
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

    public function extract_array_allstring($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            $keydata[] = $key;
            $values[] = "''" . $value . "''";
            $setdata[] = $key . '=' . "''" . $value . "''";
            $where[] = ' AND ' . $key . '=' . $value;
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

    public function extract_array_allstring_check_empty($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            if (trim(!empty($value))) {
                $keydata[] = $key;
                $values[] = "''" . trim($value) . "''";
                $setdata[] = $key . '=' . "''" . trim($value) . "''";
                $where[] = ' AND ' . $key . '=' . "''" . trim($value) . "''";
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

    public function extract_array_allstring_formanual($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            $keydata[] = $key;
            $values[] = "'" . $value . "'";
            $setdata[] = $key . '=' . "'" . $value . "'";
            $where[] = ' AND ' . $key . '=' . "'" . $value . "'";
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

    /*

      function checkdata($value) {
      if (is_numeric($value)) {
      return $value;
      } else {
      return "''" . $value . "''";
      }
      }
     */

    function checkdata($value) {
        if (is_numeric($value)) {
            return $value;
        } else {
            $data = str_replace("#~#", "", $value);
            return "''" . $data . "''";
        }
    }

    function setStringdata($value) {
        if (is_numeric($value)) {
            return "#~#" . $value . "#~#";
        } else {
            return $value;
        }
    }

    function getdata($table) {
        $sql = "
                 SELECT * FROM $table 
               ";
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_standard($param) {
        $result = $this->extract_array_withcheck($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $this->_tabledata  $where  
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function getdata_standard_bytable($table, $param) {
        $result = $this->extract_array_withcheck($param);
        $where = $result['whereset'];
        $sql = "
                 SELECT * FROM $table $where  
               ";
        //echo $sql;
        $this->_dataexec = $sql;
        $return = $this->customefromquery($sql);
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

    function insertdata_v2($record) {
        $result = $this->extract_array_allstring($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tabledata ($key) VALUES ($values)  
               ";
        $return = $this->customefromquery($sql);
        return $return;
    }

    function insertdata_v3($record) {
        $result = $this->extract_array_allstring_check_empty($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tabledata ($key) VALUES ($values)  
               ";
        //print_r($sql);
        //exit;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function insertdata_v4($table, $record) {
        $result = $this->extract_array_allstring($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $table ($key) VALUES ($values)  
               ";
        $return = $this->customefromquery($sql);
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

    function updatedatav2($record, $whereset) {
        $resultdata = $this->extract_array_allstring_check_empty($record);
        $resultwhere = $this->extract_array_allstring_check_empty($whereset);
        $data = $resultdata['setdata'];
        $where = $resultwhere['whereset'];
        $sql = "
                 UPDATE $this->_tabledata SET $data $where
               ";
        //echo $sql;
        $return = $this->customefromquery($sql);
        return $return;
    }

    function updatedatav3($table, $record, $whereset) {
        $resultdata = $this->extract_array_allstring($record);
        $resultwhere = $this->extract_array_allstring($whereset);
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

    function deletedatav2($whereset) {
        $resultwhere = $this->extract_array_allstring_check_empty($whereset);
        $where = $resultwhere['whereset'];
        $sql = "
                 DELETE FROM $this->_tabledata $where
               ";
        $return = $this->customefromquery($sql);
        return $return;
    }

    function get_project_id() {
        return $this->_project_id;
    }

    function get_pt_id() {
        return $this->_pt_id;
    }

    function set_project_id($_project_id) {
        $this->_project_id = $_project_id;
    }

    function set_pt_id($_pt_id) {
        $this->_pt_id = $_pt_id;
    }

    public function create_log_table($table, $data, $basedata = '') {
        $data['log_basedata'] = $basedata;
        $data['log_user_id_approve'] = $this->_user_id;
        $this->_tabledata = $table;
        $return = $this->insertdata_v3($data);
        return $return;
    }

    public function countingDays($fromdate, $untildate) {
        $firstdate = strtotime($fromdate);
        $enddate = strtotime($untildate);
        $skip = abs($firstdate - $enddate);
        return floor($skip / (60 * 60 * 24)) + 1;
    }

    public function sum_day($bulan = 0, $tahun = '') {
        if ($bulan < 1 OR $bulan > 12) {
            return 0;
        }
        if (!is_numeric($tahun) OR strlen($tahun) != 4) {
            $tahun = date('Y');
        }
        if ($bulan == 2) {
            if ($tahun % 400 == 0 OR ( $tahun % 4 == 0 AND $tahun % 100 != 0)) {
                return 29;
            }
        }
        $jumlah_hari = array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        return $jumlah_hari[$bulan - 1];
    }

    public function countMonth($fromdate, $untildate) {
        $from = new DateTime($fromdate);
        $until = new DateTime($untildate);
        $diff = $from->diff($until);
        $months = $diff->y * 12 + $diff->m + $diff->d / 30;
        return (int) round($months);
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

    /* start added 10-01-2018 */

    public function extract_array_allstring_sqlsrv($array) {
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


        if (!empty($where)) {
            $firtwhere = str_replace("AND", '', $where[0]);
            $where[0] = $firtwhere;
            $setwhere = implode(" ", $where);
        } else {
            $setwhere = null;
        }

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => ' WHERE ' . $setwhere,
        );

        return $return;
    }

    function getdata_bytableparam_v3($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv($param);
        $where = $result['whereset'];
        if (trim($where) !== 'WHERE') {
            $sql = "
                 SELECT * FROM $table  $where  
               ";
            //echo $sql;
            $return = $this->customefromquery($sql);
            return $return;
        } else {
            return null;
        }
    }

    function getdata_bytableparam_v4($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv_v2($param);
        $where = $result['whereset'];
        if (trim($where) !== 'WHERE') {
            $sql = "
                 SELECT * FROM $table  $where  
               ";
            //echo $sql;
            $return = $this->customefromquery($sql);
            return $return;
        } else {
            return null;
        }
    }

    public function getbyid_project($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_project, array(
            "project_id" => $id,
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

    public function getbyid_pt($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_pt, array(
            "pt_id" => $id,
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

    public function getbyid_department($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_department, array(
            "department_id" => $id,
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

    public function getbyid_employee($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_employee, array(
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

    public function getbyid_user($id) {
        $result = $this->getdata_bytableparam_v3($this->_sec_user, array(
            "user_id" => $id,
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

    public function getdata_voucher($table, $voucher_no) {
        $result = $this->getdata_bytableparam_v4($table, array(
            "voucher_no" => $voucher_no,
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
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

    public function getdata_prefixbycode($table, $code) {
        $result = $this->getdata_bytableparam_v4($table, array(
            "prefix" => $code,
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
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

    public function getbyid_kelsub($table, $id) {
        $result = $this->getdata_bytableparam_v4($table, array(
            "kelsub_id" => $id,
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

    public function getbyid_coa($table, $id) {
        $result = $this->getdata_bytableparam_v4($table, array(
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

    public function getdata_coabycode($table, $code) {
        $result = $this->getdata_bytableparam_v4($table, array(
            "coa" => $code,
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
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

    public function getbycodeandkelsubid_subgl($table, $kelsub_id, $code) {
        $result = $this->getdata_bytableparam_v4($table, array(
            "kelsub_id" => $kelsub_id,
            "code" => $code,
            "project_id" => $this->_project_id,
            "pt_id" => $this->_pt_id,
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

    public function checkDate($date) {
        if ($date == '01-01-1970') {
            $cleardate = '';
        } else if ($date == '01-01-1990') {
            $cleardate = '';
        } else if ($date == '01-01-1970 07:00:00') {
            $cleardate = '';
        } else if ($date == '01-01-1990 07:00:00') {
            $cleardate = '';
        } else {
            $cleardate = $date;
        }
        return $cleardate;
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
        $row = $result[0][0];
        return $row;
    }

    public function getcoa_neraca_sort($m_coa, $sort) {
        $sql = "
                select top 1 * 
                from $m_coa 
                where 
                project_id=$this->_project_id 
                and pt_id=$this->_pt_id 
                and is_journal=1 
                and report=''N'' 
                and deleted=0 
                and active=1 
                ORDER BY coa $sort
                ";
        $result = $this->customefromquery($sql);
        $row = $result[0][0];
        return $row;
    }

    public function getsum_detail($journaldetail, $journalid, $type) {
        $sql = "
                SELECT sum(amount) as totalamount from $journaldetail WHERE journal_id=$journalid and type=''$type''
                ";
        $result = $this->customefromquery($sql);
        $row = $result[0][0];
        return $row;
    }

    public function getcoawithkelsub_injournaldetail($td_journaldetail, $journal_id) {
        $sql = "
                select * 
                from $td_journaldetail 
                where 
                project_id=$this->_project_id 
                and pt_id=$this->_pt_id 
                and journal_id=$journal_id
                and kelsub_id > 0                  
                and deleted=0 
                and active=1 
                ORDER BY coa ASC
                ";
        $result = $this->customefromquery($sql);
        $return = $result[0];
        return $return;
    }

    public function getdatasubon_oldjournal($th_journal, $td_journaldetail, $td_journalsubdetail, $m_coa, $m_kelsub, $coa, $fromdate, $untildate) {
        $sql = "            
            SELECT 
                    a.project_id,
                    a.pt_id,	
                    a.coa_id,	
                    a.kelsub_id,
                    a.subgl_id,
                    a.code,
                    a.code1,
                    a.code2,
                    a.code3,
                    a.code4,
                    a.typedata,	
                    SUM(COALESCE(a.amountsubdetail,0)) AS amountsubdetail 
            FROM (
                    SELECT 
                            a.project_id,
                            a.pt_id,
                            head.voucher_date,
                            head.voucher_no,	
                            a.coa_id,
                            a.kelsub_id,
                            a.subgl_id,
                            a.code,
                            a.code1,
                            a.code2,
                            a.code3,
                            a.code4,			
                            a.amount as amountsubdetail,
                            (
                                    SELECT [type] as typedata 
                                    FROM $td_journaldetail 
                                    WHERE 
                                            project_id = a.project_id 
                                            AND a.pt_id = pt_id 
                                            AND a.journaldetail_id = journaldetail_id 				
                                            AND a.coa_id = coa_id 				
                            ) AS typedata,
                            (
                                    SELECT is_journal 
                                    FROM $m_coa c 
                                    WHERE 
                                            a.project_id = c.project_id 
                                            AND a.pt_id = c.pt_id 
                                            AND a.coa_id = c.coa_id 
                            ) AS is_journal,
                            (
                                    SELECT report 
                                    FROM $m_coa c 
                                    WHERE 
                                            a.project_id = c.project_id 
                                            AND a.pt_id = c.pt_id 
                                            AND a.coa_id = c.coa_id 
                            ) AS report,
                            detail.amount as amountdetail,
                            mcoa.coa,
                            mkelsub.kelsub
                    FROM $td_journalsubdetail a
                    INNER JOIN $th_journal head on head.journal_id = a.journal_id
                    INNER JOIN $td_journaldetail detail on detail.journal_id = a.journal_id
                    INNER JOIN $m_coa mcoa on mcoa.coa_id = detail.coa_id
                    INNER JOIN $m_kelsub mkelsub on mkelsub.kelsub_id = detail.kelsub_id	
                    WHERE 
                            a.project_id =$this->_project_id
                            AND a.pt_id = $this->_pt_id
                            AND head.voucher_date >=''$fromdate'' AND head.voucher_date <=''$untildate''
                            AND (	
                                    SELECT is_journal 
                                    FROM $m_coa c 
                                    WHERE 
                                            a.project_id = c.project_id 
                                            AND a.pt_id = c.pt_id 
                                            AND a.coa_id = c.coa_id 
                                ) =1
                             AND (
                                    SELECT report 
                                    FROM $m_coa c 
                                    WHERE 
                                            a.project_id = c.project_id 
                                            AND a.pt_id = c.pt_id 
                                            AND a.coa_id = c.coa_id 
                                  ) =''N''   
             ) a   
                WHERE 
                       a.project_id =$this->_project_id
                       AND a.pt_id =$this->_pt_id		
                       AND a.voucher_date >=''$fromdate'' AND a.voucher_date <=''$untildate''
                       AND a.coa =''$coa'' 
               GROUP BY a.project_id,a.pt_id,a.coa_id,a.typedata,a.kelsub_id,a.subgl_id,a.code,code1,code2,code3,code4
               ORDER BY a.project_id,a.pt_id,a.coa_id,a.typedata,a.kelsub_id,a.subgl_id,a.code,code1,code2,code3,code4

           ";
        $result = $this->customefromquery($sql);
        return $result[0];
        ;
    }

    /* end added 10-01-2018 */
}
