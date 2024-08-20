<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NomorSurat
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NomorSurat  extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $infiks;
    private $tahun;
    private $bulan;
    private $nomor;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "nomorsuratdinas_";
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['nomorsuratdinas_id'])){
           $this->setId($x['nomorsuratdinas_id']); 
        }
        if(isset ($x['infiks'])){
           $this->setInfiks($x['infiks']); 
        }
        if(isset ($x['tahun'])){
           $this->setTahun($x['tahun']); 
        }
        if(isset ($x['bulan'])){
           $this->setBulan($x['bulan']); 
        }
        if(isset ($x['nomor'])){
           $this->setNomor($x['nomor']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'nomorsuratdinas_id'=>$this->getId(),
            'infiks'=>$this->getInfiks(),
            'tahun'=>$this->getTahun(),
            'bulan'=>$this->getBulan(),
            'nomor'=>$this->getNomor()
           
        );
      
        return $x;
    }
    
    
    public function getInfiks() {
        return $this->infiks;
    }

    public function getTahun() {
        return $this->tahun;
    }

    public function getBulan() {
        return $this->bulan;
    }

    public function getNomor() {
        return $this->nomor;
    }

    public function setInfiks($infiks) {
        $this->infiks = $infiks;
    }

    public function setTahun($tahun) {
        $this->tahun = $tahun;
    }

    public function setBulan($bulan) {
        $this->bulan = $bulan;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
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
            $this->pt = new Box_Models_Master_Pt();
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
        $this->pt =  $pt;
    }

//put your code here
}
