<?php

require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../box/library/EmailKasbank.php';

error_reporting(E_ERROR | E_PARSE);

class Cashier_Models_Cashbankpositionreport extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $function = null;
    private $_tmp_data= null;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_report_bankreport';
        $this->_user_id = $this->_session->getUserId();
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_excel = new Columnconfigreport;
        $this->_phpExcel  = new PHPExcel();
    }

    function cashbankpositionreportRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        
                        
                       
                        $counter = 0;
                        $message = null;
                        $valid = true;
                        break;
                    case 'getemailandsubject':

                        if ($param['bykonsol'] != 1) {
                            $param['consolidation_id'] = 0;
                        }
                        $result = $this->execSP3('cashier.dbo.sp_reportcashbankposition_email', array($param['hideparam'], $param['project_id'], $param['pt_id'], $param['user_id'], $param['consolidation_id']));
                        
                        $result[0][0]['html'] = $this->generateHtml($param);
                        $valid = true;
                        $data = $result[0][0];
                        $message = null;
                        $counter = 0;
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

    function cashbankpositionreportCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        
                        $data = $this->generateReportExcel($param);
                       
                        $counter = 0;
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

    function generateReportExcel($param) {

        if ($param['format'] == 'EXCEL') {
            if ($param['type_report'] == 'K') {
                $sheetlabel = array(
                    0 => "Summary",
                    1 => "Cash Detail"
                );
            } elseif ($param['type_report'] == 'B') {
                $sheetlabel = array(
                    0 => "Summary",
                    1 => "Bank Detail",
                );
            } else {
                $sheetlabel = array(
                    0 => "Summary",
                    1 => "Cash Detail",
                    2 => "Bank Detail",
                    3 => "CashBank Detail"
                );
            }
        } else {
            $sheetlabel = array(
                0 => "Summary"
            );
        }

        $is_liquid = array(0 => 'No Liquid', 1 => 'Liquid', 2 => 'All Liquid Status');

        if ($param['bykonsol'] == 1) {
            $filename = "CashBank_Position_Report_".$this->cleanString($param['consolidation_name']).".xlsx";
        } else {
            $filename = "CashBank_Position_Report_".$this->cleanString($param['pt_name']).".xlsx";
        }
        $json = [];

        foreach ($sheetlabel as $idx => $sheetname) {

            $param['sheetlabel'] = $sheetname;
            $param['sheetindex'] = $idx;
            $param['is_liquid_label'] = $is_liquid[$param['is_liquid']];

            if ($sheetname == 'Summary') {
                if ($param['datasource'] == 1) {
                    $this->generateReportSummaryFromTBExcel($param);
                } else {
                    $this->generateReportSummaryExcel($param);
                }
            } elseif ($sheetname == 'Cash Detail') {
                $this->generateReportCashDetail($param);
            } elseif ($sheetname == 'Bank Detail') {
                $this->generateReportBankDetail($param);
            } elseif ($sheetname == 'CashBank Detail') {
                $this->generateReportCashBankDetail($param);
            }

            $json = $this->_excel->generateJSONConfig();
        } 

        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_cashbankpositionreport_'.date('YmdHis').'_'.$param['project_id'].$param['pt_id'].'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        // echo "python {$path}/custom_command_cashbankpositionreport.py {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        exec("python {$path}/custom_command_cashbankpositionreport.py {$filename} {$param['type_report']}");
        $ptname = str_replace(' ', '_', $param['pt_name']);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }

    function generateReportSummaryExcel($param){

        $this->_schema = "cashier.dbo";
        $this->converter = new Cashier_Box_Tools();
        $datakas = $this->execSP3("sp_report_posisiKeuangan_Kas2", array($param['pt_id'],$param['project_id'],$param['realization_date_from'],$param['realization_date_until'],$param['is_liquid']));

        $borderconfig = array(
            'style' => 'thick',
            'bordertop' => "True"
        );

        $this->_excel->setSheetNumber($param['sheetindex']);
        $this->_excel->setTitleSheet($param['sheetlabel']);
        $this->_excel->setHeader(array('FINANCE POSITION REPORT (KAS & BANK)'));
        $this->_excel->setHeader(array('PROJECT',$param['project_name']));
        $this->_excel->setHeader(array('PT',$param['pt_name']));
        $this->_excel->setHeader(array('REPORT DATE',date('d-m-Y', strtotime($param['realization_date_from'])).' to '.date('d-m-Y', strtotime($param['realization_date_until']))));
        $this->_excel->setHeader(array('LIQUID',$param['is_liquid_label']));
        $this->_excel->setHeader(array('PRINT DATE',date('d-m-Y H:i:s')));
        $this->_excel->setHeader(array('PRINT BY',$param['userprint']));
        $this->_excel->setHeader(array(''));

        if ($param['type_report'] == 'K' || $param['type_report'] == '') {

            $this->_excel->setHeader(array('KAS'));
            $this->_excel->setHeader(array('Saldo Kas Awal :','','','',(int)$datakas[0][0]['Saldo_Kas_Awal']));
            $this->_excel->setHeader(array('Saldo Kasbon Awal :','','','',(int)$datakas[0][0]['Saldo_Kasbon_Awal']));
            $this->_excel->setHeader(array('Pengambilan dari Bank :','','','',(int)$datakas[0][0]['Pengambilan_dari_Bank']));
            $this->_excel->setHeader(array('Penerimaan Kas :','','','',(int)$datakas[0][0]['Penerimaan_Kas']));
            $this->_excel->setHeader(array('','Pengeluaran Kas :','','','',(int)$datakas[0][0]['Pengeluaran_Kas']));
            $this->_excel->setHeader(array('','Setor ke Bank :','','','',(int)$datakas[0][0]['Setor_Bank']));
            $this->_excel->setHeader(array('','Saldo Kasbon Akhir :','','','',(int)$datakas[0][0]['Saldo_Kasbon_Akhir']));
            $this->_excel->setHeader(array('','Saldo Kas Akhir :','','','',(int)$datakas[0][0]['Saldo_Kas_Akhir']));
            $this->_excel->setHeader(array('','','','',(int)$datakas[0][0]['Total_Penerimaan'],(int)$datakas[0][0]['Total_Pegeluaran']));

            $this->_excel->setHeader(array(''));
            $this->_excel->setHeader(array(''));

            $this->_excel->setCustomStyle("A10", "F17",  "", "", "False");
            $this->_excel->setCustomStyle("D10", "F18",  "", "", "False", "right", "#,##0.00;(#,###0.00)");
            $this->_excel->setCustomStyle("B18", "F18",  "", "", "True", "right", "#,##0.00;(#,###0.00)", "True", $borderconfig);
            $this->_excel->setCustomStyle("A20", "F20",  "", "", "True", "right", "#,##0.00;(#,###0.00)", "True", $borderconfig);   
        }

        if ($param['type_report'] == 'B' || $param['type_report'] == '') {

            $this->_excel->setHeader(array('BANK'));
            $this->_excel->setSP('cashier.dbo.sp_report_posisiKeuangan_Bank2');
            $this->_excel->setSPParam(array(
                $param['pt_id'],
                $param['project_id'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $param['is_liquid'],
                $param['banktype_id'],
                $param['trans_type'],
                $param['paymentmethod_id'],
                $param['department_id']
            ));
            $this->_excel->setColumnTitle(array(
                'Nama / Kode Bank (No. Rekening)',
                'Rate (%)',
                'Saldo Awal',
                'Penerimaan',
                'Pengeluaran',
                'Saldo Akhir'
            ));
            $this->_excel->setConfig('prefix_name', 30);
            $this->_excel->setConfig('rate', 15, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_awal', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('debit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('credit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_akhir', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 20);

            if ($param['type_report'] == 'B') {
                $this->_excel->setCustomStyle("A10", "F10", "", "", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            } else {
                $this->_excel->setCustomStyle("A22", "F22", "", "", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            }
        }

        
        $this->_excel->setCustomStyle("B2", "B7", "", "", "False");        
        
        $this->_excel->setCondition('flag', '==', 'G');
        $this->_excel->setCondition('flag', '==', 'T');
        $this->_excel->setCondition('flag', '==', 'GT');
        $this->_excel->setRemoveColumn(array('flag'));
    }

    function generateReportSummaryFromTBExcel($param){

        $this->_schema = "cashier.dbo";
        $this->converter = new Cashier_Box_Tools();
        $borderconfig = array(
            'style' => 'thick',
            'bordertop' => "True"
        );

        $this->_excel->setSheetNumber($param['sheetindex']);
        $this->_excel->setTitleSheet($param['sheetlabel']);
        $this->_excel->setHeader(array('FINANCE POSITION REPORT (KAS & BANK)'));
        
        if ($param['bykonsol'] == 1) {
            $this->_excel->setHeader(array('KONSOL',$param['consolidation_name']));
        } else {
            $this->_excel->setHeader(array('PROJECT',$param['project_name']));
            $this->_excel->setHeader(array('PT',$param['pt_name']));
        }

        if ($param['bykonsol'] != 1) {
            $param['consolidation_id'] = 0;
        }

        $this->_excel->setHeader(array('REPORT DATE',date('d-m-Y', strtotime($param['realization_date_from'])).' to '.date('d-m-Y', strtotime($param['realization_date_until']))));
        $this->_excel->setHeader(array('LIQUID',$param['is_liquid_label']));
        $this->_excel->setHeader(array('PRINT DATE',date('d-m-Y H:i:s')));
        $this->_excel->setHeader(array('PRINT BY',$param['userprint']));
        $this->_excel->setHeader(array(''));   

        if ($param['type_report'] == 'K' || $param['type_report'] == '') {

            $spParam = array(
                'SUMMARY',
                'CASH',
                $param['project_id'],
                $param['pt_id'],
                $param['coa_from'],
                $param['coa_until'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                1,
                0,
                0,
                'default',
                $param['is_liquid'],
                $param['banktype_id'],
                $param['consolidation_id']
            );

            $columnTitle = array(
                'Account Name',
                'Rate (%)',
                'Openning Balance',
                'IN',
                'OUT',
                'Closing Balance',
                'T2'
            );

            $this->_excel->setContent('', '', array('KAS', '', '', '', '', '', 'T1'));
            $this->_excel->setContent('', '', $columnTitle);

            // if ($param['bykonsol'] == 1) {
            //     $spParam = array(
            //         'SUMMARY',
            //         'CASH',
            //         $param['project_id'],
            //         $param['pt_id'],
            //         $param['coa_from'],
            //         $param['coa_until'],
            //         $param['realization_date_from'],
            //         $param['realization_date_until'],
            //         1,
            //         0,
            //         0,
            //         'default',
            //         $param['is_liquid'],
            //         $param['banktype_id'],
            //         $param['consolidation_id']
            //     );

                $this->_excel->setContent('cashier.dbo.sp_reportcashbankposition_tb', $spParam, '');
            // } else {
            //     $this->_excel->setContent('cashier.dbo.sp_reportcashbankposition_tb', $spParam, '');
            // }
            
            $this->_excel->setConfig('prefix_name', 30);
            $this->_excel->setConfig('rate', 15, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_awal', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('debit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('credit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_akhir', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 20);
            $this->_excel->setConfig('num_of_child', 20);

            // if ($param['type_report'] == 'B') {
            //     $this->_excel->setCustomStyle("A10", "F10", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            // } else {
            //     $this->_excel->setCustomStyle("A22", "F22", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            // }  
        }

        if ($param['type_report'] == 'B' || $param['type_report'] == '') {

            $spParam = array(
                'SUMMARY',
                'BANK',
                $param['project_id'],
                $param['pt_id'],
                $param['coa_from'],
                $param['coa_until'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                1,
                0,
                0,
                'default',
                $param['is_liquid'],
                $param['banktype_id'],
                $param['consolidation_id']
            );
            
            $columnTitle = array(
                'Account Name',
                'Rate (%)',
                'Openning Balance',
                'IN',
                'OUT',
                'Closing Balance',
                'T2'
            );
            
            $this->_excel->setContent('', '', array(''));
            $this->_excel->setContent('', '', array('BANK', '', '', '', '', '', 'T1'));
            $this->_excel->setContent('', '', $columnTitle);

            // if ($param['bykonsol'] == 1) {
            //     $spParam = array(
            //         'SUMMARY',
            //         'BANK',
            //         $param['project_id'],
            //         $param['pt_id'],
            //         $param['coa_from'],
            //         $param['coa_until'],
            //         $param['realization_date_from'],
            //         $param['realization_date_until'],
            //         1,
            //         0,
            //         0,
            //         'default',
            //         $param['is_liquid'],
            //         $param['banktype_id'],
            //         $param['consolidation_id']
            //     );
                
                $this->_excel->setContent('cashier.dbo.sp_reportcashbankposition_tb', $spParam, '');
            // } else {
            //     $this->_excel->setContent('cashier.dbo.sp_reportcashbankposition_tb', $spParam, '');
            // }

            $this->_excel->setConfig('prefix_name', 30);
            $this->_excel->setConfig('rate', 15, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_awal', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('debit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('credit', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('saldo_akhir', 20, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 20);
            $this->_excel->setConfig('num_of_child', 20);

            // if ($param['type_report'] == 'B') {
            //     $this->_excel->setCustomStyle("A10", "F10", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            // } else {
            //     $this->_excel->setCustomStyle("A22", "F22", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
            // }
        }
        
        $this->_excel->setCustomStyle("A", "F", "flag", "T2", "True", "left", "None", "True", array('style' => 'thick', 'borderbottom' => 'True'));
        $this->_excel->setCustomStyle("A", "A", "flag", "T1", "True");

        // $this->_excel->setCustomStyle("B2", "B7", "False");        
        
        $this->_excel->setCondition('flag', '==', 'G');
        $this->_excel->setCondition('flag', '==', 'T');
        $this->_excel->setCondition('flag', '==', 'GT');
        $this->_excel->setCondition('num_of_child', '>', '0');
        $this->_excel->setRemoveColumn(array('flag', 'num_of_child'));
    }

    function generateReportCashDetail($param) {

        $borderconfig = array(
            'style' => 'thick',
            'bordertop' => "True"
        );

        $this->_excel->setSheetNumber($param['sheetindex']);
        $this->_excel->setTitleSheet($param['sheetlabel']);
        $this->_excel->setHeader(array('CASH POSITION REPORT'));
        $this->_excel->setHeader(array('PROJECT',$param['project_name']));
        $this->_excel->setHeader(array('PT',$param['pt_name']));
        $this->_excel->setHeader(array(''));
        $this->_excel->setHeader(array('Periode',date('d-m-Y', strtotime($param['realization_date_from'])).' to '.date('d-m-Y', strtotime($param['realization_date_until']))));
        
        $isHeader = 1;
        $isDetail = 1;

        if ($param['data_option'] == 2) {
            $isDetail = 0;
        }

        if ($param['data_option'] == 3) {
            $isHeader = 0;
        }

        if ($param['datasource'] == 1) {
            $this->_excel->setSP('cashier.dbo.sp_reportcashbankposition_tb');
            $this->_excel->setSPParam(array(
                'DETAIL',
                'CASH',
                $param['project_id'],
                $param['pt_id'],
                $param['coa_from'],
                $param['coa_until'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $isHeader,
                $isDetail,
                0,
                'default',
                $param['is_liquid'],
                $param['banktype_id']
            ));

            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('receipt_no', 20, 'center');
            $this->_excel->setConfig('beg_balance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('end_balance', 25, 'right', '#,##0.00;(#,###0.00)');

            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'H');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
            $this->_excel->setRemoveColumn(array('flag'));
        } else {
            $this->_excel->setSP('cashier.dbo.sp_reportkasbankposition_arr2');
            $this->_excel->setSPParam(array(
                'CASH',
                $param['pt_id'],
                $param['pt_id'],
                $param['project_id'],
                $param['project_id'],
                $param['prefix'],
                $param['prefix'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $param['prefix_id'],
                $param['prefix_id'],
                $param['data_option'],
                $param['trans_type'],
                1,
                $param['sort'],
                $param['banktype_id'],
                $param['paymentmethod_id'],
                $param['department_id']
            ));

            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('cheque_no', 20, 'center');
            $this->_excel->setConfig('begbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('endbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'A');
            $this->_excel->setCondition('flag', '==', 'G');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
            $this->_excel->setRemoveColumn(array('flag'));
        }

        $this->_excel->setColumnTitle(array(
            'KODE ACC.',
            'NO. VOUCHER',
            'TGL. VOUCHER',
            'NAMA ACCOUNT',
            'RECEIPT NO.',
            'SALDO AWAL',
            'DEBET',
            'KREDIT',
            'SALDO AKHIR',
            'FLAG'
        ));
        
    }

    function generateReportBankDetail($param) {

        $borderconfig = array(
            'style' => 'thick',
            'bordertop' => "True"
        );

        $this->_excel->setSheetNumber($param['sheetindex']);
        $this->_excel->setTitleSheet($param['sheetlabel']);
        $this->_excel->setHeader(array('BANK POSITION REPORT'));
        $this->_excel->setHeader(array('PROJECT',$param['project_name']));
        $this->_excel->setHeader(array('PT',$param['pt_name']));
        $this->_excel->setHeader(array(''));
        $this->_excel->setHeader(array('Periode',date('d-m-Y', strtotime($param['realization_date_from'])).' to '.date('d-m-Y', strtotime($param['realization_date_until']))));
        
        $isHeader = 1;
        $isDetail = 1;

        if ($param['data_option'] == 2) {
            $isDetail = 0;
        }

        if ($param['data_option'] == 3) {
            $isHeader = 0;
        }
        
        if ($param['datasource'] == 1) {
            $this->_excel->setSP('cashier.dbo.sp_reportcashbankposition_tb');
            $this->_excel->setSPParam(array(
                'DETAIL',
                'BANK',
                $param['project_id'],
                $param['pt_id'],
                $param['coa_from'],
                $param['coa_until'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $isHeader,
                $isDetail,
                0,
                'default',
                $param['is_liquid'],
                $param['banktype_id']
            ));

            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('cheque_no', 20, 'center');
            $this->_excel->setConfig('receipt_no', 20, 'center');
            $this->_excel->setConfig('paymentmethod', 20, 'left');
            $this->_excel->setConfig('bank_name', 25, 'left');
            $this->_excel->setConfig('beg_balance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('end_balance', 25, 'right', '#,##0.00;(#,###0.00)');

            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'H');
            $this->_excel->setCondition('flag', '==', 'SH');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
            $this->_excel->setRemoveColumn(array('flag'));
        } else {
            $this->_excel->setSP('cashier.dbo.sp_reportkasbankposition_arr2');
            $this->_excel->setSPParam(array(
                'BANK',
                $param['pt_id'],
                $param['pt_id'],
                $param['project_id'],
                $param['project_id'],
                $param['prefix'],
                $param['prefix'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $param['prefix_id'],
                $param['prefix_id'],
                $param['data_option'],
                $param['trans_type'],
                1,
                $param['sort'],
                $param['banktype_id'],
                $param['paymentmethod_id'],
                $param['department_id']
            ));

            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('cheque_no', 20, 'center');
            $this->_excel->setConfig('receipt_no', 20, 'center');
            $this->_excel->setConfig('paymentmethod', 20, 'left');
            $this->_excel->setConfig('bank_name', 25, 'left');
            $this->_excel->setConfig('begbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('endbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'A');
            $this->_excel->setCondition('flag', '==', 'G');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
        }

        
        $this->_excel->setColumnTitle(array(
            'KODE ACC.',
            'NO. VOUCHER',
            'TGL. VOUCHER',
            'NAMA ACCOUNT',
            'CHEQUE / GIRO NO.',
            'RECEIPT NO.',
            'PAYMENT TYPE',
            'BANK / PROVIDER',
            'SALDO AWAL',
            'DEBET',
            'KREDIT',
            'SALDO AKHIR',
            'FLAG'
        ));
        
        $this->_excel->setRemoveColumn(array('flag'));
    }

    function generateReportCashBankDetail($param) {

        $borderconfig = array(
            'style' => 'thick',
            'bordertop' => "True"
        );

        $this->_excel->setSheetNumber($param['sheetindex']);
        $this->_excel->setTitleSheet($param['sheetlabel']);
        $this->_excel->setHeader(array('CASH & BANK POSITION REPORT'));
        $this->_excel->setHeader(array('PROJECT',$param['project_name']));
        $this->_excel->setHeader(array('PT',$param['pt_name']));
        $this->_excel->setHeader(array(''));
        $this->_excel->setHeader(array('Periode',date('d-m-Y', strtotime($param['realization_date_from'])).' to '.date('d-m-Y', strtotime($param['realization_date_until']))));
        
        if ($param['datasource'] == 1) {

            $isHeader = 1;
            $isDetail = 1;

            if ($param['data_option'] == 2) {
                $isDetail = 0;
            }

            if ($param['data_option'] == 3) {
                $isHeader = 0;
            }

            $this->_excel->setSP('cashier.dbo.sp_reportcashbankposition_tb');
            $this->_excel->setSPParam(array(
                'DETAIL',
                'CASHBANK',
                $param['project_id'],
                $param['pt_id'],
                $param['coa_from'],
                $param['coa_until'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $isHeader,
                $isDetail,
                0,
                'default',
                $param['is_liquid'],
                $param['banktype_id']
            ));

            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('cheque_no', 20, 'center');
            $this->_excel->setConfig('receipt_no', 20, 'center');
            $this->_excel->setConfig('paymentmethod', 20, 'left');
            $this->_excel->setConfig('bank_name', 25, 'left');
            $this->_excel->setConfig('beg_balance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('end_balance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'H');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
            // $this->_excel->setRemoveColumn(array('flag'));

        } else {

            $this->_excel->setSP('cashier.dbo.sp_reportkasbankposition_arr2');
            $this->_excel->setSPParam(array(
                'CASHBANK',
                $param['pt_id'],
                $param['pt_id'],
                $param['project_id'],
                $param['project_id'],
                $param['prefix'],
                $param['prefix'],
                $param['realization_date_from'],
                $param['realization_date_until'],
                $param['prefix_id'],
                $param['prefix_id'],
                $param['data_option'],
                $param['trans_type'],
                1,
                $param['sort'],
                $param['banktype_id'],
                $param['paymentmethod_id'],
                $param['department_id']
            ));
            
            $this->_excel->setConfig('coa', 20, 'center');
            $this->_excel->setConfig('voucher_no', 25, 'left');
            $this->_excel->setConfig('voucher_date', 15, 'center');
            $this->_excel->setConfig('description', 35, 'left');
            $this->_excel->setConfig('cheque_no', 20, 'center');
            $this->_excel->setConfig('receipt_no', 20, 'center');
            $this->_excel->setConfig('paymentmethod', 20, 'left');
            $this->_excel->setConfig('bank_name', 25, 'left');
            $this->_excel->setConfig('begbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_d', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('amount_c', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('endbalance', 25, 'right', '#,##0.00;(#,###0.00)');
            $this->_excel->setConfig('flag', 15, 'center');
            $this->_excel->setCondition('flag', '==', 'A');
            $this->_excel->setCondition('flag', '==', 'G');
            $this->_excel->setCondition('flag', '==', 'T');
            $this->_excel->setCondition('flag', '==', 'GT');
            // $this->_excel->setRemoveColumn(array('flag'));

        }
        $this->_excel->setColumnTitle(array(
            'KODE ACC.',
            'NO. VOUCHER',
            'TGL. VOUCHER',
            'NAMA ACCOUNT',
            'CHEQUE / GIRO NO.',
            'RECEIPT NO.',
            'PAYMENT TYPE',
            'BANK / PROVIDER',
            'SALDO AWAL',
            'DEBET',
            'KREDIT',
            'SALDO AKHIR',
            'FLAG'
        ));
    }

    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.
     
        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
    }

    function generateHtml($param) {
        
        $getdataproject = $this->execSP3('dbmaster.dbo.sp_project_byid_read', array($param['project_id']));
        $projectname = $getdataproject[0][0]['name'];
        $week = $this->weekNumberOfMonth($param['realization_date_until']);
        $monthandyear = date('F Y', strtotime($param['realization_date_until']));

        if ($param['bykonsol'] != 1) {
            $param['consolidation_id'] = 0;
        }

        // data kas & bank
        $datakas = $this->execSP3('cashier.dbo.sp_reportcashbankposition_tb', array('SUMMARY', 'CASH', $param['project_id'], $param['pt_id'], $param['coa_from'], $param['coa_until'], $param['realization_date_from'], $param['realization_date_until'], 1, 0, 0, 'default', $param['is_liquid'], $param['banktype_id'], $param['consolidation_id']));
        $databank = $this->execSP3('cashier.dbo.sp_reportcashbankposition_tb', array('SUMMARY', 'BANK', $param['project_id'], $param['pt_id'], $param['coa_from'], $param['coa_until'], $param['realization_date_from'], $param['realization_date_until'], 1, 0, 0, 'default', $param['is_liquid'], $param['banktype_id'], $param['consolidation_id']));

        $html = "<body>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Dear Bapak/Ibu, </p>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Berikut saya kirimkan laporan saldo Kas dan Bank {$projectname}. </p>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Per minggu ke {$week} pada bulan {$monthandyear}. </p>";
        $html .= "<br>";
        $html .= "<table style='font-family: tahoma; font-size: 8pt; width: 700px; border-collapse: collapse;'>";

        foreach ($datakas[0] as $k) {
            if ($k['flag'] == 'GT') {
                $html .= "<tr>
                            <td align='right' width='30%'>Total Saldo Cash : </td>
                            <td align='right' width='20%'>".number_format($k['saldo_akhir'], 2)."</td>
                            <td width='50%'></td>
                          </tr>";
            }
        }

        foreach ($databank[0] as $k) {
            if ($k['flag'] == 'T') {
                $html .= "<tr>
                            <td align='right' width='30%'>".ucwords(strtolower($k['prefix_name']))." : </td>
                            <td align='right' width='20%'>".number_format($k['saldo_akhir'], 2)."</td>
                            <td width='50%'></td>
                          </tr>";
            }
        }

        $html .= "<tr>
                    <td align='right' width='50%'></td>
                    <td align='right' width='20%'></td>
                    <td width='30%'></td>
                  </tr>
                  <tr>
                    <td style='border-bottom: 1px solid black' align='right' width='100%' colspan='3'></td>
                  </tr>
                  <tr>
                    <td style='border-bottom: 1px solid black' align='left' width='100%' colspan='3'>";

        if (isset($param['notes']) && $param['notes'] != "") {
            $html .=    "<p><b>Notes : </b></p>
                         <p>{$param['notes']}</p>";
        } 
                        
        $html .=    "</td>
                  </tr>";
        $html .= "</table>";
        $html .= "<table style='font-family: tahoma; font-size: 8pt; width: 700px; border-collapse: collapse;' cellpadding='5'>";
        $html .= "<tr>
                        <td colspan='6'><br></td>
                  </tr>
                  <tr>
                        <td colspan='6'><b>CASH</b></td>
                  </tr>
                  <tr>
                        <td colspan='6'><br></td>
                  </tr>
                  <tr>
                        <td align='right' align='5%'><b></b></td>
                        <td align='right' align='35%'><b>Bank Account</b></td>
                        <td align='right' align='35%'><b>Rate (%)</b></td>
                        <td align='right' align='15%'><b>Opening Balance</b></td>
                        <td align='right' align='15%'><b>IN</b></td>
                        <td align='right' align='15%'><b>OUT</b></td>
                        <td align='right' align='15%'><b>Closing Balance</b></td>
                  </tr>";

        foreach ($datakas[0] as $k) {

            if ($k['flag'] == 'H') {
                $html .= "<tr>
                                <td align='right'></td>
                                <td align='right'>{$k['prefix_name']}</td>
                                <td align='right'></td>
                                <td align='right'>".number_format($k['saldo_awal'], 2)."</td>
                                <td align='right'>".number_format($k['debit'], 2)."</td>
                                <td align='right'>".number_format($k['credit'], 2)."</td>
                                <td align='right'>".number_format($k['saldo_akhir'], 2)."</td>
                          </tr>";
            }

            if ($k['flag'] == 'GT') {
                $html .= "<tr>
                                <td align='right'><br></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                          </tr>
                          <tr>
                                <td style='border-bottom: 1px solid black' align='right'></td>
                                <td style='border-bottom: 1px solid black' align='right'>Total Saldo</td>
                                <td style='border-bottom: 1px solid black' align='right'></td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['saldo_awal'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['debit'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['credit'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['saldo_akhir'], 2)."</td>
                          </tr>";
            }
        }

        foreach ($databank[0] as $k) {

            if ($k['flag'] == 'G') {
                $html .= "<tr>
                                <td colspan='6'><br></td>
                          </tr>
                          <tr>
                                <td colspan='6'><b>{$k['prefix_name']}</b></td>
                          </tr>
                          <tr>
                                <td colspan='6'><br></td>
                          </tr>
                          <tr>
                                <td align='right' align='5%'><b></b></td>
                                <td align='right' align='25%'><b>Bank Account</b></td>
                                <td align='right' align='10%'><b>Rate (%)</b></td>
                                <td align='right' align='15%'><b>Opening Balance</b></td>
                                <td align='right' align='15%'><b>IN</b></td>
                                <td align='right' align='15%'><b>OUT</b></td>
                                <td align='right' align='15%'><b>Closing Balance</b></td>
                          </tr>";
            }

            if ($k['flag'] == 'H') {
                if ($k['num_of_child'] > 0) {
                    $html .= "<tr>
                                    <td align='right'></td>
                                    <td align='right'><b>{$k['prefix_name']}</b></td>
                                    <td align='right'><b></b></td>
                                    <td align='right'><b></b></td>
                                    <td align='right'><b></b></td>
                                    <td align='right'><b></b></td>
                                    <td align='right'><b></b></td>
                              </tr>";
                } else {

                    $prefix_name = $k['prefix_name'];

                    $rate = $k['rate'] == "" ? "" : $k['rate'];

                    if ($k['parent_id'] > 0 && $k['parent_id'] != "") {
                        $html .= "<tr>
                                    <td align='right'></td>
                                    <td style='padding-right: 20px' align='right'>{$prefix_name}</td>
                                    <td align='right'>".$rate."</td>
                                    <td align='right'>".number_format($k['saldo_awal'], 2)."</td>
                                    <td align='right'>".number_format($k['debit'], 2)."</td>
                                    <td align='right'>".number_format($k['credit'], 2)."</td>
                                    <td align='right'>".number_format($k['saldo_akhir'], 2)."</td>
                                  </tr>";
                    } else {
                        $html .= "<tr>
                                    <td align='right'></td>
                                    <td align='right'>{$prefix_name}</td>
                                    <td align='right'>".$rate."</td>
                                    <td align='right'>".number_format($k['saldo_awal'], 2)."</td>
                                    <td align='right'>".number_format($k['debit'], 2)."</td>
                                    <td align='right'>".number_format($k['credit'], 2)."</td>
                                    <td align='right'>".number_format($k['saldo_akhir'], 2)."</td>
                                 </tr>";
                    }

                    
                }                
            }

            if ($k['flag'] == 'T') {
                $html .= "<tr>
                                <td align='right'><br></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                                <td align='right'></td>
                          </tr>
                          <tr>
                                <td style='border-bottom: 1px solid black' align='right'></td>
                                <td style='border-bottom: 1px solid black' align='right'>Total Saldo</td>
                                <td style='border-bottom: 1px solid black' align='right'></td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['saldo_awal'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['debit'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['credit'], 2)."</td>
                                <td style='border-bottom: 1px solid black' align='right'>".number_format($k['saldo_akhir'], 2)."</td>
                          </tr>";
            }
        }

        $html .= "</table>";
        $html .= "<br>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Terima Kasih.</p>";
        $html .= "<br>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Ciputra Group</p>";
        $html .= "<br>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>I N T E G R I T Y | P R O F E S S I O N A L I S M | E N T R E P R E N E U R S H I P</p>";
        $html .= "<br>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Ciputra World Jakarta 1</p>";
        $html .= "<p style='font-family: tahoma; font-size: 8.5pt'>Jl. Prof. Dr. Satrio Kav 3-5 Jakarta 12940</p>";
        $html .= "<br>";
        $html .= "</body>";

        return $html;
    }

    function weekNumberOfMonth($date) {

        $tgl = date_parse($date);
        $tanggal =  $tgl['day'];
        $bulan   =  $tgl['month'];
        $tahun   =  $tgl['year'];
        
        //tanggal 1 tiap bulan        
        $tanggalAwalBulan = mktime(0, 0, 0, $bulan, 1, $tahun);        
        $mingguAwalBulan = (int) date('W', $tanggalAwalBulan);

        if ($tanggalAwalBulan == strtotime($tahun."-01-01")) {
            $mingguAwalBulan = 1;
        }
        
        //tanggal sekarang        
        $tanggalYangDicari = mktime(0, 0, 0, $bulan, $tanggal, $tahun);        
        $mingguTanggalYangDicari = (int) date('W', $tanggalYangDicari);
        
        $mingguKe = $mingguTanggalYangDicari - $mingguAwalBulan + 1;
        
        return $mingguKe;
        
    }

    function cashbankpositionreportSendemail($param) {

        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'sendemailtodir':
                        $mail = new Cashier_Box_Library_EmailKasbank("cashbank");
                        try {

                            $to = explode(',', $param['to']);
                            $cc = explode(',', $param['cc']);

                            $mail->setData()->setFrom('laporankasbank@ciputra.com', 'Laporan Kas Bank');
                            $mail->setData()->setReplyTo($param['from']);
                            $mail->setData()->setBodyHtml($param['content']);
                            
                            foreach ($to as $t) {
                                $mail->setData()->addTo($t, $t);
                            }

                            foreach ($cc as $c) {
                                $mail->setData()->addCc($c, $c);
                            }

                            $mail->setData()->setSubject($param['subject']);
                            $mail->setData()->send();

                            $valid = true;
                        } catch (Zend_Mail_Exception $e) {

                            $val = array(
                                $param['project_id'],
                                $param['pt_id'],
                                $param['user_id'],
                                $e->getMessage(),
                                'send_email',
                                '',
                                '',
                                'Cashbank Position Report',
                                0
                            );
                            $this->execSP3('db_log.dbo.sp_create_log', $val);

                            $valid = false;
                        }
                       
                        $data = null;
                        $counter = 0;
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
}
