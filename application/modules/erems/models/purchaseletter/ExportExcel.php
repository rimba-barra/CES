<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_ExportExcel {

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

$objPHPExcel->getProperties()->setTitle("POPUP FOLLOWUP EREMS");
$objPHPExcel->getProperties()->setSubject("POPUP FOLLOWUP EREMS");
$objPHPExcel->getProperties()->setDescription("POPUP FOLLOWUP EREMS");


// Add some data
//echo date('H:i:s') . " Add some data\n";
$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Purchaseletter No.');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');


$count = 2;
foreach($appData as $row){
   //date("d-m-Y",  strtotime($row["akad_realisasiondate"]))
  //  $date1 = strtr($row["akad_realisasiondate"], '/', '-');
//    if($row["akad_realisasiondate"]=="01-01-1970") {
//        echo "1";
//    }
//    else {
//        
//    }
  //  $akad = date("d-m-Y",  strtotime($date1));
      //  var_dump($row);
    //$objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, date("d-m-Y",  strtotime($row["duedate"])));
    $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["purchaseletter_no"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["unit_unit_number"]);
    
   
    $count++;
    
}


        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'FOLLOWUP_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/followup/' . $this->fileResult);
        $this->url = 'app/erems/uploads/followup/' . $this->fileResult;
    }

    

    

    public function getUrl() {
        return $this->url;
    }

}

?>
