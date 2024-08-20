<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerAddress
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Customer_CustomerAddress extends Cashier_Box_Models_ObjectEmbedData{
    private $address;
    private $customer;
    private $isDefault;
    
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'customeraddress_';
    }
    
    
    public function setArrayTable($dataArray=NULL) {
    
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['customeraddress_id'])){
           $this->setId($x['customeraddress_id']); 
        }
       
        if(isset ($x['customer_customer_id'])){
           $this->getCustomer()->setId($x['customer_customer_id']); 
        }
        if(isset ($x['address'])){
           $this->setAddress($x['address']); 
        }
        if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "customeraddress_id"=>$this->getId(),
            "customer_customer_id"=>$this->getCustomer()->getId(),
            "address"=>$this->getAddress(),
            "is_default"=>$this->getIsDefault()
            
        );
      
        return $x;
    }
    
    public function getAddress() {
        return $this->address;
    }

    public function getCustomer() {
        if(!$this->customer){
            $this->customer = new Cashier_Models_Master_Customer();
        }
        return $this->customer;
    }

    public function getIsDefault() {
        return $this->isDefault;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function setCustomer(Cashier_Models_Master_Customer $customer) {
        $this->customer = $customer;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }


}
