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
require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';

class Hrd_Models_Report_AbsentReport {

    private $fileResult;
    private $objPHPExcel;
    private $url;
    private $setup;
    private $tmp_table;

    function __construct() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->tmp_rptharian = '##tmp_rptabsenharian_' . $this->setup->_user_id;
        $this->destination = getcwd() . '/app/hrd/uploads/absent/';
        $this->httpdirect = 'app/hrd/uploads/absent/';
    }

    function createFolder($param) {
        if (!file_exists($this->destination . "/$param/")) {
            mkdir($this->destination . "/$param/", 0777, true);
        }
    }  
    
    
    public function getparameterlate() {
        $rowlate1start = $this->setup->get_t_generalparameterprojectptby_moduleandname('overtimeparameter', 'late_category_1_start');
        $rowlate1end = $this->setup->get_t_generalparameterprojectptby_moduleandname('overtimeparameter', 'late_category_1_end');
        $rowlate2start = $this->setup->get_t_generalparameterprojectptby_moduleandname('overtimeparameter', 'late_category_2_start');
        $rowlate2end = $this->setup->get_t_generalparameterprojectptby_moduleandname('overtimeparameter', 'late_category_2_end');
        $rowlate3start = $this->setup->get_t_generalparameterprojectptby_moduleandname('overtimeparameter', 'late_category_3');
        
        return array(
                        "late_1_start"=>$rowlate1start['value'],
                        "late_1_end"=>$rowlate1end['value'],
                        "late_2_start"=>$rowlate2start['value'],
                        "late_2_end"=>$rowlate2end['value'],
                        "late_3_start"=>$rowlate3start['value'],
                );        
        
    }

    public function create_excel_rpt_harian($params,$data) {
        if ($data) {            
            $folder ='daily';            
            $reportname = 'absentdailyreport';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 
            $parameterlate = $this->getparameterlate();
            
          
            $late1start = $parameterlate['late_1_start'];
            $late1end = $parameterlate['late_1_end'];
            $late3start = $parameterlate['late_3_start'];
            
            $inminutes= DateInterval::createFromDateString($late1end.' minutes');  
            
            $late1_start = str_pad($parameterlate['late_1_start'],2,'0',STR_PAD_LEFT);
            $late1_start = str_pad($late1_start,6,'0',STR_PAD_BOTH);
            
            $late1_end = str_pad($parameterlate['late_1_end'],2,'0',STR_PAD_LEFT);
            $late1_end = str_pad($late1_end,6,'0',STR_PAD_BOTH);
          
            $late2_start = str_pad($parameterlate['late_2_start'],2,'0',STR_PAD_LEFT);
            $late2_start = str_pad($late2_start,6,'0',STR_PAD_BOTH);
            
            $late2_end = str_pad($parameterlate['late_2_end'],2,'0',STR_PAD_LEFT);
            $late2_end = str_pad($late2_end,6,'0',STR_PAD_BOTH);
            
            $late3_start = str_pad($parameterlate['late_3_start'],2,'0',STR_PAD_LEFT);
            $late3_start = str_pad($late3_start,6,'0',STR_PAD_BOTH);
          
            
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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:L1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('DAILY ABSENT REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('H2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('I2')->setValue(': '.date('d/m/Y H:i:s'));
            $objSheet->getCell('H3')->setValue('USER PRINT');
            $objSheet->getCell('I3')->setValue(': '.$rowdefaultuser['user_fullname']);
          
       
            
            $objSheet->getCell('A6')->setValue('Department');
            $objSheet->getCell('B6')->setValue('Employee Name');
            $objSheet->getCell('C6')->setValue('Date');
            $objSheet->getCell('D6')->setValue('Day');
            $objSheet->getCell('E6')->setValue('Shift');
            $objSheet->getCell('F6')->setValue('Shift In');
            $objSheet->getCell('G6')->setValue('Shift Out');
            $objSheet->getCell('H6')->setValue('Time In');
            $objSheet->getCell('I6')->setValue('Time Out');
            $objSheet->getCell('J6')->setValue('Late');
            $objSheet->getCell('K6')->setValue('Attn. Hours');
            $objSheet->getCell('L6')->setValue('Desription');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 6;
            $no = 0;
            $lastname =null;
            $lastdept =null;
            foreach ($data as $row) {
                $i++;
                
                if ($row['department'] != $lastdept && $no >0) {
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':L' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
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
                    $objSheet->getCell('L' . $i)->setValue('');
                   
                }
                
                /*
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':J' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
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
                } */     
                               
                $type_shift = $row['shifttype'];
                $shift_out = $row['shift_out'];
                $description = $row['description'];                
                $filterlate = date('His',strtotime($row['tanggal'] . ' ' . $row['late']));
                $filtershift_out = date('His',strtotime($row['tanggal'] . ' ' . $shift_out));
                $filtertimeout = date('His',strtotime($row['tanggal'] . ' ' . $row['time_out']));
                
                if ($type_shift !== 'OFF') {
                   // if ($filterlate > '000000' && $filterlate <= '000500') {
                    if ($filterlate > $late1_start && $filterlate <= $late1_end) {
                        $objSheet->getStyle('C' . $i . ':H' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                    }
                    //if ($filterlate >= '000500' && $filterlate <= '020000') {
                    if ($filterlate >= $late2_start && $filterlate <= $late2_end) {
                        $objSheet->getStyle('C' . $i . ':H' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');
                    }
                    
                    if ($filterlate >= $late3_start && $description !== 'C-THN') {
                        $objSheet->getStyle('C' . $i . ':H' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ff0000');
                    }
                    if (empty($description)) {
                        if (!empty($row['time_in']) || !empty($row['time_out'])) {
                            if ($filtertimeout < $filtershift_out) {
                                $shift_out = $filtershift_out;
                                $out = $filtertimeout;
                                $late_out= (strtotime($shift_out) - strtotime($out)) / 3600;                                
                                 if ($late_out >= 2 && $late_out <= 8.9 && $description !== 'C-THN') {
                                    $color_rbg ='ff0000'; 
                                 }else{
                                     $color_rbg ='e6ffff'; 
                                 }                                
                                $objSheet->getStyle('I' . $i . ':I' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB($color_rbg);
                            }
                        }
                    }
                }




                if($row['department'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department']));
                }
                
                
                if($row['employee_name'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");
                }else{
                    $objSheet->getCell('B' . $i)->setValue(strtoupper($row['employee_name']));
                }
                
                //$objSheet->getCell('B' . $i)->setValue(strtoupper($row['employee_name']));
                $objSheet->getCell('C' . $i)->setValue(date('d/m/Y', strtotime($row['tanggal'])));
                $objSheet->getCell('D' . $i)->setValue($row['hari']);
                $objSheet->getCell('E' . $i)->setValue($row['shiftcode']);
                $objSheet->getCell('F' . $i)->setValue($row['shift_in']);
                $objSheet->getCell('G' . $i)->setValue($row['shift_out']);
                $objSheet->getCell('H' . $i)->setValue($row['time_in']);
                $objSheet->getCell('I' . $i)->setValue($row['time_out']);
                $objSheet->getCell('J' . $i)->setValue($row['late']);
                $objSheet->getCell('K' . $i)->setValue($row['total_hours']);
                $objSheet->getCell('L' . $i)->setValue($description);
                
                $objPHPExcel->getActiveSheet()
                    ->getStyle('D' . $i . ':K' . $i)
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                
                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department'];
            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A6:L' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:L' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:L6')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A6:L6')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

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
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }

    public function create_excel_rpt_harianmhl($params,$data) {
        if ($data) {            

            $folder ='daily';            
            $reportname = 'absentdailymhl';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 
            $parameterlate = $this->getparameterlate();
            
          
            $late1start = $parameterlate['late_1_start'];
            $late1end = $parameterlate['late_1_end'];
            $late3start = $parameterlate['late_3_start'];
            
            $inminutes= DateInterval::createFromDateString($late1end.' minutes');  
            
            $late1_start = str_pad($parameterlate['late_1_start'],2,'0',STR_PAD_LEFT);
            $late1_start = str_pad($late1_start,6,'0',STR_PAD_BOTH);
            
            $late1_end = str_pad($parameterlate['late_1_end'],2,'0',STR_PAD_LEFT);
            $late1_end = str_pad($late1_end,6,'0',STR_PAD_BOTH);
          
            $late2_start = str_pad($parameterlate['late_2_start'],2,'0',STR_PAD_LEFT);
            $late2_start = str_pad($late2_start,6,'0',STR_PAD_BOTH);
            
            $late2_end = str_pad($parameterlate['late_2_end'],2,'0',STR_PAD_LEFT);
            $late2_end = str_pad($late2_end,6,'0',STR_PAD_BOTH);
            
            $late3_start = str_pad($parameterlate['late_3_start'],2,'0',STR_PAD_LEFT);
            $late3_start = str_pad($late3_start,6,'0',STR_PAD_BOTH);
          
            
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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:L1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('DAILY ABSENT REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('H2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('I2')->setValue(': '.date('d/m/Y H:i:s'));
            $objSheet->getCell('H3')->setValue('USER PRINT');
            $objSheet->getCell('I3')->setValue(': '.$rowdefaultuser['user_fullname']);
          
       
            
            $objSheet->getCell('A6')->setValue('Department');
            $objSheet->getCell('B6')->setValue('Employee Name');
            $objSheet->getCell('C6')->setValue('Date');
            $objSheet->getCell('D6')->setValue('Day');
            $objSheet->getCell('E6')->setValue('Shift');
            $objSheet->getCell('F6')->setValue('Time In');
            $objSheet->getCell('G6')->setValue('Time Out');
            $objSheet->getCell('H6')->setValue('Attn. Hours');
            $objSheet->getCell('I6')->setValue('Late');
            $objSheet->getCell('J6')->setValue('Pulang Cepat');
            $objSheet->getCell('K6')->setValue('Lost Time');
            $objSheet->getCell('L6')->setValue('Desription');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 6;
            $no = 0;
            $lastname =null;
            $lastdept =null;

            // added by Michael 2021.07.05 (tambahan total late, hours, losttime)
            $last_totallost =null;
            $last_totaltotalhours =null;
            $last_totallate =null;
            $last_totalpulangcepat =null;
            $desc_potong_cuti = null;
            $avg_losttime = null;
            $normal_hadir = null;
            
            $temp_data = $data;
            end($temp_data);
            $last_key = key($temp_data);
            // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)

            foreach ($data as $key => $row) {
                $i++;
                
                if ($row['department'] != $lastdept && $no >0) {

                    // added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                    if($lastdept){
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                            ->getStyle('D' . $i . ':L' . $i)
                            ->getAlignment()
                            ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue(strtoupper('Total'));

                        $objSheet->getCell('H' . $i)->setValue($last_totaltotalhours);
                        $objSheet->getCell('I' . $i)->setValue($last_totallate);
                        $objSheet->getCell('J' . $i)->setValue($last_totalpulangcepat);
                        $objSheet->getCell('K' . $i)->setValue($last_totallost);

                        //added by michael 2023-08-25 | penambahan average
                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $i++;
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                                ->getStyle('D' . $i . ':L' . $i)
                                ->getAlignment()
                                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue('AVERAGE (Total Lost Time ('.$last_totallost.') / Shift Periode exclude OFF ('.$normal_hadir.' hari)');
                        $objSheet->getCell('K' . $i)->setValue($avg_losttime);
                        $objSheet->getCell('L' . $i)->setValue($desc_potong_cuti);
                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $last_totallost = null;
                        $last_totaltotalhours =null;
                        $last_totallate =null;
                        $desc_potong_cuti = null;
                        $avg_losttime = null;
                        $normal_hadir = null;

                        $i++;
                        $i++;
                    }
                    // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)

                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':L' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
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
                    $objSheet->getCell('L' . $i)->setValue('');
                   
                }
                
                /*
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':K' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
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
                  */

                if ($row['employee_name'] != $lastname && $row['department'] == $lastdept && $no >0) {

                        if($lastname){

                            $last_totallost = $data[$key-1]['total_lost'];
                            $last_totaltotalhours = $data[$key-1]['total_total_hours'];
                            $last_totallate = $data[$key-1]['total_late'];
                            $last_totalpulangcepat = $data[$key-1]['total_pulang_cepat'];

                            $desc_potong_cuti = null;
                            $normal_hadir = $data[$key-1]['normal_hadir'];
                            $avg_losttime = $data[$key-1]['avg_lost_jam'].':'.$data[$key-1]['avg_lost_menit'].':'.$data[$key-1]['avg_lost_detik'];

                            $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                            $objPHPExcel->getActiveSheet()
                                ->getStyle('D' . $i . ':L' . $i)
                                ->getAlignment()
                                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                            $objSheet->getCell('B' . $i)->setValue(strtoupper('Total'));

                            $objSheet->getCell('H' . $i)->setValue($last_totaltotalhours);
                            $objSheet->getCell('I' . $i)->setValue($last_totallate);
                            $objSheet->getCell('J' . $i)->setValue($last_totalpulangcepat);
                            $objSheet->getCell('K' . $i)->setValue($last_totallost);
                            // $objSheet->getCell('L' . $i)->setValue($desc_potong_cuti);

                            $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                            $i++;
                            $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                            $objPHPExcel->getActiveSheet()
                                ->getStyle('D' . $i . ':L' . $i)
                                ->getAlignment()
                                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                            $objSheet->getCell('B' . $i)->setValue('AVERAGE (Total Lost Time ('.$last_totallost.') / Shift Periode exclude OFF ('.$normal_hadir.' hari)');
                            $objSheet->getCell('K' . $i)->setValue($avg_losttime);
                            $objSheet->getCell('L' . $i)->setValue($desc_potong_cuti);
                            $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                            $last_totallost = null;
                            $last_totaltotalhours =null;
                            $last_totallate =null;
                            $desc_potong_cuti = null;
                            $avg_losttime = null;
                            $normal_hadir = null;

                            $i++;
                            $i++;
                        }
                        // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                       
                }
                
                $type_shift = $row['shifttype'];
                $shift_out = $row['shift_out'];
                $description = $row['description'];                
                $filterlate = date('His',strtotime($row['tanggal'] . ' ' . $row['late']));
                $filtershift_out = date('His',strtotime($row['tanggal'] . ' ' . $shift_out));
                $filtertimeout = date('His',strtotime($row['tanggal'] . ' ' . $row['time_out']));
                
                if ($type_shift !== 'OFF') {
                   // if ($filterlate > '000000' && $filterlate <= '000500') {
                    if ($filterlate > $late1_start && $filterlate <= $late1_end) {
                        $objSheet->getStyle('C' . $i . ':F' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                    }
                    //if ($filterlate >= '000500' && $filterlate <= '020000') {
                    if ($filterlate >= $late2_start && $filterlate <= $late2_end) {
                        $objSheet->getStyle('C' . $i . ':F' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');
                    }
                    
                    if ($filterlate >= $late3_start && $description !== 'C-THN') {
                        $objSheet->getStyle('C' . $i . ':F' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ff0000');
                    }
                    if (empty($description)) {
                        if (!empty($row['time_in']) || !empty($row['time_out'])) {
                            if ($filtertimeout < $filtershift_out) {
                                $shift_out = $filtershift_out;
                                $out = $filtertimeout;
                                $late_out= (strtotime($shift_out) - strtotime($out)) / 3600;                                
                                 if ($late_out >= 2 && $late_out <= 8.9 && $description !== 'C-THN') {
                                    $color_rbg ='ff0000'; 
                                 }else{
                                     $color_rbg ='e6ffff'; 
                                 }                                
                                $objSheet->getStyle('G' . $i . ':G' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB($color_rbg);
                            }
                        }
                    }
                }




                if($row['department'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department']));
                }
                
                
                if($row['employee_name'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");

                    // added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                    $last_totallost = $row['total_lost'];
                    $last_totaltotalhours = $row['total_total_hours'];
                    $last_totallate = $row['total_late'];
                    $last_totalpulangcepat = $row['total_pulang_cepat'];
                    // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)

                    $desc_potong_cuti = null;
                    $normal_hadir = $row['normal_hadir'];
                    $avg_losttime = $row['avg_lost_jam'].':'.$row['avg_lost_menit'].':'.$row['avg_lost_detik'];

                }else{
                    // added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                    if($lastname && $last_totaltotalhours){
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                            ->getStyle('D' . $i . ':L' . $i)
                            ->getAlignment()
                            ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue(strtoupper('Total'));

                        $objSheet->getCell('H' . $i)->setValue($last_totaltotalhours);
                        $objSheet->getCell('I' . $i)->setValue($last_totallate);
                        $objSheet->getCell('J' . $i)->setValue($last_totalpulangcepat);
                        $objSheet->getCell('K' . $i)->setValue($last_totallost);

                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $i++;
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                                ->getStyle('D' . $i . ':L' . $i)
                                ->getAlignment()
                                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue('AVERAGE (Total Lost Time ('.$last_totallost.') / Shift Periode exclude OFF ('.$normal_hadir.' hari)');
                        $objSheet->getCell('K' . $i)->setValue($avg_losttime);
                        $objSheet->getCell('L' . $i)->setValue($desc_potong_cuti);
                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $last_totallost = null;
                        $last_totaltotalhours =null;
                        $last_totallate =null;
                        $last_totalpulangcepat =null;
                        $desc_potong_cuti = null;
                        $avg_losttime = null;
                        $normal_hadir = null;

                        $i++;
                        $i++;
                    }
                    // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                    $objSheet->getCell('B' . $i)->setValue(strtoupper($row['employee_name']));
                }
                
                //$objSheet->getCell('B' . $i)->setValue(strtoupper($row['employee_name']));
                $objSheet->getCell('C' . $i)->setValue(date('d/m/Y', strtotime($row['tanggal'])));
                $objSheet->getCell('D' . $i)->setValue($row['hari']);
                $objSheet->getCell('E' . $i)->setValue($row['shiftcode']);
                $objSheet->getCell('F' . $i)->setValue($row['time_in']);
                $objSheet->getCell('G' . $i)->setValue($row['time_out']);
                $objSheet->getCell('H' . $i)->setValue($row['total_hours']);
                $objSheet->getCell('I' . $i)->setValue($row['late']);
                $objSheet->getCell('J' . $i)->setValue($row['pulang_cepat']);
                $objSheet->getCell('K' . $i)->setValue($row['time_lost']);
                $objSheet->getCell('L' . $i)->setValue($description);
                
                $objPHPExcel->getActiveSheet()
                    ->getStyle('D' . $i . ':L' . $i)
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                
                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department'];

                // added by Michael 2021.07.05 (tambahan total late, hours, losttime)
                if($last_key == $key){

                        $desc_potong_cuti = null;
                        $normal_hadir = $row['normal_hadir'];
                        $avg_losttime = $row['avg_lost_jam'].':'.$row['avg_lost_menit'].':'.$row['avg_lost_detik'];

                        $i++;
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                            ->getStyle('D' . $i . ':L' . $i)
                            ->getAlignment()
                            ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue(strtoupper('Total'));

                        $objSheet->getCell('H' . $i)->setValue($last_totaltotalhours);
                        $objSheet->getCell('I' . $i)->setValue($last_totallate);
                        $objSheet->getCell('J' . $i)->setValue($last_totalpulangcepat);
                        $objSheet->getCell('K' . $i)->setValue($last_totallost);

                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $i++;
                        $objSheet->getStyle('A' . $i . ':L' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                        $objPHPExcel->getActiveSheet()
                                ->getStyle('D' . $i . ':L' . $i)
                                ->getAlignment()
                                ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                        $objSheet->getCell('B' . $i)->setValue('AVERAGE (Total Lost Time ('.$last_totallost.') / Shift Periode exclude OFF ('.$normal_hadir.' hari)');
                        $objSheet->getCell('K' . $i)->setValue($avg_losttime);
                        $objSheet->getCell('L' . $i)->setValue($desc_potong_cuti);
                        $objSheet->getStyle('K' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');

                        $last_totallost = null;
                        $last_totaltotalhours =null;
                        $last_totallate =null;
                        $last_totalpulangcepat =null;
                        $desc_potong_cuti = null;
                        $avg_losttime = null;
                        $normal_hadir = null;

                    }
                // end added by Michael 2021.07.05 (tambahan total late, hours, losttime)
            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A6:L' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:L' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:L6')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A6:L6')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

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
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }
   

    function sum_the_time($time1, $time2) {
      $times = array($time1, $time2);
      $seconds = 0;
      foreach ($times as $time)
      {
        list($hour,$minute,$second) = explode(':', $time);
        $seconds += $hour*3600;
        $seconds += $minute*60;
        $seconds += $second;
      }
      $hours = floor($seconds/3600);
      $seconds -= $hours*3600;
      $minutes  = floor($seconds/60);
      $seconds -= $minutes*60;
      
      return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds); 
    }
   

    //added by Michael 2021.08.24
    public function create_excel_rpt_sickleave($params,$data) {
        if ($data) {            

            $folder ='sickleave';            
            $reportname = 'sickleave';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 
            
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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:G1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('SICK LEAVE REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('H2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('I2')->setValue(': '.date('d/m/Y H:i:s'));
            $objSheet->getCell('H3')->setValue('USER PRINT');
            $objSheet->getCell('I3')->setValue(': '.$rowdefaultuser['user_fullname']);
          
       
            
            $objSheet->getCell('A6')->setValue('Department');
            $objSheet->getCell('B6')->setValue('NIK');
            $objSheet->getCell('C6')->setValue('Employee Name');
            $objSheet->getCell('D6')->setValue('Date');
            $objSheet->getCell('E6')->setValue('Weekday');
            $objSheet->getCell('F6')->setValue('Shift');
            $objSheet->getCell('G6')->setValue('Desription');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 6;
            $no = 0;
            $lastname =null;
            $lastdept =null;

            foreach ($data as $key => $row) {
                $i++;
                
                if ($row['department'] != $lastdept && $no >0) {

                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':G' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                   
                }
                
                
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':G' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue(''); 
                }      


                if($row['department'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department']));
                }
                
                
                if($row['nik_group'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");

                }else{
                    $objSheet->getCell('B' . $i)->setValue($row['nik_group']);
                }
                
                $objSheet->getCell('C' . $i)->setValue(strtoupper($row['employee_name']));
                $objSheet->getCell('D' . $i)->setValue($row['tanggal']);
                $objSheet->getCell('E' . $i)->setValue($row['hari']);
                $objSheet->getCell('F' . $i)->setValue($row['code']);
                $objSheet->getCell('G' . $i)->setValue($row['description']);
                
                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department'];

            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A6:G' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:G' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:G6')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A6:G6')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // autosize the columns
            $objSheet->getColumnDimension('A')->setAutoSize(true);
            $objSheet->getColumnDimension('B')->setAutoSize(true);
            $objSheet->getColumnDimension('C')->setAutoSize(true);
            $objSheet->getColumnDimension('D')->setAutoSize(true);
            $objSheet->getColumnDimension('E')->setAutoSize(true);
            $objSheet->getColumnDimension('F')->setAutoSize(true);
            $objSheet->getColumnDimension('G')->setAutoSize(true);

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }

    public function create_excel_rpt_sickleaveattach($params,$data) {
        if ($data) {            

            $folder ='sickleaveattach';            
            $reportname = 'sickleaveattach';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 

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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:H1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('SICK LEAVE REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('E2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('F2')->setValue(':');
            $objSheet->getCell('G2')->setValue(date('d/m/Y H:i:s'));
            $objSheet->getCell('E3')->setValue('USER PRINT');
            $objSheet->getCell('F3')->setValue(':');
            $objSheet->getCell('G3')->setValue($rowdefaultuser['user_fullname']);
          
       
            
            $objSheet->getCell('A6')->setValue('Department');
            $objSheet->getCell('B6')->setValue('NIK');
            $objSheet->getCell('C6')->setValue('Employee Name');
            $objSheet->getCell('D6')->setValue('Date');
            $objSheet->getCell('E6')->setValue('Weekday');
            $objSheet->getCell('F6')->setValue('Shift');
            $objSheet->getCell('G6')->setValue('Desription');
            $objSheet->getCell('H6')->setValue('Attachment');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 6;
            $no = 0;
            $lastname =null;
            $lastdept =null;

            foreach ($data as $key => $row) {
                $i++;
                
                if ($row['department'] != $lastdept && $no >0) {

                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                    $objSheet->getCell('H' . $i)->setValue('');
                   
                }
                
                
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue(''); 
                    $objSheet->getCell('H' . $i)->setValue(''); 
                }      

                if($row['department'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department']));
                }
                
                
                if($row['nik_group'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");

                }else{
                    $objSheet->getCell('B' . $i)->setValue($row['nik_group']);
                }
                
                $objSheet->getCell('C' . $i)->setValue(strtoupper($row['employee_name']));
                $objSheet->getCell('D' . $i)->setValue($row['tanggal']);
                $objSheet->getCell('E' . $i)->setValue($row['hari']);
                $objSheet->getCell('F' . $i)->setValue($row['code']);
                $objSheet->getCell('G' . $i)->setValue($row['description']);
                
                //localhost
                $logo = $_SERVER["DOCUMENT_ROOT"]."/webapps/public/app/hrd/uploads/sakit/". $row['attachment'];
                        
                //server test
                // $logo = $_SERVER["DOCUMENT_ROOT"]."/../webapps-hcms/public/app/hrd/uploads/sakit/". $row['attachment'];
                        
                //server live
                // $logo = $_SERVER["DOCUMENT_ROOT"]."/../webapps/Ciputra/public/app/hrd/uploads/sakit/". $row['attachment'];
                if($row['is_image'] == 'yes' && $row['is_image']){
                    // $gdImage = imagecreatefromjpeg($logo);
                    $gdImage = imagecreatefromjpeg($row['link']);
                    $objDrawing = new PHPExcel_Worksheet_MemoryDrawing();
                    $objDrawing->setImageResource($gdImage);
                    $objDrawing->setRenderingFunction(PHPExcel_Worksheet_MemoryDrawing::RENDERING_JPEG);
                    $objDrawing->setMimeType(PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_DEFAULT);
                    $objDrawing->setWidth(50);
                    $objDrawing->setHeight(50);
                    $objDrawing->setOffsetX(15);
                    $objDrawing->setOffsetY(5);
                    $objDrawing->setCoordinates('H' . $i);
                    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

                    $objSheet->getRowDimension($i)->setRowHeight(45);
                }else{
                    $objSheet->getCell('H' . $i)->setValue($row['link']);
                }

                // $objDrawing->setWorksheet($objSheet);
                // $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department'];

            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A6:H' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:H' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:H6')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A6:H6')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // autosize the columns
            $objSheet->getColumnDimension('A')->setAutoSize(true);
            $objSheet->getColumnDimension('B')->setAutoSize(true);
            $objSheet->getColumnDimension('C')->setAutoSize(true);
            $objSheet->getColumnDimension('D')->setAutoSize(true);
            $objSheet->getColumnDimension('E')->setAutoSize(true);
            $objSheet->getColumnDimension('F')->setAutoSize(true);
            $objSheet->getColumnDimension('G')->setAutoSize(true);
            $objSheet->getColumnDimension('H')->setAutoSize(true);
            
            // for ($j = 7; $j <= $i; $j ++) {
            //   $objSheet->getRowDimension($j)->setRowHeight(50);
            // }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }

    //added by michael 2021.11.22
    public function create_excel_rpt_sanksiketerlambatan($params,$data) {
        if ($data) {            

            $folder ='sanksi';            
            $reportname = 'sanksi';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 

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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:H1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('SANKSI KETERLAMBATAN REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('E2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('F2')->setValue(':');
            $objSheet->getCell('G2')->setValue(date('d/m/Y H:i:s'));
            $objSheet->getCell('E3')->setValue('USER PRINT');
            $objSheet->getCell('F3')->setValue(':');
            $objSheet->getCell('G3')->setValue($rowdefaultuser['user_fullname']);

            $styleArray = array(
            'font'  => array(
                'color' => array('rgb' => 'AA4A44')
            ));
            $objSheet->getCell('G6')->setValue('*Amount Leave adalah jumlah cuti yg dipotong karena keterlambatan');
            $objSheet->getStyle('G6')->applyFromArray($styleArray);
            
            $objSheet->getCell('A8')->setValue('Department');
            $objSheet->getCell('B8')->setValue('NIK');
            $objSheet->getCell('C8')->setValue('Employee Name');
            $objSheet->getCell('D8')->setValue('Month');
            $objSheet->getCell('E8')->setValue('Year');
            $objSheet->getCell('F8')->setValue('Amount Leave*');
            $objSheet->getCell('G8')->setValue('Desription');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 8;
            $no = 0;
            $lastname =null;
            $lastdept =null;

            foreach ($data as $key => $row) {
                $i++;
                
                if ($row['department_name'] != $lastdept && $no >0) {

                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                   
                }
                
                
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue(''); 
                }      

                if($row['department_name'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department_name']));
                }
                
                
                if($row['nik_group'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");

                }else{
                    $objSheet->getCell('B' . $i)->setValue($row['nik_group']);
                }
                
                $objSheet->getCell('C' . $i)->setValue(strtoupper($row['employee_name']));
                $objSheet->getCell('D' . $i)->setValue($row['periode_month_name']);
                $objSheet->getCell('E' . $i)->setValue($row['periode']);
                $objSheet->getCell('F' . $i)->setValue($row['duration']);
                $objSheet->getCell('G' . $i)->setValue($row['note']);

                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department_name'];

            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A8:G' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:G' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:G8')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A8:G8')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // autosize the columns
            $objSheet->getColumnDimension('A')->setAutoSize(true);
            $objSheet->getColumnDimension('B')->setAutoSize(true);
            $objSheet->getColumnDimension('C')->setAutoSize(true);
            $objSheet->getColumnDimension('D')->setAutoSize(true);
            $objSheet->getColumnDimension('E')->setAutoSize(true);
            $objSheet->getColumnDimension('F')->setAutoSize(true);
            $objSheet->getColumnDimension('G')->setAutoSize(true);
            
            // for ($j = 7; $j <= $i; $j ++) {
            //   $objSheet->getRowDimension($j)->setRowHeight(50);
            // }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }

    public function create_excel_rpt_permit($params,$data) {
        if ($data) {            

            $folder ='permit';            
            $reportname = 'permit';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata(); 

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
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:H1')->getFont()->setBold(true)->setSize(12);
            // write header
         
            $objSheet->getCell('D1')->setValue('PERMIT REPORT');
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);
            $objSheet->getCell('A4')->setValue('DEPARTMENT');
            $objSheet->getCell('B4')->setValue(': '.$params['department']);
            $objSheet->getCell('A5')->setValue('PERIODE');
            $objSheet->getCell('B5')->setValue(': '.$fromdate.' s/d '.$untildate);
            
            
            $objSheet->getCell('E2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('F2')->setValue(':');
            $objSheet->getCell('G2')->setValue(date('d/m/Y H:i:s'));
            $objSheet->getCell('E3')->setValue('USER PRINT');
            $objSheet->getCell('F3')->setValue(':');
            $objSheet->getCell('G3')->setValue($rowdefaultuser['user_fullname']);
            
            $objSheet->getCell('A8')->setValue('Department');
            $objSheet->getCell('B8')->setValue('NIK');
            $objSheet->getCell('C8')->setValue('Employee Name');
            $objSheet->getCell('D8')->setValue('Date');
            $objSheet->getCell('E8')->setValue('Weekday');
            $objSheet->getCell('F8')->setValue('Shift');
            $objSheet->getCell('G8')->setValue('Absent Type');
            $objSheet->getCell('H8')->setValue('Description');
            
            //added by wulan sari 20200606
            $date1 = date('Y-m-d',strtotime($params['start_date']));
            $date2 = date('Y-m-d',strtotime($params['end_date']));
            $date1 = date_create($date1);
            $date2 = date_create($date2);
            $diff_o = date_diff($date1,$date2);
            $diff = $diff_o->format("%d%");
            
            $i = 8;
            $no = 0;
            $lastname =null;
            $lastdept =null;

            foreach ($data as $key => $row) {
                $i++;
                
                if ($row['department_name'] != $lastdept && $no >0) {

                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                    $objSheet->getCell('H' . $i)->setValue('');
                   
                }
                
                
                if ($row['employee_name'] != $lastname && $no >0 && $diff >0) { // //added by wulan sari 20200606
                    
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':H' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue(''); 
                    $objSheet->getCell('H' . $i)->setValue(''); 
                }      

                if($row['department_name'] == $lastdept){
                    $objSheet->getCell('A' . $i)->setValue("");
                }else{
                    $objSheet->getCell('A' . $i)->setValue(strtoupper($row['department_name']));
                }
                
                
                if($row['employee_name'] == $lastname){
                    $objSheet->getCell('B' . $i)->setValue("");
                    $objSheet->getCell('C' . $i)->setValue("");

                }else{
                    $objSheet->getCell('B' . $i)->setValue($row['nik_group']);
                    $objSheet->getCell('C' . $i)->setValue(strtoupper($row['employee_name']));
                }
                
                $objSheet->getCell('D' . $i)->setValue($row['tanggal']);
                $objSheet->getCell('E' . $i)->setValue($row['hari']);
                $objSheet->getCell('F' . $i)->setValue($row['shift_code']);
                $objSheet->getCell('G' . $i)->setValue('('.$row['code'].') '.$row['absenttype']);
                $objSheet->getCell('H' . $i)->setValue($row['description']);

                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department_name'];

            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A8:H' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:H' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:H8')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A8:H8')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // autosize the columns
            $objSheet->getColumnDimension('A')->setAutoSize(true);
            $objSheet->getColumnDimension('B')->setAutoSize(true);
            $objSheet->getColumnDimension('C')->setAutoSize(true);
            $objSheet->getColumnDimension('D')->setAutoSize(true);
            $objSheet->getColumnDimension('E')->setAutoSize(true);
            $objSheet->getColumnDimension('F')->setAutoSize(true);
            $objSheet->getColumnDimension('G')->setAutoSize(true);
            $objSheet->getColumnDimension('H')->setAutoSize(true);
            
            // for ($j = 7; $j <= $i; $j ++) {
            //   $objSheet->getRowDimension($j)->setRowHeight(50);
            // }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }
    //end added by 2021.11.22

    //added by anas 21122021
    public function create_excel_rpt_harianmhl_rekap($params,$data) {
        if ($data) {            

            $folder ='daily';            
            $reportname = 'absentdailymhlrekap';
            $paramreport = $this->setup->_project_id . '_' . $this->setup->_pt_id;
            $this->createFolder($folder);
            $rowdefaultuser = $this->setup->getUserdata();           
            
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getProperties()->setTitle("title")->setDescription("description");

            // emaildata format, &euro; with < 0 being in red color
            $emaildataFormat = '#,#0.## \€;[Red]-#,#0.## \€';
            // number format, with thousands seperator and two decimal points.
            $numberFormat = '#,#0.##;[Red]-#,#0.##';

            // writer will create the first sheet for us, let's get it
            $objSheet = $objPHPExcel->getActiveSheet();
            // rename the sheet
            $objSheet->setTitle('export data ' . $reportname);
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:E1')->getFont()->setBold(true)->setSize(12);
            // write header
            
            //mergecells
            $objPHPExcel->getActiveSheet()->mergeCells('A1:E1');
            $objSheet->getCell('A1')->setValue('DAILY ABSENT REPORT (REKAP LOST TIME)');
            $objPHPExcel->getActiveSheet()->getStyle('A1')->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
            
            $fromdate = date('d/m/Y',strtotime($params['start_date']));
            $untildate = date('d/m/Y',strtotime($params['end_date']));
                        
            $objSheet->getCell('A2')->setValue('PROJECT');
            $objSheet->getCell('B2')->setValue(': '.$params['project_name']);
            $objSheet->getCell('A3')->setValue('PT');
            $objSheet->getCell('B3')->setValue(': '.$params['pt_name']);

            $objSheet->getCell('A4')->setValue('PERIODE');
            $objSheet->getCell('B4')->setValue(': '.$fromdate.' s/d '.$untildate);            
            
            $objSheet->getCell('D2')->setValue('PRINT DATE TIME');
            $objSheet->getCell('E2')->setValue(': '.date('d/m/Y H:i:s'));
            $objSheet->getCell('D3')->setValue('USER PRINT');
            $objSheet->getCell('E3')->setValue(': '.$rowdefaultuser['user_fullname']);

            $objSheet->getCell('A5')->setValue('TOTAL MHL');
            // $objSheet->getCell('B5')->setValue(': '.$params['total_total_lost']);     

            $objSheet->getCell('A6')->setValue('AVERAGE MHL');
            // $objSheet->getCell('B6')->setValue(': '.$params['total_rata']);     
            
            $objSheet->getCell('D5')->setValue('TOTAL EMPLOYEE');
            $objSheet->getCell('D6')->setValue('TOTAL PERIODE');

            $objSheet->getCell('A8')->setValue('NIK');
            $objSheet->getCell('B8')->setValue('Department');
            $objSheet->getCell('C8')->setValue('Employee Name');
            $objSheet->getCell('D8')->setValue('Total Lost Time');
            $objSheet->getCell('E8')->setValue('Avarage Lost Time');

            $i = 8;            
            
            $temp_data = $data;
            end($temp_data);
            $last_key = key($temp_data);

            foreach ($data as $key => $row) {
                $i++;
                
                $objSheet->getCell('A' . $i)->setValue($row['employee_id']);
                $objSheet->getCell('B' . $i)->setValue($row['department']);
                $objSheet->getCell('C' . $i)->setValue($row['employee_name']);
                $objSheet->getCell('D' . $i)->setValue(($row['total_lost']));
                $objSheet->getCell('E' . $i)->setValue(($row['rata']));

                if($last_key == $key){
                    $i++;
                    $objSheet->getStyle('A' . $i . ':E' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                    // $objSheet->getCell('C' . $i)->setValue(strtoupper('Total'));

                    // $objSheet->getCell('D' . $i)->setValue($row['total_total_lost']);

                    //update data header
                    $objSheet->getCell('B5')->setValue(': '.$row['total_total_lost']);  
                    $objSheet->getCell('B6')->setValue(': '.$row['total_rata']); 
                    $objSheet->getCell('E5')->setValue(': '.$row['total_emp']);  
                    $objSheet->getCell('E6')->setValue(': '.$row['total_periode']); 
                }
            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A8:E' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:E' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A8:E8')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A8:E8')
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // autosize the columns
            $objSheet->getColumnDimension('A')->setAutoSize(true);
            $objSheet->getColumnDimension('B')->setAutoSize(true);
            $objSheet->getColumnDimension('C')->setAutoSize(true);
            $objSheet->getColumnDimension('D')->setAutoSize(true);
            $objSheet->getColumnDimension('E')->setAutoSize(true);
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }
}
