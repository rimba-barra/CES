<?php

ini_set('memory_limit', '512M');
set_time_limit(300);


/**
 * Description of JsonToExcel
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

//require_once dirname(__FILE__) . '../../library/phpexcel/PHPExcel.php';

class Erems_Models_Library_JsonToExcel {

    public $msg;

    public function process($jsonFile, $excelFile, $pembagi = 0) {
        $hasil = FALSE;

        if (!file_exists($jsonFile)) {
            $this->msg = "Tidak ada file " . $jsonFile;
            return $hasil;
        }
        $str = file_get_contents($jsonFile);
        // $pembagi = 1000;
        $panjangString = strlen($str);
        if ($pembagi == 0) {
            $pembagi = floor($panjangString / 10000);
            $pembagi = $pembagi == 0 ? 1 : $pembagi;
        }


        $segment = floor(strlen($str) / $pembagi);

        $barisData = array();
        $textUntukBerikutnya = "";
        $startPotong = 0;
        $endPotong = $segment;
        for ($i = 0; $i < $pembagi; $i++) {
            $rest = substr($str, $startPotong, $segment);
            $rest = $textUntukBerikutnya . "" . $rest;
            $batas = strrpos($rest, '{"salesman"') - 1; // -1 karen ada koma untuk setiap row
            $restFinal = substr($rest, 0, $batas) . "]";
            $barisData[] = $restFinal;

            $textUntukBerikutnya = "[" . substr($rest, $batas + 1, strlen($rest));
            $startPotong = $segment * ($i + 1);
            $endPotong = $endPotong + $segment;
        }

        $jsonData = array();

        $isDebug = FALSE;
        $maxRow = 100000;

        $objPHPExcel = new PHPExcel();

        $objPHPExcel->setActiveSheetIndex(0)
                ->setCellValue('A1', "SALESMAN")
                ->setCellValue('B1', "")
                ->setCellValue('C1', "PURCHASELETTER NUMBER")
                ->setCellValue('D1', "PURCHASELETTER DATE")
                ->setCellValue('E1', "CLUSTER")
                ->setCellValue('F1', "BLOCK")
                ->setCellValue('G1', "UNIT NUMBER")
                ->setCellValue('H1', "TYPE")
                ->setCellValue('I1', "LAND SIZE")
                ->setCellValue('J1', "BUILDING SIZE")
                ->setCellValue('K1', "CUSTOMER NAME")
                ->setCellValue('L1', "HARGA NETTO")
                ->setCellValue('M1', "TAX")
                ->setCellValue('N1', "HARGA JUAL")
                ->setCellValue('O1', "PRICE TYPE")
                ->setCellValue('P1', "NOTES");



        $row = 0;
        $start = 2;

        $salesman = NULL;
        $jenisReport = NULL; // untuk hold report yang sedang di render
        $footerReport = array(
            "count_unit" => 0,
            "sum_luas_tanah" => 0,
            "sum_luas_bangunan" => 0,
            "sum_harga_netto" => 0,
            "sum_tax" => 0,
            "sum_total_harga_jual" => 0
        );
        $row = $start;
        foreach ($barisData as $l => $w) {
            $json = json_decode($w);

            if ($start < $maxRow) {
                foreach ($json as $k => $v) {
                    $row++;
                    //$row = $start + $k;
                    $footerReport["count_unit"] ++;
                    $footerReport["sum_luas_tanah"] += floatval($v->land_size);
                    $footerReport["sum_luas_bangunan"] += floatval($v->building_size);
                    $footerReport["sum_harga_netto"] += floatval($v->harga_netto);
                    $footerReport["sum_tax"] += floatval($v->tax);
                    $footerReport["sum_total_harga_jual"] += floatval($v->harga_jual);

                    if (!$isDebug) {

                        $date = is_object($v->purchase_date) ? date("d-m-Y", strtotime($v->purchase_date->date)) : NULL;
                        $jenisReport = $v->report;


                        $objPHPExcel->setActiveSheetIndex(0)
                                ->setCellValue('A' . $row, $v->salesman)
                                ->setCellValue('B' . $row, $v->report)
                                ->setCellValue('C' . $row, $v->purchaseletter_no)
                                ->setCellValue('D' . $row, $date)
                                ->setCellValue('E' . $row, $v->cluster_cluster)
                                ->setCellValue('F' . $row, $v->block_block)
                                ->setCellValue('G' . $row, $v->unit_unit_number)
                                ->setCellValue('H' . $row, $v->type_name)
                                ->setCellValue('I' . $row, $v->land_size)
                                ->setCellValue('J' . $row, $v->building_size)
                                ->setCellValue('K' . $row, $v->customer_name)
                                ->setCellValue('L' . $row, $v->harga_netto)
                                ->setCellValue('M' . $row, $v->tax)
                                ->setCellValue('N' . $row, $v->harga_jual)
                                ->setCellValue('O' . $row, $v->pricetype)
                                ->setCellValue('P' . $row, $v->notes);



                        $objPHPExcel->getActiveSheet()->getStyle('D' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDDSLASH);
                        $objPHPExcel->getActiveSheet()->getStyle('L' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                        $objPHPExcel->getActiveSheet()->getStyle('M' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                        $objPHPExcel->getActiveSheet()->getStyle('N' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);

                        $reportBeda = FALSE;
                        // footer
                        if ($k > 0) {
                            if (!key_exists($l + 1, $barisData) && !key_exists($k + 1, $json)) {
                                $reportBeda = TRUE;
                            } else {
                                if (key_exists($k + 1, $json)) {
                                    if ($json[$k]->report != $json[$k + 1]->report) {
                                        //   var_dump($json[$k]->report."---".$json[$k - 1]->report);
                                        // var_dump($row);
                                        $reportBeda = TRUE;
                                    }
                                }
                            }
                        }


                        if ($reportBeda) {
                            $row = $row + 1;

                            $objPHPExcel->getActiveSheet(0)
                                    ->setCellValue('F' . $row, "SUB TOTAL JUAL")
                                    ->setCellValue('G' . $row, $footerReport["count_unit"])
                                    ->setCellValue('I' . $row, $footerReport["sum_luas_tanah"])
                                    ->setCellValue('J' . $row, $footerReport["sum_luas_bangunan"])
                                    ->setCellValue('L' . $row, $footerReport["sum_harga_netto"])
                                    ->setCellValue('M' . $row, $footerReport["sum_tax"])
                                    ->setCellValue('N' . $row, $footerReport["sum_total_harga_jual"]);

                            $objPHPExcel->getActiveSheet()->getStyle('A' . $row . ":P" . $row)
                                    ->getBorders()
                                    ->getTop()
                                    ->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
                            
                            $objPHPExcel->getActiveSheet()->getStyle('L' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                            $objPHPExcel->getActiveSheet()->getStyle('M' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                            $objPHPExcel->getActiveSheet()->getStyle('N' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                            
                            $footerReport["count_unit"] = 0;
                            $footerReport["sum_luas_tanah"] =0;
                            $footerReport["sum_luas_bangunan"] =0;
                            $footerReport["sum_harga_netto"] =0;
                            $footerReport["sum_tax"] =0;
                            $footerReport["sum_total_harga_jual"] =0;
                        }
                    }
                }


                $start = $row;
            }

            if ($isDebug) {
                var_dump($start . "---" . $row . "---");
            }

            unset($json);
        }

        if (file_exists($jsonFile)) {
            unlink($jsonFile);
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $objWriter->save($excelFile);
        $hasil = TRUE;
        return $hasil;
    }

    /*
      public function processBig($jsonFile, $excelFile) {
      $hasil = FALSE;
      if (!file_exists($jsonFile)) {
      $this->msg = "Tidak ada file ".$jsonFile;
      return $hasil;
      }
      try {
      $str = file_get_contents($jsonFile);
      $pembagi = 1000;
      $panjangString = strlen($str);
      // $pembagi = floor($panjangString/10000);
      //  $pembagi = $pembagi==0?1:$pembagi;

      $segment = floor(strlen($str) / $pembagi);

      $barisData = array();
      $textUntukBerikutnya = "";
      $startPotong = 0;
      $endPotong = $segment;
      for ($i = 0; $i < $pembagi; $i++) {
      $rest = substr($str, $startPotong, $segment);
      $rest = $textUntukBerikutnya . "" . $rest;
      $batas = strrpos($rest, '{"salesman"') - 1; // -1 karen ada koma untuk setiap row
      $restFinal = substr($rest, 0, $batas) . "]";
      $barisData[] = $restFinal;

      $textUntukBerikutnya = "[" . substr($rest, $batas + 1, strlen($rest));
      $startPotong = $segment * ($i + 1);
      $endPotong = $endPotong + $segment;
      }

      $jsonData = array();

      $isDebug = FALSE;
      $maxRow = 100000;

      $objPHPExcel = new PHPExcel();

      $objPHPExcel->setActiveSheetIndex(0)
      ->setCellValue('A1', "SALESMAN")
      ->setCellValue('B1', "")
      ->setCellValue('C1', "PURCHASELETTER NUMBER")
      ->setCellValue('D1', "PURCHASELETTER DATE")
      ->setCellValue('E1', "CLUSTER")
      ->setCellValue('F1', "BLOCK")
      ->setCellValue('G1', "UNIT NUMBER")
      ->setCellValue('H1', "TYPE")
      ->setCellValue('I1', "LAND SIZE")
      ->setCellValue('J1', "BUILDING SIZE")
      ->setCellValue('K1', "CUSTOMER NAME")
      ->setCellValue('L1', "HARGA NETTO")
      ->setCellValue('M1', "TAX")
      ->setCellValue('N1', "HARGA JUAL")
      ->setCellValue('O1', "PRICE TYPE")
      ->setCellValue('P1', "NOTES");



      $row = 0;
      $start = 2;

      $salesman = NULL;
      $jenisTransaksi = NULL;

      var_dump(count($barisData));

      foreach ($barisData as $l => $w) {
      $json = json_decode($w);



      if ($start < $maxRow) {
      foreach ($json as $k => $v) {
      $row = $start + $k;

      if (!$isDebug) {

      $date = is_object($v->purchase_date) ? date("d-m-Y", strtotime($v->purchase_date->date)) : NULL;

      $objPHPExcel->setActiveSheetIndex(0)
      ->setCellValue('A' . $row, $v->salesman)
      ->setCellValue('B' . $row, $v->report)
      ->setCellValue('C' . $row, $v->purchaseletter_no)
      ->setCellValue('D' . $row, $date)
      ->setCellValue('E' . $row, $v->cluster_cluster)
      ->setCellValue('F' . $row, $v->block_block)
      ->setCellValue('G' . $row, $v->unit_unit_number)
      ->setCellValue('H' . $row, $v->type_name)
      ->setCellValue('I' . $row, $v->land_size)
      ->setCellValue('J' . $row, $v->building_size)
      ->setCellValue('K' . $row, $v->customer_name)
      ->setCellValue('L' . $row, $v->harga_netto)
      ->setCellValue('M' . $row, $v->tax)
      ->setCellValue('N' . $row, $v->harga_jual)
      ->setCellValue('O' . $row, $v->pricetype)
      ->setCellValue('P' . $row, $v->notes);
      $objPHPExcel->getActiveSheet()->getStyle('D' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_DATE_YYYYMMDDSLASH);
      $objPHPExcel->getActiveSheet()->getStyle('L' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
      $objPHPExcel->getActiveSheet()->getStyle('M' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
      $objPHPExcel->getActiveSheet()->getStyle('N' . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
      }
      }


      $start = $row;
      }

      if ($isDebug) {
      var_dump($start . "---" . $row . "---");
      }

      unset($json);
      }

      if (file_exists($jsonFile)) {
      unlink($jsonFile);
      }

      $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
      $objWriter->save($excelFile);
      $hasil = TRUE;
      } catch (Exception $ex) {
      echo $ex->getMessage();
      die();
      }

      return $hasil;
      }

     */
}
