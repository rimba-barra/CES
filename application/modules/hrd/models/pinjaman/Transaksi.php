<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Transaksi
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Pinjaman_Transaksi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt,Box_Delien_DelimiterCandidate  {
    private $module;
    private $project;
    private $pt;
    private $employee;
    private $tipe;
    private $nilai;
    private $bunga;
    private $lamaAngsuran;
    private $interval;
    private $nilaiAngsuran;
    private $keterangan;
    private $date;
    private $startDate;
    private $detail;
    private $DCResult;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pinjaman_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['pinjaman_id'])){
           $this->setId($x['pinjaman_id']); 
        }
       
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['tipepinjaman_tipepinjaman_id'])){
           $this->getTipe()->setId($x['tipepinjaman_tipepinjaman_id']); 
        }
        if(isset ($x['nilai'])){
           $this->setNilai($x['nilai']); 
        }
        if(isset ($x['bunga'])){
           $this->setBunga($x['bunga']); 
        }
        if(isset ($x['lama_angsuran'])){
           $this->setLamaAngsuran($x['lama_angsuran']); 
        }
        if(isset ($x['interval'])){
           $this->setInterval($x['interval']); 
        }
        if(isset ($x['nilai_angsuran'])){
           $this->setNilaiAngsuran($x['nilai_angsuran']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'pinjaman_id'=>$this->getId(),
          //  'module_id'=>$this->getModule(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'tipepinjaman_tipepinjaman_id'=>$this->getTipe()->getId(),
            'nilai'=>$this->getNilai(),
            'bunga'=>$this->getBunga(),
            'lama_angsuran'=>$this->getLamaAngsuran(),
            'interval'=>$this->getInterval(),
            'nilai_angsuran'=>$this->getNilaiAngsuran(),
            'keterangan'=>$this->getKeterangan(),
            'date'=>$this->getDate(),
            'start_date'=>$this->getStartDate(),
           
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getTipe() {
        if(!$this->tipe){
            $this->tipe = new Hrd_Models_Pinjaman_Tipe();
        }
        return $this->tipe;
    }

    public function getNilai() {
        return $this->nilai;
    }

    public function getBunga() {
        return $this->bunga;
    }

    public function getLamaAngsuran() {
        return $this->lamaAngsuran;
    }

    public function getInterval() {
        return $this->interval;
    }

    public function getNilaiAngsuran() {
        return $this->nilaiAngsuran;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    public function getDate() {
        return $this->date;
    }

    public function getStartDate() {
        return $this->startDate;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setTipe(Hrd_Models_Pinjaman_Tipe $tipe) {
        $this->tipe = $tipe;
    }

    public function setNilai($nilai) {
        $this->nilai = $nilai;
    }

    public function setBunga($bunga) {
        $this->bunga = $bunga;
    }

    public function setLamaAngsuran($lamaAngsuran) {
        $this->lamaAngsuran = $lamaAngsuran;
    }

    public function setInterval($interval) {
        $this->interval = $interval;
    }

    public function setNilaiAngsuran($nilaiAngsuran) {
        $this->nilaiAngsuran = $nilaiAngsuran;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }
    
    public function getModule() {
        return $this->module;
    }

    public function getDetail() {
        return $this->detail;
    }

    public function setModule($module) {
        $this->module = $module;
    }

    public function setDetail($detail) {
        $this->detail = $detail;
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
        return array($this->getArrayTable());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getDatefields() {
        return array("date","start_date");
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }
    
    public function addDetail(Hrd_Models_Pinjaman_Angsuran $detail){
        $this->detail[] = $detail;
    }

//put your code here
}
