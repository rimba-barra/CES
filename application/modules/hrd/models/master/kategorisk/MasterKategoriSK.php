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
class Hrd_Models_Master_Kategorisk_MasterKategoriSK extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "masterkategorisk_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['masterkategorisk_id'])){
           $this->setId($x['masterkategorisk_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'masterkategorisk_id'=>$this->getId(),
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

    public function getName() {
        return $this->name;
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

    public function setName($name) {
        $this->name = $name;
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
