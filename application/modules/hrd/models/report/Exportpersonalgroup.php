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
class Hrd_Models_Report_Exportpersonalgroup extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_employee_report_group';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata() {
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP();
        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
      
    }
    

    function exceldata() {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata();
        
    
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
        $objSheet->setTitle('export data employee');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:AZ1')->getFont()->setBold(true)->setSize(12);

        // write header
        
        $objSheet->getCell('A1')->setValue('Subholding');
        $objSheet->getCell('B1')->setValue('Subholding Sub');
        $objSheet->getCell('C1')->setValue('Proyek');    
        $objSheet->getCell('D1')->setValue('Pt');
        $objSheet->getCell('E1')->setValue('NIK Karyawan');
        $objSheet->getCell('F1')->setValue('NIK Grup Karyawan');
        $objSheet->getCell('G1')->setValue('Nama Karyawan');
        $objSheet->getCell('H1')->setValue('Jenis Kelamin');
        $objSheet->getCell('I1')->setValue('Tempat Lahir');
        $objSheet->getCell('J1')->setValue('Tanggal Lahir');
        $objSheet->getCell('K1')->setValue('Golongan Darah');
        $objSheet->getCell('L1')->setValue('Agama');
        $objSheet->getCell('M1')->setValue('Status');
        $objSheet->getCell('N1')->setValue('Tanggal Menikah');
        $objSheet->getCell('O1')->setValue('Jumlah Anak');
        $objSheet->getCell('P1')->setValue('Pendidikan Terakhir');
        $objSheet->getCell('Q1')->setValue('Nomor KTP');
        $objSheet->getCell('R1')->setValue('Nomor NPWP');
        $objSheet->getCell('S1')->setValue('Nomor Passport');
        $objSheet->getCell('T1')->setValue('Alamat Saat ini Tinggal');
        $objSheet->getCell('U1')->setValue('Alamat Sesuai KTP');
        $objSheet->getCell('V1')->setValue('Kode POS');
        $objSheet->getCell('W1')->setValue('Status (Active/Non Active)');
        $objSheet->getCell('X1')->setValue('Status Karyawan');
        $objSheet->getCell('Y1')->setValue('Hire Date');
        $objSheet->getCell('Z1')->setValue('Tanggal Pengangkatan');
        $objSheet->getCell('AA1')->setValue('Kontrak ke');
        $objSheet->getCell('AB1')->setValue('Tanggal Mulai Kontrak');
        $objSheet->getCell('AC1')->setValue('Tanggal Berakhir Kontrak');
        $objSheet->getCell('AD1')->setValue('Temporary ke');
        $objSheet->getCell('AE1')->setValue('Tanggal Mulai Temporary');
        $objSheet->getCell('AF1')->setValue('Tanggal Berakhir Temporary');
        $objSheet->getCell('AG1')->setValue('Fingerprint Code');
        $objSheet->getCell('AH1')->setValue('NIK HOD');
        $objSheet->getCell('AI1')->setValue('Nama HOD');
        $objSheet->getCell('AJ1')->setValue('Departemen');
        $objSheet->getCell('AK1')->setValue('Section');
        $objSheet->getCell('AL1')->setValue('Job Family');
        //$objSheet->getCell('AL1')->setValue('Job Function');
        $objSheet->getCell('AM1')->setValue('Banding');
        $objSheet->getCell('AN1')->setValue('Business Unit');
        $objSheet->getCell('AO1')->setValue('Golongan');
        $objSheet->getCell('AP1')->setValue('Jabatan');
        $objSheet->getCell('AQ1')->setValue('Paket Dokumen');
        $objSheet->getCell('AR1')->setValue('Email Kantor');
        $objSheet->getCell('AS1')->setValue('Email Pribadi');
        $objSheet->getCell('AT1')->setValue('Bank Rekening');
        $objSheet->getCell('AU1')->setValue('Nomor Rekening');
        $objSheet->getCell('AV1')->setValue('Nama Rekening');
        //$objSheet->getCell('AW1')->setValue('Klaim Frame Tahun Akhir');
        //$objSheet->getCell('AX1')->setValue('Klaim Frame Saldo Akhir');
        $objSheet->getCell('AW1')->setValue('Alokasi Biaya ke 1');
        $objSheet->getCell('AX1')->setValue('Alokasi Biaya ke 2');
        $objSheet->getCell('AY1')->setValue('Alokasi Biaya ke 3');
        $objSheet->getCell('AZ1')->setValue('Work Days');
       
       

        $i = 1;
        foreach ($result as $row) {
            $i++;
            $objSheet->getCell('A' . $i)->setValue($row['subholding']);
            $objSheet->getCell('B' . $i)->setValue($row['subholding_subname']);
            $objSheet->getCell('C' . $i)->setValue($row['projectname']);           
            $objSheet->getCell('D' . $i)->setValue($row['ptname']);
            $objSheet->getCell('E' . $i)->setValue("'".strval($row['employee_nik'])."'");
            $objSheet->getCell('F' . $i)->setValue("'".strval($row['nik_group'])."'");
            $objSheet->getCell('G' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('H' . $i)->setValue($row['gender']);
            $objSheet->getCell('I' . $i)->setValue($row['birth_place']);
            $objSheet->getCell('J' . $i)->setValue($row['birth_date']);
            $objSheet->getCell('K' . $i)->setValue($row['bloodgroup']);
            $objSheet->getCell('L' . $i)->setValue($row['religion']);
            $objSheet->getCell('M' . $i)->setValue($row['marriagestatus']);
            $objSheet->getCell('N' . $i)->setValue($row['marriage_date']);
            $objSheet->getCell('O' . $i)->setValue($row['child_count']);
            $objSheet->getCell('P' . $i)->setValue($row['education']);
            $objSheet->getCell('Q' . $i)->setValue("'".$row['ktp_number']."'");
            $objSheet->getCell('R' . $i)->setValue("'".$row['npwp']."'");
            $objSheet->getCell('S' . $i)->setValue("'".$row['passport_number']."'");
            $objSheet->getCell('T' . $i)->setValue($row['address']);
            $objSheet->getCell('U' . $i)->setValue($row['ktp_address']);
            $objSheet->getCell('V' . $i)->setValue($row['zipcode']);
            $objSheet->getCell('W' . $i)->setValue($row['statusemployee']);         
            $objSheet->getCell('X' . $i)->setValue($row['employeestatus']); 
            $objSheet->getCell('Y' . $i)->setValue($row['hire_date']);
            $objSheet->getCell('Z' . $i)->setValue($row['assignation_date']);
            $objSheet->getCell('AA' . $i)->setValue($row['contract_ke']);
            $objSheet->getCell('AB' . $i)->setValue($row['contract_start']);
            $objSheet->getCell('AC' . $i)->setValue($row['contract_end']);
            $objSheet->getCell('AD' . $i)->setValue($row['temporary_ke']);
            $objSheet->getCell('AE' . $i)->setValue($row['temporary_start']);
            $objSheet->getCell('AF' . $i)->setValue($row['temporary_end']);
            $objSheet->getCell('AG' . $i)->setValue("'".$row['fingerprintcode']."'");
            $objSheet->getCell('AH' . $i)->setValue("'".$row['hod_nik']."'");
            $objSheet->getCell('AI' . $i)->setValue($row['hod_name']);
            $objSheet->getCell('AJ' . $i)->setValue($row['department']);
            $objSheet->getCell('AK' . $i)->setValue($row['section']);
            $objSheet->getCell('AL' . $i)->setValue($row['jobfamily']);
            //$objSheet->getCell('AL' . $i)->setValue($row['jobfunction']);
            $objSheet->getCell('AM' . $i)->setValue($row['banding']);
            $objSheet->getCell('AN' . $i)->setValue($row['divisi']);
            $objSheet->getCell('AO' . $i)->setValue($row['groupcode']);
            $objSheet->getCell('AP' . $i)->setValue($row['positiondesc']);
            $objSheet->getCell('AQ' . $i)->setValue($row['package_name']);
            $objSheet->getCell('AR' . $i)->setValue($row['email_ciputra']);
            $objSheet->getCell('AS' . $i)->setValue($row['email']);
            $objSheet->getCell('AT' . $i)->setValue($row['bank_rekening']);
            $objSheet->getCell('AU' . $i)->setValue("'".$row['nomor_rekening']."'");
            $objSheet->getCell('AV' . $i)->setValue($row['nama_rekening']);
            //$objSheet->getCell('AW' . $i)->setValue($row['klaim_frame_tahun_akhir']);
            //$objSheet->getCell('AX' . $i)->setValue($row['klaim_frame_saldo_akhir']);           
            $objSheet->getCell('AW' . $i)->setValue($row['alokasibiaya1']);           
            $objSheet->getCell('AX' . $i)->setValue($row['alokasibiaya2']);           
            $objSheet->getCell('AY' . $i)->setValue($row['alokasibiaya3']);           
            $objSheet->getCell('AZ' . $i)->setValue($row['hari_kerja_perminggu']);            
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:AZ' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AZ' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AZ1')->getBorders()->
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
        $objSheet->getColumnDimension('V')->setAutoSize(true);
        $objSheet->getColumnDimension('W')->setAutoSize(true);
        $objSheet->getColumnDimension('X')->setAutoSize(true);
        $objSheet->getColumnDimension('Y')->setAutoSize(true);
        $objSheet->getColumnDimension('Z')->setAutoSize(true);
        $objSheet->getColumnDimension('AA')->setAutoSize(true);
        $objSheet->getColumnDimension('AB')->setAutoSize(true);
        $objSheet->getColumnDimension('AC')->setAutoSize(true);
        $objSheet->getColumnDimension('AD')->setAutoSize(true);
        $objSheet->getColumnDimension('AE')->setAutoSize(true);
        $objSheet->getColumnDimension('AF')->setAutoSize(true);
        $objSheet->getColumnDimension('AG')->setAutoSize(true);
        $objSheet->getColumnDimension('AH')->setAutoSize(true);
        $objSheet->getColumnDimension('AI')->setAutoSize(true);
        $objSheet->getColumnDimension('AJ')->setAutoSize(true);
        $objSheet->getColumnDimension('AK')->setAutoSize(true);
        $objSheet->getColumnDimension('AL')->setAutoSize(true);
        $objSheet->getColumnDimension('AM')->setAutoSize(true);
        $objSheet->getColumnDimension('AN')->setAutoSize(true);
        $objSheet->getColumnDimension('AO')->setAutoSize(true);
        $objSheet->getColumnDimension('AP')->setAutoSize(true);
        $objSheet->getColumnDimension('AQ')->setAutoSize(true);
        $objSheet->getColumnDimension('AR')->setAutoSize(true);
        $objSheet->getColumnDimension('AS')->setAutoSize(true);
        $objSheet->getColumnDimension('AT')->setAutoSize(true);
        $objSheet->getColumnDimension('AU')->setAutoSize(true);
        $objSheet->getColumnDimension('AV')->setAutoSize(true);
        $objSheet->getColumnDimension('AW')->setAutoSize(true);
        $objSheet->getColumnDimension('AX')->setAutoSize(true);
        $objSheet->getColumnDimension('AY')->setAutoSize(true);
        $objSheet->getColumnDimension('AZ')->setAutoSize(true);
        //$objSheet->getColumnDimension('AZ')->setAutoSize(true);
        //$objSheet->getColumnDimension('BA')->setAutoSize(true);


        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportdataemployeegroup';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
