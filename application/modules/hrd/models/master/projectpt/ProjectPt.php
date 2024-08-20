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
class Hrd_Models_Master_Projectpt_ProjectPt extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $projectpt_id;
    private $project_id;
    private $pt_id;
    private $project_name;
    private $pt_name;
    private $name;
    private $user_id;
    private $group_id;
    private $upload_projectpt_id;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "projectpt_";
    }

    public function setArrayTable($dataArray = NULL) {
  
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['projectpt_id'])){
           $this->setProjectPt_id($x['projectpt_id']); 
        }
        if(isset ($x['project_id'])){
           $this->setProject_id($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProject_name($x['project_name']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPt_id($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPt_name($x['pt_name']); 
        }
        if(isset ($x['upload_projectpt_id'])){
           $this->setUploadProjectPt_id($x['upload_projectpt_id']); 
        }
        
        unset($x);
    }

    public function getArrayTable() {
     
        $x = array(
            'projectpt_id'=>$this->getProjectPt_id(),
            'project_id'=>$this->getProject_id(),
            'pt_id'=>$this->getPt_id(),
            'project_name'=>$this->getProject_name(),
            'pt_name'=>$this->getPt_name(),
            'upload_projectpt_id'=>$this->getUploadProjectPt_id()
        );
      
        return $x;
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
    
    public function getUserid() {
        return $this->user_id;
    }

    public function getGroupid() {
        return $this->group_id;
    }

    public function getProjectPt_id() {
        return $this->projectpt_id;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function getPt_id() {
        return $this->pt_id;
    }

    public function getProject_name() {
        return $this->project_name;
    }

    public function getPt_name() {
        return $this->pt_name;
    }

    public function getUploadProjectPt_id() {
        return $this->upload_projectpt_id;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function setProjectPt_id($projectpt_id) {
        $this->projectpt_id = $projectpt_id;
    }

    public function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function setProject_name($project_name) {
        $this->project_name = $project_name;
    }

    public function setPt_name($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function setUserid($user_id) {
        $this->user_id = $user_id;
    }

    public function setGroupid($group_id) {
        $this->group_id = $group_id;
    }

    public function setUploadProjectPt_id($upload_projectpt_id) {
        $this->upload_projectpt_id = $upload_projectpt_id;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
