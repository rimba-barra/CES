<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel.php';

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_Models_Kartupiutangacc extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->_session->getCurrentProjectId();
        $this->_pt_id = $this->_session->getCurrentPtId();
        $this->_user_id = $this->_session->getUserId();
        $this->setting = new Cashier_Models_General_Setdata;
        $this->setting->_storeprocedure = 'sp_kartupiutangacc_read';
        $this->_phpExcel  = new PHPExcel();
    }

    function actionRead($param) {
        $return['success'] = false;
        print_r($param); exit;
    }

    function read($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $projectpt = $this->setting->setDefaultProjectPt($param);
                // $param['project_id'] = $projectpt['project_id'];
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'read';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'datagl':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'kartupiutang':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'search':
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[1][0]['RECORD_TOTAL'];
                        if (!empty($result[1][0]['RECORD_TOTAL'])) {
                            $data = $result[2];
                        } else {
                            $data = null;
                        }
                        $message = null;
                        $valid = true;
                        break;
                    case 'hitungppn':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                    case 'hitungpph':
                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
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

    public function create($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'create'; 
                switch ($this->setting->_param['hideparam']) {
                    case 'kartupiutang':

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        $result = $this->setting->executeSP(); 
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    
                    case 'printv2': 

                        $this->setting->_project_id = $param['project_id'];
                        $this->setting->_pt_id = $param['pt_id'];

                        $result = $this->exportData($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";

                        break;
                    case 'generateppn':
                        $result = $this->setting->executeSP();
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        break;
                    case 'generatepph':
                        $result = $this->setting->executeSP();
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        break;
                    case 'exportdata':
                        $result = $this->generate_csv($param);
                        $counter = 0;
                        $valid = true;
                        $message = "";
                        break;
                    case 'fetchdata':
                        $result = $this->execSP3('cashier.dbo.sp_kartupiutangacc_fetchdata', array($param['project_id'], $param['pt_id']));
                        // echo json_encode($result);die;
                        $valid = $result[1][0]['success'];
                        $counter = $result[0][0]['TOTAL_RECORD'];
                        $message = $result[2][0]['msg'];
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

    public function kartupiutangUpdate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                $this->setting->_paramsql = 'update';
                switch ($this->setting->_param['hideparam']) {
                    case 'default':
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'kartupiutang':   
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
                        break;
                    case 'kartupiutang_checklist':   
                        $result = $this->setting->executeSP();
                        $valid = $result[1][0]['VALIDDATA'];
                        $counter = $result[2][0]['RECORD_TOTAL'];
                        $message = $result[3][0]['MSG'];
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

    function kartupiutangDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kartupiutang_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {

                $this->setting->_iddata = rtrim($param[$key_name], ',');
                $this->setting->_paramsql = 'delete';
                $this->setting->_param['hideparam'] = $param['hideparam'];
                $result = $this->setting->executeSP();
                $valid = true;
                $counter = count(explode(',', $this->setting->_iddata));
                $message = "ok";

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

        $this->_schema = "cashier.dbo";
        $getheader = $this->execSP3('sp_kartupiutangacc_reportv2', array('headerreport', $param['project_id'], $param['pt_id'], $param['subgl_id']));
        $header = $getheader[0][0];

        $arrSetup = array(
            array('sheetname' => 'KartuPiutangTanpa_SJ_PPN_PPH_A', 'reporttype' => 'kptanpasja', 'title' => 'KARTU PIUTANG TANPA SALES JURNAL, PPN DAN PPH (FORMAT A)'),
            array('sheetname' => 'KartuPiutangTanpa_SJ_PPN_PPH_B', 'reporttype' => 'kptanpasjb', 'title' => 'KARTU PIUTANG TANPA SALES JURNAL, PPN DAN PPH (FORMAT B)'),
            array('sheetname' => 'KartuPiutangKhusus_SJ', 'reporttype' => 'kpkhusussj', 'title' => 'KARTU PIUTANG KHUSUS SALES JURNAL / SJ'),
            array('sheetname' => 'KartuPiutangKhusus_PJ', 'reporttype' => 'kpkhususpj', 'title' => 'KARTU PIUTANG KHUSUS PAJAK JURNAL / PPN'),
            array('sheetname' => 'KartuPiutangKhusus_PPHPartner', 'reporttype' => 'kpkhususpphpartner', 'title' => 'KARTU PIUTANG KHUSUS PPH PARTNER'),
            array('sheetname' => 'KartuPiutangKhusus_PPHOwner', 'reporttype' => 'kpkhususpphowner', 'title' => 'KARTU PIUTANG KHUSUS PPH OWNER')
        );

        $sheetname = '';
        $sql = "sp_kartupiutangacc_reportv2";
        $col = array('voucher_date', 'voucher_no','description','amount_debet', 'amount_credit', 'saldo');
        $titles = array('TGL.', 'NOMOR BUKTI','KETERANGAN','DEBET', 'KREDIT', 'SALDO');

        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'size' => 14
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            )
        ); 

        $headerArraystyle = array(
            'font' => array(
                'bold' => true,
                'size' => 11
            )
        ); 

        $titleDetailArraystyle = array(
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

        $bodyDetailArraystyle = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                )
            ),
            'alignment' => array(
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ),    
        ); 

        $i = 1;
        $sheet = 0; 
        foreach($arrSetup as $setup) {

            $additional['header'] = array(
                array($setup['title'], '', '', '', '', ''),
                array("NAMA : {$header['customer_name']}", "", "", "HRG TANAH PER MTR SEBELUM DISC :", "", $header['tanahpermeter']),
                array("ALAMAT SURAT : {$header['customer_address']}", "", "", "DISC HRG TANAH :", "", $header['harga_dischargatanah']),
                array("ALAMAT KTP : {$header['customer_ktp_address']}", "", "", "HRG TANAH PER MTR :", "", $header['harga_tanah']),
                array("NPWP : {$header['customer_npwp']}", "", "", "HRG NETTO :", "", $header['harga_netto']),
                array("NO. SP : {$header['purchaseletter_no']}", "", "", "BAJB :", "", $header['harga_bajb']),
                array("TGL. SP : {$header['purchase_date']}", "", "", "BBN SERT. :", "", $header['harga_bbnsertifikat']),
                array("TIPE : {$header['name']}", "", "", "BPHTB :", "", $header['harga_bphtb']),
                array("KAWASAN : {$header['cluster']}", "", "", "NILAI PPN TANAH :", "", $header['harga_ppntanah']),
                array("BLOCK : {$header['block']}", "", "", "NILAI PPN BGN :", "", $header['harga_ppnbangunan']),
                array("LUAS TANAH : {$header['land_size']} m2", "", "", "NILAI PPh22 :", "", $header['harga_pph22']),
                array("LUAS BGN : {$header['building_size']} m2", "", "", "HARGA JUAL :", "", $header['harga_jual']),
            );

            $sheetname = $setup['sheetname'];
            
            $paramdata = array(
                'bodyreport',
                $param['project_id'],
                $param['pt_id'],
                $param['subgl_id'],
                $setup['reporttype']
            );
       
            $doc = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, FALSE);            
        
            $highestRow = $doc->getActiveSheet()->getHighestRow();

            $doc->getActiveSheet()->mergeCells("A1:F1");
            $doc->getActiveSheet()->getStyle("A1:F1")->applyFromArray($titleArraystyle);
            $doc->getActiveSheet()->getStyle("A2:F12")->applyFromArray($headerArraystyle);
            $doc->getActiveSheet()->getStyle("A13:F13")->applyFromArray($titleDetailArraystyle);
            $doc->getActiveSheet()->getStyle("A14:F{$highestRow}")->applyFromArray($bodyDetailArraystyle);
            $doc->getActiveSheet()->getStyle("A14:B{$highestRow}")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                    ),  
                )
            );
            $doc->getActiveSheet()->getStyle("F2:F12")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT
                    ),  
                )
            );
            $doc->getActiveSheet()->getStyle("D14:F{$highestRow}")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT
                    ),  
                )
            );

            $download = FALSE;
            if ($i >= count($arrSetup)) {
                $download = TRUE;
            }
        
            $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $download);
            $i++;
            $sheet++;
        }   

        return $this->_tmpparam;
    }

    function genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, $isReady, $ext = "xlsx", $filename = "") {
        // create php excel object
        $doc = $this->_phpExcel;
        //auto generate excel from sql statement
        if($isReady == FALSE){
            $this->_schema = "cashier.dbo";
            
            // $param = $this->setting->Xmlparam($paramdata);
            $dataArray = $this->execSP3($sql, $paramdata);   

            $datas = $dataArray[0];
            
            if(sizeof($datas)>0){
                $arrayKeys = array_keys($datas[0]);
            }else{
                $arrayKeys = 0;
            }
            
            $tmp = array();
            $final = array();

            foreach($additional['header'] as $h) {
                array_push($final, $h);
            }

            array_push($final,  $titles); //give title
            
            foreach ($datas as $k => $d) {

                //HARUS URUT SESUAI QUERY
                foreach ($arrayKeys as $key) {
                    if(in_array(strtolower($key), $col)){
                        array_push($tmp, preg_replace('/[\x00-\x1F\x7F]/u', '', $d[$key]));
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

            if ($ext == "xlsx") {
                $doc->getActiveSheet()->getColumnDimension('A')->setWidth(10);
                $doc->getActiveSheet()->getColumnDimension('B')->setWidth(17);
                $doc->getActiveSheet()->getColumnDimension('C')->setWidth(60);
                $doc->getActiveSheet()->getColumnDimension('D')->setWidth(14);
                $doc->getActiveSheet()->getColumnDimension('E')->setWidth(14);
                $doc->getActiveSheet()->getColumnDimension('F')->setWidth(14);
            }
        }
        

        if($isReady == TRUE){

            if ($filename == "") {
                $project_name = $this->cleanString($param['project_name']);
                $cluster = $this->cleanString($param['cluster']);
                $unit = $this->cleanString($param['code']);
                $filename = "KartuPembayaran_{$project_name}_{$cluster}_{$unit}.{$ext}";
            } 

            $path = 'app/gl/uploads/'.$filename;
            $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

            //READY TO WRITE
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $filename . '"');
            header('Cache-Control: max-age=0'); //no cache
             
            if ($ext == "xlsx") {
                $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel2007');
            } else if ($ext == "csv") {
                $objWriter = PHPExcel_IOFactory::createWriter($doc, 'CSV')->setDelimiter(";");
            }

            
            $param['url'] = $path;
            //force user to download the Excel file without writing it to server's HD
            $objWriter->save($newFilePath);   
        }

        $this->_tmpparam = $param;

        return $doc;
    }

    function cleanString($input){
        return preg_replace('/[^a-zA-Z0-9.]/s', '_', $input);
    }

    function generate_csv($param) {
        $sheetname = '';
        $sql = "sp_kartupiutangacc_read";
        $col = array('project_id', 'pt_id','journal_id','journal_no', 'journal_date', 'prefix', 'description', 'journaldetail_id', 'coa_detail', 'type', 'kawasan', 'sub', 'amount', 'cashflow','customer_name','sub_description');
        $titles = array('PROJECT_ID', 'PT_ID','JOURNAL_ID','JOURNAL_NO', 'JOURNAL_DATE', 'PREFIX', 'DESCRIPTION', 'JOURNALDETAIL_ID', 'COA_DETAIL', 'TYPE', 'KAWASAN', 'SUB', 'AMOUNT', 'CASHFLOW','CUSTOMER NAME','SUB_DESCRIPTION');

        
        $sheetname = "KARTU_PIUTANG";
        $sheet = 0;
        $additional['header'] = array();
        $paramdata = $this->setting->converttoXml($param);
        
        $filename = "kartu_piutang_exportable_{$param['project_id']}{$param['pt_id']}.csv";
        $doc = $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col, $titles, FALSE, "csv", $filename);      
        $this->genReportexcel($param, $sql, $sheet, $sheetname, $additional, $paramdata, $col,  $titles, TRUE, "csv", $filename);

        return $this->_tmpparam;
    }
}
