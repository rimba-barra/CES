<?php

/**
 * Description of Customer
 *
 * @author tommytoban
 */
class Cashier_Models_Master_Customer extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {
    private $code;
    private $name;
    private $address;
    private $mobile;
    private $home;
    private $npwp;
    private $ktp;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $embedPrefix==NULL?'customer_':$embedPrefix;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }
    function getMobile() {
        return $this->mobile;
    }

    function getHome() {
        return $this->home;
    }

    function setMobile($mobile) {
        $this->mobile = $mobile;
    }

    function setHome($home) {
        $this->home = $home;
    }
    function getNpwp() {
        return $this->npwp;
    }

    function getKtp() {
        return $this->ktp;
    }

    function setNpwp($npwp) {
        $this->npwp = $npwp;
    }

    function setKtp($ktp) {
        $this->ktp = $ktp;
    }

            
     public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['customer_id'])){
           $this->setId($x['customer_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['mobile_phone'])){
           $this->setMobile($x['mobile_phone']); 
        }
        if(isset ($x['home_phone'])){
           $this->setHome($x['home_phone']); 
        }
        if(isset ($x['ktp'])){
           $this->setKtp($x['ktp']); 
        }
        if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customer_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "name"=>$this->getName(),
            "address"=>$this->getAddress(),
            "mobile_phone"=>$this->getMobile(),
            "home_phone"=>$this->getHome(),
            "ktp"=>$this->getKtp(),
            "npwp"=>$this->getNpwp(),
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
        return array($this->getProject(), $this->getPt());
    }

    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x, array("Modion", "Addon", "issued_date"));
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
