<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Gaji
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Proses_Gaji extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $month;
    private $year;
    private $monthYear;
    private $group;
    private $komponen;
    private $employee;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "prosesgaji_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['prosesgaji_id'])){
           $this->setId($x['prosesgaji_id']); 
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
        if(isset ($x['monthyear'])){
           $this->setMonthYear($x['monthyear']); 
        }
        if(isset ($x['group'])){
           $this->setGroup($x['group']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'prosesgaji_id'=>$this->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponen()->getId(),
            'month'=>$this->getMonth(),
            'year'=>$this->getYear(),
            'monthyear'=>$this->getMonthYear(),
            'group'=>$this->getGroup(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'value'=>$this->getValue()
           
            
           
        );
      
        return $x;
    }
    
    public function getMonth() {
        return $this->month;
    }

    public function getYear() {
        return $this->year;
    }

    public function getMonthYear() {
        return $this->monthYear;
    }

    public function getGroup() {
        return $this->group;
    }

    public function getKomponen() {
        if(!$this->komponen){
            $this->komponen = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komponen;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getValue() {
        return $this->value;
    }

    public function setMonth($month) {
        $this->month = $month;
    }

    public function setYear($year) {
        $this->year = $year;
    }

    public function setMonthYear($monthYear) {
        $this->monthYear = $monthYear;
    }

    public function setGroup($group) {
        $this->group = $group;
    }

    public function setKomponen(Hrd_Models_Payroll_Komponen_Komponen $komponen) {
        $this->komponen = $komponen;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setValue($value) {
        $this->value = $value;
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
