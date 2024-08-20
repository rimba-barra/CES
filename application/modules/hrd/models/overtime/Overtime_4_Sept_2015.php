<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Overtime
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Overtime extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Arried {

    private $startTime;
    private $endTime;
    private $employee;
    private $date;
    private $reason;
    private $status;
    private $takenTime;
    private $netHours;
    private $totalHours;
    private $breakDuration;
    private $value;
    private $durationText;
    private $duration;
    private $dayType;
    private $factors;
    private $factorDisplay;
    private $basicValue;
    private $extraMeal;
    
    /* total result of the all factors */
    private $totalFactorResult;

    public function __construct($takenTime = NULL) {
        parent::__construct();
        $this->embedPrefix = "overtime_";
        $this->factors = array();
        $this->constructFactorDisplay();
        if ($takenTime) {
            $this->takenTime = $takenTime;
        }
    }

    public function setArrayTable($dataArray = NULL) {

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['overtime_id'])) {
            $this->setId($x['overtime_id']);
        }
        if (isset($x['start_time'])) {
            $this->setStartTime($x['start_time']);
        }
        if (isset($x['end_time'])) {
            $this->setEndTime($x['end_time']);
        }

        if (isset($x['date'])) {
            $this->setDate($x['date']);
        }
        if (isset($x['reason'])) {
            $this->setReason($x['reason']);
        }
        if (isset($x['status'])) {
            $this->setStatus($x['status']);
        }
        if (isset($x['takentime'])) {
            $this->setTakenTime($x['takentime']);
        }
       
        if (isset($x['total_hours'])) {
            $this->setTotalHours($x['total_hours']);
        }
        if (isset($x['break_duration'])) {
            $this->setBreakDuration($x['break_duration']);
        }
        if (isset($x['value'])) {
            $this->setValue($x['value']);
        }
        if (isset($x['day_type'])) {
            $this->setDayType($x['day_type']);
        }
        if (isset($x['net_hours'])) {
            $this->setNetHours($x['net_hours']);
        }
        if (isset($x['duration_text'])) {
            $this->setDurationText($x['duration_text']);
        }

        if (is_array($this->factorDisplay)) {
            $count = 1;
            foreach ($this->factorDisplay as $factor) {
                if ($factor instanceof Hrd_Models_Overtime_Factor) {
                    if (isset($x['factor_factor' . $count])) {
                        $this->getFactorDisplay($count - 1)->setFactor($x['factor_factor' . $count]);
                    }
                    if (isset($x['factor_result' . $count])) {
                        $this->getFactorDisplay($count - 1)->setResult($x['factor_result' . $count]);
                    }
                    if (isset($x['factor_value' . $count])) {
                        $this->getFactorDisplay($count - 1)->setValue($x['factor_value' . $count]);
                    }
                }
                $count++;
            }
        }

        /// direct fill factor
        $count = 1;
        while ($count <= 3) {
            if (isset($x['factor'.$count])) {
              
                $this->getFactorDisplay($count - 1)->setFactor($x['factor'.$count]);
            }
            if (isset($x['factor'.$count.'_value'])) {
             
                $this->getFactorDisplay($count - 1)->setValue($x['factor'.$count.'_value']);
            }
            if (isset($x['factor'.$count.'_result'])) {
                $this->getFactorDisplay($count - 1)->setResult($x['factor'.$count.'_result']);
            }
            $count++;
        }






        unset($x);
    }

    public function getArrayTable() {

        $x = array(
            'overtime_id' => $this->getId(),
            'start_time' => $this->getStartTime(),
            'end_time' => $this->getEndTime(),
            'date' => $this->getDate(),
            'reason' => $this->getReason(),
            'status' => $this->getStatus(),
            'takentime' => $this->getTakenTime(),
            'total_hours' => $this->getTotalHours(),
            'break_duration' => $this->getBreakDuration(),
            'value' => $this->getValue(),
            'day_type' => $this->getDayType(),
            'net_hours' => $this->getNetHours(),
            'duration_text' => $this->getDurationText()
        );

        if (is_array($this->factorDisplay)) {
            $count = 1;
            foreach ($this->factorDisplay as $factor) {

                if ($factor instanceof Hrd_Models_Overtime_Factor) {
                    $x['factor_factor' . $count] = $factor->getFactor();
                    $x['factor_result' . $count] = $factor->getResult();
                    $x['factor_value' . $count] = $factor->getValue();
                }
                $count++;
            }
        }
        
        /// direct fill factor
        $count = 1;
        while ($count <= 3) {
            $x['factor'.$count] = $this->getFactorDisplay($count - 1)->getFactor();
            $x['factor'.$count.'_value'] = $this->getFactorDisplay($count - 1)->getValue();
            $x['factor'.$count.'_result'] = $this->getFactorDisplay($count - 1)->getResult();
           
            $count++;
        }

        return $x;
    }

    public function getStartTime() {
        return $this->startTime;
    }

    public function setStartTime($startTime) {
        $this->startTime = $startTime;
    }

    public function getEndTime() {
        return $this->endTime;
    }

    public function setEndTime($endTime) {
        $this->endTime = $endTime;
    }

    public function getEmployee() {
        return $this->employee;
    }

    public function setEmployee($employee) {
        $this->employee = $employee;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getReason() {
        return $this->reason;
    }

    public function setReason($reason) {
        $this->reason = $reason;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getTakenTime() {
        return $this->takenTime;
    }

    public function setTakenTime($overtimeTakenTime) {
        $this->takenTime = $overtimeTakenTime;
    }

    public function getTotalHours() {
        return $this->totalHours;
    }

    public function setTotalHours($totalHours) {
        $this->totalHours = $totalHours;
    }

    public function getBreakDuration() {
        return $this->breakDuration;
    }

    public function setBreakDuration($breakDuration) {
        $this->breakDuration = $breakDuration;
    }

    public function getDurationText() {
        return $this->durationText;
    }

    public function setDurationText($durationText) {
        $this->durationText = $durationText;
    }

    public function getDuration() {

        return $this->duration;
    }

    public function setDuration(Hrd_Models_App_Date $duration) {
        $this->duration = $duration;
        $this->netHours = $duration->getHour();
        $this->durationText = $duration->getHour() . ":" . $duration->getMinute();
    }

    public function getNetHours() {
        return $this->netHours;
    }

    public function setNetHours($netHours) {
        $this->netHours = $netHours;
    }

    public function getDayType() {
        return $this->dayType;
    }

    public function setDayType($dayType) {
        $this->dayType = $dayType;
    }
    
    public function getTotalFactorResult() {
        return $this->totalFactorResult;
    }

    public function setTotalFactorResult($totalFactorResult) {
        $this->totalFactorResult = (double)$totalFactorResult;
    }

    
    public function addFactor(Hrd_Models_Overtime_Factor $factor) {
        $this->factors[] = $factor;
    }

    public function setFactorDisplay($pos, Hrd_Models_Overtime_Factor $factor) {
        $this->factorDisplay[$pos] = $factor;
    }

    /* @return void */

    public function constructFactorDisplay() {
        $f = array();
        for ($i = 0; $i < 3; $i++) {
            $f[] = new Hrd_Models_Overtime_Factor();
        }
        $this->factorDisplay = $f;
    }

    public function getFactorDisplay($pos = -1) {
        if (!$this->factorDisplay) {
            $this->constructFactorDisplay();
        }
        if ($pos >= 0) {
            return $this->factorDisplay[$pos];
        }
        return $this->factorDisplay;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee());
    }

    public function getArray() {
        return $this->getArrayTable();
    }

}

?>
