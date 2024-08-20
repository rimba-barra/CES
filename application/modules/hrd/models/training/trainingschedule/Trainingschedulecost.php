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
class Hrd_Models_Training_Trainingschedule_Trainingschedulecost extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried  {
    private $trainingschedule_id;
    private $training_cost;
    private $accomodation;
    private $transport;
    private $total_cost;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingschedulecost_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['trainingschedulecost_id'])){
           $this->setId($x['trainingschedulecost_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
        }
        if(isset ($x['training_cost'])){
           $this->setTrainingCost($x['training_cost']); 
        }
        if(isset ($x['accomodation'])){
           $this->setAccomodation($x['accomodation']); 
        }
        if(isset ($x['transport'])){
           $this->setTransport($x['transport']); 
        }
        if(isset ($x['total_cost'])){
           $this->setTotalCost($x['total_cost']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingschedulecost_id'=>$this->getId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'training_cost'=>$this->getTrainingCost(),
            'accomodation'=>$this->getAccomodation(),
            'transport'=>$this->getTransport(),
            'total_cost'=>$this->getTotalCost()
        );
      
        return $x;
    }

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getTrainingCost() {
        return $this->training_cost;
    }

    public function getAccomodation() {
        return $this->accomodation;
    }

    public function getTransport() {
        return $this->transport;
    }

    public function getTotalCost() {
        return $this->total_cost;
    }

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
    }

    public function setTrainingCost($training_cost) {
        $this->training_cost = $training_cost;
    }

    public function setAccomodation($accomodation) {
        $this->accomodation = $accomodation;
    }

    public function setTransport($transport) {
        $this->transport = $transport;
    }

    public function setTotalCost($total_cost) {
        $this->total_cost = $total_cost;
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
