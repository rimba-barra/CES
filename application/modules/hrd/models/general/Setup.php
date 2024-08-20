<?php

/*
 * created by ahmad riadi - mis
 */

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_General_Setup extends Zend_Db_Table_Abstract {

    protected $_schema = 'hrd';
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
    public $_m_absenttype = null;
    public $_sec_user = null;
    public $_t_tukeroff = null;
    public $_t_tukeroff_tmp = null;
    public $_td_absentdetail = null;
    public $_log_td_absentdetail = null;
    public $_th_absent = null;
    public $_mh_workgroup = null;
    public $_md_workgroupemployee = null;
    public $_md_workgroupshift = null;
    public $_m_shifttype = null;
    public $_m_generalparameter = null;


    /* start added 10-01-2018 */
    public $_m_project = null;
    public $_m_pt = null;
    public $_m_department = null;
    public $_m_section = null;
    public $_m_jobfamily = null;
    public $_m_banding = null;
    public $_m_alokasibiaya = null;
    public $_m_group = null;
    public $_m_position = null;
    public $_t_changestatus = null;
    public $_m_parametertlk = null;

    /* end added 10-01-2018 */

    /* start added 31-01-2018 */
    public $_subholding_id = null;
    public $_subholding_sub = null;
    public $_td_changestatusdocument = null;

    /* start added 31-01-2018 */
    
     /* start added 27-02-2018 */
      public $_t_statusinformation = null;
      public $_t_generalparameterprojectpt = null;
      public $_t_employee_multiposition = null;
     /* end added 27-02-2018 */

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
        $this->_sp_common = 'sp_commondata';
        $this->_m_employee = 'm_employee';
        $this->_m_absenttype = 'm_absenttype';
        $this->_td_absentdetail = 'td_absentdetail';
        $this->_log_td_absentdetail = 'log_td_absentdetail';
        $this->_t_tukeroff = 't_tukeroff';
        $this->_t_tukeroff_tmp = 't_tukeroff_tmp';

        $this->_th_absent = 'th_absent';
        $this->_mh_workgroup = 'mh_workgroup';
        $this->_md_workgroupemployee = 'md_workgroupemployee';
        $this->_md_workgroupshift = 'md_workgroupshift';
        $this->_m_shifttype = 'm_shifttype';
        $this->_m_generalparameter = 'm_generalparameter';

        /* start added 10-01-2018 */
        $this->_m_project = 'dbmaster.dbo.m_project';
        $this->_m_pt = 'dbmaster.dbo.m_pt';
        $this->_m_department = 'hrd.dbo.m_department';
        $this->_m_section = 'hrd.dbo.m_section';
        $this->_m_position = 'hrd.dbo.m_position';
        $this->_m_jobfamily = 'hrd.dbo.m_jobfamily';
        $this->_m_banding = 'hrd.dbo.m_banding';
        $this->_m_group = 'hrd.dbo.m_group';
        //$this->_m_alokasibiaya = 'hrd.dbo.m_alokasibiaya'; // comment by Wulan Sari 2018.05.09
        $this->_m_alokasibiaya = 'dbmaster.dbo.m_pt'; // added by Wulan Sari 2018.05.09
        $this->_sec_user = 'dbwebsec.dbo.sec_user';
        $this->_t_changestatus = 'hrd.dbo.t_changestatus';
        $this->_m_parametertlk = 'hrd.dbo.m_parametertlk';
        $this->_td_changestatusdocument = 'hrd.dbo.td_changestatusdocument';
        $this->_t_statusinformation = 'hrd.dbo.t_statusinformation';
        $this->_t_generalparameterprojectpt = 'hrd.dbo.t_generalparameterprojectpt';
        $this->_m_generalparameter = 'hrd.dbo.m_generalparameter';
        $this->_t_employee_multiposition = 'hrd.dbo.t_employee_multiposition';
        /* end added 10-01-2018 */
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

    /*
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
     */

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
        #var_dump($this->_dataexec); exit;
        $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
        return $result;
    }
    
    
    public function execSPReport($spname='', $args='')
    {
        if ($spname)
        {
           switch ($this->_adapterName)
            {
                case 'mysql':
                    $sql = 'CALL ';
                    break;              
                case ($this->_adapterName=='mssql' || $this->_adapterName=='sqlsrv'):
                    $sql = 'EXEC ';
                    break;                  
                default:
                    return;
                    break;          
            }
            $spname = ($this->_schema ? $this->_schema.'.' : '') . $spname;
            
            $string = '';
            foreach($args as $field){
                $string .= "'".$field."',";
            }
            $string = substr_replace($string ,"",-1);
            
            $sql .= $spname.' '.$string; 
            # echo $sql;
            $result = array(); $qryIdx = 0; 
            $stmt = $this->_db->query($sql);       
            try { $result[$qryIdx] = $stmt->fetchAll(); } catch (Exception $e) { $result[$qryIdx] = $stmt->rowCount(); }
            $next = $stmt->nextRowset();
            while ($next) 
            {
                $qryIdx++;              
                try { $result[$qryIdx] = $stmt->fetchAll(); } catch (Exception $e) { $result[$qryIdx] = $stmt->rowCount(); }
                $next = $stmt->nextRowset();
            }                 
            return $result;
        }       
    }
    
    function executeSPReport($data) {
        $string = '';
        foreach($data as $field){
            $string .= "'".$field."',";
        }
        $string = substr_replace($string ,"",-1);
        $this->_dataexec = ' EXEC ' . $this->_storeprocedure . " " . $string;
        #var_dump($this->_dataexec); exit;
        $result = $this->execSPReport($this->_storeprocedure, $data);
        
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

    function insertdata_byparamtable($table, $record) {
        $result = $this->extract_array_allstring_check_empty($record);
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
        //echo $sql; exit;
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
        //echo $sql; exit;
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
    
    // added by wulan sari 20190605
    function getdata_bytableparam_v3_group($table, $param) {
        $result = $this->extract_array_allstring_sqlsrv($param);
        $where = $result['whereset'];
        if (trim($where) !== 'WHERE') {
            $sql = "
                 SELECT * FROM $table  $where  
                 and group_id in (
                    select b.group_id 
                    from hrd.dbo.t_accessgroup_user_approve a
                    join hrd.dbo.m_accessgroup_detail_approve b on a.accessgroup_id = b.accessgroup_id and a.project_id = b.project_id and a.pt_id = b.pt_id
                    join (select employee_id from dbwebsec.dbo.sec_user where user_id = ".$this->_user_id.") c on a.employee_id = c.employee_id
                    where a.is_approve = 1 and b.is_approve = 1
                 )
               ";
            //echo $sql;exit;
            $return = $this->customefromquery($sql);
            return $return;
        } else {
            return null;
        }
    }
    // end added by wulan sari 20190605

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

    public function getbyid_section($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_section, array(
            "section_id" => $id,
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

    public function getbyid_position($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_position, array(
            "position_id" => $id,
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

    public function getbyid_group($id) {
        $result = $this->getdata_bytableparam_v3_group($this->_m_group, array(
            "group_id" => $id,
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

    public function getbyid_jobfamily($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_jobfamily, array(
            "jobfamily_id" => $id,
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

    public function getbyid_banding($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_banding, array(
            "banding_id" => $id,
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

    public function getbyid_alokasibiaya($id) {
        $result = $this->getdata_bytableparam_v3($this->_m_alokasibiaya, array(
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

    public function getbyid_changestatus($id) {
        $result = $this->getdata_bytableparam_v3($this->_t_changestatus, array(
            "changestatus_id" => $id,
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
    public function getbyid_statusinformation($id) {
        $result = $this->getdata_bytableparam_v3($this->_t_statusinformation, array(
            "statusinformation_id" => $id,
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

    public function getbyprojectptid_and_name_parametertlk($project_id, $pt_id, $name) {
        $result = $this->getdata_bytableparam_v3($this->_m_parametertlk, array(
            "project_id" => $project_id,
            "pt_id" => $pt_id,
            "name" => $name,
            "active" => '1',
            "deleted" => '0',
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
    public function getdata_thabsent_byempid_month_year($employee_id, $month, $year) {
        $result = $this->getdata_bytableparam_v2($this->_th_absent, array(
            "employee_id" => $employee_id,
            "month" => $month,
            "year" => $year,
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
    public function getdata_tdabsent_byabsentid_and_date($absent_id, $date) {
        $result = $this->getdata_bytableparam_v2($this->_td_absentdetail, array(
            "absent_id" => $absent_id,
            "date" => $date,
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
    public function getdata_absenttype_bycode($code) {
        $result = $this->getdata_bytableparam_v2($this->_m_absenttype, array(
            "code" => $code,          
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
    public function getdata_multiposition_byemployee_id($employee_id) {
        if(isset($employee_id)){
            $result = $this->getdata_bytableparam_v2($this->_t_employee_multiposition, array(
                "employee_id" => $employee_id,          
            ));     
            if ($result) {
                if (!empty($result[0])) {
                    return $result[0];
                } else {
                    return null;
                }
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
    
    public function get_t_generalparameterprojectptby_moduleandname($module, $name) {
        $m_generalparam = $this->_m_generalparameter;
        $t_generalparam = $this->_t_generalparameterprojectpt;
        $project_id = $this->_project_id;
        $pt_id = $this->_pt_id;
        
        $sql = "
                SELECT 
                        ck.generalparameter_id,ck.generalparameterprojectpt_id,ck.value,g.name			   
               FROM $t_generalparam as ck
               LEFT JOIN $m_generalparam as g on ck.generalparameter_id = g.generalparameter_id
               WHERE 
               ck.deleted=0
               AND ck.project_id =$project_id
               AND ck.pt_id = $pt_id
               AND g.module_name =''$module''
               AND g.name =''$name''
            ";  
               
        $result = $this->customefromquery($sql);
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

    /* end added 10-01-2018 */
    
    // add by wulan sari 2018 10 16    
    public function organizationcharttree($id) {
        $this->_storeprocedure = $this->_storeprocedure;
        $this->_paramsql = 'read';
        $this->_param = array(
            "id" => $id
        );
        $result = $this->execSP('sp_organizationcharttree_read', $id);
        return $result;
    }
    
    public function setapplied($id) {        
        $sql = "update t_changestatus set is_applied = 1 where changestatus_id = $id";
        $result = $this->customefromquery($sql);
        if ($result) {
            if (!empty($result[0])) {
                return $result[0];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
