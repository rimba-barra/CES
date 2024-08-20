<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Mod
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Mod_Mod extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt   {
    private $project;
    private $pt;
    private $karyawaMod;
    private $date;
    private $nomorForm;
    private $dateOff;
    private $keterangan;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "mod_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['mod_id'])){
           $this->setId($x['mod_id']); 
        }
        if(isset ($x['karyawanmod_karyawanmod_id'])){
           $this->getKaryawaMod()->setId($x['karyawanmod_karyawanmod_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['nomor_form'])){
           $this->setNomorForm($x['nomor_form']); 
        }
        if(isset ($x['date_off'])){
           $this->setDateOff($x['date_off']); 
        }if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
        
     
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'mod_id'=>$this->getId(),
            'karyawanmod_karyawanmod_id'=>$this->getKaryawaMod()->getId(),
             'date'=>$this->getDate(),
             'nomor_form'=>$this->getNomorForm(),
             'date_off'=>$this->getDateOff(),
             'keterangan'=>$this->getKeterangan()
           
        );
      
        return $x;
    }
    
    

    public function getDate() {
        return $this->date;
    }

    public function getNomorForm() {
        return $this->nomorForm;
    }

    public function getDateOff() {
        return $this->dateOff;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    

    public function setDate($date) {
        $this->date = $date;
    }

    public function setNomorForm($nomorForm) {
        $this->nomorForm = $nomorForm;
    }

    public function setDateOff($dateOff) {
        $this->dateOff = $dateOff;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }
    
    public function getKaryawaMod() {
        if(!$this->karyawaMod){
            $this->karyawaMod = new Hrd_Models_Mod_Karyawan();
        }
        return $this->karyawaMod;
    }

    public function setKaryawaMod(Hrd_Models_Mod_Karyawan $karyawaMod) {
        $this->karyawaMod = $karyawaMod;
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
        return array($this->getKaryawaMod());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getDatefields() {
        return array("date","date_off");
    }

}
