<?php

/**
 * Description of ExcelKtPiutangFin
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Library_ExcelKtPiutangFin {

    public $msg;
    private $saldoPPhOwner;
    private $saldoPPhPartner;
    private $saldoPJ;
    private $saldoSJ;
    private $saldoA;
    private $saldoB;

    public function __construct() {
        
    }

    public function process($excelFile, $kartuPiutangAcc, $kartuPiutangHEader) {
        $hasil = FALSE;

        //   var_dump($kartuPiutangAcc);

        if (!file_exists($this->fileTemplate)) {
            $this->msg = "Tidak ada file template ";
            return $hasil;
        }


        $objReader = PHPExcel_IOFactory::createReader("Excel2007");
        $objPHPExcel = $objReader->load($this->fileTemplate);

        $dataExcel = array(
            "NAMA" => $kartuPiutangHEader["customer_name"],
            "ALAMAT SURAT" => $kartuPiutangHEader["customer_address"],
            "ALAMAT KTP" => $kartuPiutangHEader["customer_address"],
            "NPWP" => $kartuPiutangHEader["customer_npwp"],
            "NO. SP " => $kartuPiutangHEader["purchaseletter_no"],
            "TGL. SP " => date("d-m-Y", strtotime($kartuPiutangHEader["customer_name"])),
            "TIPE " => $kartuPiutangHEader["type_name"],
            "KAWASAN " => $kartuPiutangHEader["cluster"],
            "BLOCK" => $kartuPiutangHEader["unit_number"],
            "LUAS TANAH " => $kartuPiutangHEader["land_size"] . " m2",
            "LUAS BGN" => $kartuPiutangHEader["building_size"] . " m2"
        );

        $dataExcel2 = array(
            "HRG TANAH PER MTR SEBELUM DISC" => $kartuPiutangHEader["tanahpermeter"],
            "DISC HRG TANAH" => $kartuPiutangHEader["harga_dischargatanah"],
            "HRG TANAH PER MTR" => $kartuPiutangHEader["tanahpermeter"],
            "HARGA NETTO" => $kartuPiutangHEader["harga_netto"],
            "BAJB" => $kartuPiutangHEader["harga_bajb"],
            "BBN SERT." => $kartuPiutangHEader["harga_bbnsertifikat"],
            "BPHTB" => $kartuPiutangHEader["harga_bphtb"],
            "NILAI PPN TANAH" => $kartuPiutangHEader["harga_ppntanah"],
            "NILAI PPN BGN" => $kartuPiutangHEader["harga_ppnbangunan"],
            "NILAI PPh22" => 0.0,
            "HARGA JUAL" => $kartuPiutangHEader["harga_total_jual"]
        );
        
        $hargaJual = doubleval($kartuPiutangHEader["harga_total_jual"]);
        $this->saldoPPhOwner = $hargaJual;
        $this->saldoPPhPartner = $hargaJual;
        $this->saldoPJ = $hargaJual;
        $this->saldoSJ = $hargaJual;
        $this->saldoA = $hargaJual;
        $this->saldoB = $hargaJual;
        
        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(0); //Setting index when creating

        // Rename sheet
        $objWorkSheet->setTitle("KartuPiutangTanpa_SJ_PPN_PPH_A");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 0,$hargaJual);

        /// B
        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(1);
        $objWorkSheet->setTitle("KartuPiutangTanpa_SJ_PPN_PPH_B");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 1,$hargaJual);



        /// C
        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(2);
        $objWorkSheet->setTitle("KartuPiutangKhusus_SJ");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 2,$hargaJual);


        /// C
        //  $objWorkSheet = $objPHPExcel->setActiveSheetIndex(3);
        $objWorkSheet = $objPHPExcel->createSheet(3);
        $objWorkSheet->setTitle("KartuPiutangKhusus_PJ");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 3,$hargaJual);

        /// D
        $objWorkSheet = $objPHPExcel->createSheet(4);
        $objWorkSheet->setTitle("KartuPiutangKhusus_PPHPartner");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 4,$hargaJual);

        /// E
        $objWorkSheet = $objPHPExcel->createSheet(5);
        $objWorkSheet->setTitle("KartuPiutangKhusus_PPHOwner");
        $this->mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, 5,$hargaJual);


        $objWorkSheet = $objPHPExcel->setActiveSheetIndex(0);

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $objWriter->save($excelFile);

        $hasil = TRUE;
        return $hasil;
    }

    private function mappingData($dataExcel, $dataExcel2, $kartuPiutangAcc, $objWorkSheet, $indexSheet,$hargaJual) {
        $count = 1;
        $startTableRow = 0;
        foreach ($dataExcel as $k => $v) {
            $objWorkSheet->setCellValue('A' . $count, $k);

            $objWorkSheet->setCellValue('C' . $count, ":" . $v);
            $count++;
        }

        $this->stylingHeader($objWorkSheet, 1, $count);

        $startTableRow = $count;
        $startTableRow0 = $startTableRow;

        $count = 1;
        foreach ($dataExcel2 as $k => $v) {
            $objWorkSheet->setCellValue('D' . $count, $k);
            $objWorkSheet->setCellValue('E' . $count, ":");
            $objWorkSheet->setCellValue('F' . $count, $v);
            $count++;
        }


        // header
        $objWorkSheet->setCellValue('A' . $startTableRow, "TGL");
        $objWorkSheet->setCellValue('B' . $startTableRow, "NOMOR BUKTI");
        $objWorkSheet->setCellValue('C' . $startTableRow, "KETERANGAN");
        $objWorkSheet->setCellValue('D' . $startTableRow, "DEBET");
        $objWorkSheet->setCellValue('E' . $startTableRow, "KREDIT");
        $objWorkSheet->setCellValue('F' . $startTableRow, "SALDO");



        $startTableRow = $startTableRow + 1;
        $debitVal = 0;
        $kreditVal = 0;
        
      
        
        foreach ($kartuPiutangAcc as $row) {
            // $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row);


            if ($indexSheet == 5 && intval($row["flag_pph_owner"]) == 1) {
                $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet);
                $startTableRow++;
                $kreditVal = 0;
                $debitVal = 0;
            } else if ($indexSheet == 4 && intval($row["flag_pph_partner"]) == 1) {
                $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet);
                $startTableRow++;
                $kreditVal = 0;
                $debitVal = 0;
            } else if ($indexSheet == 3 && intval($row["flag_pj"]) == 1) {
                $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet);
                $startTableRow++;
                $kreditVal = 0;
                $debitVal = 0;
            } else if ($indexSheet == 2 && intval($row["flag_sj"]) == 1) {
                $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet);
                $startTableRow++;
                $kreditVal = 0;
                $debitVal = 0;
            } else if( ($indexSheet==1 ||  $indexSheet==0) && intval($row["flag_sj"]) == 0 && intval($row["flag_pj"]) == 0 && intval($row["flag_pph_partner"]) == 0 && intval($row["flag_pph_owner"]) == 0){
                $this->mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet);
                $startTableRow++;
                $kreditVal = 0;
                $debitVal = 0;
            }
        }

        $this->styling($objWorkSheet, $startTableRow0, $startTableRow - 1);

        $objWorkSheet->getColumnDimension('A')->setWidth(10);
        $objWorkSheet->getColumnDimension('B')->setWidth(13);
        $objWorkSheet->getColumnDimension('C')->setWidth(64);
        $objWorkSheet->getColumnDimension('D')->setWidth(14);
        $objWorkSheet->getColumnDimension('E')->setWidth(14);
        $objWorkSheet->getColumnDimension('F')->setWidth(20);
    }

    private function mappingJurnal($kreditVal, $debitVal, $objWorkSheet, $startTableRow, $row,$indexSheet) {
        if ($row["sts_mutasi"] == "C") {
            $kreditVal = $row["mutasi"];
        } else {
            $debitVal = $row["mutasi"];
        }
        
        $saldo = 0.0;
        
        if($indexSheet==5){
            $this->saldoPPhOwner = $row["sts_mutasi"] == "C"? $this->saldoPPhOwner - doubleval($row["mutasi"]) : $this->saldoPPhOwner + doubleval($row["mutasi"]); 
            $saldo = $this->saldoPPhOwner;
        }else if($indexSheet==4){
            $this->saldoPPhPartner = $row["sts_mutasi"] == "C"? $this->saldoPPhPartner - doubleval($row["mutasi"]) : $this->saldoPPhPartner + doubleval($row["mutasi"]); 
            $saldo = $this->saldoPPhPartner;
        }else if($indexSheet==3){
            $this->saldoPJ = $row["sts_mutasi"] == "C"? $this->saldoPJ - doubleval($row["mutasi"]) : $this->saldoPJ + doubleval($row["mutasi"]); 
            $saldo = $this->saldoPJ;
        }else if($indexSheet==2){
            $this->saldoSJ = $row["sts_mutasi"] == "C"? $this->saldoSJ - doubleval($row["mutasi"]) : $this->saldoSJ + doubleval($row["mutasi"]); 
            $saldo = $this->saldoSJ;
        }else if($indexSheet==1){
            $this->saldoB = $row["sts_mutasi"] == "C"? $this->saldoB - doubleval($row["mutasi"]) : $this->saldoB + doubleval($row["mutasi"]); 
            $saldo = $this->saldoB;
        }else if($indexSheet==0){
            $this->saldoA = $row["sts_mutasi"] == "C"? $this->saldoA - doubleval($row["mutasi"]) : $this->saldoA + doubleval($row["mutasi"]); 
            $saldo = $this->saldoA;
        }
        
        $objWorkSheet->setCellValue('A' . $startTableRow, date("d-m-Y", strtotime($row["tgl_vch"])));
        $objWorkSheet->setCellValue('B' . $startTableRow, $row["no_vch"]);
        $objWorkSheet->setCellValue('C' . $startTableRow, $row["ket"]);
        $objWorkSheet->setCellValue('D' . $startTableRow, $debitVal);
        $objWorkSheet->setCellValue('E' . $startTableRow, $kreditVal);
        $objWorkSheet->setCellValue('F' . $startTableRow, $saldo);
    }

    private function styling($objWorkSheet, $rowAwal, $rowAkhir) {


        $styleBorderThin = array(
            'borders' => array(
                'right' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                )
            )
        );

        $styleBorderMed = array(
            'borders' => array(
                'bottom' => array(
                    'style' => PHPExcel_Style_Border::BORDER_MEDIUM
                )
            )
        );

        $styleBorderRightMed = array(
            'borders' => array(
                'right' => array(
                    'style' => PHPExcel_Style_Border::BORDER_MEDIUM
                )
            )
        );

        $fontBoldColor = array(
            'font' => array(
                'bold' => true
            )
        );

        $koloms = array("A", "B", "C", "E", "D", "F");

        foreach ($koloms as $kol) {
            $objWorkSheet->getStyle($kol . '' . ($rowAwal - 1))->applyFromArray($styleBorderMed);
            $objWorkSheet->getStyle($kol . '' . $rowAwal)->applyFromArray($styleBorderMed);
            $objWorkSheet->getStyle($kol . '' . $rowAkhir)->applyFromArray($styleBorderMed);
            $objWorkSheet->getStyle($kol . '' . $rowAwal)->applyFromArray($fontBoldColor);
        }



        for ($i = $rowAwal; $i <= $rowAkhir; $i++) {

            foreach ($koloms as $kol) {
                $objWorkSheet->getStyle($kol . '' . $i)->applyFromArray($styleBorderThin);
            }

            $objWorkSheet->getStyle('F' . $i)->applyFromArray($styleBorderRightMed);
            
            $objWorkSheet->getStyle('D' . $rowAwal . ':F' .$rowAkhir)->getNumberFormat()->setFormatCode('#,##0.00');
        }
    }

    private function stylingHeader($objWorkSheet, $rowAwal, $rowAkhir) {

        $objWorkSheet->getStyle('F' . $rowAwal . ':F' .$rowAkhir)->getNumberFormat()->setFormatCode('#,##0.00');


        $fontBoldColor = array(
            'font' => array(
                'bold' => true
            )
        );

        $koloms = array("A", "B", "C", "E", "D", "F");


        


        for ($i = $rowAwal; $i <= $rowAkhir; $i++) {

            foreach ($koloms as $kol) {
                $objWorkSheet->getStyle($kol . '' . $i)->applyFromArray($fontBoldColor);
            }
        }
    }

}
