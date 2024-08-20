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
class Hrd_Models_Companycherry_Companycherry extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;

    private $ptpt_id;
    private $ptpt_name;
    private $company_code;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "companycherry_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['company_id'])){
           $this->setId($x['company_id']); 
        }
        if(isset ($x['ptpt_id'])){
           $this->setPtptId($x['ptpt_id']); 
        }
        if(isset ($x['ptpt_name'])){
           $this->setPtptName($x['ptpt_name']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
        }

        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'company_id'=>$this->getId(),
            'ptpt_id'=>$this->getPtptId(),
            'ptpt_name'=>$this->getPtptName(),
            'company_code'=>$this->getCompanyCode()
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

    public function getPtptId() {
        return $this->ptpt_id;
    }

    public function getPtptName() {
        return $this->ptpt_name;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPtptId($ptpt_id) {
        $this->ptpt_id = $ptpt_id;
    }

    public function setPtptName($ptpt_name) {
        $this->ptpt_name = $ptpt_name;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
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
