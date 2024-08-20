<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Overtimevp
 *
 * @author MIS
 */
class Hrd_Models_Master_Overtimevp extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $startYear;
    private $endYear;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "overtimevp_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['overtimevp_id'])){
           $this->setId($x['overtimevp_id']); 
        }
        if(isset ($x['start_year'])){
           $this->setStartYear($x['start_year']); 
        }
        if(isset ($x['end_year'])){
           $this->setEndYear($x['end_year']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'overtimevp_id'=>$this->getId(),
            'start_year'=>$this->getStartYear(),
            'end_year'=>$this->getEndYear(),
            'value'=>$this->getValue()
       
        );
      
        return $x;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt  = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getStartYear() {
        return $this->startYear;
    }

    public function setStartYear($startYear) {
        $this->startYear = (int)$startYear;
    }

    public function getEndYear() {
        return $this->endYear;
    }

    public function setEndYear($endYear) {
        $this->endYear = (int)$endYear;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = (double)$value;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}

?>
