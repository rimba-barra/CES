<?php

/**
 * Description of ExcelProcessor
 *
 * @author MIS
 */
class Hrd_Models_Absent_ExcelProcessor {
    private $status;
    private $message;
    
    public function __construct() {
        $this->status = FALSE;
        $this->message = "Error";
    }
    
    public function getStatus() {
        return $this->status;
    }

    public function getMessage() {
        return $this->message;
    }

        
    public function run($month,$year,$creator,  Box_Models_App_Session $ses,  Box_Models_App_HasilRequestRead $request){
        $data = new Hrd_Models_Absent_Data_Excel();
        $data->setSession($ses);
        $importer = new Hrd_Models_Absent_Importer($data);
        $importer->process();
        
      

        $excelAbsent = $importer->getHeader();


        $dao = new Hrd_Models_AbsentDao();

        $absent = new Hrd_Models_Absent();
        $absent->setMonth($month);
        $absent->setYear($year);
        $absent->setProject($ses->getProject());
        $absent->setPt($ses->getPt());

        // get employee absent sheet
        $allAbsentFingerPrint = $dao->getAllAbsentFingerPrint($absent);

        $tempDate = NULL;
        $absentHeader = new Hrd_Models_Absent();

        /* get all shifttype */
        $daost = new Hrd_Models_Master_ShiftTypeDao();
        $shifTypes = $daost->getAll($request, new Hrd_Models_Master_ShiftType());
        $shifTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);

        $hal = new Hrd_Models_Absent_ProcessHal();

        

        if (count($allAbsentFingerPrint[0]) > 0) { // jika ada sheet
            foreach ($allAbsentFingerPrint[0] as $row) {
             
                $tempDate = date("Y-m-d", strtotime($row["date"]));
               
                foreach ($excelAbsent->getDetail() as $fpRow) {
                
                    if ($fpRow instanceof Hrd_Models_Fingerprint_FingerPrint) {
                        
                        if ($row["employee_fingerprintcode"] > 0) {

                            if ($row["employee_fingerprintcode"] == $fpRow->getNumber()) {
                                

                                if ($tempDate == $fpRow->getDate()) {
                                    $absenDetail = new Hrd_Models_Master_General_Date();
                                    $absenDetail->setId($row["absentdetail_id"]);
                                    Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow->getTimeIn(), TRUE);
                                    Hrd_Models_Absent_Tools::attachTimeByShiftType($absenDetail, $fpRow->getTimeOut(), FALSE);

                                    // process late
                                    if (count($shifTypes) > 0) {
                                        foreach ($shifTypes as $st) {
                                            if ($row["shifttype_id"] == $st->getId()) {
                                                Hrd_Models_Absent_Tools::attachLate($absenDetail, $st->getInTime(), $st);
                                                Hrd_Models_Absent_Tools::attachAttendance($absenDetail, $st);
                                                $hal->attachProcess($absenDetail, $st);
                                            }
                                        }
                                    }

                                    $absentHeader->addDetail($absenDetail);
                                }
                            }
                        }
                    }
                } // end loop excel absent
            }
        }



        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($absentHeader);
        $de->generate();
        
        echo "<pre>";
        var_dump($absentHeader->getDCResult());
        echo "</pre>";
        die();


        $hasil = $dao->updateAbsentByFingerPrint($absentHeader,$ses);
        if($hasil){
            $this->status = TRUE;
            $this->message = "Success";
        }else{
            $this->message = "Error when updating absent sheet";
        }
    }
}

?>
