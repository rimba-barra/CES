<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Generalinfo_ExportExcel {

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
     //   $activeSheet = $this->objPHPExcel->getActiveSheet();
        
        // Set properties
//echo date('H:i:s') . " Set properties\n";
$objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

$objPHPExcel->getProperties()->setTitle("EREMS General Information");
$objPHPExcel->getProperties()->setSubject("EREMS General Information");
$objPHPExcel->getProperties()->setDescription("EREMS General Information");


// Add some data
//echo date('H:i:s') . " Add some data\n";
$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Purchaseletter No.');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Purchase Date');
$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Cluster');
$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Block Name');
$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Unit No.');
$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Type');
$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Customer Name');
$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Salesman');



$count = 2;
foreach($appData as $row){
    
  
      //  var_dump($row);
    $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["purchaseletter_no"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, date("d-m-Y",  strtotime($row["purchase_date"])));
    $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["cluster_cluster"]);
        $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, $row["block_block"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["unit_unit_number"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["type_name"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["customer_name"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["salesman_employee_name"]);
    
 
    
    $count++;
    
}


        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'GENERALINFORMATION_EREMS_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
    }

    

    

    public function getUrl() {
        return $this->url;
    }

}

?>
