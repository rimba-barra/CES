<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ImportExcel
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Transfer_ImportExcel {

    private $status;
    private $msg;
    private $minCol;
    private $minRow;

    public function __construct() {
        $this->status = FALSE;
        $this->msg = "Process...";
        $this->minCol = 3;
        $this->minRow = 1;
    }

    /* @return Decan if success, return false if fail */

    public function process($fileName = "file.xlsx", Box_Models_App_Session $ses) {





        $file = $fileName;

        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../' . Box_Config::TRANSFERDATA_EXCEL_PATH . $file));

        $excel->setActiveSheetIndex(0);
        //  Get worksheet dimensions
        $sheet = $excel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        $rowData = array();
//  Loop through each row of the worksheet in turn
        for ($row = $this->minRow; $row <= $highestRow; $row++) {
            //  Read a row of data into an array
            $rowData[] = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            //  Insert row data array into your database of choice here
        }


        $found = $this->checkAllCellMoney($rowData);
      
        
        if ($found > 0) {
            $this->status = FALSE;
            $this->msg = "Pastikan semua nilai tidak ada huruf";
        } else {
            $this->status = TRUE;
            $this->msg = "Success";
        }


        return $rowData[0][0];
    }

    /* mengecek semua cell di excel valunya tipe data money */

    private function checkAllCellMoney($rowData) {
        $found = 0;
        foreach ($rowData as $rKey => $row) {
            if ($rKey > 0) {
                foreach ($row as $col) {

                    foreach ($col as $ceKey => $cell) {
                        if ($ceKey > 1) {
                       
                            if (is_string($cell)) {
                                $found++;
                            }
                        }
                    }
                }
            }
        }
        return $found;
    }

    public function processDataEmployee($fileName = "file.xlsx", Box_Models_App_Session $ses, $allHeader) {
        $file = $fileName;
        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../' . Box_Config::TRANSFERDATA_EXCEL_PATH . $file));
        $excel->setActiveSheetIndex(0);
        $sheet = $excel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        $rowData = array();
        $minRow = 2; // mulai dari baris 2
        $indexNik = 0;
        $allTransferDetail = array();
        for ($row = $minRow; $row <= $highestRow; $row++) {
            $excelRow = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            $excelRow = $excelRow[0];
            foreach ($allHeader as $header) {
                $indexKomponen = intval($header->getNo()) - 1;
                $value = $header->getIsRoundUp() === "Ya" ? ceil($excelRow[$indexKomponen]) : $excelRow[$indexKomponen];
                $transferDetail = new Hrd_Models_Payroll_Transfer_TransferDetail();
                $transferDetail->setTransfer($header);
                $transferDetail->setValue($value);
                $transferDetail->getEmployee()->setNik($excelRow[$indexNik]);
                $allTransferDetail[] = $transferDetail;
            }
        }



        $this->status = TRUE;
        $this->msg = "Success";
        return $allTransferDetail;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getMsg() {
        return $this->msg;
    }

}
