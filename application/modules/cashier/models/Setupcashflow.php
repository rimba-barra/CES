<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Setupcashflow extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_setupcashflow';
        $this->_phpExcel  = new PHPExcel();
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if (!isset($param['hideparam'])) {
                    $param['hideparam'] = 'default';
                }
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';

             /*   if (isset($param['setupcashflow_id'])) {
                    if ($param['setupcashflow_id'] > 0 && $param['hideparam'] !== 'getdatadetail') {
                        $this->setting->_iddata = $param['setupcashflow_id'];
                        $this->setting->_param['hideparam'] = 'update';
                    } else {
                        if ($param['hideparam'] !== 'getdatadetail') {
                            $this->setting->_param['hideparam'] = 'create';
                        }
                    }
                }

                */

                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'];
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                      if(isset($param['pt_id'])){
                            if($param['pt_id'] != ''){
                                $this->setting->_pt_id = $param['pt_id'];
                            }else{
                                $this->setting->_pt_id = $this->_session->getCurrentPtId();
                            }
                        }else{
                            $param['pt_id'] = $this->_session->getCurrentPtId();
                        }

                        $this->setting->_project_id = $param['project_id'];

                        $this->setting->_param = $param;
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'getdatadetail':                       
                        $this->setting->_param = $param;
                        $result = $this->setting->executeSP();
                        $data = $result[1];
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'create':      
                        $result=$this->createdata($param);  
                            $data = null;
                            $valid = $result[0][0]['VALIDDATA'];
                            $counter = $result[1][0]['RECORD_TOTAL'];
                            $message = $result[2][0]['MSG'];
                        break;
                    case 'update':
                        $result=$this->updatedata($param);  
                        $data = null;
                        $valid = $result[0][0]['VALIDDATA'];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];                       
                        break;
                    case 'deletedetail':
                        $result=$this->deletedetail($param);  
                        $data = null;
                        $valid = 'true';
                        $counter = 0;
                        $message = 'Delete detail finish';                       
                        break;
                    case 'checkusedornot':
                        $this->setting->_paramsql = 'checkusedornot';
                        $result = $this->setting->executeSP();
                        $data = array();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = $result[2][0]['MSG'];
                        $valid = $result[0][0]['VALIDDATA'];
                        break;
                    case 'exportdata':
                        $result = $this->exportData($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        $data = $result;
                        break;
                    case 'exportExcelCountList':
                        $result = $this->exportExcelCountList($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        $data = $result;
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


    public function createdata($param) {
        if (is_array($param) && !empty($param)) {  
           //print_r($param); die();
            $this->setting->_paramsql = 'create';   
            $param['parametersql'] ='create';
          $xml = $this->setting->createdatawithdetailXML($param, $param['datadetail']);
          $result = $this->setting->executeSPwithparam($xml);
            return $result;
          
        }
    }
    
    public function updatedata($param) {      
        if (is_array($param) && !empty($param)) {
            $this->setting->_paramsql = 'update';
            $this->setting->_iddata = $param['setupcashflow_id'];
            $param['parametersql'] = 'update';
            $xml = $this->setting->createdatawithdetailXML($param, $param['datadetail']);
            $result = $this->setting->executeSPwithparam($xml);
            //print_r($this->setting->_lastquery);
            return $result;
        }
    }

    function deleteData($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'setupcashflow_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
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

        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        $filename = "Export_Master_Setup_Cashflow.xlsx";

        $lib->setSheetNumber(0);
        $lib->setTitleSheet('SETUP_CASHFLOW');

        $lib->setHeader(array($ptname, 'SETUP CASHFLOW'));

        $parameter = $this->setting->Xmlparam(array(
            'pt_id' => $param['pt_id'],
            'project_id' => $param['project_id'],
            'hideparam' => $param['hideparam']
        ));

        $lib->setSP('sp_setupcashflow');
        $lib->setSPParam(array($parameter));
        
        $lib->setColumnTitle(array('Project Name', 'PT Name','Department', 'Department Code', 'Group Type', 'CF_ID', 'Cashflow Type', 'Link COA CF', 'COA', 'COA Name', 'Create Date','Create By','Last Modify On','Last Modify By'));

        $lib->setConfig('project_name', 35);
        $lib->setConfig('pt_name', 35);
        $lib->setConfig('department', 25);
        $lib->setConfig('department_code', 25);
        $lib->setConfig('grouptype', 30);
        $lib->setConfig('cf_id', 20);
        $lib->setConfig('cashflow_type', 25);
        $lib->setConfig('link_coa_cf', 25);
        $lib->setConfig('coa', 25);
        $lib->setConfig('coa_name', 50);
        $lib->setConfig('create_date', 35);
        $lib->setConfig('create_by', 30);
        $lib->setConfig('last_modify_on', 35);
        $lib->setConfig('last_modify_by', 30);

        $json = $lib->generateJSONConfig();
        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_setupcashflow_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        $ptname = str_replace(' ', '_', $ptname);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }

    function copyData($param) {

        $this->_schema = "cashier.dbo";
        $result = $this->execSP3('sp_setupcashflow_copy', array(
            $param['from_project_id'],
            $param['from_pt_id'],
            $param['to_project_id'],
            $param['to_pt_id'],
            $param['copy_method'],
            $param['mappingdept'],
            $param['setupcashflow_id'],
            $param['user_id'] 
        ));
        return $result[0][0];
    }

    function exportExcelCountList($param) {
        try{
            $ptname       = $param['ptname'];
            $projectname  = $param['projectname'];
            $cashflowtype = $param['cashflowtype'];
            $department   = $param['department'];

            switch ($param['typeparams']) {
                case 'exportListCashbon': 
                    $filename = "List_Setup_Cashflow_CASHBONDEPARTEMENT.xls";
                    $sheetname = "Cashbon Departement";
                    break;
                case 'exportListVoucherDept': 
                    $filename = "List_Setup_Cashflow_VOUCHERDEPARTEMENT.xls";
                    $sheetname = "Voucher Department";
                    break;
                case 'exportListVoucher': 
                    $filename = "List_Setup_Cashflow_VOUCHER.xls";
                    $sheetname = "Voucher";
                    break;
                case 'exportListJournal': 
                    $filename = "List_Setup_Cashflow_JOURNAL.xls";
                    $sheetname = "Journal";
                    break;
                default:
                    break;
            }

            $additional['title']        = array( 'SETUP CASHFLOW LIST ' . strtoupper($sheetname));
            $additional['projectname']  = array( 'Project Name ','',': ' .  $projectname);
            $additional['space1']       = array( '','','');
            $additional['ptname']       = array( 'PT Name ','',': ' .  $ptname);
            $additional['cashflowtype'] = array( 'Cashflow Type ','',': ' .  $cashflowtype);
            $additional['department']   = array( 'Departement ','',': ' .  $department);
            $additional['space2']       = array( '','','');
            
            $sheet = 0 ; 
            $titles = 'title';
            $sql    = "sp_setupcashflow_exportcountlist";
            if ($sheetname == 'Voucher') {
                $col    = array('no', 'vid', 'voucher_no','coa');
                $titles = array('NO', strtoupper($sheetname) . ' ID', strtoupper($sheetname) . ' NO', 'COA');
            }else if($sheetname == 'Journal'){
                $col    = array('no', 'jid', 'voucher_no','coa');
                $titles = array('NO', strtoupper($sheetname) . ' ID', strtoupper($sheetname) . ' NO', 'COA');
            }else{
                $col    = array('no', 'voucher_no','coa');
                $titles = array('NO', strtoupper($sheetname) . ' NO', 'COA');
            }

            $paramdata = array(
                'typeparams'       => $param['typeparams'],
                'pt_id'            => $param['pt_id'],
                'project_id'       => $param['project_id'],
                'setupcashflow_id' => $param['setupcashflow_id']
            );

            $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles,$filename, FALSE);

            //GENERAL STYLE

            $titleArraystyle = array(
                'font' => array(
                    'bold' => true,
                    'color' => array('rgb' => '00000'),
                    'size' => 11
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                ),
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );

            $titleArraystyle = array(
                'font' => array(
                    'bold' => true,
                    'color' => array('rgb' => '00000'),
                    'size' => 11
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                ),
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );

            $style = array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                )
            );

            $style2 = array(
                'font' => array(
                    'bold' => true
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
                )
            );

            $style3 = array(
                'font' => array(
                    'bold' => true
                ),
            );

            $doc->getActiveSheet()->getDefaultStyle()->applyFromArray($style);
            $doc->getActiveSheet()->getStyle("A1:D1")->applyFromArray($style3);
            $doc->getActiveSheet()->getStyle("A2:D6")->applyFromArray($style2);
            if ($sheetname == 'Voucher' || $sheetname == 'Journal') {
                $doc->getActiveSheet()->getStyle("A8:D8")->applyFromArray($titleArraystyle);
            }else{
                $doc->getActiveSheet()->getStyle("A8:C8")->applyFromArray($titleArraystyle);
            }
            $doc->getActiveSheet()->getColumnDimension('A')->setWidth(5);
            $doc->getActiveSheet()->getColumnDimension('B')->setWidth(25);
            $doc->getActiveSheet()->getColumnDimension('C')->setWidth(25);
            if ($sheetname == 'Voucher' || $sheetname == 'Journal') {
                $doc->getActiveSheet()->getColumnDimension('D')->setWidth(25);
            }
            $doc->getActiveSheet()->mergeCells('A1:C1');
            $doc->getActiveSheet()->mergeCells('A2:B2');
            $doc->getActiveSheet()->mergeCells('A3:B3');
            $doc->getActiveSheet()->mergeCells('A4:B4');
            $doc->getActiveSheet()->mergeCells('A5:B5');

            $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles,$filename, TRUE);

            return $this->_tmpparam;

        } catch (Exception $e) {
            return $e;
        }
    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles,$filename, $isReady) {
        $doc = $this->_phpExcel;
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";
            $dataArray = $this->execSP3($sql, $paramdata); 
            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }
           

            $tmp = array();
            $final = array();
            
            array_push($final, $additional['title']);
            array_push($final, $additional['space1']);
            array_push($final, $additional['projectname']);
            array_push($final, $additional['ptname']);
            array_push($final, $additional['cashflowtype']);
            array_push($final, $additional['department']);
            array_push($final, $additional['space2']);
            array_push($final,  $titles); //give title

            foreach ($datas as $d) {
                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if(in_array($key, $col)){
                        array_push($tmp, $d[$key]);
                    }
                }
                array_push($final, $tmp);
                $tmp = array();
            }

           // array_push($final, $additional['footer']);

            $finaldata = $final;


            if($sheet>0){
                if($doc->getActiveSheetIndex()!==$sheet){
                    $doc->createSheet($sheet);
                }
            }
             
            $doc->setActiveSheetIndex($sheet);
            $doc->getActiveSheet()->fromArray($finaldata);
            $doc->getActiveSheet()->setTitle($sheetname);

            foreach(range('A','D') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

            }
        }
        

        if($isReady == TRUE){
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
    }

}
