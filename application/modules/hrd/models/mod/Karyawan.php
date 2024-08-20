<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Karyawan
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Mod_Karyawan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt   {
    private $project;
    private $pt;
    private $employee;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "karyawanmod_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['karyawanmod_id'])){
           $this->setId($x['karyawanmod_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
     
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'karyawanmod_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId()
           
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
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
        return array($this->getEmployee());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

//put your code here
}
