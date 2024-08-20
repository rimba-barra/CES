<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Offsetreport extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_listuserrole';
        $this->_phpExcel  = new PHPExcel();
    }

    function actionRead($param) {
        $return['success'] = false;
    }

    function offsetreportRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                // $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'] == "" ? $this->_project_id : $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'] == "" ? $this->_pt_id : $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
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

    public function offsetreportCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create';
                switch ($this->setting->_param['hideparam']) {
                    case 'offsetjournal':
                        $process = $this->processJournal($param); 
                        
                        $valid = $process[0][0]['result'];

                        if ($valid == 'true') {
                            $result = $process[1][0];
                            $counter = $process[2][0]['TOTAL_RECORD'];
                        } else {
                            $result = $process[0][0];
                            $counter = 0;
                        }
                        
                        $message = $valid == 'false' ? $result['msg'] : $valid;
                        break;
                    case 'exportfileupload':
                        $result = $this->createFileUpload($param);
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

    function exportData($param) {
        
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $dataproject = $this->execSP3("sp_project_byid_read", array($param['project_id']));
        $ptname = $datapt[0][0]['name'];
        $projectname = $dataproject[0][0]['name'];
        $periode = date('d-m-Y', strtotime($param['periodefrom']))." s/d ".date('d-m-Y', strtotime($param['periodeto']));
       
        $additional['header'] = array(
            array('OFFSET REPORT', ''),
            array('PERIODE', $periode),
            array('PROJECT', $projectname),
            array('PT', $ptname),
            array('PRINT DATE', date('d-m-Y')),
            array('', '')
        );
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';
        $sql = "sp_reportoffset";

        $coa_debet = explode(',', $param['coa_debet']);
        $coa_credit = explode(',', $param['coa_credit']);

        $col = array('code', 'description'); 
        foreach ($coa_debet as $d) {
            array_push($col, "coa_{$d}");
            array_push($col, "amount_{$d}");
        }

        foreach ($coa_credit as $c) {
            array_push($col, "coa_{$c}");
            array_push($col, "amount_{$c}");
        }

        array_push($col, 'diff'); 
        
        $title1 = array('SUB ACCOUNT CODE', 'DESCRIPTION');
        $title2 = array('', '');
        
        array_push($title1, "DEBIT");
        array_push($title1, "");
        for ($i = 0; $i < count($coa_debet); $i++) {
            if ($i > 0) {
                array_push($title1, "");
                array_push($title1, "");
            }

            array_push($title2, "ACCOUNT CODE");
            array_push($title2, "TOTAL AMOUNT");
        }

        array_push($title1, "CREDIT");
        array_push($title1, "");
        for ($i = 0; $i < count($coa_credit); $i++) {
            if ($i > 0) {
                array_push($title1, "");
                array_push($title1, "");
            }

            array_push($title2, "ACCOUNT CODE");
            array_push($title2, "TOTAL AMOUNT");
        }

        array_push($title1, 'DIFFERENCE');
        array_push($title2, '');
        
        $titles = array($title1, $title2);

        $paramdata = array(
            'pt_id' => $param['pt_id'],
            'project_id' => $param['project_id'],
            'pt_name' => $ptname,
            'periodefrom' => $param['periodefrom'],
            'periodeto' => $param['periodeto'],
            'coa_debet' => $param['coa_debet'],
            'coa_credit' => $param['coa_credit'],
            'hideparam' => 'exportdata'
        );
        $sheetname = "OffsetReport";
       
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
        
        $rowstotal = $doc->getActiveSheet()->getHighestRow();
        $columntotal = count($title1) - 1;

        $alpha = array('A','B','C','D','E','F','G','H','I','J','K', 'L','M','N','O','P','Q','R','S','T','U','V','W','X ','Y','Z');

        $doc->getActiveSheet()->getStyle('A1:A5')->getFont()->setBold(true);
        $doc->getActiveSheet()->mergeCells('B1:C1');
        $doc->getActiveSheet()->mergeCells('B2:C2');
        $doc->getActiveSheet()->mergeCells('B3:C3');
        $doc->getActiveSheet()->mergeCells('B4:C4');
        $doc->getActiveSheet()->mergeCells('B5:C5');

        $doc->getActiveSheet()->mergeCells('A7:A8');
        $doc->getActiveSheet()->mergeCells('B7:B8');
        $doc->getActiveSheet()->mergeCells('C7:'.$alpha[2 + (count($coa_debet) * 2) - 1].'7');
        $doc->getActiveSheet()->mergeCells("{$alpha[2 + (count($coa_debet) * 2)]}7:{$alpha[(2 + (count($coa_debet) * 2)) + (count($coa_credit) * 2) - 1]}7");
        $doc->getActiveSheet()->mergeCells("{$alpha[$columntotal]}7:{$alpha[$columntotal]}8");

        $doc->getActiveSheet()->getStyle("A7:{$alpha[$columntotal]}8")->applyFromArray($titleArraystyle);
        
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(20);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(40);

        // set align center for coa number
        for ($i = 2; $i < ((count($coa_debet) * 2) + (count($coa_credit) * 2) + 2); $i++) {

            $column = $alpha[$i];

            if ($i % 2 == 0) {
                $doc->getActiveSheet()->getColumnDimension($column)->setWidth(15);
                $doc->getActiveSheet()->getStyle("{$column}9:{$column}{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
            } else {
                $doc->getActiveSheet()->getColumnDimension($column)->setWidth(20);
                $doc->getActiveSheet()->getStyle("{$column}9:{$column}{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
                $doc->getActiveSheet()->getStyle("{$column}9:{$column}{$rowstotal}")->getNumberFormat()->setFormatCode('#,##0.00');
            }
        }

        $doc->getActiveSheet()->getColumnDimension($alpha[$columntotal])->setWidth(20);    
        $doc->getActiveSheet()->getStyle("{$alpha[$columntotal]}9:{$alpha[$columntotal]}{$rowstotal}")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);  
        $doc->getActiveSheet()->getStyle("{$alpha[$columntotal]}9:{$alpha[$columntotal]}{$rowstotal}")->getNumberFormat()->setFormatCode('#,##0.00'); 
       
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;
    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";

            $dataArray = $this->execSP($sql, $param['project_id'], $param['pt_id'], $param['periodefrom'], $param['periodeto'], $param['coa_debet'], $param['coa_credit'], $param['subgl_id']); 

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

            foreach ($titles as $t) {
                array_push($final, $t);
            }

            // array_push($final,  $titles); //give title

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

            $filename = "Offset_".date('Ymd').".xlsx";
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel2007');
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
    }

    function genReportexcel2($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";
            
            $dataArray = $this->execSP($sql, $param['project_id'], $param['pt_id'], $param['periodefrom'], $param['periodeto'], $param['coa_debet'], $param['coa_credit'], $param['subgl_id'], $param['journal_date']); 
            
            $datas = $dataArray;
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }

            $tmp = array();
            $final = array();

            array_push($final, $titles);

            // array_push($final,  $titles); //give title

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
            // print_r($final); exit;
            $finaldata = $final;

            if($sheet>0){
                if($doc->getActiveSheetIndex()!==$sheet){
                    $doc->createSheet($sheet);
                }
            }
             
            $doc->setActiveSheetIndex($sheet);

            // $column = 'A';
            // foreach ($titles as $t) {
            //     $doc->getActiveSheet()->setCellValue("{$column}1", $t);
            //     $column++;
            // }

            $doc->getActiveSheet()->fromArray($finaldata);
            $doc->getActiveSheet()->setTitle($sheetname);

            foreach(range('A','Z') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

            }
        }
        

        if($isReady == TRUE){

            $filename = "Offset_UploadJournal_".date('Ymd').".csv";
            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            $objWriter = PHPExcel_IOFactory::createWriter($doc, 'CSV')->setDelimiter(";");
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

    function processJournal($param) {

        $this->_schema = "cashier.dbo";
        $result = $this->execSP3('sp_reportoffset_generatejournal', array($param['project_id'], $param['pt_id'], $param['periodefrom'], $param['periodeto'], $param['coa_debet'], $param['coa_credit'], $param['subgl_id'], $param['journal_date'], $param['user_id']));
        return $result; 
    }

    function createFileUpload($param) {

        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();

        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';
        $sql = "sp_offsetreport_uploadjournal";
     
        $title = array('PROJECT_ID', 'PT_ID', 'JOURNAL_ID', 'JOURNAL_NO', 'JOURNAL_DATE', 'PREFIX', 'DESCRIPTION', 'JOURNAL_DETAIL_ID', 'COA_DETAIL', 'TYPE', 'KAWASAN', 'SUB', 'AMOUNT_DETAIL', 'CASHFLOW', 'SUB_DESCRIPTION');
        $col = array('PROJECT_ID', 'PT_ID', 'JOURNAL_ID', 'JOURNAL_NO', 'JOURNAL_DATE', 'PREFIX', 'DESCRIPTION', 'JOURNAL_DETAIL_ID', 'COA_DETAIL', 'TYPE', 'KAWASAN', 'SUB', 'AMOUNT_DETAIL', 'CASHFLOW', 'SUB_DESCRIPTION');

        $paramdata = $param;
        $sheetname = "Upload Journal";
        $doc = $this->genReportexcel2($param, $sql, $sheet,$sheetname, '', $paramdata, $col,  $title, FALSE);
        
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
        
        $rowstotal = $doc->getActiveSheet()->getHighestRow();
        $doc->getActiveSheet()->getStyle("M2:M{$rowstotal}")->getNumberFormat()->setFormatCode('###0'); 
       
        $this->genReportexcel2($param, $sql, $sheet,$sheetname, '', $paramdata, $col,  $title, TRUE);

        return $this->_tmpparam;
    }

}
