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

class Hrd_Models_Report_AbsentReport_11082017 {

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

    public function create_excel_rpt_harian($params,$data) {
        if ($data) {            
            $folder ='daily';            
            $reportname = 'absentdailyreport';
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
            $objSheet->getStyle('A1:I1')->getFont()->setBold(true)->setSize(12);
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
            $objSheet->getCell('I2')->setValue(': '.date('d-m-Y H:i:s'));
            $objSheet->getCell('H3')->setValue('USER PRINT');
            $objSheet->getCell('I3')->setValue(': '.$rowdefaultuser['user_fullname']);
          
       
            
            $objSheet->getCell('A6')->setValue('Department');
            $objSheet->getCell('B6')->setValue('Employee Name');
            $objSheet->getCell('C6')->setValue('Date');
            $objSheet->getCell('D6')->setValue('Day');
            $objSheet->getCell('E6')->setValue('Shift');
            $objSheet->getCell('F6')->setValue('Time In');
            $objSheet->getCell('G6')->setValue('Time Out');
            $objSheet->getCell('H6')->setValue('Late');
            $objSheet->getCell('I6')->setValue('Desription');
            

            $i = 6;
            $no = 0;
            $lastname ='';
            $lastdept ='';
            foreach ($data as $row) {
                $i++;
                
                if ($row['department'] != $lastdept && $no >0) {
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' .$list. ':I' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                    $objSheet->getCell('H' . $i)->setValue('');
                    $objSheet->getCell('I' . $i)->setValue('');
                   
                }
                
                if ($row['employee_name'] != $lastname && $no >0) {
                    $i++;
                    $list = $i-1;
                    $objSheet->getStyle('A' . $list . ':I' . $list)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('000000');
                    $objSheet->getCell('A' . $i)->setValue('');
                    $objSheet->getCell('B' . $i)->setValue('');
                    $objSheet->getCell('C' . $i)->setValue('');
                    $objSheet->getCell('D' . $i)->setValue('');
                    $objSheet->getCell('E' . $i)->setValue('');
                    $objSheet->getCell('F' . $i)->setValue('');
                    $objSheet->getCell('G' . $i)->setValue('');
                    $objSheet->getCell('H' . $i)->setValue('');
                    $objSheet->getCell('I' . $i)->setValue('');
                    
                }
               
                
                $shift_out = $row['shift_out'];
                $description = $row['description'];                
                $filterlate = date('His',strtotime($row['tanggal'] . ' ' . $row['late']));
                $filtershift_out = date('His',strtotime($row['tanggal'] . ' ' . $shift_out));
                $filtertimeout = date('His',strtotime($row['tanggal'] . ' ' . $row['time_out']));
                
                if($filterlate > '000000' && $filterlate <='000500'){
                    $objSheet->getStyle('C' . $i . ':I' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('d9d9d9');
                }                
                if($filterlate >='000500' && $filterlate <='020000'){
                    $objSheet->getStyle('C' . $i . ':I' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ffff00');
                } 
                if($filterlate >='020000' && $description !=='C-THN'){
                    $objSheet->getStyle('C' . $i . ':I' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('ff0000');
                } 
                
                if(empty($description)){
			 if(!empty($row['time_in']) || !empty($row['time_out'])){

				if($filtertimeout <  $filtershift_out){
                        		$objSheet->getStyle('C' . $i . ':I' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('e6ffff');
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
                $objSheet->getCell('E' . $i)->setValue($row['shifttype']);
                $objSheet->getCell('F' . $i)->setValue($row['time_in']);
                $objSheet->getCell('G' . $i)->setValue($row['time_out']);
                $objSheet->getCell('H' . $i)->setValue($row['late']);
                $objSheet->getCell('I' . $i)->setValue($description);
                
                $objPHPExcel->getActiveSheet()
                    ->getStyle('D' . $i . ':H' . $i)
                    ->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                
                $no++;
                $lastname = $row['employee_name'];
                $lastdept = $row['department'];
            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A6:I' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:I' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A6:I6')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            
            $objPHPExcel->getActiveSheet()
                    ->getStyle('A6:I6')
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
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }

}
