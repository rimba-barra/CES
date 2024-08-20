<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DetailDate
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_DetailDate extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Arried {
    private $trainingDetail;
    private $date;
    private $isHadir;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "trainingdate_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['trainingdate_id'])){
           $this->setId($x['trainingdate_id']); 
        }
        if(isset ($x['trainingdetail_trainingdetail_id'])){
           $this->getTrainingDetail()->setId($x['trainingdetail_trainingdetail_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['hadir'])){
           $this->setIsHadir($x['hadir']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingdate_id'=>$this->getId(),
            'trainingdetail_trainingdetail_id'=>$this->getTrainingDetail()->getId(),
            'date'=>$this->getDate(),
            'hadir'=>$this->getIsHadir()
        );
      
        return $x;
    }
    
    public function getTrainingDetail() {
        if(!$this->trainingDetail){
            $this->trainingDetail = new Hrd_Models_Training_TrainingDetail();
        }
        return $this->trainingDetail;
    }

    public function getDate() {
        return $this->date;
    }

    public function getIsHadir() {
        return $this->isHadir;
    }

    public function setTrainingDetail(Hrd_Models_Training_TrainingDetail $trainingDetail) {
        $this->trainingDetail = $trainingDetail;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setIsHadir($isHadir) {
        $this->isHadir = $isHadir;
    }

        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function grouped() {
        return array($this->getTrainingDetail());
    }

}
