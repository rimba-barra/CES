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
class Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $periode;
    private $budget;
    private $trainingcaption_id;
    private $caption;
    private $notes;
    private $budget_used;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingbudgetprogram_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingbudgetprogram_id'])){
           $this->setId($x['trainingbudgetprogram_id']); 
        }
        
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['budget'])){
           $this->setBudget($x['budget']); 
        }
        if(isset ($x['trainingcaption_id'])){
           $this->setCaptionId($x['trainingcaption_id']); 
        }
        if(isset ($x['caption'])){
           $this->setCaption($x['caption']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['budget_used'])){
           $this->setBudget_used($x['budget_used']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingbudgetprogram_id'=>$this->getId(),
            'periode'=>$this->getPeriode(),
            'budget'=>$this->getBudget(),
            'trainingcaption_id'=>$this->getCaptionId(),
            'caption'=>$this->getCaption(),
            'notes'=>$this->getNotes(),
            'budget_used'=>$this->getBudget_used()
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

    public function getBudget() {
        return $this->budget;
    }

    public function getCaptionId() {
        return $this->trainingcaption_id;
    }

    public function getCaption() {
        return $this->caption;
    }

    public function getNotes() {
        return $this->notes;
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

    public function setBudget($budget) {
        $this->budget = $budget;
    }

    public function setCaptionId($trainingcaption_id) {
        $this->trainingcaption_id = $trainingcaption_id;
    }

    public function setCaption($caption) {
        $this->caption = $caption;
    }

    public function setNotes($notes) {
        $this->notes = $notes;
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

    public function getBudget_used() {
        return $this->budget_used;
    }
    public function setBudget_used($budget_used) {
        $this->budget_used = $budget_used;
    }

    function get_mail() {
        return $this->_mail;
    }
    

}
