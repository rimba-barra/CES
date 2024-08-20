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
class Hrd_Models_Performancemanagement_Competencywawancara_Competencywawancara extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $pertanyaan_wawancara;
    private $competency_name_id;
    private $competency_name;
    private $banding_id;
    private $banding;
    private $level_category_id;
    private $level_category;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "competencywawancara_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['competency_wawancara_id'])){
           $this->setId($x['competency_wawancara_id']); 
        }
        
        if(isset ($x['pertanyaan_wawancara'])){
           $this->setPertanyaanWawancara($x['pertanyaan_wawancara']); 
        }
        if(isset ($x['competency_name_id'])){
           $this->setCompetencyNameId($x['competency_name_id']); 
        }
        if(isset ($x['competency_name'])){
           $this->setCompetencyName($x['competency_name']); 
        }
        if(isset ($x['banding_id'])){
           $this->setBandingId($x['banding_id']); 
        }
        if(isset ($x['banding'])){
           $this->setBanding($x['banding']); 
        }
        if(isset ($x['level_category_id'])){
           $this->setLevelCategoryId($x['level_category_id']); 
        }
        if(isset ($x['level_category'])){
           $this->setLevelCategory($x['level_category']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'competency_wawancara_id'=>$this->getId(),
            'pertanyaan_wawancara'=>$this->getPertanyaanWawancara(),
            'competency_name_id'=>$this->getCompetencyNameId(),
            'competency_name'=>$this->getCompetencyName(),
            'banding_id'=>$this->getBandingId(),
            'banding'=>$this->getBanding(),
            'level_category_id'=>$this->getLevelCategoryId(),
            'level_category'=>$this->getLevelCategory()
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

    public function getPertanyaanWawancara() {
        return $this->pertanyaan_wawancara;
    }

    public function getCompetencyNameId() {
        return $this->competency_name_id;
    }

    public function getCompetencyName() {
        return $this->competency_name;
    }

    public function getBandingId() {
        return $this->banding_id;
    }

    public function getBanding() {
        return $this->banding;
    }

    public function getLevelCategoryId() {
        return $this->level_category_id;
    }

    public function getLevelCategory() {
        return $this->level_category;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPertanyaanWawancara($pertanyaan_wawancara) {
        $this->pertanyaan_wawancara = $pertanyaan_wawancara;
    }

    public function setCompetencyNameId($competency_name_id) {
        $this->competency_name_id = $competency_name_id;
    }

    public function setCompetencyName($competency_name) {
        $this->competency_name = $competency_name;
    }

    public function setBandingId($banding_id) {
        $this->banding_id = $banding_id;
    }

    public function setBanding($banding) {
        $this->banding = $banding;
    }

    public function setLevelCategoryId($level_category_id) {
        $this->level_category_id = $level_category_id;
    }

    public function setLevelCategory($level_category) {
        $this->level_category = $level_category;
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
