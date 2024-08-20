<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterSK
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingoutstanding_Trainingoutstandingtransaction extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $periode;
    private $employee_id;
    private $employee_name;
    private $budget;
    private $description;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingoutstandingtransaction_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingbudgetrecord_id'])){
           $this->setId($x['trainingbudgetrecord_id']); 
        }
        
        
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['budget'])){
           $this->setBudget($x['budget']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingbudgetrecord_id'=>$this->getId(),
            'periode'=>$this->getPeriode(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'budget'=>$this->getBudget(),
            'description'=>$this->getDescription()
        );
      
        return $x;
    }

    function getProjectid() {
        return $this->projectid;
    }

    function getPtid() {
        return $this->ptid;
    }

    function setProjectid($projectid) {
        $this->projectid = $projectid;
    }

    function setPtid($ptid) {
        $this->ptid = $ptid;
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

    public function getPeriode() {
        return $this->periode;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getBudget() {
        return $this->budget;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setBudget($budget) {
        $this->budget = $budget;
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
    
    protected function getDatefields() {
        return array("tanggal");
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
