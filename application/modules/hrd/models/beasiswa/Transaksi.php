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
class Hrd_Models_Beasiswa_Transaksi extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    
    private $project;
    private $pt;
    protected $module;
    private $employee;
    private $child;
    private $jenjang;
    private $kelas;
    private $semester;
    private $rangking;
    private $namaSekolah;
    private $date;
    private $syaratSurat;
    private $syaratRaport;
    private $syaratKartuKeluarga;
    private $isKaryawan;
    private $namaOrangTua;
    private $ktpOrangTua;
    private $namaAnak;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "beasiswatran_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['beasiswatran_id'])){
           $this->setId($x['beasiswatran_id']); 
        }
        if(isset ($x['module'])){
           $this->setModule($x['module']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['jenjang'])){
           $this->setJenjang($x['jenjang']); 
        }
        if(isset ($x['kelas'])){
           $this->setKelas($x['kelas']); 
        }
        if(isset ($x['semester'])){
           $this->setSemester($x['semester']); 
        }
        if(isset ($x['rangking'])){
           $this->setRangking($x['rangking']); 
        }
        if(isset ($x['nama_sekolah'])){
           $this->setNamaSekolah($x['nama_sekolah']); 
        }
        if(isset ($x['date'])){
           $this->setDate($x['date']); 
        }
        if(isset ($x['syarat_surat_sekolah'])){
           $this->setSyaratSurat($x['syarat_surat_sekolah']); 
        }
        if(isset ($x['syarat_fotocopy_raport'])){
           $this->setSyaratRaport($x['syarat_fotocopy_raport']); 
        }
        if(isset ($x['syarat_kartu_keluarga'])){
           $this->setSyaratKartuKeluarga($x['syarat_kartu_keluarga']); 
        }        
        if(isset ($x['child_relation_id'])){
           $this->getChild()->setId($x['child_relation_id']); 
        }
        if(isset ($x['is_karyawan'])){
           $this->setIsKaryawan($x['is_karyawan']); 
        }
        if(isset ($x['nama_orangtua'])){
           $this->setNamaOrangTua($x['nama_orangtua']); 
        }
        if(isset ($x['ktp_orangtua'])){
           $this->setKtpOrangTua($x['ktp_orangtua']); 
        }
        if(isset ($x['nama_anak'])){
           $this->setNamaAnak($x['nama_anak']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'beasiswatran_id'=>$this->getId(),
            'module'=>$this->getModule(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'jenjang'=>$this->getJenjang(),
            'kelas'=>$this->getKelas(),
            'semester'=>$this->getSemester(),
            'rangking'=>$this->getRangking(),
            'nama_sekolah'=>$this->getNamaSekolah(),
            'date'=>$this->getDate(),
            'syarat_surat_sekolah'=>$this->getSyaratSurat(),
            'syarat_fotocopy_raport'=>$this->getSyaratRaport(),
            'syarat_kartu_keluarga'=>$this->getSyaratKartuKeluarga(),
            'child_relation_id'=>$this->getChild()->getId(),
            'is_karyawan'=>$this->getIsKaryawan(),
            'nama_orangtua'=>$this->getNamaOrangTua(),
            'ktp_orangtua'=>$this->getKtpOrangTua(),
            'nama_anak'=>$this->getNamaAnak()
           
        );
      
        return $x;
    }
    
    public function getModule() {
        return (int)$this->module;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getJenjang() {
        return $this->jenjang;
    }

    public function getKelas() {
        return $this->kelas;
    }

    public function getSemester() {
        return $this->semester;
    }

    public function getRangking() {
        return $this->rangking;
    }

    public function getNamaSekolah() {
        return $this->namaSekolah;
    }

    public function getDate() {
        return $this->date;
    }

    public function getSyaratSurat() {
        return $this->syaratSurat;
    }

    public function getSyaratRaport() {
        return $this->syaratRaport;
    }

    public function getSyaratKartuKeluarga() {
        return $this->syaratKartuKeluarga;
    }

    public function setModule($module) {
        $this->module = (int)$module;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setJenjang($jenjang) {
        $this->jenjang = $jenjang;
    }

    public function setKelas($kelas) {
        $this->kelas = $kelas;
    }

    public function setSemester($semester) {
        $this->semester = $semester;
    }

    public function setRangking($rangking) {
        $this->rangking = $rangking;
    }

    public function setNamaSekolah($namaSekolah) {
        $this->namaSekolah = $namaSekolah;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function setSyaratSurat($syaratSurat) {
        $this->syaratSurat = (boolean)$syaratSurat;
    }

    public function setSyaratRaport($syaratRaport) {
        $this->syaratRaport = (boolean)$syaratRaport;
    }

    public function setSyaratKartuKeluarga($syaratKartuKeluarga) {
        $this->syaratKartuKeluarga = (boolean)$syaratKartuKeluarga;
    }
    
    public function getChild() {
        if(!$this->child){
            $this->child = new Hrd_Models_Master_Child();
        }
        return $this->child;
    }

    public function setChild(Hrd_Models_Master_Child $child) {
        $this->child = $child;
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
        
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getIsKaryawan() {
        return $this->isKaryawan;
    }

    public function getNamaOrangTua() {
        return $this->namaOrangTua;
    }

    public function getKtpOrangTua() {
        return $this->ktpOrangTua;
    }

    public function setIsKaryawan($isKaryawan) {
        $this->isKaryawan = $isKaryawan;
    }

    public function setNamaOrangTua($namaOrangTua) {
        $this->namaOrangTua = $namaOrangTua;
    }

    public function setKtpOrangTua($ktpOrangTua) {
        $this->ktpOrangTua = $ktpOrangTua;
    }
    
    public function getNamaAnak() {
        return $this->namaAnak;
    }

    public function setNamaAnak($namaAnak) {
        $this->namaAnak = $namaAnak;
    }

    
        
    public function getDatefields() {
        return array('date');
    }


}
