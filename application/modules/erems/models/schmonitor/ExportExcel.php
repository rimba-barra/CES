<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Schmonitor_ExportExcel {

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

  
        $objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

        $objPHPExcel->getProperties()->setTitle("Schedule Monitoring EREMS");
        $objPHPExcel->getProperties()->setSubject("Schedule Monitoring EREMS");
        $objPHPExcel->getProperties()->setDescription("Schedule Monitoring EREMS");


        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Kawasan');
        $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Tipe');
        $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tanggal Pesanan');
        $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Nomor Pesanan');
        $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Customer Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Harga Jual');
        $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Total Tagihan');
        $objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Payment');
        $objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Remaining Balance');
        $objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Selisih');

        $count = 2;
        foreach($appData as $row){
    
            $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["cluster_code"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["unit_unit_number"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["type_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, date("d-m-Y",  strtotime($row["purchase_date"])));
            $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, '\''.$row["purchaseletter_no"]);
            $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["customer_name"]);
           $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["harga_total_jual"]);
           $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["total_tagihan"]);
           $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count, $row["total_payment"]);
           $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, $row["remaining_balance"]);
           $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, $row["real_remaining_balance"]);
           

            $count++;
            
        }


        
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $this->fileResult = 'SCHMONITOR_'.$this->projectId.'_'.$this->ptId.'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
    }



    
    

    public function getUrl() {
        return $this->url;
    }

}

?>
