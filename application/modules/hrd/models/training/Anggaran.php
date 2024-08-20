<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Anggaran
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Anggaran extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $year;
    private $employee;
    private $nilai;
    private $pemakaian;
    private $sisa;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "anggarantraining_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['anggarantraining_id'])){
           $this->setId($x['anggarantraining_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['nilai'])){
           $this->setNilai($x['nilai']); 
        }
        if(isset ($x['pemakaian'])){
           $this->setPemakaian($x['pemakaian']); 
        }
        if(isset ($x['sisa'])){
           $this->setSisa($x['sisa']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'anggarantraining_id'=>$this->getId(),
            'year'=>$this->getYear(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'nilai'=>$this->getNilai(),
            'pemakaian'=>$this->getPemakaian(),
            'sisa'=>$this->getSisa()
            
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

    public function getYear() {
        return $this->year;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getNilai() {
        return $this->nilai;
    }

    public function getPemakaian() {
        return $this->pemakaian;
    }

    public function getSisa() {
        return $this->sisa;
    }

    

    public function setYear($year) {
        $this->year = $year;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setNilai($nilai) {
        $this->nilai = $nilai;
    }

    public function setPemakaian($pemakaian) {
        $this->pemakaian = $pemakaian;
    }

    public function setSisa($sisa) {
        $this->sisa = $sisa;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee());
    }

}
