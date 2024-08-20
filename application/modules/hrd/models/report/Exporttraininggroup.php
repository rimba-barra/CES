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
class Hrd_Models_Report_Exporttraininggroup extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_report_traininggroup_export';        
        $this->destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/personal/exportdata/';
        $this->dbTable = new Box_Models_Dbtable_Db();
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
        // var_dump($result[0]);die();
        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
      
    }

    public function getemp_training($trainingschedule_id,$data) {
        $result = $this->dbTable->SPExecute('sp_trainingregisteremployee_exportreadexist',
                $trainingschedule_id,
                $data['employee_id'],
                $data['department_id'],
                1, 9999);

        if(!empty($result[1])){
            return $result[1];
        }else{
            return null;
        }
      
    }
    

    public function getDataExport($params) {  
        $hasil = $this->dbTable->SPExecute('sp_report_traininggroup_export', 
            $params['subholding_id'],
            $params['project_id'],
            $params['pt_id'],
            $params['start_date'],
            $params['end_date'],
            $params['close'],
            //tambah ini untuk validasi hak akses
            $params['user_id']
        );

        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }


    function exceldata($data, $session) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();

        $data['user_id'] = $session->getUserId();
         
        // $result = $this->getdata($data);
        //updated by anas 12042022
        $result = $this->getDataExport($data);
    
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
        $objSheet->setTitle('Training Report Group');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:R1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No.'); 
        $objSheet->getCell('B1')->setValue('Project');
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('Subholding');
        $objSheet->getCell('E1')->setValue('Modul Pelatihan');
        $objSheet->getCell('F1')->setValue('Batch');
        $objSheet->getCell('G1')->setValue('Periode');    
        $objSheet->getCell('H1')->setValue('Pelaksana');
        $objSheet->getCell('I1')->setValue('Tanggal');
        $objSheet->getCell('J1')->setValue('Waktu');
        $objSheet->getCell('k1')->setValue('Durasi');
        $objSheet->getCell('L1')->setValue('Tempat');
        $objSheet->getCell('M1')->setValue('Biaya');
        $objSheet->getCell('N1')->setValue('Peserta');
        $objSheet->getCell('O1')->setValue('Jumlah Peserta');
        $objSheet->getCell('P1')->setValue('Sertifikat');
        $objSheet->getCell('Q1')->setValue('Close');
        $objSheet->getCell('R1')->setValue('Type');
        $i = 1;
        $no_index = 0;
        foreach ($result as $row) {
            $i++;
            $no_index++;
            if($row['timestart'] != 0 && $row['timeend'] != 0){
                $timestart = strtotime($row['timestart']);
                $timeend = strtotime($row['timeend']);
                $timeDiff = $timeend-$timestart;
                // $timeDiff = date('H:i:s', strtotime($timeDiff));
                $hours = abs(floor(($timeDiff)/3600));
                $mins = abs(floor(($timeDiff-($hours * 3600))/60));
                // $timeDiff = date('H:i',$timestart) .' - '. date('H:i',$timeend) .' ( ';
                $timeDiff = date('H:i',$timestart) .' - '. date('H:i',$timeend);
                $timeDur ="";
                if($hours != 0){
                    $timeDur .= $hours. ' jam ';
                }
                if($mins != 0){
                    $timeDur .= $mins. ' menit ';
                }
                // $timeDiff .= ')';

            }else{
                $timeDiff = '';
            }
            $tanggal = date('d/m/Y',strtotime($row['startdate'])).' - '.date('d/m/Y',strtotime($row['enddate'])) .' ( '. $row['total_date'].' hari)';

            // if($row['certificate'] == 0){
            //     $certificate = 'No';
            // }elseif($row['certificate'] == 1){
            //     $certificate = 'Yes';
            // }else{
            //     $certificate = '';
            // }

            if($row['closed'] == 0){
                $closed = '';
            }elseif($row['closed'] == 1){
                $closed = 'Yes';
            }else{
                $closed = '';
            }

            $employee = $this->getemp_training($row['trainingschedule_id'],$data);
            $employee_res = '';
            if($employee[0]){
                // $employee_res .= '"';
                foreach($employee as $key => $item){
                    $employee_res .= $item['employee_name'] .' ( '. $item['department'] . " )\n";
                }
                // $employee_res .= '"';
            }
            // print_r($employee_res);die();
            // $user_inactiveby = $row['inactiveby_name'];
            // if($row['inactiveby']){
            //     if($row['inactiveby'] == '-1'){
            //         $user_inactiveby = 'SYSTEM';
            //     }
            // }else{
            //     $user_inactiveby = $row['inactiveby_name'];
            // }

            // $user_modiby = $row['modiby_name'];
            // if($row['modiby']){
            //     if($row['modiby'] == '-1'){
            //         $user_modiby = 'SYSTEM';
            //     }
            // }else{
            //     $user_modiby = $row['modiby_name'];
            // }

            // if(date('d/m/Y',strtotime($row['modion'])) == '01/01/1970'){
            //     $modion_date = '';
            // }else{
            //     $modion_date = date('d/m/Y H:i:s',strtotime($row['modion']));
            // }

            // if(date('d/m/Y',strtotime($row['inactiveon'])) == '01/01/1970'){
            //     $inactiveon_date = '';
            // }else{
            //     $inactiveon_date = date('d/m/Y H:i:s',strtotime($row['inactiveon']));
            // }

            // if(date('d/m/Y',strtotime($row['reactiveon'])) == '01/01/1970'){
            //     $reactiveon_date = '';
            // }else{
            //     $reactiveon_date = date('d/m/Y H:i:s',strtotime($row['reactiveon']));
            // }
            // $abc = "First line\nSecond Line\nThird Line\n";
            // print_r($abc.' | '. $employee_res);die();
            $objSheet->getCell('A' . $i)->setValue($no_index);  
            $objSheet->getCell('B' . $i)->setValue($row['project_name']);
            $objSheet->getCell('C' . $i)->setValue($row['pt_name']);
            $objSheet->getCell('D' . $i)->setValue($row['subholding_name']);
            $objSheet->getCell('E' . $i)->setValue($row['trainingname']);
            $objSheet->getCell('F' . $i)->setValue($row['batch']);
            $objSheet->getCell('G' . $i)->setValue($row['periode']);
            $objSheet->getCell('H' . $i)->setValue($row['vendor']);
            $objSheet->getCell('I' . $i)->setValue($tanggal);   
            $objSheet->getCell('J' . $i)->setValue($timeDiff);  
            $objSheet->getCell('K' . $i)->setValue($timeDur);
            $objSheet->getCell('L' . $i)->setValue($row['venue']);
            $objSheet->getCell('M' . $i)->setValue($row['total_cost']);
            // $objSheet->getCell('J' . $i)->setValue($row['pt_name']);
            // $objSheet->getCell('J' . $i)->setValue($employee_res);
            $objPHPExcel->getActiveSheet()->setCellValue('N' . $i, $employee_res);
            $objPHPExcel->getActiveSheet()->getStyle('N' . $i)->getAlignment()->setWrapText(true);

            $objSheet->getCell('O' . $i)->setValue($row['total_register']);
            $objSheet->getCell('P' . $i)->setValue($row['certificate']); 
            $objSheet->getCell('Q' . $i)->setValue($closed);      
            $objSheet->getCell('R' . $i)->setValue($row['type']);        
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:R' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:R' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:R1')->getBorders()->
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

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exporttraininggroup';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
