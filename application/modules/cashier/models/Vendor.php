<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_Models_Vendor extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->_phpExcel  = new PHPExcel();

        $this->setting = new Cashier_Models_General_Setdata;

        $this->setting->_storeprocedure = 'sp_mh_vendor';
    }

    function VendorRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                $this->setting->_project_id = $param['project_id'];
                $this->setting->_pt_id = $param['pt_id'];
                $common = new Cashier_Models_Common();
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $data = $result[2];
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        $message = null;
                        $valid = true;
                        break;
                    case 'vendorcode':
                        $data['project_id'] = $this->_project_id;
                        $data['pt_id'] =  $this->_pt_id;
                        $data['param_date'] = date("Y-m-d");
                        $data['module'] = "VENDOR";
                        $data['prefix'] = "SPF-";
                        $data['flag'] = $param['prefix'];
                        //$exp = explode("-", $data['param_date']);
                        $code = $common->docNumberbyparam($data);
                        $result = $code;
                        $data = $code;
                        $counter = 1;
                        $message = "SUCCESS";
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

    public function VendorCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                if (isset($param['project_id']) > 0) {
                    //echo 'key project id ada';  
                    $this->setting->_project_id = $param['project_id'];
                }
                if (isset($param['pt_id']) > 0) {
                    //echo 'key pt id ada';   
                    $this->setting->_pt_id = $param['pt_id'];
                }

                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'create':
                       
                        $result = $this->setting->executeSP();
                       
                        if($param['vendorcode'] != 'Auto Generate'){
                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];
                          
                            if ($valid == 'true') {
                                $data = $result[5][0];
                            } else {
                                $data = null;
                            }

                        }else{

                            // echo count($result); print_r($result); exit;
                            if (count($result) > 4) {
                                $valid = $result[2][0]['VALIDDATA'];
                                $counter = $result[3][0]['RECORD_TOTAL'];
                                $message = $result[4][0]['MSG'];
                            
                                if ($valid == 'true') {
                                    $data = $result[6][0];
                                } else {
                                    $data = null;
                                }
                            } else {
                                $valid = $result[1][0]['VALIDDATA'];
                                $counter = $result[2][0]['RECORD_TOTAL'];
                                $message = $result[3][0]['MSG'];
                                $data = null;
                            }
                        }

                        break;
                    case 'exportdata':
                        $result = $this->exportData($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        $data = $result;
                        break;
                    default:
                        $result = null;
                        $valid = false;
                        $counter = 1;
                        $message = 'data error';
                        $data = null;
                }
                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    public function VendorUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                $this->setting->_iddata = $param['vendor_id'];

                if ($this->setting->_iddata > 0) {
                    switch ($this->setting->_param['hideparam']) {
                        case 'update':
                            $result = $this->setting->executeSP();
                            //print_r($result);

                            $valid = $result[1][0]['VALIDDATA'];
                            $counter = $result[2][0]['RECORD_TOTAL'];
                            $message = $result[3][0]['MSG'];

                            if ($valid == 'true') {
                                if (empty($result[0][0])) {
                                    $d = null;
                                } else {
                                    $d = $result[0][0];
                                }
                                $data = $d;
                            } else {
                                $data = null;
                            }
                            break;
                        default:
                            $result = null;
                            $valid = false;
                            $counter = 1;
                            $message = 'data error';
                            $data = null;
                    }
                } else {
                    $result = null;
                    $valid = false;
                    $counter = 1;
                    $message = 'data error';
                    $data = null;
                }

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function VendorDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'vendor_id';
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
                //die(print_r($result));
                if(isset($result[0][0]['VALIDDATA'])){
                     $valid = $result[0][0]['VALIDDATA'];
                    $counter = $result[1][0]['RECORD_TOTAL'];
                    $message = $result[2][0]['MSG'];
                }else{
                     $valid = $result[2][0]['VALIDDATA'];
                    $counter = $result[3][0]['RECORD_TOTAL'];
                    $message = $result[4][0]['MSG'];
                }
               
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
        
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
       
        $additional['header'][0] = array('Project', $param['project_name']);
        $additional['header'][1] = array('Print Date', date('d-m-Y H:i:s'));
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';
        $sql = "sp_mh_vendor_export";
        $col = array('type_vendor', 'code','vendorname','jenisusaha', 'npwp', 'npwp_name', 'npwp_address', 'ktp_no','ktp_name','ktp_address','address', 'office_phone', 'mobile_phone', 'fax', 'contactperson', 'email', 'addby', 'addon', 'modiby', 'modion');
        $titles = array('Vendor Type', 'Vendor Code', 'Vendor Name', 'Jenis Usaha', 'NPWP No.', 'NPWP Name', 'NPWP Address', 'ID No.', 'ID Name', 'ID Address', 'Business Address', 'Office Phone', 'Mobile Phone', 'Fax No.', 'Contact Person', 'Email', 'Add By', 'Add On', 'Modify By', 'Modify On');     

        $paramdata = array(
            'pt_id' => $param['pt_id'],
            'project_id' => $param['project_id']
        );
        $sheetname = "Vendor";
       
        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        //GENERAL STYLE

        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array('rgb' => '2F4F4F'),
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
        //STYLE SHEET 0

        $rowstotal = $doc->getActiveSheet()->getHighestRow();
       
        $doc->getActiveSheet()->getStyle('A1')->getFont()->setBold(true);
        $doc->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);
        $doc->getActiveSheet()->mergeCells('B1:C1');
        $doc->getActiveSheet()->mergeCells('B2:C2');

        $doc->getActiveSheet()->getStyle("A3:T3")->applyFromArray($titleArraystyle);

        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(12);
        $doc->getActiveSheet()->getStyle("A4:A{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(21);
        $doc->getActiveSheet()->getStyle("B4:B{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('C')->setWidth(61);
        $doc->getActiveSheet()->getStyle("C4:C{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('D')->setWidth(24);
        $doc->getActiveSheet()->getStyle("D4:D{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('E')->setWidth(20);
        $doc->getActiveSheet()->getStyle("E4:E{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $doc->getActiveSheet()->getColumnDimension('F')->setWidth(32);
        $doc->getActiveSheet()->getStyle("F4:F{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
        
        $doc->getActiveSheet()->getColumnDimension('G')->setWidth(52);
        $doc->getActiveSheet()->getStyle("G4:G{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('H')->setWidth(25);
        $doc->getActiveSheet()->getStyle("H4:H{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $doc->getActiveSheet()->getColumnDimension('I')->setWidth(32);
        $doc->getActiveSheet()->getStyle("I4:I{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('J')->setWidth(52);
        $doc->getActiveSheet()->getStyle("J4:J{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('K')->setWidth(52);
        $doc->getActiveSheet()->getStyle("K4:K{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('L')->setWidth(20);
        $doc->getActiveSheet()->getStyle("L4:L{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('M')->setWidth(20);
        $doc->getActiveSheet()->getStyle("M4:M{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('N')->setWidth(20);
        $doc->getActiveSheet()->getStyle("N4:N{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('O')->setWidth(20);
        $doc->getActiveSheet()->getStyle("O4:O{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('P')->setWidth(25);
        $doc->getActiveSheet()->getStyle("P4:P{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('Q')->setWidth(25);
        $doc->getActiveSheet()->getStyle("Q4:Q{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('R')->setWidth(25);
        $doc->getActiveSheet()->getStyle("R4:R{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $doc->getActiveSheet()->getColumnDimension('S')->setWidth(25);
        $doc->getActiveSheet()->getStyle("S4:S{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $doc->getActiveSheet()->getColumnDimension('T')->setWidth(25);
        $doc->getActiveSheet()->getStyle("T4:T{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
       
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;
    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";

            $dataArray = $this->execSP($sql, $param['project_id'], $param['pt_id']);   
            
            $datas = $dataArray;
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }

            $tmp = array();
            $final = array();

            foreach ($additional['header'] as $h) {
                array_push($final, $h);
            }

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

            foreach(range('A','Z') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

            }
        }
        

        if($isReady == TRUE){

            $filename = "Master_Vendor_{$param['project_name']}_".date('Ymd');
            $filename = $this->cleanString($filename).".xls";
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

    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.
     
        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
     }

}
