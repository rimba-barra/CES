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

class Erems_Models_Library_JsonToExcelWithTemplate {

    public $msg;

    public function process($variables, $jsonFile, $excelFile, $pembagi = 0) {
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

        $objReader = PHPExcel_IOFactory::createReader("Excel2007");
        $objPHPExcel = $objReader->load(APPLICATION_PATH . '/../public/app/erems/uploads/exceltemplate/ReportSales.xlsx');
//  $objPHPExcel = new PHPExcel();
/// DATA
        $dataExcel = $variables;

        $rowKosong = intval($objPHPExcel->setActiveSheetIndex(0)->getHighestRow()) + 1; /// 1 row kosong yang dijadikan acuan untuk copy style kosong;

        $kolomAkhir = $objPHPExcel->setActiveSheetIndex(0)->getHighestColumn();
        $styleKosong = $objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $rowKosong . ":" . "" . $kolomAkhir . "" . $rowKosong);
        $styleFooter = NULL;

        $rangeTplFooter = NULL;


/// SEARCH
        $foundInCells = array();
        $foundRow = array();
        $foundFooter = array();


        $matches = array();
        foreach ($objPHPExcel->getWorksheetIterator() as $worksheet) {
            $ws = $worksheet->getTitle();
            foreach ($worksheet->getRowIterator() as $row) {
                $cellIterator = $row->getCellIterator();
                $cellIterator->setIterateOnlyExistingCells(true);
                foreach ($cellIterator as $cell) {
                    if (preg_match('/{(.*?)}/', $cell->getValue(), $matches) === 1) {
                        $foundInCells[$matches[1]] = array($cell->getCoordinate(), $cell->getValue());
                    }
                    if (preg_match('/d:row(.*?):/', $cell->getValue(), $matches) === 1) {
                        $foundRow[] = array($cell->getCoordinate(), $cell->getValue());
                        $cell->setValue("");
                    }
                    if (preg_match('/g:footer(.*?):/', $cell->getValue(), $matches) === 1) {
                        $foundFooter[] = array($cell->getCoordinate(), $cell->getValue(), str_replace("g:footer:", "", $cell->getValue()));
                        $styleFooter = $objPHPExcel->setActiveSheetIndex(0)->getStyle("A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());

                        // $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleKosong, "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow());
                        $rangeTplFooter = "A" . $cell->getRow() . ":" . $kolomAkhir . "" . $cell->getRow();



                        $row = 1;
                        $lastColumn = $kolomAkhir;
                        $lastColumn++;
                        for ($column = 'A'; $column != $lastColumn; $column++) {

                            $worksheet->getCell($column . $cell->getRow())->setValue("");
                            //  Do what you want with the cell
                        }
                    }
                }
            }
        }

        //   var_dump($foundFooter);
        //  die();
        /// ROW
        if (count($foundRow) > 0) {
            $index = 0;
            $row = $this->get_numerics($foundRow[$index][0]);
            $temp = array();
            foreach ($foundInCells as $found) {
                //$temp
                if ($this->get_numerics($found[0]) == $row) {
                    $replaceKurawal = array("{", "}");
                    $temp[] = array(
                        str_replace($row, "", $found[0]),
                        str_replace($replaceKurawal, "", $found[1])
                    );
                }
            }
            if (count($temp) > 0) {
                $foundRow[$index][] = $temp;
            }
        }


        // var_dump($foundFooter);
        //  var_dump($foundInCells);
/// REPLACE VALUE {DATA}
        foreach ($dataExcel as $k => $v) {
            if (array_key_exists($k, $foundInCells)) {
                $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($foundInCells[$k][0], str_replace("{" . $k . "}", $v, $foundInCells[$k][1]));
            }
        }




/// END SEARCH
        //  $row = 1;
/// HEADER
/// BODY

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
        //   $row = 3;
        $hitungNettPrice = 0;
        $hitungUnit = 0;
        $hitungTotalJual = 0;

        foreach ($barisData as $l => $w) {
            $json = json_decode($w);

            if ($row < $maxRow) {
                foreach ($json as $k => $v) {

                    $date = is_object($v->purchase_date) ? date("d-m-Y", strtotime($v->purchase_date->date)) : NULL;
                    $jenisReport = $v->report;

                    $hitungNettPrice +=$v->harga_netto;
                    $hitungUnit++;
                    $hitungTotalJual +=$v->harga_jual;

                    foreach ($foundRow[0][2] as $field) {
                        $objPHPExcel->setActiveSheetIndex(0)
                                ->setCellValue($field[0] . $row, $v->$field[1]);
                    }


                    if (array_key_exists($k + 1, $json)) {
                        if ($json[$k]->$foundFooter[0][2] <> $json[$k + 1]->$foundFooter[0][2]) {

                            /// FOOTER GROUP
                            $row++;

                            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("F" . $row, $hitungUnit);
                            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("M" . $row, $hitungNettPrice);

                            $objPHPExcel->setActiveSheetIndex(0)->setCellValue("O" . $row, $hitungTotalJual);

                            //  $objPHPExcel->setActiveSheetIndex(0)->setCellValue("K" . $row,$json[$k]->$foundFooter[0][2]."---".$json[$k + 1]->$foundFooter[0][2]);

                            $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":" . $kolomAkhir . "" . $row);
                            $objPHPExcel->setActiveSheetIndex(0)->getStyle("M" . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                            $objPHPExcel->setActiveSheetIndex(0)->getStyle("O" . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                            $textFormat = '@'; //'General','0.00','@
                            $objPHPExcel->setActiveSheetIndex(0)->getStyle("F" . $row)->getNumberFormat()->setFormatCode('#,##0');
                            /// reset total
                            $hitungNettPrice = 0;
                            $hitungUnit = 0;
                            $hitungTotalJual = 0;


                            /// HEADER GROUP
                            $row++;

                            $objPHPExcel->setActiveSheetIndex(0)
                                    ->setCellValue("A" . $row, $v->salesman);
                        }
                    } else { // END OF SHEET
                        /// FOOTER GROUP
                        //$row++;
                        //$objPHPExcel->setActiveSheetIndex(0)->setCellValue("K" . $row, $hitungNettPrice);
                        //   $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":".$kolomAkhir."". $row);
                        /// reset total
                        //  $hitungNettPrice = 0;
                    }




                    /*
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
                     * 
                     */


                    $row++;
                }


//   $start = $row;
            }



            unset($json);
        }

        /// END ROW
        /// GROUP FOOTER
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("F" . $row, $hitungUnit);
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("M" . $row, $hitungNettPrice);

        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("O" . $row, $hitungTotalJual);

        //  $objPHPExcel->setActiveSheetIndex(0)->setCellValue("K" . $row,$json[$k]->$foundFooter[0][2]."---".$json[$k + 1]->$foundFooter[0][2]);

        $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":" . $kolomAkhir . "" . $row);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("M" . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("O" . $row)->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
        $textFormat = '@'; //'General','0.00','@
        $objPHPExcel->setActiveSheetIndex(0)->getStyle("F" . $row)->getNumberFormat()->setFormatCode('#,##0');
        /// reset total
        $hitungNettPrice = 0;
        $hitungUnit = 0;
        $hitungTotalJual = 0;
        /// /GROUP FOOTEr


       // $objPHPExcel->setActiveSheetIndex(0)->duplicateStyle($styleFooter, "A" . $row . ":N" . $row);

        $objPHPExcel->setActiveSheetIndex(0)->getStyle($rangeTplFooter)
                ->applyFromArray(
                        array(
                            'borders' => array(
                                'allborders' => array(
                                    'style' => PHPExcel_Style_Border::BORDER_NONE
                                )
                            )
                        )
        );

        if (file_exists($jsonFile)) {

            unlink($jsonFile);
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $objWriter->save($excelFile);
        $hasil = TRUE;
        return $hasil;
    }

    private function get_numerics($str) {
        preg_match_all('/\d+/', $str, $matches);
        return intval($matches[0][0]);
    }

}
