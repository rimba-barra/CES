<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JenjangPendidikan
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_General_JenjangPendidikan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
    private $name;
    private $code;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "jenjangpendidikan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['jenjangpendidikan_id'])){
           $this->setId($x['jenjangpendidikan_id']); 
        }
        if(isset ($x['jenjangpendidikan'])){
           $this->setName($x['jenjangpendidikan']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'jenjangpendidikan_id'=>$this->getId(),
            'jenjangpendidikan'=>$this->getName(),
            'code'=>$this->getCode()
            
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function getCode() {
        return $this->code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setCode($code) {
        $this->code = $code;
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

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

//put your code here
}
