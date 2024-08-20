<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Transaksi
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Penghargaan_Transaksi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $employee;
    private $jenis;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "penghargaan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['penghargaan_id'])){
           $this->setId($x['penghargaan_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
         if(isset ($x['jenispenghargaan_jenispenghargaan_id'])){
           $this->getJenis()->setId($x['jenispenghargaan_jenispenghargaan_id']); 
        }
         if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'penghargaan_id'=>$this->getId(),
             'employee_employee_id'=>$this->getEmployee()->getId(),
             'jenispenghargaan_jenispenghargaan_id'=>$this->getJenis()->getId(),
            'description'=>$this->getDescription(),
           
        );
      
        return $x;
    }
    
    
    

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getJenis() {
        if(!$this->jenis){
            $this->jenis = new Hrd_Models_Penghargaan_Jenis();
        }
        return $this->jenis;
    }

    public function getDescription() {
        return $this->description;
    }

    

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setJenis(Hrd_Models_Penghargaan_Jenis $jenis) {
        $this->jenis = $jenis;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

//put your code here
}
