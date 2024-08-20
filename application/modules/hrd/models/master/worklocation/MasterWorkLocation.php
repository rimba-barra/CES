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
class Hrd_Models_Master_Worklocation_MasterWorkLocation extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $worklocation;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "masterworklocation_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['worklocation_id'])){
           $this->setId($x['worklocation_id']); 
        }
        if(isset ($x['worklocation'])){
           $this->setWorklocation($x['worklocation']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'worklocation_id'=>$this->getId(),
            'worklocation'=>$this->getWorklocation(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function getWorklocation() {
        return $this->worklocation;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectKP(Box_Models_Master_Project $project) {
        $this->project = '1';
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPtKP(Box_Models_Master_Pt $pt) {
        $this->pt = '1';
    }

    public function setWorklocation($worklocation) {
        $this->worklocation = $worklocation;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    protected function getDatefields() {
        return array("tanggal");
    }

    
    

}
