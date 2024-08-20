<?php


/**
 * Description of Company
 *
 * @author MIS
 */
class Cashier_Models_Customer_Company {
    private $name;
    private $address;
    private $city;
    private $phone;
    private $zipCode;
    private $extPhone;
    private $fax;
    private $position;
    
    public function __construct() {
        $this->city = new Cashier_Models_Master_City();
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

    public function getCity() {
        return $this->city;
    }

    public function setCity(Cashier_Models_Master_City $city) {
        $this->city = $city;
    }

    public function getPhone() {
        return $this->phone;
    }

    public function setPhone($phone) {
        $this->phone = $phone;
    }

    public function getZipCode() {
        return $this->zipCode;
    }

    public function setZipCode($zipCode) {
        $this->zipCode = $zipCode;
    }

    public function getExtPhone() {
        return $this->extPhone;
    }

    public function setExtPhone($extPhone) {
        $this->extPhone = $extPhone;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($fax) {
        $this->fax = $fax;
    }
    
    public function getPosition() {
        return $this->position;
    }

    public function setPosition($position) {
        $this->position = $position;
    }

        
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['company_name'])){
           $this->setName($x['company_name']); 
        }
        if(isset ($x['company_address'])){
           $this->setAddress($x['company_address']); 
        }
        if(isset ($x['company_phone'])){
           $this->setPhone($x['company_phone']); 
        }
        if(isset ($x['company_phoneext'])){
           $this->setExtPhone($x['company_phoneext']); 
        }
        if(isset ($x['company_city_id'])){
           $this->getCity()->setId($x['company_city_id']); 
        }
        if(isset ($x['company_zipcode'])){
           $this->setZipCode($x['company_zipcode']); 
        }
        if(isset ($x['company_fax'])){
           $this->setFax($x['company_fax']); 
        }
        if(isset ($x['company_position'])){
           $this->setPosition($x['company_position']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "company_name"=>$this->getName(),
            "company_address"=>$this->getAddress(),
            "company_phone"=>$this->getPhone(),
            "company_phoneext"=>$this->getExtPhone(),
            "company_city_id"=>$this->getCity()->getId(),
            "company_zipcode"=>$this->getZipCode(),
            "company_fax"=>$this->getFax(),
            "company_position"=>$this->getPosition()
        );
      
        return $x;
    } 


}

?>
