<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Bayar
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Param_Bayar extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $komponenGaji;
    private $isDimuka;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "payparambayar_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parambayar_id'])){
           $this->setId($x['parambayar_id']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponenGaji()->setId($x['komponengaji_komponengaji_id']); 
        }
        if(isset ($x['is_dimuka'])){
           $this->setIsDimuka($x['is_dimuka']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parambayar_id'=>$this->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponenGaji()->getId(),
            'is_dimuka'=>$this->getIsDimuka()
           
            
           
        );
      
        return $x;
    }
    
    public function getKomponenGaji() {
        if(!$this->komponenGaji){
            $this->komponenGaji = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponenGaji;
    }

    public function getIsDimuka() {
        return $this->isDimuka;
    }

    public function setKomponenGaji(Hrd_Models_Payroll_Komponen_Komponen $komponenGaji) {
        $this->komponenGaji = $komponenGaji;
    }

    public function setIsDimuka($isDimuka) {
        $this->isDimuka = $isDimuka;
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
