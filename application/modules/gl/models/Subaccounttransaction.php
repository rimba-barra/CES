<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';
require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreportv2.php';

class Gl_Models_Subaccounttransaction extends Zend_Db_Table_Abstract {

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

                        // if ($param['reporttype'] == 'EXCEL 2') {
                            $result = $this->generateExcel($param);
                        // } else {    
                            // $result = $this->generateExcelnew($param);
                        // }

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

    function generateExcel($param) {

        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        $lib = new Columnconfigreport();

        $pythonFile = "General.py";

        if ($param['reporttype'] == 'EXCEL 2') {

            if ($param['formatreport'] == 'FORMAT-1') {
                
                $lib->setSheetNumber(0);
                $lib->setTitleSheet("SubaccountTransaction(FORMAT-1)");
                $lib->setHeader(array( $ptname, 'SUBACCOUNT TRANSACTION', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']));
                $lib->setSP("gl_2018.dbo.sp_reportsubtransaction");
                $lib->setSPParam(array($param['reportby'],$param['voucherdata'],$param['subdata'],$param['detaildatasub'],$param['pt_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code'],$param['project_id']));
                $lib->setColumnTitle(array('KODE ACC', 'NAMA ACC','VOUCHER DATE','VOUCHER NO', 'KODE SUB ACC', 'KAWASAN SUB', 'KETERANGAN VOUCHER', 'KETERANGAN SUB ACC', 'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR'));

                $lib->setConfig('coa', 10, 'right', '');
                $lib->setConfig('name', 20, 'right', '');
                $lib->setConfig('voucher_date', 20, 'center', 'dd-mm-yyyy');
                $lib->setConfig('voucher_no', 20, 'right', '');
                $lib->setConfig('code');
                $lib->setConfig('kawasan');
                $lib->setConfig('description', 30);
                $lib->setConfig('subdescription', 30);
                $lib->setConfig('beg_balance2', 25, 'right', '#,##0.00');
                $lib->setConfig('amount_d', 25, 'right', '#,##0.00');
                $lib->setConfig('amount_c', 25, 'right', '#,##0.00');
                $lib->setConfig('end_balance2', 25, 'right', '#,##0.00');
                Main_Box_GlobalParams::$EXEC_SP[] = $lib->getQuery();

                $json = $lib->generateJSONConfig();

            } else {

                $kelsub = "All";
                if ($param['fromkelsub'] != "" || $param['fromkelsub'] != null) {
                    $kelsub = $param['fromkelsub'].' to '.$param['untilkelsub'];
                }

                $subacc = "All";
                if ($param['fromsubacccode'] != "" || $param['fromsubacccode'] != null) {
                    $subacc = $param['fromsubacccode'].' to '.$param['untilsubacccode'];
                }
                
                $lib->setSheetNumber(0);
                $lib->setTitleSheet("SubaccountTransaction(FORMAT-2)");
                $lib->setHeader(array('SUBACCOUNT TRANSACTION Account Code (Detail)','','','','','',''));
                $lib->setHeader(array($ptname,'','','','','',''));
                $lib->setHeader(array('Period:', $param['fromdate'].' to '.$param['untildate'],'','','','',''));
                $lib->setHeader(array('Account No:', $param['coastart_id'].' to '.$param['coaend_id'],'','','','',''));
                $lib->setHeader(array('Sub Acc Group:', $kelsub,'','','','',''));
                $lib->setHeader(array('Sub Acc Code:', $subacc,'','','','',''));
                $lib->setSP("gl_2018.dbo.sp_reportsubtransaction_20190716");
                $lib->setSPParam(array($param['reportby'],$param['voucherdata'],$param['subdata'],$param['detaildatasub'],$param['pt_id'],$param['project_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code']));
                
                if ($param['detaildatasub'] == 1) {
                    $lib->setColumnTitle(array('KODE SUB ACC', 'KAWASAN SUB', 'VOUCHER NO','KETERANGAN SUB ACC', 'TANGGAL TRANSAKSI', 'KETERANGAN VOUCHER', 'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR','TYPE'));

                    $lib->setConfig('sub_code', 15);
                    $lib->setConfig('kawasan');
                    $lib->setConfig('voucher_no', 30);
                    $lib->setConfig('sub_description', 40);
                    $lib->setConfig('trans_date', 25, 'center', 'dd-mm-yyyy');
                    $lib->setConfig('voucher_descr', 40);
                    $lib->setConfig('beg_bal', 25, 'right', '#,##0.00');
                    $lib->setConfig('debit', 25, 'right', '#,##0.00');
                    $lib->setConfig('credit', 25, 'right', '#,##0.00');
                    $lib->setConfig('end_bal', 25, 'right', '#,##0.00');
                    $lib->setConfig('type', 25);
                    $lib->setRemoveColumn(array('type'));

                } else {
                    $lib->setColumnTitle(array('KODE SUB ACC', 'KAWASAN SUB', 'KETERANGAN SUB ACC', 'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR','TYPE'));

                    $lib->setConfig('sub_code', 15);
                    $lib->setConfig('kawasan');
                    $lib->setConfig('sub_description', 40);
                    $lib->setConfig('beg_bal', 25, 'right', '#,##0.00');
                    $lib->setConfig('debit', 25, 'right', '#,##0.00');
                    $lib->setConfig('credit', 25, 'right', '#,##0.00');
                    $lib->setConfig('end_bal', 25, 'right', '#,##0.00');
                    $lib->setConfig('type', 25);
                    $lib->setRemoveColumn(array('type'));
                }       
                
                $lib->setCondition('type', '==', 'H', true);
                $lib->setCondition('type', '==', 'ST', true);
                $lib->setCondition('type', '==', 'GT', true);
                Main_Box_GlobalParams::$EXEC_SP[] = $lib->getQuery();

                $json = $lib->generateJSONConfig();

            }
        } else {

            $lib = new Columnconfigreportv2();

            $props = array(
                array(
                    'title' => 'Base On Acc. Code',
                    'reportby' => 1,
                    'detaildatasub' => 2
                ),
                array(
                    'title' => 'Base On Acc. Code (Detail)',
                    'reportby' => 1,
                    'detaildatasub' => 1
                ),
                array(
                    'title' => 'Base On Sub Acc. Code',
                    'reportby' => 2,
                    'detaildatasub' => 2
                ),
                array(
                    'title' => 'Base On Sub Acc. Code (Detail)',
                    'reportby' => 2,
                    'detaildatasub' => 1
                )
            );

            for ($i = 0; $i < count($props); $i++) {

                $kelsub = "All";
                if ($param['fromkelsub'] != "" || $param['fromkelsub'] != null) {
                    $kelsub = $param['fromkelsub'].' to '.$param['untilkelsub'];
                }

                $subacc = "All";
                if ($param['fromsubacccode'] != "" || $param['fromsubacccode'] != null) {
                    $subacc = $param['fromsubacccode'].' to '.$param['untilsubacccode'];
                }

                $lib->setSheetNumber($i);
                $lib->setTitleSheet($props[$i]['title']);

                $lib->setHeader(array('SUB TRANSACTION STATEMENT'));
                $lib->setHeader(array($props[$i]['title']));
                $lib->setHeader(array($ptname));                    
                $lib->setHeader(array('Account No:', $param['coastart_id'].' to '.$param['coaend_id']));
                $lib->setHeader(array('Sub Acc Group:', $kelsub));
                $lib->setHeader(array('Sub Code:', $subacc));
                $lib->setHeader(array('Transaction Date:', $param['fromdate'].' to '.$param['untildate']));
                $lib->setHeader(array(''));
                
                $lib->setHeaderTable(
                    array('Sub Code', 'Voucher No.', 'Sub Description', '','', 'Beginning Balance', 'Debit', '','Credit','','Ending Balance','Type','Kawasan'),
                    array(
                        'bold' => true,
                        'font_size' => 11,
                        'font_color' => '2F4F4F',
                        'valign' => 'vcenter',
                        'align' => 'left',
                        'top' => true
                    )
                );
                $lib->setHeaderTable(
                    array('', '', '','Transaction Date', 'Description', '', '','','','','','',''),
                    array(
                        'bold' => true,
                        'font_size' => 11,
                        'font_color' => '2F4F4F',
                        'valign' => 'vcenter',
                        'align' => 'center',
                        'bottom' => true
                    )
                );

                $lib->setMergedCell('A1', 'L1');
                $lib->setMergedCell('A2', 'L2');
                $lib->setMergedCell('A9', 'A10');
                $lib->setMergedCell('B9', 'B10');
                $lib->setMergedCell('C9', 'E9', "center", "left");
                $lib->setMergedCell('F9', 'F10');
                $lib->setMergedCell('G9', 'G10');
                $lib->setMergedCell('H9', 'H10');
                $lib->setMergedCell('I9', 'I10');
                $lib->setMergedCell('J9', 'J10');
                $lib->setMergedCell('K9', 'K10');
                $lib->setMergedCell('L9', 'L10');

                

                // $lib->setHeader(array($ptname, 'SUBACCOUNT TRANSACTION', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']));
                
                $sp_param = array($props[$i]['reportby'],$param['voucherdata'],$param['subdata'],$props[$i]['detaildatasub'],$param['pt_id'],$param['project_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code']);
                $lib->setQuery("gl_2018.dbo.sp_reportsubtransaction_new '".implode("','", $sp_param)."'");
                
                Main_Box_GlobalParams::$EXEC_SP[] = $lib->getQuery();
                
                $lib->setColumn(['sub_code', 'voucher_no', 'sub_description', 'trans_date', 'voucher_descr', 'beg_bal', 'debit', 'debit_detail', 'credit', 'credit_detail', 'end_bal', 'type', 'kawasan']);

                $lib->setTableConfig('kawasan', '', 35);
                $lib->setTableConfig('voucher_no', '', 35);
                $lib->setTableConfig('sub_description', '', 5);
                $lib->setTableConfig('trans_date', '', 20, 'center');
                $lib->setTableConfig('voucher_descr', '', 40);
                $lib->setTableConfig('beg_bal', '', 25, 'right', '#,##0.00');
                $lib->setTableConfig('debit', '', 25, 'right', '#,##0.00');
                $lib->setTableConfig('debit_detail', '', 25, 'right', '#,##0.00');
                $lib->setTableConfig('credit', '', 25, 'right', '#,##0.00');
                $lib->setTableConfig('credit_detail', '', 25, 'right', '#,##0.00');
                $lib->setTableConfig('end_bal', '', 25, 'right', '#,##0.00');

                // $col = array('sub_code', 'kawasan', 'voucher_no','sub_description', 'trans_date', 'voucher_descr','beg_bal','debit','debit_detail','credit','credit_detail','end_bal','type');

                // $lib->setConfig('sub_code', 25, 'left'); 
                // // $lib->setConfig('kawasan', 35, 'left');
                // $lib->setConfig('voucher_no', 35, 'left');
                // $lib->setConfig('sub_description', 5, 'left');
                // $lib->setConfig('trans_date', 20, 'center');
                // $lib->setConfig('voucher_descr', 40, 'left');
                // $lib->setConfig('beg_bal', 25, 'right', '#,##0.00');
                // $lib->setConfig('debit', 25, 'right', '#,##0.00');
                // $lib->setConfig('debit_detail', 25, 'right', '#,##0.00');
                // $lib->setConfig('credit', 25, 'right', '#,##0.00');
                // $lib->setConfig('credit_detail', 25, 'right', '#,##0.00');
                // $lib->setConfig('end_bal', 25, 'right', '#,##0.00');
                // $lib->setConfig('type', 25, 'right');
                // $lib->setConfig('kawasan', 30);

                $lib->setFormatWithCondition('type', '=', 'H', array('bold' => 1));
                $lib->setFormatWithCondition('type', '=', 'ST', array('bold' => 1));
                $lib->setFormatWithCondition('type', '=', 'GT', array('bold' => 1));

                $lib->setHiddenColumn(array('type'));

                $json = $lib->generateJSONConfig();

                $pythonFile = "_General.py";

            }
        }

        // print_r($json); exit;
        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_subaccounttransaction_'.date('YmdHis').'_'.$param['pt_id'].'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $filename = "report_subaccounttransaction_".$param['pt_id'].$param['project_id'].".xlsx";
        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}/_General.py {$base_64_file} {$filename}"; exit; // {$base_64} 
        exec("python {$path}/{$pythonFile} {$base_64_file} {$filename} 2>&1", $output); // {$base_64}
        $ptname = str_replace(' ', '_', $param['pt_name']);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;
        $param['output'] = $output;

        if ($output[0] != $filename) {
            return false;
        }

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }

    function generateExcelNotUsed($param){
       
        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        if($param['formatreport'] == 'FORMAT-1'){
                $additional['header'] = array( $ptname, 'SUBACCOUNT TRANSACTION', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']);
                
                $sheetname = '';
                $sheet = 0 ; 
                $titles = '';
                $sql = "sp_reportsubtransaction";
                $col = array('coa', 'name','voucher_date','voucher_no', 'code', 'kawasan', 'description', 'subdescription','beg_balance2','amount_d','amount_c','end_balance2');
                $titles = array('KODE ACC', 'NAMA ACC','VOUCHER DATE','VOUCHER NO', 'KODE SUB ACC', 'KAWASAN SUB', 'KETERANGAN VOUCHER', 'KETERANGAN SUB ACC', 'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR');     
                $paramdata = array($param['reportby'],$param['voucherdata'],$param['subdata'],$param['detaildatasub'],$param['pt_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code'],$param['project_id']);
                $sheetname = "SubaccountTransaction(FORMAT-1)";
        }else{

                $kelsub = "All";
                if ($param['fromkelsub'] != "" || $param['fromkelsub'] != null) {
                    $kelsub = $param['fromkelsub'].' to '.$param['untilkelsub'];
                }

                $subacc = "All";
                if ($param['fromsubacccode'] != "" || $param['fromsubacccode'] != null) {
                    $subacc = $param['fromsubacccode'].' to '.$param['untilsubacccode'];
                }
                $additional['header'] = array(
                    array('SUBACCOUNT TRANSACTION Account Code (Detail)','','','','','',''),
                    array($ptname,'','','','','',''),
                    array('Period:', $param['fromdate'].' to '.$param['untildate'],'','','','',''),
                    array('Account No:', $param['coastart_id'].' to '.$param['coaend_id'],'','','','',''),
                    array('Sub Acc Group:', $kelsub,'','','','',''),
                    array('Sub Acc Code:', $subacc,'','','','','')
                ); //$ptname, 'SUBACCOUNT TRANSACTION Account Code (Detail)', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']
                $sheetname = '';
                $sheet = 0 ; 
                $titles = '';
                $sql = "sp_reportsubtransaction_20190716";

                if ($param['detaildatasub'] == 1) {
                    $col = array('sub_code', 'kawasan', 'voucher_no','sub_description', 'trans_date', 'voucher_descr','beg_bal','debit','credit','end_bal','type');
                    $titles = array('KODE SUB ACC', 'KAWASAN SUB', 'VOUCHER NO','KETERANGAN SUB ACC', 'TANGGAL TRANSAKSI', 'KETERANGAN VOUCHER', 'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR','TYPE');    
                } else {
                    $col = array('sub_code', /* 'voucher_no', */'sub_description', /* 'trans_date', 'voucher_descr', */'beg_bal','debit','credit','end_bal','type');
                    $titles = array('KODE SUB ACC', /* 'VOUCHER NO', */'KETERANGAN SUB ACC', /* 'TANGGAL TRANSAKSI', 'KETERANGAN VOUCHER',  */'SALDO AWAL','DEBET','KREDIT','SALDO AKHIR','TYPE');    
                }
                 
                $paramdata = array($param['reportby'],$param['voucherdata'],$param['subdata'],$param['detaildatasub'],$param['pt_id'],$param['project_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code']);
                $sheetname = "SubaccountTransaction(FORMAT-2)";


        }

        $doc = $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);
        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();
        //$rowcount = $doc->setActiveSheetIndex(0)->getHighestDataRow();

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
        if($param['formatreport'] == 'FORMAT-1'){
            $doc->getActiveSheet()->getStyle('H2:L'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
            $doc->getActiveSheet()->getStyle("A2:L2")->applyFromArray($titleArraystyle);
            //$doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
            //$doc->getActiveSheet()->getStyle("A3:J70000")->getFont()->setSize(9);
            $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
            $doc->getActiveSheet()->getColumnDimension('B')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('D')->setWidth(40);
            $doc->getActiveSheet()->getColumnDimension('G')->setWidth(40);
        }else{
            if ($param['detaildatasub'] == 1) {
                $doc->getActiveSheet()->getStyle('F8:J'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
                $doc->getActiveSheet()->getStyle("A7:J7")->applyFromArray($titleArraystyle);
                $doc->getActiveSheet()->getStyle("A1:B6")->getFont()->setBold(true);
                //$doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
                //$doc->getActiveSheet()->getStyle("A3:I70000")->getFont()->setSize(9);
                $doc->getActiveSheet()->getColumnDimension('A')->setWidth(15);
                $doc->getActiveSheet()->getColumnDimension('C')->setWidth(30);
                $doc->getActiveSheet()->getColumnDimension('F')->setWidth(40);
                // $doc->getActiveSheet()->getColumnDimension('F')->setWidth(40);

                for ($i = 8; $i <= $lastrecord0; $i++) {
                    $type = $doc->getActiveSheet()->getCell('K'.$i)->getValue();
                    if($type == 'H' || $type == 'ST' || $type == 'GT'){
                        $doc->getActiveSheet()->getStyle('A'.$i.':J'.$i)->getFont()->setBold(true);
                    }
                }
                // $doc->getActiveSheet()->getStyle("A{$lastrecord0}:F{$lastrecord0}")->getFont()->setBold(true);
                $doc->getActiveSheet()->removeColumn('K');
            } else {
                $doc->getActiveSheet()->getStyle('C8:G'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
                $doc->getActiveSheet()->getStyle("A7:G7")->applyFromArray($titleArraystyle);
                $doc->getActiveSheet()->getStyle("A1:B6")->getFont()->setBold(true);
                //$doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
                //$doc->getActiveSheet()->getStyle("A3:I70000")->getFont()->setSize(9);
                $doc->getActiveSheet()->getColumnDimension('A')->setWidth(15);
                $doc->getActiveSheet()->getColumnDimension('C')->setWidth(30);
                // $doc->getActiveSheet()->getColumnDimension('D')->setWidth(40);
                // $doc->getActiveSheet()->getColumnDimension('F')->setWidth(40);

                for ($i = 8; $i <= $lastrecord0; $i++) {
                    $type = $doc->getActiveSheet()->getCell('H'.$i)->getValue();
                    if($type == 'H' || $type == 'ST' || $type == 'GT'){
                        $doc->getActiveSheet()->getStyle('A'.$i.':G'.$i)->getFont()->setBold(true);
                    }
                }
                // $doc->getActiveSheet()->getStyle("A{$lastrecord0}:F{$lastrecord0}")->getFont()->setBold(true);
                $doc->getActiveSheet()->removeColumn('H');
            }
        }
       
        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;

    }

    function generateExcelNew($param){
       
        //BUILT EXCEL

        //GET PT NAME
        $this->_schema = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        $kelsub = "All";
        if ($param['fromkelsub'] != "" || $param['fromkelsub'] != null) {
            $kelsub = $param['fromkelsub'].' to '.$param['untilkelsub'];
        }

        $subacc = "All";
        if ($param['fromsubacccode'] != "" || $param['fromsubacccode'] != null) {
            $subacc = $param['fromsubacccode'].' to '.$param['untilsubacccode'];
        }
         //$ptname, 'SUBACCOUNT TRANSACTION Account Code (Detail)', '', 'PERIOD : '.$param['fromdate'].' UNTIL '.$param['untildate']
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';
        $sql = "sp_reportsubtransaction_new";
        $numberofsheet = 4;

        $col = array('sub_code', 'kawasan', 'voucher_no','sub_description', 'trans_date', 'voucher_descr','beg_bal','debit','debit_detail','credit','credit_detail','end_bal','type');
        $titles = array(
            array('Sub Code', 'Voucher No.', 'Sub Description', '','', 'Beginning Balance', '', 'Debit','','Credit','Ending Balance','Type'),
            array('', '', '','Transaction Date', 'Description', '', '','','','','','')
        );
            
        
        $sheetnames = array(
            'Base On Acc. Code',
            'Base On Acc. Code (Detail)',
            'Base On Sub Acc. Code',
            'Base On Sub Acc. Code (Detail)',
        );

        for ($i = 0; $i < $numberofsheet; $i++) {

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

            $titleArraystyle['alignment'] = array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
                'vertical' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT
            );

            $titleArraystyle['borders'] = array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_NONE
                )
            );

            if ($i == 0) {
                $reportby = 1;
                $detaildatasub = 2;
                $basedon = "Acc. Code";
            } elseif ($i == 1) {
                $reportby = 1;
                $detaildatasub = 1;
                $basedon = "Acc. Code (Detail)";
            } elseif ($i == 2) {
                $reportby = 2;
                $detaildatasub = 2;
                $basedon = "Sub Acc. Code";
            } elseif ($i == 3) {
                $reportby = 2;
                $detaildatasub = 1;
                $basedon = "Sub Acc. Code (Detail)";
            }

            $additional['header'] = array(
                array('SUB TRANSACTION STATEMENT','','','','','',''),
                array('Base On : '.$basedon,'','','','','',''),
                array($ptname,'','','','','',''),
                array('Account No:', $param['coastart_id'].' to '.$param['coaend_id'],'','','','',''),
                array('Sub Acc Group:', $kelsub,'','','','',''),
                array('Sub Code:', $subacc,'','','','',''),
                array('Transaction Date:', $param['fromdate'].' to '.$param['untildate'],'','','','','')
            );

            $paramdata = array($reportby,$param['voucherdata'],$param['subdata'],$detaildatasub,$param['pt_id'],$param['project_id'],$param['coastart_id'],$param['coaend_id'],$param['fromdate'],$param['untildate'],$param['kelsub_id'],$param['fromsubacc_code'],$param['untilsubacc_code']);

            $doc = $this->genReportexcel($param, $sql, $i,$sheetnames[$i], $additional, $paramdata, $col,  $titles, FALSE);

            $lastrecord = $doc->setActiveSheetIndex($i)->getHighestRow();

            $doc->getActiveSheet()->mergeCells('A1:K1');
            $doc->getActiveSheet()->mergeCells('A2:K2');

            $doc->getActiveSheet()->getColumnDimension('A')->setWidth(18);
            $doc->getActiveSheet()->getColumnDimension('C')->setWidth(2);
            $doc->getActiveSheet()->getColumnDimension('D')->setWidth(15);
            $doc->getActiveSheet()->getColumnDimension('E')->setWidth(82);
            $doc->getActiveSheet()->getColumnDimension('F')->setWidth(18);
            $doc->getActiveSheet()->getColumnDimension('G')->setWidth(18);
            $doc->getActiveSheet()->getColumnDimension('H')->setWidth(18);
            $doc->getActiveSheet()->getColumnDimension('I')->setWidth(18);

            $doc->getActiveSheet()->getStyle("A8:L9")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getStyle("A1:K7")->getFont()->setBold(true);
            $doc->getActiveSheet()->getStyle("A1:K2")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);;

            $doc->getActiveSheet()->getStyle("A8:L8")->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $doc->getActiveSheet()->getStyle("A9:L9")->getBorders()->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

            $doc->getActiveSheet()->getStyle("F10:K{$lastrecord}")->getNumberFormat()->setFormatCode('#,##0.00');

            for ($j = 10; $j <= $lastrecord; $j++) {
                $type = $doc->getActiveSheet()->getCell('L'.$j)->getValue();

                if($type == 'ST' || $type == 'GT'){
                    $doc->getActiveSheet()->getStyle('A'.$j.':K'.$j)->getFont()->setBold(true);

                    if ($type == 'ST') {
                        $doc->getActiveSheet()->getStyle("A{$j}:K{$j}")->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
                    } elseif ($type == 'GT') {
                        $doc->getActiveSheet()->getStyle("A{$j}:K{$j}")->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
                        $doc->getActiveSheet()->getStyle("A{$j}:K{$j}")->getBorders()->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
                    }
                }
            }

            $doc->getActiveSheet()->removeColumn('L');
        }

        $this->genReportexcel($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


        return $this->_tmpparam;

    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "gl_2018.dbo";

            $dataArray = $this->execSP3($sql, $paramdata); 

            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }
           

            $tmp = array();
            $final = array();

            if ($param['formatreport'] == 'FORMAT-2') {
                foreach ($additional['header'] as $h) {
                    array_push($final, $h);
                }
            } else {
                array_push($final, $additional['header']);
            }

            if ($param['reporttype'] == 'EXCEL') {
                foreach ($titles as $t) {
                    array_push($final, $t);
                }
            } else {
                array_push($final, $titles);
            }

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

            $filename = "report_subaccounttransaction.xlsx";
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

  

}
