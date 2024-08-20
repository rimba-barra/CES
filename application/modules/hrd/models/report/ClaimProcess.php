<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 *
 * @author Ahmad Riadi
 */
class Hrd_Models_Report_ClaimProcess extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_klaim_browse_readdetail';        
        $this->destination = getcwd() . '/app/hrd/uploads/claim/';
        $this->httpdirect = 'app/hrd/uploads/claim/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($row) {
        $this->setup->_param = array(
            "project_id" => $row['project_id'],
            "pt_id" => $row['pt_id'],
            "id" => $row['klaimpengobatan_kacamata_id'],
            "jenispengobatan_id" => $row['jenispengobatan_id']
        );
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP();

        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
    }
    
    //updated by anas 3132022 - $params
    function exceldata($params) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        
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
        $objSheet->setTitle('claim process');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:Q1')->getFont()->setBold(true)->setSize(12);

        // write header
        
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Nama Karyawan');
        $objSheet->getCell('C1')->setValue('Nama Pasien');    
        $objSheet->getCell('D1')->setValue('Jenis Pengobatan');
        $objSheet->getCell('E1')->setValue('Relasi');
        $objSheet->getCell('F1')->setValue('Tanggal Kwitansi');
        $objSheet->getCell('G1')->setValue('Plafon');
        $objSheet->getCell('H1')->setValue('Sudah Terpakai');
        $objSheet->getCell('I1')->setValue('Total Kwitansi');
        $objSheet->getCell('J1')->setValue('Penggantian');
        $objSheet->getCell('K1')->setValue('Keterangan');
        $objSheet->getCell('L1')->setValue('Bank');
        $objSheet->getCell('M1')->setValue('No Rekening');
        $objSheet->getCell('N1')->setValue('Status FAMS');
        $objSheet->getCell('O1')->setValue('Process Date');
        $objSheet->getCell('P1')->setValue('Paid Date');
        $objSheet->getCell('Q1')->setValue('Voucher No');
        

        $i = 1;
        $no = 0;

        $first_i = 1;
        $last_i = 2;

        $total_kolom_j = 0;

        foreach ($params as $row) {

            if($row['claim_subject'] == 'S'){
                $claim_subject = 'Sendiri';
            }elseif($row['claim_subject'] == 'W'){
                $claim_subject = 'Istri';
            }elseif($row['claim_subject'] == 'D'){
                $claim_subject = 'Anak';
            }else{
                $claim_subject = '';
            }
        
            $i++;
            $no++;

            if($first_i == '1'){
                $first_i = $i;
            }

            //edit by michael, request by Deslie 2023-04-04| kolom SUDAH TERPAKAI, jika belum di proses sama FAMS, jangan ditambahkan dulu
            if($row['fams_process'] != 1 && empty($row['fams_process_date']) && empty($row['voucher_no']) && empty($row['uploadapi_id']))
            {
                $row['total_klaim'] -= $row['claim_value'];
            }

            if($row['fams_paid_date'] == '1970-01-01' || $row['fams_paid_date'] == '1900-01-01' || empty($row['fams_paid_date'])){
                $fams_paid_date = '';
            }else{
                $fams_paid_date = date('d M Y',strtotime($row['fams_paid_date']));
            }

            if($row['fams_process_date'] == '1970-01-01' || $row['fams_process_date'] == '1900-01-01' || empty($row['fams_process_date'])){
                $fams_process_date = '';
            }else{
                $fams_process_date = date('d M Y',strtotime($row['fams_process_date']));
            }

            $objSheet->getCell('A' . $i)->setValue($no);
            $objSheet->getCell('B' . $i)->setValue($row['employee_name']);
            //$objSheet->getCell('C' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('C' . $i)->setValue($row['nama_pasien']);            
            $objSheet->getCell('D' . $i)->setValue($row['jenispengobatan']);
            $objSheet->getCell('E' . $i)->setValue($claim_subject);
            $objSheet->getCell('F' . $i)->setValueExplicit(date('d M Y',strtotime($row['kwitansi_date'])), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('G' . $i)->setValueExplicit(number_format($row['plafon'],0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('H' . $i)->setValueExplicit(number_format($row['total_klaim'],0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
            //$objSheet->getCell('I' . $i)->setValueExplicit(number_format($row['amount_pengganti'],0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('I' . $i)->setValueExplicit(number_format($row['total'],0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('J' . $i)->setValueExplicit(number_format($row['claim_value'],0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('K' . $i)->setValue($row['description']);
            $objSheet->getCell('L' . $i)->setValue($row['bank_rekening']);
            $objSheet->getCell('M' . $i)->setValueExplicit($row['nomor_rekening'], PHPExcel_Cell_DataType::TYPE_STRING);

            $objSheet->getCell('N' . $i)->setValue($row['fams_status']);
            $objSheet->getCell('O' . $i)->setValueExplicit($fams_process_date, PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('P' . $i)->setValueExplicit($fams_paid_date, PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('Q' . $i)->setValue($row['voucher_no']);
            
            $total_kolom_j += $row['claim_value'];
        }

        if($i > '2'){
            $last_i = $i;
        }

        $i++; $i++;
        $objSheet->getCell('I' . $i)->setValue('TOTAL');
        // $objSheet->getCell('J' . $i)->setValue('=SUM(J'.$first_i.':J'.$last_i.')');
        $objSheet->getCell('J' . $i)->setValueExplicit(number_format($total_kolom_j,0,',','.'), PHPExcel_Cell_DataType::TYPE_STRING);
        $objSheet->getStyle('A'.$i.':Q'.$i)->getFont()->setBold(true)->setSize(11);
        $objSheet->getStyle('A' . $i . ':Q' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('C0C0C0');

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:Q' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:Q' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:Q1')->getBorders()->
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


        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'claimprocess_';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
