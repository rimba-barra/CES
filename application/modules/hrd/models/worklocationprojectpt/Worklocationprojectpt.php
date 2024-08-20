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
class Hrd_Models_Worklocationprojectpt_Worklocationprojectpt extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;

    private $worklocation_id;
    private $worklocation;
    private $projectpt_id;
    private $projectproject_id;
    private $ptpt_id;
    private $project_name;
    private $pt_name;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "worklocationprojectpt_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['worklocationprojectpt_id'])){
           $this->setId($x['worklocationprojectpt_id']); 
        }
        if(isset ($x['worklocation_id'])){
           $this->setWorklocationId($x['worklocation_id']); 
        }
        if(isset ($x['worklocation'])){
           $this->setWorklocation($x['worklocation']); 
        }
        if(isset ($x['projectpt_id'])){
           $this->setProjectptId($x['projectpt_id']); 
        }
        if(isset ($x['projectproject_id'])){
           $this->setProjectprojectId($x['projectproject_id']); 
        }
        if(isset ($x['ptpt_id'])){
           $this->setPtptId($x['ptpt_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }

        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'worklocationprojectpt_id'=>$this->getId(),
            'worklocation_id'=>$this->getWorklocationId(),
            'worklocation'=>$this->getWorklocation(),
            'projectpt_id'=>$this->getProjectptId(),
            'projectproject_id'=>$this->getProjectprojectId(),
            'ptpt_id'=>$this->getPtptId(),
            'project_name'=>$this->getProjectName(),
            'pt_name'=>$this->getPtName()
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

    public function getWorklocationId() {
        return $this->worklocation_id;
    }

    public function getWorklocation() {
        return $this->worklocation;
    }

    public function getProjectptId() {
        return $this->projectpt_id;
    }

    public function getProjectprojectId() {
        return $this->projectproject_id;
    }

    public function getPtptId() {
        return $this->ptpt_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setWorklocationId($worklocation_id) {
        $this->worklocation_id = $worklocation_id;
    }

    public function setWorklocation($worklocation) {
        $this->worklocation = $worklocation;
    }

    public function setProjectptId($projectpt_id) {
        $this->projectpt_id = $projectpt_id;
    }

    public function setProjectprojectId($projectproject_id) {
        $this->projectproject_id = $projectproject_id;
    }

    public function setPtptId($ptpt_id) {
        $this->ptpt_id = $ptpt_id;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
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
