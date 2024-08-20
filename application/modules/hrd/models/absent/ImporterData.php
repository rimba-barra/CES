<?php

abstract class Hrd_Models_Absent_ImporterData{
    protected $status;
    protected $errorMessage;
    protected $finalData;
    protected $month;
    protected $year;
    protected $startDay;
    protected $endDay;
    protected $errorCells; // added by rico 24012024

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getErrorMessage() {
        return $this->errorMessage;
    }

    public function setErrorMessage($errorMessage) {
        $this->errorMessage = $errorMessage;
    }
    
    public function getFinalData() {
        return $this->finalData;
    }

    public function setFinalData($finalData) {
        $this->finalData = $finalData;
    }
    
    public function getMonth() {
        return $this->month;
    }

    public function setMonth($month) {
        $this->month = $month;
    }

    public function getYear() {
        return $this->year;
    }

    public function setYear($year) {
        $this->year = $year;
    }
    
    public function getStartDay() {
        return $this->startDay;
    }

    public function setStartDay($startDay) {
        $this->startDay = $startDay;
    }

    public function getEndDay() {
        return $this->endDay;
    }

    public function setEndDay($endDay) {
        $this->endDay = $endDay;
    }

    // added by rico 24012024
    public function getErrorCells() {
        return $this->errorCells;
    }

    // added by rico 24012024
    public function setErrorCells($errorCells) {
        $this->errorCells = $errorCells;
    }

    abstract function process();
}

?>
