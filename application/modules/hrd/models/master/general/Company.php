<?php


/**
 * Description of Company
 *
 * @author MIS
 */
class Hrd_Models_Master_General_Company {
    private $name;
    private $address;
    private $lineofBusiness;
    private $phoneNumber;
    
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

    public function getLineofBusiness() {
        return $this->lineofBusiness;
    }

    public function setLineofBusiness($lineofBusiness) {
        $this->lineofBusiness = $lineofBusiness;
    }

    public function getPhoneNumber() {
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['company_name'])){
           $this->setName($x['company_name']); 
        }
        if(isset ($x['company_address'])){
           $this->setAddress($x['company_address']); 
        }
        if(isset ($x['company_line_of_business'])){
           $this->setLineofBusiness($x['company_line_of_business']); 
        }
        if(isset ($x['company_phone'])){
           $this->setPhoneNumber($x['company_phone']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'company_name'=>$this->getName(),
            'company_address'=>$this->getAddress(),
            'company_line_of_business'=>$this->getLineofBusiness(),
            'company_phone'=>$this->getPhoneNumber()
        );
      
        return $x;
    }


}

?>
