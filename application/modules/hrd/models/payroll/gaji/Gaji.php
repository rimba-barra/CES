<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Gaji
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Gaji_Gaji  extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $project;
    private $pt;
    private $employee;
    private $gaji;
    private $metodePph21;
    private $isAstek;
    private $astekNo;
    private $astekDate;
    private $astekGajiPercent;
    private $astekGajiValue;
    private $astekKecelakaan;
    private $astekKematian;
    private $isDanaPensiun;
    private $dapenNo;
    private $dapenDate;
    private $dapenNoKaryawan;
    private $dapenGajiPercent;
    private $dapenGajiValue;
    private $dapenPerusahaan;
    private $dapenKaryawan;
    private $metodeBayarTipe;
    private $bank;
    private $bankCabang;
    private $bankNama;
    private $bankRekening;
    private $bankKode;
    private $alokasiBiaya1;
    private $alokasiBiaya2;
    private $alokasiBiaya3;
    private $servicePointA;
    private $servicePointB;
    private $isBpjsKesehatan;
    private $bpjsksPerusahaan;
    private $bpjsksKaryawan;
    private $isAddincome;
    private $isAddAstek;
    private $marriageStatus;
    private $childCount;
    private $isActive;
    private $hireDate;
    private $resignDate;
    private $sex;
    private $npwpNumber;
    private $isWna;
    private $alamatPajak;
    private $isPensiun;
    private $pensiunPerusahaan;
    private $pensiunKaryawan;
    private $bpjsNo;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "gaji_";
    }
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['gaji_id'])){
           $this->setId($x['gaji_id']); 
        }
        if(isset ($x['employee_employee_id'])){
           $this->getEmployee()->setId($x['employee_employee_id']); 
        }
        if(isset ($x['gajix'])){
           $this->setGaji($x['gajix']); 
        }
        if(isset ($x['metode_pph21'])){
           $this->setMetodePph21($x['metode_pph21']); 
        }
        if(isset ($x['is_astek'])){
           $this->setIsAstek($x['is_astek']); 
        }
        if(isset ($x['astek_no'])){
           $this->setAstekNo($x['astek_no']); 
        }
        if(isset ($x['astek_date'])){
           $this->setAstekDate($x['astek_date']); 
        }
        if(isset ($x['astek_gaji_percent'])){
           $this->setAstekGajiPercent($x['astek_gaji_percent']); 
        }
        if(isset ($x['astek_gaji_value'])){
           $this->setAstekGajiValue($x['astek_gaji_value']); 
        }
        if(isset ($x['astek_kecelakaan'])){
           $this->setAstekKecelakaan($x['astek_kecelakaan']); 
        }
        if(isset ($x['astek_kematian'])){
           $this->setAstekKematian($x['astek_kematian']); 
        }
        if(isset ($x['is_danapensiun'])){
           $this->setIsDanaPensiun($x['is_danapensiun']); 
        }
        if(isset ($x['danapensiun_no'])){
           $this->setDapenNo($x['danapensiun_no']); 
        }
        if(isset ($x['danapensiun_date'])){
           $this->setDapenDate($x['danapensiun_date']); 
        }
        if(isset ($x['danapensiun_no_karyawan'])){
           $this->setDapenNoKaryawan($x['danapensiun_no_karyawan']); 
        }
        if(isset ($x['danapensiun_gaji_percent'])){
           $this->setDapenGajiPercent($x['danapensiun_gaji_percent']); 
        }
        if(isset ($x['danapensiun_gaji_value'])){
           $this->setDapenGajiValue($x['danapensiun_gaji_value']); 
        }
        if(isset ($x['danapensiun_perusahaan'])){
           $this->setDapenPerusahaan($x['danapensiun_perusahaan']); 
        }
        if(isset ($x['danapensiun_karyawan'])){
           $this->setDapenKaryawan($x['danapensiun_karyawan']); 
        }
        if(isset ($x['metodebayar_tipe'])){
           $this->setMetodeBayarTipe($x['metodebayar_tipe']); 
        }
        if(isset ($x['bank_bank_id'])){
           $this->getBank()->setId($x['bank_bank_id']); 
        }
        if(isset ($x['bank_cabang'])){
           $this->setBankCabang($x['bank_cabang']); 
        }
        if(isset ($x['bank_nama'])){
           $this->setBankNama($x['bank_nama']); 
        }
        if(isset ($x['bank_rekening'])){
           $this->setBankRekening($x['bank_rekening']); 
        }
        if(isset ($x['bank_kode'])){
           $this->setBankKode($x['bank_kode']); 
        }
        if(isset ($x['cca_costcontrol_id'])){
           $this->setAlokasiBiaya1($x['cca_costcontrol_id']); 
        }
        if(isset ($x['ccb_costcontrol_id'])){
           $this->setAlokasiBiaya2($x['ccb_costcontrol_id']); 
        }
        if(isset ($x['ccc_costcontrol_id'])){
           $this->setAlokasiBiaya3($x['ccc_costcontrol_id']); 
        }
        if(isset ($x['service_point_a'])){
           $this->setServicePointA($x['service_point_a']); 
        }
        if(isset ($x['service_point_b'])){
           $this->setServicePointB($x['service_point_b']); 
        }
        if(isset ($x['is_bpjskesehatan'])){
           $this->setIsBpjsKesehatan($x['is_bpjskesehatan']); 
        }
        if(isset ($x['bpjsks_perusahaan'])){
           $this->setBpjsksPerusahaan($x['bpjsks_perusahaan']); 
        }
        if(isset ($x['bpjsks_karyawan'])){
           $this->setBpjsksKaryawan($x['bpjsks_karyawan']); 
        }
        if(isset ($x['is_addincome'])){
           $this->setIsAddincome($x['is_addincome']); 
        }
        if(isset ($x['is_addastek'])){
           $this->setIsAddAstek($x['is_addastek']); 
        }
        if(isset ($x['marriagestatus_id'])){
           $this->setMarriageStatus($x['marriagestatus_id']); 
        }
        if(isset ($x['child_count'])){
           $this->setChildCount($x['child_count']); 
        }
        if(isset ($x['is_active'])){
           $this->setIsActive($x['is_active']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHireDate($x['hire_date']); 
        }
        if(isset ($x['resign_date'])){
           $this->setResignDate($x['resign_date']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['npwp_number'])){
           $this->setNpwpNumber($x['npwp_number']); 
        }
        if(isset ($x['is_wna'])){
           $this->setIsWna($x['is_wna']); 
        }
        if(isset ($x['alamat_pajak'])){
           $this->setAlamatPajak($x['alamat_pajak']); 
        }
        if(isset ($x['is_pensiun'])){
           $this->setIsPensiun($x['is_pensiun']); 
        }
        if(isset ($x['pensiun_karyawan'])){
           $this->setPensiunKaryawan($x['pensiun_karyawan']); 
        }
        if(isset ($x['pensiun_perusahaan'])){
           $this->setPensiunPerusahaan($x['pensiun_perusahaan']); 
        }
        if(isset ($x['bpjs_no'])){
           $this->setBpjsNo($x['bpjs_no']); 
        }
        
        
        
       
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'gaji_id'=>$this->getId(),
            'employee_employee_id'=>$this->getEmployee()->getId(),
            'gajix'=>$this->getGaji(),
            'metode_pph21'=>$this->getMetodePph21(),
            'is_astek'=>$this->getIsAstek(),
            'astek_no'=>$this->getAstekNo(),
            'astek_date'=>$this->getAstekDate(),
            'astek_gaji_percent'=>$this->getAstekGajiPercent(),
            'astek_gaji_value'=>$this->getAstekGajiValue(),
            'astek_kecelakaan'=>$this->getAstekKecelakaan(),
            'astek_kematian'=>$this->getAstekKematian(),
            'is_danapensiun'=>$this->getIsDanaPensiun(),
            'danapensiun_no'=>$this->getDapenNo(),
            'danapensiun_date'=>$this->getDapenDate(),
            'danapensiun_no_karyawan'=>$this->getDapenNoKaryawan(),
            'danapensiun_gaji_percent'=>$this->getDapenGajiPercent(),
            'danapensiun_gaji_value'=>$this->getDapenGajiValue(),
            'danapensiun_perusahaan'=>$this->getDapenPerusahaan(),
            'danapensiun_karyawan'=>$this->getDapenKaryawan(),
            'metodebayar_tipe'=>$this->getMetodeBayarTipe(),
            'bank_bank_id'=>$this->getBank()->getId(),
            'bank_cabang'=>$this->getBankCabang(),
            'bank_nama'=>$this->getBankNama(),
            'bank_rekening'=>$this->getBankRekening(),
            'bank_kode'=>$this->getBankKode(),
            'cca_costcontrol_id'=>$this->getAlokasiBiaya1(),
            'ccb_costcontrol_id'=>$this->getAlokasiBiaya2(),
            'ccc_costcontrol_id'=>$this->getAlokasiBiaya3(),
            'service_point_a'=>$this->getServicePointA(),
            'service_point_b'=>$this->getServicePointB(),
            'is_bpjskesehatan'=>$this->getIsBpjsKesehatan(),
            'bpjsks_perusahaan'=>$this->getBpjsksPerusahaan(),
            'bpjsks_karyawan'=>$this->getBpjsksKaryawan(),
            'is_addincome'=>$this->getIsAddincome(),
            'is_addastek'=>$this->getIsAddAstek(),
            'marriagestatus_id'=>$this->getMarriageStatus(),
            'child_count'=>$this->getChildCount(),
            'is_active'=>$this->getIsActive(),
            'hire_date'=>$this->getHireDate(),
            'resign_date'=>$this->getResignDate(),
            'sex'=>$this->getSex(),
            'npwp_number'=>$this->getNpwpNumber(),
            'is_wna'=>$this->getIsWna(),
            'alamat_pajak'=>$this->getAlamatPajak(),
            'is_pensiun'=>$this->getIsPensiun(),
            'pensiun_karyawan'=>$this->getPensiunKaryawan(),
            'pensiun_perusahaan'=>$this->getPensiunPerusahaan(),
            'bpjs_no'=>$this->getBpjsNo(),
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function getGaji() {
        return $this->gaji;
    }

    public function getMetodePph21() {
        return $this->metodePph21;
    }

    public function getIsAstek() {
        return (int)$this->isAstek;
    }

    public function getAstekNo() {
        return $this->astekNo;
    }

    public function getAstekDate() {
        return $this->astekDate;
    }

    public function getAstekGajiPercent() {
        return (float)$this->astekGajiPercent;
    }

    public function getAstekGajiValue() {
        return (double)$this->astekGajiValue;
    }

    public function getAstekKecelakaan() {
        return (float)$this->astekKecelakaan;
    }

    public function getAstekKematian() {
        return (float)$this->astekKematian;
    }

    public function getIsDanaPensiun() {
        return (int)$this->isDanaPensiun;
    }

    public function getDapenNo() {
        return $this->dapenNo;
    }

    public function getDapenDate() {
        return $this->dapenDate;
    }

    public function getDapenNoKaryawan() {
        return $this->dapenNoKaryawan;
    }

    public function getDapenGajiPercent() {
        return (float)$this->dapenGajiPercent;
    }

    public function getDapenGajiValue() {
        return (double)$this->dapenGajiValue;
    }

    public function getDapenPerusahaan() {
        return (float)$this->dapenPerusahaan;
    }

    public function getDapenKaryawan() {
        return (float)$this->dapenKaryawan;
    }

    public function getMetodeBayarTipe() {
        return $this->metodeBayarTipe;
    }

    public function getBank() {
        if(!$this->bank){
            $this->bank = new Hrd_Models_Payroll_Bank_Bank();
        }
        return $this->bank;
    }

    public function getBankCabang() {
        return $this->bankCabang;
    }

    public function getBankNama() {
        return $this->bankNama;
    }

    public function getBankRekening() {
        return $this->bankRekening;
    }

    public function getBankKode() {
        return $this->bankKode;
    }

    public function getAlokasiBiaya1() {
        return (int)$this->alokasiBiaya1;
    }

    public function getAlokasiBiaya2() {
        return (int)$this->alokasiBiaya2;
    }

    public function getAlokasiBiaya3() {
        return (int)$this->alokasiBiaya3;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function setGaji($gaji) {
        $this->gaji = $gaji;
    }

    public function setMetodePph21($metodePph21) {
        $this->metodePph21 = $metodePph21;
    }

    public function setIsAstek($isAstek) {
        $this->isAstek = (int)$isAstek;
    }

    public function setAstekNo($astekNo) {
        $this->astekNo = $astekNo;
    }

    public function setAstekDate($astekDate) {
        $this->astekDate = $astekDate;
    }

    public function setAstekGajiPercent($astekGajiPercent) {
        $this->astekGajiPercent = (float)$astekGajiPercent;
    }

    public function setAstekGajiValue($astekGajiValue) {
        $this->astekGajiValue = (double)$astekGajiValue;
    }

    public function setAstekKecelakaan($astekKecelakaan) {
        $this->astekKecelakaan = (float)$astekKecelakaan;
    }

    public function setAstekKematian($astekKematian) {
        $this->astekKematian = (float)$astekKematian;
    }

    public function setIsDanaPensiun($isDanaPensiun) {
        $this->isDanaPensiun = (int)$isDanaPensiun;
    }

    public function setDapenNo($dapenNo) {
        $this->dapenNo = $dapenNo;
    }

    public function setDapenDate($dapenDate) {
        $this->dapenDate = $dapenDate;
    }

    public function setDapenNoKaryawan($dapenNoKaryawan) {
        $this->dapenNoKaryawan = $dapenNoKaryawan;
    }

    public function setDapenGajiPercent($dapenGajiPercent) {
        $this->dapenGajiPercent = (float)$dapenGajiPercent;
    }

    public function setDapenGajiValue($dapenGajiValue) {
        $this->dapenGajiValue = (double)$dapenGajiValue;
    }

    public function setDapenPerusahaan($dapenPerusahaan) {
        $this->dapenPerusahaan = (float)$dapenPerusahaan;
    }

    public function setDapenKaryawan($dapenKaryawan) {
        $this->dapenKaryawan = (float)$dapenKaryawan;
    }

    public function setMetodeBayarTipe($metodeBayarTipe) {
        $this->metodeBayarTipe = $metodeBayarTipe;
    }

    public function setBank(Hrd_Models_Payroll_Bank_Bank $bank) {
        $this->bank = $bank;
    }

    public function setBankCabang($bankCabang) {
        $this->bankCabang = $bankCabang;
    }

    public function setBankNama($bankNama) {
        $this->bankNama = $bankNama;
    }

    public function setBankRekening($bankRekening) {
        $this->bankRekening = $bankRekening;
    }

    public function setBankKode($bankKode) {
        $this->bankKode = $bankKode;
    }

    public function setAlokasiBiaya1($alokasiBiaya1) {
        $this->alokasiBiaya1 = (int)$alokasiBiaya1;
    }

    public function setAlokasiBiaya2($alokasiBiaya2) {
        $this->alokasiBiaya2 = (int)$alokasiBiaya2;
    }

    public function setAlokasiBiaya3($alokasiBiaya3) {
        $this->alokasiBiaya3 = (int)$alokasiBiaya3;
    }
    
    public function getServicePointA() {
        return (float)$this->servicePointA;
    }

    public function getServicePointB() {
        return (float)$this->servicePointB;
    }

    public function getIsBpjsKesehatan() {
        return (int)$this->isBpjsKesehatan;
    }

    public function getBpjsksPerusahaan() {
        return (float)$this->bpjsksPerusahaan;
    }

    public function getBpjsksKaryawan() {
        return (float)$this->bpjsksKaryawan;
    }

    public function getIsAddincome() {
        return (int)$this->isAddincome;
    }

    public function getIsAddAstek() {
        return (int)$this->isAddAstek;
    }

    public function setServicePointA($servicePointA) {
        $this->servicePointA = (float)$servicePointA;
    }

    public function setServicePointB($servicePointB) {
        $this->servicePointB = (float)$servicePointB;
    }

    public function setIsBpjsKesehatan($isBpjsKesehatan) {
        $this->isBpjsKesehatan = (int)$isBpjsKesehatan;
    }

    public function setBpjsksPerusahaan($bpjsksPerusahaan) {
        $this->bpjsksPerusahaan = (float)$bpjsksPerusahaan;
    }

    public function setBpjsksKaryawan($bpjsksKaryawan) {
        $this->bpjsksKaryawan = (float)$bpjsksKaryawan;
    }

    public function setIsAddincome($isAddincome) {
        $this->isAddincome = (int)$isAddincome;
    }

    public function setIsAddAstek($isAddAstek) {
        $this->isAddAstek = (int)$isAddAstek;
    }
    
    public function getMarriageStatus() {
        return (int)$this->marriageStatus;
    }

    public function getChildCount() {
        return (int)$this->childCount;
    }

    public function getIsActive() {
        return (int)$this->isActive;
    }

    public function getHireDate() {
        return $this->hireDate;
    }

    public function getResignDate() {
        return $this->resignDate;
    }

    public function getSex() {
        return $this->sex;
    }

    public function getNpwpNumber() {
        return $this->npwpNumber;
    }

    public function getIsWna() {
        return (int)$this->isWna;
    }

    public function getAlamatPajak() {
        return $this->alamatPajak;
    }

    public function setMarriageStatus($marriageStatus) {
        $this->marriageStatus = (int)$marriageStatus;
    }

    public function setChildCount($childCount) {
        $this->childCount = (int)$childCount;
    }

    public function setIsActive($isActive) {
        $this->isActive = (int)$isActive;
    }

    public function setHireDate($hireDate) {
        $this->hireDate = $hireDate;
    }

    public function setResignDate($resignDate) {
        $this->resignDate = $resignDate;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

    public function setNpwpNumber($npwpNumber) {
        $this->npwpNumber = $npwpNumber;
    }

    public function setIsWna($isWna) {
        $this->isWna = (int)$isWna;
    }

    public function setAlamatPajak($alamatPajak) {
        $this->alamatPajak = $alamatPajak;
    }
    
    public function getIsPensiun() {
        return (boolean)$this->isPensiun;
    }

    public function getPensiunPerusahaan() {
        return (float)$this->pensiunPerusahaan;
    }

    public function getPensiunKaryawan() {
        return (float)$this->pensiunKaryawan;
    }

    public function setIsPensiun($isPensiun) {
        $this->isPensiun = (boolean)$isPensiun;
    }

    public function setPensiunPerusahaan($pensiunPerusahaan) {
        $this->pensiunPerusahaan = (float)$pensiunPerusahaan;
    }

    public function setPensiunKaryawan($pensiunKaryawan) {
        $this->pensiunKaryawan = (float)$pensiunKaryawan;
    }
    
    public function getBpjsNo() {
        return $this->bpjsNo;
    }

    public function setBpjsNo($bpjsNo) {
        $this->bpjsNo = $bpjsNo;
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
        return array($this->getEmployee(),$this->getBank());
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}
