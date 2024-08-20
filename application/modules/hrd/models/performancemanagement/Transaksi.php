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
class Hrd_Models_Dinas_Transaksi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt, Box_Delien_DelimiterCandidate  {
    
    private $project;
    private $pt;
    private $employee;
    private $date;
    private $nomor;
    private $tujuan;
    private $keterangan;
    private $uangMuka;
    private $kendaraan;
    private $berangkat;
    private $berangkatJam;
    private $kembali;
    private $kembaliJam;
    private $tugas;
    private $totalUangSaku;
    private $totalUangMakan;
    private $totalUang;
    private $detail;
    private $DCResult;
    private $tujuanLain;
    
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "dinastran_";
        $this->detail = array();
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['dinas_id'])){
           $this->setId($x['dinas_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['nomor_surat'])){
           $this->setNomor($x['nomor_surat']); 
        }
        if(isset ($x['tujuan_proyek'])){
           $this->setTujuan($x['tujuan_proyek']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
        if(isset ($x['uang_muka'])){
           $this->setUangMuka($x['uang_muka']); 
        }
        if(isset ($x['kendaraan'])){
           $this->setKendaraan($x['kendaraan']); 
        }
        if(isset ($x['berangkat'])){
           $this->setBerangkat($x['berangkat']); 
        }
        if(isset ($x['berangkat_jam'])){
           $this->setBerangkatJam($x['berangkat_jam']); 
        }
        if(isset ($x['kembali'])){
           $this->setKembali($x['kembali']); 
        }
        if(isset ($x['kembali_jam'])){
           $this->setKembaliJam($x['kembali_jam']); 
        }
        if(isset ($x['tugas'])){
           $this->setTugas($x['tugas']); 
        }
        if(isset ($x['total_uang_saku'])){
           $this->setTotalUangSaku($x['total_uang_saku']); 
        }
        if(isset ($x['total_uang_makan'])){
           $this->setTotalUangMakan($x['total_uang_makan']); 
        }
        if(isset ($x['total_uang'])){
           $this->setTotalUang($x['total_uang']); 
        }
        if(isset ($x['tujuan_proyek_lain'])){
           $this->setTujuanLain($x['tujuan_proyek_lain']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'dinas_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'date'=>$this->getDate(),
            'nomor_surat'=>$this->getNomor(),
            'tujuan_proyek'=>$this->getTujuan(),
            'keterangan'=>$this->getKeterangan(),
            'uang_muka'=>$this->getUangMuka(),
            'kendaraan'=>$this->getKendaraan(),
            'berangkat'=>$this->getBerangkat(),
            'berangkat_jam'=>$this->getBerangkatJam(),
            'kembali'=>$this->getKembali(),
            'kembali_jam'=>$this->getKembaliJam(),
            'tugas'=>$this->getTugas(),
            'total_uang_saku'=>$this->getTotalUangSaku(),
            'total_uang_makan'=>$this->getTotalUangMakan(),
            'total_uang'=>$this->getTotalUang(),
            'tujuan_proyek_lain'=>$this->getTujuanLain()
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getDate() {
        return $this->date;
    }

    public function getNomor() {
        return $this->nomor;
    }

    public function getTujuan() {
        return $this->tujuan;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    public function getUangMuka() {
        return $this->uangMuka;
    }

    public function getKendaraan() {
        return $this->kendaraan;
    }

    public function getBerangkat() {
        return $this->berangkat;
    }

    public function getKembali() {
        return $this->kembali;
    }

    public function getTugas() {
        return $this->tugas;
    }

    public function getTotalUangSaku() {
        return $this->totalUangSaku;
    }

    public function getTotalUangMakan() {
        return $this->totalUangMakan;
    }

    public function getTotalUang() {
        return $this->totalUang;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function setTujuan($tujuan) {
        $this->tujuan = $tujuan;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    public function setUangMuka($uangMuka) {
        $this->uangMuka = $uangMuka;
    }

    public function setKendaraan($kendaraan) {
        $this->kendaraan = $kendaraan;
    }

    public function setBerangkat($berangkat) {
        $this->berangkat = $berangkat;
    }

    public function setKembali($kembali) {
        $this->kembali = $kembali;
    }

    public function setTugas($tugas) {
        $this->tugas = $tugas;
    }

    public function setTotalUangSaku($totalUangSaku) {
        $this->totalUangSaku = $totalUangSaku;
    }

    public function setTotalUangMakan($totalUangMakan) {
        $this->totalUangMakan = $totalUangMakan;
    }

    public function setTotalUang($totalUang) {
        $this->totalUang = $totalUang;
    }
    
    
    public function getBerangkatJam() {
        return $this->berangkatJam;
    }

    public function getKembaliJam() {
        return $this->kembaliJam;
    }

    public function setBerangkatJam($berangkatJam) {
        $this->berangkatJam = $berangkatJam;
    }

    public function setKembaliJam($kembaliJam) {
        $this->kembaliJam = $kembaliJam;
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
    
    public function addDetail(Hrd_Models_Dinas_TransaksiDetail $detail){
        $this->detail[] = $detail;
    }

    public function grouped() {
        return array($this->getEmployee());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getDatefields() {
        return array("date");
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
    
    public function getDetail($index = -1){
        if($index >= 0){
            return $this->detail[$index];
        }else{
            return $this->detail;
        }
    }
    
    
    public function getTujuanLain() {
        return $this->tujuanLain;
    }

    public function setTujuanLain($tujuanLain) {
        $this->tujuanLain = $tujuanLain;
    }


    

//put your code here
}
