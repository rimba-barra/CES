<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

require_once dirname(__DIR__) . '/models/library/Columnconfigreport.php';

class Cashier_Models_Voucherprefixsetup extends Zend_Db_Table_Abstract {
    private $common = null;
    
    function init() {
        $this->setting = new Cashier_Models_General_Setdata;
        $this->common = new Cashier_Models_Common;
        $this->setting->_storeprocedure = 'sp_voucherprefix';
    }

    function voucherprefixsetupRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $param['pt_id'] = $projectpt['pt_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_pt_id = $param['pt_id'];
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        //print_r($this->setting->_lastquery);
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
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
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        if (!empty($result[0][0]['RECORD_TOTAL'])) {
                            $data = $result[1];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'filterprefixbypt':
                         $record = $this->common->dataCreate($param); 
                         $data = $record['data'];
                         $valid = true;
                         $counter = $record['total'];
                         $message = null;
                        break;
                    case 'filterprefixbybank':
                         $record = $this->common->dataCreate($param); 
                         $data = $record['data'];
                         $valid = true;
                         $counter = $record['total'];
                         $message = null; 
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

    public function voucherprefixsetupCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();   
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        break;
                    case 'exportdata':
                        $result = $this->exportData($param);
                        $valid = true;
                        $counter = 1;
                        $message = 'success';
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

    public function voucherprefixsetupUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];
                $this->setting->_iddata = $param['voucherprefix_id'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
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

    function voucherprefixsetupDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'voucherprefix_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $char = substr($param[$key_name], -1);
                if($char == ','){
                    $param[$key_name] = substr($param[$key_name], 0, -1);
                }else{
                    $param[$key_name];
                }
                $this->setting->_iddata = $param[$key_name];
                $this->setting->_paramsql = 'delete';
                $result = $this->setting->executeSP();
                $valid = $result[0][0]['VALIDDATA'];
                $counter = $result[1][0]['RECORD_TOTAL'];
                $message = $result[2][0]['MSG'];

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

    function exportData($param) {
        $lib = new Columnconfigreport();

        $project_id = $param['project_id'];
        $pt_id = $param['pt_id'];

        $this->_schema = 'cashier.dbo';
        $project_name = $this->execSP('sp_all_read', 'getproject', 'global', $project_id, $pt_id, 0, 0, null, 0, 0);
        $project_name = $project_name[0]['name'];

        $pt_name = $this->execSP('sp_all_read', 'getpt', 'global', $project_id, $pt_id, 0, 0, null, 0, 0);
        $pt_name = $pt_name[0]['name'];

        $lib->setSheetNumber(0);
        $lib->setTitleSheet('MASTER_VOUCHER_PREFIX');
        $lib->setHeader(array('REPORT: ', 'MASTER VOUCHER PREFIX'));
        $lib->setHeader(array('PROJECT: ', $project_name));
        $lib->setHeader(array('PT: ', $pt_name));
        $lib->setHeader(array('PRINT BY: ', $param['userprint']));
        $lib->setHeader(array('PRINT DATE: ', date('d-m-Y H:i:s')));
        $lib->setHeader(array('', ''));

        $lib->setBoldHeader(true);

        $lib->setSP("cashier.dbo.sp_voucherprefixsetup_export");
        $lib->setSPParam(array($project_id, $pt_id));

        $lib->setColumnTitle(array('Kode Prefix', 'Description', 'COA', 'COA Name', 'Dataflow', 'Payment Type', 'Description', 'Bank Name', 'Bank Type', 'Account No.', 'Liquid', 'Add On', 'Add By', 'Modify On', 'Modify By'));

        $lib->setConfig('prefix', 15);
        $lib->setConfig('prefix_description', 40);
        $lib->setConfig('coa', 15, 'center');
        $lib->setConfig('coa_name', 30);
        $lib->setConfig('dataflow', 15, 'center');
        $lib->setConfig('payment_type', 15);
        $lib->setConfig('voucher_prefix_description', 40);
        $lib->setConfig('bank_name', 25);
        $lib->setConfig('banktype', 25);
        $lib->setConfig('no_acc', 25);
        $lib->setConfig('is_liquid', 15);
        $lib->setConfig('addon', 25);
        $lib->setConfig('addby', 30);
        $lib->setConfig('modion', 25);
        $lib->setConfig('modiby', 30);

        $lib->setBoldLastRow(false);

        $json = $lib->generateJSONConfig();

        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_voucherprefixsetup_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $filename = "exportvchprefix_".date('YmdHms').".xlsx";
        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64} {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        $ptname = str_replace(' ', '_', $pt_name);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        return $param;
    }
}
