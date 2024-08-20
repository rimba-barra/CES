<?php
/**
 * Description of CustomerProfile
 *
 * @author MIS
 */
class Erems_Models_Master_CustomerProfile extends Erems_Models_Master_Customer implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $cityId;
    private $zipCode;
    private $email;
    private $fax;
    private $homePhone;
    private $officePhone;
    private $mobilePhone;
    private $npwpNumber;
    private $birthPlace;
    private $birthDate;
    private $description;
    private $maritalStatus;
    private $maritalStatusBaru;
    private $children;
    private $education;
    private $nationality;
    private $religion;
    private $city;
    private $ktp;
    private $ktpFile;
    private $npwpFile;
    private $purpose;
    private $purposebuy;
    private $company;
    private $emergency;
    private $pic;
    private $user;
    private $project;
    private $pt;
    private $isTemporary;
    private $npwpAddress;
    /* start added by ahmad riadi 05-01-2017 */
    /* start for general */
    private $general_gelar;
    private $general_virtualaccount_no;
    private $general_provinsi;
    private $general_kecamatan;
    private $general_kelurahan;
    private $general_rt;
    private $general_rw;
    private $general_kewarganegaraan;
    private $general_kodewna;
    private $general_pekerjaan;
    private $general_pekerjaan_baru;
    private $general_bidang_pekerjaan_baru;
    /* start for general */
    
    /* start for company */
    private $aktapendirian;
    private $tanggalaktapendirian;
    private $aktaperubahan;
    private $tanggalaktaperubahan;
    private $aktasusunanpengurus;
    private $tanggalaktasusunanpengurus; 
    private $company_email; 
    private $company_pic;
    /* start for company */
    
    /* start for ppatk */
    private $badanhukum;
    private $bentukusaha;
    private $bidangusaha;
    private $bilalain;
    private $instrumentpembayaran;
    private $rekeningwakat_no;
    private $rinciantransaksi;
    private $sumberdana;
    private $rekeningtrans_no;     
    private $namawali;     
    /* end for ppatk */
    
    /* start for identitas */
    private $identitas_documenttype;  
    private $identitas_no;  
    private $identitas_province;  
    private $identitas_city;  
    private $identitas_rt; 
    private $identitas_rw; 
    private $identitas_kecamatan;  
    private $identitas_kelurahan;  
    private $identitas_kodepos;    
    /* end for identitas */
    
     /* start for identitas */
     private $addname;    
     private $modiname;  
     private $modiby;  
     private $adddate;    
     private $modidate;    
     private $currentuser;    
     private $currentdate;    
     /* end for identitas */
           
    /* end added by ahmad riadi 05-01-2017 */
	
	/*start added by ahmad riadi 04-05-2017 */
	 private $gender; 
    /*end added by ahmad riadi 04-05-2017 */

    /*start added by david 04-05-2017 */
    private $KK_number; 
    /*end added by david 04-05-2017 */

    /*additional npwp*/
    private $NPPKP;
    private $NPWP_name;
    private $NPWP_klu;
    private $NPWP_klasifikasiusaha;
    private $NPWP_status;
    private $NPWP_tarif;
    private $NPWP_tarifno;

    private $downline;
    
    private $totaldocument_ktpsim;
    
    private $homePhone2;
    private $mobilePhone2; 
    
    
    public function __construct($params=NULL) {
        parent::__construct($params);    
        $this->city = new Erems_Models_Master_City();
        $this->ktp = new Erems_Models_Customer_KTP();
        $this->religion = new Erems_Models_Master_Religion();
        $this->purpose = new Erems_Models_Master_Purpose();
        $this->purposebuy = new Erems_Models_Master_PurposeBuy();
        $this->company = new Erems_Models_Customer_Company();
        $this->emergency = new Erems_Models_Customer_Emergency();
        $this->education = new Erems_Models_Master_Education();
        $this->user = new Erems_Models_Customer_User();
    }
    /*start added by ahmad riadi */
        function getUserlogin() {
       if(!$this->currentuser){         
          $this->currentuser = new Erems_Models_Master_User();
        }
        return $this->currentuser;
    }

    function getCurrentuserdate() {
        return $this->currentdate;
    }
    function setCurrentuserdate() {
        date_default_timezone_set('Asia/Jakarta');
        $this->currentdate = date('Y-m-d H:i:s');
    }
    
    function getAddname() {
        return $this->addname;
    }

    function getModiby() {
        return $this->modiby;
    }
    
    function getModiname() {
        return $this->modiname;
    }

    function getAdddate() {
        return $this->adddate;
    }

    function getModidate() {
        return $this->modidate;
    }

    function setAddname($addname) {
        $this->addname = $addname;
    }

    function setModiname($modiname) {
        $this->modiname = $modiname;
    }

    function setAdddate($adddate) {
        $this->adddate = $adddate;
    }

    function setModidate($modidate) {
        $this->modidate = $modidate;
    }

        
    function getCompany_email() {
        return $this->company_email;
    }

    function setCompany_email($company_email) {
        $this->company_email = $company_email;
    }
        
    function getNamawali() {
        return $this->namawali;
    }

    function setNamawali($namawali) {
        $this->namawali = $namawali;
    }

    function getGeneral_pekerjaan() {
        return $this->general_pekerjaan;
    }

    function setGeneral_pekerjaan($general_pekerjaan) {
        $this->general_pekerjaan = $general_pekerjaan;
    }
        
    function getGeneral_pekerjaan_baru() {
        return $this->general_pekerjaan_baru;
    }

    function setGeneral_pekerjaan_baru($general_pekerjaan_baru) {
        $this->general_pekerjaan_baru = $general_pekerjaan_baru;
    }

    function getGeneral_bidang_pekerjaan_baru() {
        return $this->general_bidang_pekerjaan_baru;
    }

    function setGeneral_bidang_pekerjaan_baru($general_bidang_pekerjaan_baru) {
        $this->general_bidang_pekerjaan_baru = $general_bidang_pekerjaan_baru;
    }

    function getGeneral_gelar() {
        return $this->general_gelar;
    }

    function getGeneral_virtualaccount_no() {
        return $this->general_virtualaccount_no;
    }

    function getGeneral_provinsi() {
        if(!$this->general_provinsi){
            $this->general_provinsi = new Erems_Models_Master_Provinsi();
        }
        return $this->general_provinsi;
    }

    function getGeneral_kecamatan() {       
        return $this->general_kecamatan;
    }

    function getGeneral_kelurahan() {
        return $this->general_kelurahan;
    }

    function getGeneral_rt() {
        return $this->general_rt;
    }

    function getGeneral_rw() {
        return $this->general_rw;
    }

    function getGeneral_kewarganegaraan() {
        return $this->general_kewarganegaraan;
    }

    function getGeneral_kodewna() {
        return $this->general_kodewna;
    }




    function setGeneral_gelar($general_gelar) {
        $this->general_gelar = $general_gelar;
    }


    function setGeneral_virtualaccount_no($general_virtualaccount_no) {
        $this->general_virtualaccount_no = $general_virtualaccount_no;
    }

    function setGeneral_provinsi(Erems_Models_Master_Provinsi $general_provinsi) {
        $this->general_provinsi = $general_provinsi;
    }

    function setGeneral_kecamatan($general_kecamatan) {
        $this->general_kecamatan = $general_kecamatan;
    }

    function setGeneral_kelurahan($general_kelurahan) {
        $this->general_kelurahan = $general_kelurahan;
    }

    function setGeneral_rt($general_rt) {
        $this->general_rt = $general_rt;
    }

    function setGeneral_rw($general_rw) {
        $this->general_rw = $general_rw;
    }

    function setGeneral_kewarganegaraan($general_kewarganegaraan) {
        $this->general_kewarganegaraan = $general_kewarganegaraan;
    }

    function setGeneral_kodewna($general_kodewna) {
        $this->general_kodewna = $general_kodewna;
    }

    function getAktapendirian() {
        return $this->aktapendirian;
    }

    function getTanggalaktapendirian() {
        return $this->tanggalaktapendirian;
    }

    function getAktaperubahan() {
        return $this->aktaperubahan;
    }

    function getTanggalaktaperubahan() {
        return $this->tanggalaktaperubahan;
    }

    function getAktasusunanpengurus() {
        return $this->aktasusunanpengurus;
    }

    function getTanggalaktasusunanpengurus() {
        return $this->tanggalaktasusunanpengurus;
    }

    function setAktapendirian($aktapendirian) {
        $this->aktapendirian = $aktapendirian;
    }

    function setTanggalaktapendirian($tanggalaktapendirian) {
        $this->tanggalaktapendirian = $tanggalaktapendirian;
    }

    function setAktaperubahan($aktaperubahan) {
        $this->aktaperubahan = $aktaperubahan;
    }

    function setTanggalaktaperubahan($tanggalaktaperubahan) {
        $this->tanggalaktaperubahan = $tanggalaktaperubahan;
    }

    function setAktasusunanpengurus($aktasusunanpengurus) {
        $this->aktasusunanpengurus = $aktasusunanpengurus;
    }

    function setTanggalaktasusunanpengurus($tanggalaktasusunanpengurus) {
        $this->tanggalaktasusunanpengurus = $tanggalaktasusunanpengurus;
    }        
    
    function getBadanhukum() {
        return $this->badanhukum;
    }

    function getBentukusaha() {
        if(!$this->bentukusaha){
            $this->bentukusaha = new Erems_Models_Master_Bentukusaha();
        }
        return $this->bentukusaha;
    }

    function getBidangusaha() {
        return $this->bidangusaha;
    }

    function getBilalain() {
        return $this->bilalain;
    }

    function getInstrumentpembayaran() {
        if(!$this->instrumentpembayaran){
            $this->instrumentpembayaran = new Erems_Models_Master_Instrumentpembayaran();
        }
        return $this->instrumentpembayaran;
    }

    function getRekeningwakat_no() {
        return $this->rekeningwakat_no;
    }

    function getRinciantransaksi() {
        return $this->rinciantransaksi;
    }

    function getSumberdana() {
        return $this->sumberdana;
    }

    function getRekeningtrans_no() {
        return $this->rekeningtrans_no;
    }

    function setBadanhukum($badanhukum) {
        $this->badanhukum = $badanhukum;
    }

    function setBentukusaha(Erems_Models_Master_Bentukusaha $bentukusaha) {
        $this->bentukusaha = $bentukusaha;
    }

    function setBidangusaha($bidangusaha) {
        $this->bidangusaha = $bidangusaha;
    }

    function setBilalain($bilalain) {
        $this->bilalain = $bilalain;
    }

    function setInstrumentpembayaran(Erems_Models_Master_Instrumentpembayaran $instrumentpembayaran) {
        $this->instrumentpembayaran = $instrumentpembayaran;
    }

    function setRekeningwakat_no($rekeningwakat_no) {
        $this->rekeningwakat_no = $rekeningwakat_no;
    }

    function setRinciantransaksi($rinciantransaksi) {
        $this->rinciantransaksi = $rinciantransaksi;
    }

    function setSumberdana($sumberdana) {
        $this->sumberdana = $sumberdana;
    }

    function setRekeningtrans_no($rekeningtrans_no) {
        $this->rekeningtrans_no = $rekeningtrans_no;
    }

    function getIdentitas_documenttype() {
        if(!$this->identitas_documenttype){
            $this->identitas_documenttype = new Erems_Models_Master_DocumentType();
        }
        return $this->identitas_documenttype;
    }

    function getIdentitas_no() {
        return $this->identitas_no;
    }

    function getIdentitas_province() {
        if(!$this->identitas_province){
            $this->identitas_province = new Erems_Models_Master_Provinsi();
        }
        return $this->identitas_province;
    }

    function getIdentitas_city() {
        if(!$this->identitas_city){
            $this->identitas_city = new Erems_Models_Master_City();
        }
        return $this->identitas_city;
    }

    function getIdentitas_rt() {
        return $this->identitas_rt;
    }

    function getIdentitas_rw() {
        return $this->identitas_rw;
    }

    function getIdentitas_kecamatan() {
        return $this->identitas_kecamatan;
    }

    function getIdentitas_kelurahan() {
        return $this->identitas_kelurahan;
    }

    function getIdentitas_kodepos() {
        return $this->identitas_kodepos;
    }

    function setIdentitas_documenttype(Erems_Models_Master_DocumentType $identitas_documenttype) {
        $this->identitas_documenttype = $identitas_documenttype;
    }

    function setIdentitas_no($identitas_no) {
        $this->identitas_no = $identitas_no;
    }

    function setIdentitas_province(Erems_Models_Master_Provinsi $identitas_province) {
        $this->identitas_province = $identitas_province;
    }

    function setIdentitas_city(Erems_Models_Master_City $identitas_city) {
        $this->identitas_city = $identitas_city;
    }

    function setIdentitas_rt($identitas_rt) {
        $this->identitas_rt = $identitas_rt;
    }
    
    function setIdentitas_rw($identitas_rw) {
        $this->identitas_rw = $identitas_rw;
    }
    
    function setIdentitas_kecamatan($identitas_kecamatan) {
        $this->identitas_kecamatan = $identitas_kecamatan;
    }

    function setIdentitas_kelurahan($identitas_kelurahan) {
        $this->identitas_kelurahan = $identitas_kelurahan;
    }

    function setIdentitas_kodepos($identitas_kodepos) {
        $this->identitas_kodepos = $identitas_kodepos;
    }

            
    /* end added by ahmad riadi */
    public function getCityId() {
        return $this->cityId;
    }

    public function setCityId($cityId) {
        $this->cityId = $cityId;
    }

    public function getZipCode() {
        return $this->zipCode;
    }

    public function setZipCode($zipCode) {
        $this->zipCode = $zipCode;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($fax) {
        $this->fax = $fax;
    }

    public function getHomePhone() {
        return $this->homePhone;
    }

    public function setHomePhone($homePhone) {
        $this->homePhone = $homePhone;
    }

    public function getOfficePhone() {
        return $this->officePhone;
    }

    public function setOfficePhone($officePhone) {
        $this->officePhone = $officePhone;
    }

    public function getMobilePhone() {
        return $this->mobilePhone;
    }

    public function setMobilePhone($mobilePhone) {
        $this->mobilePhone = $mobilePhone;
    }
    
    public function getCity() {
        return $this->city;
    }

    public function setCity(Erems_Models_Master_City $city) {
        $this->city = $city;
    }
    
    public function getKtp() {
        if(!$this->ktp){
            $this->ktp = new Erems_Models_Customer_KTP();
        }
        return $this->ktp;
    }

    public function setKtp(Erems_Models_Customer_KTP $ktp) {
        $this->ktp = $ktp;
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
    
    public function getMaritalStatus() {
        return $this->maritalStatus;
    }

    public function setMaritalStatus($maritalStatus) {
        $this->maritalStatus = $maritalStatus;
    }
    
    public function getMaritalStatusBaru() {
        return $this->maritalStatusBaru;
    }

    public function setMaritalStatusBaru($maritalStatusBaru) {
        $this->maritalStatusBaru = $maritalStatusBaru;
    }
    
    public function getNpwpNumber() {
        return $this->npwpNumber;
    }

    public function setNpwpNumber($npwpNumber) {
        $this->npwpNumber = $npwpNumber;
    }

    public function getChildren() {
        return $this->children;
    }

    public function setChildren($children) {
        $this->children = $children;
    }

    public function getEducation() {
        if(!$this->education){
            $this->education = new Erems_Models_Master_Education();
        }
        return $this->education;
    }

    public function setEducation(Erems_Models_Master_Education $education) {
        $this->education = $education;
    }

    public function getNationality() {
        return $this->nationality;
    }

    public function setNationality($nationality) {
        $this->nationality = $nationality;
    }

    public function getReligion() {
        if(!$this->religion){
            $this->religion = new Erems_Models_Master_Religion();
        }
        return $this->religion;
    }

    public function setReligion(Erems_Models_Master_Religion $religion) {
        $this->religion = $religion;
    }

    public function getPurpose() {
        if(!$this->purpose){
            $this->purpose = new Erems_Models_Master_Purpose();
        }
        return $this->purpose;
    }

    public function setPurpose(Erems_Models_Master_Purpose $purpose) {
        $this->purpose = $purpose;
    }

    public function getPurposeBuy() {
        if(!$this->purposebuy){
            $this->purposebuy = new Erems_Models_Master_PurposeBuy();
        }
        return $this->purposebuy;
    }

    public function setPurposeBuy(Erems_Models_Master_PurposeBuy $purposebuy) {
        $this->purposebuy = $purposebuy;
    }

    public function getCompany() {
        return $this->company;
    }

    public function setCompany(Erems_Models_Customer_Company $company) {
        if(!$this->company){
            $this->company = new Erems_Models_Customer_Company();
        }
        $this->company = $company;
    }
    
    public function getEmergency() {
        if(!$this->emergency){
            $this->emergency = new Erems_Models_Customer_Emergency();
        }
        return $this->emergency;
    }

    public function setEmergency(Erems_Models_Customer_Emergency $emergency) {
        $this->emergency = $emergency;
    }
    
    public function getPic() {
        return $this->pic;
    }

    public function setPic($pic) {
        $this->pic = $pic;
    }

    public function getUser() {
        if(!$this->user){
            $this->user = new Erems_Models_Customer_User();
        }
        return $this->user;
    }

    public function setUser(Erems_Models_Customer_User $user) {
        $this->user = $user;
    }
    
    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getIsTemporary() {
        return $this->isTemporary;
    }

    public function setIsTemporary($isTemporary) {
        $this->isTemporary = $isTemporary;
    }
    
    public function getNpwpAddress() {
        return $this->npwpAddress;
    }

    public function setNpwpAddress($npwpAddress) {
        $this->npwpAddress = $npwpAddress;
    }
	
	/*start added by ahmad riadi 04-05-2017 */
	public function getGender() {
        return $this->gender;
    }

    public function setGender($gender) {
        $this->gender = $gender;
    }
	/*end added by ahmad riadi 04-05-2017 */

    
    /*start added by david 28/7/2017 */
    public function getKKNumber()
    {
        return $this->KK_number;
    }

    public function setKKNumber($KK_number)
    {
        $this->KK_number = $KK_number;
        return $this;
    }

    // added by iqbal 20190510
    public function getCompanyPic()
    {
        return $this->company_pic;
    }

    public function setCompanyPic($company_pic)
    {
        $this->company_pic = $company_pic;
        return $this;
    }
    // end added

    function getHomePhone2() {
        return $this->homePhone2;
    }

    function getMobilePhone2() {
        return $this->mobilePhone2;
    }

    function setHomePhone2($homePhone2) {
        $this->homePhone2 = $homePhone2;
    }

    function setMobilePhone2($mobilePhone2) {
        $this->mobilePhone2 = $mobilePhone2;
    }

    public function getKtpFile() {
		return $this->ktpFile;
	}

	public function setKtpFile($ktpFile) {
		$this->ktpFile = $ktpFile;
	}
    public function getNpwpFile() {
		return $this->npwpFile;
	}

	public function setNpwpFile($npwpFile) {
		$this->npwpFile = $npwpFile;
	}

	
    /*end added by david 28/7/2017 */
        
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['file_ktp_name'])){
           $this->setKtpFile($x['file_ktp_name']); 
        }
		
        if(isset ($x['file_npwp_name'])){
           $this->setNpwpFile($x['file_npwp_name']); 
        }
		
        if(isset ($x['city_city_id'])){
           $this->setCityId($x['city_city_id']); 
        }
        if(isset ($x['zipcode'])){
           $this->setZipCode($x['zipcode']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['fax'])){
           $this->setFax($x['fax']); 
        }
        if(isset ($x['home_phone'])){
           $this->setHomePhone($x['home_phone']); 
        }
        if(isset ($x['office_phone'])){
           $this->setOfficePhone($x['office_phone']); 
        }
        if(isset ($x['mobile_phone'])){
           $this->setMobilePhone($x['mobile_phone']); 
        }
        if(isset ($x['birthplace'])){
           $this->setBirthPlace($x['birthplace']); 
        }
        if(isset ($x['birthdate'])){
           $this->setBirthDate($x['birthdate']); 
        }
        if(isset ($x['marital_status'])){
           $this->setMaritalStatus($x['marital_status']); 
        }
        if(isset ($x['marital_status_baru'])){
           $this->setMaritalStatusBaru($x['marital_status_baru']); 
        }
        if(isset ($x['nationality'])){
           $this->setNationality($x['nationality']); 
        }
        if(isset ($x['photo'])){
           $this->setPic($x['photo']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['NPWP'])){
           $this->setNpwpNumber($x['NPWP']); 
        }
        if(isset ($x['children'])){
           $this->setChildren($x['children']); 
        }
        if(isset ($x['religion_religion_id'])){
           $this->getReligion()->setId($x['religion_religion_id']); 
        }
        if(isset ($x['purpose_purpose_id'])){
           $this->getPurpose()->setId($x['purpose_purpose_id']); 
        }
        if(isset ($x['purposebuy_purposebuy_id'])){
           $this->getPurposeBuy()->setId($x['purposebuy_purposebuy_id']); 
        }
        if(isset ($x['education_education_id'])){
           $this->getEducation()->setId($x['education_education_id']); 
        }
        if(isset ($x['is_temporary'])){
           $this->setIsTemporary($x['is_temporary']); 
        }
        if(isset ($x['NPWP_address'])){
           $this->setNpwpAddress($x['NPWP_address']); 
        }
        
        /* start added by ahmad riadi 06-01-2017 */
        
         /* start for general */
        if(isset ($x['general_gelar'])){
           $this->setGeneral_gelar($x['general_gelar']); 
        }
        if(isset ($x['general_virtualaccount_no'])){
           $this->setGeneral_virtualaccount_no($x['general_virtualaccount_no']); 
        }      
        if(isset ($x['general_province_id'])){
           $this->getGeneral_provinsi()->setId($x['general_province_id']); 
        }      
        if(isset ($x['general_kecamatan'])){
            $this->setGeneral_kecamatan($x['general_kecamatan']); 
        }      
        if(isset ($x['general_kelurahan'])){
            $this->setGeneral_kelurahan($x['general_kelurahan']); 
        }      
        if(isset ($x['general_rt'])){
            $this->setGeneral_rt($x['general_rt']); 
        }      
        if(isset ($x['general_rw'])){
            $this->setGeneral_rw($x['general_rw']); 
        }      
        if(isset ($x['general_kewarganegaraan'])){
            $this->setGeneral_kewarganegaraan($x['general_kewarganegaraan']); 
        }      
        if(isset ($x['general_kodewna'])){
            $this->setGeneral_kodewna($x['general_kodewna']); 
        }      
        if(isset ($x['general_pekerjaan'])){
            $this->setGeneral_pekerjaan($x['general_pekerjaan']); 
        }      
        if(isset ($x['general_pekerjaan_baru'])){
            $this->setGeneral_pekerjaan_baru($x['general_pekerjaan_baru']); 
        }      
        if(isset ($x['general_bidang_pekerjaan_baru'])){
            $this->setGeneral_bidang_pekerjaan_baru($x['general_bidang_pekerjaan_baru']); 
        }      
        
        /* end for general */
        
        /* start for identitas */
        if(isset ($x['identitas_documenttype_id'])){
           $this->getIdentitas_documenttype()->setId($x['identitas_documenttype_id']); 
        } 
         if(isset ($x['identitas_no'])){
            $this->setIdentitas_no($x['identitas_no']); 
        } 
        if(isset ($x['identitas_province_id'])){
            $this->getIdentitas_province()->setId($x['identitas_province_id']); 
        } 
        if(isset ($x['identitas_city_id'])){
            $this->getIdentitas_city()->setId($x['identitas_city_id']); 
        } 
        if(isset ($x['identitas_rt'])){
            $this->setIdentitas_rt($x['identitas_rt']); 
        }
        if(isset ($x['identitas_rw'])){
            $this->setIdentitas_rw($x['identitas_rw']); 
        }
        if(isset ($x['identitas_kecamatan'])){
            $this->setIdentitas_kecamatan($x['identitas_kecamatan']); 
        }
        if(isset ($x['identitas_kelurahan'])){
            $this->setIdentitas_kelurahan($x['identitas_kelurahan']); 
        }
        if(isset ($x['identitas_kodepos'])){
            $this->setIdentitas_kodepos($x['identitas_kodepos']); 
        }     
        /* end for identitas */
        
        /* start for ppatk */
        if(isset ($x['ppatk_badanhukum'])){
            $this->setBadanhukum($x['ppatk_badanhukum']); 
        } 
        if(isset ($x['ppatk_bentukusaha_id'])){
            $this->getBentukusaha()->setId($x['ppatk_bentukusaha_id']); 
        } 
        if(isset ($x['ppatk_bidangusaha'])){
            $this->setBidangusaha($x['ppatk_bidangusaha']); 
        } 
        if(isset ($x['ppatk_bilalain'])){
            $this->setBilalain($x['ppatk_bilalain']); 
        } 
        if(isset ($x['ppatk_instrumentpembayaran_id'])){
            $this->getInstrumentpembayaran()->setId($x['ppatk_instrumentpembayaran_id']); 
        } 
        if(isset ($x['ppatk_rekeningwakat_no'])){
            $this->setRekeningwakat_no($x['ppatk_rekeningwakat_no']); 
        } 
        if(isset ($x['ppatk_rinciantransaksi'])){
            $this->setRinciantransaksi($x['ppatk_rinciantransaksi']); 
        } 
        if(isset ($x['ppatk_sumberdana'])){
            $this->setSumberdana($x['ppatk_sumberdana']); 
        } 
        if(isset ($x['ppatk_rekeningtrans_no'])){
            $this->setRekeningtrans_no($x['ppatk_rekeningtrans_no']); 
        }
        if(isset ($x['ppatk_namawali'])){
            $this->setNamawali($x['ppatk_namawali']); 
        }    
        /* end for ppatk */
        
         /* start for company */
          if (isset($x['company_aktapendirian'])) {
            $this->setAktapendirian($x['company_aktapendirian']);
        }
        if (isset($x['company_aktaperubahan'])) {
            $this->setAktaperubahan($x['company_aktaperubahan']);
        }
        if (isset($x['company_aktasusunanpengurus'])) {
            $this->setAktasusunanpengurus($x['company_aktasusunanpengurus']);
        }
        if (isset($x['company_tanggalaktapendirian'])) {
            $this->setTanggalaktapendirian($x['company_tanggalaktapendirian']);
        }
        if (isset($x['company_tanggalaktaperubahan'])) {
            $this->setTanggalaktaperubahan($x['company_tanggalaktaperubahan']);
        }
        if (isset($x['company_tanggalaktasusunanpengurus'])) {
            $this->setTanggalaktasusunanpengurus($x['company_tanggalaktasusunanpengurus']);
        }
         if (isset($x['company_email'])) {
            $this->setCompany_email($x['company_email']);
        }
         if (isset($x['company_pic'])) {
            $this->setCompanyPic($x['company_pic']);
        }
        /* end for company */
        
        /* start for user add or modi information */
         if (isset($x['addname'])) {
            $this->setAddname($x['addname']);
        }
         if (isset($x['modiname'])) {
            $this->setModiname($x['modiname']);
        }
         if (isset($x['Addon'])) {
            $this->setAdddate($x['Addon']);
        }
         if (isset($x['Modion'])) {
            $this->setModidate($x['Modion']);
        }
		
        if (isset($x['gender'])) {
            $this->setGender($x['gender']);
        }

        if (isset($x['KK_number'])) {
            $this->setKKnumber($x['KK_number']);
        }

        //new for surabaya
        if (isset($x['NPPKP'])) {
            $this->setNPPKP($x['NPPKP']);
        }

        if (isset($x['NPWP_name'])) {
            $this->setNPWPName($x['NPWP_name']);
        }
        
        if (isset($x['NPWP_klu_id'])) {
            $this->setNPWPKlu($x['NPWP_klu_id']);
        }

        if (isset($x['NPWP_klasifikasiusaha_id'])) {
            $this->setNPWPKlasifikasiusaha($x['NPWP_klasifikasiusaha_id']);
        }

        if (isset($x['NPWP_status_id'])) {
            $this->setNPWPStatus($x['NPWP_status_id']);
        }

        if (isset($x['NPWP_tarif'])) {
            $this->setNPWPTarif($x['NPWP_tarif']);
        }

        if (isset($x['NPWP_tarifno'])) {
            $this->setNPWPTarifno($x['NPWP_tarifno']);
        }
        if (isset($x['downline_id'])) {
            $this->setDownline($x['downline_id']);
        }
        
        if (isset($x['totaldocument_ktpsim'])) {
            $this->setTotaldocument_ktpsim($x['totaldocument_ktpsim']);
        }
        
        if (isset($x['home_phone2'])) {
            $this->setHomePhone2($x['home_phone2']);
        }
        
        if (isset($x['mobile_phone2'])) {
            $this->setMobilePhone2($x['mobile_phone2']);
        }
		
         $this->setCurrentuserdate();       
        /* end for user add or modi information */
        
        /* end added by ahmad riadi 06-01-2017 */
		
        
        $this->getKtp()->setArrayTable($x);
        $this->getCompany()->setArrayTable($x);
        $this->getEmergency()->setArrayTable($x);
        $this->getUser()->setArrayTable($x);        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            'city_city_id'=>$this->getCityId(),
            'zipcode'=>$this->getZipCode(),
            'email'=>$this->getEmail(),
            'fax'=>$this->getFax(),
            'home_phone'=>$this->getHomePhone(),
            'office_phone'=>$this->getOfficePhone(),
            'mobile_phone'=>$this->getMobilePhone(),
            'birthplace'=>$this->getBirthPlace(),
            'birthdate'=>$this->getBirthDate(),
            'marital_status'=>$this->getMaritalStatus(),
            'marital_status_baru'=>$this->getMaritalStatusBaru(),
            'nationality'=>$this->getNationality(),
            'photo'=>$this->getPic(),
            'description'=>$this->getDescription(),
            'NPWP'=>$this->getNpwpNumber(),
            'children'=>$this->getChildren(),
            'religion_religion_id'=>$this->getReligion()->getId(),
            'purpose_purpose_id'=>$this->getPurpose()->getId(),
            'purposebuy_purposebuy_id'=>$this->getPurposeBuy()->getId(),
            'education_education_id'=>$this->getEducation()->getId(),
            'is_temporary'=>$this->getIsTemporary(),
            'NPWP_address'=>$this->getNpwpAddress(),
             /* start added by ahmad riadi 06-01-2017 */
            
              /* start for general */
              'general_gelar'=>$this->getGeneral_gelar(),
              'general_virtualaccount_no'=>$this->getGeneral_virtualaccount_no(),
              'general_province_id'=>$this->getGeneral_provinsi()->getId(),
              'general_kecamatan'=>$this->getGeneral_kecamatan(),
              'general_kelurahan'=>$this->getGeneral_kelurahan(),
              'general_rt'=>$this->getGeneral_rt(),
              'general_rw'=>$this->getGeneral_rw(),
              'general_kewarganegaraan'=>$this->getGeneral_kewarganegaraan(),
              'general_kodewna'=>$this->getGeneral_kodewna(),              
              'general_pekerjaan'=>$this->getGeneral_pekerjaan(),              
              'general_pekerjaan_baru'=>$this->getGeneral_pekerjaan_baru(),              
              'general_bidang_pekerjaan_baru'=>$this->getGeneral_bidang_pekerjaan_baru(),              
              /* end for general */
            
             /* start for identitas */
              'identitas_documenttype_id'=>$this->getIdentitas_documenttype()->getId(),
              'identitas_no'=>$this->getIdentitas_no(),
              'identitas_province_id'=>$this->getIdentitas_province()->getId(),
              'identitas_city_id'=>$this->getIdentitas_city()->getId(),
              'identitas_rt'=>$this->getIdentitas_rt(),
              'identitas_rw'=>$this->getIdentitas_rw(),
              'identitas_kecamatan'=>$this->getIdentitas_kecamatan(),
              'identitas_kelurahan'=>$this->getIdentitas_kelurahan(),
              'identitas_kodepos'=>$this->getIdentitas_kodepos(),
              /* end for identitas */
            
             /* start for ppatk */
             'ppatk_badanhukum'=>$this->getBadanhukum(),
             'ppatk_bentukusaha_id'=>$this->getBentukusaha()->getId(),
             'ppatk_bidangusaha'=>$this->getBidangusaha(),
             'ppatk_bilalain'=>$this->getBilalain(),
             'ppatk_instrumentpembayaran_id'=>$this->getInstrumentpembayaran()->getId(),
             'ppatk_rekeningwakat_no'=>$this->getRekeningwakat_no(),
             'ppatk_rinciantransaksi'=>$this->getRinciantransaksi(),
             'ppatk_sumberdana'=>$this->getSumberdana(),
             'ppatk_rekeningtrans_no'=>$this->getRekeningtrans_no(),
             'ppatk_namawali'=>$this->getNamawali(),
             /* end for ppatk */
            
             /* start for company */
               'company_aktapendirian'=>$this->getAktapendirian(),
               'company_aktaperubahan'=>$this->getAktaperubahan(),
               'company_aktasusunanpengurus'=>$this->getAktasusunanpengurus(),
               'company_tanggalaktapendirian'=>$this->getTanggalaktapendirian(),
               'company_tanggalaktaperubahan'=>$this->getTanggalaktaperubahan(),
               'company_tanggalaktasusunanpengurus'=>$this->getTanggalaktasusunanpengurus(),
               'company_email'=>$this->getCompany_email(),
               'company_pic'=>$this->getCompanyPic(),
             /* end for company */
            
              /* start for user add or modi information */
               'addname'=>$this->getAddname(),
               'modiname'=>$this->getModiname(),
               'modiby'=>$this->getModiBy(),
               'Addon'=>$this->getAdddate(),
               'Modion'=>$this->getModidate(),
            
               'Currentusername'=>$this->getUserlogin()->getCurrentuser()['user_fullname'],
               'Currentdate'=>$this->getCurrentuserdate(),
              /* end for user add or modi information */
			  'gender'=>$this->getGender(),
              'KK_number'=>$this->getKKnumber(),

              //new for surabaya
              'NPPKP' => $this->getNPPKP(),
              'NPWP_name' => $this->getNPWPName(),
              'NPWP_klu_id' => $this->getNPWPKlu(),
              'NPWP_klasifikasiusaha_id' => $this->getNPWPKlasifikasiusaha(),
              'NPWP_status_id' => $this->getNPWPStatus(),
              'NPWP_tarif' => $this->getNPWPTarif(),
              'NPWP_tarifno' => $this->getNPWPTarifno(),
              'downline_id' => $this->getDownline(),
              'totaldocument_ktpsim'=>$this->getTotaldocument_ktpsim(),
            
             /* end added by ahmad riadi 06-01-2017 */
                
              'home_phone2' => $this->getHomePhone2(),
              'mobile_phone2' => $this->getMobilePhone2(),
              'file_ktp_name' => $this->getKtpFile(),
              'file_npwp_name' => $this->getNpwpFile(),
                
        );
        $x = array_merge($x,$y);
        if($this->getKtp()){
            $y = $this->getKtp()->getArrayTable();
            $x = array_merge($x,$y);
        }
        
        if($this->getCompany()){
            $y = $this->getCompany()->getArrayTable();
            $x = array_merge($x,$y);
        }
        $y = $this->getEmergency()->getArrayTable();
            $x = array_merge($x,$y);
        $y = $this->getUser()->getArrayTable();
            $x = array_merge($x,$y);
               
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCity(),$this->getReligion(),$this->getPurpose(),$this->getEducation());
    }
    
    protected  function getDatefields() {
        return array("birthdate","company_tanggalaktapendirian","company_tanggalaktaperubahan","company_tanggalaktasusunanpengurus");
    }
    

    /*New for Surabaya*/
    /**
     * @return mixed
     */
    public function getNPPKP()
    {
        return $this->NPPKP;
    }

    /**
     * @param mixed $NPPKP
     *
     * @return self
     */
    public function setNPPKP($NPPKP)
    {
        $this->NPPKP = $NPPKP;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPName()
    {
        return $this->NPWP_name;
    }

    /**
     * @param mixed $NPWP_name
     *
     * @return self
     */
    public function setNPWPName($NPWP_name)
    {
        $this->NPWP_name = $NPWP_name;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPKlu()
    {
        return $this->NPWP_klu;
    }

    /**
     * @param mixed $NPWP_klu
     *
     * @return self
     */
    public function setNPWPKlu($NPWP_klu)
    {
        $this->NPWP_klu = $NPWP_klu;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPKlasifikasiusaha()
    {
        return $this->NPWP_klasifikasiusaha;
    }

    /**
     * @param mixed $NPWP_klasifikasiusaha
     *
     * @return self
     */
    public function setNPWPKlasifikasiusaha($NPWP_klasifikasiusaha)
    {
        $this->NPWP_klasifikasiusaha = $NPWP_klasifikasiusaha;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPStatus()
    {
        return $this->NPWP_status;
    }

    /**
     * @param mixed $NPWP_status
     *
     * @return self
     */
    public function setNPWPStatus($NPWP_status)
    {
        $this->NPWP_status = $NPWP_status;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPTarif()
    {
        return $this->NPWP_tarif;
    }

    /**
     * @param mixed $NPWP_tarif
     *
     * @return self
     */
    public function setNPWPTarif($NPWP_tarif)
    {
        $this->NPWP_tarif = $NPWP_tarif;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getNPWPTarifno()
    {
        return $this->NPWP_tarifno;
    }

    /**
     * @param mixed $NPWP_tarifno
     *
     * @return self
     */
    public function setNPWPTarifno($NPWP_tarifno)
    {
        $this->NPWP_tarifno = $NPWP_tarifno;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDownline()
    {
        return $this->downline;
    }

    /**
     * @param mixed $downline
     *
     * @return self
     */
    public function setDownline($downline)
    {
        $this->downline = $downline;

        return $this;
    }
    
    function getTotaldocument_ktpsim() {
        return $this->totaldocument_ktpsim;
    }

    function setTotaldocument_ktpsim($totaldocument_ktpsim) {
        $this->totaldocument_ktpsim = $totaldocument_ktpsim;
    }


}

?>
