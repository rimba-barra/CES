<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Popupunitspk_ExportExcel {

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

$objPHPExcel->getProperties()->setTitle("POPUP UNIT SPK EREMS");
$objPHPExcel->getProperties()->setSubject("POPUP UNIT SPK EREMS");
$objPHPExcel->getProperties()->setDescription("POPUP UNIT SPK EREMS");


// Add some data
//echo date('H:i:s') . " Add some data\n";
$objPHPExcel->setActiveSheetIndex(0);
$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Cluster');
$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block');
$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit');
$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tipe Rumah');
$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Luas Tanah');
$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Luas Bangunan');
$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Group');
$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Nama Customer');
$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Purchase Date');
$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Rencana Serah Terima');
$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Payment type');
$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Presentase Pembayaran');
$objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Tanggal Akad');
$objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Keterangan');

$count = 2;
foreach($appData as $row){
   //date("d-m-Y",  strtotime($row["akad_realisasiondate"]))
    $date1 = strtr($row["akad_realisasiondate"], '/', '-');
//    if($row["akad_realisasiondate"]=="01-01-1970") {
//        echo "1";
//    }
//    else {
//        
//    }
    $akad = date("d-m-Y",  strtotime($date1));
      //  var_dump($row);
    //$objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, date("d-m-Y",  strtotime($row["duedate"])));
    $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["cluster_cluster"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["block_block"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["unit_unit_number"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, $row["type_name"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["unit_land_size"]);
    $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["unit_building_size"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["type_building_class"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["customer_name"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count,  date("d-m-Y",  strtotime($row["purchase_date"])));
   $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, date("d-m-Y",  strtotime($row["rencana_serahterima_date"])));
   $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, $row["pricetype_pricetype"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('L'.$count, $row["persen_payment"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('M'.$count, $row["akad_realisasiondate"]);
   $objPHPExcel->getActiveSheet()->SetCellValue('N'.$count, $row["last_duedate"]);
 
    $count++;
    
}


        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'UNITSPK_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/unitspk/' . $this->fileResult);
        $this->url = 'app/erems/uploads/unitspk/' . $this->fileResult;
    }

    

    

    public function getUrl() {
        return $this->url;
    }

}

?>
