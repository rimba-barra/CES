<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TunjanganGroup
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Tunjangan_TunjanganGroup extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $komponenGaji;
    private $group;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "tunjangangroup_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['tunjangangroup_id'])){
           $this->setId($x['tunjangangroup_id']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponenGaji()->setId($x['komponengaji_komponengaji_id']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'tunjangangroup_id'=>$this->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponenGaji()->getId(),
            'group_group_id'=>$this->getGroup()->getId(),
            'value'=>$this->getValue()
            
           
        );
      
        return $x;
    }
    
    public function getKomponenGaji() {
        if(!$this->komponenGaji){
            $this->komponenGaji = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponenGaji;
    }

    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function getValue() {
        return $this->value;
    }

    public function setKomponenGaji(Hrd_Models_Payroll_Komponen_Komponen $komponenGaji) {
        $this->komponenGaji = $komponenGaji;
    }

    public function setGroup(Hrd_Models_Master_Group $group) {
        
        $this->group = $group;
    }

    public function setValue($value) {
        $this->value = (double)$value;
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
        return array($this->getKomponenGaji(),$this->getGroup());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
