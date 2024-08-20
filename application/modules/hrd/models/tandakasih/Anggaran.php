<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Anggaran
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Tandakasih_Anggaran extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $group;
    private $tipe;
    private $value;
    private $plus;
    
    public function __construct() {
        $this->embedPrefix = "anggarantandakasih_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['anggarantandakasih_id'])){
           $this->setId($x['anggarantandakasih_id']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['tipetandakasih_tipetandakasih_id'])){
           $this->getTipe()->setId($x['tipetandakasih_tipetandakasih_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
      
        if(isset ($x['plus'])){
           $this->setPlus($x['plus']); 
        }
      
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'anggarantandakasih_id'=>$this->getId(),
            'group_group_id'=>$this->getGroup()->getId(),
            'tipetandakasih_tipetandakasih_id'=>$this->getTipe()->getId(),
            'value'=>$this->getValue(),
            'plus'=>$this->getPlus(),
        );
      
        return $x;
    }
    
    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function getTipe() {
        if(!$this->tipe){
            $this->tipe = new Hrd_Models_Tandakasih_Tipe();
        }
        return $this->tipe;
    }

    public function getValue() {
        return $this->value;
    }

    public function getPlus() {
        return $this->plus;
    }

    public function setGroup(Hrd_Models_Master_Group $group) {
        $this->group = $group;
    }

    public function setTipe(Hrd_Models_Tandakasih_Tipe $tipe) {
        $this->tipe = $tipe;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function setPlus($plus) {
        $this->plus = $plus;
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
            $this->pt =  new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function grouped() {
        return array($this->getGroup(),$this->getTipe());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

//put your code here
}
