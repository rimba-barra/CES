<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';

class Cashier_Models_Inputpph extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_inputpph';
        $this->_excel = new Columnconfigreport;
    }

    function inputpphRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
               
                switch ($this->setting->_param['hideparam']) {
                    case 'default':                     
                        $parameter = $this->setting->Xmlparam($param);                                 
                        $result = $this->execSP3('gl_2018.dbo.sp_inputpph', $parameter);
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':                        
                        $this->setting->_project_id =$projectpt['project_id'];
                        $this->setting->_pt_id =$param['pt_id'];                                        
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getvoucherno':       
                        $this->setting->_project_id =$projectpt['project_id'];
                        $this->setting->_pt_id =$param['pt_id']; 
                        $parameter = $this->setting->Xmlparam($param);                                 
                        $result = $this->execSP3('gl_2018.dbo.sp_inputpph', $parameter);
                        $data = $result[0];
                        $counter = count($result[0]);
                        $message = null;
                        $valid = true;
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

    function inputpphCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                $this->setting->_param['hideparam'] = $param['hideparam'];
                switch ($this->setting->_param['hideparam']) {
                    case 'default':

                        $datadetail = $param['pph'];
                        unset($param['pph']);

                        $parameter = $this->setting->createdatawithdetailXML($param, $datadetail);
                        $result = $this->execSP3('gl_2018.dbo.sp_inputpph', $parameter);

                        $valid = $result[0][0]['result'] == 'success' ? true : false;
                        $counter = count($result[1]);
                        $message = $result[2][0]['msg'];
                        $result = $result[1];

                        break;
                    case 'generatereport':

                        $result = $this->generateReportExcel($param);
                       
                        $counter = 0;
                        $message = null;
                        $valid = true;

                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                        break;
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
    
    function generateReportExcel($param) {
        $this->_excel->setSheetNumber(0);
        $this->_excel->setTitleSheet('BUKTI_POTONG_PPH');
        $this->_excel->setHeader(array('PROJECT / PT','',$param['projectpt_name']));
        $this->_excel->setHeader(array('REPORT','','DAFTAR BUKTI POTONG PPH'));
        $this->_excel->setHeader(array('PERIOD','', date('d-m-Y', strtotime($param['date_from'])). ' s/d '.date('d-m-Y', strtotime($param['date_to']))));
        $this->_excel->setHeader(array('PRINT DATE','',date('d-m-Y H:i:s')));
        $this->_excel->setHeader(array('PRINT BY','',$param['userprint']));
        $this->_excel->setHeader(array(''));
        $this->_excel->setHeader(array(''));
        $this->_excel->setSP('gl_2018.dbo.sp_inputpph');

        $param['voucher_from'] = $param['voucher_no_from'];
        $param['voucher_to'] = $param['voucher_no_until'];
        // print_r(array($this->setting->Xmlparam($param))); exit
        $this->_excel->setSPParam(array($this->setting->Xmlparam($param)));
        $this->_excel->setColumnTitle(array(
            'No.',
            'No. Voucher',
            'Tgl. Voucher',
            'Kode Sub',
            'Sub Keterangan',
            'Keterangan',
            'Flag PPH',
            'Nilai',
            'Tgl. Bukti Potong',
            'No. Bukti Potong',
            'Tgl. Terima',
            'Selisih',
            '0-30 Hari',
            '31-60 Hari',
            '61-90 Hari',
            '> 90 Hari'
        ));
        $this->_excel->setConfig('no', 5);
        $this->_excel->setConfig('voucher_no', 20, 'right');
        $this->_excel->setConfig('voucher_date', 15, 'center');
        $this->_excel->setConfig('code', 15, 'center');
        $this->_excel->setConfig('sub_keterangan', 40, 'right');
        $this->_excel->setConfig('keterangan', 40, 'right');
        $this->_excel->setConfig('flag_pph', 10, 'center');
        $this->_excel->setConfig('amount', 20, 'right', '#,##0.00;(#,###0.00)');
        $this->_excel->setConfig('document_date', 15, 'center');
        $this->_excel->setConfig('document_no', 20, 'right');
        $this->_excel->setConfig('receive_date', 15, 'center');
        $this->_excel->setConfig('selisih', 15, 'center');
        $this->_excel->setConfig('a_0_30_hari', 20, 'center');
        $this->_excel->setConfig('a_31_60_hari', 20, 'center');
        $this->_excel->setConfig('a_61_90_hari', 20, 'center');
        $this->_excel->setConfig('a_90_hari', 20, 'center');

        $this->_excel->setCustomStyle("C1", "C5", "", "", "False");   

        $json = $this->_excel->generateJSONConfig();

        $base_64 = base64_encode(json_encode($json));

        $filename = 'reportBuktiPotongPPh.xlsx';
        $base_64_file = 'base64_inputpph_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        exec("python {$path}/General.py {$base_64_file} {$filename} 2>&1", $output);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;
        $param['output'] = $output;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }
}
