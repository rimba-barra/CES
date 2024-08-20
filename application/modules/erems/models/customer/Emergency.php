<?php

/**
 * Description of Emergency
 *
 * @author MIS
 */
class Erems_Models_Customer_Emergency {
    private $name;
    private $address;
    private $homePhone;
    private $mobilePhone;
    private $familyStatus;
    
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

    public function getHomePhone() {
        return $this->homePhone;
    }

    public function setHomePhone($homePhone) {
        $this->homePhone = $homePhone;
    }

    public function getMobilePhone() {
        return $this->mobilePhone;
    }

    public function setMobilePhone($mobilePhone) {
        $this->mobilePhone = $mobilePhone;
    }

    public function getFamilyStatus() {
        return $this->familyStatus;
    }

    public function setFamilyStatus($familyStatus) {
        $this->familyStatus = $familyStatus;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['emergency_name'])){
           $this->setName($x['emergency_name']); 
        }
        if(isset ($x['emergency_address'])){
           $this->setAddress($x['emergency_address']); 
        }
        if(isset ($x['emergency_phone'])){
           $this->setHomePhone($x['emergency_phone']); 
        }
        if(isset ($x['emergency_mobilephone'])){
           $this->setMobilePhone($x['emergency_mobilephone']); 
        }
        if(isset ($x['emergency_status'])){
           $this->setFamilyStatus($x['emergency_status']); 
        }
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "emergency_name"=>$this->getName(),
            "emergency_address"=>$this->getAddress(),
            "emergency_phone"=>$this->getHomePhone(),
            "emergency_mobilephone"=>$this->getMobilePhone(),
            "emergency_status"=>$this->getFamilyStatus()
        );
      
        return $x;
    }


}

?>
