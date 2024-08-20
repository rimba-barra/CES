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
class Hrd_Models_Leave_ParamCutiPhDetail extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercutiph_terbit_id;
    private $parametercutiph_terbit;
    private $parametercutiph_expired_id;
    private $parametercutiph_expired;
    private $parametercutiph_id;
    private $opsiparamph;
    private $expired_sampai_ph;
    private $is_sama_ph;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcutiphdetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercutiph_id'])){
           $this->setId($x['parametercutiph_id']); 
        }
        if(isset ($x['parametercutiph_terbit_id'])){
           $this->setParamCutiPhTerbitId($x['parametercutiph_terbit_id']); 
        }
        if(isset ($x['parametercutiph_terbit'])){
           $this->setParamCutiPhTerbit($x['parametercutiph_terbit']); 
        }
        if(isset ($x['parametercutiph_expired_id'])){
           $this->setParamCutiPhExpiredId($x['parametercutiph_expired_id']); 
        }
        if(isset ($x['parametercutiph_expired'])){
           $this->setParamCutiPhExpired($x['parametercutiph_expired']); 
        }
        if(isset ($x['opsiparamph'])){
           $this->setOpsiParamPh($x['opsiparamph']); 
        }
        if(isset ($x['expired_sampai_ph'])){
           $this->setExpiredSampaiPh($x['expired_sampai_ph']); 
        }
        if(isset ($x['is_sama_ph'])){
           $this->setIsSamaPh($x['is_sama_ph']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercutiph_id'=>$this->getId(),
            'parametercutiph_terbit_id'=>$this->getParamCutiPhTerbitId(),
            'parametercutiph_terbit'=>$this->getParamCutiPhTerbit(),
            'parametercutiph_expired_id'=>$this->getParamCutiPhExpiredId(),
            'parametercutiph_expired'=>$this->getParamCutiPhExpired(),
            'opsiparamph'=>$this->getOpsiParamPh(),
            'expired_sampai_ph'=>$this->getExpiredSampaiPh(),
            'is_sama_ph'=>$this->getIsSamaPh(),
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

    public function getParamCutiPhExpiredId() {
        return $this->parametercutiph_expired_id;
    }

    public function getParamCutiPhExpired() {
        return $this->parametercutiph_expired;
    }

    public function getOpsiParamPh() {
        return $this->opsiparamph;
    }

    public function getExpiredSampaiPh() {
        return $this->expired_sampai_ph;
    }

    public function getIsSamaPh() {
        return $this->is_sama_ph;
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

    public function setParamCutiPhExpiredId($parametercutiph_expired_id) {
        $this->parametercutiph_expired_id = $parametercutiph_expired_id;
    }

    public function setParamCutiPhExpired($parametercutiph_expired) {
        $this->parametercutiph_expired = $parametercutiph_expired;
    }

    public function setOpsiParamPh($opsiparamph) {
        $this->opsiparamph = $opsiparamph;
    }

    public function setExpiredSampaiPh($expired_sampai_ph) {
        $this->expired_sampai_ph = $expired_sampai_ph;
    }

    public function setIsSamaPh($is_sama_ph) {
        $this->is_sama_ph = $is_sama_ph;
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
