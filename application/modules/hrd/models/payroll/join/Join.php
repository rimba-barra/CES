<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Join
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Join_Join extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $master;
    private $komp1;
    private $komp2;
    private $komp3;
    private $komp4;
    private $komp5;
    private $tglStart;
    private $tglEnd;
    private $isBulanSama;
    private $isBulanBelum;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "joinkomponen_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['joinkomponen_id'])){
           $this->setId($x['joinkomponen_id']); 
        }
        if(isset ($x['master'])){
           $this->getMaster()->setId($x['master']); 
        }
        if(isset ($x['komponen1'])){
           $this->getKomp1()->setId($x['komponen1']); 
        }
        if(isset ($x['komponen2'])){
           $this->getKomp2()->setId($x['komponen2']); 
        }
        if(isset ($x['komponen3'])){
           $this->getKomp3()->setId($x['komponen3']); 
        }
        if(isset ($x['komponen4'])){
           $this->getKomp4()->setId($x['komponen4']); 
        }
        if(isset ($x['komponen5'])){
           $this->getKomp5()->setId($x['komponen5']); 
        }
        if(isset ($x['tanggal_start'])){
           $this->setTglStart($x['tanggal_start']); 
        }
        if(isset ($x['tanggal_end'])){
           $this->setTglEnd($x['tanggal_end']); 
        }
        if(isset ($x['is_bulansama'])){
           $this->setIsBulanSama($x['is_bulansama']); 
        }
        if(isset ($x['is_bulansebelumnya'])){
           $this->setIsBulanBelum($x['is_bulansebelumnya']); 
        }
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'joinkomponen_id'=>$this->getId(),
            'master'=>$this->getMaster()->getId(),
            'komponen1'=>$this->getKomp1()->getId(),
            'komponen2'=>$this->getKomp2()->getId(),
            'komponen3'=>$this->getKomp3()->getId(),
            'komponen4'=>$this->getKomp4()->getId(),
            'komponen5'=>$this->getKomp5()->getId(),
            'tanggal_start'=>$this->getTglStart(),
            'tanggal_end'=>$this->getTglEnd(),
            'is_bulansama'=>$this->getIsBulanSama(),
            'is_bulansebelumnya'=>$this->getIsBulanBelum()
            
           
        );
      
        return $x;
    }
    
    public function getKomp1() {
        if(!$this->komp1){
            $this->komp1 = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komp1;
    }

    public function getKomp2() {
        if(!$this->komp2){
            $this->komp2 = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komp2;
    }

    public function getKomp3() {
        if(!$this->komp3){
            $this->komp3 = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komp3;
    }

    public function getKomp4() {
        if(!$this->komp4){
            $this->komp4 = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komp4;
    }

    public function getKomp5() {
        if(!$this->komp5){
            $this->komp5 = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->komp5;
    }

    public function getTglStart() {
        return $this->tglStart;
    }

    public function getTglEnd() {
        return $this->tglEnd;
    }

    public function getIsBulanSama() {
        return (int)$this->isBulanSama;
    }

    public function getIsBulanBelum() {
        return (int)$this->isBulanBelum;
    }

    public function setKomp1(Hrd_Models_Payroll_Komponen_Komponen $komp1) {
        $this->komp1 = $komp1;
    }

    public function setKomp2(Hrd_Models_Payroll_Komponen_Komponen $komp2) {
        $this->komp2 = $komp2;
    }

    public function setKomp3(Hrd_Models_Payroll_Komponen_Komponen $komp3) {
        $this->komp3 = $komp3;
    }

    public function setKomp4(Hrd_Models_Payroll_Komponen_Komponen $komp4) {
        $this->komp4 = $komp4;
    }

    public function setKomp5(Hrd_Models_Payroll_Komponen_Komponen $komp5) {
        $this->komp5 = $komp5;
    }

    public function setTglStart($tglStart) {
        $this->tglStart = $tglStart;
    }

    public function setTglEnd($tglEnd) {
        $this->tglEnd = $tglEnd;
    }

    public function setIsBulanSama($isBulanSama) {
        $this->isBulanSama = (int)$isBulanSama;
    }

    public function setIsBulanBelum($isBulanBelum) {
        $this->isBulanBelum = (int)$isBulanBelum;
    }
    
    public function getMaster() {
        if(!$this->master){
            $this->master = new Hrd_Models_Payroll_Komponen_Komponen();
        }
        return $this->master;
    }

    public function setMaster(Hrd_Models_Payroll_Komponen_Komponen $master) {
        $this->master = $master;
    }

    
        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Project();
        }
        return $this->pt;
    }

    public function grouped() {
        return array();
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
