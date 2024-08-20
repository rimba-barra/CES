<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TunjanganTetap
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Tunjangan_TunjanganTetap extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $komponenGaji;
    private $employee;
    private $value;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "tunjangantetap_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['tunjangantetap_id'])){
           $this->setId($x['tunjangantetap_id']); 
        }
        if(isset ($x['komponengaji_komponengaji_id'])){
           $this->getKomponenGaji()->setId($x['komponengaji_komponengaji_id']); 
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
            'tunjangantetap_id'=>$this->getId(),
            'komponengaji_komponengaji_id'=>$this->getKomponenGaji()->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
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

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getValue() {
        return $this->value;
    }

    public function setKomponenGaji(Hrd_Models_Payroll_Komponen_Komponen $komponenGaji) {
        $this->komponenGaji = $komponenGaji;
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
        return array($this->getEmployee(),$this->getKomponenGaji());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }


}
