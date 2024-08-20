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
class Hrd_Models_Report_Exportpersonal extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_exportpersonal';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($data) {
        $this->setup->_param = $data;
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP();
        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
      
    }
    

    function exceldata($data) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
        $result = $this->getdata($data);
        
    
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
        $objSheet->setTitle('export data personal');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:V1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('Proyek');    
        $objSheet->getCell('B1')->setValue('Pt');
        $objSheet->getCell('C1')->setValue('NIK Karyawan');
        $objSheet->getCell('D1')->setValue('Nama Karyawan');
        $objSheet->getCell('E1')->setValue('Tempat Lahir');
        $objSheet->getCell('F1')->setValue('Tanggal Lahir');
        $objSheet->getCell('G1')->setValue('Jenis Kelamin');
        $objSheet->getCell('H1')->setValue('Nomor KTP');
        $objSheet->getCell('I1')->setValue('Alamat 1');
        $objSheet->getCell('J1')->setValue('Alamat 2');
        $objSheet->getCell('K1')->setValue('Alamat 3');
        $objSheet->getCell('L1')->setValue('Agama');
        $objSheet->getCell('M1')->setValue('Status Perkawinan');
        $objSheet->getCell('N1')->setValue('Jumlah Anak');
        $objSheet->getCell('O1')->setValue('Pendidikan Terakhir');
        $objSheet->getCell('P1')->setValue('Divisi');
        $objSheet->getCell('Q1')->setValue('Departemen');
        $objSheet->getCell('R1')->setValue('Golongan');
        $objSheet->getCell('S1')->setValue('Jabatan');
        $objSheet->getCell('T1')->setValue('Status Karyawan');
        $objSheet->getCell('U1')->setValue('Tanggal Masuk');
        $objSheet->getCell('V1')->setValue('Tanggal Keluar');
        
        $i = 1;
        foreach ($result as $row) {
            $i++;
            
            // potong address menjadi 3 bagian per 40 char dan kata tetap utuh
            $address = $row['address'];
            $x = 40;
            $lines = explode("\n", wordwrap($address, $x));            
            $address1 = $lines[0];
            $address2 = $lines[1];
            $address3 = $lines[2];

            $objSheet->getCell('A' . $i)->setValue($row['projectname']);           
            $objSheet->getCell('B' . $i)->setValue($row['ptname']);            
            //$objSheet->getCell('C' . $i)->setValue("'".strval($row['employee_nik']));           
            $objSheet->setCellValueExplicit('C' . $i, strval($row['employee_nik']), PHPExcel_Cell_DataType::TYPE_STRING);            
            $objSheet->getCell('D' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('E' . $i)->setValue($row['birth_place']);
            $objSheet->getCell('F' . $i)->setValue($row['birth_date']);
            $objSheet->getCell('G' . $i)->setValue($row['gender']);
            $objSheet->getCell('H' . $i)->setValue("'".$row['ktp_number']."'");
            $objSheet->getCell('I' . $i)->setValue($address1);
            $objSheet->getCell('J' . $i)->setValue($address2);
            $objSheet->getCell('K' . $i)->setValue($address3);            
            $objSheet->getCell('L' . $i)->setValue($row['religion']);
            $objSheet->getCell('M' . $i)->setValue($row['marriagestatus']);
            $objSheet->getCell('N' . $i)->setValue($row['child_count']);
            $objSheet->getCell('O' . $i)->setValue($row['education']);
            $objSheet->getCell('P' . $i)->setValue($row['divisi']);
            $objSheet->getCell('Q' . $i)->setValue($row['department']);
            $objSheet->getCell('R' . $i)->setValue($row['groupcode']);
            $objSheet->getCell('S' . $i)->setValue($row['positiondesc']);     
            $objSheet->getCell('T' . $i)->setValue($row['employeestatus']); 
            $objSheet->getCell('U' . $i)->setValue($row['hire_date']);
            $objSheet->getCell('V' . $i)->setValue('');
                
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:V' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:V' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:V1')->getBorders()->
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

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportdataemployee';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xls";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xls";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
