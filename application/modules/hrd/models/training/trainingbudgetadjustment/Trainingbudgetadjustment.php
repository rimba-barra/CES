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
class Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $periode;
    private $minus;
    private $adjustment;
    private $notes;
    private $trainingcaption_id;
    private $caption;
    private $employee_id;
    private $employee_name;
    private $apply_check;
    private $trainingbudgetprogram_id;
    private $apply_adjustment_to;
    private $periode_budgetprogram;
    private $caption_budgetprogram;
    private $apply_adjustment_to_name;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingbudgetadjustment_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingbudgetadjustment_id'])){
           $this->setId($x['trainingbudgetadjustment_id']); 
        }
        
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['adjustment'])){
           $this->setAdjustment($x['adjustment']); 
        }
        if(isset ($x['minus'])){
           $this->setMinus($x['minus']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['trainingcaption_id'])){
           $this->setCaptionId($x['trainingcaption_id']); 
        }
        if(isset ($x['caption'])){
           $this->setCaption($x['caption']); 
        }
        if(isset ($x['employee_id'])){
           $this->setEmployeeId($x['employee_id']); 
        }
        if(isset ($x['employee_name'])){
           $this->setEmployeeName($x['employee_name']); 
        }
        if(isset ($x['apply_check'])){
           $this->setApplyCheck($x['apply_check']); 
        }
        if(isset ($x['trainingbudgetprogram_id'])){
           $this->setBudgetProgramId($x['trainingbudgetprogram_id']); 
        }
        if(isset ($x['apply_adjustment_to'])){
           $this->setApplyAdjustmentTo($x['apply_adjustment_to']); 
        }
        if(isset ($x['periode_budgetprogram'])){
           $this->setPeriodeBudgetProgram($x['periode_budgetprogram']); 
        }
        if(isset ($x['caption_budgetprogram'])){
           $this->setCaptionBudgetProgram($x['caption_budgetprogram']); 
        }
        if(isset ($x['apply_adjustment_to_name'])){
           $this->setApplyAdjustmentToName($x['apply_adjustment_to_name']); 
        }

        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingbudgetadjustment_id'=>$this->getId(),
            'periode'=>$this->getPeriode(),
            'minus'=>$this->getMinus(),
            'adjustment'=>$this->getAdjustment(),
            'notes'=>$this->getNotes(),
            'trainingcaption_id'=>$this->getCaptionId(),
            'caption'=>$this->getCaption(),
            'employee_id'=>$this->getEmployeeId(),
            'employee_name'=>$this->getEmployeeName(),
            'apply_check'=>$this->getApplyCheck(),
            'trainingbudgetprogram_id'=>$this->getBudgetProgramId(),
            'apply_adjustment_to'=>$this->getApplyAdjustmentTo(),
            'periode_budgetprogram'=>$this->getPeriodeBudgetProgram(),
            'caption_budgetprogram'=>$this->getCaptionBudgetProgram(),
            'apply_adjustment_to_name'=>$this->getApplyAdjustmentToName()

            
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

    public function getAdjustment() {
        return $this->adjustment;
    }

    public function getMinus() {
        return $this->minus;
    }

    public function getNotes() {
        return $this->notes;
    }

    public function getCaptionId() {
        return $this->trainingcaption_id;
    }

    public function getCaption() {
        return $this->caption;
    }

    public function getEmployeeId() {
        return $this->employee_id;
    }

    public function getEmployeeName() {
        return $this->employee_name;
    }

    public function getApplyCheck() {
        return $this->apply_check;
    }

    public function getBudgetProgramId() {
        return $this->trainingbudgetprogram_id;
    }

    public function getApplyAdjustmentTo() {
        return $this->apply_adjustment_to;
    }

    public function getPeriodeBudgetProgram() {
        return $this->periode_budgetprogram;
    }

    public function getCaptionBudgetProgram() {
        return $this->caption_budgetprogram;
    }

    public function getApplyAdjustmentToName() {
        return $this->apply_adjustment_to_name;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setProjectKP(Box_Models_Master_Project $project) {
        $this->project = '1';
    }

    public function setPtKP(Box_Models_Master_Pt $pt) {
        $this->pt = '1';
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setAdjustment($adjustment) {
        $this->adjustment = $adjustment;
    }

    public function setMinus($minus) {
        $this->minus = $minus;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
    }

    public function setCaptionId($trainingcaption_id) {
        $this->trainingcaption_id = $trainingcaption_id;
    }

    public function setCaption($caption) {
        $this->caption = $caption;
    }

    public function setEmployeeId($employee_id) {
        $this->employee_id = $employee_id;
    }

    public function setEmployeeName($employee_name) {
        $this->employee_name = $employee_name;
    }

    public function setApplyCheck($apply_check) {
        $this->apply_check = $apply_check;
    }

    public function setBudgetProgramId($trainingbudgetprogram_id) {
        $this->trainingbudgetprogram_id = $trainingbudgetprogram_id;
    }

    public function setApplyAdjustmentTo($apply_adjustment_to) {
        $this->apply_adjustment_to = $apply_adjustment_to;
    }

    public function setPeriodeBudgetProgram($periode_budgetprogram) {
        $this->periode_budgetprogram = $periode_budgetprogram;
    }

    public function setCaptionBudgetProgram($caption_budgetprogram) {
        $this->caption_budgetprogram = $caption_budgetprogram;
    }

    public function setApplyAdjustmentToName($apply_adjustment_to_name) {
        $this->apply_adjustment_to_name = $apply_adjustment_to_name;
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
