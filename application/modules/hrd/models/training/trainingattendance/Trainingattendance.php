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
class Hrd_Models_Training_Trainingattendance_Trainingattendance extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $trainingname_id;
    private $trainingname;
    private $periode;
    private $batch;
    private $startdate;
    private $enddate;
    private $timestart;
    private $timeend;
    private $peserta;
    private $venue;
    private $description;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingcaption_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingschedule_id'])){
           $this->setId($x['trainingschedule_id']); 
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
        if(isset ($x['startdate'])){
           $this->setStartDate($x['startdate']); 
        }
        if(isset ($x['enddate'])){
           $this->setEndDate($x['enddate']); 
        }
        if(isset ($x['timestart'])){
           $this->setTimeStart($x['timestart']); 
        }
        if(isset ($x['timeend'])){
           $this->setTimeEnd($x['timeend']); 
        }
        if(isset ($x['peserta'])){
           $this->setPeserta($x['peserta']); 
        }
        if(isset ($x['venue'])){
           $this->setVenue($x['venue']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingschedule_id'=>$this->getId(),
            'trainingname_id'=>$this->getTrainingNameId(),
            'trainingname'=>$this->getTrainingName(),
            'periode'=>$this->getPeriode(),
            'batch'=>$this->getBatch(),
            'startdate'=>$this->getStartDate(),
            'enddate'=>$this->getEndDate(),
            'timestart'=>$this->getTimeStart(),
            'timeend'=>$this->getTimeEnd(),
            'peserta'=>$this->getPeserta(),
            'venue'=>$this->getVenue(),
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

    public function getStartDate() {
        return $this->startdate;
    }

    public function getEndDate() {
        return $this->enddate;
    }

    public function getTimeStart() {
        return $this->timestart;
    }

    public function getTimeEnd() {
        return $this->timeend;
    }

    public function getPeserta() {
        return $this->peserta;
    }

    public function getVenue() {
        return $this->venue;
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

    public function setStartDate($startdate) {
        $this->startdate = $startdate;
    }

    public function setEndDate($enddate) {
        $this->enddate = $enddate;
    }

    public function setTimeStart($timestart) {
        $this->timestart = $timestart;
    }

    public function setTimeEnd($timeend) {
        $this->timeend = $timeend;
    }

    public function setPeserta($peserta) {
        $this->peserta = $peserta;
    }

    public function setVenue($venue) {
        $this->venue = $venue;
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
