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
class Hrd_Models_Leave_ParamCuti extends Box_Models_ObjectEmbedData implements  Box_Kouti_Remora, Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $parametercuti_terbit_id;
    private $parametercuti_terbit;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "paramcuti_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['parametercuti_terbit_id'])){
           $this->setId($x['parametercuti_terbit_id']); 
        }
        if(isset ($x['parametercuti_terbit_id'])){
           $this->setParamCutiTerbitId($x['parametercuti_terbit_id']); 
        }
        if(isset ($x['parametercuti_terbit'])){
           $this->setParamCutiTerbit($x['parametercuti_terbit']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parametercuti_terbit_id'=>$this->getId(),
            'parametercuti_terbit_id'=>$this->getParamCutiTerbitId(),
            'parametercuti_terbit'=>$this->getParamCutiTerbit(),
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
