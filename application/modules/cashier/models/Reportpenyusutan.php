<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../cashier/models/library/Columnconfigreport.php';

class Cashier_Models_Reportpenyusutan extends Zend_Db_Table_Abstract {

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
                    case 'generateReportExcel':
                    $counter = 0;
                    $result = $this->generateExcelV2($param);
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
        // echo json_encode($param);die;

        $lib = new Columnconfigreport();

        $this->_schema = "dbmaster.dbo";
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        if(isset($param['project_id'])){
            $project_id = $param['project_id'];
        }else{
            $project_id = $this->session->getCurrentProjectId();
        }

        $sheetlabel = array(
            0 => "Sheet1",
        );

        $numberofsheet = 1;
        $filename = "report_penyusutan_".$this->cleanString($ptname).'_'.$param['fromdate'].'_'.$param['untildate'].".xlsx";
        $json = [];
        for ($i = 0; $i < $numberofsheet; $i++) {
            $lib->setSheetNumber($i);
            $lib->setTitleSheet($sheetlabel[$i]);

            $lib->setHeader(array(
                $ptname, 
                'REPORT PENYUSUTAN', 
                '', 
                'PERIODE : '.$param['fromdate'].' - '.$param['untildate'], 
                'COA : '.$param['coastart_id'].' - '.$param['coaend_id']
            ));

            if ($i == 0) {

                /*$sql = "sp_penyusutan";
                $col = array('A','B','C','masa_manfaat_year','masa_manfaat_month','bulan_pakai', 'sisa_bln_susut', 'amount', 'penyusutan_per_bln', 'saldo_awal', 'total_penyusutan', 'akumulasi_penyusutan');
                $paramdata = array(
                    $param['project_id'],$param['pt_id'],$param['coastart_id'], $param['coaend_id'], $param['year_tr']
                );

                $footer = $this->genReportexcelAdditional($param, $sql, $i, $sheetlabel[$i], '', $paramdata, $col,  '', FALSE);
                $lib->setFooter($footer[0]);*/

                $lib->setSP("cashier.dbo.sp_penyusutan");
                $lib->setSPParam(array(
                    $param['project_id'],
                    $param['pt_id'],
                    $param['coastart_id'],
                    $param['coaend_id'],
                    $param['fromdate'],
                    $param['untildate']
                ));

                $lib->setColumnTitle(array('COA',
                    'Keterangan', 
                    'Tanggal Pembelian', 
                    // '(%) Penyusutan',
                    'Voucher No.', 
                    'Masa Manfaat (Thn)', 
                    'Masa Manfaat (Blm)', 
                    'Bulan Disusutkan', 
                    'Sisa Bulan Disusutkan', 
                    'Harga Perolehan', 
                    'Penyusutan/Bulan', 
                    'Akumulasi Penyusutan', 
                    'Nilai Buku',
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    'Total Penyusutan', 
                    'Akumulasi Penyusutan',
                    'Nilai Buku'));

                $lib->setConfig('coa', 100, "center");
                $lib->setConfig('keterangan', 100, "center");
                $lib->setConfig('voucher_date', 30, "center");
                // $lib->setConfig('', 30, "center");
                $lib->setConfig('voucher_no', 30, "center");
                $lib->setConfig('masa_manfaat_year', 30, "center");
                $lib->setConfig('masa_manfaat_month', 30, "center");
                $lib->setConfig('bulan_pakai', 30, "center");
                $lib->setConfig('sisa_bln_susut', 30, "center");
                $lib->setConfig('amount', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('penyusutan_per_bln', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('saldo_awal', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('nilai_buku_awal', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('jan', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('feb', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('mar', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('apr', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('may', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('jun', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('jul', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('aug', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('sep', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('oct', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('nov', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('dec', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('total_penyusutan', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('akumulasi_penyusutan', 30, "right", "#,##0.00;(#,###0.00)");
                $lib->setConfig('nilai_buku_akhir', 30, "right", "#,##0.00;(#,###0.00)");

            }

            $json = $lib->generateJSONConfig();
        }

        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_reportpenyusutan_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64_file} {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        $ptname = str_replace(' ', '_', $param['pt_name']);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        $this->_tmpparam = $param;
        return $this->_tmpparam;
    }

    function generateExcelV2($param){

        $this->_schema = "dbmaster.dbo";
        $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
        $ptname = $datapt[0][0]['name'];

        $this->_ptname = $ptname;

        $additional['header'] = array( 
            $ptname, 
            'REPORT PENYUSUTAN', 
            '', 
            'PERIODE : '.$param['fromdate'].' - '.$param['untildate'],
            'COA : '.$param['coastart_id'].' - '.$param['coaend_id'],
        );
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';

        $sql = "sp_penyusutan";

        $titles = array(
            'COA',
            'Keterangan', 
            'Tanggal Pembelian', 
            '(%) Penyusutan',
            'Voucher No.', 
            'Masa Manfaat (Thn)', 
            'Masa Manfaat (Blm)', 
            'Bulan Disusutkan', 
            'Sisa Bulan Disusutkan', 
            'Harga Perolehan', 
            'Penyusutan/Bulan', 
            'Akumulasi Penyusutan', 
            'Nilai Buku',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Total Penyusutan', 
            'Akumulasi Penyusutan',
            'Nilai Buku'
        );

        $col = array(
            'coa',
            'keterangan',
            'voucher_date',
            '',
            'voucher_no',
            'masa_manfaat_year',
            'masa_manfaat_month',
            'bulan_pakai',
            'sisa_bln_susut',
            'amount',
            'penyusutan_per_bln',
            'saldo_awal',
            'nilai_buku_awal',
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec',
            'total_penyusutan',
            'akumulasi_penyusutan',
            'nilai_buku_akhir'
        );

        $paramdata = array(
            $param['project_id'],
            $param['pt_id'],
            $param['coastart_id'],
            $param['coaend_id'],
            $param['fromdate'],
            $param['untildate']
        );

        $sheetname = "Sheet 1";

        $doc = $this->genReportexcelV2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

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

        $doc->getActiveSheet()->getStyle("A4:AB4")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('4')->setRowHeight(30);

        $this->genReportexcelV2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

        return $this->_tmpparam;
    }

    function genReportexcelV2($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        $doc = $this->_phpExcel;
    //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";
            $dataArray = $this->execSP3($sql, $paramdata);
        // echo json_encode($dataArray);die;

            $datas = $dataArray[0];
        // echo json_encode($datas);die;

            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }


            $tmp = array();
            $final = array();
        // GIVEN HEADER NAME
            array_push($final, $additional['header']);
            array_push($final, ['']);
            array_push($final, ['']);
         //GIVEN COLUMN NAME
            array_push($final,  $titles);

            $temp_data = [];

            for ( $i = 0; $i < sizeof($datas); $i++) { 
                $sub_data = [];
                $sub_data[] = $datas[$i]['coa'];
                $sub_data[] = $datas[$i]['keterangan'];
                $sub_data[] = date('d/m/Y', strtotime($datas[$i]['voucher_date']));
                $sub_data[] = '';
                $sub_data[] = $datas[$i]['voucher_no'];
                $sub_data[] = $datas[$i]['masa_manfaat_year'];
                $sub_data[] = $datas[$i]['masa_manfaat_month'];
                $sub_data[] = $datas[$i]['bulan_pakai'];
                $sub_data[] = $datas[$i]['sisa_bln_susut'];
                $sub_data[] = $datas[$i]['amount'];
                $sub_data[] = $datas[$i]['penyusutan_per_bln'];
                $sub_data[] = $datas[$i]['saldo_awal'];
                $sub_data[] = $datas[$i]['nilai_buku_awal'];
                $sub_data[] = $datas[$i]['jan'];
                $sub_data[] = $datas[$i]['feb'];
                $sub_data[] = $datas[$i]['mar'];
                $sub_data[] = $datas[$i]['apr'];
                $sub_data[] = $datas[$i]['may'];
                $sub_data[] = $datas[$i]['jun'];
                $sub_data[] = $datas[$i]['jul'];
                $sub_data[] = $datas[$i]['aug'];
                $sub_data[] = $datas[$i]['sep'];
                $sub_data[] = $datas[$i]['oct'];
                $sub_data[] = $datas[$i]['nov'];
                $sub_data[] = $datas[$i]['dec'];
                $sub_data[] = $datas[$i]['total_penyusutan'];
                $sub_data[] = $datas[$i]['akumulasi_penyusutan'];
                $sub_data[] = $datas[$i]['nilai_buku_akhir'];
                $temp_data[] = $sub_data;
                array_push($final, $sub_data);
            }

        // array_push($final, $additional['footer']);

            $finaldata = $final;
        // echo json_encode($finaldata);die;

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
            $ptname = $this->_ptname;
            $filename = "report_penyusutan_".$ptname.".xls";
            $filename = str_replace(' ', '_', $filename);
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

    function myformat($nr)
    {
        $nr = number_format($nr, 2);
        return $nr[0] == '-' ? "(" . substr($nr, 1) . ")" : $nr;
    }

    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.

        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
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

}
