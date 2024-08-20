<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AbsentReportExcelFormatD
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Hrd_Models_Report_AbsentReportExcelFormatE {

    private $fileResult;
    private $objPHPExcel;
    private $url;
    private $projectId;
    private $ptId;
    private $setup;
    private $tmp_table;

    function __construct($projectId, $ptId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;
        $this->setup = new Hrd_Models_General_Setup();
        $this->tmp_table = '##tmp_rptabsentrpte_' . $this->setup->_user_id;
    }

    public function process($appData = NULL, $monthText, $year) {


        // $objPHPExcel = new PHPExcel();

        $objReader = PHPExcel_IOFactory::createReader("Excel2007");
        $objPHPExcel = $objReader->load(APPLICATION_PATH . '/../public/app/hrd/uploads/msexcel/template/template_data_keterlambatan.xlsx');

        // $objPHPExcel->setActiveSheetIndex(0);
        //   $activeSheet = $this->objPHPExcel->getActiveSheet();
        // Set properties
//echo date('H:i:s') . " Set properties\n";
        $objPHPExcel->getProperties()->setCreator("MIS");

        $objPHPExcel->getProperties()->setTitle("Absent Report Format E");
        $objPHPExcel->getProperties()->setSubject("Absent Report Format E");
        $objPHPExcel->getProperties()->setDescription("Absent Report Format E");


// Add some data
//echo date('H:i:s') . " Add some data\n";


        $objPHPExcel->setActiveSheetIndex(0);

        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'DATA KETERLAMBATAN ' . $monthText . ' ' . $year . ' KARYAWAN');
        $objPHPExcel->getActiveSheet()->SetCellValue('A3', 'NO');
        $objPHPExcel->getActiveSheet()->SetCellValue('B3', 'Departemen');
        $objPHPExcel->getActiveSheet()->SetCellValue('C3', 'NIK');
        $objPHPExcel->getActiveSheet()->SetCellValue('D3', 'NAMA KARYAWAN');
        $objPHPExcel->getActiveSheet()->SetCellValue('E4', '0 - 5');
        $objPHPExcel->getActiveSheet()->SetCellValue('F4', '5 - 10');
        $objPHPExcel->getActiveSheet()->SetCellValue('G4', '> 10');
        $objPHPExcel->getActiveSheet()->SetCellValue('H3', 'Total Terlambat > 5 menit');
        $objPHPExcel->getActiveSheet()->SetCellValue('I3', '% Keterlambatan');
        $objPHPExcel->getActiveSheet()->SetCellValue('J3', 'Total Jam');
        $objPHPExcel->getActiveSheet()->SetCellValue('K3', 'Total Menit');
        $objPHPExcel->getActiveSheet()->SetCellValue('L3', 'Kehadiran');
        $objPHPExcel->getActiveSheet()->SetCellValue('M3', 'Hari Kerja Normal');
        $objPHPExcel->getActiveSheet()->SetCellValue('N3', 'Rata-rata Keterlambatan (MENIT)');


        $count = 5;
        $counter = 1;
        foreach ($appData as $row) {
            /* start added by ahmad riadi 21-06-2017 */
            $totalterlambatlebihdr5menit = intval($row["late_b"]) + intval($row["late_c"]);
            $persentase_keterlambatan = $this->getPersentaseketerlambatan($totalterlambatlebihdr5menit, intval($row["kehadiran_normal"]));
            $ratarate_keterlambatan = $this->getRatarataketerlambatan(floatval($row["late_total_menit"]), $row["kehadiran_normal"]);
            /* end added by ahmad riadi 21-06-2017 */

            $objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $counter);
            $objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["department_code"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["employee_nik"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["employee_name"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["late_a"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["late_b"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["late_c"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('L' . $count, $row["kehadiran_normal"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $totalterlambatlebihdr5menit);
            $objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, $persentase_keterlambatan);
            $objPHPExcel->getActiveSheet()->SetCellValue('J' . $count, floatval($row["late_total_jam"]));
            $objPHPExcel->getActiveSheet()->SetCellValue('K' . $count, floatval($row["late_total_menit"]));
            $objPHPExcel->getActiveSheet()->SetCellValue('M' . $count, floatval($row["normal_hadir"]));
            $objPHPExcel->getActiveSheet()->SetCellValue('N' . $count, $ratarate_keterlambatan);
            $count++;
            $counter++;
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'ABSENTREPORT_FORMAT_E_' . $this->projectId . '_' . $this->ptId . '.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/hrd/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/hrd/uploads/msexcel/' . $this->fileResult;
    }

    public function procesforViewer($appData = NULL, $monthText, $year) {
        $this->create_table_tmp();
        $this->truncate_tmp();
        foreach ($appData as $row) {
            $totalterlambatlebihdr5menit = intval($row["late_b"]) + intval($row["late_c"]);
            if (empty($totalterlambatlebihdr5menit)) {
                $totalterlambatlebihdr5menit = 0;
            }
            if (empty($row['late_total_menit'])) {
                $row['late_total_menit'] = 0;
            }
            if (empty($row['late_total_jam'])) {
                $row['late_total_jam'] = 0;
            }
            $row['project_id'] = $this->setup->_project_id;
            $row['pt_id'] = $this->setup->_pt_id;
            $row['employee_name'] = "''" . $row['employee_name'] . "''";
            $row['department_code'] = "''" . $row['department_code'] . "''";
            $row['employee_nik'] = "''" . $row['employee_nik'] . "''";
            $row['late_total_menit'] = $row['late_total_menit'];
            $row['totalterlambatlebihdr5menit'] = intval($totalterlambatlebihdr5menit);
            $row['persentase_keterlambatan'] = $this->getPersentaseketerlambatan($totalterlambatlebihdr5menit, intval($row["kehadiran_normal"]));
            $row['ratarata_keterlambatan'] = $this->getRatarataketerlambatan(floatval($row["late_total_menit"]), $row["kehadiran_normal"]);
            $this->insert_to_tmp($row);
        }
        $rowdefaultproject = $this->setup->get_defaultproject();
        $rowdefaultpt = $this->setup->get_defaultpt();
        $rowdefaultuser = $this->setup->getUserdata();
        return array(
            "project_name" => $rowdefaultproject['name'],
            "pt_name" => $rowdefaultpt['name'],
            "userprint" => $rowdefaultuser['user_fullname'],
            "month" => $monthText,
            "year" => $year,
            "qparam" => $this->tmp_table,
            "tgl_sekarang" => date('d-m-Y'),
            "time_sekarang" => date('H:i:s')
        );
    }

    public function getUrl() {
        return $this->url;
    }

    /* start added by ahmad riadi 21-06-2017 */

    public function getPersentaseketerlambatan($a, $b) {
        if ($b === 0) {
            $c = 0;
        } else {
            $c = ($a / $b) * 100;
        }
        return number_format($c, 2);
    }

    public function getRatarataketerlambatan($a, $b) {
        if ($b === 0) {
            $c = 0;
        } else {
            $c = ($a / $b);
        }
        return number_format($c, 2);
    }

    public function create_table_tmp() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->tmp_table'') IS NOT NULL DROP TABLE $this->tmp_table
                 CREATE TABLE $this->tmp_table (
                        rpt_id int identity primary key,                       
                        project_id int,
                        pt_id int,        
                        employee_id int,
                        employee_name varchar(250),
                        employee_nik varchar(100), 
                        department_code varchar(100),                        
                        late_a int,  
                        late_b int, 
                        late_c int,   
                        totalterlambatlebihdr5menit varchar(100),   
                        persentase_keterlambatan varchar(100),   
                        late_total_menit varchar(100),   
                        late_total_jam varchar(100),   
                        kehadiran_normal int,   
                        normal_hadir int,   
                        ratarata_keterlambatan varchar(100) 
                     )    
                
            ";
        $this->setup->customefromquery($sql);
    }

    public function truncate_tmp() {
        $sql = "TRUNCATE TABLE $this->tmp_table ";
        $this->setup->customefromquery($sql);
    }

    public function insert_to_tmp($record) {
        $result = $this->setup->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->tmp_table ($key) VALUES ($values)  
               ";
        //echo $sql;
        $this->setup->customefromquery($sql);
    }

    /* end added by ahmad riadi 21-06-2017 */
}
