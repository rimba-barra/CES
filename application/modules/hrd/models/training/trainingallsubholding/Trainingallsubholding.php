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
class Hrd_Models_Training_Trainingallsubholding_Trainingallsubholding extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $pt;
    private $ptid;
    private $subholding_id;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "trainingallsubholding_";
    }

    public function setArrayTable($dataArray = NULL) {
  
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['subholding_id'])){
           $this->setSubholding_id($x['subholding_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        
        unset($x);
    }

    public function getArrayTable() {
     
        $x = array(
            'subholding_id'=>$this->getSubholding_id(),
            'name'=>$this->getName()
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
    
    public function getSubholding_id() {
        return $this->subholding_id;
    }

    public function getName() {
        return $this->name;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setSubholding_id($subholding_id) {
        $this->subholding_id = $subholding_id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
