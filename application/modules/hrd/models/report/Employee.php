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
class Hrd_Models_Report_Employee extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_employee_report';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($params) {
        //updated by anas 3132022
        $this->setup->_param = array(
            "employee_name" => $params['employee_name'],
            "employee_active" => $params['employee_active'],
            "department_id" => $params['department_department_id']
        );
        //end updated by anas
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

        //updated by anas 3132022 - $params
        $result = $this->getdata($params);
        
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
        $objSheet->getStyle('A1:BI1')->getFont()->setBold(true)->setSize(12);

        // write header
        
        $objSheet->getCell('A1')->setValue('Subholding');
        $objSheet->getCell('B1')->setValue('Subholding Sub');
        $objSheet->getCell('C1')->setValue('Proyek');    
        $objSheet->getCell('D1')->setValue('PT');
        $objSheet->getCell('E1')->setValue('NIK Karyawan');
        $objSheet->getCell('F1')->setValue('NIK Grup Karyawan');
        $objSheet->getCell('G1')->setValue('Nama Karyawan');
        $objSheet->getCell('H1')->setValue('Jenis Kelamin');
        $objSheet->getCell('I1')->setValue('Tempat Lahir');
        $objSheet->getCell('J1')->setValue('Tanggal Lahir');
        //added by anas 31032022            
        $objSheet->getCell('K1')->setValue('Umur');
        //end added by anas
        $objSheet->getCell('L1')->setValue('Golongan Darah');
        $objSheet->getCell('M1')->setValue('Agama');
        $objSheet->getCell('N1')->setValue('Status');
        $objSheet->getCell('O1')->setValue('Tanggal Menikah');
        $objSheet->getCell('P1')->setValue('Jumlah Anak');
        $objSheet->getCell('Q1')->setValue('Pendidikan Terakhir');
        $objSheet->getCell('R1')->setValue('Nomor KTP');
        $objSheet->getCell('S1')->setValue('Nomor NPWP');
        $objSheet->getCell('T1')->setValue('Nomor Passport');
        $objSheet->getCell('U1')->setValue('Alamat Saat ini Tinggal');
        $objSheet->getCell('V1')->setValue('Alamat Sesuai KTP');
        $objSheet->getCell('W1')->setValue('Kode POS');
        $objSheet->getCell('X1')->setValue('Handphone');
        $objSheet->getCell('Y1')->setValue('Phone');
        $objSheet->getCell('Z1')->setValue('Status');
        $objSheet->getCell('AA1')->setValue('Status Karyawan');
        $objSheet->getCell('AB1')->setValue('Hire Date');
        $objSheet->getCell('AC1')->setValue('Tanggal Pengangkatan');
        $objSheet->getCell('AD1')->setValue('Kontrak ke');
        $objSheet->getCell('AE1')->setValue('Tanggal Mulai Kontrak');
        $objSheet->getCell('AF1')->setValue('Tanggal Berakhir Kontrak');
        $objSheet->getCell('AG1')->setValue('Temporary ke');
        $objSheet->getCell('AH1')->setValue('Tanggal Mulai Temporary');
        $objSheet->getCell('AI1')->setValue('Tanggal Berakhir Temporary');
        $objSheet->getCell('AJ1')->setValue('Fingerprint Code');
        $objSheet->getCell('AK1')->setValue('NIK HOD');
        $objSheet->getCell('AL1')->setValue('Nama HOD');
        $objSheet->getCell('AM1')->setValue('Departemen');
        $objSheet->getCell('AN1')->setValue('Section');
        $objSheet->getCell('AO1')->setValue('Job Family');
        //$objSheet->getCell('AL1')->setValue('Job Function');
        $objSheet->getCell('AP1')->setValue('Banding');
        $objSheet->getCell('AQ1')->setValue('Business Unit');
        $objSheet->getCell('AR1')->setValue('Golongan');
        $objSheet->getCell('AS1')->setValue('Jabatan');
        $objSheet->getCell('AT1')->setValue('Paket Dokumen');
        $objSheet->getCell('AU1')->setValue('Email Kantor');
        $objSheet->getCell('AV1')->setValue('Email Pribadi');
        $objSheet->getCell('AW1')->setValue('Bank Rekening');
        $objSheet->getCell('AX1')->setValue('Nomor Rekening');
        $objSheet->getCell('AY1')->setValue('Nama Rekening');
        //$objSheet->getCell('AW1')->setValue('Klaim Frame Tahun Akhir');
        //$objSheet->getCell('AX1')->setValue('Klaim Frame Saldo Akhir');
        $objSheet->getCell('AZ1')->setValue('Alokasi Biaya ke 1');
        $objSheet->getCell('BA1')->setValue('Alokasi Biaya ke 2');
        $objSheet->getCell('BB1')->setValue('Alokasi Biaya ke 3');
        $objSheet->getCell('BC1')->setValue('Work Days');

        $objSheet->getCell('BD1')->setValue('Kompensasi');
        $objSheet->getCell('BE1')->setValue('Usia Kerja');
        $objSheet->getCell('BF1')->setValue('Perhitungan Usia Kerja');
        $objSheet->getCell('BG1')->setValue('Masa Kerja');
        $objSheet->getCell('BH1')->setValue('Perhitungan Masa Kerja');

        $objSheet->getCell('BI1')->setValue('Pensiun');
       
       
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
            //added by anas 31032022
            $objSheet->getCell('K' . $i)->setValue($row['age']);
            //end added by anas
            $objSheet->getCell('L' . $i)->setValue($row['bloodgroup']);
            $objSheet->getCell('M' . $i)->setValue($row['religion']);
            $objSheet->getCell('N' . $i)->setValue($row['marriagestatus']);
            $objSheet->getCell('O' . $i)->setValue($row['marriage_date']);
            $objSheet->getCell('P' . $i)->setValue($row['child_count']);
            $objSheet->getCell('Q' . $i)->setValue($row['education']);
            $objSheet->getCell('R' . $i)->setValue("'".$row['ktp_number']."'");
            $objSheet->getCell('S' . $i)->setValue("'".$row['npwp']."'");
            $objSheet->getCell('T' . $i)->setValue("'".$row['passport_number']."'");
            $objSheet->getCell('U' . $i)->setValue($row['address']);
            $objSheet->getCell('V' . $i)->setValue($row['ktp_address']);
            $objSheet->getCell('W' . $i)->setValue($row['zipcode']);
            $objSheet->getCell('X' . $i)->setValueExplicit($row['hp_number'], PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('Y' . $i)->setValueExplicit($row['phone_number'], PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('Z' . $i)->setValue($row['statusemployee']);
            $objSheet->getCell('AA' . $i)->setValue($row['employeestatus']);
            $objSheet->getCell('AB' . $i)->setValue($row['hire_date']);
            $objSheet->getCell('AC' . $i)->setValue($row['assignation_date']);
            $objSheet->getCell('AD' . $i)->setValue($row['contract_ke']);
            $objSheet->getCell('AE' . $i)->setValue($row['contract_start']);
            $objSheet->getCell('AF' . $i)->setValue($row['contract_end']);
            $objSheet->getCell('AG' . $i)->setValue($row['temporary_ke']);
            $objSheet->getCell('AH' . $i)->setValue($row['temporary_start']);
            $objSheet->getCell('AI' . $i)->setValue($row['temporary_end']);
            $objSheet->getCell('AJ' . $i)->setValue("'".$row['fingerprintcode']."'");
            $objSheet->getCell('AK' . $i)->setValue("'".$row['hod_nik']."'");
            $objSheet->getCell('AL' . $i)->setValue($row['hod_name']);
            $objSheet->getCell('AM' . $i)->setValue($row['department']);
            $objSheet->getCell('AN' . $i)->setValue($row['section']);
            $objSheet->getCell('AO' . $i)->setValue($row['jobfamily']);
            //$objSheet->getCell('AL' . $i)->setValue($row['jobfunction']);
            $objSheet->getCell('AP' . $i)->setValue($row['banding']);
            $objSheet->getCell('AQ' . $i)->setValue($row['divisi']);
            $objSheet->getCell('AR' . $i)->setValue($row['groupcode']);
            $objSheet->getCell('AS' . $i)->setValue($row['positiondesc']);
            $objSheet->getCell('AT' . $i)->setValue($row['package_name']);
            $objSheet->getCell('AU' . $i)->setValue($row['email_ciputra']);
            $objSheet->getCell('AV' . $i)->setValue($row['email']);
            $objSheet->getCell('AW' . $i)->setValue($row['bank_rekening']);
            $objSheet->getCell('AX' . $i)->setValue("'".$row['nomor_rekening']."'");
            $objSheet->getCell('AY' . $i)->setValue($row['nama_rekening']);
            //$objSheet->getCell('AW' . $i)->setValue($row['klaim_frame_tahun_akhir']);
            //$objSheet->getCell('AX' . $i)->setValue($row['klaim_frame_saldo_akhir']);  
            $objSheet->getCell('AZ' . $i)->setValue($row['alokasibiaya1']);
            $objSheet->getCell('BA' . $i)->setValue($row['alokasibiaya2']);
            $objSheet->getCell('BB' . $i)->setValue($row['alokasibiaya3']);
            $objSheet->getCell('BC' . $i)->setValue($row['hari_kerja_perminggu']);

            if($row['employeestatus_id'] == '1'){

                if($row['is_kompensasi'] == '1'){
                    $is_kompensasi = 'Dapat';
                }elseif($row['is_kompensasi'] == '0'){
                    $is_kompensasi = 'Tidak Dapat';
                }else{
                    $is_kompensasi = null;
                }

                if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                    $now = date('Y-m-d', strtotime($row['nonactive_date']));
                }else{
                    $now = date('Y-m-d');
                }

                if($row['usia_kerja_start_date']){
                    $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                    $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                    $years_usia = floor($diff_usia / (365*60*60*24));
                    $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                    $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                    $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                }else{
                    $usia_kerja_start_date = null;
                    $year_in_services_usia = null;
                }

                if($row['masa_kerja_start_date']){
                    $masa_kerja_start_date = date('Y-m-d', strtotime($row['masa_kerja_start_date']));
                    
                    $diff_masa = abs(strtotime($now) - strtotime($masa_kerja_start_date)); 
                    $years_masa = floor($diff_masa / (365*60*60*24));
                    $months_masa = floor(($diff_masa - $years_masa * 365*60*60*24) / (30*60*60*24));
                    $days_masa = floor(($diff_masa - $years_masa * 365*60*60*24 - $months_masa*30*60*60*24)/ (60*60*24));           
                    $year_in_services_masa = "$years_masa tahun $months_masa bulan $days_masa hari (sampai: $now)";
                }else{
                    $masa_kerja_start_date = null;
                    $year_in_services_masa = null;
                }
                
                $pensiun = null;

            }elseif($row['employeestatus_id'] == '2' || $row['employeestatus_id'] == '3' || $row['employeestatus_id'] == '7'){

                $is_kompensasi = null;

                if($row['employee_active'] == '0' && !empty($row['nonactive_date'])){
                    $now = date('Y-m-d', strtotime($row['nonactive_date']));
                }else{
                    $now = date('Y-m-d');
                }

                if($row['usia_kerja_start_date']){
                    $usia_kerja_start_date = date('Y-m-d', strtotime($row['usia_kerja_start_date']));

                    $diff_usia = abs(strtotime($now) - strtotime($usia_kerja_start_date));
                    $years_usia = floor($diff_usia / (365*60*60*24));
                    $months_usia = floor(($diff_usia - $years_usia * 365*60*60*24) / (30*60*60*24));
                    $days_usia = floor(($diff_usia - $years_usia * 365*60*60*24 - $months_usia*30*60*60*24)/ (60*60*24));           
                    $year_in_services_usia = "$years_usia tahun $months_usia bulan $days_usia hari (sampai: $now)";
                }else{
                    $usia_kerja_start_date = null;
                    $year_in_services_usia = null;
                }

                $masa_kerja_start_date = null;
                $year_in_services_masa = null;

                if($row['is_pensiun'] == 1){
                    $pensiun = 'Pensiun';
                }else{
                    $pensiun = null;
                }
                
            }else{
                $is_kompensasi = null;
                $usia_kerja_start_date = null;
                $masa_kerja_start_date = null;
                $year_in_services_usia = null;
                $year_in_services_masa = null;
                $pensiun = null;
            }
            $objSheet->getCell('BD' . $i)->setValue($is_kompensasi);
            $objSheet->getCell('BE' . $i)->setValue($usia_kerja_start_date);
            $objSheet->getCell('BF' . $i)->setValue($year_in_services_usia);
            $objSheet->getCell('BG' . $i)->setValue($masa_kerja_start_date);
            $objSheet->getCell('BH' . $i)->setValue($year_in_services_masa);
            $objSheet->getCell('BI' . $i)->setValue($pensiun);
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:BI' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:BI' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:BI1')->getBorders()->
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
        $objSheet->getColumnDimension('AZ')->setAutoSize(true);
        $objSheet->getColumnDimension('BA')->setAutoSize(true);
        $objSheet->getColumnDimension('BB')->setAutoSize(true);
        $objSheet->getColumnDimension('BC')->setAutoSize(true);
        $objSheet->getColumnDimension('BD')->setAutoSize(true);
        $objSheet->getColumnDimension('BE')->setAutoSize(true);
        $objSheet->getColumnDimension('BF')->setAutoSize(true);
        $objSheet->getColumnDimension('BG')->setAutoSize(true);
        $objSheet->getColumnDimension('BH')->setAutoSize(true);
        $objSheet->getColumnDimension('BI')->setAutoSize(true);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportdataemployee';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
