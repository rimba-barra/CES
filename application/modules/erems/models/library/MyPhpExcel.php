<?php

/**
 * Description of MyPhpExcel
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Library_MyPhpExcel {

    public $msg;

    public function __construct() {
        
    }

    public function process($data, $dataEscrow, $dataHeader, $excelFile, $filterDate) {
        $hasil = FALSE;





        if (!file_exists($this->fileTemplate)) {
            $this->msg = "Tidak ada file template ";
            return $hasil;
        }





        $objReader = PHPExcel_IOFactory::createReader("Excel2007");
        $objPHPExcel = $objReader->load($this->fileTemplate);

        //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($foundInCells[$k][0], str_replace("{" . $k . "}", $v, $foundInCells[$k][1]));
        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(0); //Setting index when creating
        //Write cells
        $objWorkSheet->setCellValue('A1', 'PROJECT ' . $dataHeader["project_name"])
                ->setCellValue('A2', 'RENCANA PENERIMAAN KPR, DP & CASH / INHOUSE')
                ->setCellValue('A3', $filterDate);
        $objWorkSheet->setCellValue('A5', 'NO')
                ->setCellValue('B5', 'BULAN')
                ->setCellValue('C6', 'KPR')->setCellValue('D6', 'DP')->setCellValue('E6', 'Cash / Inhouse')->setCellValue('F5', 'Total')->setCellValue('G5', 'Total/th')->setCellValue('C5', 'Pembayaran');

        $starRow = 8;
        $count = 1;
        $totalA = 0;
        $totalB = 0;
        $totalC = 0;
        $totalD = 0;
        $total = 0;
        $totalPerTahun = 0;
        $currentYear = 0;
        foreach ($data as $key => $row) {
            $total += $row["KPR"] + $row["DP"] + $row["CASH"];
            // $currentYear = intval($row["Year"]);
            $totalPerTahun += $total;


            $objWorkSheet->setCellValue('A' . $starRow, $count)
                    ->setCellValue('B' . $starRow, Erems_Box_Tools::indoMonthText($row["Month"]) . '-' . $row["Year"])
                    ->setCellValue('C' . $starRow, $row["KPR"])
                    ->setCellValue('D' . $starRow, $row["DP"])
                    ->setCellValue('E' . $starRow, $row["CASH"])
                    ->setCellValue('F' . $starRow, $total);

            if (key_exists($key + 1, $data)) {
                if ($data[$key + 1]["Year"] <> $data[$key]["Year"]) {
                    $objWorkSheet->setCellValue('G' . $starRow, $totalPerTahun);
                    $totalPerTahun = 0;
                }
            } else {
                $objWorkSheet->setCellValue('G' . $starRow, $totalPerTahun);
                $totalPerTahun = 0;
            }


            $totalA += $row["KPR"];
            $totalB += $row["DP"];
            $totalC += $row["CASH"];
            $totalD += $total;

            $total = 0;

            $count++;
            $starRow++;
        }

        $this->styling($objWorkSheet, 8, $starRow - 1);

        $objWorkSheet->setCellValue('B' . $starRow, 'TOTAL')
                ->setCellValue('C' . $starRow, $totalA)
                ->setCellValue('D' . $starRow, $totalB)
                ->setCellValue('E' . $starRow, $totalC)
                ->setCellValue('F' . $starRow, $totalD);






        // Rename sheet
        $objWorkSheet->setTitle("PROJ COLLECTION");

        // ESCROW
        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(1); //Setting index when creating

        $objWorkSheet->setCellValue('A2', 'PROJECT ' . $dataHeader["project_name"])
                ->setCellValue('A3', 'ESCROW / DEPOSITO RETENTION')
                ->setCellValue('A4', 'Per-Tanggal')
                ->setCellValue('C4', $filterDate);

        $objWorkSheet->setCellValue('A6', 'NO')
                ->setCellValue('B6', 'NAMA BANK')
                ->setCellValue('C6', 'Saldo Awal')->setCellValue('D6', 'Mutasi')->setCellValue('E6', 'Saldo Akhir')->setCellValue('F6', 'Keterangan');




        $starRow = 10;
        $count = 1;
        $totalA = 0;
        $totalB = 0;
        $totalC = 0;
        $totalD = 0;
        $total = 0;
        foreach ($dataEscrow as $row) {
            $total += $row["saldo"] - $row["mutasi"];
            $objWorkSheet->setCellValue('A' . $starRow, $count)
                    ->setCellValue('B' . $starRow, $row["bank_name"])
                    ->setCellValue('C' . $starRow, $row["saldo"])
                    ->setCellValue('D' . $starRow, $row["mutasi"])
                    ->setCellValue('E' . $starRow, $total)
                    ->setCellValue('F' . $starRow, 'dana ditahan ' . $row["keterangan"] . ' orang');
            $totalA += $row["saldo"];
            $totalB += $row["mutasi"];
            $totalC += $total;

            $total = 0;


            $count++;
            $starRow++;
        }

        $objWorkSheet->setCellValue('B' . $starRow, 'TOTAL')
                ->setCellValue('C' . $starRow, $totalA)
                ->setCellValue('D' . $starRow, $totalB)
                ->setCellValue('E' . $starRow, $totalC);


        $this->stylingEscrow($objWorkSheet, 10, $starRow - 1);



        // Rename sheet
        $objWorkSheet->setTitle("ESCROW");

        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(0); //Setting index when creating

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $objWriter->save($excelFile);

        $hasil = TRUE;
        return $hasil;
    }

    private function styling($objWorkSheet, $recordRowAwal, $recordRowAkhir) {
        // COLOR
        $styleColor = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'FFFF00')
            ),
            'font' => array(
                'bold' => true
            )
        );

        $objWorkSheet->getStyle('A5:G5')->applyFromArray($styleColor);
        $objWorkSheet->getStyle('C6:E6')->applyFromArray($styleColor);

        $styleMerge = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_JUSTIFY,
            )
        );
        $objWorkSheet->mergeCells("A5:A6");
        $objWorkSheet->getStyle("A5:A6")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("B5:B6");
        $objWorkSheet->getStyle("B5:B6")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("F5:F6");
        $objWorkSheet->getStyle("F5:F6")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("G5:G6");
        $objWorkSheet->getStyle("G5:G6")->applyFromArray($styleMerge);

        $styleBorderThin = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                )
            )
        );

        $styleBorderMedium = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_MEDIUM
                )
            )
        );

        $objWorkSheet->getStyle("A5:G6")->applyFromArray($styleBorderMedium);
        $objWorkSheet->getStyle("A" . $recordRowAwal . ":G" . $recordRowAkhir)->applyFromArray($styleBorderThin);
        $objWorkSheet->getStyle("B" . ($recordRowAkhir + 1) . ":G" . ($recordRowAkhir + 1))->applyFromArray($styleBorderMedium);

        $objWorkSheet->getColumnDimension('B')->setWidth(20);
        $objWorkSheet->getColumnDimension('C')->setWidth(20);
        $objWorkSheet->getColumnDimension('D')->setWidth(20);
        $objWorkSheet->getColumnDimension('E')->setWidth(20);
        $objWorkSheet->getColumnDimension('F')->setWidth(20);
        $objWorkSheet->getColumnDimension('G')->setWidth(20);

        $objWorkSheet->getStyle('C' . $recordRowAwal . ':G' . ($recordRowAkhir + 1))->getNumberFormat()->setFormatCode('#,##0.00');

        $fontSTyle = array(
            'font' => array(
                'bold' => true,
                'size' => 18,
        ));


        $objWorkSheet->getStyle('A1:A2')->applyFromArray($fontSTyle);
        $objWorkSheet->getStyle('A3')->applyFromArray(array(
            'font' => array(
                'bold' => true
        )));
        $objWorkSheet->getStyle('B' . ($recordRowAkhir + 1))->applyFromArray(array(
            'font' => array(
                'bold' => true
        )));

        $objWorkSheet->getRowDimension('7')->setRowHeight(5);
    }

    private function stylingEscrow($objWorkSheet, $recordRowAwal, $recordRowAkhir) {
        $styleColor = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'FFFF00')
            ),
            'font' => array(
                'bold' => true
            )
        );

        $objWorkSheet->getStyle('A6:F8')->applyFromArray($styleColor);

        $styleMerge = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_JUSTIFY,
            )
        );
        $objWorkSheet->mergeCells("A6:A8");
        $objWorkSheet->getStyle("A6:A8")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("B6:B8");
        $objWorkSheet->getStyle("B6:B8")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("C6:C8");
        $objWorkSheet->getStyle("C6:C8")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("D6:D8");
        $objWorkSheet->getStyle("D6:D8")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("E6:E8");
        $objWorkSheet->getStyle("E6:E8")->applyFromArray($styleMerge);
        $objWorkSheet->mergeCells("F6:F8");
        $objWorkSheet->getStyle("F6:F8")->applyFromArray($styleMerge);

        $styleBorderThin = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                )
            )
        );

        $styleBorderMedium = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_MEDIUM
                )
            )
        );

        $objWorkSheet->getStyle("A6:F8")->applyFromArray($styleBorderMedium);
        $objWorkSheet->getStyle("A" . $recordRowAwal . ":F" . $recordRowAkhir)->applyFromArray($styleBorderThin);

        $objWorkSheet->getColumnDimension('A')->setWidth(6);
        $objWorkSheet->getColumnDimension('B')->setWidth(40);
        $objWorkSheet->getColumnDimension('C')->setWidth(20);
        $objWorkSheet->getColumnDimension('D')->setWidth(20);
        $objWorkSheet->getColumnDimension('E')->setWidth(20);
        $objWorkSheet->getColumnDimension('F')->setWidth(40);

        $objWorkSheet->getStyle('C' . $recordRowAwal . ':E' . ($recordRowAkhir + 1))->getNumberFormat()->setFormatCode('#,##0.00');

        $objWorkSheet->getRowDimension('9')->setRowHeight(5);

        $fontSTyle = array(
            'font' => array(
                'bold' => true,
                'size' => 18,
        ));


        $objWorkSheet->getStyle('A2:A3')->applyFromArray($fontSTyle);

        $objWorkSheet->getStyle('A4:C4')->applyFromArray(array(
            'font' => array(
                'bold' => true
        )));

        $objWorkSheet->getStyle('B' . ($recordRowAkhir + 1))->applyFromArray(array(
            'font' => array(
                'bold' => true
        )));
    }

}
