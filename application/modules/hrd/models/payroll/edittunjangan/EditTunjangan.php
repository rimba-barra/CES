<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EditTunjangan
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Edittunjangan_EditTunjangan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $employee;
    private $komponen;
    private $month;
    private $year;
    private $value;
    private $monthYear;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "edittunjangan_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['edittunjangan_id'])){
           $this->setId($x['edittunjangan_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponen()->setId($x['komponengaji_komponengaji_id']); 
        }
        if(isset ($x['month'])){
           $this->setMonth($x['month']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['monthyear'])){
           $this->setMonthYear($x['monthyear']); 
        }
        
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'edittunjangan_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponen()->getId(),
            'month'=>$this->getMonth(),
            'year'=>$this->getYear(),
            'value'=>$this->getValue(),
            'monthyear'=>$this->getMonthYear()
            
            
           
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getKomponen() {
        if(!$this->komponen){
            $this->komponen = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponen;
    }

    public function getMonth() {
        return $this->month;
    }

    public function getYear() {
        return $this->year;
    }

    public function getValue() {
        return $this->value;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setKomponen(Hrd_Models_Payroll_Komponen_Komponen $komponen) {
        $this->komponen = $komponen;
    }

    public function setMonth($month) {
        $this->month = $month;
    }

    public function setYear($year) {
        $this->year = $year;
    }

    public function setValue($value) {
        $this->value = $value;
    }
    
    public function getMonthYear() {
        return $this->monthYear;
    }

    public function setMonthYear($monthYear) {
        $this->monthYear = $monthYear;
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
        return array($this->getEmployee(),$this->getKomponen());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    

}
