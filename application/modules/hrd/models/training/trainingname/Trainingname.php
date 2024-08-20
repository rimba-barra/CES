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
class Hrd_Models_Training_Trainingname_Trainingname extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $trainingname;
    // private $competency_name;
    // private $competency_name_id;
    private $vendor;
    private $skill;
    private $type;
    private $certificate;
    private $caption;
    private $trainingcaption_id;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingname_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['trainingname_id'])){
           $this->setId($x['trainingname_id']); 
        }
        
        if(isset ($x['trainingname'])){
           $this->setTrainingName($x['trainingname']); 
        }
        // if(isset ($x['competency_name'])){
        //    $this->setCompetencyName($x['competency_name']); 
        // }
        // if(isset ($x['competency_name_id'])){
        //    $this->setCompetencyNameId($x['competency_name_id']); 
        // }
        if(isset ($x['vendor'])){
           $this->setVendor($x['vendor']); 
        }
        if(isset ($x['skill'])){
           $this->setSkill($x['skill']); 
        }
        if(isset ($x['type'])){
           $this->setType($x['type']); 
        }
        if(isset ($x['certificate'])){
           $this->setCertificate($x['certificate']); 
        }
        if(isset ($x['caption'])){
           $this->setCaption($x['caption']); 
        }
        if(isset ($x['trainingcaption_id'])){
           $this->setTrainingCaptionId($x['trainingcaption_id']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'trainingname_id'=>$this->getId(),
            'trainingname'=>$this->getTrainingName(),
            // 'competency_name'=>$this->getCompetencyName(),
            // 'competency_name_id'=>$this->getCompetencyNameId(),
            'vendor'=>$this->getVendor(),
            'skill'=>$this->getSkill(),
            'type'=>$this->getType(),
            'certificate'=>$this->getCertificate(),
            'caption'=>$this->getCaption(),
            'trainingcaption_id'=>$this->getTrainingCaptionId()
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

    public function getTrainingName() {
        return $this->trainingname;
    }

    // public function getCompetencyName() {
    //     return $this->competency_name;
    // }

    // public function getCompetencyNameId() {
    //     return $this->competency_name_id;
    // }

    public function getVendor() {
        return $this->vendor;
    }

    public function getSkill() {
        return $this->skill;
    }

    public function getType() {
        return $this->type;
    }

    public function getCertificate() {
        return $this->certificate;
    }
    
    public function getCaption() {
        return $this->caption;
    }

    public function getTrainingCaptionId() {
        return $this->trainingcaption_id;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setTrainingName($trainingname) {
        $this->trainingname = $trainingname;
    }

    // public function setCompetencyName($competency_name) {
    //     $this->competency_name = $competency_name;
    // }

    // public function setCompetencyNameId($competency_name_id) {
    //     $this->competency_name_id = $competency_name_id;
    // }

    public function setVendor($vendor) {
        $this->vendor = $vendor;
    }

    public function setSkill($skill) {
        $this->skill = $skill;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setCertificate($certificate) {
        $this->certificate = $certificate;
    }

    public function setCaption($caption) {
        $this->caption = $caption;
    }

    public function setTrainingCaptionId($trainingcaption_id) {
        $this->trainingcaption_id = $trainingcaption_id;
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
