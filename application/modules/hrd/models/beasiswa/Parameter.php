<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Parameter
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Beasiswa_Parameter extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt {
    
    private $project;
    private $pt;
    private $jenjang;
    private $masukSekolah;
    private $beasiswa;
    private $jumlahSemester;
    private $lamaperSemester;
    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parameterbeasiswa_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parameterbeasiswa_id'])){
           $this->setId($x['parameterbeasiswa_id']); 
        }
        if(isset ($x['jenjang'])){
           $this->setJenjang($x['jenjang']); 
        }
        if(isset ($x['masuk_sekolah'])){
           $this->setMasukSekolah($x['masuk_sekolah']); 
        }
        if(isset ($x['beasiswa'])){
           $this->setBeasiswa($x['beasiswa']); 
        }
        if(isset ($x['jumlah_semester'])){
           $this->setJumlahSemester($x['jumlah_semester']); 
        }
        if(isset ($x['lama_persemester'])){
           $this->setLamaperSemester($x['lama_persemester']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'parameterbeasiswa_id'=>$this->getId(),
            'jenjang'=>$this->getJenjang(),
            'masuk_sekolah'=>$this->getMasukSekolah(),
            'beasiswa'=>$this->getBeasiswa(),
            'jumlah_semester'=>$this->getJumlahSemester(),
            'lama_persemester'=>$this->getLamaperSemester()
           
        );
      
        return $x;
    }
    
    public function getJenjang() {
        return $this->jenjang;
    }

    public function getMasukSekolah() {
        return $this->masukSekolah;
    }

    public function getBeasiswa() {
        return $this->beasiswa;
    }

    public function getJumlahSemester() {
        return $this->jumlahSemester;
    }

    public function getLamaperSemester() {
        return $this->lamaperSemester;
    }

    public function setJenjang($jenjang) {
        $this->jenjang = $jenjang;
    }

    public function setMasukSekolah($masukSekolah) {
        $this->masukSekolah = $masukSekolah;
    }

    public function setBeasiswa($beasiswa) {
        $this->beasiswa = $beasiswa;
    }

    public function setJumlahSemester($jumlahSemester) {
        $this->jumlahSemester = $jumlahSemester;
    }

    public function setLamaperSemester($lamaperSemester) {
        $this->lamaperSemester = $lamaperSemester;
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

//put your code here
}
