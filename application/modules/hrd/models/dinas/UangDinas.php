<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UangDinas
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_UangDinas extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt,Box_Delien_DelimiterCandidate {
    private $project;
    private $pt;
    private $masterSk;
    private $isDefault;
    private $description;
    private $detail;
    private $DCResult;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "uangdinas_";
        $this->detail = array();
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['uangdinas_id'])){
           $this->setId($x['uangdinas_id']); 
        }
        if(isset ($x['mastersk_mastersk_id'])){
           $this->getMasterSk()->setId($x['mastersk_mastersk_id']); 
        }
        if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'uangdinas_id'=>$this->getId(),
            'mastersk_mastersk_id'=>$this->getMasterSk()->getId(),
            'is_default'=>$this->getIsDefault(),
            'description'=>$this->getDescription()
           
        );
      
        return $x;
    }
    
    public function getMasterSk() {
        if(!$this->masterSk){
            $this->masterSk = new Hrd_Models_Master_Sk_MasterSK();
            //$this->masterSk = new HRd_models_
        }
        return $this->masterSk;
    }

    public function getIsDefault() {
        return $this->isDefault;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setMasterSk(Hrd_Models_Master_Sk_MasterSK $masterSk) {
        $this->masterSk = $masterSk;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }

    public function setDescription($description) {
        $this->description = $description;
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
        $this->pt = $pt;
    }

    public function getDCArray() {
         return $this->detail;
    }

    public function getDCResult() {
         return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    public function addDetail(Hrd_Models_Dinas_UangDinasDetail $detail){
        $this->detail[] = $detail;
    }
    
    public function getDetail($index = -1){
        if($index >= 0){
            return $this->detail[$index];
        }else{
            return $this->detail;
        }
    }


}
