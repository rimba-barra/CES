<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';

class Cashier_Models_Consolesupport extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $datatb;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_querytb = new Gl_Models_Query_Trialbalance();
        $this->_phpExcel  = new PHPExcel();
        $this->_tmpparam  = array();
    }

    function myformat($nr)
    {
        $nr = number_format($nr, 2);
        return $nr[0] == '-' ? "(" . substr($nr, 1) . ")" : $nr;
    }

    function generateExcel($param) {
       // die(print_r($param));
       
        $lib = new Columnconfigreport();

        $this->_schema = "dbmaster.dbo";
       // $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        //$ptname = $datapt[0][0]['name'];

        /*if(isset($param['project_id'])){
            $project_id = $param['project_id'];
        }else{
            $project_id = $this->session->getCurrentProjectId();
        }*/
        if($param['detaildesc'] == 'NO'){
            $namesheet = 'Supporting Consol - NO DETAIL';
        }else{
            $namesheet = 'Supporting Consol - WITH DETAIL';
        }

        $sheetlabel = array(
            0 => $namesheet,
        );

        $numberofsheet = 1;
        $filename = "report_ConsoleSupportingData_".$this->cleanString($param['group_console']).'_'.$param['untildate'].".xlsx";
        $json = [];
        for ($i = 0; $i < $numberofsheet; $i++) {
            $lib->setSheetNumber($i);
            $lib->setTitleSheet($sheetlabel[$i]);

            $lib->setHeader(array('REPORT','REPORT CONSOLIDATION SUPPORTING DATA'));
             $lib->setHeader(array('GROUP CONSOLIDATION',$param['group_console']));
           $lib->setHeader(array('COA',$param['coastart_id'].' - '.$param['coaend_id']));
            $lib->setHeader(array('PERIOD',$param['tanggal']));
             $lib->setHeader(array('COA Header',$param['headerdesc']));
               $lib->setHeader(array('Detail',$param['detaildesc']));
               $lib->setHeader(array('Print Date',$param['tgl_sekarang'].' - '.$param['time_sekarang']));
               $lib->setHeader(array('Print By',$param['userprint']));
            
          

                $lib->setSP("cashier.dbo.sp_consolesupportingdata");
                $lib->setSPParam(array(
                   $param['consolidation_access_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                    $param['untildate'], $param['headerdata'], $param['detaildata']
                ));

              if($param['detaildata'] == 2){
                $lib->setColumnTitle(array('PROJECT','PT','COA','COA NAME','BEGINING BALANCE','DEBIT','CREDIT','ENDING BALANCE'));
                $lib->setConfig('project_name', 20);
                $lib->setConfig('pt_name', 20);
                $lib->setConfig('coa', 20);
                $lib->setConfig('description_coa', 40);
                $lib->setConfig('beg_balance2', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('amount_d', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('amount_c', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('end_balance2', 30, "right", "#,##0.00;(#,###0.00)");
              }else{
                $lib->setColumnTitle(array('PROJECT','PT','COA','VOUCHER NO','VOUCHER DATE','COA NAME','DESCRIPTION','BEGINING BALANCE','DEBIT','CREDIT','ENDING BALANCE'));
                $lib->setConfig('project_name', 20);
                $lib->setConfig('pt_name', 20);
                $lib->setConfig('coa', 20);
                $lib->setConfig('voucher_no', 20);
                $lib->setConfig('voucher_date', 20);
                $lib->setConfig('description_coa', 40);
                 $lib->setConfig('description_voucher', 40);
                $lib->setConfig('beg_balance2', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('amount_d', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('amount_c', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('end_balance2', 30, "right", "#,##0.00;(#,###0.00)");
              }
           
            
            $json = $lib->generateJSONConfig();
        }

         //print_r($json); exit;
        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_consolesupportingdata_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
       //echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        $ptname = str_replace(' ', '_', $param['group_console']);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }

    function generateExcelNotUsed($param){

        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        if(isset($param['project_id'])){
            $project_id = $param['project_id'];
        }else{
            $project_id = $this->session->getCurrentProjectId();
        }

        $additional['header'] = array( $ptname, 
                'TRIAL BALANCE STATEMENT', 
                '', 
                'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate'], 
                'COA : '.$param['coastart_id'].' - '.$param['coaend_id']);
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';

        $sql = "sp_reportbalancesheetsum";
        $col = array('A','B','beg_balancesum','amount_dsum','amount_csum','end_balancesum');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'],$project_id
        );

        $footer = $this->genReportexcelAdditional($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $additional['footer'] = $footer[0];

        $sql = "sp_reporttrialbalance";
  

        $col = array('coa', 'description', 'beg_balance2', 'amount_d', 'amount_c','end_balance2');
        $titles = array('Account No.', 'Description', 'Begining Balance', 'Debit', 'Credit', 'Ending Balance');     

        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'], $param['headerdata'], 2,1,$project_id
        );
        $sheetname = "Header Only";

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();
        $from0 = 'A'.$lastrecord0; // or any value
        $to0 = 'F'.$lastrecord0; // or any value

      /* for ($i = 3; $i < $lastrecord0; $i++) {
            $begbalance =  $doc->getActiveSheet()->getCell('C'.$i)->getValue();
            $debit =  $doc->getActiveSheet()->getCell('D'.$i)->getValue();
            $credit =  $doc->getActiveSheet()->getCell('E'.$i)->getValue();
             $endbalance =  $doc->getActiveSheet()->getCell('F'.$i)->getValue();
            


            if ($begbalance < 0 ) {
                $doc->getActiveSheet()->setCellValue('C'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($begbalance,2,',','.')));
            }

             if ($debit < 0 ) {
                $doc->getActiveSheet()->setCellValue('D'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($debit,2,',','.')));
            }

             if ($credit < 0 ) {
                $doc->getActiveSheet()->setCellValue('E'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($credit,2,',','.')));
            }

             if ($endbalance < 0 ) {
                $doc->getActiveSheet()->setCellValue('F'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($endbalance,2,',','.')));
            }


        } */

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

        $styleArray = array(
          'borders' => array(
            'outline' => array(
              'style' => PHPExcel_Style_Border::BORDER_THIN
            )
          )
        );
        //STYLE SHEET 0

        $doc->getActiveSheet()->getStyle('C3:F'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00;(#,###0.00)');
        $doc->getActiveSheet()->getStyle("A2:F2")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
        $doc->getActiveSheet()->freezePane('G3');
        //$doc->getActiveSheet()->getStyle("A3:F1000000")->getFont()->setSize(9);
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(30);
        $doc->getActiveSheet()->getStyle("$from0:$to0")->getFont()->setBold(true);
        $doc->getActiveSheet()->getStyle("$from0:$to0")->applyFromArray($styleArray);

        //SHEET 1

        $sql = "sp_reportbalancesheetsum";
        $col = array('A','B','C','D', 'E','beg_balancesum','amount_dsum','amount_csum','end_balancesum');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'],$project_id
        );

        $footer = $this->genReportexcelAdditional($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $additional['footer'] = $footer[0];

        $sql = "sp_reporttrialbalance";
        $sheet = 1 ; 
        $sheetname = "Header Detail";
        $col = array('coa', 'voucher_no', 'voucher_date', 'description_coa', 'description_voucher', 'beg_balance2', 'amount_d', 'amount_c','end_balance2');
        $titles = array('Account No.', 'Voucher No.', 'Voucher Date', 'COA Name', 'Description', 'Begining Balance', 'Debit', 'Credit', 'Ending Balance');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'], $param['headerdata'], 1,1,$project_id,'excel'
        );
        

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $lastrecord1 = $doc->setActiveSheetIndex(1)->getHighestRow();
        $from1 = 'A'.$lastrecord1; // or any value
        $to1 = 'I'.$lastrecord1; // or any value


      
      

        //STYLE SHEET 1
        $doc->getActiveSheet()->getStyle('F3:I'.$lastrecord1)->getNumberFormat()->setFormatCode('#,##0.00;(#,###0.00)');
        $doc->getActiveSheet()->getStyle("A2:I2")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
        $doc->getActiveSheet()->freezePane('J3');
        //$doc->getActiveSheet()->getStyle("A3:I100000")->getFont()->setSize(10);
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('D')->setWidth(30);
        $doc->getActiveSheet()->getStyle("$from1:$to1")->getFont()->setBold(true);
        $doc->getActiveSheet()->getStyle("$from1:$to1")->applyFromArray($styleArray);

         
        //$doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        //SHEET 2

        $sheet = 2 ; 
        $sql = "sp_reportbalancesheetsum";
        $col = array('A','B','C','amount_dsum','amount_csum');
        $titles = array('Voucher No.', 'Voucher Date', 'Description', 'Debit', 'Credit');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'],$project_id
        );

        $footer = $this->genReportexcelAdditional($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $sql = "sp_reporttrialbalance";

        $sheetname = "Detail Only";
        $col = array('voucher_no', 'voucher_date', 'description', 'amount_d', 'amount_c');
        $paramdata = array(
                $param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['fromdate'], 
                $param['untildate'],$param['headerdata'], 1,1,$project_id
        );


        $additional['footer'] = $footer[0];

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        $lastrecord2 = $doc->setActiveSheetIndex(2)->getHighestRow();
        $from2 = 'A'.$lastrecord2; // or any value
        $to2 = 'E'.$lastrecord2; // or any value
      

                //STYLE SHEET 2
        $doc->getActiveSheet()->getStyle('D3:E'.$lastrecord2)->getNumberFormat()->setFormatCode('#,##0.00;(#,###0.00)');
        $doc->getActiveSheet()->getStyle("A2:E2")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
        $doc->getActiveSheet()->freezePane('J3'); 
        //$doc->getActiveSheet()->getStyle("A3:E100000")->getFont()->setSize(10);
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('C')->setWidth(50);
        $doc->getActiveSheet()->getStyle("$from2:$to2")->getFont()->setBold(true);
        $doc->getActiveSheet()->getStyle("$from2:$to2")->applyFromArray($styleArray);

        for ($i = 0; $i < $lastrecord2; $i++) {
            $voucher_no =  $doc->getActiveSheet()->getCell('A'.$i)->getValue();

            if ($voucher_no == "") {
                $doc->getActiveSheet()->getStyle("A{$i}:E{$i}")->getFont()->setBold(true);
            }
        }

       /*  for ($i = 3; $i < $lastrecord2; $i++) {
          
            $debit3 =  $doc->getActiveSheet()->getCell('D'.$i)->getValue();
            $credit3 =  $doc->getActiveSheet()->getCell('E'.$i)->getValue();
         
         

             if ($debit3 < 0 ) {
                $doc->getActiveSheet()->setCellValue('D'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($debit3,2,',','.')));
            }

             if ($credit3 < 0 ) {
                $doc->getActiveSheet()->setCellValue('E'.$i, preg_replace('/(-)([\d\.\,]+)/ui','($2)',number_format($credit3,2,',','.')));
            }

           


        } */


        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;

    }

    function generateExcelTbNotBalance($param) {

        $this->_schema = "dbmaster.dbo";
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        if(isset($param['project_id'])){
            $project_id = $param['project_id'];
        }else{
            $project_id = $this->session->getCurrentProjectId();
        }

        $additional['header'][0] = array( '', 
            'LIST COA TB NOT BALANCE');
        $additional['header'][1] = array( '', 
            'Project : '.$param['projectname']);
        $additional['header'][2] = array( '', 
            'PT : '.$param['ptname']);
        $additional['header'][3] = array( '', 
            'Periode : '.$param['tanggal']);

        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';

        $sql = "sp_reporttrialnotbalance";
        $col = array('COA','COA NAME','DEBIT','CREDIT','NET', 'REMARKS');
        $paramdata = array($param['project_id'],$param['pt_id'], $param['fromdate'], $param['untildate']);
        
        $titles = array('COA', 'COA NAME', 'DEBIT', 'CREDIT', 'NET', 'REMARKS');  
        $sheetname = "TB Not Balance";

        $doc = $this->genReportexcel2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();

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

        $styleArray = array(
          'borders' => array(
            'outline' => array(
              'style' => PHPExcel_Style_Border::BORDER_THIN
            )
          )
        );
        //STYLE SHEET 0

        $doc->getActiveSheet()->getStyle('C5:E'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle("A5:F5")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(50);
        $doc->getActiveSheet()->getColumnDimension('F')->setWidth(50);

        $this->genReportexcel2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;
    }

    function genReportexcelAdditional($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {

        //auto generate excel from sql statement

        $this->_schema = "cashier.dbo";
        $dataArray = $this->execSP3($sql, $paramdata);

        $datas = $dataArray[0];
        $arrayKeys = array_keys($datas[0]);

        $tmp = array();
        $final = array();

        foreach ($datas as $d) {

            //HARUS URUT SESUAI QUERY
            foreach ($col as $keyn) {
                if(in_array($keyn,$arrayKeys)){
                    array_push($tmp, (float) $d[$keyn]);
                }else{
                     array_push($tmp, '');
                }
            }
            array_push($final, $tmp);
            $tmp = array();
        }
        return $final;

    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
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
            array_push($final, $additional['header']);

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

            array_push($final, $additional['footer']);

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

            $ptname = str_replace(' ', '_', $param['pt_name']);
            $filename = "report_TB_".$ptname.'_'.$param['untildate'].".xlsx";
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
            $dataArray = $this->execSP3($sql, $paramdata);

            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }
           

            $tmp = array();
            $final = array();
            foreach($additional['header'] as $hdr) {
                array_push($final, $hdr);
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

            $ptname = str_replace(' ', '_', $param['pt_name']);
            $filename = "report_TB_NotBalance_".$ptname.'_'.$param['untildate'].".xlsx";
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

    function generateData() {
        $activedate = $this->_helperdata->rangeActiveYear();
        //print_r($activedate);
        //exit;
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($activedate['yeardb'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
        $return = array(
            "cluster"=>$result
        );
        
        return $return;        
    }
    function generateDatabyparam($param) {
        $this->datatb = $param;        
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($param['yeardata'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
     
        
        return $result;        
    }

    function cleardata() {
        $counter = $this->_querytb->count_tmp_rpt();
        if ($counter > 0) {
            $counterbyuser = $this->_querytb->count_tmp_rpt_byuser();
            if ($counter == $counterbyuser) {
                $this->_querytb->truncate_tmp();
            } else {
                $this->_querytb->delete_tmp();
            }
        } else {
            $this->_querytb->delete_tmp();
        }
    }

    function create_coa() {
        //print_r($this->datatb);
        //exit;
        $result = $this->_querytb->get_coa_from_sumtrh($this->datatb['fromcoa'], $this->datatb['untilcoa']);
        if (!empty($result)) {          
            foreach ($result as $row) {
                $resultcoa = $this->_model->getcoa($row['coa']);
                $countercoa = $resultcoa[0][0]['counterdata'];
                if ($countercoa > 0) {
                    $rowcoa = $resultcoa[1][0];
                    if ($this->datatb['headertype'] == 2) {
                        $coaname = $rowcoa['name'];
                    } else {
                        $coaname = str_repeat("-", $rowcoa['level']) . $rowcoa['name'];
                    }

                    if (empty($rowcoa['parent_code'])) {
                        $parent_code = $rowcoa['coa'];
                    } else {
                        $parent_code = $rowcoa['parent_code'];
                    }

                    $resultcoajournal = $this->_querytb->get_coa_from_journaldetail($rowcoa['coa'], $rowcoa['coa']);
                    if (empty($resultcoajournal)) {
                        $level = 1;
                    } else {
                        $level = 2;
                    }

                    $record = array(
                        "project_id" => $this->_project_id,
                        "pt_id" => $this->_pt_id,
                        "user_id" => $this->_user_id,
                        "reportdate" => $this->istext($this->_curdatetime),
                        "coa_id" => $rowcoa['coa_id'],
                        "coa" => $this->istext($rowcoa['coa']),
                        "flag" => $this->istext('H'),
                        "level" => $level,
                        "coatype" => $this->istext($rowcoa['type']),
                        "coalevel" => $rowcoa['level'],
                        "coaname" => $this->istext($coaname),
                        "parent_code" => $this->istext($parent_code),
                    );
                    $this->_querytb->insert_to_tmp($record);
                }
            }
        }
    }

    function create_suboncoaonlevel_2() {
        $result = $this->_querytb->get_coa_from_tmp();
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        if (!empty($result)) {
            foreach ($result as $row) {
                $resultjournal = $this->_querytb->get_coa_from_journaldetail_byperiode($row['coa'], $fromdate, $untildate);
                if (!empty($resultjournal)) {
                    foreach ($resultjournal as $rowjournal) {                        
                        $record = array(
                            "project_id" => $this->_project_id,
                            "pt_id" => $this->_pt_id,
                            "user_id" => $this->_user_id,
                            "reportdate" => $this->istext($this->_curdatetime),
                            "flag" => $this->istext('I'),
                            "level" => 3,
                            "flagshowdata" => $rowjournal['flagshowdata'],
                            "coa_id" => $rowjournal['coa_id'],
                            "coa" => $this->istext($rowjournal['coa']),
                            "coaname" => $this->istext($rowjournal['name']),
                            "coatype" => $this->istext($rowjournal['coatype']),
                            "parent_code" => $this->istext($rowjournal['parent_code']),
                            "coalevel" => $rowjournal['level'],
                            "prefix_id" => $rowjournal['prefix_id'],
                            "prefix" => $this->istext($rowjournal['prefix']),
                            "voucher_date" => $this->istext($rowjournal['voucher_date']),
                            "voucher_no" => $this->istext($rowjournal['voucher_no']),
                            "trxtype" => $this->istext($rowjournal['type']),
                            "amount" => $rowjournal['amount'],
                            "amount_debet" => $rowjournal['amount_debet'],
                            "amount_credit" => $rowjournal['amount_credit'],
                            "description" =>$this->istext($rowjournal['keterangan']),
                        );
                         $this->_querytb->insert_to_tmp($record);
                    }
                }
            }
        }
    }
    
     
    

    public function istext($param) {
        return $this->_helperdata->textforquery($param);
    }

    function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->datatb = $param;
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'getcoabyid':
                        $counter = 0;
                        $result = $this->_model->getcoabyid($param['coa_id']);
                        break;
                    case 'generatereport':
                        $counter = 0;
                        $result = $this->generateData($param);
                        break;
                    case 'generatereportexcelthismonth':
                        $counter = 0;
                            $result = $this->generateExcel($param); // $this->generateExcel($param);
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        break;
                }

                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.
     
        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
    }

}
