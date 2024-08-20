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
class Hrd_Models_Leave_ParamCutiDetail extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercuti_terbit_id;
    private $parametercuti_terbit;
    private $parametercuti_expired_id;
    private $parametercuti_expired;
    private $parametercuti_id;
    private $opsiparam;
    private $expired_sampai;
    private $is_sama;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcutidetail_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercuti_id'])){
           $this->setId($x['parametercuti_id']); 
        }
        if(isset ($x['parametercuti_terbit_id'])){
           $this->setParamCutiTerbitId($x['parametercuti_terbit_id']); 
        }
        if(isset ($x['parametercuti_terbit'])){
           $this->setParamCutiTerbit($x['parametercuti_terbit']); 
        }
        if(isset ($x['parametercuti_expired_id'])){
           $this->setParamCutiExpiredId($x['parametercuti_expired_id']); 
        }
        if(isset ($x['parametercuti_expired'])){
           $this->setParamCutiExpired($x['parametercuti_expired']); 
        }
        if(isset ($x['opsiparam'])){
           $this->setOpsiParam($x['opsiparam']); 
        }
        if(isset ($x['expired_sampai'])){
           $this->setExpiredSampai($x['expired_sampai']); 
        }
        if(isset ($x['is_sama'])){
           $this->setIsSama($x['is_sama']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercuti_id'=>$this->getId(),
            'parametercuti_terbit_id'=>$this->getParamCutiTerbitId(),
            'parametercuti_terbit'=>$this->getParamCutiTerbit(),
            'parametercuti_expired_id'=>$this->getParamCutiExpiredId(),
            'parametercuti_expired'=>$this->getParamCutiExpired(),
            'opsiparam'=>$this->getOpsiParam(),
            'expired_sampai'=>$this->getExpiredSampai(),
            'is_sama'=>$this->getIsSama(),
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

    public function getParamCutiTerbitId() {
        return $this->parametercuti_terbit_id;
    }

    public function getParamCutiTerbit() {
        return $this->parametercuti_terbit;
    }

    public function getParamCutiExpiredId() {
        return $this->parametercuti_expired_id;
    }

    public function getParamCutiExpired() {
        return $this->parametercuti_expired;
    }

    public function getOpsiParam() {
        return $this->opsiparam;
    }

    public function getExpiredSampai() {
        return $this->expired_sampai;
    }

    public function getIsSama() {
        return $this->is_sama;
    }

    

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setParamCutiTerbitId($parametercuti_terbit_id) {
        $this->parametercuti_terbit_id = $parametercuti_terbit_id;
    }

    public function setParamCutiTerbit($parametercuti_terbit) {
        $this->parametercuti_terbit = $parametercuti_terbit;
    }

    public function setParamCutiExpiredId($parametercuti_expired_id) {
        $this->parametercuti_expired_id = $parametercuti_expired_id;
    }

    public function setParamCutiExpired($parametercuti_expired) {
        $this->parametercuti_expired = $parametercuti_expired;
    }

    public function setOpsiParam($opsiparam) {
        $this->opsiparam = $opsiparam;
    }

    public function setExpiredSampai($expired_sampai) {
        $this->expired_sampai = $expired_sampai;
    }

    public function setIsSama($is_sama) {
        $this->is_sama = $is_sama;
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
