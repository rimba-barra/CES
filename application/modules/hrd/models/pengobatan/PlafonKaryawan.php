<?php

/**
 * Description of PlafonKaryawan
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_PlafonKaryawan extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Models_Master_InterProjectPt {

    private $project;
    private $pt;
    private $employee;
    private $yearly;
    private $global;
    private $obat;
    private $dokter;
    private $gigi;
    private $lab;
    private $rawatInap;
    private $salinNormal;
    private $salinAbNormal;
    private $kehamilan;
    private $keluargaBerencana;
    private $cekup;
    private $lensa;
    private $frame;
    private $lainlain;
    private $year;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plafonkaryawan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['plafonkaryawan_id'])){
           $this->setId($x['plafonkaryawan_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['yearly'])){
           $this->setYearly($x['yearly']); 
        }
        if(isset ($x['global'])){
           $this->setGlobal($x['global']); 
        }
        if(isset ($x['obat'])){
           $this->setObat($x['obat']); 
        }
        if(isset ($x['dokter'])){
           $this->setDokter($x['dokter']); 
        }
        if(isset ($x['gigi'])){
           $this->setGigi($x['gigi']); 
        }
        if(isset ($x['lab'])){
           $this->setLab($x['lab']); 
        }
        if(isset ($x['rawat_inap'])){
           $this->setRawatInap($x['rawat_inap']); 
        }
        if(isset ($x['salin_normal'])){
           $this->setSalinNormal($x['salin_normal']); 
        }
        if(isset ($x['salin_abnormal'])){
           $this->setSalinAbNormal($x['salin_abnormal']); 
        }
        if(isset ($x['kehamilan'])){
           $this->setKehamilan($x['kehamilan']); 
        }
        if(isset ($x['keluarga_berencana'])){
           $this->setKeluargaBerencana($x['keluarga_berencana']); 
        }
        if(isset ($x['cekup'])){
           $this->setCekup($x['cekup']); 
        }
        if(isset ($x['lensa'])){
           $this->setLensa($x['lensa']); 
        }
        if(isset ($x['frame'])){
           $this->setFrame($x['frame']); 
        }
        if(isset ($x['lain_lain'])){
           $this->setLainlain($x['lain_lain']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'plafonkaryawan_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'yearly'=>$this->getYearly(),
            'global'=>$this->getGlobal(),
            'obat'=>$this->getObat(),
            'dokter'=>$this->getDokter(),
            'gigi'=>$this->getGigi(),
            'lab'=>$this->getLab(),
            'rawat_inap'=>$this->getRawatInap(),
            'salin_normal'=>$this->getSalinNormal(),
            'salin_abnormal'=>$this->getSalinAbNormal(),
            'kehamilan'=>$this->getKehamilan(),
            'keluarga_berencana'=>$this->getKeluargaBerencana(),
            'cekup'=>$this->getCekup(),
            'lensa'=>$this->getLensa(),
            'frame'=>$this->getFrame(),
            'lain_lain'=>$this->getLainlain(),
            'year'=>$this->getYear()
        );
      
        return $x;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function getYearly() {
        return $this->yearly;
    }

    public function setYearly($yearly) {
        $this->yearly = $yearly;
    }

    public function getGlobal() {
        return (double)$this->global;
    }

    public function setGlobal($global) {
        $this->global = $global;
    }

    public function getObat() {
        return (double)$this->obat;
    }

    public function setObat($obat) {
        $this->obat = (double)$obat;
    }

    public function getDokter() {
        return (double)$this->dokter;
    }

    public function setDokter($dokter) {
        $this->dokter = (double)$dokter;
    }

    public function getGigi() {
        return (double)$this->gigi;
    }

    public function setGigi($gigi) {
        $this->gigi = (double)$gigi;
    }

    public function getLab() {
        return (double)$this->lab;
    }

    public function setLab($lab) {
        $this->lab = (double)$lab;
    }

    public function getRawatInap() {
        return (double)$this->rawatInap;
    }

    public function setRawatInap($rawatInap) {
        $this->rawatInap = (double)$rawatInap;
    }

    public function getSalinNormal() {
        return (double)$this->salinNormal;
    }

    public function setSalinNormal($salinNormal) {
        $this->salinNormal = (double)$salinNormal;
    }

    public function getSalinAbNormal() {
        return (double) $this->salinAbNormal;
    }

    public function setSalinAbNormal($salinAbNormal) {
        $this->salinAbNormal = (double)$salinAbNormal;
    }

    public function getKehamilan() {
        return (double) $this->kehamilan;
    }

    public function setKehamilan($kehamilan) {
        $this->kehamilan = (double)$kehamilan;
    }

    public function getKeluargaBerencana() {
        return (double) $this->keluargaBerencana;
    }

    public function setKeluargaBerencana($keluargaBerencana) {
        $this->keluargaBerencana = (double)$keluargaBerencana;
    }

    public function getCekup() {
        return (double) $this->cekup;
    }

    public function setCekup($cekup) {
        $this->cekup = (double)$cekup;
    }

    public function getLensa() {
        return (double)$this->lensa;
    }

    public function setLensa($lensa) {
        $this->lensa = (double)$lensa;
    }

    public function getFrame() {
        return (double)$this->frame;
    }

    public function setFrame($frame) {
        $this->frame = (double)$frame;
    }

    public function getLainlain() {
        return (double)$this->lainlain;
    }

    public function setLainlain($lainlain) {
        $this->lainlain = (double)$lainlain;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployee());
    }
    
    public function getYear() {
        return $this->year;
    }

    public function setYear($year) {
        $this->year = $year;
    }



}

?>
