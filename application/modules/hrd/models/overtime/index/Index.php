<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Index
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Index_Index extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $overtimeType;
    private $hour;
    private $cutBreak;
    private $meal;
    private $breakLimit;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "overtimeindex_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['overtimeindex_id'])){
           $this->setId($x['overtimeindex_id']); 
        }
        if(isset ($x['overtimetype'])){
           $this->setOvertimeType($x['overtimetype']); 
           
        }
        if(isset ($x['hour'])){
           $this->setHour($x['hour']); 
        }
        if(isset ($x['cut_break'])){
           $this->setCutBreak($x['cut_break']); 
        }
        if(isset ($x['meal'])){
           $this->setMeal($x['meal']); 
        }
        if(isset ($x['break_limit'])){
           $this->setBreakLimit($x['break_limit']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'overtimeindex_id'=>$this->getId(),
            'overtimetype'=>$this->getOvertimeType(),
            'hour'=>$this->getHour(),
            'cut_break'=>$this->getCutBreak(),
            'meal'=>$this->getMeal(),
            'break_limit'=>$this->getBreakLimit()
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
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getOvertimeType() {
        return $this->overtimeType;
    }

    public function setOvertimeType($overtimeType) {
        $this->overtimeType = (int)$overtimeType;
    }

    public function getHour() {
        return $this->hour;
    }

    public function setHour($hour) {
        //$this->hour = (int) $hour;
        $this->hour = floatval($hour);
    }

    public function getCutBreak() {
        return $this->cutBreak;
    }

    public function setCutBreak($cutBreak) {
        //$this->cutBreak = (int) $cutBreak;
        $this->cutBreak = floatval($cutBreak);
    }

    public function getMeal() {
        return $this->meal;
    }

    public function setMeal($meal) {
        //$this->meal = (int) $meal;
        $this->meal = floatval($meal);
    }

    public function getBreakLimit() {
        return $this->breakLimit;
    }

    public function setBreakLimit($breakLimit) {
        $this->breakLimit = (boolean)$breakLimit;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


            
}

?>
