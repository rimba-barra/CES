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
class Hrd_Models_Training_Trainingattendance_Trainingattendancefile extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingattendanceattach_id;
    private $trainingattendance_id;
    private $employee_id;
    private $file_name;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendancefile_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingattendanceattach_id'])){
           $this->setId($x['trainingattendanceattach_id']); 
        }
        if(isset ($x['trainingattendance_id'])){
           $this->setTrainingAttendanceId($x['trainingattendance_id']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['file_name'])){
           $this->setFileName($x['file_name']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        

        $x = array(
            'trainingattendanceattach_id'=>$this->getId(),
            'trainingattendance_id'=>$this->getTrainingAttendanceId(),
            'employee_id'=>$this->getEmployeeId(),
            'file_name'=>$this->getFileName()
        );
      
        return $x;
    }

    public function getTrainingAttendanceId() {
        return $this->trainingattendance_id;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getFileName() {
        return $this->file_name;
    }

    public function setTrainingAttendanceId($trainingattendance_id) {
        $this->trainingattendance_id = $trainingattendance_id;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setFileName($file_name) {
        $this->file_name = $file_name;
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
