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
class Hrd_Models_Report_Employeereport extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setting = new Hrd_Models_General_Setup();      
        $this->destination = getcwd() . '/app/hrd/uploads/report/';
        $this->httpdirect = 'app/hrd/uploads/report/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($data) {
        if($data['report_type'] == 'employee'){
            // $this->setting->_storeprocedure = 'sp_report_employee_group_raw';
            $this->setting->_storeprocedure = 'sp_report_employee_group';

            $sp_data = array(
                $data['start'],
                $data['max_data'],
                $data['user_id'],
                $data['group_id'],
                $data['asof_date'],
                $data['employee_active']
            );
            $result = $this->setting->executeSPReport($sp_data);
        }

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }

    public function countdata($data) {
        if($data['report_type'] == 'employee'){
            $this->setting->_storeprocedure = 'sp_report_employee_group_count';
            $sp_data = array(
                $data['user_id'],
                $data['group_id'],
                $data['asof_date'],
                $data['employee_active']
            );
            $result = $this->setting->executeSPReport($sp_data);
        }

        $return = array();
        if (!empty($result[0])) {
            $return = $result[0];
        }
        return $return;
      
    }

    
    function exceldata($data) {
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
        $objSheet->setTitle('export data employee');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        // $objSheet->getStyle('A1:BB1')->getFont()->setBold(true)->setSize(12);
        $objSheet->getStyle('A1:AU1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No');
        $objSheet->getCell('B1')->setValue('Subholding');
        $objSheet->getCell('C1')->setValue('Proyek');    
        $objSheet->getCell('D1')->setValue('Pt');
        $objSheet->getCell('E1')->setValue('NIK Karyawan');
        $objSheet->getCell('F1')->setValue('NIK Grup Karyawan');
        $objSheet->getCell('G1')->setValue('Nama Karyawan');
        $objSheet->getCell('H1')->setValue('Jenis Kelamin');
        $objSheet->getCell('I1')->setValue('Tempat Lahir');
        $objSheet->getCell('J1')->setValue('Tanggal Lahir');
        // $objSheet->getCell('K1')->setValue('Golongan Darah');
        $objSheet->getCell('K1')->setValue('Agama');
        $objSheet->getCell('L1')->setValue('Status');
        $objSheet->getCell('M1')->setValue('Tanggal Menikah');
        $objSheet->getCell('N1')->setValue('Jumlah Anak');
        $objSheet->getCell('O1')->setValue('Pendidikan Terakhir');
        $objSheet->getCell('P1')->setValue('Nomor KTP');
        $objSheet->getCell('Q1')->setValue('Nomor NPWP');
        $objSheet->getCell('R1')->setValue('Nomor Passport');
        $objSheet->getCell('S1')->setValue('Alamat Saat ini Tinggal');
        $objSheet->getCell('T1')->setValue('Alamat Sesuai KTP');
        $objSheet->getCell('U1')->setValue('Kode POS');
        $objSheet->getCell('V1')->setValue('Handphone');
        $objSheet->getCell('W1')->setValue('Phone');
        $objSheet->getCell('X1')->setValue('Status (Active/Non Active)');
        $objSheet->getCell('Y1')->setValue('Status Karyawan');
        $objSheet->getCell('Z1')->setValue('Hire Date');
        $objSheet->getCell('AA1')->setValue('Tanggal Pengangkatan');
        $objSheet->getCell('AB1')->setValue('Kontrak ke');
        $objSheet->getCell('AC1')->setValue('Tanggal Mulai Kontrak');
        $objSheet->getCell('AD1')->setValue('Tanggal Berakhir Kontrak');
        $objSheet->getCell('AE1')->setValue('Temporary ke');
        $objSheet->getCell('AF1')->setValue('Tanggal Mulai Temporary');
        $objSheet->getCell('AG1')->setValue('Tanggal Berakhir Temporary');
        $objSheet->getCell('AH1')->setValue('Tanggal Nonactive');
        $objSheet->getCell('AI1')->setValue('Alasan Resign');
        $objSheet->getCell('AJ1')->setValue('Fingerprint Code');
        // $objSheet->getCell('AK1')->setValue('NIK HOD');
        // $objSheet->getCell('AL1')->setValue('Nama HOD');
        $objSheet->getCell('AK1')->setValue('Departemen');
        $objSheet->getCell('AL1')->setValue('Job Family');
        $objSheet->getCell('AM1')->setValue('Banding');
        // $objSheet->getCell('AP1')->setValue('Business Unit');
        $objSheet->getCell('AN1')->setValue('Golongan');
        $objSheet->getCell('AO1')->setValue('Jabatan');
        // $objSheet->getCell('AS1')->setValue('Paket Dokumen');
        $objSheet->getCell('AP1')->setValue('Email Kantor');
        $objSheet->getCell('AQ1')->setValue('Email Pribadi');
        $objSheet->getCell('AR1')->setValue('Bank Rekening');
        $objSheet->getCell('AS1')->setValue('Nomor Rekening');
        $objSheet->getCell('AT1')->setValue('Nama Rekening');
        // $objSheet->getCell('AY1')->setValue('Alokasi Biaya ke 1');
        // $objSheet->getCell('AZ1')->setValue('Alokasi Biaya ke 2');
        // $objSheet->getCell('BA1')->setValue('Alokasi Biaya ke 3');
        $objSheet->getCell('AU1')->setValue('Work Days');
       
       
        //HITUNG TOTAL DATA DULU
        $count_result = $this->countdata($data);

        //JIKA LEBIH DARI 1000 DATA
        $data['max_data'] = 1000;
        if($count_result > $data['max_data']){
            $max_count = ceil($count_result[0]['total_employee']/$data['max_data']);
        }else{
            $max_count = 1;
        }

        //AMBIL DATA PER-1000 DATA, BIAR GAK BERAT
        $start_temp = 0;
        $i = 1;
        $start_excel = 2;

        for ($start=1; $start <= $max_count ; $start++) { 

            // sleep(1);

            $start_temp = $start;
            $data['start'] = $start_temp;
            $result = $this->getdata($data);
            $arrayData = '';

            foreach ($result as $key => $row) {
                $i++;

                if($key == 0){
                    $start_excel = $i;
                }
                // $objSheet->getCell('A' . $i)->setValue($row['RowNum']);
                // $objSheet->getCell('B' . $i)->setValue($row['subholding']);
                // $objSheet->getCell('C' . $i)->setValue($row['projectname']);           
                // $objSheet->getCell('D' . $i)->setValue($row['ptname']);
                // $objSheet->getCell('E' . $i)->setValue("'".strval($row['employee_nik'])."'");
                // $objSheet->getCell('F' . $i)->setValue("'".strval($row['nik_group'])."'");
                // $objSheet->getCell('G' . $i)->setValue($row['employee_name']);
                // $objSheet->getCell('H' . $i)->setValue($row['gender']);
                // $objSheet->getCell('I' . $i)->setValue($row['birth_place']);
                // $objSheet->getCell('J' . $i)->setValue($row['birth_date']);
                // $objSheet->getCell('K' . $i)->setValue($row['bloodgroup']);
                // $objSheet->getCell('L' . $i)->setValue($row['religion']);
                // $objSheet->getCell('M' . $i)->setValue($row['marriagestatus']);
                // $objSheet->getCell('N' . $i)->setValue($row['marriage_date']);
                // $objSheet->getCell('O' . $i)->setValue($row['child_count']);
                // $objSheet->getCell('P' . $i)->setValue($row['education']);
                // $objSheet->getCell('Q' . $i)->setValue("'".$row['ktp_number']."'");
                // $objSheet->getCell('R' . $i)->setValue("'".$row['npwp']."'");
                // $objSheet->getCell('S' . $i)->setValue("'".$row['passport_number']."'");
                // $objSheet->getCell('T' . $i)->setValue($row['address']);
                // $objSheet->getCell('U' . $i)->setValue($row['ktp_address']);
                // $objSheet->getCell('V' . $i)->setValue($row['zipcode']);
                // $objSheet->getCell('W' . $i)->setValueExplicit($row['hp_number'], PHPExcel_Cell_DataType::TYPE_STRING);
                // $objSheet->getCell('X' . $i)->setValueExplicit($row['phone_number'], PHPExcel_Cell_DataType::TYPE_STRING);
                // $objSheet->getCell('Y' . $i)->setValue($row['statusemployee']);         
                // $objSheet->getCell('Z' . $i)->setValue($row['employeestatus']); 
                // $objSheet->getCell('AA' . $i)->setValue($row['hire_date']);
                // $objSheet->getCell('AB' . $i)->setValue($row['assignation_date']);
                // $objSheet->getCell('AC' . $i)->setValue($row['contract_ke']);
                // $objSheet->getCell('AD' . $i)->setValue($row['contract_start']);
                // $objSheet->getCell('AE' . $i)->setValue($row['contract_end']);
                // $objSheet->getCell('AF' . $i)->setValue($row['temporary_ke']);
                // $objSheet->getCell('AG' . $i)->setValue($row['temporary_start']);
                // $objSheet->getCell('AH' . $i)->setValue($row['temporary_end']);
                // $objSheet->getCell('AI' . $i)->setValue($row['nonactive_date']);
                // $objSheet->getCell('AJ' . $i)->setValue("'".$row['fingerprintcode']."'");
                // $objSheet->getCell('AK' . $i)->setValue("'".$row['hod_nik']."'");
                // $objSheet->getCell('AL' . $i)->setValue($row['hod_name']);
                // $objSheet->getCell('AM' . $i)->setValue($row['department']);
                // $objSheet->getCell('AN' . $i)->setValue($row['jobfamily']);
                // $objSheet->getCell('AO' . $i)->setValue($row['banding']);
                // $objSheet->getCell('AP' . $i)->setValue($row['divisi']);
                // $objSheet->getCell('AQ' . $i)->setValue($row['groupcode']);
                // $objSheet->getCell('AR' . $i)->setValue($row['positiondesc']);
                // $objSheet->getCell('AS' . $i)->setValue($row['package_name']);
                // $objSheet->getCell('AT' . $i)->setValue($row['email_ciputra']);
                // $objSheet->getCell('AU' . $i)->setValue($row['email']);
                // $objSheet->getCell('AV' . $i)->setValue($row['bank_rekening']);
                // $objSheet->getCell('AW' . $i)->setValue("'".$row['nomor_rekening']."'");
                // $objSheet->getCell('AX' . $i)->setValue($row['nama_rekening']);         
                // $objSheet->getCell('AY' . $i)->setValue($row['alokasibiaya1']);           
                // $objSheet->getCell('AZ' . $i)->setValue($row['alokasibiaya2']);           
                // $objSheet->getCell('BA' . $i)->setValue($row['alokasibiaya3']);           
                // $objSheet->getCell('BB' . $i)->setValue($row['hari_kerja_perminggu']);            
                $arrayData[] = array(
                                    $row['RowNum'],
                                    $row['subholding'],
                                    $row['projectname'],
                                    $row['ptname'],
                                    "'".strval($row['employee_nik'])."'",
                                    "'".strval($row['nik_group'])."'",
                                    $row['employee_name'],
                                    $row['gender'],
                                    $row['birth_place'],
                                    $row['birth_date'],
                                    // $row['bloodgroup'],
                                    $row['religion'],
                                    $row['marriagestatus'],
                                    $row['marriage_date'],
                                    $row['child_count'],
                                    $row['education'],
                                    "'".$row['ktp_number']."'",
                                    "'".$row['npwp']."'",
                                    "'".$row['passport_number']."'",
                                    $row['address'],
                                    $row['ktp_address'],
                                    $row['zipcode'],
                                    $row['hp_number'],
                                    $row['phone_number'],
                                    $row['statusemployee'],
                                    $row['employeestatus'],
                                    $row['hire_date'],
                                    $row['assignation_date'],
                                    $row['contract_ke'],
                                    $row['contract_start'],
                                    $row['contract_end'],
                                    $row['temporary_ke'],
                                    $row['temporary_start'],
                                    $row['temporary_end'],
                                    $row['nonactive_date'],
                                    $row['alasan_resign'],
                                    "'".$row['fingerprintcode']."'",
                                    // "'".$row['hod_nik']."'",
                                    // $row['hod_name'],
                                    $row['department'],
                                    $row['jobfamily'],
                                    $row['banding'],
                                    // $row['divisi'],
                                    $row['groupcode'],
                                    $row['positiondesc'],
                                    // $row['package_name'],
                                    $row['email_ciputra'],
                                    $row['email'],
                                    $row['bank_rekening'],
                                    "'".$row['nomor_rekening']."'",
                                    $row['nama_rekening'],
                                    // $row['alokasibiaya1'],
                                    // $row['alokasibiaya2'],
                                    // $row['alokasibiaya3'],
                                    $row['hari_kerja_perminggu']
                                );
            }
            $objSheet->fromArray(
                $arrayData,
                NULL,
                'A'.$start_excel

            );
            
        }

        
        
        // create some borders
        // first, create the whole grid around the table

        // $objSheet->getStyle('A1:BB' . $i)->getBorders()->
        //         getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // $objSheet->getStyle('A1:BB' . $i)->getBorders()->
        //         getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        // $objSheet->getStyle('A1:BB1')->getBorders()->
        //         getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

        $objSheet->getStyle('A1:AU' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AU' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:AU1')->getBorders()->
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
        // $objSheet->getColumnDimension('AV')->setAutoSize(true);
        // $objSheet->getColumnDimension('AW')->setAutoSize(true);
        // $objSheet->getColumnDimension('AX')->setAutoSize(true);
        // $objSheet->getColumnDimension('AY')->setAutoSize(true);
        // $objSheet->getColumnDimension('AZ')->setAutoSize(true);
        // $objSheet->getColumnDimension('AZ')->setAutoSize(true);
        // $objSheet->getColumnDimension('BA')->setAutoSize(true);
        // $objSheet->getColumnDimension('BB')->setAutoSize(true);


        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportdataemployee';
        // $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        // $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $data['user_id'] . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $data['user_id'] . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }
}
