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
class Hrd_Models_Report_Exporttraining extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();       
        $this->destination = getcwd() . '/app/hrd/uploads/training/exportdata/';
        $this->httpdirect = 'app/hrd/uploads/training/exportdata/';
        $this->dbTable = new Box_Models_Dbtable_Db();
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }
    
    public function getdata($data) {
        $this->setup->_param = $data;
        // var_dump($data);exit();
        $this->setup->_storeprocedure = 'sp_report_training_export'; 
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP(); 
        // var_dump($result);exit();
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
    

    function exceldata($data) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
         
        $result = $this->getdata($data);
        // var_dump($result);die();
    
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
        $objSheet->setTitle('Training Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:U1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Project');
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('Modul Pelatihan');
        $objSheet->getCell('E1')->setValue('Batch');
        $objSheet->getCell('F1')->setValue('Periode');
        $objSheet->getCell('G1')->setValue('Pelaksana');
        $objSheet->getCell('H1')->setValue('Tanggal');
        $objSheet->getCell('I1')->setValue('Waktu');
        $objSheet->getCell('J1')->setValue('Durasi (menit)');
        $objSheet->getCell('K1')->setValue('Tempat');
        $objSheet->getCell('L1')->setValue('Biaya');
        $objSheet->getCell('M1')->setValue('Nama Karyawan');
        $objSheet->getCell('N1')->setValue('Jenis Kelamin');
        $objSheet->getCell('O1')->setValue('Department');
        $objSheet->getCell('P1')->setValue('Position');
        $objSheet->getCell('Q1')->setValue('Banding');
        $objSheet->getCell('R1')->setValue('Jumlah Peserta');
        $objSheet->getCell('S1')->setValue('Sertifikat');
        $objSheet->getCell('T1')->setValue('Close');
        $objSheet->getCell('U1')->setValue('Type');

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

            // $datetime1 = new DateTime($row['startdate'].' '.$row['timestart']);
            // $datetime2 = new DateTime($row['startdate'].' '.$row['timeend']);

            $datetime1 = strtotime($row['timestart']);
            $datetime2 = strtotime($row['timeend']);
            // $interval = $datetime1->diff($datetime2);
            // $timeDiff2= $interval->i;

            $timeDiff2= (($datetime2 - $datetime1)/60) * $row['total_date'];



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

            // $objSheet->getCell('A' . $i)->setValue($no_index);  
            // $objSheet->getCell('B' . $i)->setValue($row['project_name']);
            // $objSheet->getCell('C' . $i)->setValue($row['pt_name']);
            // $objSheet->getCell('D' . $i)->setValue($row['trainingname']);
            // $objSheet->getCell('E' . $i)->setValue($row['batch']);
            // $objSheet->getCell('F' . $i)->setValue($row['periode']);
            // $objSheet->getCell('G' . $i)->setValue($row['vendor']);
            // $objSheet->getCell('H' . $i)->setValue($tanggal);   
            // $objSheet->getCell('I' . $i)->setValue($timeDiff2);  
            // $objSheet->getCell('J' . $i)->setValue($timeDur);
            // $objSheet->getCell('K' . $i)->setValue($row['venue']);
            // $objSheet->getCell('L' . $i)->setValue($row['total_cost']);
            // // $objSheet->getCell('J' . $i)->setValue($row['pt_name']);
            // // $objSheet->getCell('J' . $i)->setValue($employee_res);
            // $objPHPExcel->getActiveSheet()->setCellValue('M' . $i, $employee_res);
            // $objPHPExcel->getActiveSheet()->getStyle('M' . $i)->getAlignment()->setWrapText(true);

            // $objSheet->getCell('N' . $i)->setValue($row['total_register']);
            // $objSheet->getCell('O' . $i)->setValue($row['certificate']); 
            // $objSheet->getCell('P' . $i)->setValue($closed);      
            // $objSheet->getCell('Q' . $i)->setValue($row['type']);

            $objSheet->getCell('A' . $i)->setValue($no_index);
            $objSheet->getCell('B' . $i)->setValue($row['project_name']);
            $objSheet->getCell('C' . $i)->setValue($row['pt_name']);
            $objSheet->getCell('D' . $i)->setValue($row['trainingname']);
            $objSheet->getCell('E' . $i)->setValue($row['batch']);
            $objSheet->getCell('F' . $i)->setValue($row['periode']);
            $objSheet->getCell('G' . $i)->setValue($row['vendor']);
            $objSheet->getCell('H' . $i)->setValue($tanggal);
            $objSheet->getCell('I' . $i)->setValue($timeDiff);
            $objSheet->getCell('J' . $i)->setValue($row['duration'] == '' ? $timeDiff2 : $row['duration']);
            $objSheet->getCell('K' . $i)->setValue($row['venue']);
            $objSheet->getCell('L' . $i)->setValue($row['total_cost']);
            $objSheet->getCell('M' . $i)->setValue($row['employee_name']);            
            $objPHPExcel->getActiveSheet()->getStyle('M' . $i)->getAlignment()->setWrapText(true);
            $objSheet->getCell('N' . $i)->setValue($row['sex']);
            $objSheet->getCell('O' . $i)->setValue($row['department_code']);
            $objSheet->getCell('P' . $i)->setValue($row['position_desc']);
            $objSheet->getCell('Q' . $i)->setValue($row['banding_code']);
            $objSheet->getCell('R' . $i)->setValue($row['total_register']);
            $objSheet->getCell('S' . $i)->setValue($row['certificate']);
            $objSheet->getCell('T' . $i)->setValue($closed);
            $objSheet->getCell('U' . $i)->setValue($row['type']);
               
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
        $filename = 'exporttraining';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

    //added by anas 22062022 | AMBIL DATA EXPORT SURVEY
    public function getdataSurvey($data) {
        $this->setup->_param = $data;
        // var_dump($data);exit();
        $this->setup->_storeprocedure = 'sp_report_training_survey_export'; 
        $this->setup->_paramsql = 'read';
        $result = $this->setup->executeSP(); 
        // var_dump($result);exit();
        // var_dump($result[0]);die();
        if(!empty($result[0])){
            return $result[0];
        }else{
            return null;
        }
      
    }

    //added by anas 22062022 | EXPORT REPORT SURVEY
    function exceldataSurvey($data) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();
         
        $result = $this->getdataSurvey($data);
        // var_dump($result);exit();
    
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setTitle("title")
                ->setDescription("description");

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        // rename the sheet
        $objSheet->setTitle('Training Survey Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:U1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Project');
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('Training Name');
        $objSheet->getCell('E1')->setValue('Department');
        $objSheet->getCell('F1')->setValue('Employee Name');
        $objSheet->getCell('G1')->setValue('Nilai');
        $objSheet->getCell('H1')->setValue('Nilai Post');
        $objSheet->getCell('I1')->setValue('Category');
        $objSheet->getCell('J1')->setValue('Survey');
        $objSheet->getCell('K1')->setValue('Survey Value');

        $i = 1;
        $no = 0;
        $no_index = 0;
        $lastname ='';
        $lastdept ='';
        $lasttname ='';

        $temp_data = $result;
        end($temp_data);
        $last_key = key($temp_data);

        foreach ($result as $key => $row) {
            $i++;

            if ($row['training_name'] != $lasttname && $no >0) {

                // if($lasttname){
                // }

                $i++;
                $list = $i-1;
                $objSheet->getStyle('D' .$list. ':K' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');               
            }

             if ($row['department_code'] != $lastdept && $no >0) {

                // if($lastdept){
                // }

                // $i++;
                // $list = $i-1;
                // $objSheet->getStyle('E' .$list. ':K' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
               
            }

            if ($row['employee_name'] != $lastname && $no >0) {

                // if($lastname){
                // }

                $i++;
                // $list = $i-1;                
                // $objSheet->getStyle('F' .$list. ':K' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                
                $objSheet->getCell('A' . $i)->setValue('');
                $objSheet->getCell('B' . $i)->setValue('');
                $objSheet->getCell('C' . $i)->setValue('');
                $objSheet->getCell('D' . $i)->setValue('');
                $objSheet->getCell('E' . $i)->setValue('');
                $objSheet->getCell('F' . $i)->setValue('');
                $objSheet->getCell('G' . $i)->setValue('');
                $objSheet->getCell('H' . $i)->setValue('');
                $objSheet->getCell('I' . $i)->setValue('');
                $objSheet->getCell('J' . $i)->setValue('');
                $objSheet->getCell('K' . $i)->setValue('');               
            }

            if($row['training_name'] == $lasttname){
                $objSheet->getCell('D' . $i)->setValue("");
            }else{
                $objSheet->getCell('D' . $i)->setValue(strtoupper($row['training_name']));
            }

            if($row['department_code'] == $lastdept){
                $objSheet->getCell('E' . $i)->setValue("");
            }else{
                $objSheet->getCell('E' . $i)->setValue(strtoupper($row['department_code']));
            }

            if($row['employee_name'] == $lastname){
                $objSheet->getCell('F' . $i)->setValue("");
            }else{
                $objSheet->getCell('F' . $i)->setValue($row['employee_name']);
            }

            $objSheet->getCell('B' . $i)->setValue($row['project_name']);
            $objSheet->getCell('c' . $i)->setValue($row['pt_name']);
            // $objSheet->getCell('D' . $i)->setValue(strtoupper($row['training_name']));
            // $objSheet->getCell('E' . $i)->setValue(strtoupper($row['department_code']));
            // $objSheet->getCell('F' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('G' . $i)->setValue($row['nilai']);
            $objSheet->getCell('H' . $i)->setValue($row['nilai_post']);
            $objSheet->getCell('I' . $i)->setValue($row['trainingsurveycategory']);
            $objSheet->getCell('J' . $i)->setValue($row['trainingsurvey']);
            $objSheet->getCell('K' . $i)->setValue($row['trainingsurvey_value']);            
            $objPHPExcel->getActiveSheet()->getStyle('K' . $i)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

            $no++;
            $lastdept = $row['department_code'];
            $lastname = $row['employee_name'];
            $lasttname = $row['training_name'];

            $objSheet->getCell('A' . $i)->setValue($no);

            if($last_key == $key){
                $i++;
                $objSheet->getStyle('A' . $i . ':K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');

            }

        }

        $objSheet->getColumnDimension('A')->setAutoSize(true);
        $objSheet->getColumnDimension('B')->setAutoSize(true);
        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('D')->setAutoSize(true);
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('F')->setAutoSize(true);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exporttrainingsurvey';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);        
    }

    //added by anas 23062022 | GET DATA PERTANYAAN SURVEY
    public function getDataTrainingSurvey($params) {  
        $hasil = $this->dbTable->SPExecute('sp_all_trainingsurvey', 
            $params['project_project_id'],
            $params['pt_pt_id']
        );

        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    //added by anas 23062022 | GET DATA SURVEY VALUE
    public function getDataSurveyValue($params) {  
        $hasil = $this->dbTable->SPExecute('sp_all_trainingsurvey_value', 
            $params['start_date'],
            $params['end_date']
        );

        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    //added by anas 23062022 | GET LIST KARYAWAN
    public function getDataEmployeeSurvey($params) { 
        $hasil = $this->dbTable->SPExecute('sp_report_training_survey_export_2', 
            $params['project_project_id'],
            $params['pt_pt_id'],
            $params['employee_id'],
            $params['department_id'],
            $params['start_date'],
            $params['end_date'],
            $params['close']
        );

        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    //added by anas 23062022 | EXPORT DENGAN PERTANYAAN SURVEY KE SAMPING
    function exceldataSurvey2($data) {
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
        require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
        $this->createFolder();

        $trainingsurvey = $this->getDataTrainingSurvey($data);
        $trainingsurvey_value = $this->getDataSurveyValue($data);
        $dataempsurvey = $this->getDataEmployeeSurvey($data);
        $temp = array();
    
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->getProperties()->setTitle("title")->setDescription("description");

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        // rename the sheet
        $objSheet->setTitle('Training Survey Report');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4

        // write header
        $objSheet->getCell('A1')->setValue('No.');
        $objSheet->getCell('B1')->setValue('Project');
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('Training Name');
        $objSheet->getCell('E1')->setValue('Department');
        $objSheet->getCell('F1')->setValue('Employee Name');
        $objSheet->getCell('G1')->setValue('Nilai');
        $objSheet->getCell('H1')->setValue('Nilai Post');

        // $objSheet->getCell('I1')->setValue('Category');
        // $objSheet->getCell('J1')->setValue('Survey');
        // $objSheet->getCell('K1')->setValue('Survey Value');

        $row = 1; // 1-based index
        $col = 8;
        //looping pertanyaan survey ke samping
        foreach($trainingsurvey as $key => $value) {
            $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $row, $value['trainingsurvey']);
            $col++;
        }

        //tampung survey value per employee_id dan trainingattendance_id
        foreach($dataempsurvey as $key => $item){
            $temp[$key] = $item;

            foreach($trainingsurvey_value as $key_value => $item_value){
                if(($item_value['employee_id'] == $item['employee_id']) && ($item_value['trainingattendance_id'] == $item['trainingattendance_id'])){
                    $temp[$key]['value'][] = $item_value['trainingsurvey_value'];
                }
            }
        }

        $highestColumn = $objPHPExcel->getActiveSheet()->getHighestColumn();
        $objSheet->getStyle('A1:'.$highestColumn.'1')->getFont()->setBold(true)->setSize(12);
        $highestColumn_index = PHPExcel_Cell::columnIndexFromString($objPHPExcel->getActiveSheet()->getHighestColumn());        

        $i = 2;
        $no = 1;

        foreach ($temp as $key => $row) {            

            $objSheet->getCell('A' . $i)->setValue($no);
            $objSheet->getCell('B' . $i)->setValue($row['project_name']);
            $objSheet->getCell('c' . $i)->setValue($row['pt_name']);
            $objSheet->getCell('D' . $i)->setValue(strtoupper($row['training_name']));
            $objSheet->getCell('E' . $i)->setValue(strtoupper($row['department_code']));
            $objSheet->getCell('F' . $i)->setValue($row['employee_name']);
            $objSheet->getCell('G' . $i)->setValue($row['nilai']);
            $objSheet->getCell('H' . $i)->setValue($row['nilai_post']);

            $col2 = 0;
            for ($col = 8; $col <= $highestColumn_index; $col++) {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $i, $row['value'][$col2]);
                $col2++;
            }

            $i++;
            $no++;            
        }

        $objSheet->getColumnDimension('A')->setAutoSize(true);
        $objSheet->getColumnDimension('B')->setAutoSize(true);
        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('D')->setAutoSize(true);
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('F')->setAutoSize(true);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exporttrainingsurvey';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);        
    }
}
