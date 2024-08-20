<?php
/*
 * created by ahmad riadi - mis
 */

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_General_Setup extends Zend_Db_Table_Abstract {

    protected $_schema = 'erems';
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

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_module_id = $this->_session->getCurrentModuleId();       
        $this->_sec_apps_group = 'dbwebsec.dbo.sec_apps_group';
        $this->_sec_group_user = 'dbwebsec.dbo.sec_group_user';
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
        $result = $this->execSP3($this->_storeprocedure, $this->_xmldata);
        return $result;
    }

    public function customefromquery($query) {
        $result = $this->execSP3('sp_custome_query', array($query));
        return $result;
    }

}
