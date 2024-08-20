<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingattendance_Trainingattendancedate extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingattendancedate_id;
    private $trainingscheduledate_id;
    private $trainingattendance_id;
    private $employee_id;
    private $trainingscheduledate;
    private $attendance;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendancedate_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingattendancedate_id'])){
           $this->setId($x['trainingattendancedate_id']); 
        }
        if(isset ($x['trainingscheduledate_id'])){
           $this->setTrainingScheduleDateId($x['trainingscheduledate_id']); 
        }
        if(isset ($x['trainingattendance_id'])){
           $this->setTrainingAttendanceId($x['trainingattendance_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['trainingscheduledate'])){
           $this->setTrainingScheduleDate($x['trainingscheduledate']); 
        }
        if(isset ($x['attendance'])){
           $this->setAttendance($x['attendance']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        

        $x = array(
            'trainingattendancedate_id'=>$this->getId(),
            'trainingscheduledate_id'=>$this->getTrainingScheduleDateId(),
            'trainingattendance_id'=>$this->getTrainingAttendanceId(),
            'employee_id'=>$this->getEmployeeId(),
            'trainingscheduledate'=>$this->getTrainingScheduleDate(),
            'attendance'=>$this->getAttendance()
        );
      
        return $x;
    }

    public function getTrainingScheduleDateId() {
        return $this->trainingscheduledate_id;
    }

    public function getTrainingAttendanceId() {
        return $this->trainingattendance_id;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getTrainingScheduleDate() {
        return $this->trainingscheduledate;
    }

    public function getAttendance() {
        return $this->attendance;
    }

    public function setTrainingScheduleDateId($trainingscheduledate_id) {
        $this->trainingscheduledate_id = $trainingscheduledate_id;
    }

    public function setTrainingAttendanceId($trainingattendance_id) {
        $this->trainingattendance_id = $trainingattendance_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setTrainingScheduleDate($trainingscheduledate) {
        $this->trainingscheduledate = $trainingscheduledate;
    }

    public function setAttendance($attendance) {
        $this->attendance = $attendance;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getArray() {
        return $this->getArrayTable();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
