<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Vendor extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $code;
    private $vendorname;
    private $npwp;
    private $address;
    private $jenisusahaId;
    private $flagId;
    private $officePhone;
    private $mobilePhone;
    private $fax;
    private $email;
    private $contactPerson;
    private $npwpName;
    private $npwpAddress;
    private $npwpKlu;
    private $npwpBc;
    private $pphFinal;
    private $pphNo;
    private $norekening;
    private $projectname;
    private $ptname;
    private $type_vendor;
    

    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'vendor_';
    }
    function getType_vendor() {
        return $this->type_vendor;
    }

    function setType_vendor($type_vendor) {
        $this->type_vendor = $type_vendor;
    }

        function getProjectname() {
        return $this->projectname;
    }

    function getPtname() {
        return $this->ptname;
    }

    function setProjectname($projectname) {
        $this->projectname = $projectname;
    }

    function setPtname($ptname) {
        $this->ptname = $ptname;
    }

        function getCode() {
        return $this->code;
    }

    function getVendorname() {
        return $this->vendorname;
    }

    function getNpwp() {
        return $this->npwp;
    }

    function getAddress() {
        return $this->address;
    }

    function getJenisusahaId() {
        return $this->jenisusahaId;
    }

    function getFlagId() {
        return $this->flagId;
    }

    function getOfficePhone() {
        return $this->officePhone;
    }

    function getMobilePhone() {
        return $this->mobilePhone;
    }

    function getFax() {
        return $this->fax;
    }

    function getEmail() {
        return $this->email;
    }

    function getContactPerson() {
        return $this->contactPerson;
    }

    function getNpwpName() {
        return $this->npwpName;
    }

    function getNpwpAddress() {
        return $this->npwpAddress;
    }

    function getNpwpKlu() {
        return $this->npwpKlu;
    }

    function getNpwpBc() {
        return $this->npwpBc;
    }

    function getPphFinal() {
        return $this->pphFinal;
    }

    function getPphNo() {
        return $this->pphNo;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setVendorname($vendorname) {
        $this->vendorname = $vendorname;
    }

    function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    function setAddress($address) {
        $this->address = $address;
    }

    function setJenisusahaId($jenisusahaId) {
        $this->jenisusahaId = $jenisusahaId;
    }

    function setFlagId($flagId) {
        $this->flagId = $flagId;
    }

    function setOfficePhone($officePhone) {
        $this->officePhone = $officePhone;
    }

    function setMobilePhone($mobilePhone) {
        $this->mobilePhone = $mobilePhone;
    }

    function setFax($fax) {
        $this->fax = $fax;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setContactPerson($contactPerson) {
        $this->contactPerson = $contactPerson;
    }

    function setNpwpName($npwpName) {
        $this->npwpName = $npwpName;
    }

    function setNpwpAddress($npwpAddress) {
        $this->npwpAddress = $npwpAddress;
    }

    function setNpwpKlu($npwpKlu) {
        $this->npwpKlu = $npwpKlu;
    }

    function setNpwpBc($npwpBc) {
        $this->npwpBc = $npwpBc;
    }

    function setPphFinal($pphFinal) {
        $this->pphFinal = $pphFinal;
    }

    function setPphNo($pphNo) {
        $this->pphNo = $pphNo;
    }

    function getNorekening() {
        return $this->norekening;
    }

    function setNorekening($norekening) {
        $this->norekening = $norekening;
    }

    
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
   
        if(isset ($x['vendor_id'])){
           $this->setId($x['vendor_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['vendorname'])){
           $this->setVendorname($x['vendorname']); 
        }
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['jenisusaha_id'])){
           $this->setJenisusahaId($x['jenisusaha_id']); 
        }
        if(isset ($x['flag_id'])){
           $this->setFlagId($x['flag_id']); 
        }
        if(isset ($x['office_phone'])){
           $this->setOfficePhone($x['office_phone']); 
        }
        if(isset ($x['mobile_phone'])){
           $this->setMobilePhone($x['mobile_phone']); 
        }
        if(isset ($x['fax'])){
           $this->setFax($x['fax']); 
        }
        if(isset ($x['email'])){
           $this->setEmail($x['email']); 
        }
        if(isset ($x['contactperson'])){
           $this->setContactPerson($x['contactperson']); 
        }
        if(isset ($x['npwp_name'])){
           $this->setNpwpName($x['npwp_name']); 
        }
        if(isset ($x['npwp_address'])){
           $this->setNpwpAddress($x['npwp_address']); 
        }
        if(isset ($x['npwp_klu'])){
           $this->setNpwpKlu($x['npwp_klu']); 
        }
        if(isset ($x['npwp_bc'])){
           $this->setNpwpBc($x['npwp_bc']); 
        }
        if(isset ($x['pph_final'])){
           $this->setPphFinal($x['pph_final']); 
        }
        if(isset ($x['no_pph'])){
           $this->setPphNo($x['no_pph']); 
        }
        if(isset ($x['no_rekening'])){
           $this->setNorekening($x['no_rekening']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectname($x['project_name']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtname($x['pt_name']); 
        }
        if(isset ($x['type_vendor'])){
           $this->setType_vendor($x['type_vendor']); 
        }
        
       
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "vendor_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "vendorname"=>$this->getVendorname(),
            "npwp"=>$this->getNpwp(),
            "address"=>$this->getAddress(),
            "jenisusaha_id"=>$this->getJenisusahaId(),
            "flag_id"=>$this->getFlagId(),
            "office_phone"=>$this->getOfficePhone(),
            "mobile_phone"=>$this->getMobilePhone(),
            "fax"=>$this->getEmail(),
            "email"=>$this->getEmail(),
            "contactperson"=>$this->getContactPerson(),
            "npwp_name"=>$this->getNpwpName(),
            "npwp_address"=>$this->getNpwpAddress(),
            "npwp_klu"=>$this->getNpwpKlu(),
            "npwp_bc"=>$this->getNpwpBc(),
            "pph_final"=>$this->getPphFinal(),
            "no_pph"=>$this->getPphNo(),
            "no_rekening"=>$this->getNorekening(),
            "project_name"=>$this->getProjectname(),
            "pt_name"=>$this->getPtname(),
            "type_vendor"=>$this->getType_vendor()
              
        );
        
        return $x;
    }
    

    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }



}

?>
