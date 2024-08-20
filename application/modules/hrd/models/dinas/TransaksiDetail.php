<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransaksiDetail
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_TransaksiDetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Arried {
    private $dinasTran;
    private $date;
    private $hari;
    private $uangSaku;
    private $uangMakan;
    private $uangMakanPotong;
    private $transportasi;
    private $pengeluaranMakan;
    private $airportTax;
    private $biayaTelepon;
    private $tinggaldiRumah;
    private $tinggaldiRumahUang;
    private $biayaLainnya;
    private $keterangan;
    private $tujuan;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "dinasdetail_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['dinasdetail_id'])){
           $this->setId($x['dinasdetail_id']); 
        }
        if(isset ($x['dinas_dinas_id'])){
           $this->getDinasTran()->setId($x['dinas_dinas_id']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['hari'])){
           $this->setHari($x['hari']); 
        }
        if(isset ($x['uang_saku'])){
           $this->setUangSaku($x['uang_saku']); 
        }
        if(isset ($x['uang_makan'])){
           $this->setUangMakan($x['uang_makan']); 
        }
        if(isset ($x['uang_makan_potong'])){
           $this->setUangMakanPotong($x['uang_makan_potong']); 
        }
        if(isset ($x['transportasi'])){
           $this->setTransportasi($x['transportasi']); 
        }
        if(isset ($x['pengeluaran_makan'])){
           $this->setPengeluaranMakan($x['pengeluaran_makan']); 
        }
        if(isset ($x['airport_tax'])){
           $this->setAirportTax($x['airport_tax']); 
        }
        if(isset ($x['biaya_telepon'])){
           $this->setBiayaTelepon($x['biaya_telepon']); 
        }
        if(isset ($x['tinggal_di_rumah'])){
           $this->setTinggaldiRumah($x['tinggal_di_rumah']); 
        }
        if(isset ($x['tinggal_di_rumah_uang'])){
           $this->setTinggaldiRumahUang($x['tinggal_di_rumah_uang']); 
        }
        if(isset ($x['biaya_lainnya'])){
           $this->setBiayaLainnya($x['biaya_lainnya']); 
        }
        if(isset ($x['keterangan'])){
           $this->setKeterangan($x['keterangan']); 
        }
        if(isset ($x['tujuan'])){
           $this->setTujuan($x['tujuan']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'dinasdetail_id'=>$this->getId(),
            'dinas_dinas_id'=>$this->getDinasTran()->getId(),
            'date'=>$this->getDate(),
            'hari'=>$this->getHari(),
            'uang_saku'=>$this->getUangSaku(),
            'uang_makan'=>$this->getUangMakan(),
            'uang_makan_potong'=>$this->getUangMakanPotong(),
            'transportasi'=>$this->getTransportasi(),
            'pengeluaran_makan'=>$this->getPengeluaranMakan(),
            'airport_tax'=>$this->getAirportTax(),
            'biaya_telepon'=>$this->getBiayaTelepon(),
            'tinggal_di_rumah'=>$this->getTinggaldiRumah(),
            'tinggal_di_rumah_uang'=>$this->getTinggaldiRumahUang(),
            'biaya_lainnya'=>$this->getBiayaLainnya(),
            'keterangan'=>$this->getKeterangan(),
            'tujuan'=>$this->getTujuan()
        );
      
        return $x;
    }
    
    public function getDinasTran() {
        if(!$this->dinasTran){
            $this->dinasTran = new Hrd_Models_Dinas_Transaksi();
        }
        return $this->dinasTran;
    }

    public function getDate() {
        return $this->date;
    }

    public function getHari() {
        return $this->hari;
    }

    public function getUangSaku() {
        return $this->uangSaku;
    }

    public function getUangMakan() {
        return $this->uangMakan;
    }

    public function getTransportasi() {
        return $this->transportasi;
    }

    public function getPengeluaranMakan() {
        return $this->pengeluaranMakan;
    }

    public function getAirportTax() {
        return $this->airportTax;
    }

    public function getBiayaTelepon() {
        return $this->biayaTelepon;
    }

    public function getTinggaldiRumah() {
        return $this->tinggaldiRumah;
    }

    public function getTinggaldiRumahUang() {
        return $this->tinggaldiRumahUang;
    }

    public function getBiayaLainnya() {
        return $this->biayaLainnya;
    }

    public function getKeterangan() {
        return $this->keterangan;
    }

    public function getTujuan() {
        return $this->tujuan;
    }

    public function setDinasTran(Hrd_Models_Dinas_Transaksi $dinasTran) {
        $this->dinasTran = $dinasTran;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setHari($hari) {
        $this->hari = $hari;
    }

    public function setUangSaku($uangSaku) {
        $this->uangSaku = $uangSaku;
    }

    public function setUangMakan($uangMakan) {
        $this->uangMakan = $uangMakan;
    }

    public function setTransportasi($transportasi) {
        $this->transportasi = $transportasi;
    }

    public function setPengeluaranMakan($pengeluaranMakan) {
        $this->pengeluaranMakan = $pengeluaranMakan;
    }

    public function setAirportTax($airportTax) {
        $this->airportTax = $airportTax;
    }

    public function setBiayaTelepon($biayaTelepon) {
        $this->biayaTelepon = $biayaTelepon;
    }

    public function setTinggaldiRumah($tinggaldiRumah) {
        $this->tinggaldiRumah = $tinggaldiRumah;
    }

    public function setTinggaldiRumahUang($tinggaldiRumahUang) {
        $this->tinggaldiRumahUang = $tinggaldiRumahUang;
    }

    public function setBiayaLainnya($biayaLainnya) {
        $this->biayaLainnya = $biayaLainnya;
    }

    public function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    public function setTujuan($tujuan) {
        $this->tujuan = $tujuan;
    }
    
    public function getUangMakanPotong() {
        return (double)$this->uangMakanPotong;
    }

    public function setUangMakanPotong($uangMakanPotong) {
        $this->uangMakanPotong = (double)$uangMakanPotong;
    }
    
    

    
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getDinasTran());
    }
    
    public function getDatefields() {
        return array('date');
    }

    public function getArray() {
        return $this->getArrayTable();
    }

//put your code here
}
