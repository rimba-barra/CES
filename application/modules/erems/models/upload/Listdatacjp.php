<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Erems_Models_Upload_Listdatacjp extends Zend_Db_Table_Abstract {
    private $setting = null;
    function init() {
        $this->setting = new Erems_Models_General_Setup;
        $this->setting->_storeprocedure = 'sp_upload_cjp';
        $this->destination = getcwd() . '/app/erems/uploads/uploadcjp/exportdata/';
        $this->httpdirect = 'app/erems/uploads/uploadcjp/exportdata/';
    }

    function RoutesAllActions($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->setting->_param = $param;
                switch ($this->setting->_param['mode_read']) {
                    case 'default':
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];
                        $message = null;
                        $valid = true;
                        break;
                     case 'exportexcel':
                        $param['page'] = 1;
                        $param['start'] = 0;
                        $param['limit'] = 99999999;
                        $this->setting->_param = $param;
                        $this->setting->_paramsql = 'read';
                        $result = $this->setting->executeSP();
                        $counter = $result[0][0]['RECORD_TOTAL'];
                        $data = $result[1];   
                        $directdata=null;
                        if($counter > 0){
                            $this->createFolder();
                            $returnexcel = $this->create_exceldata($data);
                            $filedata = $returnexcel['filedata'];
                            $directdata = $returnexcel['directdata'];
                        }
                                             
                        $message = $directdata;
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
                    "data" => $data,
                    "msg" => $message,
                    "total" => $counter,
                    "counter" => $counter,
                    "parameter" => $param['mode_read'],
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
    
    function create_exceldata($paramdata) {
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
        $objSheet->setTitle('export data ciputra life report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:U1')->getFont()->setBold(true)->setSize(12);

        // write header

        $objSheet->getCell('A1')->setValue('Nomor SPT');
        $objSheet->getCell('B1')->setValue('Purchase Date');
        $objSheet->getCell('C1')->setValue('Status Pembayaran');
        $objSheet->getCell('D1')->setValue('Nomor Polis');
        $objSheet->getCell('E1')->setValue('Kode Nasabah');
        $objSheet->getCell('F1')->setValue('Nama Nasabah');
        $objSheet->getCell('G1')->setValue('Jenis Kelamin');
        $objSheet->getCell('H1')->setValue('Tanggal Lahir');
        $objSheet->getCell('I1')->setValue('Dokument Type');
        $objSheet->getCell('J1')->setValue('Nomor Unit');
        $objSheet->getCell('K1')->setValue('Kawasan');
        $objSheet->getCell('L1')->setValue('Nama Sales');
        $objSheet->getCell('M1')->setValue('Masa Pertanggungan bulan');
        $objSheet->getCell('N1')->setValue('Masa Pertanggungan Tahun');
        $objSheet->getCell('O1')->setValue('Tanggal Mulai Pertanggungan');
        $objSheet->getCell('P1')->setValue('Tanggal Akhir Pertanggungan');
        $objSheet->getCell('Q1')->setValue('Uang Pertanggungan');
        $objSheet->getCell('R1')->setValue('Premi Standard');
        $objSheet->getCell('S1')->setValue('Premi Extra');
        $objSheet->getCell('T1')->setValue('Premi Total');
        $objSheet->getCell('U1')->setValue('Status Aplikasi');

        $i = 1;
        foreach ($paramdata as $row) {
            $i++;
            $objSheet->getCell('A' . $i)->setValue($row['spt_no']);
            $objSheet->getCell('B' . $i)->setValue(date('d-m-Y',strtotime($row['purchase_date'])));
            $objSheet->getCell('C' . $i)->setValue($row['pricetype']);
            $objSheet->getCell('D' . $i)->setValue($row['sertifikat_polis_no']);
            $objSheet->getCell('E' . $i)->setValue($row['customer_code']);
            $objSheet->getCell('F' . $i)->setValue($row['customer_name']);
            $objSheet->getCell('G' . $i)->setValue($row['jenis_kelamin']);
            $objSheet->getCell('H' . $i)->setValue(date('d-m-Y',strtotime($row['tanggal_lahir'])));
            $objSheet->getCell('I' . $i)->setValue($row['identitas_documenttype']);
            $objSheet->getCell('J' . $i)->setValue($row['unit_number']);
            $objSheet->getCell('K' . $i)->setValue($row['cluster_name']);
            $objSheet->getCell('L' . $i)->setValue($row['nama_sales']);
            $objSheet->getCell('M' . $i)->setValue($row['masa_pertanggungan_bulan']);
            $objSheet->getCell('N' . $i)->setValue($row['masa_pertanggungan_tahun']);
            $objSheet->getCell('O' . $i)->setValue(date('d-m-Y',strtotime($row['tanggal_mulai_pertanggungan'])));
            $objSheet->getCell('P' . $i)->setValue(date('d-m-Y',strtotime($row['tanggal_akhir_pertanggungan'])));
            $objSheet->getCell('Q' . $i)->setValue($row['uang_pertanggungan']);
            $objSheet->getCell('R' . $i)->setValue($row['premi_standard']);
            $objSheet->getCell('S' . $i)->setValue($row['premi_extra']);
            $objSheet->getCell('T' . $i)->setValue($row['premi_total']);
            $objSheet->getCell('U' . $i)->setValue($row['status_aplikasi']);
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:U' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:U' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:U1')->getBorders()->
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
        $objSheet->getColumnDimension('T')->setAutoSize(true);
        $objSheet->getColumnDimension('U')->setAutoSize(true);
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filedata = $this->destination . "exportdataciputralife" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";
        $directfile = $this->httpdirect."exportdataciputralife" . date('Ymd_Hi') . "_" . $this->setting->_user_id . ".xlsx";            
        $objWriter->save($filedata);
        return array("filedata"=>$filedata,"directdata"=>$directfile);
    }

}

?>
