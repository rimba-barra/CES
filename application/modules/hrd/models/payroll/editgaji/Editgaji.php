<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Editgaji
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Editgaji_Editgaji extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $employee;
    private $gaji;
    private $gajiBaru;
    private $description;
    private $periode;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "editgaji_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['editgaji_id'])){
           $this->setId($x['editgaji_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['gaji_baru'])){
           $this->setGajiBaru($x['gaji_baru']); 
        }
        if(isset ($x['gaji'])){
           $this->setGaji($x['gaji']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'editgaji_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'gaji'=>$this->getGaji(),
            'gaji_baru'=>$this->getGajiBaru(),
            'periode'=>$this->getPeriode(),
            'description'=>$this->getDescription()
            
           
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getGajiBaru() {
        return (double)$this->gajiBaru;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getPeriode() {
        return $this->periode;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setGajiBaru($gajiBaru) {
        $this->gajiBaru = (double)$gajiBaru;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }
    
    public function getGaji() {
        return $this->gaji;
    }

    public function setGaji($gaji) {
        $this->gaji = $gaji;
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
