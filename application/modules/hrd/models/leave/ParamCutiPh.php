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
class Hrd_Models_Leave_ParamCutiPh extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercutiph_terbit_id;
    private $parametercutiph_terbit;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcutiph_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercutiph_terbit_id'])){
           $this->setId($x['parametercutiph_terbit_id']); 
        }
        if(isset ($x['parametercutiph_terbit_id'])){
           $this->setParamCutiPhTerbitId($x['parametercutiph_terbit_id']); 
        }
        if(isset ($x['parametercutiph_terbit'])){
           $this->setParamCutiPhTerbit($x['parametercutiph_terbit']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercutiph_terbit_id'=>$this->getId(),
            'parametercutiph_terbit_id'=>$this->getParamCutiPhTerbitId(),
            'parametercutiph_terbit'=>$this->getParamCutiPhTerbit(),
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

    public function getParamCutiPhTerbitId() {
        return $this->parametercutiph_terbit_id;
    }

    public function getParamCutiPhTerbit() {
        return $this->parametercutiph_terbit;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setParamCutiPhTerbitId($parametercutiph_terbit_id) {
        $this->parametercutiph_terbit_id = $parametercutiph_terbit_id;
    }

    public function setParamCutiPhTerbit($parametercutiph_terbit) {
        $this->parametercutiph_terbit = $parametercutiph_terbit;
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
