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
class Hrd_Models_Leave_ParamCutiExpired extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercuti_expired_id;
    private $parametercuti_expired;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcutiexpired_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercuti_expired_id'])){
           $this->setId($x['parametercuti_expired_id']); 
        }
        if(isset ($x['parametercuti_expired_id'])){
           $this->setParamCutiExpiredId($x['parametercuti_expired_id']); 
        }
        if(isset ($x['parametercuti_expired'])){
           $this->setParamCutiExpired($x['parametercuti_expired']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercuti_terbit_id'=>$this->getId(),
            'parametercuti_expired_id'=>$this->getParamCutiExpiredId(),
            'parametercuti_expired'=>$this->getParamCutiExpired(),
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

    public function getParamCutiExpiredId() {
        return $this->parametercuti_expired_id;
    }

    public function getParamCutiExpired() {
        return $this->parametercuti_expired;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setParamCutiExpiredId($parametercuti_expired_id) {
        $this->parametercuti_expired_id = $parametercuti_expired_id;
    }

    public function setParamCutiExpired($parametercuti_expired) {
        $this->parametercuti_expired = $parametercuti_expired;
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
