<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShiftTypeExcel
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_ShiftTypeExcel {
    private $status;
    private $msg;
    private $minCol;
    private $minRow;
    
    public function __construct() {
       $this->status = FALSE;
       $this->msg = "Process...";
       $this->minCol = 3;
       $this->minRow = 2;
    }
    
    /*@return Decan if success, return false if fail*/
    // start edited by wulan sari 20190102
    //#1
    // public function process_v2($fileName="file.xlsx",Box_Models_App_Session $ses, $month, $year) {
    
    //#2
    // added by Michael 2021.05.19 
    public function process_v2($fileName="file.xlsx",Box_Models_App_Session $ses, $month, $year, $data) {
    // end added by Michael 2021.05.19 
        
        // get all shifttype
        $stDao = new Hrd_Models_Master_ShiftTypeDao();
        $st = new Hrd_Models_Master_ShiftType();

        // $st->setProject($ses->getProject());
        // $st->setPt($ses->getPt());

        // added by Michael 2021.05.19 
        $project = new Box_Models_Master_Project();
        $project->setId($data['project_id']);

        $pt = new Box_Models_Master_Pt();
        $pt->setId($data['pt_id']);

        $st->setProject($project);
        $st->setPt($pt);
        // end added by Michael 2021.05.19 

        $sts = $stDao->getAllWOPL($st);

        $allSt = array();
        unset($st);
        if (Box_Tools::adaRecord($sts)) {
            $allSt = Box_Tools::toObjects("shifttype", $sts, FALSE);
        }
        
        if(count($allSt)==0){
            $this->msg = "Tida ada data shift type";
            return FALSE;
        }

        // end get all shift type

  
     

        $file = $fileName;

        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../'.Box_Config::SHIFTTYPE_EXCEL_PATH.$file));

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
        
       
        $absentDao = new Hrd_Models_AbsentDao();

        $allShifts = array();
        $minCol = $this->minCol; // day start column
        $i = 0;
        $i_success = 0;
        foreach ($rowData as $tRow) {


            $tRow = $tRow[0];
            $tempNIK = NULL;

            for ($j = 0; $j < count($tRow); $j++) {

                $newAbsent = new Hrd_Models_Master_General_Date();
                if ($j >= ($minCol-1)) {

                    $newAbsent->setLate($tRow[0]); // hold employee nik di field late
                    $newAbsent->setDate($j - 1); // hold day

                    /// get shift type id
                    foreach ($allSt as $st) {
                        if ($st->getCode() == $tRow[$j]) {
                            $newAbsent->getShiftType()->setId($st->getId());
                        }
                    }
                }

                if ($newAbsent->getShiftType()->getId() > 0) {
                    $allShifts[] = $newAbsent;
                    
                    $decan = Box_Tools::toDecan($allShifts);
                    //$decan = Box_Tools::toDecan($newAbsent);
                    // var_dump($newAbsent); exit;

                    // $success = $absentDao->updateShiftTypeExcel_v2($ses, $month, $year, $decan);

                    // added by Michael 2021.05.19 
                    $success = $absentDao->updateShiftTypeExcel_v2($ses, $month, $year, $decan, $data);
                    // added by Michael 2021.05.19 
                    
                    if($success){
                        $i_success++;
                    }
                    $allShifts = array();
                    $i++;
                }
            }
        }
        $this->status = TRUE;
        return $this->status;
    }
    // end edited by wulan sari 20190102
    
    /*@return Decan if success, return false if fail*/
    public function process($fileName="file.xlsx",Box_Models_App_Session $ses) {
        
        // get all shifttype
        $stDao = new Hrd_Models_Master_ShiftTypeDao();
        $st = new Hrd_Models_Master_ShiftType();
        $st->setProject($ses->getProject());
        $st->setPt($ses->getPt());
        $sts = $stDao->getAllWOPL($st);
        $allSt = array();
        unset($st);
        if (Box_Tools::adaRecord($sts)) {
            $allSt = Box_Tools::toObjects("shifttype", $sts, FALSE);
        }
        
        if(count($allSt)==0){
            $this->msg = "Tida ada data shift type";
            return FALSE;
        }

        // end get all shift type

  
     

        $file = $fileName;

        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../'.Box_Config::SHIFTTYPE_EXCEL_PATH.$file));

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
        
       

        $allShifts = array();
        $minCol = $this->minCol; // day start column
        foreach ($rowData as $tRow) {


            $tRow = $tRow[0];
            $tempNIK = NULL;

            for ($j = 0; $j < count($tRow); $j++) {

                $newAbsent = new Hrd_Models_Master_General_Date();
                if ($j >= ($minCol-1)) {

                    $newAbsent->setLate($tRow[0]); // hold employee nik di field late
                    $newAbsent->setDate($j - 1); // hold day

                    /// get shift type id
                    foreach ($allSt as $st) {
                        if ($st->getCode() == $tRow[$j]) {
                            $newAbsent->getShiftType()->setId($st->getId());
                        }
                    }
                }
                if ($newAbsent->getShiftType()->getId() > 0) {
                    $allShifts[] = $newAbsent;
                }
            }
        }

        $decan = Box_Tools::toDecan($allShifts);
        $this->status = TRUE;
        $this->msg = "Success";
        return $decan;
    }
    
    public function getStatus(){
        return $this->status;
    }
    
    public function getMsg(){
        return $this->msg;
    }

}
