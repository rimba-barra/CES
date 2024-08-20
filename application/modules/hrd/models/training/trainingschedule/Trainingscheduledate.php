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
class Hrd_Models_Training_Trainingschedule_Trainingscheduledate extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingschedule_id;
    private $trainingscheduledate;
    private $hadir;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingcaption_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingscheduledate_id'])){
           $this->setId($x['trainingscheduledate_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
        }
        if(isset ($x['trainingscheduledate'])){
           $this->setTrainingScheduleDate($x['trainingscheduledate']); 
        }
        if(isset ($x['hadir'])){
           $this->setHadir($x['hadir']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingscheduledate_id'=>$this->getId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'trainingscheduledate'=>$this->getTrainingScheduleDate(),
            'hadir'=>$this->getHadir()
        );
      
        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getTrainingScheduleDate() {
        return $this->trainingscheduledate;
    }

    public function getHadir() {
        return $this->hadir;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
    }

    public function setTrainingScheduleDate($trainingscheduledate) {
        $this->trainingscheduledate = $trainingscheduledate;
    }

    public function setHadir($hadir) {
        $this->hadir = $hadir;
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
