<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Cashier_Models_Pengeluaranharianreport extends Zend_Db_Table_Abstract {

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
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

       
                $additional['header'] = array( $ptname, 'VOUCHER DEPARTMENT TRANSACTION', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']);
                $sheetname = '';
                $sheet = 0 ; 
                $titles = '';
                $sql = "sp_reportvouchertrans";
                $col = array('voucher_no', 'coa','voucher_date','department', 'kelsub', 'd_description', 'sub_code','vendorname','dataflow','voucher_no_kasir','status','amount');
                $titles = array('VOUCHER NO / NO. URUT', 'COA','VOUCHER DATE','DEPARTMENT', 'SUB GROUP', 'KETERANGAN', 'SUB ACC', 'VENDOR NAME','DATAFLOW','VOUCHER NO. KASIR','STATUS','JUMLAH');     

                $paramdata = array($param['pt_id'],$param['project_id'],$param['fromvendorid'],$param['untilvendorid'],$param['fromdeptid'],$param['untildeptid'],$param['transactiontype'],$param['groupby'],$param['dataflow'],$param['detailcoa'],$param['fromdate'],$param['untildate']);
                $sheetname = "VoucherDeptTransaction";
       

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
       
            $doc->getActiveSheet()->getStyle('C3:L100000')->getNumberFormat()->setFormatCode('#,##0.00');
            $doc->getActiveSheet()->getStyle("A2:L2")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
            $doc->getActiveSheet()->getStyle("A3:L70000")->getFont()->setSize(9);
            $doc->getActiveSheet()->getColumnDimension('A')->setWidth(25);
            $doc->getActiveSheet()->getColumnDimension('B')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('D')->setWidth(25);
            $doc->getActiveSheet()->getColumnDimension('F')->setWidth(50);
             $doc->getActiveSheet()->getColumnDimension('G')->setWidth(15);
              $doc->getActiveSheet()->getColumnDimension('H')->setWidth(30);
               $doc->getActiveSheet()->getColumnDimension('I')->setWidth(10);
                $doc->getActiveSheet()->getColumnDimension('K')->setWidth(20);

       
       
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

            $filename = "VoucherDeptTrans.xls";
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
