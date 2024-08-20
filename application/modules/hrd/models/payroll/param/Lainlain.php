<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Lainlain
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Param_Lainlain extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $biayaJabatan;
    private $maxBiayaJabatan;
    private $maxBiayaPensiun;
    private $astek;
    private $karyawan;
    private $perusahaan;
    private $lembur;
    private $minLembur;
    private $kodePerusahaan;
    private $nomorRekening;
    private $ump;
    private $minUpah;
    private $maxUpah;
    private $opsiDtp;
    private $ttdApproved;
    private $ttdReviewed;
    private $ttdPrepared;
    private $ttdPajak;
    private $namaPerusahaan;
    private $alamatPerusahaan;
    private $kota;
    private $npwp;
    private $namaKuasaSpt;
    private $npwpKuasa;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "payparamlain_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['paramlainlain_id'])){
           $this->setId($x['paramlainlain_id']); 
        }
        if(isset ($x['biaya_jabatan'])){
           $this->setBiayaJabatan($x['biaya_jabatan']); 
        }
        if(isset ($x['max_biaya_jabatan'])){
           $this->setMaxBiayaJabatan($x['max_biaya_jabatan']); 
        }
        
        if(isset ($x['max_biaya_pensiun_karyawan'])){
           $this->setMaxBiayaPensiun($x['max_biaya_pensiun_karyawan']); 
        }
        
        if(isset ($x['astek'])){
           $this->setAstek($x['astek']); 
        }
        if(isset ($x['karyawan'])){
           $this->setKaryawan($x['karyawan']); 
        }
        if(isset ($x['perusahaan'])){
           $this->setPerusahaan($x['perusahaan']); 
        }
        if(isset ($x['lembur'])){
           $this->setLembur($x['lembur']); 
        }
        if(isset ($x['min_lembur'])){
           $this->setMinLembur($x['min_lembur']); 
        }
        if(isset ($x['kode_perusahaan'])){
           $this->setKodePerusahaan($x['kode_perusahaan']); 
        }
        if(isset ($x['no_rekening'])){
           $this->setNomorRekening($x['no_rekening']); 
        }
        if(isset ($x['ump'])){
           $this->setUmp($x['ump']); 
        }
        if(isset ($x['min_upah'])){
           $this->setMinUpah($x['min_upah']); 
        }
        if(isset ($x['max_upah'])){
           $this->setMaxUpah($x['max_upah']); 
        }
        if(isset ($x['opsi_dtp'])){
           $this->setOpsiDtp($x['opsi_dtp']); 
        }
        if(isset ($x['ttd_approved'])){
           $this->setTtdApproved($x['ttd_approved']); 
        }
        if(isset ($x['ttd_reviewed'])){
           $this->setTtdReviewed($x['ttd_reviewed']); 
        }
        if(isset ($x['ttd_prepared'])){
           $this->setTtdPrepared($x['ttd_prepared']); 
        }
        if(isset ($x['ttd_pajak'])){
           $this->setTtdPajak($x['ttd_pajak']); 
        }
        if(isset ($x['nama_perusahaan'])){
           $this->setNamaPerusahaan($x['nama_perusahaan']); 
        }
        if(isset ($x['alamat_perusahaan'])){
           $this->setAlamatPerusahaan($x['alamat_perusahaan']); 
        }
        if(isset ($x['kota'])){
           $this->setKota($x['kota']); 
        }
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        if(isset ($x['nama_kuasa_spt'])){
           $this->setNamaKuasaSpt($x['nama_kuasa_spt']); 
        }
        if(isset ($x['npwp_kuasa'])){
           $this->setNpwpKuasa($x['npwp_kuasa']); 
        }
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'paramlainlain_id'=>$this->getId(),
            'biaya_jabatan'=>$this->getBiayaJabatan(),
            'max_biaya_jabatan'=>$this->getMaxBiayaJabatan(),
            'max_biaya_pensiun_karyawan'=>$this->getMaxBiayaPensiun(),
            'astek'=>$this->getAstek(),
            'karyawan'=>$this->getKaryawan(),
            'perusahaan'=>$this->getPerusahaan(),
            'lembur'=>$this->getLembur(),
            'min_lembur'=>$this->getMinLembur(),
            'kode_perusahaan'=>$this->getKodePerusahaan(),
            'no_rekening'=>$this->getNomorRekening(),
            'ump'=>$this->getUmp(),
            'min_upah'=>$this->getMinUpah(),
            'max_upah'=>$this->getMaxUpah(),
            'opsi_dtp'=>$this->getOpsiDtp(),
            'ttd_approved'=>$this->getTtdApproved(),
            'ttd_reviewed'=>$this->getTtdReviewed(),
            'ttd_prepared'=>$this->getTtdPrepared(),
            'ttd_pajak'=>$this->getTtdPajak(),
            'nama_perusahaan'=>$this->getNamaPerusahaan(),
            'alamat_perusahaan'=>$this->getAlamatPerusahaan(),
            'kota'=>$this->getKota(),
            'npwp'=>$this->getNpwp(),
            'nama_kuasa_spt'=>$this->getNamaKuasaSpt(),
            'npwp_kuasa'=>$this->getNpwpKuasa()
            
           
        );
      
        return $x;
    }
    
    public function getBiayaJabatan() {
        return (float)$this->biayaJabatan;
    }

    public function getMaxBiayaJabatan() {
        return (double)$this->maxBiayaJabatan;
    }

    public function getMaxBiayaPensiun() {
        return (double)$this->maxBiayaPensiun;
    }

    public function getAstek() {
        return (float)$this->astek;
    }

    public function getKaryawan() {
        return (float)$this->karyawan;
    }

    public function getPerusahaan() {
        return (float)$this->perusahaan;
    }

    public function getLembur() {
        return (int)$this->lembur;
    }

    public function getMinLembur() {
        return (double)$this->minLembur;
    }

    public function getKodePerusahaan() {
        return $this->kodePerusahaan;
    }

    public function getNomorRekening() {
        return $this->nomorRekening;
    }

    public function getUmp() {
        return (double)$this->ump;
    }

    public function getMinUpah() {
        return (double)$this->minUpah;
    }

    public function getMaxUpah() {
        return (double)$this->maxUpah;
    }

    public function getOpsiDtp() {
        return (int)$this->opsiDtp;
    }

    public function getTtdApproved() {
        return $this->ttdApproved;
    }

    public function getTtdReviewed() {
        return $this->ttdReviewed;
    }

    public function getTtdPrepared() {
        return $this->ttdPrepared;
    }

    public function getTtdPajak() {
        return $this->ttdPajak;
    }

    public function getNamaPerusahaan() {
        return $this->namaPerusahaan;
    }

    public function getAlamatPerusahaan() {
        return $this->alamatPerusahaan;
    }

    public function getKota() {
        return $this->kota;
    }

    public function getNpwp() {
        return $this->npwp;
    }

    public function getNamaKuasaSpt() {
        return $this->namaKuasaSpt;
    }

    public function getNpwpKuasa() {
        return $this->npwpKuasa;
    }

    public function setBiayaJabatan($biayaJabatan) {
        $this->biayaJabatan = (float)$biayaJabatan;
    }

    public function setMaxBiayaJabatan($maxBiayaJabatan) {
        $this->maxBiayaJabatan = (double)$maxBiayaJabatan;
    }

    public function setMaxBiayaPensiun($maxBiayaPensiun) {
        $this->maxBiayaPensiun = (double)$maxBiayaPensiun;
    }

    public function setAstek($astek) {
        $this->astek = (float)$astek;
    }

    public function setKaryawan($karyawan) {
        $this->karyawan = (float)$karyawan;
    }

    public function setPerusahaan($perusahaan) {
        $this->perusahaan = (float)$perusahaan;
    }

    public function setLembur($lembur) {
        $this->lembur = (int)$lembur;
    }

    public function setMinLembur($minLembur) {
        $this->minLembur = (double)$minLembur;
    }

    public function setKodePerusahaan($kodePerusahaan) {
        $this->kodePerusahaan = $kodePerusahaan;
    }

    public function setNomorRekening($nomorRekening) {
        $this->nomorRekening = $nomorRekening;
    }

    public function setUmp($ump) {
        $this->ump = (double)$ump;
    }

    public function setMinUpah($minUpah) {
        $this->minUpah = (double)$minUpah;
    }

    public function setMaxUpah($maxUpah) {
        $this->maxUpah = (double)$maxUpah;
    }

    public function setOpsiDtp($opsiDtp) {
        $this->opsiDtp = (int)$opsiDtp;
    }

    public function setTtdApproved($ttdApproved) {
        $this->ttdApproved = $ttdApproved;
    }

    public function setTtdReviewed($ttdReviewed) {
        $this->ttdReviewed = $ttdReviewed;
    }

    public function setTtdPrepared($ttdPrepared) {
        $this->ttdPrepared = $ttdPrepared;
    }

    public function setTtdPajak($ttdPajak) {
        $this->ttdPajak = $ttdPajak;
    }

    public function setNamaPerusahaan($namaPerusahaan) {
        $this->namaPerusahaan = $namaPerusahaan;
    }

    public function setAlamatPerusahaan($alamatPerusahaan) {
        $this->alamatPerusahaan = $alamatPerusahaan;
    }

    public function setKota($kota) {
        $this->kota = $kota;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    public function setNamaKuasaSpt($namaKuasaSpt) {
        $this->namaKuasaSpt = $namaKuasaSpt;
    }

    public function setNpwpKuasa($npwpKuasa) {
        $this->npwpKuasa = $npwpKuasa;
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
