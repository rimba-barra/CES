<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

class Gl_Models_Salesbacklog extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $datacf;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_ptname ='';

        // $this->_helper->session->set('selected_dbapps', 'gl_2018');
        //$this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        //$this->_schema = 'gl_2018.dbo';
        $this->session->set('selected_dbapps', 'gl_2018');

        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //$this->_querycf = new Gl_Models_Query_Salesbacklog();
        $this->_phpExcel  = new PHPExcel();
        $this->_tmpparam  = array();

    }

    function generateData() {
        $result = $this->_querycf->calculatedata($this->datacf);
        return $result;
    }

    function Create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->datacf = $param;
                switch ($parameter) {
                    case 'defaultrange':
                    $counter = 0;
                    $result = $this->_helperdata->rangeActiveYear();
                    break;
                    case 'generatereport':
                    $counter = 0;
                    $result = $this->generateData($param);
                    break;
                    case 'generatereportexcelthismonth':
                    $counter = 0;
                    $result;
                    if ( $param['formatreport'] == 'DETAIL' ) {
                        $result = $this->generateExcel($param);
                    }else if( $param['formatreport'] == 'DETAIL V2 - LANDED' ){
                        $result = $this->generateExcelV2($param);
                    }else if( $param['formatreport'] == 'DETAIL V2 - HIGHRISE' ){
                        $result = $this->generateExcelV2Highrise($param);
                    }else if( $param['formatreport'] == 'DETAIL V2 - PROJECT' ){
                        $result = $this->generateExcelV2Project($param);
                    }
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

        $this->_ptname = $ptname;

        $additional['header'] = array( $ptname, 
            'SALES BACK LOG', 
            '', 
            'PERIOD : '.$param['salesyeardata_start'].' '.$param['salesyeardata_end'].'');
        $sheetname = '';
        $sheet = 0 ; 
        $titles = '';

        $sql = "sp_reportsalesbacklog_detail";


        $col = array('purchase_year', 'purchase_date', 'cluster', 'unit_number','customer_name', 'harga_jual','total_payment','payment_percentage','handover_date','handover_year');
        $titles = array('purchase_year', 'purchase_date', 'cluster', 'unit_number','customer_name', 'harga_jual','total_payment','payment_percentage','handover_date','handover_year');    

        $paramdata = array(
            $param['project_id'],$param['pt_id'],$param['salesyeardata_start'],$param['salesyeardata_end'], $param['handoveryeardata_start'], 
            $param['handoveryeardata_end']
        );
        $sheetname = "Salesbacklog";

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

        //$doc->getActiveSheet()->getStyle('C3:I20000')->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle("A2:J2")->applyFromArray($titleArraystyle);
        $doc->getActiveSheet()->getRowDimension('2')->setRowHeight(30);
        // $doc->getActiveSheet()->freezePane('G3');
        // /$doc->getActiveSheet()->getStyle("A3:H20000")->getFont()->setSize(9);

        /*
        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('D')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('E')->setWidth(40);
        $doc->getActiveSheet()->getColumnDimension('F')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('G')->setWidth(40);
        */
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

        //die(print_r($dataArray));

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
        $filename = "report_salesbacklogdetail".$ptname.".xls";
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
                array_push($tmp, $d[$keyn]);
            }else{
                array_push($tmp, '');
            }
        }
        array_push($final, $tmp);
        $tmp = array();
    }

    return $final;

}

function generateExcelV2($param){
        //BUILT EXCEL

        //GET PT NAME
    $this->_schema = "dbmaster.dbo";
    $this->converter = new Cashier_Box_Tools();
    $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
    $ptname = $datapt[0][0]['name'];

    $this->_ptname = $ptname;

    $additional['header'] = array( 
        $ptname, 
    );

    $additional['header_r2'] = array( 
        'SALES BACK LOG DETAIL V2 - LANDED', 
    );

    $additional['header_r3'] = array( 
        'PERIOD : '.date('d F Y', strtotime($param['salesyeardata_start_ver2'])).'-'.date('d F Y', strtotime($param['salesyeardata_end_ver2']))
    );


    $sheetname = '';
    $sheet = 0 ; 
    $titles = '';

    $sql = "sp_report_backlog_sh1";

    $titles= array(
        'NO',
        'PURCHASE DATE',
        'BLOK',
        'NAMA PEMBELI',
        'LUAS TANAH',
        'LUAS BANGUNAN',
        'CLUSTER',
        'TYPE',
        'UANG MASUK TOTAL',
        'UANG MUKA PENJUALAN',
        'HARGA JUAL (NETT))',
        '',
        '',
        'HARGA JUAL TOTAL (Inc. PPN, BBN, AJB)',
        '%UM TERHADAP HARGA JUAL TOTAL',
        'CARA BAYAR',
        '% BANGUNAN',
        'RENCANA ST',
        'RENCANA TANGGAL TERAKHIR BAYAR',
        'ACTUAL TGL ST',
        'HPP',
        '',
        '',
        'TOTAL HPP',
        'MARGIN',
        '',
        'TOTAL MARGIN',
        'TARGET PENGAKUAN PENJUAL (*)',
        'KETERANGAN (**)',
    );

    // $titles['titles_2'] = array(
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     'TANAH',
    //     'BANGUNAN',
    //     'TOTAL',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     '',
    //     'LANDERPAYMENT',
    //     'DEVCOS',
    //     'BANGUNAN',
    //     '',
    //     'TANAH',
    //     'BANGUNAN',
    //     '',
    //     '',
    //     '',
    // );

    $col = array(
        '',
        'purchase_date', 
        'unit_number',
        'customer_name',
        'land_size',
        'building_size',
        'cluster',
        'type',
        'uang_masuk',
        'uang_masuk_gl',
        'harga_tanah',
        'harga_bangunan',
        'harga_jual',
        'harga_jual_total',
        'persen_um',
        'cara_bayar',
        'persen_bangunan',
        'rencana_st',
        'actual_tgl_st',
        '',
        'hpp_landrepayment',
        'devcos_tanah',
        'total_bangunan_hpp',
        'total_hpp',
        'margin_tanah',
        'margin_bangunan',
        'total_margin',
        'target_pengakuan',
        'keterangan',
    );

    $paramdata = array(
        $param['project_id'],$param['pt_id'],$param['salesyeardata_start_ver2'],$param['salesyeardata_end_ver2'], $param['handoveryeardata_start_ver2'], 
        $param['handoveryeardata_end_ver2'], $param['type_report']
    );
    $sheetname = "Sheet 1";

    $doc = $this->genReportexcelV2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

    $titleArraystyle = array(
        'font' => array(
            'bold' => true,
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

    $doc->getActiveSheet()->getStyle("A6:AC6")->applyFromArray($titleArraystyle);
    $doc->getActiveSheet()->getStyle("A7:AC7")->applyFromArray($titleArraystyle);

    //ROW
    $doc->getActiveSheet()->mergeCells('K6:M6');
    $doc->getActiveSheet()->mergeCells('U6:W6');
    $doc->getActiveSheet()->mergeCells('Y6:Z6');
    //KOLOM
    $doc->getActiveSheet()->mergeCells('A6:A7');
    $doc->getActiveSheet()->mergeCells('B6:B7');
    $doc->getActiveSheet()->mergeCells('C6:C7');
    $doc->getActiveSheet()->mergeCells('D6:D7');
    $doc->getActiveSheet()->mergeCells('E6:E7');
    $doc->getActiveSheet()->mergeCells('F6:F7');
    $doc->getActiveSheet()->mergeCells('G6:G7');
    $doc->getActiveSheet()->mergeCells('H6:H7');
    $doc->getActiveSheet()->mergeCells('I6:I7');
    $doc->getActiveSheet()->mergeCells('J6:J7');

    $doc->getActiveSheet()->mergeCells('N6:N7');
    $doc->getActiveSheet()->mergeCells('O6:O7');
    $doc->getActiveSheet()->mergeCells('P6:P7');
    $doc->getActiveSheet()->mergeCells('Q6:Q7');
    $doc->getActiveSheet()->mergeCells('R6:R7');
    $doc->getActiveSheet()->mergeCells('S6:S7');
    $doc->getActiveSheet()->mergeCells('T6:T7');
    $doc->getActiveSheet()->mergeCells('X6:X7');

    $doc->getActiveSheet()->mergeCells('AA6:AA7');
    $doc->getActiveSheet()->mergeCells('AB6:AB7');
    $doc->getActiveSheet()->mergeCells('AC6:AC7');

    $doc->getActiveSheet()->getStyle('I8:N'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
    $doc->getActiveSheet()->getStyle('U8:AA'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');

    $doc->getActiveSheet()->getColumnDimension('A')->setWidth(5);

    $this->genReportexcelV2($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

    return $this->_tmpparam;
}

function genReportexcelV2($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
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

        $bordertopbottom = array( //bold
            'borders' => array(
                'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
                'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
            ),
            'font' => array(
                'bold' => true,
                'size' => 11
            ),

        );

        $aligncenter = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ),
        );


        $tmp = array();
        $final = array();
        $arrstyle = array(
            'font' => array(
                'bold' => true,
                'size' => 11
            )
        );

        $titles2 = array(
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            'TANAH',
            'BANGUNAN',
            'TOTAL',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            'LANDERPAYMENT',
            'DEVCOS',
            'BANGUNAN',
            '',
            'TANAH',
            'BANGUNAN',
            '',
            '',
            '',
        );

        // GIVEN HEADER NAME
        array_push($final, $additional['header']);
        array_push($final, $additional['header_r2']);
        array_push($final, $additional['header_r3']);
        array_push($final, ['']);
        array_push($final, ['']);
        //GIVEN COLUMN NAME
        array_push($final,  $titles);
        array_push($final,  $titles2);


        $temp_data = [];

        $lastRowJangka = "";
        $lastRowKuartal = "";
        $startrow = 7;

        $uang_masuk = 0;
        $uang_masuk_gl = 0;
        $harga_bangunan = 0;
        $harga_tanah = 0;
        $total_harga_jual_nett = 0;
        $harga_jual_total = 0;
        $hpp_landrepayment = 0;
        $devcost_tanah = 0;
        $total_bangunan_hpp = 0;
        $total_hpp = 0;
        $margin_tanah = 0;
        $margin_bangunan = 0;
        $total_margin = 0;
        $land_size = 0;
        $building_size= 0;

        $uang_masuk_total = 0;
        $uang_masuk_gl_total = 0;
        $harga_bangunan_total = 0;
        $harga_tanah_total = 0;
        $total_harga_jual_nett_total = 0;
        $harga_jual_total_total = 0;
        $hpp_landrepayment_total = 0;
        $devcost_tanah_total = 0;
        $total_bangunan_hpp_total = 0;
        $total_hpp_total = 0;
        $margin_tanah_total = 0;
        $margin_bangunan_total = 0;
        $total_margin_total = 0;
        $land_size_total = 0;
        $building_size_total = 0;

        $uang_masuk_total_kuartal = 0;
        $uang_masuk_gl_total_kuartal = 0;
        $harga_bangunan_total_kuartal = 0;
        $harga_tanah_total_kuartal = 0;
        $total_harga_jual_nett_total_kuartal = 0;
        $harga_jual_total_total_kuartal = 0;
        $hpp_landrepayment_total_kuartal = 0;
        $devcost_tanah_total_kuartal = 0;
        $total_bangunan_hpp_total_kuartal = 0;
        $total_hpp_total_kuartal = 0;
        $margin_tanah_total_kuartal = 0;
        $margin_bangunan_total_kuartal = 0;
        $total_margin_total_kuartal = 0;
        $land_size_total_kuartal = 0;
        $building_size_total_kuartal = 0;
        

        for ( $i = 0; $i < sizeof($datas); $i++) { 
            $sub_data = [];
            $sub_data[] = $i+1;

            if($datas[$i]['jangka'] != $lastRowJangka){
                if ($datas[$i]['jangka'] != $lastRowJangka && $lastRowJangka != "") {
                    array_push($final, array(
                        'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                        "","","",
                        'land_size' => $land_size,
                        'building_size' => $building_size,
                        "","",
                        'uang_masuk' => $uang_masuk,
                        'uang_masuk_gl' => $uang_masuk_gl,
                        'harga_tanah' => $harga_tanah,
                        'harga_bangunan' => $harga_bangunan,
                        'total_harga_jual_nett' => $total_harga_jual_nett,
                        'harga_jual_total' => $harga_jual_total,
                        "","","","","","",
                        'hpp_landrepayment' =>  ( empty($hpp_landrepayment) == FALSE ? $hpp_landrepayment : 0 ),
                        'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                        'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                        'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                        'margin_tanah' => $margin_tanah,
                        'margin_bangunan' => $margin_bangunan,
                        'total_margin' => $total_margin,
                    )); $startrow += 1;

                    $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                    $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                    $doc->getActiveSheet()->getStyle("A".($startrow).":AC".($startrow))->applyFromArray($bordertopbottom);


                    array_push($final, array(
                        'total_kuartal' => "Total " . $lastRowJangka, 
                        "","","",
                        'land_size_total' => $land_size_total,
                        'building_size_total' => $building_size_total,
                        "","",
                        'uang_masuk_total' => $uang_masuk_total,
                        'uang_masuk_gl_total' => $uang_masuk_gl_total,
                        'harga_tanah_total' => $harga_tanah_total,
                        'harga_bangunan_total' => $harga_bangunan_total,
                        'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
                        'harga_jual_total_total' => $harga_jual_total_total,
                        "","","","","","",
                        'hpp_landrepayment_total' =>  ( empty($hpp_landrepayment_total) == FALSE ? $hpp_landrepayment_total : 0 ),
                        'devcost_tanah_total' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
                        'total_bangunan_hpp_total' => ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
                        'total_hpp_total' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
                        'margin_tanah_total' => $margin_tanah_total,
                        'margin_bangunan_total' => $margin_bangunan_total,
                        'total_margin_total' => $total_margin_total,
                    )); $startrow += 1;

                    $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                    $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                    $doc->getActiveSheet()->getStyle("A".($startrow).":AC".($startrow))->applyFromArray($bordertopbottom);

                    $uang_masuk_total = 0;
                    $uang_masuk_gl_total = 0;
                    $harga_bangunan_total = 0;
                    $harga_tanah_total = 0;
                    $total_harga_jual_nett_total = 0;
                    $harga_jual_total_total = 0;
                    $hpp_landrepayment_total = 0;
                    $devcost_tanah_total = 0;
                    $total_bangunan_hpp_total = 0;
                    $total_hpp_total = 0;
                    $margin_tanah_total = 0;
                    $margin_bangunan_total = 0;
                    $total_margin_total = 0;
                    $land_size_total = 0;
                    $building_size_total = 0;
                }
                array_push($final, ['']); $startrow += 1;
                array_push($final, array('','jangka' => strtoupper($datas[$i]['jangka']))); $startrow += 1;
                $doc->getActiveSheet()->getStyle("B".($startrow).":C".($startrow))->applyFromArray($arrstyle);


                $uang_masuk = 0;
                $uang_masuk_gl = 0;
                $harga_bangunan = 0;
                $harga_tanah = 0;
                $total_harga_jual_nett = 0;
                $harga_jual_total = 0;
                $hpp_landrepayment = 0;
                $devcost_tanah = 0;
                $total_bangunan_hpp = 0;
                $total_hpp = 0;
                $margin_tanah = 0;
                $margin_bangunan = 0;
                $total_margin = 0;
                $land_size = 0;
                $building_size= 0;

            }


            if ($datas[$i]['kuartal'] != $lastRowKuartal ) {
                if ($datas[$i]['kuartal'] != $lastRowKuartal && $lastRowKuartal != "" && $datas[$i]['jangka'] == $lastRowJangka) {

                    array_push($final, array(
                        'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                        "","","",
                        'land_size' => $land_size,
                        'building_size' => $building_size,
                        "","",
                        'uang_masuk' => $uang_masuk,
                        'uang_masuk_gl' => $uang_masuk_gl,
                        'harga_tanah' => $harga_tanah,
                        'harga_bangunan' => $harga_bangunan,
                        'total_harga_jual_nett' => $total_harga_jual_nett,
                        'harga_jual_total' => $harga_jual_total,
                        "","","","","","",
                        'hpp_landrepayment' =>  ( empty($hpp_landrepayment) == FALSE ? $hpp_landrepayment : 0 ),
                        'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                        'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                        'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                        'margin_tanah' => $margin_tanah,
                        'margin_bangunan' => $margin_bangunan,
                        'total_margin' => $total_margin,
                    )); $startrow += 1;
                    $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                    $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                    $doc->getActiveSheet()->getStyle("A".($startrow).":AC".($startrow))->applyFromArray($bordertopbottom);

                    $uang_masuk = 0;
                    $uang_masuk_gl = 0;
                    $harga_bangunan = 0;
                    $harga_tanah = 0;
                    $total_harga_jual_nett = 0;
                    $harga_jual_total = 0;
                    $hpp_landrepayment = 0;
                    $devcost_tanah = 0;
                    $total_bangunan_hpp = 0;
                    $total_hpp = 0;
                    $margin_tanah = 0;
                    $margin_bangunan = 0;
                    $total_margin = 0;
                    $land_size = 0;
                    $building_size= 0;

                            // $doc->getActiveSheet()->mergeCells("A".($startrow+$i).":G".($startrow+$i));
                }
                array_push($final, ['']); $startrow += 1;
                array_push($final, array('','kuartal' => "Kuartal " . $datas[$i]['kuartal']));$startrow += 1;
                array_push($final, ['']); $startrow += 1;
            }

            $sub_data[] = date('d/m/Y', strtotime($datas[$i]['purchase_date']));
            $sub_data[] = $datas[$i]['unit_number'];
            $sub_data[] = $datas[$i]['customer_name'];
            $sub_data[] = $datas[$i]['land_size'];
            $sub_data[] = $datas[$i]['building_size'];
            $sub_data[] = $datas[$i]['cluster'];
            $sub_data[] = $datas[$i]['type'];
            $sub_data[] = $datas[$i]['uang_masuk'];
            $sub_data[] = ( empty($datas[$i]['uang_masuk_gl']) == FALSE ? $datas[$i]['uang_masuk_gl'] : 0 );
            $sub_data[] = $datas[$i]['harga_tanah'];
            $sub_data[] = $datas[$i]['harga_bangunan'];
            $sub_data[] = $datas[$i]['total_harga_jual_nett'];
            $sub_data[] = $datas[$i]['harga_jual_total'];
            $sub_data[] = $datas[$i]['persen_um'];
            $sub_data[] = $datas[$i]['cara_bayar'];
            $sub_data[] = $datas[$i]['persen_bangunan'];
            $sub_data[] = date('d/m/Y', strtotime($datas[$i]['rencana_st']));
            $sub_data[] = date('d/m/Y', strtotime($datas[$i]['serahterimaplan_date']));
            $sub_data[] = date('d/m/Y', strtotime($datas[$i]['lastpaydate']));
            $sub_data[] = ( empty($datas[$i]['hpp_landrepayment']) == FALSE ? '1' : '0' );
            $sub_data[] = $datas[$i]['devcost_tanah'];
            $sub_data[] = $datas[$i]['total_bangunan_hpp'];
            $sub_data[] = $datas[$i]['total_hpp'];
        // $sub_data[] = $datas[$i]['harga_tanah'] - $datas[$i]['hpp_landrepayment'] - $datas[$i]['devcost_tanah'];
            $sub_data[] = $datas[$i]['margin_tanah'];
        // $sub_data[] = $datas[$i]['harga_bangunan']-$datas[$i]['total_bangunan_hpp'];
            $sub_data[] = $datas[$i]['margin_bangunan'];
        // $sub_data[] = ($datas[$i]['harga_tanah']-$datas[$i]['hpp_landrepayment']-$datas[$i]['devcost_tanah'])+($datas[$i]['harga_bangunan']-$datas[$i]['total_bangunan_hpp']);
            $sub_data[] = $datas[$i]['total_margin'];
            $sub_data[] = '';
            $sub_data[] = '';
            $temp_data[] = $sub_data;
            array_push($final, $sub_data); $startrow += 1;

            $uang_masuk_total += $datas[$i]['uang_masuk'];
            $uang_masuk_gl_total += $datas[$i]['uang_masuk_gl'];
            $harga_bangunan_total += $datas[$i]['harga_bangunan'];
            $harga_tanah_total += $datas[$i]['harga_tanah'];
            $total_harga_jual_nett_total += $datas[$i]['total_harga_jual_nett'];
            $harga_jual_total_total += $datas[$i]['harga_jual_total'];
            $hpp_landrepayment_total += $datas[$i]['hpp_landrepayment'];
            $devcost_tanah_total += $datas[$i]['devcost_tanah'];
            $total_bangunan_hpp_total += (double)$datas[$i]['total_bangunan_hpp'];
            $total_hpp_total += $datas[$i]['total_hpp'];
            $margin_tanah_total += $datas[$i]['margin_tanah'];
            $margin_bangunan_total += $datas[$i]['margin_bangunan'];
            $total_margin_total += $datas[$i]['total_margin'];
            $land_size_total += $datas[$i]['land_size'];
            $building_size_total += $datas[$i]['building_size'];

            $uang_masuk_total_kuartal += $datas[$i]['uang_masuk'];
            $uang_masuk_gl_total_kuartal += $datas[$i]['uang_masuk_gl'];
            $harga_bangunan_total_kuartal += $datas[$i]['harga_bangunan'];
            $harga_tanah_total_kuartal += $datas[$i]['harga_tanah'];
            $total_harga_jual_nett_total_kuartal += $datas[$i]['total_harga_jual_nett'];
            $harga_jual_total_total_kuartal += $datas[$i]['harga_jual_total'];
            $hpp_landrepayment_total_kuartal += $datas[$i]['hpp_landrepayment'];
            $devcost_tanah_total_kuartal += $datas[$i]['devcost_tanah'];
            $total_bangunan_hpp_total_kuartal += $datas[$i]['total_bangunan_hpp'];
            $total_hpp_total_kuartal += $datas[$i]['total_hpp'];
            $margin_tanah_total_kuartal += $datas[$i]['margin_tanah'];
            $margin_bangunan_total_kuartal += $datas[$i]['margin_bangunan'];
            $total_margin_total_kuartal += $datas[$i]['total_margin'];
            $land_size_total_kuartal += $datas[$i]['land_size'];
            $building_size_total_kuartal += $datas[$i]['building_size'];

            // if ($lastRowJangka == $datas[$i]['jangka'] || $lastRowJangka == "" ) {
            $uang_masuk += $datas[$i]['uang_masuk'];
            $uang_masuk_gl += $datas[$i]['uang_masuk_gl'];
            $harga_bangunan += $datas[$i]['harga_bangunan'];
            $harga_tanah += $datas[$i]['harga_tanah'];
            $total_harga_jual_nett += $datas[$i]['total_harga_jual_nett'];
            $harga_jual_total += $datas[$i]['harga_jual_total'];
            $hpp_landrepayment += $datas[$i]['hpp_landrepayment'];
            $devcost_tanah += $datas[$i]['devcost_tanah'];
            $total_bangunan_hpp += $datas[$i]['total_bangunan_hpp'];
            $total_hpp += $datas[$i]['total_hpp'];
            $margin_tanah += $datas[$i]['margin_tanah'];
            $margin_bangunan += $datas[$i]['margin_bangunan'];
            $total_margin += $datas[$i]['total_margin'];
            $land_size += $datas[$i]['land_size'];
            $building_size += $datas[$i]['building_size'];
            // }

            $lastRowJangka = $datas[$i]['jangka'];
            $lastRowKuartal = $datas[$i]['kuartal'];

        }

        array_push($final, array(
            'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
            "","","",
            'land_size' => $land_size,
            'building_size' => $building_size,
            "","",
            'uang_masuk' => $uang_masuk,
            'uang_masuk_gl' => $uang_masuk_gl,
            'harga_tanah' => $harga_tanah,
            'harga_bangunan' => $harga_bangunan,
            'total_harga_jual_nett' => $total_harga_jual_nett,
            'harga_jual_total' => $harga_jual_total,
            "","","","","","",
            'hpp_landrepayment' =>  ( empty($hpp_landrepayment) == FALSE ? $hpp_landrepayment : 0 ),
            'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
            'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
            'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
            'margin_tanah' => $margin_tanah,
            'margin_bangunan' => $margin_bangunan,
            'total_margin' => $total_margin,
        ));
        $doc->getActiveSheet()->mergeCells("A".($startrow+1).":D".($startrow+1)); 
        $doc->getActiveSheet()->getStyle("A".($startrow+1).":D".($startrow+1))->applyFromArray($aligncenter);
        $doc->getActiveSheet()->getStyle("A".($startrow+1).":AC".($startrow+1))->applyFromArray($bordertopbottom);

        array_push($final, array(
            'total_kuartal' => "Total " . $lastRowJangka, 
            "","","",
            'land_size_total' => $land_size_total,
            'building_size_total' => $building_size_total,
            "","",
            'uang_masuk_total' => $uang_masuk_total,
            'uang_masuk_gl_total' => $uang_masuk_gl_total,
            'harga_tanah_total' => $harga_tanah_total,
            'harga_bangunan_total' => $harga_bangunan_total,
            'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
            'harga_jual_total_total' => $harga_jual_total_total,
            "","","","","","",
            'hpp_landrepayment_total' =>  ( empty($hpp_landrepayment_total) == FALSE ? $hpp_landrepayment_total : 0 ),
            'devcost_tanah_total' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
            'total_bangunan_hpp_total' => ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
            'total_hpp_total' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
            'margin_tanah_total' => $margin_tanah_total,
            'margin_bangunan_total' => $margin_bangunan_total,
            'total_margin_total' => $total_margin_total,
        ));
        $doc->getActiveSheet()->mergeCells("A".($startrow+2).":D".($startrow+2)); 
        $doc->getActiveSheet()->getStyle("A".($startrow+2).":D".($startrow+2))->applyFromArray($aligncenter);
        $doc->getActiveSheet()->getStyle("A".($startrow+2).":AC".($startrow+2))->applyFromArray($bordertopbottom);

        array_push($final, array(
            'total_kuartal' => "Total Kuartal Keseluruhan", 
            "","","",
            'land_size_total' => $land_size_total_kuartal,
            'building_size_total' => $building_size_total_kuartal,
            "","",
            'uang_masuk_total' => $uang_masuk_total_kuartal,
            'uang_masuk_gl_total' => $uang_masuk_gl_total_kuartal,
            'harga_tanah_total' => $harga_tanah_total_kuartal,
            'harga_bangunan_total' => $harga_bangunan_total_kuartal,
            'total_harga_jual_nett_total' => $total_harga_jual_nett_total_kuartal,
            'harga_jual_total_total' => $harga_jual_total_total_kuartal,
            "","","","","","",
            'hpp_landrepayment_total' =>  ( empty($hpp_landrepayment_total_kuartal) == FALSE ? $hpp_landrepayment_total_kuartal : 0 ),
            'devcost_tanah_total' =>  ( empty($devcost_tanah_total_kuartal) == FALSE ? $devcost_tanah_total_kuartal : 0 ),
            'total_bangunan_hpp_total' => ( empty($total_bangunan_hpp_total_kuartal) == FALSE ? $total_bangunan_hpp_total_kuartal : 0 ),
            'total_hpp_total' => ( empty($total_hpp_total_kuartal) == FALSE ? $total_hpp_total_kuartal : 0 ),
            'margin_tanah_total' => $margin_tanah_total_kuartal,
            'margin_bangunan_total' => $margin_bangunan_total_kuartal,
            'total_margin_total' => $total_margin_total_kuartal,
        ));
        $doc->getActiveSheet()->mergeCells("A".($startrow+3).":D".($startrow+3)); 
        $doc->getActiveSheet()->getStyle("A".($startrow+3).":D".($startrow+3))->applyFromArray($aligncenter);
        $doc->getActiveSheet()->getStyle("A".($startrow+3).":AC".($startrow+3))->applyFromArray($bordertopbottom);

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
        $doc->getActiveSheet()->getColumnDimension('AA')->setWidth(20);
        $doc->getActiveSheet()->getColumnDimension('AB')->setWidth(20);
    }


    if($isReady == TRUE){
        $ptname = $this->_ptname;
        $filename = "Report_SalesBackLogDetailV2_Landed_".$ptname.".xls";
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



        function generateExcelV2Highrise($param){
        //BUILT EXCEL

        //GET PT NAME
            $this->_schema = "dbmaster.dbo";
            $this->converter = new Cashier_Box_Tools();
            $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
            $ptname = $datapt[0][0]['name'];

            $this->_ptname = $ptname;

            $additional['header'] = array( 
                $ptname, 
            );

            $additional['header_r2'] = array( 
                'SALES BACK LOG DETAIL V2 - HIGHRISE', 
            );

            $additional['header_r3'] = array( 
                'PERIOD : '.date('d F Y', strtotime($param['salesyeardata_start_ver2'])).'-'.date('d F Y', strtotime($param['salesyeardata_end_ver2']))
            );

            $sheetname = '';
            $sheet = 0 ; 
            $titles = '';

            $sql = "sp_report_backlog_sh1";

            $titles = array(
                'NO',
                'PURCHASE DATE',
                'BLOK',
                'NAMA PEMBELI',
                'LUAS TANAH',
                'LUAS BANGUNAN',
                'TYPE',
                'UANG MASUK TOTAL',
                'UANG MUKA PENJUALAN',// 'UANG MASUK (GL)',
                'HARGA JUAL (NETT)',
                '',
                'HARGA JUAL TOTAL (Inc. PPN, BBN, AJB)',
                '%UM TERHADAP HARGA JUAL TOTAL',
                'CARA BAYAR',
                '% BANGUNAN',
                'RENCANA ST',
                'TANGGAL TERAKHIR BAYAR',
                'HPP',
                '',
                'TOTAL HPP',
            );


            $col = array(
                '',
                'purchase_date', 
                'unit_number',
                'customer_name',
                'land_size',
                'building_size',
                'type',
                'uang_masuk',
                'uang_masuk_gl',
                'harga_bangunan',
                'harga_jual',
                'harga_jual_total',
                'persen_um',
                'cara_bayar',
                'persen_bangunan',
                'rencana_st',
                '',
                'devcos_tanah',
                'total_bangunan_hpp',
                'total_hpp',
            );



            $paramdata = array(
                $param['project_id'],$param['pt_id'],$param['salesyeardata_start_ver2'],$param['salesyeardata_end_ver2'], $param['handoveryeardata_start_ver2'], 
                $param['handoveryeardata_end_ver2'], $param['type_report']
            );
            $sheetname = "Sheet 1";

            // var_dump($paramdata);die;

            $doc = $this->genReportexcelV2Highrise($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

            $titleArraystyle = array(
                'font' => array(
                    'bold' => true,
                    // 'color' => array('rgb' => '2F4F4F'),
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

            // $doc->getActiveSheet()->getRowDimension('6')->setRowHeight(30);

            $doc->getActiveSheet()->getStyle("A6:T6")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getStyle("A7:T7")->applyFromArray($titleArraystyle);

            $doc->getActiveSheet()->mergeCells('J6:K6');
            $doc->getActiveSheet()->mergeCells('R6:S6');

            $doc->getActiveSheet()->mergeCells('A6:A7');
            $doc->getActiveSheet()->mergeCells('B6:B7');
            $doc->getActiveSheet()->mergeCells('C6:C7');
            $doc->getActiveSheet()->mergeCells('D6:D7');
            $doc->getActiveSheet()->mergeCells('E6:E7');
            $doc->getActiveSheet()->mergeCells('F6:F7');
            $doc->getActiveSheet()->mergeCells('G6:G7');
            $doc->getActiveSheet()->mergeCells('H6:H7');
            $doc->getActiveSheet()->mergeCells('I6:I7');
            $doc->getActiveSheet()->mergeCells('L6:L7');
            $doc->getActiveSheet()->mergeCells('M6:M7');
            $doc->getActiveSheet()->mergeCells('N6:N7');
            $doc->getActiveSheet()->mergeCells('O6:O7');
            $doc->getActiveSheet()->mergeCells('P6:P7');
            $doc->getActiveSheet()->mergeCells('Q6:Q7');
            $doc->getActiveSheet()->mergeCells('T6:T7');


            $this->genReportexcelV2Highrise($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);


            return $this->_tmpparam;
        }

        function genReportexcelV2Highrise($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
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
                $arrstyle = array(
                    'font' => array(
                        'bold' => true,
                        'size' => 11
                    )
                );


                $bordertopbottom = array( //bold
                    'borders' => array(
                        'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
                        'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
                    ),
                    'font' => array(
                        'bold' => true,
                        'size' => 11
                    ),

                );

                $aligncenter = array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                    ),
                );
                
        // GIVEN HEADER NAME
                array_push($final, $additional['header']);
                array_push($final, $additional['header_r2']);
                array_push($final, $additional['header_r3']);
                array_push($final, ['']);
                array_push($final, ['']);
        //GIVEN COLUMN NAME

                $titles2 = array(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'BANGUNAN',
                    'TOTAL',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'DEVCOS',
                    'BANGUNAN',
                    '',
                );
                array_push($final,  $titles);
                array_push($final,  $titles2);

                $temp_data = [];
                
                $lastRowJangka = "";
                $lastRowKuartal = "";
                $startrow = 7;

                $uang_masuk = 0;
                $uang_masuk_gl = 0;
                $harga_bangunan = 0;
                $total_harga_jual_nett = 0;
                $harga_jual_total = 0;
                $devcost_tanah = 0;
                $total_bangunan_hpp = 0;
                $total_hpp = 0;
                $land_size = 0;
                $building_size = 0;

                $uang_masuk_total = 0;
                $uang_masuk_gl_total = 0;
                $harga_bangunan_total = 0;
                $total_harga_jual_nett_total = 0;
                $harga_jual_total_total = 0;
                $devcost_tanah_total = 0;
                $total_bangunan_hpp_total = 0;
                $total_hpp_total = 0;
                $land_size_total = 0;
                $building_size_total = 0;

                $uang_masuk_total_kuartal = 0;
                $uang_masuk_gl_total_kuartal = 0;
                $harga_bangunan_total_kuartal = 0;
                $total_harga_jual_nett_total_kuartal = 0;
                $harga_jual_total_total_kuartal = 0;
                $devcost_tanah_total_kuartal = 0;
                $total_bangunan_hpp_total_kuartal = 0;
                $total_hpp_total_kuartal = 0;
                $land_size_total_kuartal = 0;
                $building_size_total_kuartal = 0;


                for ( $i = 0; $i < sizeof($datas); $i++) { 
                    $sub_data = [];
                    $sub_data[] = $i+1;

                    if($datas[$i]['jangka'] != $lastRowJangka){

                        if ($datas[$i]['jangka'] != $lastRowJangka && $lastRowJangka != "") {

                            array_push($final, array(
                                'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                                "","","",
                                'land_size' => $land_size,
                                'building_size' => $building_size,
                                "",
                                'uang_masuk' => $uang_masuk,
                                'uang_masuk_gl' => $uang_masuk_gl,
                                'harga_bangunan' => $harga_bangunan,
                                'total_harga_jual_nett' => $total_harga_jual_nett,
                                'harga_jual_total' => $harga_jual_total,
                                "","","","","",
                                'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                                'total_bangunan_hpp' =>  ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                                'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                            )); $startrow += 1;
                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":T".($startrow))->applyFromArray($bordertopbottom);
                            

                            array_push($final, array(
                                'total_kuartal' => "Total " . $lastRowJangka, 
                                "","","",
                                'land_size_total' => $land_size_total,
                                'building_size_total' => $building_size_total,
                                "",
                                'uang_masuk_total' => $uang_masuk_total,
                                'uang_masuk_gl_total' => $uang_masuk_gl_total,
                                'harga_bangunan_total' => $harga_bangunan_total,
                                'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
                                'harga_jual_total_total' => $harga_jual_total_total,
                                "","","","","",
                                'devcost_tanah_total' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
                                'total_bangunan_hpp_total' =>  ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
                                'total_hpp_total' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
                            )); $startrow += 1;

                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":T".($startrow))->applyFromArray($bordertopbottom);
                            


                            $uang_masuk_total = 0;
                            $uang_masuk_gl_total = 0;
                            $harga_bangunan_total = 0;
                            $total_harga_jual_nett_total = 0;
                            $harga_jual_total_total = 0;
                            $devcost_tanah_total = 0;
                            $total_bangunan_hpp_total = 0;
                            $total_hpp_total = 0;
                            $land_size_total = 0;
                            $building_size_total = 0;
                        }

                        array_push($final, ['']); $startrow += 1;
                        array_push($final, array('','jangka' => strtoupper($datas[$i]['jangka']))); $startrow += 1;
                        $doc->getActiveSheet()->getStyle("B".($startrow).":C".($startrow))->applyFromArray($arrstyle);


                        $uang_masuk = 0;
                        $uang_masuk_gl = 0;
                        $harga_bangunan = 0;
                        $total_harga_jual_nett = 0;
                        $harga_jual_total = 0;
                        $devcost_tanah = 0;
                        $total_bangunan_hpp = 0;
                        $total_hpp = 0;
                        $land_size = 0;
                        $building_size = 0;
                    }

                    if ($datas[$i]['kuartal'] != $lastRowKuartal ) {
                        if ($datas[$i]['kuartal'] != $lastRowKuartal && $lastRowKuartal != "" && $datas[$i]['jangka'] == $lastRowJangka) {

                            array_push($final, array(
                                'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                                "","","",
                                'land_size' => $land_size,
                                'building_size' => $building_size,
                                "",
                                'uang_masuk' => $uang_masuk,
                                'uang_masuk_gl' => $uang_masuk_gl,
                                'harga_bangunan' => $harga_bangunan,
                                'total_harga_jual_nett' => $total_harga_jual_nett,
                                'harga_jual_total' => $harga_jual_total,
                                "","","","","",
                                'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                                'total_bangunan_hpp' =>  ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                                'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                            )); $startrow += 1;
                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":T".($startrow))->applyFromArray($bordertopbottom);

                            $uang_masuk = 0;
                            $uang_masuk_gl = 0;
                            $harga_bangunan = 0;
                            $total_harga_jual_nett = 0;
                            $harga_jual_total = 0;
                            $devcost_tanah = 0;
                            $total_bangunan_hpp = 0;
                            $total_hpp = 0;
                            $land_size = 0;
                            $building_size = 0;

                            // $doc->getActiveSheet()->mergeCells("A".($startrow+$i).":G".($startrow+$i));
                        }
                        array_push($final, ['']); $startrow += 1;
                        array_push($final, array('','kuartal' => "Kuartal " . $datas[$i]['kuartal']));$startrow += 1;
                        array_push($final, ['']); $startrow += 1;
                    }

                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['purchase_date']));
                    $sub_data[] = $datas[$i]['unit_number'];
                    $sub_data[] = $datas[$i]['customer_name'];
                    $sub_data[] = $datas[$i]['land_size'];
                    $sub_data[] = $datas[$i]['building_size'];
                    $sub_data[] = $datas[$i]['type'];
                    $sub_data[] = $datas[$i]['uang_masuk'];
                    $sub_data[] = ( empty($datas[$i]['uang_masuk_gl']) == FALSE ? $datas[$i]['uang_masuk_gl'] : 0 );
                    $sub_data[] = $datas[$i]['harga_bangunan'];
                    $sub_data[] = $datas[$i]['total_harga_jual_nett'];
                    $sub_data[] = $datas[$i]['harga_jual_total'];
                    $sub_data[] = $datas[$i]['persen_um'];
                    $sub_data[] = $datas[$i]['cara_bayar'];
                    $sub_data[] = $datas[$i]['persen_bangunan'];
                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['rencana_st']));
                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['lastpaydate']));
                    $sub_data[] = ( empty($datas[$i]['devcost_tanah']) == FALSE ? $datas[$i]['devcost_tanah'] : 0 );
                    $sub_data[] = ( empty($datas[$i]['total_bangunan_hpp']) == FALSE ? $datas[$i]['total_bangunan_hpp'] : 0 );
                    $sub_data[] = ( empty($datas[$i]['total_hpp']) == FALSE ? $datas[$i]['total_hpp'] : 0 );
                    $temp_data[] = $sub_data;


                    array_push($final, $sub_data); $startrow += 1;

                    $uang_masuk_total += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl_total += $datas[$i]['uang_masuk_gl'];
                    $harga_bangunan_total += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett_total += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total_total += $datas[$i]['harga_jual_total'];
                    $devcost_tanah_total += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp_total += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp_total += $datas[$i]['total_hpp'];
                    $land_size_total += $datas[$i]['land_size'];
                    $building_size_total += $datas[$i]['building_size'];


                    $uang_masuk_total_kuartal += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl_total_kuartal += $datas[$i]['uang_masuk_gl'];
                    $harga_bangunan_total_kuartal += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett_total_kuartal += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total_total_kuartal += $datas[$i]['harga_jual_total'];
                    $devcost_tanah_total_kuartal += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp_total_kuartal += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp_total_kuartal += $datas[$i]['total_hpp'];
                    $land_size_total_kuartal += $datas[$i]['land_size'];
                    $building_size_total_kuartal += $datas[$i]['building_size'];

                    // if ($lastRowJangka == $datas[$i]['jangka'] || $lastRowJangka == "" ) {
                    $uang_masuk += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl += $datas[$i]['uang_masuk_gl'];
                    $harga_bangunan += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total += $datas[$i]['harga_jual_total'];
                    $devcost_tanah_total += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp_total += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp_total += $datas[$i]['total_hpp'];
                    $land_size += $datas[$i]['land_size'];
                    $building_size += $datas[$i]['building_size'];
                    // }

                    $lastRowJangka = $datas[$i]['jangka'];
                    $lastRowKuartal = $datas[$i]['kuartal'];
                }

                array_push($final, array(
                    'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                    "","","",
                    'land_size' => $land_size,
                    'building_size' => $building_size,
                    "",
                    'uang_masuk' => $uang_masuk,
                    'uang_masuk_gl' => $uang_masuk_gl,
                    'harga_bangunan' => $harga_bangunan,
                    'total_harga_jual_nett' => $total_harga_jual_nett,
                    'harga_jual_total' => $harga_jual_total,
                    "","","","","",
                    'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                    'total_bangunan_hpp' =>  ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                    'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+1).":D".($startrow+1)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+1).":D".($startrow+1))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+1).":T".($startrow+1))->applyFromArray($bordertopbottom);

                array_push($final, array(
                    'total_kuartal' => "Total " . $lastRowJangka, 
                    "","","",
                    'land_size_total' => $land_size_total,
                    'building_size_total' => $building_size_total,
                    "",
                    'uang_masuk_total' => $uang_masuk_total,
                    'uang_masuk_gl_total' => $uang_masuk_gl_total,
                    'harga_bangunan_total' => $harga_bangunan_total,
                    'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
                    'harga_jual_total_total' => $harga_jual_total_total,
                    "","","","","",
                    'devcost_tanah_total' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
                    'total_bangunan_hpp_total' =>  ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
                    'total_hpp_total' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+2).":D".($startrow+2)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+2).":D".($startrow+2))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+2).":T".($startrow+2))->applyFromArray($bordertopbottom);

                array_push($final, array(
                    'total_kuartal' => "Total Kuartal Keseluruhan", 
                    "","","",
                    'land_size_total' => $land_size_total_kuartal,
                    'building_size_total' => $building_size_total_kuartal,
                    "",
                    'uang_masuk_total' => $uang_masuk_total_kuartal,
                    'uang_masuk_gl_total' => $uang_masuk_gl_total_kuartal,
                    'harga_bangunan_total' => $harga_bangunan_total_kuartal,
                    'total_harga_jual_nett_total' => $total_harga_jual_nett_total_kuartal,
                    'harga_jual_total_total' => $harga_jual_total_total_kuartal,
                    "","","","","",
                    'devcost_tanah_total' =>  ( empty($devcost_tanah_total_kuartal) == FALSE ? $devcost_tanah_total_kuartal : 0 ),
                    'total_bangunan_hpp_total' =>  ( empty($total_bangunan_hpp_total_kuartal) == FALSE ? $total_bangunan_hpp_total_kuartal : 0 ),
                    'total_hpp_total' => ( empty($total_hpp_total_kuartal) == FALSE ? $total_hpp_total_kuartal : 0 ),
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+3).":D".($startrow+3)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+3).":D".($startrow+3))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+3).":T".($startrow+3))->applyFromArray($bordertopbottom);


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

                foreach(range('A','T') as $columnID) {
                    $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);

                }

                $doc->getActiveSheet()->getColumnDimension('A')->setWidth(5);
                $rowstotal = $doc->getActiveSheet()->getHighestRow();
                $doc->getActiveSheet()->getStyle('H8:L'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
                $doc->getActiveSheet()->getStyle('R8:T'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
            }


            if($isReady == TRUE){
                $ptname = $this->_ptname;
                $filename = "Report_SalesBackLogDetailV2_Highrise_".$ptname.".xls";
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



        function generateExcelV2Project($param){
        //BUILT EXCEL

        //GET PT NAME
            $this->_schema = "dbmaster.dbo";
            $this->converter = new Cashier_Box_Tools();
            $datapt = $this->execSP3("sp_pt_byid_read", array($param['pt_id']));
            $ptname = $datapt[0][0]['name'];

            $this->_ptname = $ptname;

            $additional['header'] = array( 
                $ptname, 
            );

            $additional['header_r2'] = array( 
                'SALES BACK LOG DETAIL V2 - PROJECT', 
            );

            $additional['header_r3'] = array( 
                'PERIOD : '.date('d F Y', strtotime($param['salesyeardata_start_ver2'])).'-'.date('d F Y', strtotime($param['salesyeardata_end_ver2']))
            );

            $sheetname = '';
            $sheet = 0 ; 
            $titles = '';

            $sql = "sp_report_backlog_sh1";

            $titles = array(
                'NO',
                'PURCHASE DATE',
                'BLOK',
                'NAMA PEMBELI',
                'LUAS TANAH',
                'LUAS BANGUNAN',
                'TYPE',
                'UANG MASUK TOTAL',
                'UANG MUKA PENJUALAN',
                'HARGA JUAL (NETT)',
                '',
                '',
                'HARGA JUAL TOTAL (Inc. PPN, BBN, AJB)',
                'REVENUE PORSI PARTNER',
                '',
                '',
                'REVENUE NET (SETELAH DIKURANG PARTNER)',
                '%UM TERHADAP HARGA JUAL TOTAL',
                'CARA BAYAR',
                '% BANGUNAN',
                'RENCANA ST',
                'TANGGAL TERAKHIR BAYAR',
                'HPP',
                '',
                'TOTAL HPP',
                'MARGIN',
                '',
                'TOTAL MARGIN',
            );  

            $col = array(
                '',
                'purchase_date', 
                'unit_number',
                'customer_name',
                'land_size',
                'building_size',
                'type',
                'uang_masuk',
                'uang_masuk_gl',
                'harga_tanah',
                'harga_bangunan',
                'harga_jual',
                'harga_jual_total',
                '',
                '',
                '',
                '',
                'persen_um',
                'cara_bayar',
                'persen_bangunan',
                'rencana_st',
                '',
                'devcos_tanah',
                'total_bangunan_hpp',
                'total_hpp',
                'margin_tanah',
                'margin_bangunan',
                'total_margin',
            );

            $paramdata = array(
                $param['project_id'],$param['pt_id'],$param['salesyeardata_start_ver2'],$param['salesyeardata_end_ver2'], $param['handoveryeardata_start_ver2'], 
                $param['handoveryeardata_end_ver2'], $param['type_report']
            );
            $sheetname = "Sheet 1";

            // var_dump($paramdata);die;

            $doc = $this->genReportexcelV2Project($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, FALSE);

            $titleArraystyle = array(
                'font' => array(
                    'bold' => true,
                    // 'color' => array('rgb' => '2F4F4F'),
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

            // $doc->getActiveSheet()->getRowDimension('6')->setRowHeight(30);

            $doc->getActiveSheet()->getStyle("A6:AB6")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getStyle("A7:AB7")->applyFromArray($titleArraystyle);

            $doc->getActiveSheet()->mergeCells('J6:L6');
            $doc->getActiveSheet()->mergeCells('N6:P6');
            $doc->getActiveSheet()->mergeCells('W6:X6');
            $doc->getActiveSheet()->mergeCells('Z6:AA6');

            $doc->getActiveSheet()->mergeCells('A6:A7');
            $doc->getActiveSheet()->mergeCells('B6:B7');
            $doc->getActiveSheet()->mergeCells('C6:C7');
            $doc->getActiveSheet()->mergeCells('D6:D7');
            $doc->getActiveSheet()->mergeCells('E6:E7');
            $doc->getActiveSheet()->mergeCells('F6:F7');
            $doc->getActiveSheet()->mergeCells('G6:G7');
            $doc->getActiveSheet()->mergeCells('H6:H7');
            $doc->getActiveSheet()->mergeCells('I6:I7');
            $doc->getActiveSheet()->mergeCells('M6:M7');
            $doc->getActiveSheet()->mergeCells('Q6:Q7');
            $doc->getActiveSheet()->mergeCells('R6:R7');
            $doc->getActiveSheet()->mergeCells('S6:S7');
            $doc->getActiveSheet()->mergeCells('T6:T7');
            $doc->getActiveSheet()->mergeCells('U6:U7');
            $doc->getActiveSheet()->mergeCells('V6:V7');
            $doc->getActiveSheet()->mergeCells('Y6:Y7');
            $doc->getActiveSheet()->mergeCells('AB6:AB7');


            $this->genReportexcelV2Project($param, $sql, $sheet,$sheetname, $additional, $paramdata, $col,  $titles, TRUE);

            return $this->_tmpparam;
        }

        function genReportexcelV2Project($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady) {
        // create php excel object
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

                $arrstyle = array(
                    'font' => array(
                        'bold' => true,
                        'size' => 11
                    )
                );


                $bordertopbottom = array( //bold
                    'borders' => array(
                        'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
                        'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
                    ),
                    'font' => array(
                        'bold' => true,
                        'size' => 11
                    ),

                );

                $aligncenter = array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                    ),
                );

        // GIVEN HEADER NAME
                array_push($final, $additional['header']);
                array_push($final, $additional['header_r2']);
                array_push($final, $additional['header_r3']);
                array_push($final, ['']);
                array_push($final, ['']);
        //GIVEN COLUMN NAME
                array_push($final,  $titles);


                $titles2 = array(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'TANAH',
                    'BANGUNAN',
                    'TOTAL',
                    '',
                    'TANAH',
                    'BANGUNAN',
                    'TOTAL',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'DEVCOS',
                    'BANGUNAN',
                    '',
                    'TANAH',
                    'BANGUNAN',
                    '',
                );    
                array_push($final,  $titles2);

                $temp_data = [];

                $lastRowJangka = "";
                $lastRowKuartal = "";
                $startrow = 7;

                $uang_masuk = 0;
                $uang_masuk_gl = 0;
                $harga_tanah = 0;
                $harga_bangunan = 0;
                $total_harga_jual_nett = 0;
                $harga_jual_total = 0;
                $harga_tanah_partner = 0;
                $harga_bangunan_partner = 0;
                $total_partner = 0;
                $total_dikurang_partner = 0;
                $devcost_tanah = 0;
                $total_bangunan_hpp = 0;
                $total_hpp = 0;
                $margin_tanah = 0;
                $margin_bangunan = 0;
                $total_margin = 0;
                $land_size = 0;
                $building_size = 0;

                $uang_masuk_total = 0;
                $uang_masuk_gl_total = 0;
                $harga_tanah_total = 0;
                $harga_bangunan_total = 0;
                $total_harga_jual_nett_total = 0;
                $harga_jual_total_total = 0;
                $harga_tanah_partner_total = 0;
                $harga_bangunan_partner_total = 0;
                $total_partner_total = 0;
                $total_dikurang_partner_total = 0;
                $devcost_tanah_total = 0;
                $total_bangunan_hpp_total = 0;
                $total_hpp_total = 0;
                $margin_tanah_total = 0;
                $margin_bangunan_total = 0;
                $total_margin_total = 0;
                $land_size_total = 0;
                $building_size_total = 0;

                $uang_masuk_total_kuartal = 0;
                $uang_masuk_gl_total_kuartal = 0;
                $harga_tanah_total_kuartal = 0;
                $harga_bangunan_total_kuartal = 0;
                $total_harga_jual_nett_total_kuartal = 0;
                $harga_jual_total_total_kuartal = 0;
                $harga_tanah_partner_total_kuartal = 0;
                $harga_bangunan_partner_total_kuartal = 0;
                $total_partner_total_kuartal = 0;
                $total_dikurang_partner_total_kuartal = 0;
                $devcost_tanah_total_kuartal = 0;
                $total_bangunan_hpp_total_kuartal = 0;
                $total_hpp_total_kuartal = 0;
                $margin_tanah_total_kuartal = 0;
                $margin_bangunan_total_kuartal = 0;
                $total_margin_total_kuartal = 0;
                $land_size_total_kuartal = 0;
                $building_size_total_kuartal = 0;

                for ( $i = 0; $i < sizeof($datas); $i++) { 
                    $sub_data = [];
                    $sub_data[] = $i+1;

                    if($datas[$i]['jangka'] != $lastRowJangka){
                        if ($datas[$i]['jangka'] != $lastRowJangka && $lastRowJangka != "") {

                            array_push($final, array(
                                'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                                "","","",
                                'land_size' => $land_size,
                                'building_size' => $building_size,
                                "",
                                'uang_masuk' => $uang_masuk,
                                'uang_masuk_gl' => $uang_masuk_gl,
                                'harga_tanah' => $harga_tanah,
                                'harga_bangunan' => $harga_bangunan,
                                'total_harga_jual_nett' => $total_harga_jual_nett,
                                'harga_jual_total' => $harga_jual_total,
                                'harga_tanah_partner' => $harga_tanah_partner,
                                'harga_bangunan_partner' => $harga_bangunan_partner,
                                'total_partner' => $total_partner,
                                'total_dikurang_partner' => $total_dikurang_partner,
                                "","","","","",
                                'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                                'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                                'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                                'margin_tanah' => $margin_tanah,
                                'margin_bangunan' => $margin_bangunan,
                                'total_margin' => $total_margin,
                            )); $startrow += 1;

                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":AB".($startrow))->applyFromArray($bordertopbottom);
                            

                            array_push($final, array(
                                'total_kuartal' => "Total " . $lastRowJangka, 
                                "","","",
                                'land_size_total' => $land_size_total,
                                'building_size_total' => $building_size_total,
                                "",
                                'uang_masuk_total' => $uang_masuk_total,
                                'uang_masuk_gl_total' => $uang_masuk_gl_total,
                                'harga_tanah_total' => $harga_tanah_total,
                                'harga_bangunan_total' => $harga_bangunan_total,
                                'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
                                'harga_jual_total_total' => $harga_jual_total_total,
                                'harga_tanah_partner_total' => $harga_tanah_partner_total,
                                'harga_bangunan_partner_total' => $harga_bangunan_partner_total,
                                'total_partner_total' => $total_partner_total,
                                'total_dikurang_partner_total' => $total_dikurang_partner_total,
                                "","","","","",
                                'devcost_tanah' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
                                'total_bangunan_hpp' => ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
                                'total_hpp' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
                                'margin_tanah_total' => $margin_tanah_total,
                                'margin_bangunan_total' => $margin_bangunan_total,
                                'total_margin_total' => $total_margin_total,
                            )); $startrow += 1;

                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":AB".($startrow))->applyFromArray($bordertopbottom);

                            $uang_masuk_total = 0;
                            $uang_masuk_gl_total = 0;
                            $harga_tanah_total = 0;
                            $harga_bangunan_total = 0;
                            $total_harga_jual_nett_total = 0;
                            $harga_jual_total_total = 0;
                            $harga_tanah_partner_total = 0;
                            $harga_bangunan_partner_total = 0;
                            $total_partner_total = 0;
                            $total_dikurang_partner_total = 0;
                            $devcost_tanah_total = 0;
                            $total_bangunan_hpp_total = 0;
                            $total_hpp_total = 0;
                            $margin_tanah_total = 0;
                            $margin_bangunan_total = 0;
                            $total_margin_total = 0;
                            $land_size_total = 0;
                            $building_size_total = 0;
                        }

                        array_push($final, ['']); $startrow += 1;
                        array_push($final, array('','jangka' => strtoupper($datas[$i]['jangka']))); $startrow += 1;
                        $doc->getActiveSheet()->getStyle("B".($startrow).":C".($startrow))->applyFromArray($arrstyle);


                        $uang_masuk = 0;
                        $uang_masuk_gl = 0;
                        $harga_tanah = 0;
                        $harga_bangunan = 0;
                        $total_harga_jual_nett = 0;
                        $harga_jual_total = 0;
                        $harga_tanah_partner = 0;
                        $harga_bangunan_partner = 0;
                        $total_partner = 0;
                        $total_dikurang_partner = 0;
                        $devcost_tanah = 0;
                        $total_bangunan_hpp = 0;
                        $total_hpp = 0;
                        $margin_tanah = 0;
                        $margin_bangunan = 0;
                        $total_margin = 0;
                        $land_size = 0;
                        $building_size = 0;
                    }

                    if ($datas[$i]['kuartal'] != $lastRowKuartal ) {
                        if ($datas[$i]['kuartal'] != $lastRowKuartal && $lastRowKuartal != "" && $datas[$i]['jangka'] == $lastRowJangka) {

                            array_push($final, array(
                                'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                                "","","",
                                'land_size' => $land_size,
                                'building_size' => $building_size,
                                "",
                                'uang_masuk' => $uang_masuk,
                                'uang_masuk_gl' => $uang_masuk_gl,
                                'harga_tanah' => $harga_tanah,
                                'harga_bangunan' => $harga_bangunan,
                                'total_harga_jual_nett' => $total_harga_jual_nett,
                                'harga_jual_total' => $harga_jual_total,
                                'harga_tanah_partner' => $harga_tanah_partner,
                                'harga_bangunan_partner' => $harga_bangunan_partner,
                                'total_partner' => $total_partner,
                                'total_dikurang_partner' => $total_dikurang_partner,
                                "","","","","",
                                'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                                'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                                'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                                'margin_tanah' => $margin_tanah,
                                'margin_bangunan' => $margin_bangunan,
                                'total_margin' => $total_margin,
                            )); $startrow += 1;
                            $doc->getActiveSheet()->mergeCells("A".($startrow).":D".($startrow)); 
                            $doc->getActiveSheet()->getStyle("A".($startrow).":D".($startrow))->applyFromArray($aligncenter);
                            $doc->getActiveSheet()->getStyle("A".($startrow).":AB".($startrow))->applyFromArray($bordertopbottom);

                            $uang_masuk = 0;
                            $uang_masuk_gl = 0;
                            $harga_tanah = 0;
                            $harga_bangunan = 0;
                            $total_harga_jual_nett = 0;
                            $harga_jual_total = 0;
                            $harga_tanah_partner = 0;
                            $harga_bangunan_partner = 0;
                            $total_partner = 0;
                            $total_dikurang_partner = 0;
                            $devcost_tanah = 0;
                            $total_bangunan_hpp = 0;
                            $total_hpp = 0;
                            $margin_tanah = 0;
                            $margin_bangunan = 0;
                            $total_margin = 0;
                            $land_size = 0;
                            $building_size = 0;

                            // $doc->getActiveSheet()->mergeCells("A".($startrow+$i).":G".($startrow+$i));
                        }
                        array_push($final, ['']); $startrow += 1;
                        array_push($final, array('','kuartal' => "Kuartal " . $datas[$i]['kuartal']));$startrow += 1;
                        array_push($final, ['']); $startrow += 1;
                    }


                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['purchase_date']));
                    $sub_data[] = $datas[$i]['unit_number'];
                    $sub_data[] = $datas[$i]['customer_name'];
                    $sub_data[] = $datas[$i]['land_size'];
                    $sub_data[] = $datas[$i]['building_size'];
                    $sub_data[] = $datas[$i]['type'];
                    $sub_data[] = $datas[$i]['uang_masuk'];
                    $sub_data[] = ( empty($datas[$i]['uang_masuk_gl']) == FALSE ? $datas[$i]['uang_masuk_gl'] : 0 );
                    $sub_data[] = $datas[$i]['harga_tanah'];
                    $sub_data[] = $datas[$i]['harga_bangunan'];
                    $sub_data[] = $datas[$i]['total_harga_jual_nett'];
                    $sub_data[] = $datas[$i]['harga_jual_total'];
                    $sub_data[] = $datas[$i]['harga_tanah_partner'];
                    $sub_data[] = $datas[$i]['harga_bangunan_partner'];
                    $sub_data[] = $datas[$i]['total_partner'];
                    $sub_data[] = $datas[$i]['total_dikurang_partner'];
                    $sub_data[] = $datas[$i]['persen_um'];;
                    $sub_data[] = $datas[$i]['cara_bayar'];
                    $sub_data[] = $datas[$i]['persen_bangunan'];
                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['rencana_st']));
                    $sub_data[] = date('d/m/Y', strtotime($datas[$i]['lastpaydate']));
                    $sub_data[] = $datas[$i]['devcost_tanah'];
                    $sub_data[] = $datas[$i]['total_bangunan_hpp'];
                    $sub_data[] = $datas[$i]['total_hpp'];
                    $sub_data[] = $datas[$i]['margin_tanah'];
                    $sub_data[] = $datas[$i]['margin_bangunan'];
                    $sub_data[] = $datas[$i]['total_margin'];
                    $temp_data[] = $sub_data;

                    array_push($final, $sub_data); $startrow += 1;

                    $uang_masuk_total += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl_total += $datas[$i]['uang_masuk_gl'];
                    $harga_tanah_total += $datas[$i]['harga_tanah'];
                    $harga_bangunan_total += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett_total += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total_total += $datas[$i]['harga_jual_total'];
                    $harga_tanah_partner_total += $datas[$i]['harga_tanah_partner'];
                    $harga_bangunan_partner_total += $datas[$i]['harga_bangunan_partner'];
                    $total_partner_total += $datas[$i]['total_partner'];
                    $total_dikurang_partner_total += $datas[$i]['total_dikurang_partner'];
                    $devcost_tanah_total += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp_total += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp_total += $datas[$i]['total_hpp'];
                    $margin_tanah_total += $datas[$i]['margin_tanah'];
                    $margin_bangunan_total += $datas[$i]['margin_bangunan'];
                    $total_margin_total += $datas[$i]['total_margin'];
                    $land_size_total += $datas[$i]['land_size'];
                    $building_size_total += $datas[$i]['building_size'];

                    $uang_masuk_total_kuartal += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl_total_kuartal += $datas[$i]['uang_masuk_gl'];
                    $harga_tanah_total_kuartal += $datas[$i]['harga_tanah'];
                    $harga_bangunan_total_kuartal += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett_total_kuartal += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total_total_kuartal += $datas[$i]['harga_jual_total'];
                    $harga_tanah_partner_total_kuartal += $datas[$i]['harga_tanah_partner'];
                    $harga_bangunan_partner_total_kuartal += $datas[$i]['harga_bangunan_partner'];
                    $total_partner_total_kuartal += $datas[$i]['total_partner'];
                    $total_dikurang_partner_total_kuartal += $datas[$i]['total_dikurang_partner'];
                    $devcost_tanah_total_kuartal += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp_total_kuartal += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp_total_kuartal += $datas[$i]['total_hpp'];
                    $margin_tanah_total_kuartal += $datas[$i]['margin_tanah'];
                    $margin_bangunan_total_kuartal += $datas[$i]['margin_bangunan'];
                    $total_margin_total_kuartal += $datas[$i]['total_margin'];
                    $land_size_total_kuartal += $datas[$i]['land_size'];
                    $building_size_total_kuartal += $datas[$i]['building_size'];

                    // if ($lastRowJangka == $datas[$i]['jangka'] || $lastRowJangka == "" ) {
                    $uang_masuk += $datas[$i]['uang_masuk'];
                    $uang_masuk_gl += $datas[$i]['uang_masuk_gl'];
                    $harga_tanah += $datas[$i]['harga_tanah'];
                    $harga_bangunan += $datas[$i]['harga_bangunan'];
                    $total_harga_jual_nett += $datas[$i]['total_harga_jual_nett'];
                    $harga_jual_total += $datas[$i]['harga_jual_total'];
                    $harga_tanah_partner += $datas[$i]['harga_tanah_partner'];
                    $harga_bangunan_partner += $datas[$i]['harga_bangunan_partner'];
                    $total_partner += $datas[$i]['total_partner'];
                    $total_dikurang_partner += $datas[$i]['total_dikurang_partner'];
                    $devcost_tanah += $datas[$i]['devcost_tanah'];
                    $total_bangunan_hpp += $datas[$i]['total_bangunan_hpp'];
                    $total_hpp += $datas[$i]['total_hpp'];
                    $margin_tanah += $datas[$i]['margin_tanah'];
                    $margin_bangunan += $datas[$i]['margin_bangunan'];
                    $total_margin += $datas[$i]['total_margin'];
                    $land_size += $datas[$i]['land_size'];
                    $building_size += $datas[$i]['building_size'];
                    // }

                    $lastRowJangka = $datas[$i]['jangka'];
                    $lastRowKuartal = $datas[$i]['kuartal'];

                }


                array_push($final, array(
                    'total_kuartal' => "Total Kuartal " . $lastRowKuartal, 
                    "","","",
                    'land_size' => $land_size,
                    'building_size' => $building_size,
                    "",
                    'uang_masuk' => $uang_masuk,
                    'uang_masuk_gl' => $uang_masuk_gl,
                    'harga_tanah' => $harga_tanah,
                    'harga_bangunan' => $harga_bangunan,
                    'total_harga_jual_nett' => $total_harga_jual_nett,
                    'harga_jual_total' => $harga_jual_total,
                    'harga_tanah_partner' => $harga_tanah_partner,
                    'harga_bangunan_partner' => $harga_bangunan_partner,
                    'total_partner' => $total_partner,
                    'total_dikurang_partner' => $total_dikurang_partner,
                    "","","","","",
                    'devcost_tanah' =>  ( empty($devcost_tanah) == FALSE ? $devcost_tanah : 0 ),
                    'total_bangunan_hpp' => ( empty($total_bangunan_hpp) == FALSE ? $total_bangunan_hpp : 0 ),
                    'total_hpp' => ( empty($total_hpp) == FALSE ? $total_hpp : 0 ),
                    'margin_tanah' => $margin_tanah,
                    'margin_bangunan' => $margin_bangunan,
                    'total_margin' => $total_margin,
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+1).":D".($startrow+1)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+1).":D".($startrow+1))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+1).":AB".($startrow+1))->applyFromArray($bordertopbottom);

                array_push($final, array(
                    'total_kuartal' => "Total " . $lastRowJangka, 
                    "","","",
                    'land_size_total' => $land_size_total,
                    'building_size_total' => $building_size_total,
                    "",
                    'uang_masuk_total' => $uang_masuk_total,
                    'uang_masuk_gl_total' => $uang_masuk_gl_total,
                    'harga_tanah_total' => $harga_tanah_total,
                    'harga_bangunan_total' => $harga_bangunan_total,
                    'total_harga_jual_nett_total' => $total_harga_jual_nett_total,
                    'harga_jual_total_total' => $harga_jual_total_total,
                    'harga_tanah_partner_total' => $harga_tanah_partner_total,
                    'harga_bangunan_partner_total' => $harga_bangunan_partner_total,
                    'total_partner_total' => $total_partner_total,
                    'total_dikurang_partner_total' => $total_dikurang_partner_total,
                    "","","","","",
                    'devcost_tanah_total' =>  ( empty($devcost_tanah_total) == FALSE ? $devcost_tanah_total : 0 ),
                    'total_bangunan_hpp_total' => ( empty($total_bangunan_hpp_total) == FALSE ? $total_bangunan_hpp_total : 0 ),
                    'total_hpp_total' => ( empty($total_hpp_total) == FALSE ? $total_hpp_total : 0 ),
                    'margin_tanah_total' => $margin_tanah_total,
                    'margin_bangunan_total' => $margin_bangunan_total,
                    'total_margin_total' => $total_margin_total,
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+2).":D".($startrow+2)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+2).":D".($startrow+2))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+2).":AB".($startrow+2))->applyFromArray($bordertopbottom);

                array_push($final, array(
                    'total_kuartal' => "Total Kuartal Keseluruhan", 
                    "","","",
                    'land_size_total' => $land_size_total_kuartal,
                    'building_size_total' => $building_size_total_kuartal,
                    "",
                    'uang_masuk_total' => $uang_masuk_total_kuartal,
                    'uang_masuk_gl_total' => $uang_masuk_gl_total_kuartal,
                    'harga_tanah_total' => $harga_tanah_total_kuartal,
                    'harga_bangunan_total' => $harga_bangunan_total_kuartal,
                    'total_harga_jual_nett_total' => $total_harga_jual_nett_total_kuartal,
                    'harga_jual_total_total' => $harga_jual_total_total_kuartal,
                    'harga_tanah_partner_total' => $harga_tanah_partner_total_kuartal,
                    'harga_bangunan_partner_total' => $harga_bangunan_partner_total_kuartal,
                    'total_partner_total' => $total_partner_total_kuartal,
                    'total_dikurang_partner_total' => $total_dikurang_partner_total_kuartal,
                    "","","","","",
                    'devcost_tanah_total' =>  ( empty($devcost_tanah_total_kuartal) == FALSE ? $devcost_tanah_total_kuartal : 0 ),
                    'total_bangunan_hpp_total' => ( empty($total_bangunan_hpp_total_kuartal) == FALSE ? $total_bangunan_hpp_total_kuartal : 0 ),
                    'total_hpp_total' => ( empty($total_hpp_total_kuartal) == FALSE ? $total_hpp_total_kuartal : 0 ),
                    'margin_tanah_total' => $margin_tanah_total_kuartal,
                    'margin_bangunan_total' => $margin_bangunan_total_kuartal,
                    'total_margin_total' => $total_margin_total_kuartal,
                ));
                $doc->getActiveSheet()->mergeCells("A".($startrow+3).":D".($startrow+3)); 
                $doc->getActiveSheet()->getStyle("A".($startrow+3).":D".($startrow+3))->applyFromArray($aligncenter);
                $doc->getActiveSheet()->getStyle("A".($startrow+3).":AB".($startrow+3))->applyFromArray($bordertopbottom);


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
                $doc->getActiveSheet()->getColumnDimension('A')->setWidth(5);
                $doc->getActiveSheet()->getColumnDimension('AA')->setWidth(20);
                $doc->getActiveSheet()->getColumnDimension('AB')->setWidth(20);

                $rowstotal = $doc->getActiveSheet()->getHighestRow();
                $doc->getActiveSheet()->getStyle('H8:Q'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
                $doc->getActiveSheet()->getStyle('W8:AB'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
            }


            if($isReady == TRUE){
                $ptname = $this->_ptname;
                $filename = "Report_SalesBackLogDetailV2_Project_".$ptname.".xls";
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
    }
