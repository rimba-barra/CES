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

class Hrd_Models_Report_ClaimReport {

    private $fileResult;
    private $objPHPExcel;
    private $url;
    private $setup;
    private $tmp_table;

    function __construct() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->tmp_rptharian = '##tmp_rptabsenharian_' . $this->setup->_user_id;
        $this->destination = getcwd() . '/app/hrd/uploads/claim/';
        $this->httpdirect = 'app/hrd/uploads/claim/';
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


    
    public function create_excel_formatrj($params,$data) {
// print_r($data);die();
        if ($data) {     

            //HITUNG TOTAL SETIAP TAHUN & BULAN
            $array_new_data = null;
            foreach($data as $key => $item){
                $array_new_data[$item['year_claim']][$item['month_claim']][] = $item['total_claim'];
            }

            $temp_count = 0;
            $new_data_count = null;
            foreach($array_new_data as $key => $item){
                foreach($item as $key_i => $item_i){
                    $temp_count = 0;
                    foreach($item_i as $key_j => $item_j){
                        $temp_count = $temp_count+$item_j;
                    }
                    $new_data_count[$key][$key_i]['total_total_klaim'] = $temp_count;
                }
            }

            //BIKIN ARRAY BARU, DIBAGI PER PROJECT PT, DIDALAMNYA BARU DIISI TAHUN DAN BULANNYA
            $curr_project_id = 0;
            $curr_pt_id = 0;
            $curr_month = 0;
            $curr_year = 0; 
            $curr_jenispengobatan_id = 0;  
            $new_data = null;
            $key_id = 0;

            foreach($data as $key => $item){

                if($item['project_id'] != $curr_project_id || $item['pt_id'] != $curr_pt_id 
                    || $item['jenispengobatan_id'] != $curr_jenispengobatan_id){
                    
                    $new_data[$item['project_id'].'_'.$item['pt_id'].'_'.$item['jenispengobatan_id']] = array(
                                            'project_id' => $item['project_id'],
                                            'project_name' => $item['project_name'],
                                            'pt_id' => $item['pt_id'],
                                            'pt_name' => $item['pt_name'],
                                            'subholding_id' => $item['subholding_id'],
                                            'subholding_name' => $item['subholding_name'],
                                            'jenispengobatan_id' => $item['jenispengobatan_id'],
                                            'jenispengobatan' => $item['jenispengobatan'],
                                );

                }

                if($item['project_id'] != $curr_project_id || $item['pt_id'] != $curr_pt_id
                    || $item['jenispengobatan_id'] != $curr_jenispengobatan_id
                    ||$item['year_claim'] != $curr_year){
                    $new_data[$item['project_id'].'_'.$item['pt_id'].'_'.$item['jenispengobatan_id']]['year_month_claim'][$item['year_claim']] = null;
                }

                if($item['project_id'] != $curr_project_id || $item['pt_id'] != $curr_pt_id
                    || $item['jenispengobatan_id'] != $curr_jenispengobatan_id
                    ||$item['year_claim'] != $curr_year
                    ||$item['month_claim'] != $curr_month){
                    $new_data[$item['project_id'].'_'.$item['pt_id'].'_'.$item['jenispengobatan_id']]['year_month_claim'][$item['year_claim']][$item['month_claim']]['total_claim'] = $item['total_claim'];
                }

                if(empty($curr_project_id) || $item['project_id'] != $curr_project_id){
                    $curr_project_id = $item['project_id'];
                }
                if(empty($curr_pt_id) || $item['pt_id'] != $curr_pt_id){
                    $curr_pt_id = $item['pt_id'];
                }
                if(empty($curr_jenispengobatan_id) || $item['jenispengobatan_id'] != $curr_jenispengobatan_id){
                    $curr_jenispengobatan_id = $item['jenispengobatan_id'];
                }
                if(empty($curr_month) || $item['month_claim'] != $curr_month){
                    $curr_month = $item['month_claim'];
                }
                if(empty($curr_year) || $item['year_claim'] != $curr_year){
                    $curr_year = $item['year_claim'];
                }
            }   

            // print_r($new_data);die();
            

            $folder ='reportclaim';            
            $reportname = 'claim_formatrj';
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

            //--HEADER--
            $objSheet->getStyle('A1:A2')->getFont()->setBold(true)->setSize(12);
         
            $objSheet->getCell('A1')->setValue('Rekap Klaim');

            $year_header1 = date('F Y',strtotime($params['start_date']));
            $year_header2 = date('F Y',strtotime($params['end_date']));

            if($year_header1 != $year_header2){
                $text_header = $year_header1.'/'.$year_header2;
            }else{
                $text_header = $year_header1;
            }

            $objSheet->getCell('A2')->setValue('Tahun '.$text_header);

            $objPHPExcel->getActiveSheet()->mergeCells('A1:C1');
            $objPHPExcel->getActiveSheet()->mergeCells('A2:C2');

            //--END HEADER--

            //--BODY--

            $start    = (new DateTime(date('Y-m-d',strtotime($params['start_date']))))->modify('first day of this month');
            $end      = (new DateTime(date('Y-m-d',strtotime($params['end_date']))))->modify('first day of next month');
            $interval = DateInterval::createFromDateString('1 month');
            $period   = new DatePeriod($start, $interval, $end);

            $array_month = null;
            $array_param = null;
            
            $array_month[] = 'No';
            $array_month[] = 'Subholding';
            $array_month[] = 'Project';
            $array_month[] = 'PT';
            $array_month[] = 'Jenis Pengobatan';

            foreach ($period as $dt) {
                $array_month[] = $dt->format("F");
                $array_param[$dt->format("Y")][] = array(
                                                            'month_num' => (int)$dt->format("m")
                                                    );
            }

            $array_month[] = 'Total';


            $temp_array_month = $array_month;
            end($temp_array_month);
            $key_last_array_month = key($temp_array_month);

            $temp_data = $new_data;
            end($temp_data);
            $key_last_temp_data = key($temp_data);

            $arrayLabel = array("A","B","C","D","E");
            $j = 0; 
            $k = 4;  
            $no = 1;

            foreach ($array_month as $keyH => $rowH) {
                
                $i = 5;
                $no = 1;
                $objSheet->setCellValueByColumnAndRow($j, $k, $rowH);
                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getFont()->setBold(true)->setSize(12);

                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getBorders()->
                        getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getBorders()->
                        getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

                foreach ($new_data as $key => $row) {
                    $objSheet->setCellValueByColumnAndRow(0, $i, $no);

                    if($keyH == '1'){
                        $objSheet->setCellValueByColumnAndRow($j, $i,$row['subholding_name']);
                    }elseif($keyH == '2'){
                        $objSheet->setCellValueByColumnAndRow($j, $i,$row['project_name']);
                    }elseif($keyH == '3'){
                        $objSheet->setCellValueByColumnAndRow($j, $i,$row['pt_name']);
                    }elseif($keyH == '4'){
                        $objSheet->setCellValueByColumnAndRow($j, $i,$row['jenispengobatan']);
                        
                        if($key == $key_last_temp_data){
                            $no_total = $i+2;
                            $objSheet->setCellValueByColumnAndRow($j, $no_total,'Total Klaim');

                            $year_before = date('Y',strtotime($params['start_date']));
                            $no_total = $i+4;
                            $objSheet->setCellValueByColumnAndRow($j, $no_total,'Klaim Tahun '.($year_before-1));
                        }

                    }elseif($keyH == $key_last_array_month){
                        $colString = PHPExcel_Cell::stringFromColumnIndex($j-1);
                        $objSheet->setCellValueByColumnAndRow($j, $i,'=SUM(F'.$i.':'.$colString.$i.')');

                        if($key == $key_last_temp_data){
                            $colString_total = PHPExcel_Cell::stringFromColumnIndex($j);
                            $no_total = $i+2;
                            $objSheet->setCellValueByColumnAndRow($j, $no_total,'=SUM('.$colString_total.'5:'.$colString_total.$i.')');

                            $no_total = $i+4;
                            $objSheet->setCellValueByColumnAndRow($j, $no_total,'=SUM(F'.$no_total.':'.$colString.$no_total.')');
                        }

                    }else{

                        if($keyH >= 4){

                            $key_param_year_before = 0;

                            foreach($array_param as $key_param_year => $item_param_year){

                                $key_param_year_before = $key_param_year - 1;

                                foreach($item_param_year as $key_param_month => $item_param_month){

                                    //YEAR BY FILTER
                                    if(array_key_exists($key_param_year, $row['year_month_claim'])){
                                        if(array_key_exists($item_param_month['month_num'], $row['year_month_claim'][$key_param_year])){

                                            $month_value = date('F',strtotime($key_param_year.'-'.$item_param_month['month_num'].'-01'));

                                            if($month_value == $rowH){
                                            
                                                $objSheet->setCellValueByColumnAndRow($j, $i, $row['year_month_claim'][$key_param_year][$item_param_month['month_num']]['total_claim']);
                                            }
                                        }
                                    }

                                    //YEAR BEFORE BY FILTER
                                    if($key == $key_last_temp_data){
                                        if(array_key_exists($key_param_year_before, $new_data_count)){
                                            if(array_key_exists($item_param_month['month_num'],$new_data_count[$key_param_year_before])){

                                                $month_value = date('F',strtotime($key_param_year_before.'-'.$item_param_month['month_num'].'-01'));

                                                if($month_value == $rowH){
                                                    
                                                    $no_total = $i+4;
                                                    $objSheet->setCellValueByColumnAndRow($j, $no_total, $new_data_count[$key_param_year_before][$item_param_month['month_num']]['total_total_klaim']);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if($key == $key_last_temp_data && $keyH != 0){
                                $colString_total = PHPExcel_Cell::stringFromColumnIndex($j);
                                $no_total = $i+2;
                                $objSheet->setCellValueByColumnAndRow($j, $no_total,'=SUM('.$colString_total.'5:'.$colString_total.$i.')');
                            }
                        }
                    }
                       
                    $i++;
                    $no++;
                }
                
                $j++;
            }

            //--END BODY--


            for ($totalj = $j; $totalj >= 0 ; $totalj--) { 
                $colString = PHPExcel_Cell::stringFromColumnIndex($totalj);
                $objSheet->getColumnDimension($colString)->setAutoSize(true);
            }
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname .'_'. $paramreport.'_'.time().".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname .'_'. $paramreport .'_'.time().".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }
}
