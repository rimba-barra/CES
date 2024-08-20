<?php

/**
 * Description of ShiftProcessor
 *
 * @author MIS
 */
abstract class Hrd_Models_Absent_ShiftProcessor {

    private $status;
    private $errorMessage;
    private $validator;
    private $holidayData;
    private $absentSheet;
    protected $validatedObject;
    private $appRequest;
    private $session;
    private $shiftDataCount; // jumlah shift data yang ada di database

    public function __construct(Box_Models_App_HasilRequestRead $request,  Box_Models_App_Session $ses) {
        $this->appRequest = $request;
        $this->session = $ses;
        $this->status = FALSE;
        $this->errorMessage = "Error when proccesing shift";
    }

    public function run($validatedObject) {
        if ($this->validator) {

            $this->validator->run($validatedObject);
            if ($this->validator->getStatus()) {
                //set validated object
                $this->validatedObject = $validatedObject;

                $hasilShift = $this->getShiftData();
                if ($hasilShift) {
                    $this->shiftDataCount = count($hasilShift[0]);
                    if ($this->shiftDataCount > 0) {

                        /// get absent sheet
                        $hasilAbsent = $this->getAbsentSheet();
                        if ($hasilAbsent) {
                            if (count($hasilAbsent[0]) > 0) {
                                $this->attachShiftToAbsent($hasilShift[0], $hasilAbsent[0]);
                            } else {
                                $this->errorMessage = "No absent sheet found";
                            }
                        } else {
                            $this->errorMessage = "No absent sheet found";
                        }
                    } else {
                        $this->errorMessage = "No shift data found";
                    }
                } else {
                    $this->errorMessage = "No shift data found";
                }
            } else {
                $this->errorMessage = $this->validator->getMsg();
            }
        }
    }

    protected function getRequest() {
        return $this->appRequest;
    }

    private function attachShiftToAbsent($hasilShiftDao, $hasilAbsentDao) {
        $absent = new Hrd_Models_Absent();
        foreach ($hasilAbsentDao as $row) {
            $tempDate1 = date("Y-m-d", strtotime($row["date"]));
          
            foreach ($hasilShiftDao as $cRow) {
               
                $tempDate2 = date("Y-m-d", strtotime($cRow["date"]));
                if ($tempDate1 == $tempDate2) {
                
                    $absentDetail = new Hrd_Models_Master_General_Date();
                    $absentDetail->setId($row["absentdetail_id"]);
                    $absentDetail->getShiftType()->setId($cRow["shifttype_id"]);
                    $absent->addDetail($absentDetail);
                    
                    
                }
            }
        }
        
        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($absent);
        $de->generate();
        $daoAbs = new Hrd_Models_AbsentDao();
        
        $hasil = $daoAbs->setupShiftByEmployee($absent,$this->session);
         
        $this->status = $hasil>0?TRUE:FALSE;
        $this->errorMessage = $hasil>0?"SUCCESS":"Something error when updating absent records";
    }

    public function getValidator() {
        return $this->validator;
    }

    public function setValidator($validator) {
        $this->validator = $validator;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getErrorMessage() {
        return $this->errorMessage;
    }
    
    public function getShiftDataCount() {
        return $this->shiftDataCount;
    }

    
    /* hasil dari database shift */

    abstract function getShiftData();

    abstract function getAbsentSheet();
}

?>
