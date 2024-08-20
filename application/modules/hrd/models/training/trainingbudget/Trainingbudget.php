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
class Hrd_Models_Training_Trainingbudget_Trainingbudget extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $periode;
    private $budget;
    private $banding_id;
    private $banding;
    private $department_id;
    private $department;
    private $apply_budget;
    private $apply_budget_name;
    private $apply_check;
    private $employeestatus_id;
    private $employeestatus;
    private $trainingbudgetprogram_id;
    private $trainingcaption_id;
    private $caption;
    private $sisabudget_trainingbudgetprogram;
    private $budget_trainingbudgetprogram;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingbudget_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingbudget_id'])){
           $this->setId($x['trainingbudget_id']); 
        }
        
        
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['budget'])){
           $this->setBudget($x['budget']); 
        }
        if(isset ($x['banding_id'])){
           $this->setBandingId($x['banding_id']); 
        }
        if(isset ($x['banding'])){
           $this->setBanding($x['banding']); 
        }
        if(isset ($x['department_id'])){
           $this->setDepartmentId($x['department_id']); 
        }
        if(isset ($x['department'])){
           $this->setDepartment($x['department']); 
        }
        if(isset ($x['apply_budget'])){
           $this->setApplyBudget($x['apply_budget']); 
        }
        if(isset ($x['apply_budget_name'])){
           $this->setApplyBudgetName($x['apply_budget_name']); 
        }
        if(isset ($x['apply_check'])){
           $this->setApplyCheck($x['apply_check']); 
        }
        if(isset ($x['employeestatus_id'])){
           $this->setEmployeeStatusId($x['employeestatus_id']); 
        }
        if(isset ($x['employeestatus'])){
           $this->setEmployeeStatus($x['employeestatus']); 
        }
        if(isset ($x['trainingbudgetprogram_id'])){
           $this->setTrainingBudgetProgramId($x['trainingbudgetprogram_id']); 
        }
        if(isset ($x['trainingcaption_id'])){
           $this->setCaptionId($x['trainingcaption_id']); 
        }
        if(isset ($x['caption'])){
           $this->setCaption($x['caption']); 
        }

        if(isset ($x['sisabudget_trainingbudgetprogram'])){
           $this->setSisaBudget($x['sisabudget_trainingbudgetprogram']); 
        }
        if(isset ($x['budget_trainingbudgetprogram'])){
           $this->setBudgetProgram($x['budget_trainingbudgetprogram']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingbudget_id'=>$this->getId(),
            'periode'=>$this->getPeriode(),
            'budget'=>$this->getBudget(),
            'banding_id'=>$this->getBandingId(),
            'banding'=>$this->getBanding(),
            'department_id'=>$this->getDepartmentId(),
            'department'=>$this->getDepartment(),
            'apply_budget'=>$this->getApplyBudget(),
            'apply_budget_name'=>$this->getApplyBudgetName(),
            'apply_check'=>$this->getApplyCheck(),
            'employeestatus_id'=>$this->getEmployeeStatusId(),
            'employeestatus'=>$this->getEmployeeStatus(),
            'trainingbudgetprogram_id'=>$this->getTrainingBudgetProgramId(),
            'trainingcaption_id'=>$this->getCaptionId(),
            'caption'=>$this->getCaption(),

            'sisabudget_trainingbudgetprogram'=>$this->getSisaBudget(),
            'budget_trainingbudgetprogram'=>$this->getBudgetProgram()

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
    public function setPtKP(Box_Models_Master_Pt $pt) {
        $this->pt = '1';
    }
    public function setProjectKP(Box_Models_Master_Project $project) {
        $this->project = '1';
    }

    

    public function getPeriode() {
        return $this->periode;
    }

    public function getBudget() {
        return $this->budget;
    }

    public function getBandingId() {
        return $this->banding_id;
    }

    public function getBanding() {
        return $this->banding;
    }

    public function getDepartmentId() {
        return $this->department_id;
    }

    public function getDepartment() {
        return $this->department;
    }

    public function getApplyBudget() {
        return $this->apply_budget;
    }

    public function getApplyBudgetName() {
        return $this->apply_budget_name;
    }

    public function getApplyCheck() {
        return $this->apply_check;
    }

    public function getEmployeeStatusId() {
        return $this->employeestatus_id;
    }

    public function getEmployeeStatus() {
        return $this->employeestatus;
    }

    public function getTrainingBudgetProgramId() {
        return $this->trainingbudgetprogram_id;
    }

    public function getCaptionId() {
        return $this->trainingcaption_id;
    }

    public function getCaption() {
        return $this->caption;
    }

    public function getSisaBudget() {
        return $this->sisabudget_trainingbudgetprogram;
    }

    public function getBudgetProgram() {
        return $this->budget_trainingbudgetprogram;
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

    public function setBudget($budget) {
        $this->budget = $budget;
    }

    public function setBandingId($banding_id) {
        $this->banding_id = $banding_id;
    }

    public function setBanding($banding) {
        $this->banding = $banding;
    }

    public function setDepartmentId($department_id) {
        $this->department_id = $department_id;
    }

    public function setDepartment($department) {
        $this->department = $department;
    }

    public function setApplyBudget($apply_budget) {
        $this->apply_budget = $apply_budget;
    }

    public function setApplyBudgetName($apply_budget_name) {
        $this->apply_budget_name = $apply_budget_name;
    }

    public function setApplyCheck($apply_check) {
        $this->apply_check = $apply_check;
    }

    public function setEmployeeStatusId($employeestatus_id) {
        $this->employeestatus_id = $employeestatus_id;
    }

    public function setEmployeeStatus($employeestatus) {
        $this->employeestatus = $employeestatus;
    }

    public function setTrainingBudgetProgramId($trainingbudgetprogram_id) {
        $this->trainingbudgetprogram_id = $trainingbudgetprogram_id;
    }

    public function setCaptionId($trainingcaption_id) {
        $this->trainingcaption_id = $trainingcaption_id;
    }

    public function setCaption($caption) {
        $this->caption = $caption;
    }

    public function setSisaBudget($sisabudget_trainingbudgetprogram) {
        $this->sisabudget_trainingbudgetprogram = $sisabudget_trainingbudgetprogram;
    }

    public function setBudgetProgram($budget_trainingbudgetprogram) {
        $this->budget_trainingbudgetprogram = $budget_trainingbudgetprogram;
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
