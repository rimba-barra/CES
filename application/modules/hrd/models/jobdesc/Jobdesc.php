<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jobdesc
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Jobdesc_Jobdesc extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $position;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jobdesc_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jobdesc_id'])){
           $this->setId($x['jobdesc_id']); 
        }
        if(isset ($x['position_position_id'])){
           $this->getPosition()->setId($x['position_position_id']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'jobdesc_id'=>$this->getId(),
            'position_position_id'=>$this->getPosition()->getId(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }
    
    public function getPosition() {
        if(!$this->position){
            $this->position = new Hrd_Models_Master_Position();
        }
        return $this->position;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setPosition(Hrd_Models_Master_Position $position) {
        $this->position = $position;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    

    public function grouped() {
        return array($this->getPosition());
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
