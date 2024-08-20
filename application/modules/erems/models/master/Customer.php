<?php

/**
 * Description of Customer
 *
 * @author tommytoban
 */
class Erems_Models_Master_Customer extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $address;
    
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
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customer_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "name"=>$this->getName(),
            "address"=>$this->getAddress()
        );
      
        return $x;
    }

}

?>
