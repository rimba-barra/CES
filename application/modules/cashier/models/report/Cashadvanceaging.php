<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Report_Cashadvanceaging extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $reportfile = $this->setting->_param['reportfile'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        //registered store procedure by condition
                        if ($reportfile == 'Agingcashadvancedetaildeptcompany') {
                            $this->setting->_storeprocedure = 'sp_report_agingcashadvance';
                        } else if ($reportfile == 'Agingcashadvancerekapdeptcompany') {
                            $this->setting->_storeprocedure = 'sp_report_agingcashadvance';
                        }

                        $result = $this->setting->executeSP();
                        $qparam = array(
                            "qd" => $result[1][0]['QDATA'],
                            "qh" => $result[2][0]['QPROJECTPT'],
                            "reportfile"=>$reportfile,
                            "paramjs"=>$param,
                        );
                        $data = $qparam;
                        $counter = $result[0][0]['RECORD_TOTAL'];
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
                    "parameter" => $param['hideparam'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

}
