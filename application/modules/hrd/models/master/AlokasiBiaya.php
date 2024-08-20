<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AlokasiBiaya
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_AlokasiBiaya extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt   {
    private $project;
    private $pt;
    private $code;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "alokasibiaya_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['alokasibiaya_id'])){
           $this->setId($x['alokasibiaya_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'alokasibiaya_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name'=>$this->getName()
           
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
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
            $this->pt = new Box_Models_Master_Project();
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
        $this->pt = $pt;
    }

}
