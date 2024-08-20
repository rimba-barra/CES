<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Jatuhtempo_ExportExcel {

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

$objPHPExcel->getProperties()->setTitle("JATUH TEMPO EREMS");
$objPHPExcel->getProperties()->setSubject("JATUH TEMPO EREMS");
$objPHPExcel->getProperties()->setDescription("JATUH TEMPO EREMS");


// Add some data
//echo date('H:i:s') . " Add some data\n";
$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Due Date');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Rest');
$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Type');
$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Source Money');
$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Cluster');
$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Unit Number');
$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Price Type');
$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Customer Name');
$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Purchase Date');
$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Sales Price');
$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Down Payment');
$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Sales Name');
$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Customer Phone Number');
$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Lama Tunggakan');

$count = 2;
foreach($appData as $row){
    
  
      //  var_dump($row);
    $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, date("d-m-Y",  strtotime($row["duedate"])));
    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count,  number_format(doubleval($row["remaining_balance"]),2,',','.'));
    $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["type_code"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, $row["sourcemoney_sourcemoney"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["cluster_code"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["unit_unit_number"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["pricetype_pricetype"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["customer_name"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count, date("d-m-Y",  strtotime($row["purchaseletter_purchase_date"])));
   $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, number_format(doubleval($row["purchaseletter_harga_total_jual"]),2,',','.'));
   $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, number_format(doubleval($row["billingrules_uangmuka"]),2,',','.'));
    $objPHPExcel->getActiveSheet()->SetCellValue('L'.$count, $row["salesman_employee_name"]);
     $objPHPExcel->getActiveSheet()->SetCellValue('M'.$count, $row["customer_mobile_phone"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('N'.$count, $row["lama_tunggakan"]);
    
 
    
    $count++;
    
}


        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'JATUHTEMPO_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/jatuhtempo/' . $this->fileResult);
        $this->url = 'app/erems/uploads/jatuhtempo/' . $this->fileResult;
    }

    

    

    public function getUrl() {
        return $this->url;
    }

}

?>
