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
class Hrd_Models_Report_Exportmastersk extends Zend_Db_Table_Abstract {

    public $httpdirect;
    public $destination;
    public $setup;

    function init() {
        $this->setup = new Hrd_Models_General_Setup();
        $this->setup->_storeprocedure = 'sp_report_mastersk_export';        
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
        // var_dump($this->setup);die();
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
        $objSheet->setTitle('HC Filling System');
        // let's bold and size the header font and write the header
        // as you can see, we can specify a range of cells, like here: cells from A1 to A4
        $objSheet->getStyle('A1:V1')->getFont()->setBold(true)->setSize(12);

        // write header
        $objSheet->getCell('A1')->setValue('No.'); 
        $objSheet->getCell('B1')->setValue('Document Name');    
        $objSheet->getCell('C1')->setValue('Number');
        $objSheet->getCell('D1')->setValue('Project');
        $objSheet->getCell('E1')->setValue('Pt');
        $objSheet->getCell('F1')->setValue('Category');
        $objSheet->getCell('G1')->setValue('From Date');
        $objSheet->getCell('H1')->setValue('End Date');
        $objSheet->getCell('I1')->setValue('Description');
        $objSheet->getCell('J1')->setValue('Active');
        $objSheet->getCell('K1')->setValue('Internal');
        $objSheet->getCell('L1')->setValue('Addby');
        $objSheet->getCell('M1')->setValue('Addon');
        $objSheet->getCell('N1')->setValue('Modiby');
        $objSheet->getCell('O1')->setValue('Modion');
        $objSheet->getCell('P1')->setValue('Inactiveby');
        $objSheet->getCell('Q1')->setValue('Inactiveon');
        $objSheet->getCell('R1')->setValue('Reactiveby');
        $objSheet->getCell('S1')->setValue('Reactiveon');
        
        $i = 1;
        $no_index = 0;
        foreach ($result as $row) {
            $i++;
            $no_index++;
            if($row['active'] == 0){
                $active_status = '';
            }else{
                $active_status = 'Active';
            }

            if($row['private'] == 0){
                $private_status = '';
            }else{
                $private_status = 'Internal';
            }

            $user_inactiveby = $row['inactiveby_name'];
            if($row['inactiveby']){
                if($row['inactiveby'] == '-1'){
                    $user_inactiveby = 'SYSTEM';
                }
            }else{
                $user_inactiveby = $row['inactiveby_name'];
            }

            $user_modiby = $row['modiby_name'];
            if($row['modiby']){
                if($row['modiby'] == '-1'){
                    $user_modiby = 'SYSTEM';
                }
            }else{
                $user_modiby = $row['modiby_name'];
            }

            if(date('d/m/Y',strtotime($row['tanggal_habis'])) == '01/01/1970'){
                $tanggal_habis_mastersk = '01/01/9999';
            }else{
                $tanggal_habis_mastersk = date('d/m/Y',strtotime($row['tanggal_habis']));
            }

            if(date('d/m/Y',strtotime($row['modion'])) == '01/01/1970'){
                $modion_date = '';
            }else{
                $modion_date = date('d/m/Y H:i:s',strtotime($row['modion']));
            }

            if(date('d/m/Y',strtotime($row['inactiveon'])) == '01/01/1970'){
                $inactiveon_date = '';
            }else{
                $inactiveon_date = date('d/m/Y H:i:s',strtotime($row['inactiveon']));
            }

            if(date('d/m/Y',strtotime($row['reactiveon'])) == '01/01/1970'){
                $reactiveon_date = '';
            }else{
                $reactiveon_date = date('d/m/Y H:i:s',strtotime($row['reactiveon']));
            }

            $objSheet->getCell('A' . $i)->setValue($no_index);  
            $objSheet->getCell('B' . $i)->setValue($row['name']);            
            $objSheet->setCellValueExplicit('C' . $i, strval($row['nomor']), PHPExcel_Cell_DataType::TYPE_STRING);
            $objSheet->getCell('D' . $i)->setValue($row['project_name']);            
            $objSheet->getCell('E' . $i)->setValue($row['pt_name']);
            $objSheet->getCell('F' . $i)->setValue($row['masterkategorisk']);
            $objSheet->getCell('G' . $i)->setValue(date('d/m/Y',strtotime($row['tanggal'])));            
            $objSheet->getCell('H' . $i)->setValue($tanggal_habis_mastersk);
            $objSheet->getCell('I' . $i)->setValue($row['keterangan']);            
            $objSheet->getCell('J' . $i)->setValue($active_status);
            $objSheet->getCell('K' . $i)->setValue($private_status);
            $objSheet->getCell('L' . $i)->setValue($row['addby_name']);
            $objSheet->getCell('M' . $i)->setValue(date('d/m/Y H:i:s',strtotime($row['addon'])));            
            $objSheet->getCell('N' . $i)->setValue($user_modiby);     
            $objSheet->getCell('O' . $i)->setValue($modion_date);
            $objSheet->getCell('P' . $i)->setValue($user_inactiveby);     
            $objSheet->getCell('Q' . $i)->setValue($inactiveon_date);  
            $objSheet->getCell('R' . $i)->setValue($row['reactiveby_name']);     
            $objSheet->getCell('S' . $i)->setValue($reactiveon_date);                
        }

        // create some borders
        // first, create the whole grid around the table
        $objSheet->getStyle('A1:S' . $i)->getBorders()->
                getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:S' . $i)->getBorders()->
                getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $objSheet->getStyle('A1:S1')->getBorders()->
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

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        ob_end_clean();
        $filename = 'exportmastersk';
        $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->setup->_user_id . ".xlsx";
        $objWriter->save($filedata);
        return array("filedata" => $filedata, "directdata" => $directfile);
    }

}
