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
class Hrd_Models_Training_Trainingarsip_Trainingarsip extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $trainingschedule_id;
    private $trainingname_id;
    private $trainingname;
    private $periode;
    private $batch;
    private $fileName;
    private $description;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingarsip_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['trainingarsip_id'])){
           $this->setId($x['trainingarsip_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setTrainingScheduleId($x['trainingschedule_id']); 
        }
        if(isset ($x['trainingname_id'])){
           $this->setTrainingNameId($x['trainingname_id']); 
        }
        if(isset ($x['trainingname'])){
           $this->setTrainingName($x['trainingname']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }
        if(isset ($x['batch'])){
           $this->setBatch($x['batch']); 
        }
        if(isset ($x['file_name'])){
           $this->setFileName($x['file_name']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingarsip_id'=>$this->getId(),
            'trainingschedule_id'=>$this->getTrainingScheduleId(),
            'trainingname_id'=>$this->getTrainingNameId(),
            'trainingname'=>$this->getTrainingName(),
            'periode'=>$this->getPeriode(),
            'batch'=>$this->getBatch(),
            'file_name'=>$this->getFileName(),
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

    public function getTrainingScheduleId() {
        return $this->trainingschedule_id;
    }

    public function getTrainingNameId() {
        return $this->trainingname_id;
    }

    public function getTrainingName() {
        return $this->trainingname;
    }

    public function getPeriode() {
        return $this->periode;
    }

    public function getBatch() {
        return $this->batch;
    }

    public function getFileName() {
        return $this->fileName;
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

    public function setTrainingScheduleId($trainingschedule_id) {
        $this->trainingschedule_id = $trainingschedule_id;
    }

    public function setTrainingNameId($trainingname_id) {
        $this->trainingname_id = $trainingname_id;
    }

    public function setTrainingName($trainingname) {
        $this->trainingname = $trainingname;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
    }

    public function setBatch($batch) {
        $this->batch = $batch;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
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
