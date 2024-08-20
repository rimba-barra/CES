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
class Hrd_Models_Leave_ParamCutiPhExpired extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercutiph_expired_id;
    private $parametercutiph_expired;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcutiphexpired_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercutiph_expired_id'])){
           $this->setId($x['parametercutiph_expired_id']); 
        }
        if(isset ($x['parametercutiph_expired_id'])){
           $this->setParamCutiPhExpiredId($x['parametercutiph_expired_id']); 
        }
        if(isset ($x['parametercutiph_expired'])){
           $this->setParamCutiPhExpired($x['parametercutiph_expired']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercutiph_expired_id'=>$this->getId(),
            'parametercutiph_expired_id'=>$this->getParamCutiPhExpiredId(),
            'parametercutiph_expired'=>$this->getParamCutiPhExpired(),
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

    public function getParamCutiPhExpiredId() {
        return $this->parametercutiph_expired_id;
    }

    public function getParamCutiPhExpired() {
        return $this->parametercutiph_expired;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setParamCutiPhExpiredId($parametercutiph_expired_id) {
        $this->parametercutiph_expired_id = $parametercutiph_expired_id;
    }

    public function setParamCutiPhExpired($parametercutiph_expired) {
        $this->parametercutiph_expired = $parametercutiph_expired;
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
