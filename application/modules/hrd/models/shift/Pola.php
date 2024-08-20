<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pola
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Shift_Pola extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $code;
    private $description;
    private $batasanLembur;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "polashift_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['polashift_id'])){
           $this->setId($x['polashift_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['batasan_lembur'])){
           $this->setBatasanLembur($x['batasan_lembur']); 
        }
      
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'polashift_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription(),
            'batasan_lembur'=>$this->getBatasanLembur(),
           
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getBatasanLembur() {
        return $this->batasanLembur;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setBatasanLembur($batasanLembur) {
        $this->batasanLembur = $batasanLembur;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
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
    public function grouped() {
        return array();
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt =  $pt;
    }

}
