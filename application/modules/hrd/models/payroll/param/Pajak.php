<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pajak
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Param_Pajak extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $value;
    private $percent;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "payparampajak_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parampajak_id'])){
           $this->setId($x['parampajak_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['percent'])){
           $this->setPercent($x['percent']); 
        }
        
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parampajak_id'=>$this->getId(),
            'value'=>$this->getValue(),
            'percent'=>$this->getPercent()
           
            
           
        );
      
        return $x;
    }
    
    public function getValue() {
        return $this->value;
    }

    public function getPercent() {
        return $this->percent;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function setPercent($percent) {
        $this->percent = $percent;
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
