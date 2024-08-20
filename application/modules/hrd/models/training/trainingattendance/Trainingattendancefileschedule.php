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
class Hrd_Models_Training_Trainingattendance_Trainingattendancefileschedule extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingscheduleattach_id;
    private $trainingschedule_id;
    private $file_name;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingattendancefileschedule_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingattendanceattach_id'])){
           $this->setId($x['trainingattendanceattach_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
        }
        if(isset ($x['file_name'])){
           $this->setFileName($x['file_name']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        

        $x = array(
            'trainingscheduleattach_id'=>$this->getId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'file_name'=>$this->getFileName()
        );
      
        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getFileName() {
        return $this->file_name;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
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
