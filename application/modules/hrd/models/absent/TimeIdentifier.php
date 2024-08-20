<?php

/**
 * Description of TimeIdentifier
 *
 * @author MIS
 */
class Hrd_Models_Absent_TimeIdentifier {
    private $timeIn;
    private $timeOut;
    private $shiftType;
    private $absentDate;
    const RANGE = '04:00:00';
    private $time;
    private $date;

    public function __construct($time=NULL, $date=NULL, Hrd_Models_Master_ShiftType $st=NULL,  Hrd_Models_Master_General_Date $absentDetail=NULL) {
        $this->time = $time;
        $this->date = $date;
        $this->shiftType = $st;
        $this->absentDate = $absentDetail;
        
    }
    public function run(){
        $timeInputObj = new DateTime($this->time);
        $this->absentDate->setNumber(date("d",  strtotime($this->date)));
        $this->process($this->shiftType->getInTime(), $timeInputObj,TRUE);
        $this->process($this->shiftType->getOutTime(), $timeInputObj,FALSE);
    }
    
    private function process($shiftTypeTime,$timeInputObj,$isIn){
        $rangeBot = new DateTime($shiftTypeTime);
        $rangeBot->sub(new DateInterval(Hrd_Models_Absent_Tools::getIntervalSpecFromTime(Hrd_Models_Absent_TimeIdentifier::RANGE)));
        $rangeTop = new DateTime($shiftTypeTime);
        $rangeTop->add(new DateInterval(Hrd_Models_Absent_Tools::getIntervalSpecFromTime(Hrd_Models_Absent_TimeIdentifier::RANGE)));
        if($timeInputObj >= $rangeBot && $timeInputObj <= $rangeTop){
            $this->attachByTimeRange($this->absentDate, $timeInputObj->format("H:i:s"), $isIn);
        }
    }
    
    private function attachByTimeRange(Hrd_Models_Master_General_Date $absentDetail, $time, $isIn = TRUE) {
        if ($time >= '07:00:00' && $time <= '14:59:59') {
            $isIn ? $absentDetail->getTimeA()->setIn($time) : $absentDetail->getTimeA()->setOut($time);
        } else if ($time >= '15:00:00' && $time <= '21:59:59') {
            $isIn ? $absentDetail->getTimeB()->setIn($time) : $absentDetail->getTimeB()->setOut($time);
        } else {
            $isIn ? $absentDetail->getTimeC()->setIn($time) : $absentDetail->getTimeC()->setOut($time);
        }
    
        
    }
    
    public function getTime() {
        if(!$this->time){
            $this->time = "00:00:00";
        }
        return $this->time;
    }

    public function setTime($time) {
        $this->time = $time;
    }

      

    public function getTimeIn() {
        
        return $this->timeIn;
    }

    public function setTimeIn($timeIn) {
        $this->timeIn = $timeIn;
    }

    public function getTimeOut() {
        return $this->timeOut;
    }

    public function setTimeOut($timeOut) {
        $this->timeOut = $timeOut;
    }

    public function getShiftType() {
        if(!$this->shiftType){
            $this->shiftType = new Hrd_Models_Master_ShiftType();
        }
        return $this->shiftType;
    }

    public function setShiftType(Hrd_Models_Master_ShiftType $shiftType) {
        $this->shiftType = $shiftType;
    }

    public function getAbsentDate() {
        if(!$this->absentDate){
            $this->absentDate = new Hrd_Models_Master_General_Date();
        }
        return $this->absentDate;
    }

    public function setAbsentDate(Hrd_Models_Master_General_Date $absentDate) {
        $this->absentDate = $absentDate;
    }


}

?>
