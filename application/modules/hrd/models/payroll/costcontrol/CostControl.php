<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CostControl
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Costcontrol_CostControl extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $tipe;
    private $code;
    private $description;
    private $urut;
    private $parent;
    private $kodeBank;
    
    public function __construct($embedPrefix="costcontrol_") {
        parent::__construct();
        $this->embedPrefix = $embedPrefix;
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['costcontrol_id'])){
           $this->setId($x['costcontrol_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['urut'])){
           $this->setUrut($x['urut']); 
        }
        if(isset ($x['kode_bank'])){
           $this->setKodeBank($x['kode_bank']); 
        }
        if(isset ($x['parent_id'])){
           $this->setParent($x['parent_id']); 
        }
      /*  if(isset ($x['tipe'])){
           $this->setTipe($x['tipe']); 
        }*/
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'costcontrol_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'description'=>$this->getDescription(),
            'urut'=>$this->getUrut(),
            'kode_bank'=>$this->getKodeBank(),
            'parent_id'=>$this->getParent(),
            'tipe'=>$this->getTipe(),
            
           
        );
      
        return $x;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getUrut() {
        return (int)$this->urut;
    }

    public function getParent() {
        return (int)$this->parent;
    }

    public function getKodeBank() {
        return $this->kodeBank;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setUrut($urut) {
        $this->urut = (int)$urut;
    }

    public function setParent($parent) {
        $this->parent = (int)$parent;
    }

    public function setKodeBank($kodeBank) {
        $this->kodeBank = $kodeBank;
    }
    
    public function getTipe() {
        return (int)$this->tipe;
    }

    public function setTipe($tipe) {
        $this->tipe = (int)$tipe;
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
