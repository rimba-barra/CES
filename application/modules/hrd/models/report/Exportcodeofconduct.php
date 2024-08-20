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
class Hrd_Models_Report_Exportcodeofconduct extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_report_codeofconduct_export';        
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
        //$emaildataFormat = '#,#0.## \€;[Red]-#,#0.## \€';
        // number format, with thousands seperator and two decimal points.
        //$numberFormat = '#,#0.##;[Red]-#,#0.##';

        // writer will create the first sheet for us, let's get it
        $objSheet = $objPHPExcel->getActiveSheet();
        // rename the sheet
        $objSheet->setTitle('COde of conduct');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:V1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('Subholding');    
        $objSheet->getCell('B1')->setValue('Project');
        $objSheet->getCell('C1')->setValue('PT');
        $objSheet->getCell('D1')->setValue('NIK');
        $objSheet->getCell('E1')->setValue('Name');
        $objSheet->getCell('F1')->setValue('Deparment');
        $objSheet->getCell('G1')->setValue('Position');
        $objSheet->getCell('H1')->setValue('Email Ciputra');
        $objSheet->getCell('I1')->setValue('Email');
        $objSheet->getCell('J1')->setValue('Version');
        $objSheet->getCell('K1')->setValue('Acceptance');
        
        $i = 1;
        foreach ($result as $row) {
            $i++;
                
            $objSheet->getCell('A' . $i)->setValue($row['subholding']);  
            $objSheet->getCell('B' . $i)->setValue($row['project']);            
            $objSheet->getCell('C' . $i)->setValue($row['pt']);
            $objSheet->getCell('D' . $i)->setValue("'".strval($row['nik'])."'");           
            $objSheet->getCell('E' . $i)->setValue($row['employee_name']);                 
            $objSheet->getCell('F' . $i)->setValue($row['department']);                 
            $objSheet->getCell('G' . $i)->setValue($row['position']);                 
            $objSheet->getCell('H' . $i)->setValue($row['email_ciputra']);                 
            $objSheet->getCell('I' . $i)->setValue($row['email']);                 
            $objSheet->getCell('J' . $i)->setValue($row['description']);              
            $objSheet->getCell('K' . $i)->setValue($row['tgl_menyetujui']);                
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:K' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:K' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:K1')->getBorders()->
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

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportcodeofconduct';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
