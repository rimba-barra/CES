<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';

class Cashier_Models_Subcoalist extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_reportsubcoalist';
        $this->_excel = new Columnconfigreport;
    }

    function subcoalistRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
               
                switch ($this->setting->_param['hideparam']) {
                    case 'default':                     
                        $result = $this->generateReportExcel($param);
                        $data = $result;
                        $counter = 0;
                        $message = null;
                        $valid = true;
                        break;
                    default:
                        $result = null;
                        $valid = true;
                        $counter = 0;
                        $message = null;
                        $data = null;
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
    
    function generateReportExcel($param) {

        $this->_excel->setSheetNumber(0);
        $this->_excel->setTitleSheet('SUB_COA_LIST');
        $this->_excel->setHeader(array('REPORT SUB COA LIST'));
        $this->_excel->setHeader(array('PROJECT',$param['project_name']));
        $this->_excel->setHeader(array('PT',$param['pt_name']));
        $this->_excel->setHeader(array('SUB ACCOUNT GROUP',$param['subaccgroup_name']));
        $this->_excel->setHeader(array(''));

        $this->_excel->setSP('cashier.dbo.sp_reportsubcoalist');

        if ($param['subaccgroup_id'] == "") {
            $param['subaccgroup_id'] = 0;
        }

        $this->_excel->setSPParam(array($param['project_id'], $param['pt_id'], $param['subaccgroup_id']));
        $this->_excel->setColumnTitle(array(
            'Sub Group Code',
            'Sub Group',
            'Sub Account Code',
            'Sub Account Code 1',
            'Sub Account Code 2',
            'Sub Account Code 3',
            'Sub Account Code 4',
            'Description'
        ));
        $this->_excel->setConfig('kelsub', 20);
        $this->_excel->setConfig('description_group', 30);
        $this->_excel->setConfig('code', 20);
        $this->_excel->setConfig('code1', 20);
        $this->_excel->setConfig('code2', 20);
        $this->_excel->setConfig('code3', 20);
        $this->_excel->setConfig('code4', 20);
        $this->_excel->setConfig('description', 40);

        // $this->_excel->setCustomStyle("C1", "C5", "", "", "False");   

        $json = $this->_excel->generateJSONConfig();

        $base_64 = base64_encode(json_encode($json));

        $filename = 'subcoalist.xlsx';
        $base_64_file = 'base64_subcoalist_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        exec("python {$path}/General.py {$base_64_file} {$filename} 2>&1", $output);
        // print_r($output); exit;
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;
        $param['output'] = $output;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }
}
