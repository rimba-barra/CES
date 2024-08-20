<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TandaKasih
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Tandakasih_TandaKasih extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $employee;
    private $group;
    private $date;
    private $jenis;
    private $jumlah;
    private $plus;
    private $jenisName;
    private $note;
    
    public function __construct() {
        $this->embedPrefix = "tandakasihtran_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['tandakasih_id'])){
           $this->setId($x['tandakasih_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        
        if(isset ($x['group_group_id'])){
           $this->getGroup()->setId($x['group_group_id']); 
        }
        
        if(isset ($x['jenis'])){
           $this->setJenis($x['jenis']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['jumlah'])){
           $this->setJumlah($x['jumlah']); 
        }
        if(isset ($x['plus'])){
           $this->setPlus($x['plus']); 
        }
        if(isset ($x['tipetandakasih_name'])){
           $this->setJenisName($x['tipetandakasih_name']); 
        }
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
      
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'tandakasih_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'group_group_id'=>$this->getGroup()->getId(),
            'jenis'=>$this->getJenis(),
            'date'=>$this->getDate(),
            'jumlah'=>$this->getJumlah(),
            'plus'=>$this->getPlus(),
            'tipetandakasih_name'=>$this->getJenisName(),
            'note'=>$this->getNote()
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getDate() {
        return $this->date;
    }

    public function getJenis() {
        return $this->jenis;
    }

    public function getJumlah() {
        return $this->jumlah;
    }

    public function getPlus() {
        return $this->plus;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setJenis($jenis) {
        $this->jenis = $jenis;
    }

    public function setJumlah($jumlah) {
        $this->jumlah = $jumlah;
    }

    public function setPlus($plus) {
        $this->plus = $plus;
    }
    
    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_Group();
        }
        return $this->group;
    }

    public function setGroup(Hrd_Models_Master_Group $group) {
        $this->group = $group;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee(),$this->getGroup());
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt =  new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getJenisName() {
        return $this->jenisName;
    }

    public function setJenisName($jenisName) {
        $this->jenisName = $jenisName;
    }
    
    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }





}
