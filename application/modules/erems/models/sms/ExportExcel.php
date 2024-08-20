<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Sms_ExportExcel {

    private $fileResult;
    private $objPHPExcel;

    private $url;
    private $projectId;
    private $ptId;

    function __construct($projectId,$ptId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;
    }

    public function process($appData) {
        $objPHPExcel = new PHPExcel();

       // $objPHPExcel->setActiveSheetIndex(0);
       // $activeSheet = $this->objPHPExcel->getActiveSheet();
        
        // Set properties
        //echo date('H:i:s') . " Set properties\n";
        $objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

        $objPHPExcel->getProperties()->setTitle("Proses SMS EREMS");
        $objPHPExcel->getProperties()->setSubject("Proses SMS EREMS");
        $objPHPExcel->getProperties()->setDescription("Proses SMS EREMS");

        // Add some data
        //echo date('H:i:s') . " Add some data\n";
        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Customer Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Purchaseletter Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Process Date');
        $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Phone Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Category');
        $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Notes');
        $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Sent Date');

        $count = 2;
        foreach($appData as $row){
              //  var_dump($row);
            $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["customer_name"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["unit_unit_number"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["purchaseletter_purchaseletter_no"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, date("d-m-Y",  strtotime($row["process_date"])));
            $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, '\''.$row["sms_phonenumber"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["smscategory_smscategory"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["notes"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["sent_date"]);
            $count++;
            
        }
        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'PROSESSMS_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
    }

    public function processCSVformatSH1($appData) {

        $objPHPExcel = new PHPExcel(); 

        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Phone Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Notes');

        $count = 2;
        foreach($appData as $row){
            $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, "'".$row["sms_phonenumber"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["notes"]);         
            
            $count++;
            
        }
        
        header('Content-type: text/csv');
        header('Content-Disposition: attachment;filename="export.csv"');
        header('Cache-Control: max-age=0');
        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');

        $this->fileResult = 'PROSESSMS_'.$this->projectId.'_'.$this->ptId.'.csv';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
    }

    public function getUrl() {
        return $this->url;
    }

}

?>
