<?php

/**
 * Description of PaymentScheme
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Purchaseletter_PaymentScheme {

    private $file;
    private $fileResult;
    private $objPHPExcel;
    private $purchaseLetterData;
    private $scheduleData;
    private $url;

    const ROWEXCEL_ANGSURAN = 24;
    const ROWEXCEL_UANGMUKA = 20;
    const ROWEXCEL_TANDAJADI = 19;
    const CELLEXCEL_DATE = 'C2';
    const CELLEXCEL_CUSTOMERNAME = 'E7';
    const CELLEXCEL_UNITNUMBER = 'E9';
    const CELLEXCEL_BUILDINGSIZE = 'E10';
    const CELLEXCEL_TYPE = 'E11';
    const CELLEXCEL_TOTALPRICE = 'E12';
    const CELLEXCEL_BASEPRICE = 'I15';
    const CELLEXCEL_VAT = 'I16';
    const CELLEXCEL_BASEPRICEPLUSVAT = 'I18';
    

    function __construct($file) {

        $this->file = realpath(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $file);
      
    }

    protected function load() {
        $this->objPHPExcel = PHPExcel_IOFactory::load($this->file);
    }

    protected function loadPurchaseletter($appData) {
        /// get purchaseletter information
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($appData);
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getOneForPrintout($pl->getId());

        $this->purchaseLetterData = $hasil[1][0];



        // get schedule 

        $hasilSch = $dao->getScheduleById($pl);
        $this->scheduleData = $hasilSch[1];
    }

    public function process($appData) {
        $this->load();
        $this->loadPurchaseletter($appData);



        $this->objPHPExcel->setActiveSheetIndex(0);
        $activeSheet = $this->objPHPExcel->getActiveSheet();

        $row = $activeSheet->getRowIterator(self::ROWEXCEL_ANGSURAN)->current();

        $cellIterator = $row->getCellIterator();
        //  $cellIterator->setIterateOnlyExistingCells(false);
        $replaceStr = array();
        foreach ($cellIterator as $cell) {
            $c = $cell->getColumn();
            $v = $cell->getValue();

            $pos = strpos($cell->getValue(), '$');
            if ($pos > -1) {
                $replaceStr[] = array($v, $c);
            } else if (strlen($cell->getValue()) > 0) {
                $replaceStr[] = array($v, $c);
            }
        }






        $currentRow = self::ROWEXCEL_ANGSURAN;
        $currentRowUM = self::ROWEXCEL_UANGMUKA;
        $currentRowTJ = self::ROWEXCEL_TANDAJADI;


        $jumlahTJ = 0;
        $jumlahUM = 0;
        $jumlahAngsuran = 0;

        $hasilSchTJ = array();
        $hasilSchUM = array();
        $hasilSchAngsuran = array();

        $totalDownPayment = 0.0;
        $totalAngsuran = 0.0;

        foreach ($this->scheduleData as $sch) {
            if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_TANDAJADI) {
                $hasilSchTJ[] = $sch;
                $jumlahTJ++;
                $totalDownPayment +=$sch['amount'];
            } else if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_UANGMUKA) {
                $hasilSchUM[] = $sch;

                $jumlahUM++;
                $totalDownPayment +=$sch['amount'];
            } else {
                $hasilSchAngsuran[] = $sch;
                $jumlahAngsuran++;
                $totalAngsuran += $sch['amount'];
            }
        }









        $this->fillData(array('text' => 'Installment', 'jumlahdata' => $jumlahAngsuran), $activeSheet, $hasilSchAngsuran, $replaceStr, $currentRow);
        $this->fillData(array('text' => 'Down Payment', 'jumlahdata' => $jumlahUM), $activeSheet, $hasilSchUM, $replaceStr, $currentRowUM);
        $this->fillData(array('text' => 'BOOKING FEE', 'jumlahdata' => $jumlahTJ), $activeSheet, $hasilSchTJ, $replaceStr, $currentRowTJ);




        $templateStr = array();
        foreach ($activeSheet->getRowIterator() as $row) {


            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(TRUE); // This loops all cells,
            // even if it is not set.
            // By default, only cells
            // that are set will be
            // iterated.
            foreach ($cellIterator as $cell) {

                $pos = strpos($cell->getValue(), '$');
                if ($pos > -1) {

                    $templateStr[] = array($cell->getValue(), $cell->getColumn(), $cell->getRow());
                }
            }
        }






        $this->fillOther($activeSheet, array(
            'jtj' => $jumlahTJ,
            'jum' => $jumlahUM,
            'jag' => $jumlahAngsuran,
            'totalDP' => $totalDownPayment,
            'totalAngsuran' => $totalAngsuran
                ), $templateStr);





        
        $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');
        $this->fileResult = 'PAYMENTSCHEME_'.str_replace('/', '', $this->purchaseLetterData['purchaseletter_no']).'_'.(time()).'.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/uploads/msexcel/' . $this->fileResult);
        $this->url = 'app/erems/uploads/msexcel/' . $this->fileResult;
    }

    private function fillData($config, $activeSheet, $scheduleData, $replaceStr, $startRow) {
        $jumlahData = intval($config['jumlahdata']);


        if ($jumlahData > 1) {
            $activeSheet->insertNewRowBefore($startRow, $jumlahData - 1);
           /* if ($jumlahData > 1) {
                for ($i = 1; $i <= $jumlahData; $i++) {
                    $activeSheet->getStyle('I' . ($startRow + ($i - 1)))
                            ->getNumberFormat()
                            ->setFormatCode(
                                    '#,##0.00'
                    );
                }
            }*/
        }


        $row = 1;
        $currentRow = $startRow;
        foreach ($scheduleData as $sch) {



            foreach ($replaceStr as $rCell) {
                if ($rCell[0] == '$amount') {
                    $activeSheet->setCellValue($rCell[1] . $currentRow, $sch['amount']);
                    $activeSheet->getStyle($rCell[1] . $currentRow)
                            ->getNumberFormat()
                            ->setFormatCode(
                                    '#,##0.00'
                    );
                } else if ($rCell[0] == '$day') {
                    $activeSheet->setCellValue($rCell[1] . $currentRow, date("j", strtotime($sch['duedate'])));
                } else if ($rCell[0] == '$month') {
                    $activeSheet->setCellValue($rCell[1] . $currentRow, date("M", strtotime($sch['duedate'])));
                } else if ($rCell[0] == '$year') {
                    $activeSheet->setCellValue($rCell[1] . $currentRow, date("Y", strtotime($sch['duedate'])));
                } else if ($rCell[0] == 'Installment  $count') {
                    if ($jumlahData < 2) {
                        $activeSheet->setCellValue($rCell[1] . $currentRow, $config['text']);
                    } else {
                        $activeSheet->setCellValue($rCell[1] . $currentRow, $config['text'] . '  ' . $row);
                    }
                } else {
                    $activeSheet->setCellValue($rCell[1] . $currentRow, $rCell[0]);
                }
            }
            $row++;
            $currentRow++;
        }
    }

    private function fillOther($activeSheet, $data, $templateStr) {
        $pl = $this->purchaseLetterData;
        
       
        $totalJual = doubleval($pl['harga_total_jual']);

        $stText = '* SERAH TERIMA UNIT dilakukan bulan'; // serah terima text * SERAH TERIMA UNIT dilakukan bulan September 2016

        $stText = $stText . ' ' . date('F Y', strtotime($pl['rencana_serahterima_date']));
        $vat = ($totalJual * 0.1);
        $totalJualExcVat = $totalJual - $vat;

        // var_dump($templateStr);
        if (count($templateStr) > 0) {
            foreach ($templateStr as $k => $template) {
                $cell = $template[1] . '' . $template[2];
                if ($template[0] == '$totalJualExcVat') {
                    $activeSheet->setCellValue($cell, $totalJualExcVat);
                } else if ($template[0] == '$purchaseNoAndDate') {
                    $activeSheet->setCellValue($cell, $pl['purchaseletter_no']." / ".date("d-m-Y",  strtotime($pl['purchase_date'])));
                } else if ($template[0] == '$clusterName') {
                    $activeSheet->setCellValue($cell, $pl['cluster_cluster']);
                } else if ($template[0] == '$stText') {
                    $activeSheet->setCellValue($cell, $stText);
                } else if ($template[0] == '$vat') {
                    $activeSheet->setCellValue($cell, $vat);
                } else if ($template[0] == '$totalJual') {
                    $activeSheet->setCellValue($cell, $totalJual);
                } else if ($template[0] == '$cellTotalDp') {
                    $activeSheet->setCellValue($cell, $data['totalDP']);
                } else if ($template[0] == '$tempRow80') {
                    $activeSheet->setCellValue($cell, ($totalJual - doubleval($data['totalDP'])));
                } else if ($template[0] == '$tempRowTotalAg') {
                    $activeSheet->setCellValue($cell, (doubleval($data['totalAngsuran']) + doubleval($data['totalDP'])));
                } else if ($template[0] == '$tempRowNama') {
                    $activeSheet->setCellValue($cell, ucwords($pl['customer_name']));
                } else if ($template[0] == '$nama') {
                    $activeSheet->setCellValue($cell, ucwords($pl['customer_name']));
                } else if ($template[0] == '$unitNumber') {
                    $activeSheet->setCellValue($cell, $pl['block_code'] . '/' . $pl['unit_unit_number']);
                } else if ($template[0] == '$landSize') {
                    $activeSheet->setCellValue($cell, $pl['unit_building_size']);
                } else if ($template[0] == '$tipe') {
                    $activeSheet->setCellValue($cell, isset($pl['type_names'])?$pl['type_names']:"");
                } else if ($template[0] == '$totalPrice') {
                    $activeSheet->setCellValue($cell, $totalJualExcVat);
                } else if ($template[0] == '$ppnbm') {
                    $activeSheet->setCellValue($cell, $pl['price_ppnbm']);
                } else if ($template[0] == '$currencyStyle') {

                    //$template[1].''.$template[2];
                    //  $endRow = intval($template[2]);
                    //  $style  = $activeSheet->getStyle('I'.$endRow);
                    //  $activeSheet->duplicateStyle($style, 'I'.($endRow-  intval($data['jag'])).':I'.$endRow);
                }
            }
        }
    }

    public function getUrl() {
        return $this->url;
    }

}

?>
