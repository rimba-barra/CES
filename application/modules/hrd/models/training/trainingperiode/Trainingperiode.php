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
class Hrd_Models_Training_Trainingperiode_Trainingperiode extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {

    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $periode;
    private $trainingperiode_id;

    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "trainingperiode_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }

        if(isset ($x['trainingperiode_id'])){
           $this->setTrainingPeriodeId($x['trainingperiode_id']); 
        }
        if(isset ($x['periode'])){
           $this->setPeriode($x['periode']); 
        }

        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(

            'periode'=>$this->getPeriode(),
            'trainingperiode_id'=>$this->getTrainingPeriodeId()

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

    function getProjectid() {
        return $this->projectid;
    }

    function getPtid() {
        return $this->ptid;
    }

    function setProjectid($projectid) {
        $this->projectid = '1';
    }

    function setPtid($ptid) {
        $this->ptid = '1';
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectKP(Box_Models_Master_Project $project) {
        $this->project = '1';
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setPtKP(Box_Models_Master_Pt $pt) {
        $this->pt = '1';
    }

    public function getTrainingPeriodeId() {
        return $this->trainingperiode_id;
    }

    public function getPeriode() {
        return $this->periode;
    }

 
    public function setTrainingPeriodeId($trainingperiode_id) {
        $this->trainingperiode_id = $trainingperiode_id;
    }

    public function setPeriode($periode) {
        $this->periode = $periode;
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
