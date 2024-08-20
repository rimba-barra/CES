<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Upload_Uploadcjp extends Zend_Db_Table_Abstract {

    private $setting = null;

    function init() {
        $this->setting = new Erems_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_upload_cjp';
        //lokasi file untuk diupload
        $this->destination = getcwd() . '/app/erems/uploads/uploadcjp/';
        $this->destination_error = getcwd() . '/app/erems/uploads/uploadcjp/errordata/';
        $this->httpdirect = 'app/erems/uploads/uploadcjp/errordata/';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        $paramdata = Zend_Json::decode($param['data']);
        if (is_array($paramdata) && count($paramdata)) {
            try {
                
                $this->setting->_param = $paramdata;
                //echo str_replace($search, $replace, $subject);
                $locationfile = str_replace("//", '/', $paramdata['filedata']);
                switch ($this->setting->_param['mode_read']) {
                    case 'default':
                        $this->setting->_paramsql = 'read';
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
                        $message = 'no action';
                }

                $return = array(
                    "success" => $valid,
                    "data" => $paramdata,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $paramdata['mode_read'],
                );
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    function createFolderError() {
        if (!file_exists($this->destination_error)) {
            mkdir($this->destination_error, 0777, true);
        }
    }

    function Createupload($files) {
        $this->createFolder();
        $name = $files['uploadfile_cjp']['name'];
        $filetype = $files['uploadfile_cjp']['type'];
        $size = $files['uploadfile_cjp']['size'];
        $file_tmp = $files['uploadfile_cjp']['tmp_name'];
        $fullpathfile = $this->destination . $name;
        if (move_uploaded_file($file_tmp, $fullpathfile)) {
            $response = $this->Generatedata($filetype, $fullpathfile);
        } else {
            $response = array('success' => false, 'msg' => "Upload failed");
        }
        return $response;
    }

    function Generatedata($filetype, $fullpathfile) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        if ($filetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            $objReader = new PHPExcel_Reader_Excel2007();
            // untuk file xlsx
        } elseif ($filetype == 'application/vnd.ms-excel') {
            $objReader = new PHPExcel_Reader_Excel5();
            // untuk file xls
        }
        $objReader->setReadDataOnly(true);
        $objPHPExcel = $objReader->load($fullpathfile);
        $rowIterator = $objPHPExcel->getActiveSheet()->getRowIterator();
        $array_data = array();
        $array_blankdata = array();
        $array_notvalid = array();
        $counter_blankdata = 0;
        $counter_notvalid = 0;

        foreach ($rowIterator as $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false); // Loop all cells, even if it is not set
            //skip first 1'st row
            if ($row->getRowIndex() <= 1)
                continue;
            $rowIndex = $row->getRowIndex();
            $array_data[$rowIndex] = array('A' => '',
                'B' => '', 'C' => '', 'D' => '', 'E' => '', 'F' => '',
                'G' => '', 'H' => '', 'I' => '', 'J' => '', 'K' => '',
                'L' => '', 'M' => '', 'N' => '', 'O' => '', 'P' => '',
                'Q' => '', 'R' => '', 'S' => '',
            );
            // loop on current row
            foreach ($cellIterator as $cell) {
                if ($cell->getColumn() == 'A') { //sertifikat_polis_no
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'B') { //nama_nasabah
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'C') {//jenis_kelamin
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'D') {//tempat_lahir
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'E') { //tanggal_lahir   
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'F') {//usia
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'G') {//spt_no
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'H') {//project_id_document
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'I') {//nama_project
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'J') {//uang_pertanggungan
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'K') {//premi_standard
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'L') {//premi_extra
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'M') {//premi_total
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'N') {//masa_pertanggungan_bulan
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'O') {//masa_pertanggungan_tahun
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'P') {//tanggal_mulai_pertanggungan
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'Q') {//tanggal_akhir_pertanggungan
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'R') {//status_aplikasi
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                } else if ($cell->getColumn() == 'S') {//nama_sales
                    $array_data[$rowIndex][$cell->getColumn()] = $cell->getValue();
                }
            }
            $sertifikat_polis_no = trim($array_data[$rowIndex]['A']);
            $nama_nasabah = trim($array_data[$rowIndex]['B']);
            $gender = trim($array_data[$rowIndex]['C']);
            $tempat_lahir = trim($array_data[$rowIndex]['D']);
            if (!empty($array_data[$rowIndex]['E'])) {
                $tgl_lahir = date('Y-m-d', strtotime($array_data[$rowIndex]['E']));
            } else {
                $tgl_lahir = '';
            }
            $usia = trim($array_data[$rowIndex]['F']);
            $spt_no = trim($array_data[$rowIndex]['G']);
            $project_id_customer = trim($array_data[$rowIndex]['H']);
            $nama_project = trim($array_data[$rowIndex]['I']);
            $uang_pertanggungan = trim($array_data[$rowIndex]['J']);
            $premi_standard = trim($array_data[$rowIndex]['K']);
            $premi_extra = trim($array_data[$rowIndex]['L']);
            $premi_total = trim($array_data[$rowIndex]['M']);
            $masa_pertanggungan_bulan = trim($array_data[$rowIndex]['N']);
            $masa_pertanggungan_tahun = trim($array_data[$rowIndex]['O']);
            if (!empty($array_data[$rowIndex]['P'])) {
                $tanggal_mulai_pertanggungan = date('Y-m-d', strtotime($array_data[$rowIndex]['P']));
            } else {
                $tanggal_mulai_pertanggungan = '';
            }
            if (!empty($array_data[$rowIndex]['Q'])) {
                $tanggal_akhir_pertanggungan = date('Y-m-d', strtotime($array_data[$rowIndex]['Q']));
            } else {
                $tanggal_akhir_pertanggungan = '';
            }
            $status_aplikasi = trim($array_data[$rowIndex]['R']);
            $nama_sales = trim($array_data[$rowIndex]['S']);
            $record = array(
                "project_id" => $this->setting->_project_id,
                "pt_id" => $this->setting->_pt_id,
                "path_upload" => $fullpathfile,
                "filetype" => $filetype,
                "sertifikat_polis_no" => $sertifikat_polis_no,
                "nama_nasabah" => $nama_nasabah,
                "jenis_kelamin" => $gender,
                "tempat_lahir" => $tempat_lahir,
                "tanggal_lahir" => $tgl_lahir,
                "usia" => $usia,
                "spt_no" => $spt_no,
                "project_id_document" => $project_id_customer,
                "nama_project" => $nama_project,
                "uang_pertanggungan" => $uang_pertanggungan,
                "premi_standard" => $premi_standard,
                "premi_extra" => $premi_extra,
                "premi_total" => $premi_total,
                "masa_pertanggungan_bulan" => $masa_pertanggungan_bulan,
                "masa_pertanggungan_tahun" => $masa_pertanggungan_tahun,
                "tanggal_mulai_pertanggungan" => $tanggal_mulai_pertanggungan,
                "tanggal_akhir_pertanggungan" => $tanggal_akhir_pertanggungan,
                "status_aplikasi" => $status_aplikasi,
                "nama_sales" => $nama_sales,
                "addby" => $this->setting->_user_id,
                "addon" => $this->setting->_curdatetime
            );


            if (!empty($nama_nasabah) && !empty($gender)) {
                $resultpurchase = $this->getPurchasedata($project_id_customer, $spt_no);
                if (empty($resultpurchase[0])) {
                    $counter_notvalid++;
                    $array_notvalid[] = $record;
                } else {
                    $record['purchaseletter_id'] = $resultpurchase[0][0]['purchaseletter_id'];
                    $this->setting->_param = $record;
                    $this->setting->_paramsql = 'create';
                    $this->setting->executeSP();
                }
            }
        }
        
        if ($counter_notvalid > 0) {
            $this->createFolderError();
             $returnexcel = $this->create_exceldata_notvalid($filetype, $fullpathfile, $array_notvalid);
             $msguploaderror ='Data Upload Not Valid, We send excel file for you...';
             $filedata = $returnexcel['filedata'];
             $directdata = $returnexcel['directdata'];
        }else{
            $returnexcel ='';
            $msguploaderror ='';
            $filedata = '';
            $directdata ='';
        }
        return array(
            'success' => true,
            'msg' => "Upload data, finish",
            'msguploaderror' => $msguploaderror,
            'counternotvalid' => $counter_notvalid,
            'filedata' => $filedata,
            'directdata' => $directdata,
        );
    }

    public function getPurchasedata($project_id, $spt_no) {
        $param = array(
            "project_id_document" => $project_id,
            "spt_no" => $spt_no,
        );
        $this->setting->_param = $param;
        $this->setting->_paramsql = 'cekpurchase';
        $result = $this->setting->executeSP();
        return $result;
    }

    function create_exceldata_notvalid($filetype, $fullpathfile, $paramdata) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';

        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setTitle("title")
                ->setDescription("description");

        // emaildata format, &euro; with < 0 being in red color
        $emaildataFormat = '#,#0.## \€;[Red]-#,#0.## \€';
        // number format, with thousands seperator and two decimal points.
        $numberFormat = '#,#0.##;[Red]-#,#0.##';

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        // rename the sheet
        $objSheet->setTitle('data upload not valid report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:S1')->getFont()->setBold(true)->setSize(12);

        // write header

        $objSheet->getCell('A1')->setValue('sertifikat_polis_no');
        $objSheet->getCell('B1')->setValue('nama_nasabah');
        $objSheet->getCell('C1')->setValue('jenis_kelamin');
        $objSheet->getCell('D1')->setValue('tempat_lahir');
        $objSheet->getCell('E1')->setValue('tanggal_lahir');
        $objSheet->getCell('F1')->setValue('usia');
        $objSheet->getCell('G1')->setValue('spt_no');
        $objSheet->getCell('H1')->setValue('project_id_document');
        $objSheet->getCell('I1')->setValue('nama_project');
        $objSheet->getCell('J1')->setValue('uang_pertanggungan');
        $objSheet->getCell('K1')->setValue('premi_standard');
        $objSheet->getCell('L1')->setValue('premi_extra');
        $objSheet->getCell('M1')->setValue('premi_total');
        $objSheet->getCell('N1')->setValue('masa_pertanggungan_bulan');
        $objSheet->getCell('O1')->setValue('masa_pertanggungan_tahun');
        $objSheet->getCell('P1')->setValue('tanggal_mulai_pertanggungan');
        $objSheet->getCell('Q1')->setValue('tanggal_akhir_pertanggungan');
        $objSheet->getCell('R1')->setValue('status_aplikasi');
        $objSheet->getCell('S1')->setValue('nama_sales');

        $i = 1;
        foreach ($paramdata as $row) {
            $i++;
            $objSheet->getCell('A' . $i)->setValue($row['sertifikat_polis_no']);
            $objSheet->getCell('B' . $i)->setValue($row['nama_nasabah']);
            $objSheet->getCell('C' . $i)->setValue($row['jenis_kelamin']);
            $objSheet->getCell('D' . $i)->setValue($row['tempat_lahir']);
            $objSheet->getCell('E' . $i)->setValue($row['tanggal_lahir']);
            $objSheet->getCell('F' . $i)->setValue($row['usia']);
            $objSheet->getCell('G' . $i)->setValue($row['spt_no']);
            $objSheet->getCell('H' . $i)->setValue($row['project_id_document']);
            $objSheet->getCell('I' . $i)->setValue($row['uang_pertanggungan']);
            $objSheet->getCell('J' . $i)->setValue($row['nama_project']);
            $objSheet->getCell('K' . $i)->setValue($row['premi_standard']);
            $objSheet->getCell('L' . $i)->setValue($row['premi_extra']);
            $objSheet->getCell('M' . $i)->setValue($row['premi_total']);
            $objSheet->getCell('N' . $i)->setValue($row['masa_pertanggungan_bulan']);
            $objSheet->getCell('O' . $i)->setValue($row['masa_pertanggungan_tahun']);
            $objSheet->getCell('P' . $i)->setValue($row['tanggal_mulai_pertanggungan']);
            $objSheet->getCell('Q' . $i)->setValue($row['tanggal_akhir_pertanggungan']);
            $objSheet->getCell('R' . $i)->setValue($row['status_aplikasi']);
            $objSheet->getCell('S' . $i)->setValue($row['nama_sales']);
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:S' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:S' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:S1')->getBorders()->
                getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

        // autosize the columns
        $objSheet->getColumnDimension('A')->setAutoSize(true);
        $objSheet->getColumnDimension('B')->setAutoSize(true);
        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('D')->setAutoSize(true);
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('F')->setAutoSize(true);
        $objSheet->getColumnDimension('G')->setAutoSize(true);
        $objSheet->getColumnDimension('H')->setAutoSize(true);
        $objSheet->getColumnDimension('I')->setAutoSize(true);
        $objSheet->getColumnDimension('J')->setAutoSize(true);
        $objSheet->getColumnDimension('K')->setAutoSize(true);
        $objSheet->getColumnDimension('L')->setAutoSize(true);
        $objSheet->getColumnDimension('M')->setAutoSize(true);
        $objSheet->getColumnDimension('N')->setAutoSize(true);
        $objSheet->getColumnDimension('O')->setAutoSize(true);
        $objSheet->getColumnDimension('P')->setAutoSize(true);
        $objSheet->getColumnDimension('Q')->setAutoSize(true);
        $objSheet->getColumnDimension('R')->setAutoSize(true);
        $objSheet->getColumnDimension('S')->setAutoSize(true);
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filedata = $this->destination_error . "uploaddataerror" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $directfile = $this->httpdirect."uploaddataerror" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";            
        $objWriter->save($filedata);
        return array("filedata"=>$filedata,"directdata"=>$directfile);
    }

    
}

?>
