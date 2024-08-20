<?php

/**
 * Description of CAC
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Master_CAC extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,Cashier_Box_Models_Master_InterProjectPt {
    private $project;
    private $pt;
    private $code;
    private $name;
    private $address;
    private $city;
    private $homePhone;
    private $handPhone;
    private $ktpNo;
    private $ktpName;
    private $ktpAddress;
    private $birthDate;
    private $birthPlace;
    private $isMarried;
    private $religion;
    private $education;
    private $notes;
    private $email;
    private $npwp;
    private $upline;
    private $npwpAddress;
    private $persenRsLangsung;
    private $persenReLangsung;
    private $persenRsReferal;
    private $persenReReferal;
    private $bank;
    private $nomorRekening;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "cac_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['cac_id'])){
           $this->setId($x['cac_id']); 
        }
        if(isset ($x['cac_code'])){
           $this->setCode($x['cac_code']); 
        }
        if(isset ($x['cac_name'])){
           $this->setName($x['cac_name']); 
        }
        if(isset ($x['cac_address'])){
           $this->setAddress($x['cac_address']); 
        }
        if(isset ($x['city_city_id'])){
           $this->getCity()->setId($x['city_city_id']); 
        }
        if(isset ($x['home_phone'])){
           $this->setHomePhone($x['home_phone']); 
        }
        if(isset ($x['handphone'])){
           $this->setHandPhone($x['handphone']); 
        }
        if(isset ($x['ktp_no'])){
           $this->setKtpNo($x['ktp_no']); 
        }
        if(isset ($x['ktp_name'])){
           $this->setKtpName($x['ktp_name']); 
        }
        if(isset ($x['ktp_address'])){
           $this->setKtpAddress($x['ktp_address']); 
        }
        if(isset ($x['birth_date'])){
           $this->setBirthDate($x['birth_date']); 
        }
        if(isset ($x['birth_place'])){
           $this->setBirthPlace($x['birth_place']); 
        }
        if(isset ($x['is_married'])){
           $this->setIsMarried($x['is_married']); 
        }
        if(isset ($x['religion_religion_id'])){
           $this->getReligion()->setId($x['religion_religion_id']); 
        }
        if(isset ($x['education_id'])){
           $this->setEducation($x['education_id']); 
        }
        if(isset ($x['notes'])){
           $this->setNotes($x['notes']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        if(isset ($x['upline_id'])){
           $this->setUpline($x['upline_id']); 
        }
        if(isset ($x['npwp_address'])){
           $this->setNpwpAddress($x['npwp_address']); 
        }
        if(isset ($x['persen_rs_langsung'])){
           $this->setPersenRsLangsung($x['persen_rs_langsung']); 
        }
        if(isset ($x['persen_re_langsung'])){
           $this->setPersenReLangsung($x['persen_re_langsung']); 
        }
        if(isset ($x['persen_rs_referal'])){
           $this->setPersenRsReferal($x['persen_rs_referal']); 
        }
        if(isset ($x['persen_re_referal'])){
           $this->setPersenReReferal($x['persen_re_referal']); 
        }
        if(isset ($x['bank_bank_id'])){
           $this->getBank()->setId($x['bank_bank_id']); 
        }
        if(isset ($x['nomor_rekening'])){
           $this->setNomorRekening($x['nomor_rekening']); 
        }
        
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'cac_id'=>$this->getId(),
            'cac_code'=>$this->getCode(),
            'cac_name'=>$this->getName(),
            'cac_address'=>$this->getAddress(),
            'city_city_id'=>$this->getCity()->getId(),
            'home_phone'=>$this->getHomePhone(),
            'handphone'=>$this->getHandPhone(),
            'ktp_no'=>$this->getKtpNo(),
            'ktp_name'=>$this->getKtpName(),
            'ktp_address'=>$this->getKtpAddress(),
            'birth_date'=>$this->getBirthDate(),
            'birth_place'=>$this->getBirthPlace(),
            'is_married'=>$this->getIsMarried(),
            'religion_religion_id'=>$this->getReligion()->getId(),
            'education_id'=>$this->getEducation(),
            'notes'=>$this->getNotes(),
            'email'=>$this->getEmail(),
            'npwp'=>$this->getNpwp(),
            'npwp_address'=>$this->getNpwpAddress(),
            'upline_id'=>$this->getUpline(),
            'persen_rs_langsung'=>$this->getPersenRsLangsung(),
            'persen_re_langsung'=>$this->getPersenReLangsung(),
            'persen_rs_referal'=>$this->getPersenRsReferal(),
            'persen_re_referal'=>$this->getPersenReReferal(),
            'bank_bank_id'=>$this->getBank()->getId(),
            'nomor_rekening'=>$this->getNomorRekening()
         
            
           
        );
      
        return $x;
    }
    
   

    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getCity() {
        if(!$this->city){
            $this->city = new Cashier_Models_Master_City();
        }
        return $this->city;
    }

    public function getHomePhone() {
        return $this->homePhone;
    }

    public function getHandPhone() {
        return $this->handPhone;
    }

    public function getKtpNo() {
        return $this->ktpNo;
    }

    public function getKtpName() {
        return $this->ktpName;
    }

    public function getKtpAddress() {
        return $this->ktpAddress;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function getBirthPlace() {
        return $this->birthPlace;
    }

    public function getIsMarried() {
        return $this->isMarried;
    }

    
   

    public function getNotes() {
        return $this->notes;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getNpwp() {
        return $this->npwp;
    }

   
    public function getNpwpAddress() {
        return $this->npwpAddress;
    }

    public function getPersenRsLangsung() {
        return (float) $this->persenRsLangsung;
    }

    public function getPersenReLangsung() {
        return (float) $this->persenReLangsung;
    }

    public function getPersenRsReferal() {
        return (float) $this->persenRsReferal;
    }

    public function getPersenReReferal() {
        return (float) $this->persenReReferal;
    }


    public function getNomorRekening() {
        return $this->nomorRekening;
    }

    

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function setCity($city) {
        $this->city = $city;
    }

    public function setHomePhone($homePhone) {
        $this->homePhone = $homePhone;
    }

    public function setHandPhone($handPhone) {
        $this->handPhone = $handPhone;
    }

    public function setKtpNo($ktpNo) {
        $this->ktpNo = $ktpNo;
    }

    public function setKtpName($ktpName) {
        $this->ktpName = $ktpName;
    }

    public function setKtpAddress($ktpAddress) {
        $this->ktpAddress = $ktpAddress;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $birthDate;
    }

    public function setBirthPlace($birthPlace) {
        $this->birthPlace = $birthPlace;
    }

    public function setIsMarried($isMarried) {
        $this->isMarried = $isMarried;
    }

    


    public function setNotes($notes) {
        $this->notes = $notes;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

   

    public function setNpwpAddress($npwpAddress) {
        $this->npwpAddress = $npwpAddress;
    }

    public function setPersenRsLangsung($persenRsLangsung) {
        $this->persenRsLangsung = (float)$persenRsLangsung;
    }

    public function setPersenReLangsung($persenReLangsung) {
        $this->persenReLangsung = (float)$persenReLangsung;
    }

    public function setPersenRsReferal($persenRsReferal) {
        $this->persenRsReferal = (float) $persenRsReferal;
    }

    public function setPersenReReferal($persenReReferal) {
        $this->persenReReferal = (float) $persenReReferal;
    }

    

    public function setNomorRekening($nomorRekening) {
        $this->nomorRekening = $nomorRekening;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getProject() {
        if(!$this->project){
          //  $this->project = new Box_Models_Master_Project();
            $this->project = new Cashier_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
           $this->pt = new Cashier_Box_Models_Master_Pt();  
        }
        return $this->pt;
        
    }

    public function grouped() {
         return array();
    }

    public function setProject(\Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getReligion() {
        if(!$this->religion){
            $this->religion = new Cashier_Models_Master_Religion();
        }
        return $this->religion;
    }

    public function setReligion(Cashier_Models_Master_Religion $religion) {
        $this->religion = $religion;
    }
    
    public function getEducation() {
        
        return $this->education;
    }

    public function getUpline() {
   
        return $this->upline;
    }

    public function getBank() {
        if(!$this->bank){
            $this->bank = new Cashier_Models_Master_Bank();
        }
        return $this->bank;
    }

    public function setEducation($education) {
        $this->education = $education;
    }

    public function setUpline($upline) {
        
        $this->upline = $upline;
    }

    public function setBank(Cashier_Models_Master_Bank $bank) {
        $this->bank = $bank;
    }





}
