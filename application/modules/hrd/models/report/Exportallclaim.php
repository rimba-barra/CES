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

class Hrd_Models_Report_Exportallclaim {

    private $fileResult;
    private $objPHPExcel;
    private $url;
    private $setup;
    private $tmp_table;

    function __construct() {
        $this->setup = new Hrd_Models_General_Setup();
        // $this->tmp_rptharian = '##tmp_rptabsenharian_' . $this->setup->_user_id;
        $this->destination = getcwd() . '/app/hrd/uploads/allclaim/';
        $this->httpdirect = 'app/hrd/uploads/allclaim/';
    }

    function createFolder($param) {
        if (!file_exists($this->destination . "/$param/")) {
            mkdir($this->destination . "/$param/", 0777, true);
        }
    }  
    
    public function create_excel_allclaim($data) {
        if ($data) {       

            $folder ='exportdata';            
            $reportname = 'allclaim';
            $paramreport = date("Y-m-d_H-i-s");
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
            $objSheet->setTitle($reportname);
            
            $objSheet->getCell('A1')->setValue('No');
            $objSheet->getStyle('A1')->getFont()->setBold(true)->setSize(12);

            $i = 2;     

            $temp_data = $data;
            end($temp_data);
            $last_key = key($temp_data);
            
            $arrayLabel = array("A","B","C","D","E");
            $j = 1; 
            $k = 1;  
            $no = 1;

            $params[] = array('field' => 'subholding_name','header_title' => 'Subholding');
            $params[] = array('field' => 'project_name','header_title' => 'Project');
            $params[] = array('field' => 'pt_name','header_title' => 'PT');
            $params[] = array('field' => 'nik_group','header_title' => 'NIK Group');
            $params[] = array('field' => 'employee_name','header_title' => 'Name');
            $params[] = array('field' => 'department_name','header_title' => 'Department Name');
            $params[] = array('field' => 'code_group','header_title' => 'Group');
            $params[] = array('field' => 'code_ptkp','header_title' => 'PTKP');
            $params[] = array('field' => 'code_jenispengobatan','header_title' => 'Jenis');
            $params[] = array('field' => 'value_plafon','header_title' => 'Plafon');
            $params[] = array('field' => 'year_now','header_title' => 'Year');
            $params[] = array('field' => 'total_claim_value','header_title' => 'Total Penggantian');
            $params[] = array('field' => 'total_amount_penggantian','header_title' => 'Nilai Kwitansi');
            $params[] = array('field' => 'total_saldo','header_title' => 'Saldo');

            foreach ($params as $keyH => $rowH) {
                
                $i = 2;
                $no = 1;
                $objSheet->setCellValueByColumnAndRow($j, $k, $rowH['header_title']);
                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getFont()->setBold(true)->setSize(12);

                $objSheet->getCellByColumnAndRow($j, $k)->getStyle()->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

                foreach ($data as $key => $row) {
                    $objSheet->setCellValueByColumnAndRow(0, $i, $no);
                    $objSheet->setCellValueByColumnAndRow($j, $i,$row[$rowH['field']]);
                    if ($row['sign_saldo'] == 'alert') {
                        $objSheet->getStyle('A' . $i . ':O' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('f8c9c9');
                    }elseif ($row['sign_saldo'] == 'warning'){
                        $objSheet->getStyle('A' . $i . ':O' . $i)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setARGB('fffee2');
                    }      

                    $i++;
                    $no++;
                }
                
                $j++;
            }

            
            $cellIterator = $objSheet->getRowIterator()->current()->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(true);
            /** @var PHPExcel_Cell $cell */
            foreach ($cellIterator as $cell) {
                $objSheet->getColumnDimension($cell->getColumn())->setAutoSize(true);
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filedata = $this->destination."/".$folder."/" . $reportname . "_" .$paramreport . ".xlsx";
            $directfile = $this->httpdirect."/".$folder."/" . $reportname . "_" . $paramreport . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata"=>$filedata,"directdata"=>$directfile);
        }
    }
}
