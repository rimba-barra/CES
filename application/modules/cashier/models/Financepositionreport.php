<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Cashier_Models_Financepositionreport extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //$this->_query = new Gl_Models_Generalmodel_Builtquery();
        $this->_query = new Gl_Models_Query_Subaccounttransaction();
        $this->_phpExcel  = new PHPExcel();
    }

    function Checklevelcoa($param) {
        $f = $param['fromcoa'];
        $tmp_f = explode(".", $f);
        $u = $param['untilcoa'];
        $tmp_u = explode(".", $u);
        $from = intval($tmp_f[0] . $tmp_f[1] . $tmp_f[2]);
        $until = intval($tmp_u[0] . $tmp_u[1] . $tmp_u[2]);
        $counter = ($from - $until);
        $result = array("counter" => $counter, "flagchange" => $param['flagchange']);
        return $result;
    }

    function getAllData($param) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $year = $tmp[1];
        $startdate = date("Y-m-d", strtotime($year . '-' . '01-' . '01'));
        $fromdate = date("Y-m-d", strtotime($param['fromdate']));
        if ($fromdate > $startdate) {
            $paramdate = 'NOSAME';
        } ELSE {
            $paramdate = 'SAME';
        }
        return $paramdate;
    }

    function rangeFilterCOA($param) {        
        $return = $this->_query->getrangekelsub($param['fromcoa'],$param['untilcoa'],$param['pt_id']);
        return $return;
    }

    function processReport($param) {
    
        $paramdate = $this->getAllData($param);
        $param['paramdate'] = $paramdate;
        $this->_query->setGroupby($param); //set paramater group by
      
        $this->_query->rpt_subtrx_getdatasub_fromrange($param); //set data by fromdate and untildate        
        $this->_query->rpt_subtrx_setsum_debetsub(); // create sum debet amount by fromdate and untildate 
        $this->_query->rpt_subtrx_setsum_creditsub(); //create sum credit amount by fromdate and untildate 
        $this->_query->rpt_subtrx_set_unionsub(); //binding amount sum debet and credit by fromdate and untildate 
       
        $this->_query->rpt_subtrx_getalldata_beginingbalance($param); // create set data for amount begining balance
        $this->_query->rpt_subtrx_setsum_debet1();  //create sum debet by condition for create begining balance amount
        $this->_query->rpt_subtrx_setsum_credit1(); //create sum credit by condition for create begining balance amount
        $this->_query->rpt_subtrx_set_union1(); //binding amount sum debet and credit for create begining balance amount
        $this->_query->rpt_subtrx_sum_beginingbalance(); // generate begining balance amount
        
        $this->_query->rpt_subtrx_getalldata_totalrange($param); // create set data for total range amount
        $this->_query->rpt_subtrx_setsum_debet2(); //create sum debet by condition for create total range amount
        $this->_query->rpt_subtrx_setsum_credit2(); //create sum credit by condition for create total range amount
        $this->_query->rpt_subtrx_set_union2(); //binding amount sum debet and credit for create total range amount
        $this->_query->rpt_subtrx_sum_totalrange(); // generate total range amount
        $this->_query->rpt_subtrx_sum_debet_credit(); // generate sum debet and credit by condition
      
        $this->_query->rpt_subtrx_sum_totalendrange(); // generate total end range by condition
        $this->_query->rpt_subtrx_settotaldata(); // generate total data
        $this->_query->rpt_subtrx_setgrandtotal(); // generate grand from total data by coa
        $this->_query->rpt_subtrx_bindingdata(); // binding data from datasub and join granddata
        $this->_query->rpt_subtrx_createsumdataaccount(); // binding data from datasub and join granddata
        $result = $this->_query->rpt_subtrx_finaldata(); // binding data from datasub and join granddata
        return $result;
    }

    function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'checklevelcoa':
                        $counter = 0;
                        $result = $this->Checklevelcoa($param);
                        break;
                    case 'getcoabyid':
                        $counter = 0;
                        $result = $this->_model->getcoabyid($param['coa_id']);
                        break;
                    case 'processreport':
                        $counter = 0;
                        $result = $this->processReport($param);
                        break;
                     case 'generatereportexcel':
                        $counter = 0;
                        $result = $this->generateExcel($param);
                        break;
                    case 'customefilter':
                        $counter = 0;
                        $result = $this->rangeFilterCOA($param);
                        break;
                   case 'justreturn':
                        $counter = 0;
                        $result = null;
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


      function generateExcel($param){
       
        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "cashier.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datakas = $this->execSP3("sp_report_posisiKeuangan_Kas", array($param['pt_id'],$param['project_id'],$param['report_date'],$param['is_liquid']));

        //die(print_r($datakas));


        // $ptname = $datapt[0][0]['name'];

       
                //$additional['header'] = array( $ptname, 'VOUCHER DEPARTMENT TRANSACTION', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']);
                $additional['title_report'] = array('FINANCE POSITION REPORT (KAS & BANK)');
                $additional['project_name'] = array('PROJECT',$param['project_name']);
                $additional['pt_name'] = array('PT',$param['pt_name']);
                $additional['report_date'] = array('REPORT DATE',$param['report_date']);
                $additional['liquid'] = array('LIQUID',$param['liquid']);
                $additional['print_date'] = array('PRINT DATE',$param['tgl_sekarang'].' '.$param['time_sekarang']);
                $additional['print_by'] = array('PRINT BY',$param['userprint']);
                $additional['empty_text'] = array('');
                $additional['kas'] = array('KAS');
                $additional['saldoawalkas'] = array('Saldo Kas Awal :','','',$datakas[0][0]['Saldo_Kas_Awal']);
                $additional['saldoawalkasbon'] = array('Saldo Kasbon Awal :','','',$datakas[0][0]['Saldo_Kasbon_Awal']);
                $additional['pengambilanbank'] = array('Pengambilan dari Bank :','','',$datakas[0][0]['Pengambilan_dari_Bank']);
                $additional['penerimaankas'] = array('Penerimaan Kas :','','',$datakas[0][0]['Penerimaan_Kas']);
                $additional['pengeluarankas'] = array('','Pengeluaran Kas :','','',$datakas[0][0]['Pengeluaran_Kas']);
                $additional['setorbank'] = array('','Setor ke Bank :','','',$datakas[0][0]['Setor_Bank']);
                $additional['saldoakhirkasbon'] = array('','Saldo Kasbon Akhir :','','',$datakas[0][0]['Saldo_Kasbon_Akhir']);
                $additional['saldoakhirkas'] = array('','Saldo Kas Akhir :','','',$datakas[0][0]['Saldo_Kas_Akhir']);
                $additional['totalkas'] = array('','','',$datakas[0][0]['Total_Penerimaan'],$datakas[0][0]['Total_Pegeluaran']);
                $additional['empty_text_2'] = array('');
                 $additional['empty_text_3'] = array('');
                $additional['bank'] = array('BANK');
                $additional['empty_text_4'] = array('');
                $additional['empty_text_5'] = array('');
                $additional['diperiksa_dibuat'] = array('','','Diperiksa :','','Dibuat :');

                $sheetname = '';
                $sheet = 0 ; 
                $titles = '';
                $sql = "sp_report_posisiKeuangan_Bank";
                $col = array('prefix_name', 'saldo_awal','debit','credit', 'saldo_akhir');
                $titles = array('Nama / Kode Bank (No. Rekening)', 'Saldo Awal','Penerimaan','Pengeluaran', 'Saldo Akhir');     

                $paramdata = array($param['pt_id'],$param['project_id'],$param['report_date'],$param['is_liquid']);
                $sheetname = "FinancePositionReport";
       

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

        //GENERAL STYLE

        $titleArraystyle = array(
            /*'font' => array(
                'bold' => true,
                'color' => array('rgb' => '2F4F4F'),
                'size' => 11
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ), */
            'borders' => array(
                  'bottom' => array(
                      'style' => PHPExcel_Style_Border::BORDER_THICK
                  )
              )
        );
        //STYLE SHEET 0
              $lastrecord = $doc->getActiveSheet()->getHighestRow();
              $datacount = $doc->getActiveSheet()->getHighestDataRow();
              $grandtotal = $datacount - 3;

            $doc->getActiveSheet()->getStyle('D10:D18')->getNumberFormat()->setFormatCode('#,##0.00');
            $doc->getActiveSheet()->getStyle('E10:E18')->getNumberFormat()->setFormatCode('#,##0.00');
             $doc->getActiveSheet()->getStyle("A7:E7")->applyFromArray($titleArraystyle);
              $doc->getActiveSheet()->getStyle("B17:E17")->applyFromArray($titleArraystyle);
                $doc->getActiveSheet()->getStyle("A19:E19")->applyFromArray($titleArraystyle);
                  $doc->getActiveSheet()->getStyle("A21:E17")->applyFromArray($titleArraystyle);
                  $doc->getActiveSheet()->getStyle("A22:E22")->applyFromArray($titleArraystyle);
                 $doc->getActiveSheet()->getStyle("A1:A9")->getFont()->setBold(true);
                 $doc->getActiveSheet()->getStyle("A22:E22")->getFont()->setBold(true);
                 $doc->getActiveSheet()->getStyle("A21")->getFont()->setBold(true);
                 $doc->getActiveSheet()->getStyle("D18:E18")->getFont()->setBold(true);
                 $doc->getActiveSheet()->getStyle('B23:E'.$lastrecord)->getNumberFormat()->setFormatCode('#,##0.00');
                  $doc->getActiveSheet()->getStyle("B".$lastrecord.":E".$lastrecord)->getFont()->setBold(true);
                 $doc->getActiveSheet()->getStyle("B".$grandtotal.":E".$grandtotal)->getFont()->setBold(true);



       
       
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;

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
            array_push($final, $additional['title_report']);
            array_push($final, $additional['project_name']);
            array_push($final, $additional['pt_name']);
            array_push($final, $additional['report_date']);
            array_push($final, $additional['liquid']);
            array_push($final, $additional['print_date']);
            array_push($final, $additional['print_by']);
            array_push($final, $additional['empty_text']);
            array_push($final, $additional['kas']);
            array_push($final, $additional['saldoawalkas']);
            array_push($final, $additional['saldoawalkasbon']);
            array_push($final, $additional['pengambilanbank']);
            array_push($final, $additional['penerimaankas']);
            array_push($final, $additional['pengeluarankas']);
            array_push($final, $additional['setorbank']);
            array_push($final, $additional['saldoakhirkasbon']);
            array_push($final, $additional['saldoakhirkas']);
            array_push($final, $additional['totalkas']);
            array_push($final, $additional['empty_text_2']);
            array_push($final, $additional['empty_text_3']);
            array_push($final, $additional['bank']);

            array_push($final,  $titles); //give title

            foreach ($datas as $d) {
               /* if($d['flag'] == 'T'){

                }*/

                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if(in_array($key, $col)){
                        array_push($tmp, $d[$key]);
                    }
                }
                array_push($final, $tmp);
                $tmp = array();
            }

           array_push($final, $additional['empty_text_4']);
           array_push($final, $additional['empty_text_5']);
           array_push($final, $additional['diperiksa_dibuat']);


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

            $report_date =  str_replace("-","",$additional['report_date'][1]);

            $filename = "FinancePositionReport_".$report_date.".xls";
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
