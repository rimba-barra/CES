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
class Hrd_Models_Performancemanagement_Contohjobfamily_Contohjobfamily extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $contoh_pekerjaan;
    private $jobfamily_id;
    private $jobfamily;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "contohjobfamily_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        if(isset ($x['contoh_jobfamily_id'])){
           $this->setId($x['contoh_jobfamily_id']); 
        }
        
        if(isset ($x['contoh_pekerjaan'])){
           $this->setContohPekerjaan($x['contoh_pekerjaan']); 
        }
        if(isset ($x['jobfamily_id'])){
           $this->setJobFamilyId($x['jobfamily_id']); 
        }
        if(isset ($x['jobfamily'])){
           $this->setJobFamily($x['jobfamily']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'contoh_jobfamily_id'=>$this->getId(),
            'contoh_pekerjaan'=>$this->getContohPekerjaan(),
            'jobfamily_id'=>$this->getJobFamilyId(),
            'jobfamily'=>$this->getJobFamily()
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

    public function getContohPekerjaan() {
        return $this->contoh_pekerjaan;
    }

    public function getJobFamilyId() {
        return $this->jobfamily_id;
    }

    public function getJobFamily() {
        return $this->jobfamily;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setContohPekerjaan($contoh_pekerjaan) {
        $this->contoh_pekerjaan = $contoh_pekerjaan;
    }

    public function setJobFamilyId($jobfamily_id) {
        $this->jobfamily_id = $jobfamily_id;
    }

    public function setJobFamily($jobfamily) {
        $this->jobfamily = $jobfamily;
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
