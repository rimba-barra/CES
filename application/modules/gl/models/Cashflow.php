<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Gl_Models_Cashflow extends Zend_Db_Table_Abstract
{
    
    protected $_schema;
    protected $session;
    protected $datacf;
    
    function init()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->session      = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id  = $this->session->getCurrentProjectId();
        $this->_pt_id       = $this->session->getCurrentPtId();
        $this->_user_id     = $this->session->getUserId();
        $this->_curdate     = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        
        // $this->_helper->session->set('selected_dbapps', 'gl_2018');
        //$this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        //$this->_schema = 'gl_2018.dbo';
        $this->session->set('selected_dbapps', 'gl_2018');
        
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model      = new Gl_Models_Generalmodel_Modelsp();
        $this->_querycf    = new Gl_Models_Query_Cashflow();
        $this->_phpExcel   = new PHPExcel();
        $this->_tmpparam   = array();
        
    }
    
    function generateData()
    {
        $result = $this->_querycf->calculatedata($this->datacf);
        return $result;
    }
    
    function Create($param)
    {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter    = $param['hideparam'];
                $this->datacf = $param;
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result  = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'generatereport':
                        $counter = 0;
                        $result  = $this->generateData($param);
                        break;
                    case 'generatereportexcelthismonth':
                        $counter = 0;
                        $result  = $this->generateExcel($param);
                        break;
                    default:
                        $counter = 0;
                        $result  = null;
                        break;
                }
                
                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg   = " ";
                } else {
                    $count = $counter;
                    $msg   = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter']   = $count;
                $return['message']   = $msg;
                $return['success']   = true;
                $return['data']      = $result;
            }
            catch (Exception $ex) {
                
            }
        }
        return $return;
    }
    
    function generateExcel($param)
    {
        if($param['formatreport']=='SIMPLE'){
            $result = $this->generateExcelSimple($param);
            return $result;
        }
        
        //BUILT EXCEL
        
        //GET PT NAME
        $this->_schema   = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $dataproject     = $this->execSP3("sp_project_byid_read", array(
            $param['project_id']
        ));
        $datapt          = $this->execSP3("sp_pt_byid_read", array(
            $param['pt_id']
        ));
        $ptname          = $datapt[0][0]['name'];
        $projectname     = $dataproject[0][0]['name'];
        
        
        $additional['header1'] = array(
            'Project : ' . $projectname
        );
        $additional['header2'] = array(
            'PT : ' . $ptname
        );
        $additional['header3'] = array(
            'Report Name : Cashflow'
        );
        $additional['header4'] = array(
            'Period : ' . $this->converter->NumberMonthText($param['bulan']) . ' ' . $param['tahun'] . ' UNTIL ' . $this->converter->NumberMonthText($param['bulan_sampai']) . ' ' . $param['tahun'] . ''
        );
        $additional['header5'] = array(
            'Dept : ' . $param['dept_name']
        );
        $sheet                 = 0;
        $titles                = '';
        
        
        $sql = "sp_reportcashflow_excel";
        
        
        $col    = array(
            'cashflowtype',
            'coa',
            'name',
            'amount'
        );
        $titles = array(
            'CASHFLOW',
            'COA',
            'COA NAME',
            'AMOUNT'
        );
        
        $paramdata = array(
            $param['pt_id'],
            $param['project_id'],
            $param['department_id'],
            $param['tahun'],
            $param['bulan'],
            $param['bulan_sampai'],
            1,
            $param['iscashflow']
        );
        $sheetname = "Header";
        
        $doc = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, FALSE);
        
        
        //GENERAL STYLE
        
        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array(
                    'rgb' => '2F4F4F'
                ),
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

        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();
        
        $doc->getActiveSheet()->getStyle('D7:I'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle("A6:D6")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('6')->setRowHeight(30);
        // $doc->getActiveSheet()->freezePane('G3');
        //$doc->getActiveSheet()->getStyle("A7:D70000")->getFont()->setSize(9);
        $doc->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
        
        
        $sql = "sp_reportcashflow_excel";
        
        
        $col    = array(
            'cashflowtype',
            'department',
            'voucher_date',
            'coa',
            'name',
            'voucher_no',
            'spk',
            'keterangan',
            'amount'
        );
        $titles = array(
            'CASHFLOW',
            'DEPT',
            'TGL TRANSAKSI',
            'COA',
            'COA NAME',
            'VOUCHER NO',
            'SPK',
            'DESCRIPTION',
            'AMOUNT'
        );
        
        $paramdata = array(
            $param['pt_id'],
            $param['project_id'],
            $param['department_id'],
            $param['tahun'],
            $param['bulan'],
            $param['bulan_sampai'],
            2,
            $param['iscashflow']
        );
        $sheetname = "Detail";
        $sheet     = 1;
        
        $doc = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, FALSE);
        
        
        //GENERAL STYLE
        
        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array(
                    'rgb' => '2F4F4F'
                ),
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

        $lastrecord1 = $doc->setActiveSheetIndex(1)->getHighestRow();
        
        $doc->getActiveSheet()->getStyle('C7:I'.$lastrecord1)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle("A6:I6")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('6')->setRowHeight(30);
        // $doc->getActiveSheet()->freezePane('G3');
        //$doc->getActiveSheet()->getStyle("A7:H20000")->getFont()->setSize(9);
        $doc->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('H')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('I')->setAutoSize(true);
        
        $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, TRUE);
        
        return $this->_tmpparam;
        
    }
    
    
    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, $isReady)
    {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if ($isReady == FALSE) {
            $this->_schema = "cashier.dbo";
            $dataArray     = $this->execSP3($sql, $paramdata);
            
            //die(print_r($dataArray));
            
            $datas = $dataArray[0];
            
            if (sizeof($datas) > 0) {
                $arrayKeys = array_keys($datas[0]);
            } else {
                $arrayKeys = 0;
            }
            
            $tmp   = array();
            $final = array();
            array_push($final, $additional['header1']);
            array_push($final, $additional['header2']);
            array_push($final, $additional['header3']);
            array_push($final, $additional['header4']);
            array_push($final, $additional['header5']);
            array_push($final, $titles); //give title
            
            foreach ($datas as $d) {
                
                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if (in_array($key, $col)) {
                        array_push($tmp, $d[$key]);
                    }
                }
                array_push($final, $tmp);
                $tmp = array();
            }
            
            // array_push($final, $additional['footer']);
            
            $finaldata = $final;
            
            if ($sheet > 0) {
                if ($doc->getActiveSheetIndex() !== $sheet) {
                    $doc->createSheet($sheet);
                }
            }
            
            $doc->setActiveSheetIndex($sheet);
            $doc->getActiveSheet()->fromArray($finaldata);
            $doc->getActiveSheet()->setTitle($sheetname);
            
            foreach (range('A', 'Z') as $columnID) {
                $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);
                
            }
        }
        
        
        if ($isReady == TRUE) {
            
            $filename    = "Report_CF_" . $param["pt_name"] . "_" . $param["bulan_sampai_name"] . "_" . $param["tahun"] . ".xls";
            $path        = 'app/gl/uploads/' . $filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/' . $filename;
            
            //READY TO WRITE
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
            
            $objWriter    = PHPExcel_IOFactory::createWriter($doc, 'Excel5');
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);
        }
        
        $this->_tmpparam = $param;
        
        return $doc;
    }
    
    
    function generateExcelSimple($param)
    {
        
        //BUILT EXCEL
        // REPORT EXCEL SIMPLE
        
        //GET PT NAME
        $this->_schema   = "dbmaster.dbo";
        $this->converter = new Cashier_Box_Tools();
        $dataproject     = $this->execSP3("sp_project_byid_read", array(
            $param['project_id']
        ));
        $datapt          = $this->execSP3("sp_pt_byid_read", array(
            $param['pt_id']
        ));
        $ptname          = $datapt[0][0]['name'];
        $projectname     = $dataproject[0][0]['name'];
        
        
        $additional['header1'] = array(
            'Project : ' . $projectname
        );
        $additional['header2'] = array(
            'PT : ' . $ptname
        );
        $additional['header3'] = array(
            'Report Name : Cashflow'
        );
        $additional['header4'] = array(
            'Period : ' . $this->converter->NumberMonthText($param['bulan']) . ' ' . $param['tahun'] . ' UNTIL ' . $this->converter->NumberMonthText($param['bulan_sampai']) . ' ' . $param['tahun'] . ''
        );
        $additional['header5'] = array(
            'Dept : ' . $param['dept_name']
        );
        $sheet                 = 0;
        $titles                = '';
        
        
        $sql = "sp_reportcashflow_simple";
        
        $col    = array(
            'month',
            'grouptype',
            'cashflowtype',
            'coa',
            'name',
            'jid',
            'voucher_date',
            'department',
            'entryby',
            'voucher_no',
            'keterangan',
            'amount',
            'bank',
            'cheque_no',
            'unit_number',
            'kwitansi_no',
            'spk'
        );
        $titles = array(
            'MONTH',
            'GROUP TYPE',
            'CASHFLOW',
            'COA',
            'COA NAME',
            'REGNO',
            'VOUCHER DATE',
            'DEPARTMENT',
            'ENTRYBY',
            'VOUCHER_NO',
            'DESCRIPTION',
            'AMOUNT',
            'BANK',
            'CHEQUE_NO',
            'SUB_CODE',
            'RECEIPT',
            'SPK'
        );
        
        $paramdata = array(
            $param['pt_id'],
            $param['project_id'],
            $param['department_id'],
            $param['tahun'],
            $param['bulan'],
            $param['bulan_sampai']
        );
        $sheetname = "Simple";
        $doc       = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, FALSE);

        //GENERAL STYLE
        
        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array(
                    'rgb' => '2F4F4F'
                ),
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

        // $doc->getActiveSheet()->freezePane('G3');
        $lastrecord0 = $doc->setActiveSheetIndex(0)->getHighestRow();
        
        $doc->getActiveSheet()->getStyle('L7:L'.$lastrecord0)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
        $doc->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);

        $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, TRUE);
        
        return $this->_tmpparam;
        
    }
    
    function genReportexcelAdditional($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, $isReady)
    {
        
        //auto generate excel from sql statement
        
        $this->_schema = "cashier.dbo";
        $dataArray     = $this->execSP3($sql, $paramdata);
        
        $datas     = $dataArray[0];
        $arrayKeys = array_keys($datas[0]);
        
        $tmp   = array();
        $final = array();
        
        foreach ($datas as $d) {
            
            //HARUS URUT SESUAI QUERY
            foreach ($col as $keyn) {
                if (in_array($keyn, $arrayKeys)) {
                    array_push($tmp, $d[$keyn]);
                } else {
                    array_push($tmp, '');
                }
            }
            array_push($final, $tmp);
            $tmp = array();
        }
        
        return $final;
        
    }
        
}
