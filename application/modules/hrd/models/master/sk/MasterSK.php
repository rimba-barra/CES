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
class Hrd_Models_Master_Sk_MasterSK extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $projectid;
    private $pt;
    private $ptid;
    private $name;
    private $nomor;
    private $masterkategorisk_id;
    private $masterkategorisk_name;
    private $tanggal;
    private $tanggal_habis;
    private $keterangan;
    private $fileName;
    private $private;
    private $active;
    private $mastersk_id_source;
    
    public function __construct() {
        $this->_mail = new Hrd_Models_General_Email();
        parent::__construct();
        $this->embedPrefix = "mastersk_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['project_id'])){
           $this->setProjectid($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtid($x['pt_id']); 
        }
        
        if(isset ($x['mastersk_id'])){
           $this->setId($x['mastersk_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['nomor'])){
           $this->setNomor($x['nomor']); 
        }
        if(isset ($x['masterkategorisk_id'])){
           $this->setMasterkategorisk($x['masterkategorisk_id']); 
        }
        if(isset ($x['masterkategorisk_name'])){
           $this->setMasterkategorisk_name($x['masterkategorisk_name']); 
        }
        if(isset ($x['tanggal'])){
           $this->setTanggal($x['tanggal']); 
        }
        if(isset ($x['tanggal_habis'])){
           $this->setTanggalhabis($x['tanggal_habis']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
        if(isset ($x['file_name'])){
           $this->setFileName($x['file_name']); 
        }
        if(isset ($x['private'])){
           $this->setPrivate($x['private']); 
        }
        if(isset ($x['active'])){
           $this->setActive($x['active']); 
        }
        if(isset ($x['mastersk_id_source'])){
           $this->setMastersk_id_source($x['mastersk_id_source']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'mastersk_id'=>$this->getId(),
            'name'=>$this->getName(),
            'nomor'=>$this->getNomor(),
            'masterkategorisk_id'=>$this->getMasterkategorisk(),
            'masterkategorisk_name'=>$this->getMasterkategorisk_name(),
            'tanggal'=>$this->getTanggal(),
            'tanggal_habis'=>$this->getTanggalhabis(),
            'keterangan'=>$this->getKeterangan(),
            'file_name'=>$this->getFileName(),
            'private'=>$this->getPrivate(),
            'active'=>$this->getActive(),
            'mastersk_id_source'=>$this->getMastersk_id_source()
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

    public function getName() {
        return $this->name;
    }

    public function getNomor() {
        return $this->nomor;
    }

    public function getMasterkategorisk() {
        return $this->masterkategorisk_id;
    }

    public function getMasterkategorisk_name() {
        return $this->masterkategorisk_name;
    }

    public function getTanggal() {
        return $this->tanggal;
    }

    public function getTanggalhabis() {
        return $this->tanggal_habis;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getPrivate() {
        return $this->private;
    }

    public function getActive() {
        return $this->active;
    }

    public function getMastersk_id_source() {
        return $this->mastersk_id_source;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function setMasterkategorisk($masterkategorisk_id) {
        $this->masterkategorisk_id = $masterkategorisk_id;
    }

    public function setMasterkategorisk_name($masterkategorisk_name) {
        $this->masterkategorisk_name = $masterkategorisk_name;
    }

    public function setTanggal($tanggal) {
        $this->tanggal = $tanggal;
    }

    public function setTanggalhabis($tanggal_habis) {
        $this->tanggal_habis = $tanggal_habis;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    public function setFileName($fileName) {
        $this->fileName = $fileName;
    }

    public function setPrivate($private) {
        $this->private = $private;
    }

    public function setActive($active) {
        $this->active = $active;
    }

    public function setMastersk_id_source($mastersk_id_source) {
        $this->mastersk_id_source = $mastersk_id_source;
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
