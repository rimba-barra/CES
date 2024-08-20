<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Popupholdteknik_ExportExcel {

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

    $objPHPExcel->getProperties()->setTitle("POPUP UNIT SPK EREMS");
    $objPHPExcel->getProperties()->setSubject("POPUP UNIT SPK EREMS");
    $objPHPExcel->getProperties()->setDescription("POPUP UNIT SPK EREMS");
    $objPHPExcel->setActiveSheetIndex(0);
    $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Cluster');
    $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Block');
    $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Unit');
    $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tipe Rumah');
    $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Luas Tanah');
    $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Luas Bangunan');
    $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Notes Hold Teknik');

    $count = 2;
    foreach($appData as $row){
      $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["cluster_cluster"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["block_block"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["unit_unit_number"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, $row["type_name"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["unit_land_size"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["unit_building_size"]);
      $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["notes_holdteknik"]);

      $count++;

    }
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $this->fileResult = 'HOLDTEKNIK_'.$this->projectId.'_'.$this->ptId.'.xlsx';
    $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/holdteknik/' . $this->fileResult);
    $this->url = 'app/erems/uploads/holdteknik/' . $this->fileResult;
  }

  public function getUrl() {
    return $this->url;
  }

}

?>
