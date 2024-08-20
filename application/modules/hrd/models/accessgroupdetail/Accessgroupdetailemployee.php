<?php

class Hrd_Models_Accessgroupdetail_Accessgroupdetailemployee extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Models_Master_InterProjectPt,  Box_Arried{
    private $nik;
    private $name;
    private $birthPlace;
    private $status; /* employeestatus*/
    private $actived;
    private $birthDate;
    private $religion;
    private $bloodGroup;
    private $sex;
    private $nikGroup;
    private $address;
    private $ktp;
    private $zipcode;
    private $lastEducation;
    private $npwp;
    private $phoneNumber;
    private $passport;
    private $marriage;
    private $email;
    private $childCount;
    private $hireDate;
    private $contractEndDate;
    private $assignationDate;
    private $statusInformation;
    private $nonActiveDate;
    private $project;
    private $pt;
    private $temp;
    private $fingerPrintCode;
    private $leaveQuota;
    private $reportTo;
    private $alokasiBiaya;
    private $photo;
    private $dokumenKK;
    private $dokumenNPWP;
    private $dokumenKTP;
    private $dokumenJamsostek;
    private $klaimFrameTahun;
    private $klaimFrameSaldo;
    private $alasanResign;
    private $nomorRekening;
    private $namaRekening;
    private $bankRekening;
    private $emailCiputra;
    private $pt_name;
    private $project_name;
    private $dokumenVAKSIN1;
    private $dokumenVAKSIN2;
    private $dokumenBPJSPP;
    private $dokumenBPJSK;
    private $dokumenBPJSKK;
    private $dokumenIjazah;
    private $dokumenManulife;
    private $dokumenRekening;
    private $lastupdatebyuser;
    private $lastupdatebyadmin;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "employee_";
        $this->nik = "";
        
        
        
    }
    
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['employee_id'])){
           $this->setId($x['employee_id']); 
        }
        if(isset ($x['employee_nik'])){
           $this->setNik($x['employee_nik']); 
        }
        if(isset ($x['employee_name'])){
           $this->setName($x['employee_name']); 
        }
        if(isset ($x['employee_active'])){
           $this->setActived($x['employee_active']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
      
        if(isset ($x['birth_place'])){
           $this->setBirthPlace($x['birth_place']); 
        }
        if(isset ($x['birth_date'])){
           $this->setBirthDate($x['birth_date']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['nik_group'])){
           $this->setNikGroup($x['nik_group']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['zipcode'])){
           $this->setZipcode($x['zipcode']); 
        }
      
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['passport_number'])){
           $this->setPassport($x['passport_number']); 
        }
        if(isset ($x['child_count'])){
           $this->setChildCount($x['child_count']); 
        }
        if(isset ($x['hire_date'])){
           $this->setHireDate($x['hire_date']); 
        }
        if(isset ($x['assignation_date'])){
           $this->setAssignationDate($x['assignation_date']); 
        }
        if(isset ($x['contractend_date'])){
           $this->setContractEndDate($x['contractend_date']); 
        }
        if(isset ($x['nonactive_date'])){
           $this->setNonActiveDate($x['nonactive_date']); 
        }
        if(isset ($x['temp'])){
           $this->setTemp($x['temp']); 
        }
        if(isset ($x['fingerprintcode'])){
           $this->setFingerPrintCode($x['fingerprintcode']); 
        }
        if(isset ($x['leave_quota'])){
           $this->setLeaveQuota($x['leave_quota']); 
        }
        if(isset ($x['reportto_reportto'])){
           $this->getReportTo()->setId($x['reportto_reportto']); 
        }
        
        if(isset ($x['alokasibiaya_alokasibiaya_id'])){
           $this->getAlokasiBiaya()->setId($x['alokasibiaya_alokasibiaya_id']); 
        }
        if(isset ($x['photo'])){
           $this->setPhoto($x['photo']); 
        }
        if(isset ($x['dokumen_kk'])){
           $this->setDokumenKK($x['dokumen_kk']); 
        }
        if(isset ($x['dokumen_npwp'])){
           $this->setDokumenNPWP($x['dokumen_npwp']); 
        }
        if(isset ($x['dokumen_ktp'])){
           $this->setDokumenKTP($x['dokumen_ktp']); 
        }
        if(isset ($x['dokumen_jamsostek'])){
           $this->setDokumenJamsostek($x['dokumen_jamsostek']); 
        }
        if(isset ($x['klaim_frame_tahun_akhir'])){
           $this->setKlaimFrameTahun($x['klaim_frame_tahun_akhir']); 
        }
        if(isset ($x['klaim_frame_saldo_akhir'])){
           $this->setKlaimFrameSaldo($x['klaim_frame_saldo_akhir']); 
        }
        if(isset ($x['alasan_resign'])){
           $this->setAlasanResign($x['alasan_resign']); 
        }
        if(isset ($x['nomor_rekening'])){
           $this->setNomorRekening($x['nomor_rekening']); 
        }
        if(isset ($x['nama_rekening'])){
           $this->setNamaRekening($x['nama_rekening']); 
        }
        if(isset ($x['bank_rekening'])){
           $this->setBankRekening($x['bank_rekening']); 
        }
        if(isset ($x['email_ciputra'])){
           $this->setEmailCiputra($x['email_ciputra']); 
        }   
        if(isset ($x['dokumen_vaksin1'])){
           $this->setDokumenVaksin1($x['dokumen_vaksin1']); 
        }
        if(isset ($x['dokumen_vaksin2'])){
           $this->setDokumenVaksin2($x['dokumen_vaksin2']); 
        }
        if(isset ($x['dokumen_bpjs_pp'])){
           $this->setDokumenBPJSPP($x['dokumen_bpjs_pp']); 
        }
        if(isset ($x['dokumen_bpjs_k'])){
           $this->setDokumenBPJSK($x['dokumen_bpjs_k']); 
        }
        if(isset ($x['dokumen_bpjs_kk'])){
           $this->setDokumenBPJSK($x['dokumen_bpjs_kk']); 
        }
        if(isset ($x['dokumen_ijazah'])){
           $this->setDokumenIjazah($x['dokumen_ijazah']); 
        }        
        if(isset ($x['dokumen_manulife_p'])){
           $this->setDokumenManulife($x['dokumen_manulife_p']); 
        }
        if(isset ($x['dokumen_rekening'])){
           $this->setDokumenRekening($x['dokumen_rekening']); 
        }
        if(isset ($x['dokumen_jamsostek'])){
           $this->setDokumenJamsostek($x['dokumen_jamsostek']); 
        }
		if(isset ($x['last_update_by_user'])){
		   $this->setLastupdatebyuser($x['last_update_by_user']); 
		} 
		if(isset ($x['last_update_by_admin'])){
		   $this->setLastupdatebyadmin($x['last_update_by_admin']); 
		} 
		if(isset ($x['project_name'])){
		   $this->setProjectName($x['project_name']); 
		} 
		if(isset ($x['pt_name'])){
		   $this->setPtName($x['pt_name']); 
		}

        
        $this->getKtp()->setArrayTable($x);
        $this->getPhoneNumber()->setArrayTable($x);
        
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "employee_id"=>$this->getId(),
            "employee_nik"=>$this->getNik(),
            "employee_name"=>$this->getName(),/*
            "employee_active"=>$this->getActived(),
            "sex"=>$this->getSex(),
            "birth_place"=>$this->getBirthPlace(),
            "birth_date"=>$this->getBirthDate(),
            "sex"=>$this->getSex(),
            "nik_group"=>$this->getNikGroup(),
            "address"=>$this->getAddress(),
            "zipcode"=>$this->getZipcode(),
            "npwp"=>$this->getNpwp(),
            "email"=>$this->getEmail(),
            "passport_number"=>$this->getPassport(),
            "child_count"=>$this->getChildCount(),
            "hire_date"=>$this->getHireDate(),
            "assignation_date"=>$this->getAssignationDate(),
            "contractend_date"=>$this->getContractEndDate(),
            "nonactive_date"=>$this->getNonActiveDate(),
            "temp"=>$this->getTemp(),
            "fingerprintcode"=>$this->getFingerPrintCode(),
            "leave_quota"=>$this->getLeaveQuota(),
            "reportto_reportto"=>$this->getReportTo()->getId(),
            "alokasibiaya_alokasibiaya_id"=>$this->getAlokasiBiaya()->getId(),
            "photo"=>$this->getPhoto(),
            "dokumen_kk"=>$this->getDokumenKK(),
            "dokumen_npwp"=>$this->getDokumenNPWP(),
            "dokumen_ktp"=>$this->getDokumenKTP(),
            "dokumen_jamsostek"=>$this->getDokumenJamsostek(),
            "klaim_frame_tahun_akhir"=>$this->getKlaimFrameTahun(),
            "klaim_frame_saldo_akhir"=>$this->getKlaimFrameSaldo(),
            "alasan_resign"=>$this->getAlasanResign(),
            "nomor_rekening"=>$this->getNomorRekening(),
            "nama_rekening"=>$this->getNamaRekening(),
            "bank_rekening"=>$this->getBankRekening(),
            "email_ciputra"=>$this->getEmailCiputra(),
			"dokumen_bpjs_pp"=>$this->getDokumenBPJSPP(),
			"dokumen_bpjs_k"=>$this->getDokumenBPJSK(),
			"dokumen_bpjs_kk"=>$this->getDokumenBPJSKK(),
			"dokumen_ijazah"=>$this->getDokumenIjazah(),
			"dokumen_manulife_p"=>$this->getDokumenManulife(),
			"dokumen_rekening"=>$this->getDokumenRekening(),
			"last_update_by_user"=>$this->getLastupdatebyuser(),
			"last_update_by_admin"=>$this->getLastupdatebyadmin(),*/
			"project_name"=>$this->getProjectName(),
			"pt_name"=>$this->getPtName(),           
        );
        //$y = $this->getKtp()->getArrayTable();
        //$z = $this->getPhoneNumber()->getArrayTable();
        //$x = array_merge($y,$z,$x);
      
        return $x;
    }

	function getLastupdatebyuser() {
		return $this->lastupdatebyuser;
	}
	
	function getLastupdatebyadmin() {
		return $this->lastupdatebyadmin;
	}
	
	function setLastupdatebyuser($lastupdatebyuser) {
		$this->lastupdatebyuser = $lastupdatebyuser;
	}
	
	function setLastupdatebyadmin($lastupdatebyadmin) {
		$this->lastupdatebyadmin = $lastupdatebyadmin;
	}
	
    function getDokumenVAKSIN1() {
        return $this->dokumenVAKSIN1;
    }

    function getDokumenVAKSIN2() {
        return $this->dokumenVAKSIN2;
    }

    function getDokumenBPJSPP() {
        return $this->dokumenBPJSPP;
    }

    function getDokumenBPJSK() {
        return $this->dokumenBPJSK;
    }

    function getDokumenBPJSKK() {
        return $this->dokumenBPJSKK;
    }

    function getDokumenIjazah() {
        return $this->dokumenIjazah;
    }

    function getDokumenManulife() {
        return $this->dokumenManulife;
    }

    function getDokumenRekening() {
        return $this->dokumenRekening;
    }

    function setDokumenVaksin1($dokumenVAKSIN1) {
        $this->dokumenVAKSIN1 = $dokumenVAKSIN1;
    }

    function setDokumenVaksin2($dokumenVAKSIN2) {
        $this->dokumenVAKSIN2 = $dokumenVAKSIN2;
    }

    function setDokumenBPJSPP($dokumenBPJSPP) {
        $this->dokumenBPJSPP = $dokumenBPJSPP;
    }

    function setDokumenBPJSK($dokumenBPJSK) {
        $this->dokumenBPJSK = $dokumenBPJSK;
    }

    function setDokumenBPJSKK($dokumenBPJSKK) {
        $this->dokumenBPJSKK = $dokumenBPJSKK;
    }

    function setDokumenIjazah($dokumenIjazah) {
        $this->dokumenIjazah = $dokumenIjazah;
    }

    function setDokumenManulife($dokumenManulife) {
        $this->dokumenManulife = $dokumenManulife;
    }

    function setDokumenRekening($dokumenRekening) {
        $this->dokumenRekening = $dokumenRekening;
    }
	
    public function getTemp() {
        return $this->temp;
    }

    public function setTemp($temp) {
        $this->temp = $temp;
    }
        
    public function getNik() {
        return $this->nik;
    }

    public function setNik($nik) {
        $this->nik = $nik;
    }  

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getStatus() {
        if(!$this->status){
            $this->status = new Hrd_Models_Master_Status();
        }
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getActived() {
        return (int)$this->actived;
    }

    public function setActived($actived) {
        $this->actived = (int)$actived;
    }

    public function getSex() {
        return $this->sex;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }
    
    public function getBirthPlace() {
        return $this->birthPlace;
    }

    public function setBirthPlace($birthPlace) {
        $this->birthPlace = $birthPlace;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $birthDate;
    }
    
    public function getLeaveQuota() {
        return $this->leaveQuota;
    }

    public function setLeaveQuota($leaveQuota) {
        $this->leaveQuota = (float)$leaveQuota;
    }

    
    public function getReligion() {
        if(!$this->religion){
            $this->religion = new Hrd_Models_Master_Global_Religion();
        }
        return $this->religion;
    }

    public function setReligion($religion) {
        $this->religion = $religion;
    }

    public function getBloodGroup() {
        if(!$this->bloodGroup){
            $this->bloodGroup = new Hrd_Models_Master_Global_BloodGroup();
        }
        return $this->bloodGroup;
    }

    public function setBloodGroup($bloodGroup) {
        $this->bloodGroup = $bloodGroup;
    }

    public function getNikGroup() {
        return $this->nikGroup;
    }

    public function setNikGroup($nikGroup) {
        $this->nikGroup = $nikGroup;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function getKtp() {
        if(!$this->ktp){
            $this->ktp = new Hrd_Models_Master_General_KTP();
        }
        return $this->ktp;
    }

    public function setKtp($ktp) {
        $this->ktp = $ktp;
    }

    public function getZipcode() {
        return $this->zipcode;
    }

    public function setZipcode($zipcode) {
        $this->zipcode = $zipcode;
    }

    public function getLastEducation() {
        if(!$this->lastEducation){
            $this->lastEducation = new Hrd_Models_Master_Global_Education();
        }
        return $this->lastEducation;
    }

    public function setLastEducation($lastEducation) {
        $this->lastEducation = $lastEducation;
    }

    public function getNpwp() {
        return $this->npwp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    public function getPhoneNumber() {
        if(!$this->phoneNumber){
            $this->phoneNumber = new Hrd_Models_Master_General_PhoneNumber();
        }
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

    public function getPassport() {
        return $this->passport;
    }

    public function setPassport($passport) {
        $this->passport = $passport;
    }

    public function getMarriage() {
        if(!$this->marriage){
            $this->marriage = new Hrd_Models_Master_Global_MarriageStatus();
        }
        return $this->marriage;
    }

    public function setMarriage($marriage) {
        $this->marriage = $marriage;
    }
    
    public function getChildCount() {
        return $this->childCount;
    }

    public function setChildCount($child) {
        $this->childCount = $child;
    }
    public function getHireDate() {
        return $this->hireDate;
    }

    public function setHireDate($hireDate) {
        $this->hireDate = $hireDate;
    }

    public function getContractEndDate() {
        return $this->contractEndDate;
    }

    public function setContractEndDate($contractEndDate) {
        $this->contractEndDate = $contractEndDate;
    }

    public function getAssignationDate() {
        return $this->assignationDate;
    }

    public function setAssignationDate($assignationDate) {
        $this->assignationDate = $assignationDate;
    }
    
    public function getNonActiveDate() {
        return $this->nonActiveDate;
    }

    public function setNonActiveDate($nonActiveDate) {
        $this->nonActiveDate = $nonActiveDate;
    }
    
    public function getPhoto() {
        return $this->photo;
    }

    public function setPhoto($photo) {
        $this->photo = $photo;
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
    
    public function getFingerPrintCode() {
        return $this->fingerPrintCode;
    }

    public function setFingerPrintCode($fingerPrintCode) {
        $this->fingerPrintCode = $fingerPrintCode;
    }
    
    public function getKlaimFrameTahun() {
        return $this->klaimFrameTahun;
    }

    public function getKlaimFrameSaldo() {
        return $this->klaimFrameSaldo;
    }

    public function setKlaimFrameTahun($klaimFrameTahun) {
        $this->klaimFrameTahun = $klaimFrameTahun;
    }

    public function setKlaimFrameSaldo($klaimFrameSaldo) {
        $this->klaimFrameSaldo = $klaimFrameSaldo;
    }
	
    public function getStatusInformation() {
        if(!$this->statusInformation){
            $this->statusInformation = new Hrd_Models_Master_StatusInformation();
        }
        return $this->statusInformation;
    }

    public function setStatusInformation($statusInformation) {
        $this->statusInformation = $statusInformation;
    }
    
    public function getReportTo() {
        if(!$this->reportTo){
            $this->reportTo = new Hrd_Models_Master_ReportTo();
        }
        return $this->reportTo;
    }

    public function setReportTo(Hrd_Models_Master_ReportTo $reportTo) {
        $this->reportTo = $reportTo;
    }
    
    public function getAlokasiBiaya() {
        if(!$this->alokasiBiaya){
            $this->alokasiBiaya = new Hrd_Models_Master_AlokasiBiaya();
        }
        return $this->alokasiBiaya;
    }

    public function setAlokasiBiaya(Hrd_Models_Master_AlokasiBiaya $alokasiBiaya) {
        $this->alokasiBiaya = $alokasiBiaya;
    }

    public function getDokumenKK() {
        return $this->dokumenKK;
    }

    public function getDokumenNPWP() {
        return $this->dokumenNPWP;
    }

    public function getDokumenKTP() {
        return $this->dokumenKTP;
    }

    public function getDokumenJamsostek() {
        return $this->dokumenJamsostek;
    }

    public function setDokumenKK($dokumenKK) {
        $this->dokumenKK = $dokumenKK;
    }

    public function setDokumenNPWP($dokumenNPWP) {
        $this->dokumenNPWP = $dokumenNPWP;
    }

    public function setDokumenKTP($dokumenKTP) {
        $this->dokumenKTP = $dokumenKTP;
    }

    public function setDokumenJamsostek($dokumenJamsostek) {
        $this->dokumenJamsostek = $dokumenJamsostek;
    }
    
    public function getAlasanResign() {
        return $this->alasanResign;
    }

    public function setAlasanResign($alasanResign) {
        $this->alasanResign = $alasanResign;
    }
    
    public function getNomorRekening() {
        return $this->nomorRekening;
    }

    public function getNamaRekening() {
        return $this->namaRekening;
    }

    public function setNomorRekening($nomorRekening) {
        $this->nomorRekening = $nomorRekening;
    }

    public function setNamaRekening($namaRekening) {
        $this->namaRekening = $namaRekening;
    }

    public function getBankRekening() {
        return $this->bankRekening;
    }

    public function setBankRekening($bankRekening) {
        $this->bankRekening = $bankRekening;
    }
    
    public function getEmailCiputra() {
        return $this->emailCiputra;
    }

    public function setEmailCiputra($emailCiputra) {
        $this->emailCiputra = $emailCiputra;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    
        
        
    
    
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getReligion(),$this->getBloodGroup(),$this->getMarriage(),$this->getLastEducation(),$this->getStatus(),$this->getStatusInformation());
    }

    public function getArray() {
        return $this->getArrayTable();
    }


}

?>